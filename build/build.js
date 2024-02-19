// let commander = require("commander");
const { Command } = require('commander');
const commander = new Command();
let config = require("../build/config");
let handlebarsToHtml = require("../build/handlebars-to-html");

// console.log('commander', commander);
// console.log('process.argv', process.argv);

commander
  .usage("-templates <pattern> -d <path>")
  .description("Write handlebars templates to a directory as static html.")
  .option("-d, --directory", "output directory")
  .option("-H, --helpers", "path to JavaScript file containing helpers")
  .option("-p, --partials [pattern]", "glob pattern to match partial files")
  .option("-l, --layouts [pattern]", "glob pattern to match layout files")
  .option("-t, --templates <pattern>", "glob pattern to match template files")
  .option("-v, --verbose", "output more information to console")
  .parse(process.argv);

// console.log('commander', commander);
// console.log('commander.options', commander.options);
// console.log('commander._optionValues', commander._optionValues);
// console.log('commander.verbose', commander.verbose);
// console.log('commander.partials', commander.partials);
// console.log('commander.layouts', commander.layouts);
// console.log('commander.templates', commander.templates);

const { partials, layouts, templates } = commander._optionValues;

if (commander.verbose) {
    process.env.debug = true;
}

if (partials) {
    handlebarsToHtml.registerPartials(partials, config.partialsFolder);
}

if (layouts) {
    handlebarsToHtml.registerPartials(layouts, config.layoutsFolder);
}

// console.log('commander', commander, 'commander.templates', commander.templates);
handlebarsToHtml.writeFiles(templates, config.templatesFolder, config.outputFolder);
