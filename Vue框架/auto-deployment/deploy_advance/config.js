/**
 * 服务器相关配置
 */
const SERVER_CONFIG = {
    dev: {
        id: 'dev',
        name: '测试环境',
        host: '10.10.2.10',
        port: 22,
        username: 'root',
        password: 'user*****',
        path: '/home/user/test/dev/',
        rootPath:'/home/user/test/',
        rootFolder:"dev",
    },
    prod: {
        id: 'prod',
        name: '开发环境',
        host: '10.10.2.10',
        port: 22,
        username: 'root',
        password: 'user*****',
        path: '/home/user/test/dev/',
        rootPath:'/home/wsn/test/',
        rootFolder:"prod",
    }
};
module.exports = SERVER_CONFIG;