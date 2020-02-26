/**
 * 全局相关配置
 */
const DEV = require('./dev');
const PROD = require('./prod');
const isProd = true;

isProd ? PROD.start() : DEV.start();

global.deleteOssPhotoTime = 1000 * 60 * 60 * 0.5;
// global.deleteOssPhotoTime = 1000 * 10;
