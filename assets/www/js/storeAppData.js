/**********************************************************************/
/*Store Data
/**********************************************************************/

function saveUserDetailsToLocalStorage(username) {	
   $.mobile.loading('show');
   $.ajax(
   {   		
		url:"http://128.199.246.169:8888/getUserDetails?username="+username,
		success:function(response){
			$.mobile.loading('hide');
			window.localStorage.setItem("username", response.name);
			window.localStorage.setItem("mobile", response.mobile);
			window.localStorage.setItem("userId", response.id);
		},
		error: function(message){
			$.mobile.loading('hide');
			alert("Failed to get user details");
		}
	});
   
}


/**********************************************************************/
/*Retrieve Data
/**********************************************************************/

function getUserDetailsToLocalStorage()
{
	alert(window.localStorage.getItem("username"));
	alert(window.localStorage.getItem("mobile"));	
}
