function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (input, pos) {
  setSelectionRange(input, pos, pos);
}

function checkPostForURL(post){
    var matches = new Array();
    var urlexp = new RegExp("(^|[ \t\r\n])((http|https):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))","g");
    
    if ( post != undefined ){
        if ( urlexp.test(post) ){
               var offset = 0;
               matches = post.match(urlexp);
    
               $.each(matches,function() {
					var matchlen = this.length;
                	var matchoffset = matchlen - 23;
    
                	offset = offset + matchoffset;
            	});
    
            return offset;
        }
    }
 }

$(document).ready(function() {

	$("#maketweet .handle").click(function(){

	});

	$("#maketweet input").focus(function(){
		if( $(this).val() == "@example") {
			$(this).val("@");
			setCaretToPos($("#maketweet input"), 1);
		}
	}).blur(function(){
		if( $(this).val() == "@" || $(this).val() == "" ) {
			$(this).val("@example");
		}
	}).on('keyup', function(){
		if( $(this).val() != "Enter your tweet here...") {
			var length = $(this).val().length; 		
			var post = $(this).val();
    		
    		var offset = checkPostForURL(post);
    		if ( offset ){  
        		length = length - offset;
    		}

    		$("#maketweet .charsleft").text(140-length);
		}
	});

	$("#maketweet textarea").focus(function(){
		if( $(this).val() == "Enter your tweet here...") {
			$(this).val("");
		}
	}).blur(function(){
		if( $(this).val() == "" ) {
			$(this).val("Enter your tweet here...");
		}
	}).on('keyup', function(){
		if( $(this).val() != "Enter your tweet here...") {
			var length = $(this).val().length; 		
			var post = $(this).val();
    		
    		var offset = checkPostForURL(post);
    		if ( offset ){  
        		length = length - offset;
    		}

    		$("#maketweet .charsleft").text(140-length);
		}
	});

	$(".langturk").click(function(event){
		event.preventDefault();
		$("#wrapper").removeClass("english").addClass("turk");
	});

	$(".langenglish").click(function(event){
		event.preventDefault();
		$("#wrapper").removeClass("turk").addClass("english");
	});
});