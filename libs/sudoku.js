const utils = require("util");
const {exec, execSync} = require("node:child_process");
const JPython = utils.promisify(exec);

var regExp = new RegExp("^[0-9]+$");
const pass = 'pass';

Object.defineProperty(Array.prototype, 'chunk_inefficient', {
    value: function(chunkSize) {
      var array = this;
      return [].concat.apply([],
        array.map(function(elem, i) {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
      );
    }
  });


async function sudokuv2(command){
    let results = require('child_process').execSync(command).toString();
    if(results){
        return results;
    }
    return;
}

module.exports.mysudokuv2 = async function (command){
    
    if(command.length>1){
        return "";
    } else if(regExp.test(command)){
        pass
    };
    
    let sudoku = sudokuv2("python -u C:/Users/pc/Documents/MetaTestBeater/libs/sudoku.py "+command.toString());
    
    if (sudoku){
        
        return sudoku.then(res=>{
            let resp = res.replaceAll(/\r?\n|\r/g, '').replaceAll("'", "\"");
            let jsondata = JSON.parse(resp);
            
            console.log(jsondata);
            jsondata.map = jsondata.map.chunk_inefficient(3);
            const maps = `
        ㅤㅤㅤㅤ${jsondata.map[0].join("ㅤ|ㅤ")}
        ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        ㅤㅤㅤㅤ${jsondata.map[1].join("ㅤ|ㅤ")} 
        ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ
        ㅤㅤㅤㅤ${jsondata.map[2].join("ㅤ|ㅤ")} 
            `;
            return maps;
        });
            
    }
    return "";
}