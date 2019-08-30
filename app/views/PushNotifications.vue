<template>
  <Page>
    <ActionBar title="Push Notif"/>
    <StackLayout>
      <Button @tap="hasPermission" class="btn" text="Has Permission?"></Button>
      <Button @tap="registerNotification" class="btn" text="Schedule Notification"></Button>
      <!--<Button @tap="onTapCancelAll" class="btn" text="Cancel notifications"></Button>-->
      <Label class="message" :text="message" textWrap="true"></Label>
    </StackLayout>
  </Page>
</template>

<script>
  import { messaging, Message } from "nativescript-plugin-firebase/messaging";

  export default {
    data () {
      return {
        message: "Hello world !"
      }
    },
    methods: {
      hasPermission () {
        console.log(`Notifications enabled? ${messaging.areNotificationsEnabled()}`);
      },
      registerNotification () {
        messaging.registerForPushNotifications({
          onPushTokenReceivedCallback: (token) => {
            console.log("Firebase plugin received a push token: " + token);
          },

          onMessageReceivedCallback: (message) => {
            console.log(message)
          },

          // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
          showNotifications: true,

          // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
          showNotificationsWhenInForeground: true
        }).then(() => console.log("Registered for push"));
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
  .message {
    font-size: 14;
    margin: 16;
    color: #53ba82;
  }
  Button.btn {
    font-size: 14;
    border-radius: 3;
    border-width: 2;
    border-color: #63d4a5;
    color: #63d4a5;
    padding: 12;
    margin: 16;
  }
</style>
