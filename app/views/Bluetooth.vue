<template>
  <Page>
    <ActionBar title="Bluetooth 👌"/>
    <FlexboxLayout flexDirection="column">
      <Image src="https://play.nativescript.org/dist/assets/img/NativeScript_logo.png" height="90" margin="30 0"/>
      <Label :text="enabled"/>
      <Button text="is Bluetooth On ?" @tap="isBluetoothOn"/>
      <Button text="enable Bluetooth" @tap="enableBluetooth"/>
      <Button text="start Scan" @tap="startScan"/>
      <Button text="connected" @tap="connected"/>
      <Button text="read" @tap="read"/>
      <ActivityIndicator :busy="isBusy" class="activity-indicator"/>

    </FlexboxLayout>
  </Page>
</template>

<script>
  import { Bluetooth } from 'nativescript-bluetooth'

  import Gesture from './Gesture'

  const bluetooth = new Bluetooth()

  export default {
    components: {
      Gesture
    },
    data () {
      return {
        deviceConnected: { UUID: '74:29:AF:80:17:BA' },
        isBusy: false,
        enabled: null,
        service: '13333333333333333333333333333337'
      }
    },
    methods: {
      async isBluetoothOn () {
        this.enabled = await bluetooth.isBluetoothEnabled()
      },
      async enableBluetooth () {
        await bluetooth.enable()
      },
      async startScan () {
        await bluetooth.startScanning({
          serviceUUIDs: [],
          seconds: 4,
          onDiscovered: (peripheral) => {
            this.isBusy = true
            console.log("Peripheral found with UUID: " + peripheral.UUID)
            console.log('Peripheral RSSI: ' + peripheral.RSSI)
            console.log('Peripheral Name: ' + peripheral.name)
          }
        })

        this.isBusy = false
      },
      async connected () {
        const connect = await bluetooth.connect(this.deviceConnected)
        console.log(connect)

        connect.services.forEach((service) => {
          console.log(`Service found: ${JSON.stringify(service)}`);
        })

        console.log(`Peripheral connected with UUID: ${connect.UUID}`)

        this.disconneted()
      },
      async disconneted () {
        await bluetooth.disconnect(this.deviceConnected)
        console.log('Disconnected successfully')
      },
      async read () {
        console.log('bonjour ?')
        const connect = await bluetooth.connect(this.deviceConnected)
        console.log(connect)
        const readValue = connect.services[1].characteristics[0].properties.read

        const readingEnabled = readValue === true

        if (connect.state !== 'connected' || !readingEnabled)
            return false

        const readDataFrom = {}
        readDataFrom.peripheralUUID = connect.UUID
        readDataFrom.serviceUUID = connect.services[1].UUID
        readDataFrom.characteristicUUID = connect.services[1].characteristics[0].UUID

        const read = await bluetooth.read(readDataFrom)
        const data = new Uint8Array(read.value)
        console.log(`Example: Your heartrate is ${data[1]} bpm.`)
      },
      goToGesturePage () {
        this.$navigateTo(Gesture, {frame: 'mainContent'})
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
ActionBar {
 background-color: #53ba82;
 color: #ffffff;
}
</style>
