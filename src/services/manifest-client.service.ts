import { EXTERNAL_NAME } from '@meltwater/mi-manifest-client/build/external-name.js';
const manifestClient: any = window[EXTERNAL_NAME];

interface Company {
  country: string;
  created: string;
  isExternalIdp: boolean;
  modified: string;
  name: string;
  overrides: any;
  _id: string;
}

class ManifestClientServiceController {
  constructor() {}

  init() {
    if (!manifestClient) {
      throw new Error('Could not find Manifest Client');
    }

    let currentManifestEnvironment;
    const currentHostName = window.location.hostname;

    if (currentHostName.indexOf('.com') !== -1) {
      currentManifestEnvironment = manifestClient.Environments.PRODUCTION;
    } else {
      currentManifestEnvironment = manifestClient.Environments.STAGING;
    }

    manifestClient.Initializer.initialize(currentManifestEnvironment);

    manifestClient.ManifestClient.getInstance().then((manifestClientInstance) => {
      manifestClientInstance.getCurrentManifest();
    });
  }

  async getManifest() {
    let instance = await manifestClient.ManifestClient.getInstance();
    return await instance.getCurrentManifest();
  }

  async getCurrentUser() {
    const manifest = await this.getManifest();
    return manifest.user;
  }

  async getCurrentCompany(): Promise<Company> {
    const manifest = await this.getManifest();
    return manifest.company as Company;
  }

  // Ask for treatment from the manifest service. If it is not included undefined should be returned.
  async getUserTreatment(treatment: string) {
    const manifest = await this.getManifest();
    return manifest.featureToggles.user.treatments[treatment];
  }

  async getCompanyTreatment(treatment: string) {
    const manifest = await this.getManifest();
    return manifest.featureToggles.company.treatments[treatment];
  }

  async getNavigation() {
    const manifest = await this.getManifest();
    return {
      items: manifest.navigation,
      groups: manifest.navigationGroups,
    };
  }
}

export const ManifestClientService = new ManifestClientServiceController();
