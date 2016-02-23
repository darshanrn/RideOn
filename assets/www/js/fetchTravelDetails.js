function ajaxFetchDetails()
{
	$.mobile.loading('show');
	$.ajax(
		{
			url:"http://128.199.246.169:8888/allRides?version="+Math.random(),
			success:function(response){
				$.mobile.loading('hide');
			    var index;
				 console.log(JSON.stringify(response));
				 console.log("clearing list");
				 
				 $('#rideList').empty(); //empty the list before appending anything new
				 for( index = 0 ; index < response.rides.length; index++)
				 {
					 var ul = document.getElementById("rideList");
					 var li = document.createElement("li");
					 if(response.rides[index].type == "Offer")
					 	li.innerHTML  = "<a href='#rideTypeRequest' data-rel='popup'>Source: <font size='2'>" + response.rides[index].source + "</font><br>Destination: <font size='2'>" + response.rides[index].destination + "</font><br>Time: <font size='2'>" + response.rides[index].time + "</font><br>User Name: <font size='2'>" + response.rides[index].username + "</font><label id='hidethis' class='hideElement'>###" + response.rides[index].id + "</label></a>"
					 else if(response.rides[index].type == "Request")
					 	li.innerHTML  = "<a href='#rideTypeOffer' data-rel='popup'>Source: <font size='2'>" + response.rides[index].source + "</font><br>Destination: <font size='2'>" + response.rides[index].destination + "</font><br>Time: <font size='2'>" + response.rides[index].time + "</font><br>User Name: <font size='2'>" + response.rides[index].username + "</font><label id='hidethis' class='hideElement'>###" + response.rides[index].id + "</label></a>"
					 ul.appendChild(li);
					 console.log("appended li to ul");
				 }
				 console.log("refreshing list");
				 $('#rideList').listview('refresh'); //refresh the unordered list after appending items			 
				 $("#fetchDetails").html('Refresh'); //chnage the text of 'Fetch Details' button to 'Refresh'
				 
				 $('#listOfRides ul').children('li').bind('touchstart mousedown', function(e) {
   						var selectedRouteId = $(this).text().split("###")[1];
   						
   						window.localStorage.setItem("selectedRouteId", selectedRouteId);
   						console.log("Successfully stored the route " + selectedRouteId + " id to LocalStorage");
   				 });
   				 
   				 //hide all fields with id
   				 $('.hideElement').each(function(i, obj){
   				 	$(this).hide();
   				 });
   				 
   				 //hide all fields with type
   				 $('.hideType').each(function(i, obj){
   				 	$(this).hide();
   				 });
			},
			error: function(message){
				$.mobile.loading('hide');
				alert("Failed to load details");
			}
		});
}


function ajaxTagUserWithRoute(overrideRouteId)
{
	$.mobile.loading('show');
	var userId = window.localStorage.getItem("userId");
	if(userId == null)
	{
		alert("Please login and try again...");
		$.mobile.loading('hide');
		return -1;
	}
	
	var routeId = window.localStorage.getItem("selectedRouteId").trim();
	if(overrideRouteId)
		routeId = overrideRouteId;
	var urlRequest = "http://128.199.246.169:8888/tagUserToRoute?travelId=" + routeId + "&userId=" + userId + "&version="+Math.random();
	console.log("URL to tag user to route = " + urlRequest);
	
	$.ajax(
		{
			url: urlRequest,
			success:function(response){
				$.mobile.loading('hide');
			    alert("You are successfully tagged to the route");
			    $( "#rideTypeOffer" ).popup( "close" ); //close the popup after its job
			    $( "#rideTypeRequest" ).popup( "close" );
			},
			error: function(message){
				$.mobile.loading('hide');
				alert("Failed to register to the route");
				$( "#rideTypeOffer" ).popup( "close" );
				$( "#rideTypeRequest" ).popup( "close" );
			}
		});
}