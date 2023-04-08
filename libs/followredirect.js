'use strict';
const followRedirects = require('follow-redirects');
const {request} = require('httpx');
const {exec, execSync} = require("node:child_process");
const url = require('url');

followRedirects.maxRedirects = 10;


async function JIPython(command=""){
    let results = execSync(`python -u C:/Users/pc/Documents/MetaTestBeater/libs/chekredirect.py ${command}`).toString();
    
    if(results){
    
        return results;
    
    }
    return;
}

function parseURLsx(url){
    const current_url = new URL(url);
    const search_params = current_url;
    return search_params
}
module.exports = {
    followRedirectsync: JIPython,
    followRedirectasync: followRedirects,
    parseURLsync: parseURLsx
}

///followRedirects.https.get('https://racing.hkjc.com/racing/information/Chinese/Trackwork/TrackworkResult.aspx?Horseno=S001', response => {
    
//    console.log(response.responseUrl);

///}).on('error', err => {

//    console.error(err);

//});


