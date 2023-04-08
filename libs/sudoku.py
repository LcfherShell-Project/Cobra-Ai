import random, sys, os, json, datetime

current_date = datetime.datetime.now()

map_default = [
    "x", "x", "x",
    "x", "x", "x",
    "x", "x", "x"
]

def map_modus(deret):
  # dictionary untuk mapping nilai terbanyak
  peta_kemunculan = {}

  # perulangan satu-persatu tiap bilangan
  for bilangan in deret:
    # periksa apakah sudah pernah muncul atau belum
    if bilangan in peta_kemunculan:
      peta_kemunculan[bilangan] += 1
    else:
      peta_kemunculan[bilangan] = 1

  # cari kemunculan terbanyak
  bilangan_terbesar = deret[0] # ambil angka pertama sebagai yg terbanyak
  for bilangan in peta_kemunculan.keys():
    jumlah = peta_kemunculan[bilangan]

    if jumlah > peta_kemunculan[bilangan_terbesar]:
      bilangan_terbesar = bilangan

  return bilangan_terbesar

default = [[1, 2, 3 , 4], [2, 3, 4, 6], [5, 6, 7, 8]]
default_hard = [[1, 2, 3 , 4, 5, 6, 7], [2, 3, 4, 6, 7, 8, 9], [5, 6, 7, 8, 0, 1, 2]]
def defa():
    select_scopt = random.choice(default_hard)
    ss = [random.choice(select_scopt) for _ in range(0, 9)]
    if ss.count(map_modus(ss)) > 3:
      
      postition = [i for i, e in enumerate(ss) if e == map_modus(ss)]
      ss[random.choice(postition)] = "x"

    elif ss.count(map_modus(ss)) == 3:
    
      pass

    else:
        ss = defa()
    return ss

with open("C:/Users/pc/Documents/MetaTestBeater/libs/sudo.json", "r") as f:
		data_json = json.load(f)

if data_json.get("maptowin").__len__() == 0: 
    data_json["maptowin"] = defa()
    with open("C:/Users/pc/Documents/MetaTestBeater/libs/sudo.json", "w") as w:
        json.dump(data_json, w, indent=4)

if data_json.get("endtime"):
    if data_json["endtime"] == 1:
        data_json["endtime"] = int(current_date.strftime("%H%M%S"))

def sudoku(data_json, choice:int):
    print("{ ")
    if data_json["session"] != 0:
        if choice not in data_json.get("mapchoice"):
            data_json["session"] -= 1
            try:
                if isinstance(data_json["maptowin"][choice], str):
                    data_json["session"] = 0
            except:
                pass
            
            if data_json["session"] != 0:
                data_json["map_default"][choice] = data_json["maptowin"][choice]
                data_json["mapchoice"].append(choice)
        with open("C:/Users/pc/Documents/MetaTestBeater/libs/sudo.json", "w") as w:
            json.dump(data_json, w, indent=4)
    
    #print mapp
    print("\"map\":", data_json["map_default"])
    print(", \"choice\":", data_json["mapchoice"])
    if data_json["session"] == 0 or data_json["session"] == 1:
        timeout = int(current_date.strftime("%H%M%S"))-data_json['endtime']
        print(", \"timeout\":", timeout)
        if data_json.get("mapchoice").__len__()<3:
            pass
        else:
            score = []
            for x in data_json.get("mapchoice"):
                score.append(data_json.get("map_default")[x])
            nicesa = (score.count(map_modus(score))*25)
            if nicesa > 75:
                nicesa += 25
            elif nicesa == 25:
                nicesa = 1
            print(", \"score\":", nicesa)

        data_json = {
            "session": 4,
            "map_default": [
                "x",
                "x",
                "x",
                "x",
                "x",
                "x",
                "x",
                "x",
                "x"
            ],
            "maptowin": [],
            "mapchoice": [],
            "endgame": 0,
            "endtime": 1
        }
        with open("C:/Users/pc/Documents/MetaTestBeater/libs/sudo.json", "w") as w:
            json.dump(data_json, w, indent=4)
    print("}")
    return data_json

arguments = sys.argv
if arguments:
    select  = arguments[1] ###select data
    if select:
        x = sudoku(data_json=data_json, choice=int(select))
    