# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.25.6](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.5...v0.25.6) (2020-02-21)

**Note:** Version bump only for package @nextgis/utils





## [0.25.5](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.4...v0.25.5) (2020-02-20)


### Bug Fixes

* rename Clipboard ([759f55a](https://github.com/nextgis/nextgisweb_frontend/commit/759f55ad35928f5212d8ed8bfaccdbebcb35246a))
* **mapbox:** geojson getFeatures method return whole source data ([d47f893](https://github.com/nextgis/nextgisweb_frontend/commit/d47f8932d63c8a6d056d50aad351026464128595))





## [0.25.4](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.3...v0.25.4) (2020-02-07)


### wip

* **util:** move CancelablePromise to util ([6f7f24c](https://github.com/nextgis/nextgisweb_frontend/commit/6f7f24c8c3046731b35bae28de20ab6452dbb9c8))


### BREAKING CHANGES

* **util:** CancelablePromise has been removed from ngw-connecter. Now you should do this: import {CancelablePromise} from '@nextgis/utils;'





## [0.25.3](https://github.com/nextgis/nextgisweb_frontend/compare/v0.25.2...v0.25.3) (2020-02-07)


### Features

* **util:** create typeHelpers utils ([14ad5ec](https://github.com/nextgis/nextgisweb_frontend/commit/14ad5ecdfec47aae2e8e5ae6cd78871ff10d2a92))





# [0.25.0](https://github.com/nextgis/nextgisweb_frontend/compare/v0.24.0...v0.25.0) (2020-02-03)


### Bug Fixes

* **util:** arrayCompare typecasting ([3cca72c](https://github.com/nextgis/nextgisweb_frontend/commit/3cca72cdcae150829a58754a2efbe51cd6c4517f))


### Features

* **util:** add arrayCompare util ([9442c01](https://github.com/nextgis/nextgisweb_frontend/commit/9442c01e17dc894e97580cf32b882567066a9004))
* **util:** add debounce util ([fd45455](https://github.com/nextgis/nextgisweb_frontend/commit/fd45455b061b2bc6186f865d4d0a3aa13d57e01d))
* **util:** move properties filter to utils library ([4099706](https://github.com/nextgis/nextgisweb_frontend/commit/40997068f633faf75f15011721d9aaa5f11343dd))


### BREAKING CHANGES

* **util:** Use `import { propertiesFilter } from '@nextgis/utils';` instead of `Webmap.utils.propertiesFilter`
