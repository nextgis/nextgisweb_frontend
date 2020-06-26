import CancelablePromise from '@nextgis/cancelable-promise';
import { DeepPartial, defined, isObject } from '@nextgis/utils';
import { EventEmitter } from 'events';

import { RequestItemsParamsMap } from './types/RequestItemsParamsMap';
import {
  NgwConnectorOptions,
  GetRequestItemsResponseMap,
  RequestOptions,
  Params,
  LoadingQueue,
  UserInfo,
  Credentials,
  PyramidRoute,
  RequestHeaders,
  PostRequestItemsResponseMap,
  PatchRequestItemsResponseMap,
  RequestItemKeys,
  DeleteRequestItemsResponseMap,
  PutRequestItemsResponseMap,
  RequestItemsParams,
  ResourceDefinition,
} from './interfaces';
import { loadJSON } from './utils/loadJson';
import { template } from './utils/template';
import { ResourceItem, Resource } from './types/ResourceItem';
import { resourceToQuery } from './utils/resourceToQuery';
import { resourceCompare } from './utils/resourceCompare';

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export class NgwConnector {
  emitter = new EventEmitter();
  user?: UserInfo;
  private routeStr = '/api/component/pyramid/route';
  private route?: PyramidRoute;
  private _loadingQueue: { [name: string]: LoadingQueue } = {};
  private _loadingStatus: { [url: string]: boolean } = {};
  private _queriesCache: { [url: string]: any } = {};
  private _resourceIdsCache: Record<number, ResourceItem> = {};

  constructor(public options: NgwConnectorOptions) {
    if (this.options.route) {
      this.routeStr = this.options.route;
    }
  }

  setNextGisWeb(url: string): void {
    this.logout();
    this.options.baseUrl = url;
  }

  async connect(): Promise<PyramidRoute> {
    if (this.route) {
      return this.route;
    } else {
      if (this.options.auth) {
        const { login, password } = this.options.auth;
        if (login && password) {
          await this.getUserInfo({ login, password });
        }
      }

      const route: PyramidRoute = await this.makeQuery(this.routeStr, {}, {});
      this.route = route;
      return route;
    }
  }

  async login(credentials: Credentials): Promise<UserInfo> {
    this.logout();
    return this.getUserInfo(credentials);
  }

  logout(): void {
    this._rejectLoadingQueue();
    this._loadingStatus = {};
    this.options.auth = undefined;
    this.route = undefined;
    this.user = undefined;
    this.emitter.emit('logout');
  }

  getUserInfo(credentials?: Credentials): Promise<UserInfo> {
    if (this.user && this.user.id) {
      return CancelablePromise.resolve(this.user);
    }
    if (credentials) {
      this.options.auth = credentials;
    }
    const options: RequestOptions = {
      headers: this.getAuthorizationHeaders(credentials),
      // withCredentials: true
    };

    // Do not use request('auth.current_user') to avoid circular-references
    return this.makeQuery('/api/component/auth/current_user', {}, options)
      .then((data: UserInfo) => {
        this.user = data;
        this.emitter.emit('login', data);
        return data;
      })
      .catch((er) => {
        this.emitter.emit('login:error', er);
        throw er;
      });
  }

  getAuthorizationHeaders(
    credentials?: Credentials
  ): RequestHeaders | undefined {
    const client = this.makeClientId(credentials);
    if (client) {
      return {
        Authorization: 'Basic ' + client,
      };
    }
  }

  makeClientId(credentials?: Credentials): string | undefined {
    credentials = credentials || this.options.auth;
    if (credentials) {
      const { login, password } = credentials;
      const str = unescape(encodeURIComponent(`${login}:${password}`));
      return isBrowser ? window.btoa(str) : Buffer.from(str).toString('base64');
    }
  }

  async getResource(
    resource: ResourceDefinition | DeepPartial<Resource>
  ): Promise<ResourceItem | undefined> {
    if (typeof resource === 'string') {
      return this.getResourceByKeyname(resource);
    } else if (typeof resource === 'number') {
      return this.getResourceById(resource);
    } else if (isObject(resource)) {
      return this.getResourceBy(resource);
    }
  }

  async getResourceId(
    resource: ResourceDefinition
  ): Promise<number | undefined> {
    if (typeof resource === 'number') {
      return resource;
    } else if (typeof resource === 'string') {
      const res = await this.getResourceByKeyname(resource);
      if (res) {
        return res.resource.id;
      }
    }
  }

  async getResourcesBy(
    resource: DeepPartial<Resource>
  ): Promise<ResourceItem[]> {
    let items: ResourceItem[] = [];
    if (resource.id) {
      const existId = this._resourceIdsCache[resource.id];
      if (existId) {
        items.push(existId);
      }
    } else {
      items = this._resourceCacheFilter(resource);
    }
    if (!items.length) {
      try {
        const query: Record<string, unknown> = {};
        if (resource.keyname) {
          query.keyname = resource.keyname;
        } else {
          Object.assign(query, resourceToQuery(resource));
        }
        const resources = await this.get('resource.search', null, {
          serialization: 'full',
          ...query,
        });
        if (resources) {
          resources.forEach((x) => {
            this._resourceIdsCache[x.resource.id] = x;
          });
        }
        items = resources;
      } catch (er) {
        return [];
      }
    }
    return items;
  }

  async getResourceBy(
    resource: DeepPartial<Resource>
  ): Promise<ResourceItem | undefined> {
    const resources = await this.getResourcesBy(resource);
    return resources[0];
  }

  async getResourceByKeyname(
    keyname: string
  ): Promise<ResourceItem | undefined> {
    return this.getResourceBy({ keyname });
  }

  async getResourceById(id: number): Promise<ResourceItem | undefined> {
    let item: ResourceItem = this._resourceIdsCache[id];
    if (!item) {
      try {
        item = await this.get('resource.item', null, { id });
        if (item) {
          this._resourceIdsCache[id] = item;
        }
      } catch (er) {
        return undefined;
      }
    }
    return item;
  }

  async getResourceChildren(
    optOrResource:
      | string
      | number
      | {
          keyname?: string;
          resourceId?: number;
          resource?: string | number;
        }
  ): Promise<ResourceItem[]> {
    let opt: {
      keyname?: string;
      resourceId?: number;
      resource?: string | number;
    } = {};
    if (typeof optOrResource === 'string') {
      opt.keyname = optOrResource;
    } else if (typeof optOrResource === 'number') {
      opt.resourceId = optOrResource;
    } else {
      opt = optOrResource;
    }
    let parent = opt.resourceId;
    let keyname = opt.keyname;
    if (!opt.keyname && !opt.resourceId && !opt.resource) {
      throw new Error('No keyname or resourceId is set');
    }
    if (opt.resource) {
      if (typeof opt.resource === 'string') {
        keyname = opt.resource;
      } else if (typeof opt.resource === 'number') {
        parent = opt.resource;
      }
    }
    if (keyname) {
      const item = await this.getResourceByKeyname(keyname);
      if (item) {
        parent = item.resource.id;
      }
    }
    return this.get('resource.collection', null, {
      parent,
    });
  }

  async deleteResource(resource: ResourceDefinition): Promise<void> {
    const id = await this.getResourceId(resource);
    if (id !== undefined) {
      await this.delete('resource.item', null, { id });
      delete this._resourceIdsCache[id];
    }
  }

  request<
    K extends keyof RequestItemsParamsMap,
    P extends RequestItemKeys = RequestItemKeys
  >(
    name: K,
    params: RequestItemsParams<K> = {},
    options?: RequestOptions
  ): Promise<P[K]> {
    return new CancelablePromise((resolve, reject) => {
      this.connect().then((apiItems) => {
        // const apiItems = this.route;
        let apiItem = apiItems && apiItems[name];
        if (apiItem) {
          apiItem = [...apiItem];
          let url = apiItem.shift();
          if (apiItem.length) {
            const replaceParams: {
              [num: number]: string;
            } = {};
            for (let fry = 0; fry < apiItem.length; fry++) {
              const arg = apiItem[fry];
              replaceParams[fry] = '{' + arg + '}';
              if (params[arg] === undefined) {
                throw new Error(
                  '`' + arg + '`' + ' url api argument is not specified'
                );
              }
            }
            if (url) {
              url = template(url, replaceParams);
            }
          }
          // Transfer part of the parameters from `params` to the URL string
          if (params) {
            const paramArray = [];
            const paramList = params.paramList;
            if (Array.isArray(paramList)) {
              delete params.paramList;
              paramList.forEach((x) => {
                paramArray.push(`${x[0]}=${x[1]}`);
              });
            }
            for (const p in params) {
              if (apiItem.indexOf(p) === -1) {
                paramArray.push(`${p}=${params[p]}`);
              }
            }
            if (paramArray.length) {
              url = url + '?' + paramArray.join('&');
            }
          }
          if (url) {
            const query = this.makeQuery(url, params, options);
            resolve(query);
          } else {
            reject(new Error('request url is not set'));
          }
        }
        resolve({} as P[K]);
      });
    });
  }

  post<K extends keyof RequestItemsParamsMap>(
    name: K,
    options?: RequestOptions<'POST'>,
    params?: RequestItemsParams<K>
  ): Promise<PostRequestItemsResponseMap[K]> {
    options = options || {};
    options.method = 'POST';
    options.nocache = true;
    return this.request<K, PostRequestItemsResponseMap>(name, params, options);
  }

  get<K extends keyof RequestItemsParamsMap>(
    name: K,
    options?: RequestOptions | undefined | null,
    params?: RequestItemsParams<K>
  ): Promise<GetRequestItemsResponseMap[K]> {
    options = options || {};
    options.method = 'GET';
    options.nocache = true;
    return this.request<K, GetRequestItemsResponseMap>(name, params, options);
  }

  patch<K extends keyof RequestItemsParamsMap>(
    name: K,
    options?: RequestOptions,
    params?: RequestItemsParams<K>
  ): Promise<PatchRequestItemsResponseMap[K]> {
    options = options || {};
    options.method = 'PATCH';
    options.nocache = true;
    return this.request<K, PatchRequestItemsResponseMap>(name, params, options);
  }

  put<K extends keyof RequestItemsParamsMap>(
    name: K,
    options?: RequestOptions,
    params?: RequestItemsParams<K>
  ): Promise<PutRequestItemsResponseMap[K]> {
    options = options || {};
    options.method = 'PUT';
    options.nocache = true;
    return this.request<K, PutRequestItemsResponseMap>(name, params, options);
  }

  delete<K extends keyof RequestItemsParamsMap>(
    name: K,
    options?: RequestOptions | undefined | null,
    params?: RequestItemsParams<K>
  ): Promise<DeleteRequestItemsResponseMap[K]> {
    options = options || {};
    options.method = 'DELETE';
    options.nocache = true;
    return this.request<K, DeleteRequestItemsResponseMap>(
      name,
      params,
      options
    );
  }

  makeQuery(
    url: string,
    params?: Params,
    options: RequestOptions = {}
  ): Promise<any> {
    url = (this.options.baseUrl ? this.options.baseUrl : '') + url;
    if (url) {
      if (params) {
        url = template(url, params);
      }
      // remove double slash
      url = url.replace(/([^:]\/)\/+/g, '$1');
      if (options.cache && this._queriesCache[url]) {
        return this._queriesCache[url];
      }
      if (!this._loadingStatus[url] || options.nocache) {
        this._loadingStatus[url] = true;

        return this._getJson(url, options)
          .then((data) => {
            this._loadingStatus[url] = false;
            if (options.cache) {
              this._queriesCache[url] = data;
            }
            this._executeLoadingQueue(url, data);
            return data;
          })
          .catch((er) => {
            this._loadingStatus[url] = false;
            this._executeLoadingQueue(url, er, true);
            this.emitter.emit('error', er);
            throw er;
          });
      } else {
        this._loadingStatus[url] = false;
        return new CancelablePromise((resolve, reject) => {
          this._setLoadingQueue(url, resolve, reject);
        });
      }
    } else {
      throw new Error('No `url` parameter set for option ' + name);
    }
  }

  protected _setLoadingQueue(
    name: string,
    resolve: (...args: any[]) => any,
    reject: (...args: any[]) => any
  ): void {
    this._loadingQueue[name] = this._loadingQueue[name] || {
      name,
      waiting: [],
    };
    this._loadingQueue[name].waiting.push({
      resolve,
      reject,
      timestamp: new Date(),
    });
  }

  protected _rejectLoadingQueue(): void {
    for (const q in this._loadingQueue) {
      const queue = this._loadingQueue[q];
      queue.waiting.forEach((x) => {
        x.reject();
      });
      delete this._loadingQueue[q];
    }
  }

  protected _executeLoadingQueue(
    name: string,
    data: unknown,
    isError?: boolean
  ): void {
    const queue = this._loadingQueue[name];
    if (queue) {
      for (let fry = 0; fry < queue.waiting.length; fry++) {
        const wait = queue.waiting[fry];
        if (isError) {
          if (wait.reject) {
            wait.reject();
          }
        } else {
          wait.resolve(data);
        }
      }
      queue.waiting = [];
    }
  }

  protected _getJson(url: string, options: RequestOptions): Promise<any> {
    options.responseType = options.responseType || 'json';
    return new CancelablePromise((resolve, reject, onCancel) => {
      if (this.user) {
        options = options || {};
        // options.withCredentials = true;
        options.headers = {
          ...this.getAuthorizationHeaders(),
          ...options.headers,
        };
      }
      loadJSON(url, resolve, options, reject, onCancel);
    });
  }

  private _resourceCacheFilter(
    resource: DeepPartial<Resource>
  ): ResourceItem[] {
    const items: ResourceItem[] = Object.values(this._resourceIdsCache).filter(
      (x) => {
        // identical by uniq props
        if (resource.keyname && x.resource.keyname) {
          return resource.keyname === x.resource.keyname;
        }
        if (defined(resource.id) && defined(x.resource.id)) {
          return resource.id === x.resource.id;
        }
        return resourceCompare(resource, x.resource);
      }
    );
    return items;
  }
}
