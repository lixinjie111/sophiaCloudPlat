
let HTTPURL = '';
var devUrl = 'https://10.16.46.11:8101/admin';

if(process.env.NODE_ENV == 'development') { // 开发环境
    HTTPURL = window.config.url;
}else {
    HTTPURL = window.config.url;
}
export {
	HTTPURL,devUrl
}
