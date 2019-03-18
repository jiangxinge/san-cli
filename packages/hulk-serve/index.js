/**
 * @file hulk -serve
 * @author wangyongqing <wangyongqing01@baidu.com>
 */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const globalConfigPlugin = require('./lib/globalConfigPlugin');
const {findExisting} = require('@baidu/hulk-utils');
const Service = require('./Service');

function resolveEntry(entry) {
    const context = process.cwd();

    entry = entry || findExisting(context, ['main.js', 'index.js', 'App.san', 'app.san']);

    if (!entry) {
        console.log(chalk.red(`Failed to locate entry file in ${chalk.yellow(context)}.`));
        console.log(chalk.red('Valid entry file should be one of: main.js, index.js, App.san or app.san.'));
        process.exit(1);
    }
    if (!fs.existsSync(path.resolve(context, entry))) {
        console.log(chalk.red(`Entry file ${chalk.yellow(entry)} does not exist.`));
        process.exit(1);
    }

    return {
        context,
        entry
    };
}
exports.serve = (e, args) => {
    const {context, entry} = resolveEntry(e);
    createService(context, entry).run('serve', args);
};
exports.build = (e, args) => {
    const context = process.cwd();
    const entry = e || findExisting(context, ['main.js', 'index.js', 'App.san', 'app.san']);
    args._entry = entry;
    createService(context, entry).run('build', args);
};

function createService(context, entry, plugins = []) {
    // console.log(plugins);
    return new Service(context, {
        projectOptions: {
            compiler: true
        },
        plugins: [...plugins, globalConfigPlugin(context, entry)]
    });
}
