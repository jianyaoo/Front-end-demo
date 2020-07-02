/**
 * 服务器相关配置
 */
const SERVER_CONFIG = {
    dev: {
        id: 'dev',
        name: '测试环境',
        host: '10.xx.xx.xx',
        port: 22,
        username: 'root',
        password: 'user*****',
        path: '/root/user/test/dev/',
    },
    prod: {
        id: 'prod',
        name: '开发环境',
        host: '10.xx.xx.xx',
        port: 22,
        username: 'root',
        password: 'user*****',
        path: '/root/user/test/prod/',
    }
};
module.exports = SERVER_CONFIG;