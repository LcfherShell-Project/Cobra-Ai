const url = require('url');

function get_AllParams(url){
    const vales = [], json = {};
    const current_url = new URL('http://usefulangle.com/preview?tags=javascript&tags=pdfjs');
    const search_params = current_url.searchParams;
    const tags = search_params;

    // [ "javascript", "pdfjs" ]
    tags.forEach(vel=>{
        vales.push(vel)
    });
    json['tags'] = tags
    json['values'] = vales;
    return json
}

module.exports = {
    get_AllParams:get_AllParams
}