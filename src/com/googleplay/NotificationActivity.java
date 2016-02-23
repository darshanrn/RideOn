package com.googleplay;

import static com.googleplay.CommonUtilities.DISPLAY_MESSAGE_ACTION;
import static com.googleplay.CommonUtilities.EXTRA_MESSAGE;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.widget.TextView;

import com.google.android.gcm.GCMRegistrar;

public class NotificationActivity extends Activity {

	TextView lblMessage;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_notification);
		lblMessage = (TextView) findViewById(R.id.lblMessage);
		
		registerReceiver(gcmMessageReceiver, new IntentFilter(DISPLAY_MESSAGE_ACTION));
		
		startActivity(new Intent(this, CarPool.class));
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.notification, menu);
		return true;
	}
	
	/**
	 * Receiving push messages
	 * */
	private final BroadcastReceiver gcmMessageReceiver = new BroadcastReceiver() {
		@Override
		public void onReceive(Context context, Intent intent) {
			String newMessage = intent.getExtras().getString(EXTRA_MESSAGE);
			// Waking up mobile if it is sleeping
			WakeLocker.acquire(getApplicationContext());

			// Releasing wake lock
			WakeLocker.release();
			
			//start car pool activity after registration with GCM
			if(newMessage != null &&  newMessage.startsWith("Alert"))
			{
				lblMessage.append(newMessage + "\n");
				
			}
		}
	};
	
	@Override
	protected void onDestroy() {
		
		try {
			unregisterReceiver(gcmMessageReceiver);
			GCMRegistrar.onDestroy(this);
		} catch (Exception e) {
			Log.e("UnRegister Receiver Error", "> " + e.getMessage());
		}
		super.onDestroy();
	}


}
