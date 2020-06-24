import { expect } from 'chai';
import {
  Connection,
  BaseResource,
  getMetadataArgsStorage,
} from '../../packages/ngw-orm/src';
import { SandboxGroup } from '../helpers/ngw-orm/SandboxGroup';
import { SandboxPointLayer } from '../helpers/ngw-orm/SandboxPointLayer';

let CONNECTION: Connection;
const TESTS_GROUP_ID = 446;

function getConnection(): Promise<Connection> {
  if (CONNECTION) {
    return Promise.resolve(CONNECTION);
  }
  return Connection.connect({
    // baseUrl: 'http://dev.nextgis.com/sandbox/',
    baseUrl: 'http://geonote.nextgis.com',
    auth: {
      login: 'nextgis',
      password: 'nextgis',
    },
  }).then((connection) => {
    CONNECTION = connection;
    return connection;
  });
}

describe('NgwOrm', () => {
  before(async () => {
    const connection = await getConnection();
    await connection.getOrCreateResource(SandboxGroup, {
      parent: TESTS_GROUP_ID,
    });
  });

  after(async () => {
    const connection = await getConnection();
    await connection.deleteResource(SandboxGroup);
  });

  describe('Connection', () => {
    it(`connect`, async () => {
      const connection = await getConnection();
      expect(connection.isConnected).to.be.true;
    });

    it(`#getOrCreate create`, async () => {
      const connection = await getConnection();
      const Clone = SandboxGroup.clone({
        display_name: 'Resource Group Clone',
      });
      await connection.getOrCreateResource(Clone, {
        parent: SandboxGroup,
      });
      expect(Clone.connection && Clone.connection.isConnected).to.be.true;
    });

    it(`#deleteResource`, async () => {
      const connection = await getConnection();
      const clone = getMetadataArgsStorage().resources.find((x) => {
        return x.display_name === 'Resource Group Clone';
      });
      expect(clone).to.be.exist;
      if (clone) {
        const Clone = clone.target as typeof BaseResource;
        expect(Clone.item).to.be.exist;
        if (Clone.item) {
          const id = Clone.item.resource.id;
          await connection.deleteResource(Clone);
          expect(Clone.item).to.be.undefined;
          const afterDelete = await connection.getResource(id);
          expect(afterDelete).to.be.undefined;
        }
      }
    });
  });

  describe('VectorLayer', () => {
    it(`point`, async () => {
      const connection = await getConnection();
      if (SandboxGroup.item) {
        const point = await connection.getOrCreateResource(SandboxPointLayer, {
          parent: SandboxGroup,
        });
        expect(point).to.be.exist;
      }
    });
    it(`clone`, async () => {
      const connection = await getConnection();
      if (SandboxGroup.item) {
        const point = await connection.getOrCreateResource(
          SandboxPointLayer.clone({ display_name: 'Clone of Point layer' }),
          {
            parent: SandboxGroup,
          }
        );
        expect(point).to.be.exist;
        if (point) {
          expect(point.item).to.be.exist;
          if (point.item) {
            expect(point.item.feature_layer).to.be.exist;
            expect(point.item?.feature_layer?.fields.length).to.be.eq(1);
          }
        }
      }
    });
  });
});