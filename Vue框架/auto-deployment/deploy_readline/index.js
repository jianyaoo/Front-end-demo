let Client = require('ssh2').Client;
const scpClient = require('scp2');
const ora = require('ora');
const chalk = require('chalk');
const spinner = ora('正在发布到' + ( process.env.NODE_ENV === 'prod' ? '生产' : '测试') + '服务器上...');

let config = require('./config');
const conn = new Client();

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const questions = ['Please input publish environment(test\\prod\\dev): ', 'Please input server username: ', 'Please input server password: '];
const linelimit = 3;
let inputArr = [];
let index = 0;
let server=null;

function runQueLoop() {
    if (index === linelimit) {
        server = config[inputArr[0]]
        server.username = inputArr[1];
        server.password = inputArr[2];
        deployFile();
        return;
    }
    rl.question(questions[index], (as) => {
        inputArr[index] = as;
        index++;
        runQueLoop()
    })
}
runQueLoop();
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
