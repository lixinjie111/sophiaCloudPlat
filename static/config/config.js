window.config = {
	url: "",
};
if (location.host == "www.yzsophia.com") {
    window.config.url = "https://www.yzsophia.com"; //正式
} else if(location.host == "dev-www.yzsophia.com"){
    window.config.url = "https://dev-www.yzsophia.com"; //测式
}else {
    window.config.url = ""
}
