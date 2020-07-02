// 基于node-scp2的自动化部署方案 - 基础版本
const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const server = require('./config')[( process.env.NODE_ENV === 'prod' ? 'prod' : 'dev')];
const spinner = ora('正在发布到' + ( process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器...');

spinner.start();

scpClient.scp(
    './dist/',
    {
        host: server.host,
        port: server.port,
        username: server.username,
        password: server.password,
        path: server.path
    },
    function (err) {
        spinner.stop();
        if (err) {
            console.log(chalk.red('发布失败.\n'));
            throw err;
        } else {
            console.log(chalk.green('Success! 成功发布到' + (process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器! \n'));
        }
    }
);