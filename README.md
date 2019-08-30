# NativeScript-Vue Application

> A native application built with NativeScript-Vue

## Usage

``` bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
npm run dev

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```

## Notifications

To send a notification to our app, you need to have Postman.

Next, send the request with the following :

[Headers](https://ibb.co/sy5FyHH)
[Body](https://ibb.co/jLhFHgH)

The body text:

```
{
	"notification": {
		"title": "I demande your attention :)",
		"subtitle": "Just kidding, but not really",
		"text": "It's my text",
		"click_action" : "GENERAL",
		"badge": "1",
		"sound": "default"
	},
	"content_available": true,
	"data": {
		"foo": "bar"
	},
	"priority": "High",
	"to": "efn19SazzSc:APA91bEMByMwJNb7HawuLake25yGWCt9sYBdfE9wb5sU5bUVfuAAiu5e39gH_Pi3qra-bEuYEdUI565NnFI01dPsWJ1Hq6SJfcIXNDvdWhEHq8rTDo-WV6UA3rSRVlgXCovuW7bg0hOb"
}
```

I used my google key, so please, do not overabuse of this please. ^^

If you want a key: Here are the steps :

First, this [commit](https://github.com/Ravaniss/tarotmoji/commit/57780fe364b311da44a4158fb222a3fe1d370716) will help you.
Follow [this](https://firebase.google.com/docs/android/setup?authuser=0) to add firebase to our project

You're going to get your google-services.json by following the creation of your project inside Firebase. Do not create it by yourself. You should add it in `app/App_Resources/Android/`.

When he's asking you to add something inside build.gradle, you should add it inside your package.json, nativescript section.
(see my commit)

Next, add an [action](https://firebase.google.com/docs/cloud-messaging/android/client?authuser=0#manifest) inside AndroidManifest.xml


