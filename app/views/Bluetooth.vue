<template>
  <Page>
    <ActionBar title="Bluetooth 👌" class="action-bar"></ActionBar>
    <FlexboxLayout flexDirection="column">
      <Image src="https://play.nativescript.org/dist/assets/img/NativeScript_logo.png" height="90" margin="30 0"/>
      <Button text="is Bluetooth On ?" @tap="isBluetoothOn"/>
      <Button text="enable Bluetooth" @tap="enableBluetooth"/>
      <Button text="start Scan" @tap="startScan"/>
      <Button text="connected" @tap="connected"/>
      <Label text="3" backgroundColor="#CCCCCC"/>
      <Label text="4" backgroundColor="#BBBBBB"/>
      <Label text="5" backgroundColor="#AAAAAA"/>
      <Label text="6" backgroundColor="#999999"/>
      <ActivityIndicator :busy="isBusy" class="activity-indicator"/>
    </FlexboxLayout>
  </Page>
</template>

<script>
  import Gesture from './Gesture'

  import { Bluetooth } from 'nativescript-bluetooth'

  const bluetooth = new Bluetooth()

  export default {
    components: {
      Gesture
    },
    methods: {
      onItemTap: function (args) {
        console.log('Item with index: ' + args.index + ' tapped');
      },
      isBluetoothOn() {
        console.log("Button was pressed")
        bluetooth.isBluetoothEnabled().then(enabled => {
          console.log('Enabled? ' + enabled);
        });
      },
      enableBluetooth() {
        bluetooth.enable().then((enabled) => {
          console.log(enabled)
        })
      },
      startScan() {
        console.log("Start scanning");
        bluetooth.startScanning({
          serviceUUIDs: [],
          seconds: 4,
          onDiscovered: (peripheral) => {
            this.isBusy = true
            console.log("Periperhal found with UUID: " + peripheral.UUID)
            console.log('Peripheral RSSI: ' + peripheral.RSSI)
            console.log('Peripheral Name: ' + peripheral.name)
          }
        }).then(
          () => this.isBusy = false,
          (err) => console.log("error while scanning: " + err)
        );
      },
      connected() {
        bluetooth.connect({
          UUID: '3C:BD:3E:6F:8F:72',
          onConnected: function (peripheral) {
            console.log("Periperhal connected with UUID: " + peripheral.UUID);

            // the peripheral object now has a list of available services:
            peripheral.services.forEach(function (service) {
              console.log("service found: " + JSON.stringify(service));
            });
          },
          onDisconnected: function (peripheral) {
            console.log("Periperhal disconnected with UUID: " + peripheral.UUID);
          }
        })
      },
      goToGesturePage() {
        this.$navigateTo(Gesture, {frame: 'mainContent'})
      }
    },
    data() {
      return {
        countries: [
          {name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png"},
          {name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png"},
          {name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png"},
          {name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png"},
          {name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png"},
          {name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png"},
          {name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png"},
          {name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png"},
          {name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png"},
          {name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png"},
          {name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png"},
          {name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png"},
          {name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png"},
          {name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png"},
          {name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png"},
          {name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png"},
          {name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png"},
        ],
        isBusy: false
      }
    }
  }
</script>

<style scoped>
  Label {
    height: 50;
    text-align: center;
    font-size: 16;
    padding: 12;
  }
</style>
