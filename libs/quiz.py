import random, sys, json, math, cmath, sympy
from difflib import SequenceMatcher

with open("C:/Users/pc/Documents/MetaTestBeater/libs/quizlist.json", "r") as f:
        quizlist_json = json.load(f)

with open("C:/Users/pc/Documents/MetaTestBeater/libs/quiz.json", "r") as f:
        quiz_json = json.load(f)

def quizchoice(quizlist_json):
    lists = list(quizlist_json.keys())
    gtype_quest = random.choice(lists)
    ####select questlist
    quests = quizlist_json[gtype_quest]
    quist_list = list(quests[0].keys())
    select = random.choice(quist_list)
    answer = quests[0][select]
    return {"quest": select, "answer": answer}

if quiz_json.get("quest") == "":
    quisc = quizchoice(quizlist_json=quizlist_json)
    if quisc:
        quiz_json["quest"] = quisc["quest"]
        quiz_json["answer"] = quisc["answer"]
        with open("C:/Users/pc/Documents/MetaTestBeater/libs/quiz.json", "w") as w:
            json.dump(quiz_json, w, indent=4)
        with open("C:/Users/pc/Documents/MetaTestBeater/libs/quiz.json", "r") as f:
            quiz_json = json.load(f)


arguments = sys.argv
del arguments[0]

argument = " ".join(arguments)

print("{", "\"quest\": \""+quiz_json["quest"]+"\"")
if quiz_json.get("session") != 0:
    try:
        if argument.__len__() > 1:
            el = [True for x in quiz_json.get("answer") if SequenceMatcher(a=str(x), b=str(argument).strip().lower()).ratio() > 0.79 ]
            if True in el:
                quiz_json["session"] = 0
            elif str(argument).strip().lower() in quiz_json.get("answer"):
                quiz_json["session"] = 0
            else:
                quiz_json["session"] -= 1 
            with open("C:/Users/pc/Documents/MetaTestBeater/libs/quiz.json", "w") as w:
                json.dump(quiz_json, w, indent=4)
        else:
            Exception("notstring")
    except:
        pass

print(", \"session\":", quiz_json.get("session"))
if quiz_json.get("session") == 0:
    print(",\"answer\":", quiz_json.get("answer"))
    quiz_json = {
    "quest": "",
    "answer": [],
    "session": 4
    }
    with open("C:/Users/pc/Documents/MetaTestBeater/libs/quiz.json", "w") as w:
        json.dump(quiz_json, w, indent=4)
print("}")