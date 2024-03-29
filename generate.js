const del = require("del");
const fs = require("fs-extra");
const uppercamelcase = require("uppercamelcase");

const iconsSrcFolder = "node_modules/bootstrap-icons/icons";

const iconsDestFolder = "icons/svg";
const indexFile = "icons/index.ts";
const allFile = "icons/all.ts";

let exportAllString = `\nexport const allIcons = {\n`;

const componentTemplate = fs.readFileSync(
  "src/templates/component.ts.tpl",
  "utf-8"
);

return (
  Promise.resolve()
    // delete feather folder and index
    .then(() => del([iconsDestFolder, indexFile, allFile]))
    // create destination folder
    .then(() => fs.mkdirSync(iconsDestFolder))
    .then(() => {
      fs.readdirSync(`${iconsSrcFolder}`).forEach((filename) => {
        "use strict";
        const iconName = stringify(stripExtension(filename));
        const exportName = stringify(uppercamelcase(iconName));

        const markup = fs.readFileSync(`${iconsSrcFolder}/${filename}`);
        let payload = String(markup)
          .replace(/width="[0-9]+"/, 'width="100%"')
          .replace(/height="[0-9]+"/, 'height="100%"')
          .match(/^<svg[^>]+?>[^]*<\/svg>$/);

        let output = componentTemplate
          .replace(/__EXPORT_NAME__/g, exportName)
          .replace(/__PAYLOAD__/, payload);

        fs.writeFileSync(`${iconsDestFolder}/${iconName}.ts`, output, "utf-8");

        fs.appendFileSync(
          indexFile,
          `export { ${exportName} } from './svg/${iconName}';\n`
        );

        fs.appendFileSync(
          allFile,
          `import { ${exportName} } from './svg/${iconName}';\n`
        );

        exportAllString += `  ${exportName},\n`;
      });

      exportAllString += `};\n`;

      fs.appendFileSync(allFile, exportAllString);

      fs.appendFileSync(indexFile, `\nexport { allIcons } from './all';\n`);
    })
    .catch((err) => console.log(err))
);

function stripExtension(str) {
  return str.substr(0, str.lastIndexOf("."));
}

function stringify(str) {
  return Number(str) ? `_${str}` : str;
}
