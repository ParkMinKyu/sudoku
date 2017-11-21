$(function(){
	$('#finishBtn').click(function(){
		checkUserInput();
		for(let x = 0 ; x < 9 ; x ++){
			for(let y = 0 ; y < 9 ;  y ++){
				if(elementSelector(x,y).text() == '' || parseInt(elementSelector(x,y).text()) > 9 ){
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
		if($('#easyBtn').css('background-color') == '#c7c731'){
			$('#easyBtn').click();
		}else{
			$('#hardBtn').click();
		}
	});
	$('#hardBtn').click(function(){
		mapReset();
		createMapHard();
		shuffleMap(5);
		displayNumber();
		setGameNumber(45);
		$('#gameTime').text(0)
		$(this).css('background-color','#c7c731');
		$('#easyBtn').css('background-color','#ddd');
	});
	$('#easyBtn').click(function(){
		mapReset();
		createMapEasy();
		shuffleMap(5);
		displayNumber();
		setGameNumber(35);
		$('#gameTime').text(0)
		$(this).css('background-color','#c7c731');
		$('#hardBtn').css('background-color','#ddd');
	});
	$('#undoBtn').click(function(){
		document.execCommand('undo');
	});
	$('#redoBtn').click(function(){
		document.execCommand('redo');
	});
	$('.numberArea > button').on('click',function(){
		$('.point').text($(this).text());
		checkUserInput();
	});
});
var checkTime = setInterval(function(){
    let time = parseInt($('#gameTime').text());
    $('#gameTime').text(++time);
  },1000);
function mapReset(){
	$('.userInput').attr("onclick",null).removeClass('userInput');
	$('.point').removeClass('point');
	$('.error').removeClass('error');
	$('.duplicated').removeClass('duplicated');
	$('.hint').removeClass('hint');
}
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
		addClass(pox,poy,'userInput').text('').attr('onclick','setHintArea('+pox+','+poy+');');
	}
}
function setHintArea(x,y){
	$('.point').removeClass('point');
	$('.error').removeClass('error');
	$('.duplicated').removeClass('duplicated');
	$('.hint').removeClass('hint');
	for(let i = 0 ; i < 9 ; i ++){
		addClass(x,i,'hint');
		addClass(i,y,'hint');
	}
	
	let ckxst = parseInt(x/3)*3;
	let ckxed = ckxst + 3;
	let ckyst = parseInt(y/3)*3;
	let ckyed = ckyst + 3;
	
	for(let i = ckxst ; i < ckxed ; i ++){
		for(let k = ckyst ; k < ckyed ; k ++){
			addClass(i,k,'hint');
		}
	}
	addClass(x, y, "point");
	checkUserInput();
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