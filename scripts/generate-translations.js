const fs = require('fs-extra')
const manifest = require('../translation.manifest.json')
const pathToTranslations = 'node_modules/@meltwater/node-translation/dist'
const path = require('path')

generateTranslations()

function getRequiredTranslations (obj) {
  var finalTranslation = {}
  for (let i = 0; i < manifest.length; i++) {
    if (manifest[i] === '*') {
      finalTranslation = obj
      break
    }

    if (obj[manifest[i]]) {
      finalTranslation[manifest[i]] = obj[manifest[i]]
    }
  }

  return finalTranslation
}

/**
* Copies our translations to the destination directory, while stripping out translations we do not need.
* This is determined by reading translations-manifest.json.
* This should lead to a significant performance increase in page loading.
*/
function generateTranslations () {
  let pathToDest = path.join('src', 'translations')

  if (!fs.existsSync(pathToDest)) {
    fs.mkdirSync(pathToDest)
  } else {
    fs.emptyDirSync(pathToDest)
  }

  fs.readdirSync(pathToTranslations).forEach((value, index, files) => {
    files.forEach(file => {
      const fileName = file.split('.')[0]
      let contents = fs.readFileSync(pathToTranslations + '/' + file)
      let translations = JSON.parse(contents)
      let finalTranslations = getRequiredTranslations(translations)
      fs.writeFileSync(pathToDest + '/' + fileName + '.ts', `export const ${fileName} = ${JSON.stringify(finalTranslations)}`)
    })

    fs.writeFileSync(pathToDest + '/index.ts', `
import { da } from './da'
import { de } from './de'
import { en } from './en'
import { es } from './es'
import { fi } from './fi'
import { fr } from './fr'
import { ja } from './ja'
import { ko } from './ko'
import { nb } from './nb'
import { nl } from './nl'
import { pt } from './pt'
import { sv } from './sv'
import { zh_CN } from './zh_CN'
import { zh_TW } from './zh_TW'
export const allTranslations = {
  da: da,
  de: de,
  en: en,
  es: es,
  fi: fi,
  fr: fr,
  ja: ja,
  ko: ko,
  nb: nb,
  nl: nl,
  pt: pt,
  sv: sv,
  zh_CN: zh_CN,
  zh_TW: zh_TW
}
`)
  })
}