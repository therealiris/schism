// main.js

		$("#connect").click(function(){
        $("#app-mount-point").html("")
        $( "#app-mount-point" ).load( "connect.html", function() {
          console.log("ummh")
         
		        });
		    })
		$("#profile").click(function(){
	        $("#app-mount-point").html("")
	        $( "#app-mount-point" ).load( "profile.html", function() {
	          console.log("ummh")
	         
	        });
	    
    })
		// $(".menu-item").click(function(){
	 //    	$("html").removeClass("nav-open")
	 //    })