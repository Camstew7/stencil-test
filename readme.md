* Search for `{{REPO-NAME}}` everywhere in the repo and replace it
* npm i
* To Add a new component
  * `npx stencil generate my-component-name`
  * In the new directory change .css file to .scss file if desired
    * Also change reference in component.tsx file to reference the .scss file instead of .css
* 
* Add env vars to drone
  * npm_token_ro (allow on pull requests)
  * npm_token_write
  * gh_token


# Below here is just copy-pasta - needs to be updated


[![Build Status](https://drone.meltwater.io/api/badges/meltwater/mi-uw-labels-module/status.svg)](https://drone.meltwater.io/meltwater/mi-uw-labels-module)
[![CDN](https://img.shields.io/badge/CDN-MPKG-%2328BBBB)](https://github.com/meltwater/meltwater-npm-cdn)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  
  <img src="https://user-images.githubusercontent.com/24526361/75278499-fc422580-57d7-11ea-80b3-4586e9c204b2.png" />
  <h1 align="center" style="margin-top:0">MI Universal Workflow - Labels Module</h3>
  <p align="center">Universal workflows related to asset labels</p>
  <p align="center">This repo is owned by team cosmos. Our public room is #team-cosmos on slack</p>
</p>
<br />

<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Below here is just copy-pasta - needs to be updated](#below-here-is-just-copy-pasta---needs-to-be-updated)
  - [Table of Contents](#table-of-contents)
  - [About the project](#about-the-project)
    - [Built with](#built-with)
  - [Tutorial Support](#tutorial-support)
  - [Getting started](#getting-started)
    - [REQUIRED Prerequisites](#required-prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
      - [Label Assignment Modal](#label-assignment-modal)
      - [Properties](#properties)
      - [Methods](#methods)
      - [Events](#events)
      - [Examples](#examples)
      - [Label Aware Input Selector](#label-aware-input-selector)
      - [Properties](#properties-1)
      - [Methods](#methods-1)
      - [Events](#events-1)
      - [Examples](#examples-1)
  - [FAQ](#faq)
  - [HALP!](#halp)
  - [Contributing](#contributing)
    - [Readme](#readme)
    - [Installation](#installation-1)
    - [FoRmAtTiNg](#formatting)
  - [Versioning](#versioning)
  - [CI / CD](#ci--cd)
    - [Releasing / Releases](#releasing--releases)

<!-- ABOUT THE PROJECT -->
## About the project

![image](screenshot.png)

This module contains _framework agnostic_ universal workflows related to MI asset labels. The goal of this module is to provide an easy to use module to developers that delivers consistent and efficient workflows to the user.

The following workflows are currently support by this module
* Labels selection for any asset currently supported by labels (includes support for bulk actions)

### Built with
* [AWS](https://aws.amazon.com/)
* [Drone](https://drone.meltwater.io/)
* [Stencil](https://stenciljs.com/)

## Tutorial Support

At this time there is no requirement for tutorial support in these workflows.

<!-- GETTING STARTED -->
## Getting started

This section will describe how to use this module in your application. There are a few _required_ peer dependencies described in the prerequisites section. A simple html attribute is added to your page. Apply some attributes and use the exposes API methods. 
This module consists of lazy loaded components, meaning that if you only use some of the workflows provided you will not pay the "cost" of downloading and executing code for all the unused components.

### REQUIRED Prerequisites

Please refer to [DEPENDENCIES.MD](DEPENDENCIES.MD)

### Installation 

This module is distributed via MPKG an internal CDN. Include the follow script tags in your application, replace {{VERSION}} with the correct version you'd like to include in production. Using a static version provides benefits such as client side caching. In a staging or development environment "latest" can be used to test with the most current version of the module.

```html
<script type="module"
    src="https://assets.meltwater.io/mpkg/mi-uw-labels-module/{{VERSION}}/dist/mi-uw-labels-module/mi-uw-labels-module.esm.js">
  </script>
  <script nomodule
    src="https://assets.meltwater.io/mpkg/mi-uw-labels-module/{{VERSION}}/dist/mi-uw-labels-module/mi-uw-labels-module.js">
  </script>
```

### Usage

The module uses a "controller" component to provide easy to use API methods. Include the controller component and provide the attributes described. Use API methods for controlling the workflows and listen for DOM events to follow the workflow lifecycle. Some API methods may return promises that resolve when the user completes the workflow.

#### Label Assignment Modal

This modal is for managing which labels are assigned to which assets, as well as creating new labels.

![image](https://user-images.githubusercontent.com/24526361/94697669-74d90980-0306-11eb-8758-6f171eeb02da.png)

#### Properties

Currently no properties.

| Property | Attribute | Description | Type | Default | Required? |
| --- | --- | --- | --- | --- | --- |

#### Methods

* `openSelectLabelsModal({assetType, assets}): Promise<returnType>` : Displays the select labels modal for modifying the labels of the passed assets. Returns a promise.

| Name | Interface | Description |
| --- | --- | --- |
| `assetType` | `string` | The asset type of the assets being passed. |
| `assets` | `{ id: number \| string, name: string }[]` | The assets allowed to be labeled. |
| `returnType` | `{ action: 'updated' \| 'closed' }` | Object that contains an `action`. The `action` property indicates the result of user action taken in the modal. `closed` indicates that the user simply dismissed the modal without making any changes, `updated` means that the user modified the selections and that the calling application may require pulling updated data. |

#### Events

Currently no events.

| Name | Description | Type |
| --- | --- | --- |

#### Examples

```html
<mi-uw-labels-controller></mi-uw-labels-controller>
<script>
  const uwLabelsController = document.querySelector('mi-uw-labels-controller');

  uwLabelsController.openSelectLabelsModal({assetType: 'search', assets:[{id: '123', name: 'asset one'}, {id:'456', name: 'asset two'}]}).then( detail => {
          alert(`Labels UI closed with action: ${detail.action}`);
        })

  </script>
```

#### Label Aware Input Selector

This modal is for passing passing in a set of assets (searches at the moment), and having them automatically bucketed in any labels a company has setup.

![image](https://user-images.githubusercontent.com/24526361/94697906-bd90c280-0306-11eb-8c6f-ce5116de3ece.png)

#### Properties

Currently no properties.

| Property | Attribute | Description | Type | Default | Required? |
| --- | --- | --- | --- | --- | --- |

#### Methods

* `openInputModal({assetType, assets, maxSelectionLimit?}): Promise<returnType>` : Displays the label aware input selector modal for bucketing assets into labels and allowing a user to navigate them while selecting assets as inputs. Returns a promise.

| Name | Interface | Description |
| --- | --- | --- |
| `assetType` | `string` | The asset type of the assets being passed. |
| `assets` | `{ id: number \| string, name: string, isPreselected?: boolean \| isDisabled?: boolean }[]` | The assets to select from |
| `returnType` | `{ action: 'select' \| 'closed' }` | Object that contains an `action`. The `action` property indicates the result of user action taken in the modal. `closed` indicates that the user simply dismissed the modal without making any changes, `selected` means that the user modified the selections and that the calling application may require pulling updated data. |

#### Events

Currently no events.

| Name | Description | Type |
| --- | --- | --- |

#### Examples

```html
<mi-uw-labels-controller></mi-uw-labels-controller>
<script>
  const uwLabelsController = document.querySelector('mi-uw-labels-controller');

  uwLabelsController.openInputModal({
                                      assetType: 'search',
                                      assets: [
                                        { id: '123',
                                          name: 'asset one',
                                          isPreselected: false, // set to true if the dialog should open with this item checked
                                          isDisabled: false // set to true if the dialog should use the standard disabled (hidden) state for this item
                                        },
                                        { id:'456',
                                          name: 'asset two',
                                          isPreselected: false,
                                          isDisabled: false
                                        }
                                      ],
                                      maxSelectionLimit: 5 // optional
                                    })
                      .then(detail => {
                        if (detail.action !== 'select') {
                          return;
                        }

                        console.log(detail.ids); // ids of selected assets
                      })

  </script>
```

## FAQ

* Q: What do you mean by "asset type"?
  A: An asset type is an entity in the MI application, some examples include "search", "rss feed", "newsletter", "project", even "tag".
* Q: The asset type I want to use isn't support by labels or I don't know if it is supported, how do I find out?
  A: Support is two-fold. Labels and "assets" must both support the type. An assets service from team Cosmos is used for features such as the [finder](https://github.com/meltwater/mi-finder), is the asset type currently findable? If yes, you are halfway there. Please reach out to #team-cosmos to get asset support.
* Q: The module doesn't work or I get console errors, what gives?
  A: First and foremost ensure that all prerequisites are met, not properly including or initializing any of the requirements is the most common cause of issues with this module.

## HALP! 

"I need halp! The module isn't working as expected, it doesn't support my use case, or I'm having some kind of problem and just need some friggin halp!", if this sounds like you please reach out to #team-cosmos. We are happy to help you get this module working. We are also happy receive feedback that can help improve the module or documentation. If you're having an issue then chances are that other people are as well and we'd like to improve wherever possible.

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Create your Feature Branch (`git checkout -b yourFeatureBranch`)
2. Commit your Changes (`git commit -m 'fix: explanation of what makes it a fix bump'`)
3. Push to the Branch (`git push --set-upstream origin yourFeatureBranch`)
4. Open a Pull Request

### Readme

Please ensure that any changes or additions are properly documented. The readme contains a table of contents that is automagically kept up to date with a VSCODE extension [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one). Please install and use this addon to properly maintain the readme and table of contents. 

### Installation

```
npm install
npm run start
```

### FoRmAtTiNg

An `.editorconfig` and `.prettierrc` file are both included in this project. Please ensure that files are correctly formatted to these settings before submitting a PR.

## Versioning

Semantic release is followed for versioning. Major releases are only made on breaking changes. Old major versions may be deprecated by the owner.

## CI / CD

### Releasing / Releases

Merges to master are automatically versioned and deployed to MPKG.


