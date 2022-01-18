import { CreateFakeManifestClientV1, CreateFakeHeader, CreateFakeNav } from '@meltwater/ia-mocks/dist/e2e';
import { manifestDemoDataV1 } from '@meltwater/ia-mocks/dist/mock-data';
import { E2EPage } from '@stencil/core/testing';
import * as config from '../config/local.json';

export async function convertToHomeE2ePage(page: E2EPage) {
  await page.evaluateOnNewDocument((config) => {
    (window as any).__env__ = config.env;
    window['analytics'] = {
      identify: () => {}
    };
    window['gafIdentityClientV2'] = {
      Initializer: {
        initialize: () => {}
      },
      UserClient: {
        getInstance: () => Promise.resolve({
          getCurrentUser: () => {}
        })
      },
      AuthenticationClient: {
        onError: () => {}
      },
      Environments: {
        STAGING: 'staging',
        PRODUCTION: 'production'
      }
    }
  }, (config));

  await page.evaluateOnNewDocument(CreateFakeManifestClientV1, manifestDemoDataV1);

  // We need the fake header and nav so they fire their "ready" events
  await page.evaluateOnNewDocument(CreateFakeHeader);
  await page.evaluateOnNewDocument(CreateFakeNav);
}