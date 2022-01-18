/**
 * USAGE EXAMPLE
 * import { Environment } from './environment.service';
 * const myEnvVar = Environment.MIN_FLUX_VERSION;
 */


interface Env {
  MIN_FLUX_VERSION: string;
  API_TIMEOUT_MS: number;
}

const staging: Env = {
  MIN_FLUX_VERSION: '1.4.1',
  API_TIMEOUT_MS: 3000,
};

const production: Env = {
  MIN_FLUX_VERSION: '1.4.1',
  API_TIMEOUT_MS: 10000,
};

class EnvironmentController {
  constructor() {
    // let env;
    const currentHostName = window.location.hostname;

    if (currentHostName.indexOf('.com') !== -1) {
      for (let [key, value] of (<any>Object).entries(production)) {
        this[key] = value;
      }
    } else {
      for (let [key, value] of (<any>Object).entries(staging)) {
        this[key] = value;
      }
    }
  }
}

export const Environment = new EnvironmentController() as Env;
