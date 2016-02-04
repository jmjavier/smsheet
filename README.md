#SMSheet

Logs SMSes received through a Twilio number to a Google Spreadsheet.

Quickly set it up by signing up for a Twilio account, a Google API account and deploying this code to Heroku.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)



Last updated February 3, 2016.

##Setting up your Twilio SMS

At the end of this you should have:

- a phone number from Twilio that can receive SMSes
- an SID
- an AuthToken

###Getting your Phone Number
  

1. Sign up for an account at [https://www.twilio.com/](https://www.twilio.com/)
2. Log in, go to [https://www.twilio.com/user/account/messaging/phone-numbers](https://www.twilio.com/user/account/messaging/phone-numbers) or click __PHONE NUMBERS__ on the main navigation.
3. Click Buy a Number
4. Choose a number with SMS capabilities by clicking __Buy__
5. Confirm the dialog by clicking __Buy This Number__
6. Click __Setup number__
7. You should now be on the _Configure_ screen
8. Click __Save__.

_Remember how to get to this page. We'll need to add the Heroku app url later to this page. It's accessible under PHONE NUMBERS > Manage and then clicking on the Phone number from the list._


###Getting your Account SID and AuthToken
1. While you are still signed it to Twilio.com, click on your username/email address on the navbar on the top right.
2. Click _Account_ from the dropdown
3. Under __API Credentials__ on the left, where the _Live_ box is:
4. `Account SID`, which should look something like a series of letters and numbers, ex. `Pasdlkahdlahdlahd123136`
5. click on the padlock icon under _AuthToken_
6. Copy the `AuthToken`, which is a series of letters and numbers, that look similar to the SID


##Setting up your Google API

At the end of this you should have:

- a Google service account ID
- a Google private key

###Steps 

1. Go to [https://console.developers.google.com/project](https://console.developers.google.com/project) and sign in
2. Click __Create Project__
3. Provide a name, and click __Create__
4. You will be directed to a Pinterest-like dashboard for the project. Click __Enable and manage APIs__ in the blue box.
5. Click the __Drive API__ among the list of APIs
6. Click __Enable__
7. You will get a warning _This API is enabled, but you can't use it in your project until you create credentials. 
Click "Go to Credentials" to do this now (strongly recommended)._ 
8. Click __Credentials__ on the left menu. Don't click the link in the warning because it will take you to a wizard.
9. Click __New credentials__ in the dropdown, select _Service account key_
10. Under _Service account_ select _New service account_
11. Give it a name
12. Give it a service account ID
14. Choose _JSON_ as the _Key type_
15. Click __Create__
16. It will download a JSON file to your computer

The JSON file should contain both the `Google service account ID` (which will be marked as `client_email` in the JSON file) and the `Google private key`


##Setting up your Google Spreadsheet

At the end of this you should have:

- a Google Spreadsheet ID

###Create the spreadsheet

1. Go to drive.google.com and create a spreadsheet
2. Copy the ID from the URL. For example if the URL is `https://docs.google.com/spreadsheets/d/1cQ_XnVE0gQWzZ-aawFPGRPzBhqVsu1VVVbrf800LwgY/` then the ID is `1cQ_XnVE0gQWzZ-aawFPGRPzBhqVsu1VVVbrf800LwgY`
2. The spreadsheet should have two sheets.
3. The first sheet should have the top rows labeled with: Timestamp, Sender, Message
4. The second sheet should have the top row labeled with: reply
5. You can put a custom reply that will be sent via SMS on the second row

Here's a sample spreadhseet: [https://docs.google.com/spreadsheets/d/110pzwINpi9iXo943ccSU6kAA3ko9dp_TC4RtLY1VKbI/edit?usp=sharing](https://docs.google.com/spreadsheets/d/110pzwINpi9iXo943ccSU6kAA3ko9dp_TC4RtLY1VKbI/edit?usp=sharing)

###Share it with the Google service account ID
1. Click __Share__ on the top right
2. Enter the `client_email` from your JSON file, under _People_
3. Make sure _Can edit_ is selected
4. Click __Send__

##Putting it all together by deploying to Heroku
1. Click the button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)
2. Provide an _App Name_. This will be used as the URL to your app. ex. an App name of smsheet will create smsheet.herokuapp.com.
3. Leave _Runtime_ as is
4. For _Config Variables_
5. _GOOGLE_CLIENT_EMAIL_ is the `client_email` in the JSON file that was downloaded from Google
6. _GOOGLE_PRIVATE_KEY_ is the `private_key` in the JSON file that was downloaded from Google
7. _GOOGLE_SHEET_ID_ is the Google spreadsheet ID where the messages will be logged
7. _TWILIO_ACCOUNT_SID_ is the `SID` from Twilio
8. _TWILIO_AUTHTOKEN_ is the `AuthToken` from Twilio
9. Click __Deploy for Free__

### Connecting the Heroku app to Twilio
1. Once the app is deployed, copy the URL ex. `https://smsheet.herokuapp.com`
2. Log in to Twilio.com
3. Under PHONE NUMBERS, click _Manage_ and then click on the Phone number from the list.
4. On the phone number's _Configure Screen_, under _Messaging_
5. Select _Configure with URL_
6. For _Request URL_ put in your Heroku app's URL followed by a /receive. For ex. `https://smsheet.herokuapp.com/receive`.
7. Select _HTTP POST_ next to that URL
8. Click __Save__


##Testing it
1. Send a text to the Twilio phone number
2. You should receive a reply after sending
3. The Google Spreadsheet should have the message you texted logged

