function shake() {
	clearTimeout( t );
	$(".button").addClass("shake-please");
	setTimeout( function(){
		$(".button").removeClass("shake-please");

		t = setTimeout(shake, 5000);
	}, 600);
}

var t;
$(document).ready(function(){
	t = setTimeout(shake, 5000);
});