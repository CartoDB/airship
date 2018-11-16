# [0.0.0](https://github.com/CartoDB/airship/compare/v1.0.0-beta.10...v0.0.0) (2018-11-16)


### Bug Fixes

* smoke-fixes ([740c158](https://github.com/CartoDB/airship/commit/740c158)), closes [#490](https://github.com/CartoDB/airship/issues/490) [#491](https://github.com/CartoDB/airship/issues/491) [#491](https://github.com/CartoDB/airship/issues/491) [#495](https://github.com/CartoDB/airship/issues/495) [#499](https://github.com/CartoDB/airship/issues/499) [#502](https://github.com/CartoDB/airship/issues/502) [#501](https://github.com/CartoDB/airship/issues/501)


### chore

* Update versions in README ([7d9262e](https://github.com/CartoDB/airship/commit/7d9262e))


### BREAKING CHANGES

* `.as-box` in the footer has now a reduced number of use cases.
* Internet Explorer won't be supported.

More info can be found https://github.com/CartoDB/airship/pull/493



# [1.0.0-beta.10](https://github.com/CartoDB/airship/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2018-11-14)


### Bug Fixes

* **components:** Histogram colors not working on IE11 ([d2ea40d](https://github.com/CartoDB/airship/commit/d2ea40d)), closes [#480](https://github.com/CartoDB/airship/issues/480)
* **components:** Histogram handles not visible on IE11 ([05b29ad](https://github.com/CartoDB/airship/commit/05b29ad)), closes [#479](https://github.com/CartoDB/airship/issues/479)
* **components:** Stacked bar widget not visible on IE11 ([71db413](https://github.com/CartoDB/airship/commit/71db413)), closes [#478](https://github.com/CartoDB/airship/issues/478)
* **components:** Tabs now works on safari ([#482](https://github.com/CartoDB/airship/issues/482)) ([094f4f8](https://github.com/CartoDB/airship/commit/094f4f8))
* **styles:** fix toolbar actions taking too much space ([#413](https://github.com/CartoDB/airship/issues/413)) ([2d7d236](https://github.com/CartoDB/airship/commit/2d7d236))
* **styles:** Sidebars not visible on IE11  ([d600c97](https://github.com/CartoDB/airship/commit/d600c97)), closes [#481](https://github.com/CartoDB/airship/issues/481)


### Features

* Responsive widgets and improved CSS variables ([6d26330](https://github.com/CartoDB/airship/commit/6d26330))



# [1.0.0-beta.9](https://github.com/CartoDB/airship/compare/v1.0.0-beta.7...v1.0.0-beta.9) (2018-11-05)


### Bug Fixes

* **chore:** Fix webpack example and upgrade release process ([a7a3565](https://github.com/CartoDB/airship/commit/a7a3565)), closes [#453](https://github.com/CartoDB/airship/issues/453)



# [1.0.0-beta.7](https://github.com/CartoDB/airship/compare/v1.0.0-beta.5...v1.0.0-beta.7) (2018-10-31)


### Bug Fixes

* **components:** dropdown height / autoclose ([#448](https://github.com/CartoDB/airship/issues/448)) ([eb5813a](https://github.com/CartoDB/airship/commit/eb5813a)), closes [#433](https://github.com/CartoDB/airship/issues/433) [#447](https://github.com/CartoDB/airship/issues/447)
* **components:** Fix range slider step issues ([#429](https://github.com/CartoDB/airship/issues/429)) ([445644f](https://github.com/CartoDB/airship/commit/445644f))


### Features

* **components:** 216 widget improvements ([#438](https://github.com/CartoDB/airship/issues/438)) ([3722c27](https://github.com/CartoDB/airship/commit/3722c27))
* **components:** 217 histogram redesign ([#442](https://github.com/CartoDB/airship/issues/442)) ([5033fb2](https://github.com/CartoDB/airship/commit/5033fb2))
* **components:** Add airship tabs ([#445](https://github.com/CartoDB/airship/issues/445)) ([f90a2a4](https://github.com/CartoDB/airship/commit/f90a2a4)), closes [#452](https://github.com/CartoDB/airship/issues/452)
* **components:** Add toolbar component ([#449](https://github.com/CartoDB/airship/issues/449)) ([0768f7a](https://github.com/CartoDB/airship/commit/0768f7a))



# [1.0.0-beta.5](https://github.com/CartoDB/airship/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2018-10-24)



# [1.0.0-beta.4](https://github.com/CartoDB/airship/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2018-10-23)


### Bug Fixes

* **build:** fixed publishing development assets [#431](https://github.com/CartoDB/airship/issues/431) ([c6d7e8d](https://github.com/CartoDB/airship/commit/c6d7e8d))



# [1.0.0-beta.3](https://github.com/CartoDB/airship/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2018-10-23)


### Bug Fixes

* **components:** change docs to reflect the change of defineCustomElements [#428](https://github.com/CartoDB/airship/issues/428) ([5f9a96f](https://github.com/CartoDB/airship/commit/5f9a96f))
* **icons:** fix decode failure of icons library [#418](https://github.com/CartoDB/airship/issues/418) ([e1dfd9e](https://github.com/CartoDB/airship/commit/e1dfd9e))


### BREAKING CHANGES

* **components:** after updating to Stencil 0.13 the location of the components loader has changed.
Instead of `import { defineCustomElements } from '@carto/airship-components';` you have to use `import { defineCustomElements } from '@carto/airship-components/dist/loader';`



# [1.0.0-beta.2](https://github.com/CartoDB/airship/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2018-10-22)


### Bug Fixes

* **components:** Revert clear category selection [#332](https://github.com/CartoDB/airship/issues/332) ([8a18f4b](https://github.com/CartoDB/airship/commit/8a18f4b))



# [1.0.0-beta.1](https://github.com/CartoDB/airship/compare/v1.0.0-beta.0...v1.0.0-beta.1) (2018-10-19)


### Bug Fixes

* **components:** Avoid checking TouchEvent to fix Range Slider in Safari ([#404](https://github.com/CartoDB/airship/issues/404)) ([bc8c097](https://github.com/CartoDB/airship/commit/bc8c097))
* **styles:** Separate body and app classes to prevent breaking the `flex` chain. [#409](https://github.com/CartoDB/airship/issues/409) ([fb84bff](https://github.com/CartoDB/airship/commit/fb84bff))
* **styles:** separate css variables for active / hover button state ([5a0356c](https://github.com/CartoDB/airship/commit/5a0356c))


### Features

* **components:** Update Stencil to v0.13 ([#406](https://github.com/CartoDB/airship/issues/406)) ([f39d01d](https://github.com/CartoDB/airship/commit/f39d01d))


### BREAKING CHANGES

* **styles:** This PR splits the `as-app` class into `as-app-body` and `as-app`classes.
`as-app-body` is meant to be applied to the `body` document tag.
`as-app` is meant to be applied to the node that contains the whole application made with Airship.

Previous to this, since the app needs typically more than one node (one for the toolbar, one for the content), when used in a framework like Vue those two nodes needed to be wrapped in one div. Since components don't create the body tag, it caused an extra `div` that broke the display setting for the app and the layout broke.
* **styles:** buttons / `<a>` buttons state now use different variables for active and hover state (`--as-button-primary-color-active`, `--as-button-secondary-color-active`. `--as-button-secondary-color-focus`)
* **components:** Component methods should be invoked asynchronously with async/await or promises from now on. Please check documentation.



# [1.0.0-beta.0](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.46...v1.0.0-beta.0) (2018-10-08)


### Bug Fixes

* **docs:** Set proper paragraph styling ([#389](https://github.com/CartoDB/airship/issues/389)) ([724af91](https://github.com/CartoDB/airship/commit/724af91))



# [1.0.0-alpha.46](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.45...v1.0.0-alpha.46) (2018-10-04)


### Bug Fixes

* **components:** Adjust SVG inner elements to bounds ([#354](https://github.com/CartoDB/airship/issues/354)) ([ec6c79b](https://github.com/CartoDB/airship/commit/ec6c79b))
* **components:** Avoid moving all Range Slider thumbs in mobile ([#355](https://github.com/CartoDB/airship/issues/355)) ([b0a2b37](https://github.com/CartoDB/airship/commit/b0a2b37))
* **components:** Clear selected categories when categories array is changed ([#332](https://github.com/CartoDB/airship/issues/332)) ([6817b00](https://github.com/CartoDB/airship/commit/6817b00))
* **components:** Use default bar color when airship styles are not included ([#335](https://github.com/CartoDB/airship/issues/335)) ([2d73589](https://github.com/CartoDB/airship/commit/2d73589))
* **docs:** Add text to color utility classes showcase ([#383](https://github.com/CartoDB/airship/issues/383)) ([c7668c6](https://github.com/CartoDB/airship/commit/c7668c6))
* **docs:** Fix double dash bug in catalog ([#364](https://github.com/CartoDB/airship/issues/364)) ([3238b16](https://github.com/CartoDB/airship/commit/3238b16))
* **docs:** Modify layout image path ([#358](https://github.com/CartoDB/airship/issues/358)) ([65fd91b](https://github.com/CartoDB/airship/commit/65fd91b))
* Replace broken link ([b0140dc](https://github.com/CartoDB/airship/commit/b0140dc))
* Replace broken link ([942a4fe](https://github.com/CartoDB/airship/commit/942a4fe))


### Features

* **components:** Built-in label in Switch component ([#366](https://github.com/CartoDB/airship/issues/366)) ([45df160](https://github.com/CartoDB/airship/commit/45df160))



# [1.0.0-alpha.45](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.44...v1.0.0-alpha.45) (2018-09-28)


### Bug Fixes

* **components:** Fix range-slider on mobile ([#344](https://github.com/CartoDB/airship/issues/344)) ([39e09e4](https://github.com/CartoDB/airship/commit/39e09e4))


### Features

* **docs:** Angular integration guide ([#328](https://github.com/CartoDB/airship/issues/328)) ([bb526d6](https://github.com/CartoDB/airship/commit/bb526d6))



# [1.0.0-alpha.44](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.43...v1.0.0-alpha.44) (2018-09-24)


### Bug Fixes

* **components:** Fix Range Slider position bug ([#316](https://github.com/CartoDB/airship/issues/316)) ([92c83c7](https://github.com/CartoDB/airship/commit/92c83c7))


### Features

* Refactor layout ([#313](https://github.com/CartoDB/airship/issues/313)) ([740bb97](https://github.com/CartoDB/airship/commit/740bb97))
* **components:** Add function to format display value in Category Widget ([#317](https://github.com/CartoDB/airship/issues/317)) ([25fc9cb](https://github.com/CartoDB/airship/commit/25fc9cb))
* **docs:** Add icons list to reference ([#314](https://github.com/CartoDB/airship/issues/314)) ([6b35b3a](https://github.com/CartoDB/airship/commit/6b35b3a))


### BREAKING CHANGES

* This commit introduces several changes:

* Added default margin in Sidebar and Map Footer.
* New layout scaffolding.
* Changed component as-application-content to as-responsive-content.



# [1.0.0-alpha.43](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.42...v1.0.0-alpha.43) (2018-09-19)


### Bug Fixes

* **components:** 300 fix css vars ([#305](https://github.com/CartoDB/airship/issues/305)) ([ec35fae](https://github.com/CartoDB/airship/commit/ec35fae))
* **components:** Adjust selection to bucket start when data changes ([#306](https://github.com/CartoDB/airship/issues/306)) ([f733076](https://github.com/CartoDB/airship/commit/f733076))
* **docs:** Add dash case examples ([#310](https://github.com/CartoDB/airship/issues/310)) ([d2ada56](https://github.com/CartoDB/airship/commit/d2ada56))
* **styles:** Allow panels to scroll when exceeding max-height ([#307](https://github.com/CartoDB/airship/issues/307)) ([8f2196c](https://github.com/CartoDB/airship/commit/8f2196c))
* **styles:** Fix variable typos ([#280](https://github.com/CartoDB/airship/issues/280)) ([ea6413f](https://github.com/CartoDB/airship/commit/ea6413f))
* **styles:** Reduce utilities size ([#283](https://github.com/CartoDB/airship/issues/283)) ([bafd230](https://github.com/CartoDB/airship/commit/bafd230))


### Features

* **components:** 298 recover switch component ([#308](https://github.com/CartoDB/airship/issues/308)) ([e7df9b9](https://github.com/CartoDB/airship/commit/e7df9b9))
* **components:** Add disable widgets interactivity property ([#303](https://github.com/CartoDB/airship/issues/303)) ([6465d54](https://github.com/CartoDB/airship/commit/6465d54))
* **components:** Add dropdown component ([#290](https://github.com/CartoDB/airship/issues/290)) ([cb8598c](https://github.com/CartoDB/airship/commit/cb8598c))
* **docs:** Add basic layout guide ([#281](https://github.com/CartoDB/airship/issues/281)) ([b8fa9e2](https://github.com/CartoDB/airship/commit/b8fa9e2))


### BREAKING CHANGES

* **components:** The switch element is now a web component.

* Revert "Remove as-switch component"

This reverts commit acb63b2610d2d53c6af4c4e1dea631b125e99745.

* Update switch component

* Add switch component documentation

* ignore linter in long line

* Pr fixes

* Reflect to attributes

* Remove widget styles, add widget component doc

* Fix styles



# [1.0.0-alpha.42](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.41...v1.0.0-alpha.42) (2018-09-14)


### Bug Fixes

* **styles:** Add sidebar scroll ([#273](https://github.com/CartoDB/airship/issues/273)) ([a2af1ec](https://github.com/CartoDB/airship/commit/a2af1ec))


### Features

* **components:** Add README.md to Components package ([#276](https://github.com/CartoDB/airship/issues/276)) ([2664429](https://github.com/CartoDB/airship/commit/2664429))
* **docs:** Add carto-vl guide ([#271](https://github.com/CartoDB/airship/issues/271)) ([ef17835](https://github.com/CartoDB/airship/commit/ef17835))
* **docs:** Advanced Styling guide ([#268](https://github.com/CartoDB/airship/issues/268)) ([b8ff342](https://github.com/CartoDB/airship/commit/b8ff342))
* **docs:** Update map-wrapper docs ([#265](https://github.com/CartoDB/airship/issues/265)) ([8fcaa82](https://github.com/CartoDB/airship/commit/8fcaa82))
* **docs:** Update sidebar docs ([#264](https://github.com/CartoDB/airship/issues/264)) ([1341ad3](https://github.com/CartoDB/airship/commit/1341ad3))
* **styles:** 270 minify css ([#277](https://github.com/CartoDB/airship/issues/277)) ([56bb8b5](https://github.com/CartoDB/airship/commit/56bb8b5))
* 259 rename cdn ([#278](https://github.com/CartoDB/airship/issues/278)) ([83be2a7](https://github.com/CartoDB/airship/commit/83be2a7))



# [1.0.0-alpha.41](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.38...v1.0.0-alpha.41) (2018-09-13)


### Bug Fixes

* **components:** Do not take Other category into account in total percentage sum ([f45ab2f](https://github.com/CartoDB/airship/commit/f45ab2f))
* **style:** review as map class ([#263](https://github.com/CartoDB/airship/issues/263)) ([71e8638](https://github.com/CartoDB/airship/commit/71e8638))


### Features

* **docs:** Add icons guide ([#258](https://github.com/CartoDB/airship/issues/258)) ([fa67101](https://github.com/CartoDB/airship/commit/fa67101))
* **docs:** Add web components guide ([#256](https://github.com/CartoDB/airship/issues/256)) ([e45da60](https://github.com/CartoDB/airship/commit/e45da60))
* **docs:** Advanced CARTO.js guide using Airship ([#266](https://github.com/CartoDB/airship/issues/266)) ([2abbe3d](https://github.com/CartoDB/airship/commit/2abbe3d))
* **docs:** Content guide ([#255](https://github.com/CartoDB/airship/issues/255)) ([47d3fc7](https://github.com/CartoDB/airship/commit/47d3fc7))
* **docs:** CSS Elements guide ([3fafc33](https://github.com/CartoDB/airship/commit/3fafc33))


### BREAKING CHANGES

* **style:** Remove `as-map` class. This class was not needed anymore and added extra complexity to our layout. All maps using `.as-map` class will break.



# [1.0.0-alpha.38](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.37...v1.0.0-alpha.38) (2018-09-05)


### Bug Fixes

* **chore:** Add first initial structure for docs ([#253](https://github.com/CartoDB/airship/issues/253)) ([923f3b3](https://github.com/CartoDB/airship/commit/923f3b3))
* **chore:** Add style and main entry points to the icons package ([#252](https://github.com/CartoDB/airship/issues/252)) ([745e28a](https://github.com/CartoDB/airship/commit/745e28a))
* **chore:** Remove empty file ([18c1fd9](https://github.com/CartoDB/airship/commit/18c1fd9))
* **chore:** rename `doc` directory to `docs` ([#250](https://github.com/CartoDB/airship/issues/250)) ([b0332ef](https://github.com/CartoDB/airship/commit/b0332ef))
* **components:** Add default height to range-slider ([#230](https://github.com/CartoDB/airship/issues/230)) ([83e3ac3](https://github.com/CartoDB/airship/commit/83e3ac3))
* **components:** Better format in Histogram axis and some other histogram fixes ([1f83aa1](https://github.com/CartoDB/airship/commit/1f83aa1))
* **components:** Modify slider width ([#229](https://github.com/CartoDB/airship/issues/229)) ([be6c79a](https://github.com/CartoDB/airship/commit/be6c79a))
* **components:** Remove thumb text translation in Range Slider ([cff9a39](https://github.com/CartoDB/airship/commit/cff9a39))
* **docs:** Add application content section into layout ([#214](https://github.com/CartoDB/airship/issues/214)) ([02f6043](https://github.com/CartoDB/airship/commit/02f6043))
* **docs:** Add mention to .as-toolbar and tell about default toolbar position ([#231](https://github.com/CartoDB/airship/issues/231)) ([9b6da1a](https://github.com/CartoDB/airship/commit/9b6da1a))
* **docs:** Tell users about setting JS code inside load event in <as-application-content> ([e9d067e](https://github.com/CartoDB/airship/commit/e9d067e))
* **styles:** Change links color in toolbar to color-ui-01 ([#249](https://github.com/CartoDB/airship/issues/249)) ([30395b0](https://github.com/CartoDB/airship/commit/30395b0))
* **styles:** Make tabs scroll horizontally ([#228](https://github.com/CartoDB/airship/issues/228)) ([43962e3](https://github.com/CartoDB/airship/commit/43962e3))
* **styles:** Respect position classes in sidebar layout ([2145124](https://github.com/CartoDB/airship/commit/2145124))
* **styles:** Set proper disabled colors in Switch ([0ea863b](https://github.com/CartoDB/airship/commit/0ea863b))


### Features

* **docs:** 212 getting started guide ([#232](https://github.com/CartoDB/airship/issues/232)) ([5e1cbbe](https://github.com/CartoDB/airship/commit/5e1cbbe))
* **docs:** 233 guides getting started ([#243](https://github.com/CartoDB/airship/issues/243)) ([0d8a980](https://github.com/CartoDB/airship/commit/0d8a980))
* **styles:** 211 Dropdown menu ([#152](https://github.com/CartoDB/airship/issues/152)) ([973a377](https://github.com/CartoDB/airship/commit/973a377))



# [1.0.0-alpha.37](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.36...v1.0.0-alpha.37) (2018-08-24)


### Bug Fixes

* **components:** improve several aspects of histogram widget ([1ae148e](https://github.com/CartoDB/airship/commit/1ae148e))



# [1.0.0-alpha.36](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.35...v1.0.0-alpha.36) (2018-08-24)


### Bug Fixes

* **components:** Improve category widget clear selection button [#195](https://github.com/CartoDB/airship/issues/195) ([ab2606e](https://github.com/CartoDB/airship/commit/ab2606e))


### Features

* **components:** Histogram widget [#170](https://github.com/CartoDB/airship/issues/170) ([a18b28b](https://github.com/CartoDB/airship/commit/a18b28b))



# [1.0.0-alpha.35](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.26...v1.0.0-alpha.35) (2018-08-23)


### Bug Fixes

* **chore:** Better gitignore ([#132](https://github.com/CartoDB/airship/issues/132)) ([b1d9001](https://github.com/CartoDB/airship/commit/b1d9001))
* **chore:** Capitalize HTML ([3266fe9](https://github.com/CartoDB/airship/commit/3266fe9))
* **chore:** Update gitignore ([8f0a074](https://github.com/CartoDB/airship/commit/8f0a074))
* **chore:** Update Readme to include airship icons ([7563c6b](https://github.com/CartoDB/airship/commit/7563c6b))
* **components:** change variable names in CategoryWidget ([#134](https://github.com/CartoDB/airship/issues/134)) ([359f1c4](https://github.com/CartoDB/airship/commit/359f1c4))
* **docs:** remove comma ([10d3302](https://github.com/CartoDB/airship/commit/10d3302))
* **examples:** use showBottom instead of showBottomPanel ([#126](https://github.com/CartoDB/airship/issues/126)) ([99261f7](https://github.com/CartoDB/airship/commit/99261f7))
* **icons:** Add as-icon prefix ([#135](https://github.com/CartoDB/airship/issues/135)) ([b6a2556](https://github.com/CartoDB/airship/commit/b6a2556))
* **styles:** Buttons sizing ([#199](https://github.com/CartoDB/airship/issues/199)) ([5c9e156](https://github.com/CartoDB/airship/commit/5c9e156))
* **styles:** Remove margin in badges ([#169](https://github.com/CartoDB/airship/issues/169)) ([ca271f2](https://github.com/CartoDB/airship/commit/ca271f2))
* **styles:** reset margin in .as-tabs__item ([#114](https://github.com/CartoDB/airship/issues/114)) ([458d315](https://github.com/CartoDB/airship/commit/458d315))
* **tests:** Update test suite ([#139](https://github.com/CartoDB/airship/issues/139)) ([7c7f6bf](https://github.com/CartoDB/airship/commit/7c7f6bf))


### Features

* **components:** Category Widget ([#107](https://github.com/CartoDB/airship/issues/107)) ([e6cf020](https://github.com/CartoDB/airship/commit/e6cf020))
* **components:** Range Slider [#141](https://github.com/CartoDB/airship/issues/141) ([ef48fd0](https://github.com/CartoDB/airship/commit/ef48fd0))
* **docs:** Add icons developer and usage docs ([b2899e0](https://github.com/CartoDB/airship/commit/b2899e0))
* **docs:** Add icons to catalog ([dbcd395](https://github.com/CartoDB/airship/commit/dbcd395))
* **docs:** Add style guidelines ([#84](https://github.com/CartoDB/airship/issues/84)) ([f1b118e](https://github.com/CartoDB/airship/commit/f1b118e)), closes [#65](https://github.com/CartoDB/airship/issues/65)
* **icons:** Add icons dist folder ([202e755](https://github.com/CartoDB/airship/commit/202e755))
* **style:** Add modal element ([#162](https://github.com/CartoDB/airship/issues/162)) ([464c049](https://github.com/CartoDB/airship/commit/464c049))
* **styles:** Add Airship icons package ([#128](https://github.com/CartoDB/airship/issues/128)) ([1b3042a](https://github.com/CartoDB/airship/commit/1b3042a))
* **styles:** Add basic colors ([141b38a](https://github.com/CartoDB/airship/commit/141b38a))
* **styles:** Add basic tables ([#153](https://github.com/CartoDB/airship/issues/153)) ([381c493](https://github.com/CartoDB/airship/commit/381c493))
* **styles:** Add buttons buttons ([#116](https://github.com/CartoDB/airship/issues/116)) ([6003b96](https://github.com/CartoDB/airship/commit/6003b96)), closes [#118](https://github.com/CartoDB/airship/issues/118) [#119](https://github.com/CartoDB/airship/issues/119) [#124](https://github.com/CartoDB/airship/issues/124) [#137](https://github.com/CartoDB/airship/issues/137)
* **styles:** Add checkbox element ([#143](https://github.com/CartoDB/airship/issues/143)) ([15ce9f2](https://github.com/CartoDB/airship/commit/15ce9f2)), closes [#144](https://github.com/CartoDB/airship/issues/144) [#145](https://github.com/CartoDB/airship/issues/145)
* **styles:** Add colors and typographies ([80be244](https://github.com/CartoDB/airship/commit/80be244))
* **styles:** add inputs ([#115](https://github.com/CartoDB/airship/issues/115)) ([2ab4085](https://github.com/CartoDB/airship/commit/2ab4085)), closes [#133](https://github.com/CartoDB/airship/issues/133)
* **styles:** Add layout styles [#34](https://github.com/CartoDB/airship/issues/34) ([1fa6b83](https://github.com/CartoDB/airship/commit/1fa6b83)), closes [#95](https://github.com/CartoDB/airship/issues/95) [#98](https://github.com/CartoDB/airship/issues/98) [#101](https://github.com/CartoDB/airship/issues/101) [#102](https://github.com/CartoDB/airship/issues/102)
* **styles:** Add loading component ([#156](https://github.com/CartoDB/airship/issues/156)) ([eeac7c6](https://github.com/CartoDB/airship/commit/eeac7c6))
* **styles:** Add switch element ([#155](https://github.com/CartoDB/airship/issues/155)) ([7853cac](https://github.com/CartoDB/airship/commit/7853cac))
* **styles:** Add tabs element ([#103](https://github.com/CartoDB/airship/issues/103)) ([8b9571c](https://github.com/CartoDB/airship/commit/8b9571c)), closes [#104](https://github.com/CartoDB/airship/issues/104)
* **styles:** Add tooltips ([#146](https://github.com/CartoDB/airship/issues/146)) ([5f8ebf3](https://github.com/CartoDB/airship/commit/5f8ebf3))
* **styles:** add typography variables and modifiers ([#110](https://github.com/CartoDB/airship/issues/110)) ([e08acc3](https://github.com/CartoDB/airship/commit/e08acc3))
* **styles:** avatar ([#120](https://github.com/CartoDB/airship/issues/120)) ([94fcda6](https://github.com/CartoDB/airship/commit/94fcda6))
* **styles:** Banner ([#121](https://github.com/CartoDB/airship/issues/121)) ([e3b37ed](https://github.com/CartoDB/airship/commit/e3b37ed)), closes [#136](https://github.com/CartoDB/airship/issues/136)
* **styles:** breadcrumbs ([#123](https://github.com/CartoDB/airship/issues/123)) ([97f1fb6](https://github.com/CartoDB/airship/commit/97f1fb6)), closes [#130](https://github.com/CartoDB/airship/issues/130)
* **styles:** flags ([#122](https://github.com/CartoDB/airship/issues/122)) ([7dcbc90](https://github.com/CartoDB/airship/commit/7dcbc90)), closes [#131](https://github.com/CartoDB/airship/issues/131)
* **styles:** Implement utility classes ([#193](https://github.com/CartoDB/airship/issues/193)) ([9b41d9c](https://github.com/CartoDB/airship/commit/9b41d9c))
* **styles:** Include typography through CSS ([#196](https://github.com/CartoDB/airship/issues/196)) ([5d13dad](https://github.com/CartoDB/airship/commit/5d13dad))
* **styles:** radio buttons ([#117](https://github.com/CartoDB/airship/issues/117)) ([e8c2cc4](https://github.com/CartoDB/airship/commit/e8c2cc4))
* **styles:** remove reset.css ([#112](https://github.com/CartoDB/airship/issues/112)) ([3b14925](https://github.com/CartoDB/airship/commit/3b14925)), closes [#113](https://github.com/CartoDB/airship/issues/113)
* **test:** Generate image references from CI ([#63](https://github.com/CartoDB/airship/issues/63)) ([3c4e6ad](https://github.com/CartoDB/airship/commit/3c4e6ad))



# [1.0.0-alpha.26](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.25...v1.0.0-alpha.26) (2018-07-19)



# [1.0.0-alpha.25](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.24...v1.0.0-alpha.25) (2018-05-18)



# [1.0.0-alpha.24](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.23...v1.0.0-alpha.24) (2018-05-10)



# [1.0.0-alpha.23](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2018-04-26)



# [1.0.0-alpha.22](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2018-04-25)



# [1.0.0-alpha.21](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2018-04-25)



# [1.0.0-alpha.20](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2018-04-25)



# [1.0.0-alpha.19](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2018-04-23)



# [1.0.0-alpha.18](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.17...v1.0.0-alpha.18) (2018-04-20)



# [1.0.0-alpha.17](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.16...v1.0.0-alpha.17) (2018-04-18)



# [1.0.0-alpha.16](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2018-04-18)



# [1.0.0-alpha.15](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2018-04-18)



# [1.0.0-alpha.14](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2018-04-17)



# [1.0.0-alpha.13](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2018-04-16)



# [1.0.0-alpha.12](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2018-04-16)



# [1.0.0-alpha.11](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2018-04-11)



# [1.0.0-alpha.10](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2018-04-11)



# [1.0.0-alpha.9](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2018-04-10)



# [1.0.0-alpha.8](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2018-04-10)



# [1.0.0-alpha.7](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2018-04-10)



# [1.0.0-alpha.6](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2018-04-09)



# [1.0.0-alpha.5](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2018-04-09)



# [1.0.0-alpha.4](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2018-04-09)



# [1.0.0-alpha.3](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2018-04-09)



# [1.0.0-alpha.2](https://github.com/CartoDB/airship/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2018-04-09)



# 1.0.0-alpha.1 (2018-04-05)



