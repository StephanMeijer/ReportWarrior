#!/usr/bin/env node

const nunjucks = require("nunjucks");
const path = require('path');
const fs = require('fs-extra');
const { Command } = require('commander');
const chalk = require('chalk');
const os = require('os');

const pathRW       = path.resolve(os.homedir(), '.reportwarrior')
const pathRWConfig = path.resolve(pathRW, 'config.js')

const error = (msg) => console.error(chalk.whiteBright.bgRed.bold(msg));

const program = new Command();

program.version('0.1.0');
program.option('-f --flow <flow>', 'Flow to be read from configuration');
program.parse(process.argv);

if (!fs.existsSync(pathRW)) {
    const defaultConfigDir = path.resolve(__dirname, '../default-config');
    fs.copySync(defaultConfigDir, pathRW);
}

const config = require(pathRWConfig);

if (!program.flow) {
    error("Flows can be chosen using -f / --flow."); 
    process.exit(1);
}

const flowConfig = config.flows[program.flow];

if (!flowConfig) {
    error(`Flow '${program.flow}' not defined in config.`);
    process.exit(1);
}

// Initialize your Nunjucks enironment
const njk = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(config.paths.templates),
    { autoescape: false }
);

if (config.registerFilters) {
    config.registerFilters(njk);
}

const processData = (data) => {
    if (data) {
        const tasks = JSON.parse(data);

        const html = njk.render(flowConfig.template, { tasks });
        console.log(html);
    } else {
        error('No data given.');
        process.exit(1);
    }
};

let data = "";

process.stdin.resume();
process.stdin.setEncoding("utf8");

process.stdin.on("data", (chunk) => { data += chunk });
process.stdin.on("end", () => { processData(data); });
