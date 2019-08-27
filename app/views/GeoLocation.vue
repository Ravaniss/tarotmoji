<template>
  <Page class="page">
    <ActionBar class="action-bar">
      <Label class="action-bar-title" text="Geolocation Demo"></Label>
    </ActionBar>

    <StackLayout>
      <Label v-if="needLocation" text="Looking up your location..." />
      <Label v-if="locationFailure" text="Sorry, I failed! :(" />
      <Label v-if="location" :text="locationDescription" textWrap="true" />
      <Button text="Get location" @tap="getLoc"></Button>
    </StackLayout>
  </Page>
</template>

<script>
  import * as Geolocation from 'nativescript-geolocation';

  export default {
    data () {
      return {
        needLocation: true,
        locationFailure: false,
        location: null
      }
    },
    computed: {
      locationDescription () {
        console.log('----------------------', this.location)
        return `You are at ${this.location.latitude}, ${this.location.longitude}. Your altitude is ${this.location.altitude}.`;
      }
    },
    methods: {
      getLoc () {
        Geolocation.enableLocationRequest(true)
          .then(() => {
            console.log('lol')
            Geolocation.isEnabled().then(isLocationEnabled => {
              console.log('result isss ' + isLocationEnabled);
              if (!isLocationEnabled) {
                this.needLocation = false;
                this.locationFailure = true;
                return;
              }

              Geolocation.getCurrentLocation({})
                .then(result => {
                  console.log('loc result ', result);
                  this.needLocation = false;
                  this.location = result;
                })
                .catch(e => {
                  console.log('loc error', e);
                });
            });
          });
      }
    }
  }
</script>
