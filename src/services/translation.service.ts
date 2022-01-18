import { allTranslations } from '../translations/index';

type TranslationObject<T> = {
  [P: string]: T;
};

class TranslationServiceController {
  setLanguage(language: string) {
    for (let [key, value] of (<any>Object).entries(allTranslations['en'])) {
      translations[key] = new Translation(allTranslations[language][key] || value);
    }
  }
}

export const TranslationService = new TranslationServiceController();
export const translations: TranslationObject<Translation> = {};

export class Translation {
  private _value: string;

  constructor(value: string) {
    this._value = value;
  }

  interpolate(interpolationObject: object) {
    let interpolatedValue = this._value;

    if (interpolationObject) {
      for (let placeholder in interpolationObject) {
        interpolatedValue = interpolatedValue.replace(`${placeholder}`, interpolationObject[placeholder]);
      }
    }
    return interpolatedValue;
  }

  get value() {
    return this._value;
  }
}
