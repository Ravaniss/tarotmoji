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
      mapReady(args) {
        this.mapView = args.object;

        permissions.requestPermission(android.Manifest.permission.ACCESS_FINE_LOCATION, 'I need these permissions because I\'m cool')
          .then(() => {
            console.log('Woo Hoo, I have the power!');
            this.enableMyLocationButton(true);
            this.addMarkerToMap(this.myLocationMarker, true);
          })
          .catch(() => {
            console.log('Uh oh, no permissions - plan B time!');
          });
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
      fetchMyLocation() {
        permissions.requestPermission(android.Manifest.permission.ACCESS_COARSE_LOCATION, 'I need these permissions because I\'m cool')
        .then(() => {
          geoLocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000
          }).then(res => {
            this.origin.latitude = res.latitude;
            this.origin.longitude = res.longitude;
            console.log(res)
          }).catch(e => {
            console.log(geoLocation.getCurrentLocation())
            console.log("oh frak, error", e);
          });
        })
        .catch(() => {
          console.log("Uh oh, no permissions - plan B time!");
        });
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
