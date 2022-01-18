(async function generateDependenciesMd() {
  const package = require('../package.json');

  const fs = require('fs');
  const util = require('util');
  const asyncWriteFile = util.promisify(fs.writeFile);
  const fileDest = 'DEPENDENCIES.MD';

  let markdown = `# DEPENDENCIES.MD
  This file contains a list of required peer dependencies for the module. All of these must be installed alongside the module in order for it to work.

## The aforementioned list

| Package Name | Required Compatible Version |
| --- | --- |`;

  Object.keys(package.peerDependencies).map(k => {
    markdown += `
| ${k} | ${package.peerDependencies[k]} |`;
  });

  await asyncWriteFile(fileDest, markdown, 'utf8');
})();
