function addTravelData(type)
{
	$.mobile.loading('show');
	var source = "source=" + document.getElementById('source').value;
	var destination = "&destination=" + document.getElementById('destination').value;
	var time = "&time=" + parseTime(document.getElementById('hours').value, document.getElementById('minutes').value, document.getElementById('ampm').value );	
	var frequency = "&frequency=" + document.getElementById('frequency').value;
	var username = "&username=" + window.localStorage.getItem("username");
	var typeValue = "&type=" + type;
	
	var urlRequest = "http://128.199.246.169:8888/addNewTravelData?"+source+destination+time+frequency+typeValue+username;
	//console.log(urlRequest);
	
	$.ajax(
		{
			url: urlRequest,
			success:function(response){
				$.mobile.loading('hide');
				
				//save the travel Id to local storage
				var travelId = response.split('###')[1];
				window.localStorage.setItem("travelId", travelId);
				//call tagging of user with route ajax method
				if(ajaxTagUserWithRoute(travelId) == -1)
					return; //user not logged in 
				
			    if(type == 'Request' )
			    	alert("Request Registered..");
			    else
			    	alert("Offer Registered..");
			},
			error: function(message){
				$.mobile.loading('hide');
				alert("Failed to register");
			}
		});
}


function parseTime(hours, minutes, ampm)
{
	var finalTime = "";
	var hrs = parseInt(hours);
		
	if(ampm == "PM")
	{
		hrs += 12;
		finalTime += hrs + ":" + minutes + ":00";
	}
	else
		finalTime += hours + ":" + minutes + ":00";
	
	return finalTime;
}