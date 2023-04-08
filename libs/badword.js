const {getParamNames} = require("./get_fucntion.js");
class FilterBadWord{

  constructor(config = {}){
    
    Object.assign( this, {
        word : config.word,
        filt : config.select || /bashfull*|kill*|fuck*|drug*|dick*|fk|genital*|penis*|p3n1s*|pen1s*|p3nis*|memek|m3m3k*|mm3k*|mem3k*|m3mek*|k0nt0l*|kontol*|k0ntol|kont0l|knt0l*|k0ntl*|sang3*|s4ng3*|sng3*|sagn3*|sagne*|s4gne*|s4gn3*|h3nt4i*|hentai*|h3ntai*|pelacur*|p3lacur*|pl4cur*|lacur|l4cur*/gi,// /bashfull*|kill*|fuck*|drug*|dick*|fk/gi,
        subfilter : config.subject || /ass|lip|pussy|suck|mother|mom|moms|mommy|dog|low|sex|lower|lows|semen|bitch|kamu|aku|saya|dia|kalian|mama|bapak|ibu|papa|mu|saudara|pacar/gi // /ass|lip|pussy*|suck*|mother*|mom*|dog*|low*|sex*/gi
    }
      );
  }


  static getboundPosition(word, _position){
    
    var paragap, end;
    
    paragap = word;
    
    while (paragap[_position] == " ") _position--;
    
    _position = paragap.lastIndexOf(" ", _position) + 1;
    
    end = paragap.indexOf(" ", _position);
    
    if (end == -1){
      
      end = paragap.length;
    
    }

    return paragap.substring(_position, end);
   }


  static ['position_static'](word, filters){
   
    var wordlist_, filt, result, json_, position_;

    
    position_ = 0;
    
    json_ = [];

    wordlist_ = word.toLowerCase().split(' ');
    
    wordlist_.map( (word, index) => {
    
      position_ = index&&wordlist_[index - 1].length+position_+1;
      
      if (word.match(filters) != null || word.match(filters) === 0) {
      
          //console.log( `1 ${word}` );
          json_.push(position_);


      };
    
    });
    
    return json_;

  }

  ['position']() {
      //if ( typeof position != "number" ) {
        //position = parseInt(position);
      //} 
      this.positionList = this.constructor.position_static(this.word.toString(), this.filt);
  
      return this.positionList;
  
  }

  get ['thisToxic'](){
    
    var check = this.position();

    var after = "";
    
    var before = "";
    
    var arry = [];

    var check_repr = "";
    
    if (check != null || check != 0) {
    
        var word = this.word.toLowerCase();
    
        function before_str(number , key){

          return word.substring(number, word.indexOf(key));//nomer dan keyword
        
        }

        function after_Str(w, spec){

          return word.substring( word.indexOf(w), spec.length+word.length ).replace(w, "").trim(); //, word.indexOf(spec));
        }

        for (var i = 0; i < check.length; i++) {
              
              const word_s = this.constructor.getboundPosition(this.word.toLowerCase().toString() , check[i]);

              before = before_str(0 , word_s).toString().split(" ");

              after = after_Str(word_s, this.word).toString().split(" ");

              //console.log(word.indexOf(word_s));
              if (after.length >= 1 ){

                after = after.filter(

                  function(entry){
                    
                    return entry.trim() != '';
                  
                  });

              }

              //console.log(word.substring(word.indexOf(word_s)) )
              if (before[before.length-1] === ""){
                
                before = before.filter(

                  function(entry){
                    
                    return entry.trim() != '';
                  
                  });              

              }
              
              try{
                  
                  if (before[before.length-1].match(this.subfilter) != null) {
                      
                      check_repr = before[before.length-1].match(this.subfilter);

                      if (check_repr != before[before.length-1]) {
                          //check ulang jika sensore tidak memenuhi persyaratan
                          arry.push("Toxic", 1);
                          break
                      };

                      //console.log( "1"+check_repr +" before: "+before[before.length-1] );

                      arry.push("Toxic", 1, before[before.length-1]);

                      break;

                  }

                  else if (after[0].match(this.subfilter) != null){

                      check_repr = after[0].match(this.subfilter);

                      if (check_repr != after[0]) {

                          arry.push("Toxic", 1);
                          break
                      };

                      //console.log( "2"+ check_repr + " after: "+after[0]);

                      arry.push("Toxic", 1, after[after.length-1]);

                      break;

                  }

                  else if (after[1].match(this.subfilter) != null){

                      check_repr = after[1].match(this.subfilter);

                      if (check_repr != after[1]) {
                          arry.push("Toxic", 1);
                          break
                      };

                      //console.log( "3"+check_repr + " after: "+after[1]);

                      arry.push("Toxic", 1, after[1]);

                      break;

                  }

                  

                }
              catch(err){
                
                if ( this.word.match(this.filt) != null) {
                      
                      arry.push("Toxic", 1);
                  
                      break;
                };
                  

              }



          };

        if (arry.length <= 1) {
          
          arry.push("Notoxic", 0);
        
        };

        return arry;
        

    };
    return false;

  }

  set ['thisToxic'](key){
    
    throw key;
  
  }

  ['clean'](position){

    var word, process, output, sensore;

    word = this.word.split(" ");

    sensore = "*";

    position.filter( (number) => {

      const get_word = this.constructor.getboundPosition(this.word.toString() , number);

      for (var i = 0; i < word.length; i++) {

        for (var x = 0; x < get_word.length; x++) {
        
            sensore += "*";
        
        };

        word[i] = word[i].replace(get_word, sensore);
        
        sensore = "*";
      
      };

    });

    //output = word;

    return word.join(" ");

    //position.forEach( async(number) => {
      
      //const get_word = await this.constructor.getboundPosition(this.word.toString() , number);
      
      //for (var i = 0; i < word.length; i++) {
      
        //word[i] = word[i].replace(get_word, "**");
      
      //};

      //console.log(word);

    //});

    
  }

}


class filters_badword extends FilterBadWord{
  
  ['words_o'](word){
    
    this.word = word.toString();
  
  }

  ['config'](update = {}){
   
    Object.assign( this, {
        cl : update.sensor||true,
        st : update.smart||false,
        er : update.er||false,
        callback: update.test||null,
        msg:update,
      }
    )

    if (this.callback !=null) {
        
        if (typeof this.callback !== 'function') {
        
            return this.callback;
        
        };

        var parms_ = [ 'sensor', 'smart', 'test', 'this_', 'callback'];
        var lits = [];
        const result = Object.keys(this.msg).filter(word => 
                        
                        parms_.includes(word)!=true )
        ;
        
        if (getParamNames(this.callback).length != 0 || getParamNames(this.callback).length != null) {

            if (result.length!=0) {

                var getparms_funct = getParamNames(this.callback); 
                
                result.map( (output) => {

                  if ( getparms_funct.includes(output) !=false ) {

                      lits.push(this.msg[output]);
                  
                  };

                }
                  );

            };


            return this.callback.apply(null, lits);
        
        };

        return this.callback();
        
    };

  }
  
  get ['cleans'](){
    
    if (this.cl === true) {
    
      if (this.thisToxic[1] === 1 && this.thisToxic.length > 2 ) {

        if (this.st === true) {
            var sensore = "*";
      
            for (var i = 0; i < this.thisToxic[2].length; i++) {
      
                sensore += "*";
      
            };

            return this.clean(this.position()).replace(this.thisToxic[2], sensore);
        };
        return this.clean(this.position());

      };

      return this.clean(this.position());

    }
    else{

      return this.word.trim();
    
    }

  }

  set ['cleans'](value){
    
    throw value;
  
  }

}


const MiniFilter = function(word, config={}, ...argument) {
    
    Object.assign( this, {
        
        word: word.toString() || '',
        sensore: config.cl || config.sensore || false,
        filt: /bashfull*|kill*|fuck*|drug*|dick*|bitch*|bastard*|fk|shit|piss|asshole|damn/gi,
        subfilter:  /ass|lip|pussy|suck|mother|son|father*|mom|moms|mommy|dog|low|sex|lower|lows|cock|semen/gi,
        save: [],
        argument: argument

    });

}

MiniFilter.prototype.clean = function(){
  
  var splitext = this.word.split(" ");
  
  var numSession = 0;
  
  var save = this.save;

  function sensore(len){

      var output = "";
      for (var i = 0; i < len; i++) {
        
        output += '*';
      
      };

      save.push({sensor:output, toxic: 1});
      return output

  }

  if (splitext.length != 0 ) {

      splitext.map( (output) => {


          if (output.toLowerCase().match(this.filt) != null) {

              splitext[numSession] = sensore(output.length);


          }

          if (numSession!=0) {

              if (save.length>=1 && this.sensore != false){
            
                    try{
                    
                        if ( splitext[numSession-1].toLowerCase().match(this.subfilter) != null ){
                        
                                  splitext[numSession-1] =  sensore(splitext[numSession-1].length);

                            //console.log(1);
                        
                        }
                        
                        if (splitext[numSession-2].toLowerCase().match(this.subfilter) != null){
                        
                                  splitext[numSession-2] =  sensore(splitext[numSession-2].length);

                            //console.log(1.2);
                        
                        }


                        if (splitext[numSession+1].toLowerCase().match(this.subfilter) != null){
                                  
                                  splitext[numSession+1] =  sensore(splitext[numSession+1].length);

                                  //console.log(2);
                              
                        }
                              
                        if (splitext[numSession+2].toLowerCase().match(this.subfilter) != null){
                                  
                                  splitext[numSession+2] =  sensore(splitext[numSession+2].length);

                                  //console.log(2.2);
                              
                        }
                    }
                    
                    catch{
                        
                        try{
                              
                              if (splitext[numSession+2].toLowerCase().match(this.subfilter) != null){
                                  
                                  splitext[numSession+2] =  sensore(splitext[numSession+2].length);

                                  //console.log(2);
                              
                              }
                              
                              else{
                                  
                                  splitext[numSession+1] =  sensore(splitext[numSession+1].length);

                                  //console.log(2.2);
                              
                              }

                        }
                        catch{

                        }
                    }
              };

          }
          numSession +=1;

        }

      );
      
      if (splitext.join(" ") != this.word) {

          this.word = splitext.join(" ");
      };
      

  
  };

  this.save = save;

}

MiniFilter.prototype.thisToxic = function(){
  
  if (this.save.length !=0 ) {
      
      return 1;
  };
  
  return 0;

}

MiniFilter.prototype.result = function(){
  
  return this.word;

}


module.exports.filter_Word = FilterBadWord;
module.exports.filter_badword = filters_badword;
module.exports.minifilter = MiniFilter;