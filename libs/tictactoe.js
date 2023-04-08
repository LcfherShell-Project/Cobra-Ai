const utils = require("util");
const {exec, execSync} = require("node:child_process");
const JPython = utils.promisify(exec);

var regExp = new RegExp("^[0-9]+$");
const pass = 'pass';

async function tictactoe(command){
    let results;
    try {
        results = await JPython(command);
    } catch (ex) {
        results = ex;
    }
    if (Error[Symbol.hasInstance](results)){
        return "error";
    }
    return results
}

async function tictactoev2(command){
    let results = require('child_process').execSync(command).toString();
    if(results){
        return results;
    }
    return;
}


module.exports.mytictactoev2 = async function (player, command){
    
    if(command.length>1){
        return "";
    } else if(regExp.test(command)){
        pass
    };
    let tictactoe = tictactoev2(`python -u C:/Users/pc/Documents/MetaTestBeater/libs/tictactoe.py ${player.toString()} ${command.toString()}`);
    if(tictactoe){
        return tictactoe.then( res=> {
            
            let resp = res.replaceAll(/\r?\n|\r/g, '').replaceAll("'", "\"");
            let jsondata = JSON.parse(resp);
            if(Object.hasOwn(jsondata, "status")){
                jsondata.status = jsondata.status.replace(/[0-9]/g, global.nick);
                player = jsondata.status;
            };

            const subma = "";
            if(Object.hasOwn(jsondata, "status")){
                subma = `
                ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
                Player Win: ${player}
                ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
                Timeout: ${jsondata.EndTime}`;
            }

            const maps = `
        ㅤㅤㅤㅤ${jsondata.map[0].join("ㅤ|ㅤ")}
        ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        ㅤㅤㅤㅤ${jsondata.map[1].join("ㅤ|ㅤ")} 
        ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        ㅤㅤㅤㅤ${jsondata.map[2].join("ㅤ|ㅤ")}
        ${subma}
            `;
            return maps;
            
            
        });
    }
    return "";
}