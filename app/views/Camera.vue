<template>
  <Page>
    <ActionBar title="Camera !"/>
    <StackLayout>
      <Button text="Take Picture" @tap="takePicture" />
      <Button text="Choose Picture" @tap="selectPicture" />
      <WrapLayout>
        <Image v-for="img in images" :src="img.src" width="75" height="75" />
      </WrapLayout>
    </StackLayout>
  </Page>
</template>

<script>
  import * as camera from 'nativescript-camera';
  import * as imagepicker from 'nativescript-imagepicker';

  import { Image } from 'tns-core-modules/ui/image';

  export default {
    data () {
      return {
        images: []
      }
    },
    methods: {
      async selectPicture () {
        let context = imagepicker.create({
          mode: 'multiple'
        })

        const authorize = await context.authorize()
        if (!Object.values(authorize)) return

        const t = await context.present()

        t.forEach(selected => {
          let img = new Image()
          img.src = selected
          this.images.push(img)
        })
      },
      takePicture() {
        const permission = camera.requestPermissions()

        if (!permission)
          return false

        camera.takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: false })
          .then(imageAsset => {
            let img = new Image()
            img.src = imageAsset
            this.images.push(img)
          })
      }
    }
  }
</script>

<style scoped>
  ActionBar {
    background-color: #53ba82;
    color: #ffffff;
  }
</style>
