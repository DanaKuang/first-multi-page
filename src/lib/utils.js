function getQueryString(name) {
    var reg = new RegExp("(?:^|&)" + name + "=([^&]*)(?:&|$)", 'i');
    var str_arr = window.location.search.substr(1).match(reg);
    return str_arr != null ? str_arr[1] : null;
}

export {getQueryString}