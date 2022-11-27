const fs = require('fs');
const fse = require('fs-extra');
const configs = require('./package.json');

const VERSION = configs.version;
const SOURCE = './src';
const DESTINATION = './dist';
const TO_BE_EXCLUDED = ['scss', 'manifests'];

const targetBrowser = process.argv.slice(2)[0] || 'chromium'; // "chromium" or "firefox" (chromium as default)

const files = fs.readdirSync(SOURCE);
files.forEach((file) => {
  if (!TO_BE_EXCLUDED.includes(file)) {
    fse.copySync(`${SOURCE}/${file}`, `${DESTINATION}/${file}`);
  }
});

const manifest = {
  ...JSON.parse(
    fs.readFileSync(`${SOURCE}/manifests/${targetBrowser}.manifest.json`)
  ),
  version: VERSION,
};
fs.writeFileSync(
  `${DESTINATION}/manifest.json`,
  JSON.stringify(manifest, null, '\t')
);

if (targetBrowser === 'firefox') adaptForFirefox();

function adaptForFirefox(folder = '') {
  const jsFolder = `${DESTINATION}/js/${folder}`;
  const files = fs.readdirSync(jsFolder);
  files.forEach((file) => {
    if (fs.lstatSync(`${jsFolder}${file}`).isDirectory()) {
      adaptForFirefox(`${folder}${file}/`);
    } else {
      const content = fs.readFileSync(`${jsFolder}${file}`, 'utf8');
      const newContent = content.replaceAll('chrome.', 'browser.');
      fs.writeFileSync(`${jsFolder}${file}`, newContent, 'utf8');
    }
  });
}
