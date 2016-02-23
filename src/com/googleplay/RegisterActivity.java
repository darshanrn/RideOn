package com.googleplay;

import static com.googleplay.CommonUtilities.SENDER_ID;
import static com.googleplay.CommonUtilities.SERVER_URL;
import android.app.Activity;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class RegisterActivity extends Activity {
	// alert dialog manager
	AlertDialogManager alert = new AlertDialogManager();
	
	// Internet detector
	ConnectionDetector cd;
	
	// UI elements
	EditText txtName;
	EditText txtMobile;
	
	// Register button
	Button btnRegister;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_register);
		
		//check to see if device is already registred with GCM. If yes, directly take to phonegap launch screen
		SharedPreferences prefs =  PreferenceManager.getDefaultSharedPreferences(getApplicationContext()); 
		String restoredText = prefs.getString("GCM_REGISTRY", null);
		if (restoredText != null && restoredText.equalsIgnoreCase("YES")) 
		{
			startActivity(new Intent(this, CarPool.class));
			finish();
		}
		
		cd = new ConnectionDetector(getApplicationContext());

		// Check if Internet present
		if (!cd.isConnectingToInternet()) {
			// Internet Connection is not present
			alert.showAlertDialog(RegisterActivity.this,
					"Internet Connection Error",
					"Please connect to working Internet connection", false);
			// stop executing code by return
			return;
		}

		// Check if GCM configuration is set
		if (SERVER_URL == null || SENDER_ID == null || SERVER_URL.length() == 0
				|| SENDER_ID.length() == 0) {
			// GCM sernder id / server url is missing
			alert.showAlertDialog(RegisterActivity.this, "Configuration Error!",
					"Please set your Server URL and GCM Sender ID", false);
			// stop executing code by return
			 return;
		}
		
//		txtName = (EditText) findViewById(R.id.txtName);
		txtMobile = (EditText) findViewById(R.id.txtMobile);
		btnRegister = (Button) findViewById(R.id.btnRegister);
		
		/*
		 * Click event on Register button
		 * */
		btnRegister.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View arg0) {
				// Read EditText dat
//				String name = txtName.getText().toString();
				String mobile = txtMobile.getText().toString();
				
				String name = "Ride On User";
				
				// Check if user filled the form
				if(name.trim().length() > 0 && mobile.trim().length() > 0){
					// Launch Main Activity
					Intent i = new Intent(getApplicationContext(), MainActivity.class);
					
					// Registering user on our server					
					// Sending registraiton details to MainActivity
					i.putExtra("name", name);
					i.putExtra("email", mobile);
					startActivity(i);
					finish();
				}else{
					// user doen't filled that data
					// ask him to fill the form
					alert.showAlertDialog(RegisterActivity.this, "Registration Error!", "Please enter your details", false);
				}
			}
		});
	}

}
