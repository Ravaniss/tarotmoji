<template>
  <MultiDrawer ref="drawer">
    <StackLayout slot="left" id="menu">
      <Label text="Bluetooth" @tap="goToBluetoothPage" />
      <Label text="Gesture" @tap="goToGesturePage" />
      <Label text="Voice Recorder" @tap="goToVoiceRecorderPage" />
      <Label text="Camera" @tap="goToCameraPage" />
      <Label text="Geo Localization" @tap="goToGeoLocPage" />
      <Label text="NFC" @tap="goToNFCPage" />
    </StackLayout>

    <Frame ~mainContent id="mainContent">
      <Page actionBarHidden="true">
        <Home />
      </Page>
    </Frame>

  </MultiDrawer>
</template>

<script>
  import Home from './Home'
  import Bluetooth from './Bluetooth'
  import Gesture from './Gesture'
  import VoiceRecorder from './VoiceRecorder'
  import Camera from './Camera'
  import GeoLocation from './GeoLocation'
  import NFC from './NFC'

  export default {
    components: {
      Home
    },
    methods: {
      goToBluetoothPage () {
        this.$refs.drawer.close('left')
        this.$navigateTo(Bluetooth, {frame: 'mainContent'})
      },
      goToGesturePage () {
        this.$refs.drawer.close('left')
        this.$navigateTo(Gesture, {frame: 'mainContent'})
      },
      goToVoiceRecorderPage () {
        this.$refs.drawer.close('left')
        this.$navigateTo(VoiceRecorder, {frame: 'mainContent'})
      },
      goToCameraPage () {
        this.$refs.drawer.close('left')
        this.$navigateTo(Camera, {frame: 'mainContent'})
      },
      goToGeoLocPage () {
        this.$refs.drawer.close('left')
        this.$navigateTo(GeoLocation, {frame: 'mainContent'})
      },
      goToNFCPage () {
        this.$refs.drawer.close('left')
        this.$navigateTo(NFC, {frame: 'mainContent'})
      }
    }
  }
</script>

<style scoped>
  Label {
    text-align:center;
    background-color: aquamarine;
    padding: 15;
    font-size: 20;
  }
</style>
