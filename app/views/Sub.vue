<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, *, auto" columns="*" backgroundColor="#8a2be2">
      <StackLayout row="0" backgroundColor="#8b0000" orientation="vertical">
        <Label text="Hello world ! :D" backgroundColor="aqua" />
        <Label text="Hello world ! :D" backgroundColor="red" />
        <Label text="Hello world ! :D" backgroundColor="yellow" />
      </StackLayout>
      <StackLayout row="1" width="100" backgroundColor="#000" orientation="horizontal">
        <Label text="Hello world ! :D" backgroundColor="aqua" />
        <Label text="Hello world ! :D" backgroundColor="red" />
        <Label text="Hello world ! :D" backgroundColor="yellow" />
      </StackLayout>
      <StackLayout row="2" width="100" backgroundColor="red" orientation="horizontal">
        <Label text="Hello world ! :D" backgroundColor="aqua" />
        <Label text="Hello world ! :D" backgroundColor="red" />
        <Label text="Hello world ! :D" backgroundColor="yellow" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<style>
  Label {
    height: 50;
    text-align: center;
    font-size: 16;
    padding: 12;
  }
</style>
