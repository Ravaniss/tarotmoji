<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Records"></Label>
    </ActionBar>

    <StackLayout>
      <Label v-if="sounds.length === 0" text="You haven't recorded any sounds yet." />

      <ListView for="sound in sounds">
        <v-template>
          <Label :text="sound.name" :filename="sound.fileName" @longPress="deleteSound" @tap="playSound"/>
        </v-template>
      </ListView>
      <Button text="Record New Sounds" @tap="goToRecord" />
    </StackLayout>
  </Page>
</template>

<script>
  import * as audio from 'nativescript-audio';
  import * as fileSystemModule from 'tns-core-modules/file-system';
  import soundsAPI from '../api/sounds';
  import VoiceRecorder from './VoiceRecorder';

  export default {
    data () {
      return {
        audioFolder: null,
        sounds: []
      }
    },
    methods: {
      async deleteSound (event) {
        let filename = event.object.filename;
        let confirmOptions = {
          title: 'Delete Sound',
          message: 'Do you want to delete this sound?',
          okButtonText: 'Yes',
          cancelButtonText: 'No'
        };
        confirm(confirmOptions).then(async result => {
          if (result) {
            let file = this.audioFolder.getFile(filename);
            await file.remove();
            soundsAPI.removeSound(filename);
            this.sounds = soundsAPI.getSounds();
          }
        });
      },
      goToRecord () {
        this.$navigateTo(VoiceRecorder, {frame: 'mainContent'});
      },
      async playSound (event) {
        const file = event.object.bindingContext.fileName;
        let player = new audio.TNSPlayer();
        await player.playFromFile({
          audioFile: `${this.audioFolder.path}/${file}`
        });
      }
    },
    created () {
      this.sounds = soundsAPI.getSounds();
      this.audioFolder = fileSystemModule.knownFolders.currentApp().getFolder('recordings');
    }
  }
</script>

<style scoped lang="scss">
  // Start custom common variables
  // End custom common variables
  StackLayout {
    padding: 10;
  }
  Label {
    padding: 30;
  }
</style>
