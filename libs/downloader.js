const {promisify} = require('util');
const {extname} = require('path');
const fs = require("fs");
const Downloader = require('nodejs-file-downloader');
const {instagramdlv4, youtubedl, youtubedlv2, tiktokdlv3, tiktokdlv2, savefrom} = require('@bochilteam/scraper');
const cluster = require("cluster");
const {exec, execSync} = require("node:child_process");
const JPython = promisify(exec);
var {parse} = require('url');
var mime = require('mime-types');

const path = require("path");

try {
    const cutprocess = require("./cutprocess.js");
} catch (error) {
    const cutprocess = require("./libs/cutprocess.js");
}

async function JIPython(command){
    let results = require('child_process').execSync(command).toString();
    if(results){
        return results;
    }
    return;
}

const pass = "pass";


let ydll = {
    "link":"",
    "result":[]
}
let ttc = {
    "link":"",
    "result":[]
}
let twit = {
    "link":"",
    "result":[]
}
//const urls = 'https://www.tiktok.com/@cikfeeya0/video/7207314132486376730';
//const urls = 'https://youtu.be/iik25wqIuFo';
///?hd=1

async function Downloaders(urls, directory="./"){
    
    const downloader = new Downloader({
        url: urls,
        directory: directory,
        headers:{'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9Some user agent..'},
        maxAttempts: 3,  //Default is 1.
        cloneFiles: false,
        onError: function (error) {
          //You can also hook into each failed attempt.
          console.log("Downloader mengalami error system akan dialihkan ke program python");
        },
        onBeforeSave: (deducedName) => {
            if(deducedName){
                console.log(`Download file ${deducedName} success`);
            }
            //If you return a string here, it will be used as the name(that includes the extension!).
          },
      });

    try {
        
        const {filePath, downloadStatus} = await downloader.download();
        return {filename: filePath};

    } catch (error) {
        //If all attempts fail, the last error is thrown.
        await downloader.cancel();
        let results = JIPython(`python -u C:/Users/pc/Documents/MetaTestBeater/libs/downloader.py "${urls}"`)
        
        if(results){
        
            return results.then(res=>{
        
                let resp = res.replaceAll(/\r?\n|\r/g, '').replaceAll("'", "\"");
                let jsondata = JSON.parse(resp);
                return jsondata;
        
            });
        }
        return {error:1};
    }
}

async function TikTokDonwloader(urls, dirname=__dirname, callback=false){

    let director = path.resolve(dirname, "tictoc.json");
    return tiktokdlv2(urls).catch(_=> tiktokdlv3(urls)).then(res=>{
        let quality = res["video"];
        let rawdata = fs.readFileSync(director);
        let json = JSON.parse(rawdata);
        if (json.result.length != 0){
            data = JSON.stringify(ydll);
            fs.writeFileSync(director, data);
            let rawdata = fs.readFileSync(director);
            let json = JSON.parse(rawdata);
        }else{
            json.link = urls;
        }

        if (Object.keys(quality).length>1){
                json.result.push({watermark:quality["no_watermark"]});
                json.result.push({no_watermark:quality["no_watermark_hd"]});
        }else if(Object.keys(quality).includes("no_watermark")){
            json.result.push({watermark:quality["no_watermark"]});
        }else{
            json.result.push({no_watermark:quality["no_watermark_hd"]});
        }
        json.link = urls;
        fs.writeFileSync(director, JSON.stringify(json));
        if (typeof callback != Boolean){
            try {
                if (callback.constructor.name === 'AsyncFunction'){
                    callback.then(rest =>{
                        console.log(1);
                        }
                    ).catch(error=>{
                        console.log(error)
                    });
                }else{
                    throw new Error("not asynchronus")
                }
            } catch (error){
                callback;
            }
        }
    }).catch(error=>{
        console.log(error);
    });;
};

async function YoutubeDonwloader(urls, dirname=__dirname, callback=false){
    let director = path.resolve(dirname, "ytdll.json");
    let url = urls.toString();
    if (url){
            return youtubedl(url).catch(
                    _ => youtubedlv2(url)
                    ).then(({ video }) => {
                        
                        let rawdata = fs.readFileSync(director);
                        let json = JSON.parse(rawdata);
                        if (json.result.length != 0){
                            data = JSON.stringify(ydll);
                            fs.writeFileSync(director, data);
                            let rawdata = fs.readFileSync(director);
                            let json = JSON.parse(rawdata);
                            json.link = url;
                        }else{
                            json.link = url;
                        }
                        Object.keys(video).forEach(result=>{

                            if (video[result]["fileSize"]>50200){
                                pass;
                            }else{
                                video[result].download().then( quality =>{
                                    let jsonz =  {};
                                    jsonz[result] = quality;
                                    json.result.push(jsonz);
                                
                                    fs.writeFileSync(director, JSON.stringify(json));
                                    
                                }).catch( err =>{
                                    pass
                                    }
                                );
                            }
                        });
                        
                        if (typeof callback != Boolean){
                            try {
                                if (callback.constructor.name === 'AsyncFunction'){
                                    callback().then(rest =>{
                                        console.log(1);
                                        }
                                    ).catch(error=>{
                                        console.log(error)
                                    });
                                }else{
                                    throw new Error("not asynchronus")
                                }
                            } catch (error){
                                callback();
                            }
                        }

                }).catch(error=>{
                    console.log("error: "+error);
                });
        }
}

async function TwiterDonwloader(urls, dirname=__dirname, callback=false){

    let director = path.resolve(dirname, "twitt.json");
    
    return savefrom(urls).then(res=>{
        let twits2 = res[0].url;

        let rawdata = fs.readFileSync(director);
        let json = JSON.parse(rawdata);
        if (json.result.length != 0){
            data = JSON.stringify(ydll);
            fs.writeFileSync(director, data);
            let rawdata = fs.readFileSync(director);
            let json = JSON.parse(rawdata);
            json.link = urls;
        }else{
            json.link = urls;
        }

        if (twits2.length != 0){
            for (let i = 0; i < twits2.length; i++) {
                let jsonz =  {};
                const select = twits2[i]
                jsonz[select["subname"]] = select["url"];
                json.result.push(jsonz);
            };
            fs.writeFileSync(director, JSON.stringify(json));
        };
        if (typeof callback != Boolean){
            try {
                if (callback.constructor.name === 'AsyncFunction'){
                    callback.then(rest =>{
                        console.log(1);
                        }
                    ).catch(error=>{
                        console.log(error)
                    });
                }else{
                    throw new Error("not asynchronus")
                }
            } catch (error){
                callback;
            }
        }
    }).catch(error=>{
        console.log(error);
    });
}
///cutprocess
//const killer = require("./cutprocess.js");
//killer(TwiterDonwloader("https://twitter.com/jen_degen/status/1458167531869458440?s=20"), 24); 

//killer(Downloaders("https://pbs.twimg.com/profile_images/781802494858895360/i3PDNsj8_400x400.jpg").then(res=>{
//    console.log(res);
//}), 24);

async function autodown(url, directory){
    let parseruri = parse(url).hostname;
    let process;
    const mimetype = ["video", "videos","audio", "audios"];

    if (parseruri.includes("twitter") || parseruri.includes("twimg")){
    
        process =  TwiterDonwloader(url);
    
    }else if(parseruri.includes("youtube") || parseruri.includes("mtube")){
    
        process =  YoutubeDonwloader(url);
    
    }else if(parseruri.includes("tiktok")){
    
        process =  TikTokDonwloader(url);
    
    }else{
     
        process = Downloaders(url, directory);
    
    }
    return process;
}
module.exports = {
    downloader: Downloaders,
    autoDownload: autodown,
    ytdownload: YoutubeDonwloader,
    ttkdownload: TikTokDonwloader,
    twtdonwload: TwiterDonwloader
};
