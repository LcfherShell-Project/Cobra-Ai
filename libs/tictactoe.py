import os, sys, random, json, datetime
player = []
mapply =[
		"1", "2", "3",
		"4", "5", "6",
		"7", "8", "9"
	]

endgame = 0

current_date = datetime.datetime.now()

mapp_win = [
	 [1, 2, 3], [4, 5, 6], [7, 8, 9]
	,[1, 4, 7], [2, 5, 8], [3, 6, 9]
	,[1, 5, 9], [3, 5, 7]
	]

playercontrol = ["X", "O"]

 

def TicTacToe(select:int, player=1):
	output = ""
	with open("C:/Users/pc/Documents/MetaTestBeater/libs/tic.json", "r") as f:
		data_json = json.load(f)
	print("{")
	if data_json.get("endgame") != 1 or data_json.get("session") != 9:
		ch = "player{pl}".format(pl=str(player))
		
		if data_json.get("start") == 0:
			data_json['start'] = int(current_date.strftime("%H%M%S"))
			
		if player == 2:
			playerselc = playercontrol[1]
			player = 1
		else:
			playerselc = playercontrol[0]
			player = 2
		
		try:
			data_json.get("map")[select] = playerselc
			data_json.get(ch).append(select+1)
		except:
			pass
		
		if data_json.get(ch).__len__()>3:
			if data_json.get(ch)[:3] in mapp_win or data_json.get(ch)[2:] in mapp_win:
				data_json["endgame"] = 1
				print("\"status\": \"Player {win} Win\"".format(win=player), ",")
				output = "Win"
		elif data_json.get(ch).__len__() < 4 and  data_json.get(ch).__len__() == 3:
			if data_json.get(ch) in mapp_win:
				data_json["endgame"] = 1
				print("\"status\": \"Player {win} Win\"".format(win=player), ",")
				output = "Win"
		else:
			if data_json.get("player1") in mapp_win:
				data_json["endgame"] = 1
				print("\"status\": \"Player {win} Win\"".format(win=player), ",")
				output = "Win"
			elif data_json.get("player1")[:3] in mapp_win or data_json.get("player1")[2:] in mapp_win:
				data_json["endgame"] = 1
				print("\"status\": \"Player {win} Win\"".format(win=player), ",")
				output = "Win"
			elif data_json.get("player2")[:3] in mapp_win or data_json.get("player2")[1:] in mapp_win:
				data_json["endgame"] = 1
				print("\"status\": \"Player {win} Win\"".format(win=player), ",")
				output = "Win"
		
		data_json["session"] += 1
		if data_json["session"] == 9:
			data_json["endgame"] = 1
			print("\"status\": \"Tie\",")
			output = "Tie"
		mapplyx = data_json.get("map")
		print("\"map\": [")
		print(mapplyx[0:3], ",")
		print(mapplyx[3:6], ",")
		print(mapplyx[6:9], "]")
		
		with open("C:/Users/pc/Documents/MetaTestBeater/libs/tic.json", "w") as w:
			json.dump(data_json, w, indent=4)

	if data_json.get("player1") in mapp_win and data_json["endgame"] != 1:
		data_json["endgame"] = 1
		print("\"status\": \"Player {win} Win\"".format(win=player), ",")
		output = "Win"
	if data_json.get("player1")[:3] in mapp_win and data_json["endgame"] != 1 \
		or data_json.get("player1")[2:] in mapp_win and data_json["endgame"] != 1:
		data_json["endgame"] = 1
		print("\"status\": \"Player {win} Win\"".format(win=player), ",")
		output = "Win"
	if data_json.get("player2") in mapp_win and data_json["endgame"] != 1 \
		or data_json.get("player2") in mapp_win and data_json["endgame"] != 1:
		data_json["endgame"] = 1
		print("\"status\": \"Player {win} Win\"".format(win=player), ",")
		output = "Win"
	if data_json.get("player2")[:3] in mapp_win and data_json["endgame"] != 1 \
		or data_json.get("player2")[1:] in mapp_win and data_json["endgame"] != 1:
		data_json["endgame"] = 1
		print("\"status\": \"Player {win} Win\"".format(win=player), ",")
		output = "Win"

	if data_json.get("endgame") == 1:
		print( ", \"EndTime\":", int(current_date.strftime("%H%M%S"))- data_json['start'])
		data_json = {
			"player": [],
			"bot": ["easy", "medium", "hard"],
			"map":[
				"1", "2", "3",
				"4", "5", "6",
				"7", "8", "9"
			],
			"player1": [],
			"player2": [],
			"session": 0,
			"start": 0,
			"ends": 0,
			"endgame": 0
		}
		with open("C:/Users/pc/Documents/MetaTestBeater/libs/tic.json", "w") as w:
			json.dump(data_json, w, indent=4)
	print("}")
	return output


arguments = sys.argv
if arguments:
	#name = arguments[1] #player name
	player = arguments[1] #player 1 | 2
	select  = arguments[2] ###select data
	if select:
		TicTacToe(select=int(select)-1, player=int(player))

def test2():
	playerc = 1
	session = 1
	xplayer = "O"
	while session != 10:
		cho = int(input("{playerx} choice".format(playerx=xplayer)))
		if session%2 == 0:
			playerc = 1
			xplayer = "O"
		else:
			playerc = 2
			xplayer = "X"
		if cho == 0:
			cho = 1

		output = cd(select=cho-1, player=playerc)
		if output:
			break
		session += 1







def tictic():
	session = 0

	player1 = []
	player2 = []

	playerx = "x"

	xx = 0
	while session != 9:
		cho = int(input("{playerx} choice".format(playerx=playerx)))
		if cho in player1 or cho in player2:
			pass
		else:
			if cho:
				if session < 9:
					mapply[cho-1] = playerx

				elif session == 9:
					xx = 1

			if session != 9 or session < 9:
				if session%2 == 0:
					playerx = "o"
					player1.append(cho)
				else:
					playerx = "x"
					player2.append(cho)

				if player1 in mapp_win:
					xx = 1
				else:
					if player1.__len__()>3:
						if player1[:3] in mapp_win or player1[2:] in mapp_win:
							xx = 1
					elif player2.__len__() == 3:
						if player2 in mapp_win:
							xx = 1
					elif player2.__len__()>3:
						if player2[:3] in mapp_win or player2[1:] in mapp_win:
							xx = 1

			if session >= 9:
					xx = 1 
			
			print(mapply[0:3])
			print(mapply[3:6])
			print(mapply[6:9])

			session += 1
			if xx != 0:
				break

	if player1[:3] in mapp_win or player1[2:] in mapp_win:
		print("winner", 1)
	elif player2[:3] in mapp_win or player2[1:] in mapp_win:
		print("Winner", 2)
	else:
		print("Tie")
