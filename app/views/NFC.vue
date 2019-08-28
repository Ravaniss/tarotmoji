<template>
  <Page loaded="pageLoaded">
    <ActionBar title="NFC Test"/>
    <Label text="Hello world !"></Label>
    <StackLayout>
      <Button text="NFC available?" @tap="doCheckAvailable" />
      <Button text="NFC enabled?" @tap="doCheckEnabled" />
      <Button text="set Tag" @tap="doStartTagListener" />
      <Button text="NDEF Listener" @tap="doStartNDefListener" />

      <Label :text="lastTagDiscovered" textWrap="true" />
      <Label :text="lastNdefDiscovered" textWrap="true" />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
  import { Nfc, NfcTagData, NfcNdefData } from 'nativescript-nfc';

  export default {
    data () {
      return {
        nfc: new Nfc(),
        lastTagDiscovered: null,
        lastNdefDiscovered: null,
        tagMessages: []
      }
    },
    methods: {
      async doCheckAvailable () {
        const nfcAvailable = await this.nfc.available();
        if (!nfcAvailable) { return false; }
        console.log('NFC Available on this phone');
      },
      async doCheckEnabled () {
        const enable = await this.nfc.enabled();
        if (!enable) console.log('You should turn NFC on in the device settings');
        console.log('NFC ON');
      },
      doStartTagListener () {
        this.nfc.setOnTagDiscoveredListener((data: NfcTagData) => {
          console.log("Discovered a tag with ID " + data.id);
          this.lastTagDiscovered = data.id
        })
      },
      doStartNDefListener () {
        this.nfc.setOnNdefDiscoveredListener((data: NfcNdefData) => {
          console.log(data) // do not even pass here ...
          /*if (data.message) {
            data.message.forEach((record) => {
              console.log("Read record: " + JSON.stringify(record)); // don't go here why ?
              this.tagMessages.push(record.payloadAsString);
            });
            this.lastNdefDiscovered = "Read: " + this.tagMessages.join(", ");
          }*/
        });
      }
    },
    mounted() {
      this.doCheckAvailable()
      this.doCheckEnabled()
      this.doStartNDefListener()
      this.doStartTagListener()
    }
  }
</script>
