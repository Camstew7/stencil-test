(async function generateEnvTypings() {
  const { json2ts } = require('json-ts');
  const fs = require('fs')
  const util = require('util')
  const asyncReadFile = util.promisify(fs.readFile);
  const asyncWriteFile = util.promisify(fs.writeFile);
  const rootInterfaceName = 'ApplicationConfiguration';
  const interfaceDest = 'src/global/interfaces/application-configuration.ts';
  const interfaceSrc = 'config/local.json';

  const json2tsOptions = {
    rootName: rootInterfaceName,
    prefix: ''
  };

  const interfaceJson = await asyncReadFile(interfaceSrc, 'utf8');
  const interfaceTs = `${json2ts(interfaceJson, json2tsOptions)
                          .replace(new RegExp('interface', 'g'), 'export interface')}`;

  

  await asyncWriteFile(interfaceDest, interfaceTs, 'utf8')
})();