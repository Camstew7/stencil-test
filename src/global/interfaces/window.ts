//import { Env } from './application-configuration';

export {}
declare global {
  interface Window {
   // __env__: Env;
    WalkMeAPI: any;
    isWalkmeReady: boolean;
    appContainerPlaceholder: {
      remove(): void
    }
    FluxWebComponents: {
      version: string;
    }
  }
}
