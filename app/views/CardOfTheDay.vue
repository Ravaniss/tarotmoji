<template>
  <GridLayout rows="auto,auto" verticalAlignment="top">
    <Label row="0" text="Card of the Day" class="title med" />
    <GridLayout row="1" rows="2*,*,3*,3*" class="card">
      <Label row="0" textWrap="true" class="card-title" text="My Card" />
      <StackLayout
        v-if="reversed"
        row="1"
        style="margin:5"
        verticalAlignment="top"
        horizontalAlignment="center"
        orientation="horizontal">
        <Label class="fa status" text.decode="&#xf021;" />
        <Label class="status" text=" REVERSED" />
      </StackLayout>
      <Image row="2" v-if="major" :class="icon" :src="emoji" />
      <StackLayout row="2" v-if="!major" horizontalAlignment="center" orientation="horizontal">
        <Image style="margin:5" v-if="!major" :class="icon" :src="emoji1" />
        <Image style="margin:5" v-if="!major" :class="icon" :src="emoji2" />
      </StackLayout>
      <Label row="3" class="meaning" textWrap="true" :text="meaning" />
    </GridLayout>

  </GridLayout>

</template>

<script>
  import { Cards } from '../data/cards'

  export default {
    name: 'CardOfTheDay',
    data () {
      return {
        name: '',
        meaning: '',
        emoji: '',
        emoji1: '',
        emoji2: '',
        icon: 'emoji',
        cards: Cards,
        major: true,
        reversed: false
      }
    },
    computed: {
      shuffle () {
        return Math.floor(Math.random() * 2);
      },
      randomNumber () {
        return Math.round(Math.random() * 72);
      }
    },
    methods: {
      getMyCard () {
        const card = this.cards[this.randomNumber];
        this.name = card.name;
        if (card.type !== 'major') {
          this.major = false;
          this.emoji1 = '~/assets/emoji/' + card.value + '.png';
          this.emoji2 = '~/assets/emoji/' + card.suit + '.png';
        } else {
          this.major = true;
          this.emoji = '~/assets/emoji/' + card.value + '.png';
        }
        if (this.shuffle === 0) {
          this.meaning = card.meaning_up;
          this.icon = 'emoji';
        } else {
          this.meaning = card.meaning_rev;
          this.reversed = true;
          this.icon = 'emoji reversed';
        }
      }
    },
    created() {
      this.getMyCard();
    }
  }
</script>

<style>
  .meaning {
    font-size: 16;
    color: #131636;
    text-align: center;
    margin: 0 20;
  }
  .status {
    color: #323340;
    opacity: .5;
    font-size: 14;
  }
</style>
