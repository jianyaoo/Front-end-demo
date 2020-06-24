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
        password: 'user****',
        path: '/home/test/dev/',
        rootPath:'/home/test/',
        rootFolder:"dev",
    },
    prod: {
        id: 'prod',
        name: '开发环境',
        host: '10.10.2.10',
        port: 22,
        username: 'root',
        password: 'user****',
        path: '/home/test/prod/',
        rootPath:'/home/test/',
        rootFolder:"prod",
    }
};
module.exports = SERVER_CONFIG;