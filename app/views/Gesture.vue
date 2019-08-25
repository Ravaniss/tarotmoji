<template>
  <Page class="page">
    <ActionBar title="Gestures 👌" class="action-bar">
      <Label text="MENU" @tap="openDrawer()" col="0"/>
    </ActionBar>

    <GridLayout ~mainContent rows="auto, auto, *, auto">
      <Label :text="getDisplayData"></Label>
      <Label row="0" class="target" text="Target Area" @tap="onTap" @doubleTap="onDoubleTap" @longPress="onLongPress" @swipe="onSwipe"
             @pan="onPan" @pinch="onPinch" @rotation="onRotation">
      </Label>

      <Label row="1" class="instructions" textWrap="true"
             text="Try to perform the following gestures in the target area—tap, double tap, long press, swipe, pinch, and rotation."></Label>

      <ListView row="2" class="list-group" for="entry in log">
        <v-template>
          <Label class="m-20" :text="entry.text"></Label>
        </v-template>
      </ListView>

      <Button row="3" text="RadCartesian" @tap="goToNavBar"/>
    </GridLayout>
  </Page>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import NavBar from '../components/Navbar'
  const SwipeDirection = require("tns-core-modules/ui/gestures").SwipeDirection;

  export default {
    data: () => {
      return {
        log: [],
        getDisplayData: false
      };
    },
    components: {
      NavBar
    },
    computed: {
      ...mapGetters([
        'getDisplayData'
      ])
    },
    methods: {
      ...mapActions([
        'toggleNavBar'
      ]),
      onTap() {
        console.log(this.getDisplayData)
        this.toggleNavBar(true)
        console.log(this.getDisplayData)
        this.log.unshift({ text: "You performed a tap" });
      },
      onDoubleTap() {
        this.log.unshift({ text: "You performed a double tap" });
      },
      onLongPress() {
        this.log.unshift({ text: "You performed a long press" });
      },
      onSwipe(args) {
        let direction =
              args.direction == SwipeDirection.down
            ? "down"
            : args.direction == SwipeDirection.up
            ? "up"
            : args.direction == SwipeDirection.left
            ? "left"
            : "right";
        this.log.unshift({
          text: "You performed a " + direction + " swipe"
        });
      },
      onPan() {
        this.log.unshift({ text: "You performed a pan" });
      },
      onPinch() {
        this.log.unshift({ text: "You performend a pinch" });
      },
      onRotation() {
        this.log.unshift({ text: "You performed a rotation" });
      },
      goToNavBar() {
        this.$navigateTo(NavBar)
      }
    }
  };
</script>

<style>
  .target {
    background-color: #9D95B4;
    color: white;
    vertical-align: middle;
    text-align: center;
    height: 150;
    width: 100%;
  }
  .instructions {
    padding: 20;
    height:100;
  }
  .list-group {
   text-align: center;
  }
</style>
