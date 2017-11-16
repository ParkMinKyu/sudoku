/*! niee-sudoku v0.0.1 | MIT License, https://github.com/ParkMinKyu/sudoku/blob/master/LICENSE */
var map = [[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0],
			[0,0,0,0,0,0,0,0,0]];

	function createMapHard(){
		let count = 0;
		let isCreate = false;
		while(isCreate == false){
			for(let x = 0 ; x < 9 ; x ++){
				let number = createNumber();
				for(let y = 0 ; y < 9 ;  y ++){
					if(checkNum(x, y, number)){
						map[x][y]=number;
					}
				}
			}
			count++
			isCreate = isComplete();
			if(count > 10000){
				console.log("create map fail retry......")
				count = 0 ;
				resetMap();
			}
		}
		console.log(map)
	}
	function resetMap(){
		for(let x = 0 ; x < 9 ; x ++){
			for(let y = 0 ; y < 9 ;  y ++){
				map[x][y] = 0;
			}
		}
	}
	function isComplete(){
		for(let x = 0 ; x < 9 ; x ++){
			for(let y = 0 ; y < 9 ;  y ++){
				if(map[x][y] == 0){
					return false;
				}
			}
		}
		return true;
	}
	function createNumber(){
		return parseInt(Math.random()*9)+1;
	}
	function checkNum(x, y, number){		
		for(let i = 0 ; i < 9 ; i ++){
			if(map[x][i] == number)return false;
		}
		
		for(let i = 0 ; i < 9 ; i ++){
			if(map[i][y] == number)return false;
		}
		
		let ckxst = parseInt(x/3)*3;
		let ckxed = ckxst + 3;
		let ckyst = parseInt(y/3)*3;
		let ckyed = ckyst + 3;
		
		for(let i = ckxst ; i < ckxed ; i ++){
			for(let k = ckyst ; k < ckyed ; k ++){
				if(map[i][k] == number)return false;
			}
		}
		
		return true;
	}  	
	function createMapEasy(){
		let nums = makeBasicNumber();
		for(let x = 0 ; x < 9 ; x ++){
			for(let y = 0 ; y < 9 ;  y ++){
				let pox = parseInt((x*3) >= 9 ? (x*3)/9 + (x*3)%9 : (x*3));
				let poy = parseInt((y+x) >= 9 ? (y+x)%9 : (y+x));
				map[pox][poy]=nums[y];
			}
		}
		console.log(map)
	}
	function shuffleMap(count){
		for(let cnt = 0 ; cnt < count ; cnt ++){
			let poy1 = parseInt(Math.random()*9);
      let poy2 = 0;
      if(poy1 % 3 == 0) poy2 = (poy1 + (parseInt(Math.random()*2)+1));
      else if(poy1 % 3 == 1)poy2 = (parseInt(Math.random()*2) == 0 ? (poy1 - 1) : (poy1 + 1));
      else if(poy1 % 3 == 2)poy2 = (poy1 - (parseInt(Math.random()*2)+1));
      else console.log('shuffleMap error');
			for(let x = 0 ; x < 9 ; x ++){
				let temp = map[x][poy1];
				map[x][poy1] = map[x][poy2];
				map[x][poy2] = temp;
			}
		}
		console.log(map)
	}
	function displayNumber(){
		for(let x = 0 ; x < 9 ; x ++){
			for(let y = 0 ; y < 9 ;  y ++){
				$('.row').eq(x).find('div').eq(y).text(map[x][y]);
			}
		}
	}
	function makeBasicNumber(){
		let count = 0;
		let numbers = [0,0,0,0,0,0,0,0,0];
		while(numbers.indexOf(0) != -1){
			let number = createNumber();
			if(numbers.indexOf(number) == -1){
				numbers[count] = number;
				count++;
			}
		}
		return numbers;
	}
	function setGameNumber(count){
		for(let i = 0 ; i < count ; i ++){
			let pox = parseInt(Math.random()*9);
			let poy = parseInt(Math.random()*9);
			$('.row').eq(pox).find('div').eq(poy).attr("contenteditable","true").addClass('userInput').text('');
		}
	}