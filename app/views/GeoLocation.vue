<template>
  <Page
    xmlns="http://www.nativescript.org/tns.xsd"
    xmlns:maps="nativescript-google-maps-sdk">

    <ActionBar class="action-bar" title="Geolocation" @tap="fetchMyLocation" />

    <StackLayout>
      <MapView @mapReady="mapReady"
               :latitude="origin.latitude"
               :longitude="origin.longitude"
               :zoom="zoom"
      ></MapView>
    </StackLayout>
  </Page>
</template>

<script>
  import * as geoLocation from 'nativescript-geolocation';
  import { Position, Marker } from 'nativescript-google-maps-sdk';
  import { Accuracy } from 'tns-core-modules/ui/enums';
  import * as permissions from 'nativescript-permissions';
  import * as platform from 'platform';

  export default {
    name: 'GeoLocation',
    data() {
      return {
        origin: { latitude: 0, longitude: 0 },
        mapView: null,
        zoom: 2,
        myLocationMarker: new Marker()
      }
    },
    methods: {
      async mapReady(args) {
        this.mapView = args.object;

        const permission = await permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION, 'I need these permissions because I\'m cool')
        console.log(permission)

        if (!Object.values(permission))
          return false

        this.enableMyLocationButton(true);
        this.addMarkerToMap(this.myLocationMarker, true);
      },
      addMarkerToMap(marker, visibility, icon) {
        marker.position = Position.positionFromLatLng(this.origin.latitude, this.origin.longitude);
        marker.draggable = true;
        marker.visible = visibility;
        if (icon !== undefined)
          marker.icon = icon;
        this.mapView.addMarker(marker);
      },
      enableMyLocationButton(value) {
        if (platform.isAndroid) {
          let uiSettings = this.mapView.gMap.getUiSettings();
          uiSettings.setMyLocationButtonEnabled(value);
          /* enable my location button on android */
          this.mapView.gMap.setMyLocationEnabled(value);
        } else {
          /* enable my location button on iOS */
          this.mapView.gMap.myLocationEnabled = value;
          this.mapView.gMap.settings.myLocationButton = value;
        }
      },
      async fetchMyLocation() {
        const permission = await permissions.requestPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION, 'I need these permissions because I\'m cool')

        if (!Object.values(permission))
          return false

        const data = {
          desiredAccuracy: Accuracy.high,
          maximumAge: 5000,
          timeout: 10000
        }

        const getCurrentLocation = await geoLocation.getCurrentLocation(data)

        this.origin.latitude = getCurrentLocation.latitude
        this.origin.longitude = getCurrentLocation.longitude

        console.log(`latitude: ${this.origin.latitude}, longitude: ${this.origin.longitude}`)
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
