function me() {

      FB.api('/me?fields=picture,name,email', function(user) {
            console.log('response from facebook: ' + JSON.stringify(user));
            var profilePictureUrl = '';
            if (user.picture.data) {
              profilePictureUrl = user.picture.data.url;
            } else {
              profilePictureUrl = user.picture;
            }
            console.log('userId: ' + user.id);
            console.log('name: ' + user.name);
            console.log('email: ' + user.email);
            console.log('picture url: ' + profilePictureUrl);

            $('#log').html(user.name);

        });
}

function logout() {
    FB.logout(function(response) {
        console.log('logout response:' + JSON.stringify(response));
        alert('logged out');
    });
}

function init() {
	
	try {
        //alert('Device is ready! Make sure you set your app_id below this alert.');
       
	     FB.init({ 
              appId: "567189353357960", 
              status     : true,
    		  xfbml      : true
            });
            
            fblogin();
		
       
        document.getElementById('data').innerHTML = "";
    } catch (e) {
        alert('err: ' + e);
    }
}

function fblogin()
{
	//alert("inside fblogin");
	FB.login( function(response)
    {
              
       if (response.authResponse) {
            //alert('logged in now');
            console.log('login response:' + response.authResponse);
            me();
       } 
       else 
       {
            //alert('not logged in on login');
            console.log('login response:' + response.error);
       }
    },
       { scope: "email" }
    );
}