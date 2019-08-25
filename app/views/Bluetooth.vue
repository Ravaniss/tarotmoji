<template>
  <Page>
    <FlexboxLayout flexDirection="column">
      <Image src="https://play.nativescript.org/dist/assets/img/NativeScript_logo.png" height="90" margin="30 0"/>
      <Button text="Button" @tap="isBluetoothOn"/>
      <Button text="Button" @tap="enableBluetooth"/>
      <Button text="Button" @tap="startScan"/>
      <Label text="2" backgroundColor="#DDDDDD"/>
      <Label text="3" backgroundColor="#CCCCCC"/>
      <Label text="4" backgroundColor="#BBBBBB"/>
      <Label text="5" backgroundColor="#AAAAAA"/>
      <Label text="6" backgroundColor="#999999"/>

      <ActivityIndicator :busy="isBusy" class="activity-indicator"/>

      <Button text="Gesture" @tap="goToGesturePage"/>
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
            console.log("Periperhal found with UUID: " + peripheral.UUID)
            console.log('Peripheral RSSI: ' + peripheral.RSSI)
            console.log('Peripheral Name: ' + peripheral.name)
          }
        }).then(
          () => console.log("scanning complete"),
          (err) => console.log("error while scanning: " + err)
        );
      },
      goToGesturePage() {
        this.$navigateTo(Gesture)
      }
    },
    data() {
      return {
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
