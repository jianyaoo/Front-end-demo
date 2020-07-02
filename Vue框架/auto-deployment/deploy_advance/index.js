// 基于node-scp2的自动化部署方案 - 优化版2 - 上传文件前备份旧版文件
let Client = require('ssh2').Client;
const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const server = require('./config')[( process.env.NODE_ENV === 'prod' ? 'prod' : 'dev')];
const spinner = ora('正在发布到' + ( process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器上...');

const conn = new Client();

function deployFile() {
    let { path , rootPath , rootFolder } = server ;
    let currentTime = new Date().toLocaleDateString();
    let cmd = `cd ${rootPath}\n
                mkdir -p _backUp/${rootFolder}_${currentTime}\n 
                cp -r ${path} ${rootPath}_backUp/${rootFolder}_${currentTime}/\n 
                rm -rf ${path}`;

    conn.on('ready', function () {
        conn.exec( cmd,
            function (err, stream) {
                console.log(chalk.green('已执行命令行'));
                console.log(chalk.yellow(cmd));
                if (err) throw err;
                stream.on('close', function (code, signal) {
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
                                console.log(chalk.red('Fail! 发布失败.\n'));
                                throw err;
                            } else {
                                console.log(chalk.green('Success! 成功发布到' + server.host + '服务器! \n'));
                            }
                        }
                    );
                    conn.end();
                })
            });
    })
        .on('error', function (err) {
            console.log(chalk.red('Fail! 服务器连接失败.\n'));
            throw err;
        })
        .connect({
            host: server.host,
            port: server.port,
            username: server.username,
            password: server.password
        });
}
deployFile();