export interface IAsset {
  id: number | string;
  name: string;
  icon?: string;
}

export interface IAssetInput extends IAsset {
  isPreselected: boolean;
  isDisabled: boolean;
  selected: boolean;
}

export interface IAssetInput extends IAsset {
  isPreselected: boolean;
  isDisabled: boolean;
  selected: boolean;
}