$(function(){
  var checkTime = setInterval(function(){
    let time = parseInt($('#gameTime').text());
    $('#gameTime').text(++time);
  },1000);
	
	$('#finishBtn').click(function(){
		checkUserInput();
		for(let x = 0 ; x < 9 ; x ++){
			for(let y = 0 ; y < 9 ;  y ++){
				if(elementSelector(x,y).text() == ''){
					addClass(x,y,'error');
				}
			}
		}
		
		if($('.error').length > 0 || $('.duplicated').length > 0){
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
			checkUserInput();
		}).blur(function(){
			setHintArea(pox,poy,false);
			checkUserInput();
		}).keyup(function(){
			checkUserInput();
		});
	}
}
function setHintArea(x,y,isFocus){
	$('.error').removeClass('error');
	$('.duplicated').removeClass('duplicated');
	$('.hint').removeClass('hint');
	for(let i = 0 ; i < 9 ; i ++){
		if(isFocus){
			addClass(x,i,'hint');
			addClass(i,y,'hint');
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
			}
		}
	}
}
function checkUserInput(){
	$('.error').removeClass('error');
	$('.duplicated').removeClass('duplicated');
	
	for(let x = 0 ; x < 9 ; x ++){
		for(let y = 0 ; y < 9 ;  y ++){
			for(let i = 0 ; i < 9 ; i ++){
				if(elementSelector(x,i).text() != "" && elementSelector(x,i).text() == elementSelector(x,y).text() && y != i){
					addClass(x,i,'duplicated');
				}
				
				if(elementSelector(i,y).text() != "" && elementSelector(i,y).text() == elementSelector(x,y).text() && x != i){
					addClass(i,y,'duplicated');
				}
			}
			
			let ckxst = parseInt(x/3)*3;
			let ckxed = ckxst + 3;
			let ckyst = parseInt(y/3)*3;
			let ckyed = ckyst + 3;
			
			for(let i = ckxst ; i < ckxed ; i ++){
				for(let k = ckyst ; k < ckyed ; k ++){
					if(elementSelector(i,k).text() != "" && elementSelector(i,k).text() == elementSelector(x,y).text() && x != i && y != k){
						addClass(i,k,'duplicated');
					}
				}
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