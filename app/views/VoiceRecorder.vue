<template>
  <Page class="page">
    <ActionBar title="Voice Record" />

    <StackLayout>
      <TextField v-model="name" hint="Name for new sound" />
      <GridLayout columns="*,*" height="70">
        <Button text="Record" col="0" @tap="record" v-if="!recording" />
        <Button text="Stop Recording" col="0" @tap="endRecord" v-if="recording" />
        <Button text="Play" col="1" @tap="play" :isEnabled="playEnabled" />
      </GridLayout>
      <Button text="Save" @tap="save" :isEnabled="saveEnabled" />
      <Button text="Your Records" @tap="goToListOfRecords" />
    </StackLayout>
  </Page>
</template>

<script>
  import * as audio from 'nativescript-audio';
  import * as platform from 'tns-core-modules/platform';
  import * as fileSystemModule from 'tns-core-modules/file-system';

  import utils from '../api/utils';
  import sounds from '../api/sounds';

  import ListOfRecords from './ListOfRecords';

  function randomName() {
    return `rnd${utils.generateUUIDv4()}.mp4`;
  }

  export default {
    components: {
      ListOfRecords
    },
    data () {
      return {
        name: '',
        audioFolder: null,
        recorder: null,
        recording: false,
        lastName: ''
      }
    },
    computed:{
      playEnabled() {
        return this.lastName !== '' && !this.recording;
      },
      saveEnabled() {
        return this.playEnabled && this.name !== '';
      }
    },
    methods: {
      async record () {
        if (this.lastName) {
          let file = this.audioFolder.getFile(this.lastName);
          await file.remove();
        }

        this.recorder = new audio.TNSRecorder();

        let newName = randomName();
        let androidFormat;
        let androidEncoder;

        if (platform.isAndroid) {
          androidFormat = 2;
          androidEncoder = 3;
        }

        let options = {
          filename: this.audioFolder.path+'/'+newName,
          format: androidFormat,
          encoder: androidEncoder,
          infoCallback: info => {/* apparently I'm necessary even if blank */ },
          errorCallback: e => { console.log('error cb', e); }
        };
        await this.recorder.start(options);
        this.recording = true;
        // Remember the filename for delete and playback purposes
        this.lastName = newName;
      },
      async endRecord() {
        await this.recorder.stop();
        this.recording = false;
      },
      async play() {
        let player = new audio.TNSPlayer();

        await player.playFromFile({
          audioFile: `${this.audioFolder.path}/${this.lastName}`
        });
      },
      save() {
        sounds.saveSound(this.name, this.lastName);
        this.$navigateTo(ListOfRecords, {frame: 'mainContent'});
      },
      goToListOfRecords () {
        this.$navigateTo(ListOfRecords, {frame: 'mainContent'});
      }
    },
    created() {
      this.audioFolder = fileSystemModule.knownFolders.currentApp().getFolder('recordings');
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
</style>
