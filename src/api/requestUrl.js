
let HTTPURL = '';
// var devUrl = 'https://10.16.45.207:8101/admin';
var devUrl = 'https://www.yzsophia.com/admin';

if(process.env.NODE_ENV == 'development') { // 开发环境
    //HTTPURL = window.config.testUrl;
    HTTPURL = window.config.url;
}else {
    HTTPURL = window.config.url;
}
export {
	HTTPURL,devUrl
}
