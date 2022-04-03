const fs = require('fs');
const fse = require('fs-extra');
const configs = require('./package.json');

const VERSION = configs.version;
const SOURCE = './src';
const DESTINATION = './dist';
const TO_BE_EXCLUDED = ['scss', 'manifests'];

let tragetBrowser = process.argv.slice(2)[0]; // chromium or firefox (chromiumn as default)
if (typeof tragetBrowser !== 'string') tragetBrowser = 'chromium';
if (tragetBrowser !== 'chromium' && tragetBrowser !== 'firefox') throw Error('The target browser must be "chromium" or "firefox"');

const files = fs.readdirSync(SOURCE);
files.forEach(file => {
	if (!TO_BE_EXCLUDED.includes(file)) {
		fse.copySync(`${SOURCE}/${file}`, `${DESTINATION}/${file}`);
	}
});

let manifest = JSON.parse(fs.readFileSync(`${SOURCE}/manifests/${tragetBrowser}.manifest.json`));
manifest = { ...manifest, version: VERSION };
fs.writeFileSync(`${DESTINATION}/manifest.json`, JSON.stringify(manifest, null, '\t'));

if (tragetBrowser === 'firefox') {
	replace();
}

function replace(folder = '') {
	const files = fs.readdirSync(`${DESTINATION}/js/${folder}`);
	files.forEach(file => {
		if (fs.lstatSync(`${DESTINATION}/js/${folder}${file}`).isDirectory()) {
			replace(`${folder}${file}/`);
		} else {
			const content = fs.readFileSync(`${DESTINATION}/js/${folder}${file}`, 'utf8');
			const newContent = content.replaceAll('chrome.', 'browser.');
			fs.writeFileSync(`${DESTINATION}/js/${folder}${file}`, newContent, 'utf8');
		}
	});
}
