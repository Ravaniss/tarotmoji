<template>
  <MultiDrawer ref="drawer">
    <StackLayout slot="left">
      <Label text="Bluetooth" @tap="goToBluetoothPage" />
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

  export default {
    components: {
      Home
    },
    data () {
      return {
      }
    },
    methods: {
      goToBluetoothPage () {
        this.$refs.drawer.close('left')
        this.$navigateTo(Bluetooth, {frame: 'mainContent'})
      }
    }
  }
</script>
