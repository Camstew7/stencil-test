// @ts-nocheck

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //
// ~~~~~~~~~ MOCK MANIFEST SERVICE ~~~~~~~~~~~~ //
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ //

// ts-nocheck is used to ignore the entire file here. I prefer to keep the empty method stubs
// of the mock with their original arguments even if not used. This help for reference as well as
// if we need to add some mock implementation. The only issue is keeping ts from barfing on itself.


import { ManifestClientV1 } from '@meltwater/ia-mocks/dist/core';

class ManifestClientServiceController {
  init() {}

  async getManifest() {
    return await ManifestClientV1.getCurrentManifest();
  }

  // Ask for treatment from the manifest service. If it is not included undefined should be returned.
  async getUserTreatment(treatment:string) {
    const manifest = await this.getManifest();
    return manifest.featureToggles.user.treatments[treatment];
  }

  async getNavigation() {
    const manifest = await this.getManifest();
    return {
        items: manifest.navigation,
        groups: manifest.navigationGroups
    }
  }

  async getCurrentUser() {
    const manifest = await this.getManifest();
    return manifest.user;
  }
}

export const ManifestClientService = new ManifestClientServiceController();