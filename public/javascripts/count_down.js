function countDown(){
	var currentCount = parseInt($('#countdown').text());
	
	if (currentCount > 0){
		$('#countdown').text(--currentCount);
	}else{
		$('#countdown_logout').click();
		return;
	}
	setTimeout("countDown()",1000);	
}