$(function(){
  var checkTime = setInterval(function(){
    let time = parseInt($('#gameTime').text());
    $('#gameTime').text(++time);
  },1000);
	
	$('#finishBtn').click(function(){
		let fcnt = 0;
		for(let x = 0 ; x < 9 ; x ++){
			for(let y = 0 ; y < 9 ;  y ++){
				let realNum = map[x][y];
				let userNum = parseInt(elementSelector(x,y).text());
				if(realNum != userNum){
					if(elementSelector(x,y).attr("contenteditable") == "true")addClass(x,y,'error');
					fcnt++;
				}else if(elementSelector(x,y).attr("contenteditable") == "true"){
					removeClass(x,y,'error');
				}
			}
		}
		if(fcnt > 0){
			alert('You Faild.');
		}else{
			alert("You Win. You finished : " + $('#gameTime').text() + "sec.");
			$('#reloadBtn').click();
		}
	});
	$('#reloadBtn').click(function(){
		location.reload();
	});
	$('#hardBtn').click(function(){
		location.href="hard.html"
	});
	$('#easyBtn').click(function(){
		location.href="index.html"
	});
	checkTime;
});
function displayNumber(){
	for(let x = 0 ; x < 9 ; x ++){
		for(let y = 0 ; y < 9 ;  y ++){
			elementSelector(x,y).text(map[x][y]);
		}
	}
}
function setGameNumber(count){
	for(let i = 0 ; i < count ; i ++){
		let pox = parseInt(Math.random()*9);
		let poy = parseInt(Math.random()*9);
		addClass(pox,poy,'userInput').attr("contenteditable","true").text('').focus(function(){
			setHintArea(pox,poy,true);
		}).blur(function(){
			setHintArea(pox,poy,false);
		}).keyup(function(){
			checkUserInput(pox,poy,$(this).text());
		});
	}
}
function setHintArea(x,y,isFocus){
	for(let i = 0 ; i < 9 ; i ++){
		if(isFocus){
			addClass(x,i,'hint');
			addClass(i,y,'hint');
		}else{
			removeClass(x,i,'hint');
			removeClass(i,y,'hint');
		}
	}
	
	let ckxst = parseInt(x/3)*3;
	let ckxed = ckxst + 3;
	let ckyst = parseInt(y/3)*3;
	let ckyed = ckyst + 3;
	
	for(let i = ckxst ; i < ckxed ; i ++){
		for(let k = ckyst ; k < ckyed ; k ++){
			if(isFocus){
				addClass(i,k,'hint');
			}else{
				removeClass(i,k,'hint');
			}
		}
	}
}
function checkUserInput(x,y,number){
	for(let i = 0 ; i < 9 ; i ++){
		if(elementSelector(x,i).text() != "" && elementSelector(x,i).text() == number && y != i){
			addClass(x,i,'duplicated');
		}else if(elementSelector(x,i).text() != number && y != i){
			removeClass(x,i,'duplicated');
		}
		
		if(elementSelector(i,y).text() != "" && elementSelector(i,y).text() == number && x != i){
			addClass(i,y,'duplicated');
		}else if(elementSelector(i,y).text() != number && x != i){
			removeClass(i,y,'duplicated');
		}
	}
	
	let ckxst = parseInt(x/3)*3;
	let ckxed = ckxst + 3;
	let ckyst = parseInt(y/3)*3;
	let ckyed = ckyst + 3;
	
	for(let i = ckxst ; i < ckxed ; i ++){
		for(let k = ckyst ; k < ckyed ; k ++){
			if(elementSelector(i,k).text() != "" && elementSelector(i,k).text() == number && x != i && y != k){
				addClass(i,k,'duplicated');
			}else if(elementSelector(i,k).text() != number && x != i && y != k){
				removeClass(i,k,'duplicated');
			}
		}
	}
}
function addClass(x,y,className){
	return $('.row').eq(x).find('div').eq(y).addClass(className);
}
function removeClass(x,y,className){
	return $('.row').eq(x).find('div').eq(y).removeClass(className);
}
function elementSelector(x,y){
	return $('.row').eq(x).find('div').eq(y);
}