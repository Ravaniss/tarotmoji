<template>
  <Page>
    <ActionBar :title="title">
      <NavigationButton text="Back" android.systemIcon="ic_menu_back" @tap="onNavigationButtonTap"></NavigationButton>
    </ActionBar>
    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent class="sideStackLayout">
        <StackLayout class="sideTitleStackLayout">
          <Label text="Navigation Menu"></Label>
        </StackLayout>
        <StackLayout class="sideStackLayout">
          <Label text="Primary" class="sideLabel sideLightGrayLabel"></Label>
          <Label text="Social" class="sideLabel"></Label>
          <Label text="Promotions" class="sideLabel"></Label>
          <Label text="Labels" class="sideLabel sideLightGrayLabel"></Label>
          <Label text="Important" class="sideLabel"></Label>
          <Label text="Starred" class="sideLabel"></Label>
          <Label text="Sent Mail" class="sideLabel"></Label>
          <Label text="Drafts" class="sideLabel"></Label>
        </StackLayout>
        <Label text="Close Drawer" color="lightgray" padding="10" style="horizontal-align: center" @tap="onCloseDrawerTap"></Label>
      </StackLayout>
      <StackLayout ~mainContent>
        <Label textWrap="true" class="drawerContentText"></Label>
        <StackLayout orientation="Horizontal">
          <Button text="OPEN DRAWER" @tap="onOpenDrawerTap()" class="drawerContentButton"></Button>
          <Button text="TOGGLE DRAWER" @tap="onToggleDrawerTap()" class="drawerContentButton"></Button>
        </StackLayout>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
  import { ObservableArray } from 'tns-core-modules/data/observable-array'

  export default {
    name: 'NavBar',
    data () {
      return {
      }
    },
    methods: {
      onNavigationButtonTap() {
        frameModule.topmost().goBack();
      },
      onOpenDrawerTap() {
        this.$refs.drawer.showDrawer();
      },
      onCloseDrawerTap() {
        this.$refs.drawer.closeDrawer();
      },
      onToggleDrawerTap() {
        this.$refs.drawer.toggleDrawerState();
      },
    }
  }
</script>
