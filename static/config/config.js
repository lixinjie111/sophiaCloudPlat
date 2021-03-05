window.config = {
	url: "",
};
if (location.host == "www.yzsophia.com") {
    window.config.url = "https://www.yzsophia.com"; //正式
} else {
     window.config.url = "https://dev-www.yzsophia.com"; //测式
}