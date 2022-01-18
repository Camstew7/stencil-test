import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

import { version } from './package.json';

const stencilConfig: Config =  {
  namespace: 'mi-uw-labels-module',
  globalStyle: 'src/global/global.scss',
  globalScript: 'src/global/global.ts',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
    },
    // {
    //   type: 'docs-custom',
    //   generator: (docs: any) => {
    //     docs.version = version;
    //     //docs.allVersions = allVersions;
    //   }
    // },
  ],

  plugins: [
    sass({
      includePaths: ['./node_modules/'],
      injectGlobalPaths: [
        './node_modules/@meltwater/flux-design-tokens/web/all/all.scss'],
    })
  ],
  preamble:
    `
    {{REPO-NAME}} v${version} (Build ${version || 'number unknown'})
      Built: ${(new Date()).toLocaleString()}
    `,
  testing: {
    setupFiles: [
      'core-js'
    ],
    browserArgs: ['--no-sandbox', '--disable-setuid-sandbox']
  }
};

if (process.env.ENV === 'LOCAL') {
  stencilConfig.devServer = {
    address: 'localhost.meltwater.net',
    reloadStrategy: 'pageReload',
    port: 3000
  }
}

export const config: Config = stencilConfig;
