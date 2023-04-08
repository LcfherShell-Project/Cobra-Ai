from gtts import gTTS, lang
import os, sys, re
  
# Language in which you want to convert
try:
    arguments = sys.argv
    del arguments[0]
    arguments = " ".join(arguments)
except:
    sys.exit(0)

language_count = str(arguments).count(":")
if language_count and language_count > 1:
    postition= arguments.find(":")
    if postition > 5:
        language = "en"
    else:
        if postition != -1:
            try:
                language, text = [arguments[:re.search(":", arguments).start()], arguments[re.search(":", arguments).end():]]
            except: 
                language, text = [arguments[:postition], arguments[postition+1:]]
        else:
            language, text = "en", str(arguments)
else:
    if language_count == 0:
        language, text = "en", str(arguments)
    else:
        postition= arguments.find(":")
        if postition > 5:
            language = "en"
        else:
            if postition != -1:
                try:
                    language, text = [arguments[:re.search(":", arguments).start()], arguments[re.search(":", arguments).end():]]
                except:
                    language, text = [arguments[:postition], arguments[postition+1:]]
            else:
                language, text = "en", str(arguments)

if language in lang.tts_langs().keys():
    pass
    # Passing the text and language to the engine, 
    # here we have marked slow=False. Which tells 
    # the module that the converted audio should 
    # have a high speed
else:
    language = 'en'

myobj = gTTS(text=text, lang=language, slow=False)
    
    # Saving the converted audio in a mp3 file named
    # welcome 
myobj.save("x_cobra_.mp3")