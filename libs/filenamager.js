const mime = require('mime-types');
const {rename,renameSync} = require("fs");
const fs = require("fs");
const {extname, parse} = require("path");
const path = require("path");
const { json } = require('express');

function generate(n) {
    var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    
    if ( n > max ) {
            return generate(max) + generate(n - max);
    }
    
    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    
    return ("" + number).substring(add); 
}


function MimeT(filename=""){
    return mime.lookup(filename.toString());
}
function FileInfo(filename){
    
    const json = {}
    let {dir, base, ext} = parse(filename);
    let chek = fs.statSync(filename);
    json["dir"] = dir
    json["name"] = base;
    json["ext"] = ext
    json["mimet"] = MimeT(filename);
    json["size"] = chek.size/(1024*1024);
    return json;

}
async function asyncrename(filename, platforms=false){
    
    var exts, sub;
    let inform = FileInfo(filename);
    if (platforms){
        sub = platforms;
    }else{
        sub = "";
    }
    if (inform){
        try {
            const newnames ="lcfhershell-";
            
            if (inform["mimet"].toString().startsWith("image")){
                exts = "image";
            }else if (inform["mimet"].toString().startsWith("video")){
                exts = "video";
            }else if (inform["mimet"].toString().startsWith("audio")){
                exts = "audio";
            }else{
                exts = inform["mimet"].split("/")[0];
            }
            newnames = `${newnames}${sub}${exts}-${generate(3)}.${inform["ext"]}`;
            renameSync(filename, path.join(json["dir"], newnames));
            inform["name"] = newnames;
            return inform;
        } catch (error) {
            return inform;
        }
    }
}
module.exports = {
    tools_renames: asyncrename,
    tools_fileinform: FileInfo,
    mimetype: MimeT 
}