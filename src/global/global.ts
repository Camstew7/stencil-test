import { ManifestClientService } from '../services/manifest-client.service';
import { TranslationService } from '../services/translation.service';
import { TrackingService } from '@meltwater/mi-ia-tracking';
import { Environment } from '../services/environment.service';

import compareVersions from 'compare-versions';

export default () => {
  window.addEventListener('appChromeReady', () => {});

  // Initialize our modules instance of Manifest Service
  ManifestClientService.init();

  // Set the translation language
  TranslationService.setLanguage('en');
  ManifestClientService.getManifest()
    .then((manifest) => {
      TranslationService.setLanguage(manifest.user.language);
    })
    .catch((e) => {
      console.error(e);
      TranslationService.setLanguage('en');
    });

  // Setup tracking session (IF THIS IS NOT AN IA MODULE, THIS MAY BE REMOVED - CONTACT #team-cosmos IF UNSURE)
  // TrackingService.initTrackingSession('{{REPO-NAME}}');

  verifyFluxVersion();
};

async function verifyFluxVersion() {
  function printConsoleMessage() {
    if (compareVersions.compare(fluxLoadedVersion, Environment.MIN_FLUX_VERSION, '>=')) {
      let msg = `
        *** {{REPO-NAME}} - Minimum flux-web-components version met! - Congrats ***
        `;
      console.log(msg);
    } else {
      let msg = `
        *** {{REPO-NAME}} ***
        * Minimum flux-web-components version NOT met!
        * Required version v${Environment.MIN_FLUX_VERSION}
        * Loaded version v${fluxLoadedVersion}
        ***************************
        `;
      console.error(msg);
    }
  }

  let fluxLoadedVersion = window?.FluxWebComponents?.version;
  let interval = setInterval(async () => {
    fluxLoadedVersion = window?.FluxWebComponents?.version;
    if (fluxLoadedVersion) {
      clearInterval(interval);
      printConsoleMessage();
    }
  }, 200);
}
