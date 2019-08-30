<template>
  <ModalStack class="modal-container">
    <GridLayout class="card modal" rows="auto,auto" verticalAlignment="middle">
      <Button row="0" @tap="$modal.close" class="fa close"
              text.decode="&#xf0c9;" horizontalAlignment="right" />
      <StackLayout row="1" ref="meaningContainer" class="list-item
                    list-item-meaning">
        <Image col="0" :src="'~/assets/emoji/' + value + '.png' " class=" emoji_window" />
        <Label col="1" :text="name" class="card-title"
               style="text-align: center;padding-bottom: 24;" />
        <GridLayout columns="20,*" rows="*,*">
          <Image col="0" row="0" class="arrow" verticalAlignment="top"
                 src="~/assets/arrow_up.png" style="margin-top: 5; margin-right: 10" />
          <Label col="1" row="0" verticalAlignment="top" :text="meaning_up"
                 textWrap="true" style="margin-bottom:25; font-size: 16;" />
          <Image col="0" row="1" class="arrow2" verticalAlignment="top"
                 src="~/assets/arrow_down.png" style="margin-top: 5; margin-right: 10" />
          <Label col="1" row="1" verticalAlignment="top" :text="meaning_rev" textWrap="true"
                 style="font-size: 16" />
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </ModalStack>
</template>

<script>
  export default {
    props: ['name', 'value', 'meaning_up', 'meaning_rev']
  }
</script>
