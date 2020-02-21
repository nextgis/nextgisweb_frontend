# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.25.6](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.5...v0.25.6) (2020-02-21)


### Bug Fixes

* **qms-kit:** mix layerAdapter class property ([5bae578](https://github.com/nextgis/nextgisweb_frontend/commit/5bae5787174a03ebe9560152dd54576eea77448d))





## [0.25.5](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.4...v0.25.5) (2020-02-20)


### Bug Fixes

* rename Clipboard ([759f55a](https://github.com/nextgis/nextgisweb_frontend/commit/759f55ad35928f5212d8ed8bfaccdbebcb35246a))
* **demo:** remove layer id from ngw properties filter example ([4c3c625](https://github.com/nextgis/nextgisweb_frontend/commit/4c3c6253a47a4e1e55d3b19c5a75787d96705e69))
* **mapbox:** geojson getFeatures method return whole source data ([d47f893](https://github.com/nextgis/nextgisweb_frontend/commit/d47f8932d63c8a6d056d50aad351026464128595))
* **webmap:** ZoomState may be only integer ([c130469](https://github.com/nextgis/nextgisweb_frontend/commit/c13046908d63d549e3f221efc538c55d49a36450))


### Features

* **ngw-connector:** make library polymorphic for both node and browser ([b3bd42e](https://github.com/nextgis/nextgisweb_frontend/commit/b3bd42e1ebc3880edfecb6713d0d17166e9beed0))
* **ngw-kit:** new addNgwLayer resource option for keyname or resourceId ([f1eefd2](https://github.com/nextgis/nextgisweb_frontend/commit/f1eefd2703dc16126ef4b0a933a86b9a34d594a7))


### Performance Improvements

* **mapbox:** upgrade layer ordering ([58a0db0](https://github.com/nextgis/nextgisweb_frontend/commit/58a0db08c0fa123ede4ef0d9fc7d9e1e9b3a6526))





## [0.25.4](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.3...v0.25.4) (2020-02-07)


### wip

* **util:** move CancelablePromise to util ([6f7f24c](https://github.com/nextgis/nextgisweb_frontend/commit/6f7f24c8c3046731b35bae28de20ab6452dbb9c8))


### BREAKING CHANGES

* **util:** CancelablePromise has been removed from ngw-connecter. Now you should do this: import {CancelablePromise} from '@nextgis/utils;'





## [0.25.3](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.2...v0.25.3) (2020-02-07)


### Features

* **example:** new ngw_layer_properties_filter example ([066f13f](https://github.com/nextgis/nextgisweb_frontend/commit/066f13f4ef023f6629f1a7fc2639f8af123cce87))
* **ngw:** conditions and nesting for filtering ngw feature layer ([bc7cc34](https://github.com/nextgis/nextgisweb_frontend/commit/bc7cc344d83d1769476e28cb87d595a9d25d0ebd))
* **util:** create typeHelpers utils ([14ad5ec](https://github.com/nextgis/nextgisweb_frontend/commit/14ad5ecdfec47aae2e8e5ae6cd78871ff10d2a92))





## [0.25.2](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.1...v0.25.2) (2020-02-05)

**Note:** Version bump only for package root





## [0.25.1](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.0...v0.25.1) (2020-02-05)


### Bug Fixes

* **mapbox:** disable mapbox image layer ([421a69f](https://github.com/nextgis/nextgisweb_frontend/commit/421a69f2e11313e8835c4d87e5091e4ef9f393d1))


### Features

* remove default MarkerLayerAdapter ([7398c1b](https://github.com/nextgis/nextgisweb_frontend/commit/7398c1bb61d43194ce4c7da635d386ad785ac57a))
* **demo:** add new example for simple resource table ([43fdf4f](https://github.com/nextgis/nextgisweb_frontend/commit/43fdf4f69898680872fedece44c812ca407d1d8b))


### BREAKING CHANGES

* `MARKER` layer adapter has been removed. Use `addLayer('GEOJSON', {data})` instead of `addLayer('MARKER', {lngLat})`





# [0.25.0](https://github.com/nextgis/nextgisweb_frontend/compare/v0.24.0...v0.25.0) (2020-02-03)


### Bug Fixes

* **mapbox:** geojson adapter select ([3563359](https://github.com/nextgis/nextgisweb_frontend/commit/35633593586642f8d52d0fe326ebbf8b117652b3))
* **mapbox:** geojson layer selection with nativeFilter option ([ffea714](https://github.com/nextgis/nextgisweb_frontend/commit/ffea714bc57ece601a400ca7aa5f506aebf5f4e2))
* **mapbox:** propertyFilter for selected vector data ([6eaba47](https://github.com/nextgis/nextgisweb_frontend/commit/6eaba476e582af7f33e0b98d74457482a1fa0cf0))
* **mapbox:** set transformRequest option only then map is loaded ([9a2da0b](https://github.com/nextgis/nextgisweb_frontend/commit/9a2da0b3c11ed1f8b44d655590687fc66f51c36e))
* **mapbox:** transformRequests hotfix ([99ba257](https://github.com/nextgis/nextgisweb_frontend/commit/99ba2570ae1e519e4f7ea941514c342e7039b3da))
* **ngw:** ngw webmap resource ordering ([f859ddb](https://github.com/nextgis/nextgisweb_frontend/commit/f859ddbe4e8bfa53c30cd90bef33cc359d81b472))
* **ol:** no vector layer label for undefined property ([8087662](https://github.com/nextgis/nextgisweb_frontend/commit/80876629688c664edc6a5c7c1f5452a0b38e0cf7))
* **util:** arrayCompare typecasting ([3cca72c](https://github.com/nextgis/nextgisweb_frontend/commit/3cca72cdcae150829a58754a2efbe51cd6c4517f))
* **vue:** NgwLayersList webmap visibility ([919bc4e](https://github.com/nextgis/nextgisweb_frontend/commit/919bc4e5dd971f0f9ed501bab4266eaab8da5037))
* **vue:** saveselection of webmap in NgwLayersList ([6270793](https://github.com/nextgis/nextgisweb_frontend/commit/6270793f23d4c01f9a928a868301c36d53502bc2))
* **vue:** VueNgwLeaflet default icons for FF ([713d29e](https://github.com/nextgis/nextgisweb_frontend/commit/713d29e1054bdc21912b7b6b4a68456ca6845bdc))
* **webmap:** not use ordering for layer id ([cd09734](https://github.com/nextgis/nextgisweb_frontend/commit/cd0973490a2c6ca0673bd01059056dd5fd68d866))


### Features

* **ngw:** add support for `qgis_raster_style` ([959e901](https://github.com/nextgis/nextgisweb_frontend/commit/959e9014364947acbbbe768157d8cb5ab6d0c3ba))
* **ol:** implement labelField options for OL geojson adapter ([cd0fbf1](https://github.com/nextgis/nextgisweb_frontend/commit/cd0fbf145a89a07bb934ec77a21c130e0eb7eba8))
* **ol:** implemented getBounds method for OlMapAdapter ([42e9a18](https://github.com/nextgis/nextgisweb_frontend/commit/42e9a1835d76e211055fc66fab7ba709f4e923f9))
* **ol:** labeling for circle layer paint ([1b0c87c](https://github.com/nextgis/nextgisweb_frontend/commit/1b0c87c10afe49195464d346634ec1cf88bd49b8))
* **util:** add arrayCompare util ([9442c01](https://github.com/nextgis/nextgisweb_frontend/commit/9442c01e17dc894e97580cf32b882567066a9004))
* **util:** add debounce util ([fd45455](https://github.com/nextgis/nextgisweb_frontend/commit/fd45455b061b2bc6186f865d4d0a3aa13d57e01d))
* **util:** move properties filter to utils library ([4099706](https://github.com/nextgis/nextgisweb_frontend/commit/40997068f633faf75f15011721d9aaa5f11343dd))
* **vue:** NgwLayersList watch ngwMap change ([b2bfd34](https://github.com/nextgis/nextgisweb_frontend/commit/b2bfd349c86e934194424ebedf05ee9d24a6a51f))
* **webmap:** add `getBoundsPoly` webmap util ([22cb565](https://github.com/nextgis/nextgisweb_frontend/commit/22cb5654e6a2c2c8b84d32581faed0b293570cc2))
* **webmap:** nesting for propertiesFilter utility ([28cb9ed](https://github.com/nextgis/nextgisweb_frontend/commit/28cb9ed583ec96fec675f8f6c63ec18c1fe030de))
* **webmap:** update PropertiesFilter interface ([c6bb69b](https://github.com/nextgis/nextgisweb_frontend/commit/c6bb69b948f660a0f8a522c8347176baa293380c))


### Performance Improvements

* **mapbox:** selection with PropertiesFilter ([e6e52e1](https://github.com/nextgis/nextgisweb_frontend/commit/e6e52e151f1662bb889cf89b349d566c100a2bdc))


### BREAKING CHANGES

* **util:** Use `import { propertiesFilter } from '@nextgis/utils';` instead of `Webmap.utils.propertiesFilter`





## [0.24.2](https://github.com/nextgis/nextgisweb_frontend/compare/v0.24.1...v0.24.2) (2020-01-14)


### Bug Fixes

* **mapbox:** transformRequests hotfix ([99ba257](https://github.com/nextgis/nextgisweb_frontend/commit/99ba2570ae1e519e4f7ea941514c342e7039b3da))





## [0.24.1](https://github.com/nextgis/nextgisweb_frontend/compare/v0.15.4...v0.24.1) (2020-01-14)


### Bug Fixes

* **mapbox:** set transformRequest option only then map is loaded ([9a2da0b](https://github.com/nextgis/nextgisweb_frontend/commit/9a2da0b3c11ed1f8b44d655590687fc66f51c36e))
* **ol:** no vector layer label for undefined property ([8087662](https://github.com/nextgis/nextgisweb_frontend/commit/80876629688c664edc6a5c7c1f5452a0b38e0cf7))


### Features

* **ol:** implement labelField options for OL geojson adapter ([cd0fbf1](https://github.com/nextgis/nextgisweb_frontend/commit/cd0fbf145a89a07bb934ec77a21c130e0eb7eba8))
* **ol:** implemented getBounds method for OlMapAdapter ([42e9a18](https://github.com/nextgis/nextgisweb_frontend/commit/42e9a1835d76e211055fc66fab7ba709f4e923f9))
* **ol:** labeling for circle layer paint ([1b0c87c](https://github.com/nextgis/nextgisweb_frontend/commit/1b0c87c10afe49195464d346634ec1cf88bd49b8))
* **webmap:** add `getBoundsPoly` webmap util ([22cb565](https://github.com/nextgis/nextgisweb_frontend/commit/22cb5654e6a2c2c8b84d32581faed0b293570cc2))




# [0.24.0](https://github.com/nextgis/nextgisweb_frontend/compare/v0.22.0...v0.24.0) (2020-01-11)


### BREAKING CHANGES

* Use import VueNgwMap from '@nextgis/vue-ngw-leaflet' instead of @nextgis/vue-ngw-map, vue-ngw-map is now has only abstract class for export (without any map framework). Also you can importVueNgwMap component from @nextgis/vue-ngw-mapbox and @nextgis/vue-ngw-ol.




# [0.23.0](https://github.com/nextgis/nextgisweb_frontend/compare/v0.22.0...v0.23.0) (2020-01-11)


### Documentation

* update changelog ([b8fe281](https://github.com/nextgis/nextgisweb_frontend/commit/b8fe281078b5db6593fe4a91214021ecbd5c5c2f))


### Features

* **vue:** split vue-ngw-map for leaflet, ol an mapbox adapters ([b9dcb88](https://github.com/nextgis/nextgisweb_frontend/commit/b9dcb880140480b3557cde7bb91e761741889bf5))


### BREAKING CHANGES

* Сhanged approach to writing commit messages. Read [convention](https://github.com/nextgis/nextgisweb_frontend/blob/master/.github/commit-convention.md)
