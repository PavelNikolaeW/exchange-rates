function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('body')[0].appendChild(script);
}
include("./js/CBR_XML_Daily_Ru.js");