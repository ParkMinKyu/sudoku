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
				let userNum = parseInt($('.row').eq(x).find('div').eq(y).text());
				if(realNum != userNum){
					if($('.row').eq(x).find('div').eq(y).attr("contenteditable") == "true")$('.row').eq(x).find('div').eq(y).addClass('error');
					fcnt++;
				}else if($('.row').eq(x).find('div').eq(y).attr("contenteditable") == "true"){
					$('.row').eq(x).find('div').eq(y).removeClass('error');
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
