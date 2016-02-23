function ajaxFetchHistory()
{
	var userId = window.localStorage.getItem("userId");
	if(userId == null)
	{
		alert("Please login and try again...");
		return;
	}
	var urlRequest = "http://128.199.246.169:8888/getUserHistory?userId=" + userId + "&version="+Math.random();
	console.log(urlRequest);
	
	$.mobile.loading('show');
	$.ajax(
		{
			url:urlRequest,
			success:function(response){
				$.mobile.loading('hide');
				if(response == "Invalid request" )
					alert("Something went wrong..");
				else
				{
				     var index;
					 console.log(JSON.stringify(response));
					 console.log("clearing list");
					 
					 $('#historyList').empty(); //empty the list before appending anything new
					 for( index = 0 ; index < response.history.length; index++)
					 {
						 var ul = document.getElementById("historyList");
						 var li = document.createElement("li");
						 if(response.history[index].type == "Request")
						 	li.innerHTML  = "<a href='#rideTypeOffer' data-rel='popup'>Source: <font size='2'>" + response.history[index].source + "</font><br>Destination: <font size='2'>" + response.history[index].destination + "</font><label id='hidethis' class='hideElement'>###" + response.history[index].id + "</label></a>"
						 else if(response.history[index].type == "Offer")
						 	li.innerHTML  = "<a href='#rideTypeRequest' data-rel='popup'>Source: <font size='2'>" + response.history[index].source + "</font><br>Destination: <font size='2'>" + response.history[index].destination + "</font><label id='hidethis' class='hideElement'>###" + response.history[index].id + "</label></a>"
						 ul.appendChild(li);
						 console.log("appended li to ul");
					 }
					 console.log("refreshing list");
					 $('#historyList').listview('refresh'); //refresh the unordered list after appending items			 
					 $("#fetchDetails").html('Refresh'); //chnage the text of 'Fetch Details' button to 'Refresh'
					 
					 $('#mylistOfRides ul').children('li').bind('touchstart mousedown', function(e) {
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
	   			}
			},
			error: function(message){
				$.mobile.loading('hide');
				alert("Failed to load details");
			}
		});
}