<template>
  <GridLayout rows="auto,*" verticalAlignment="top">
    <Label row="0" text="Card Meanings" class="title med" />
    <StackLayout row="1" class="meaning-card" orientation="vertical">
      <ListView class="list-group" for="item in allCards" backgroundColor="transparent" separatorColor="transparent">
        <v-template>
          <GridLayout @tap="showDetailPageModally(item)" columns="50,*" rows="*" class="list-item list-item-name">
          <Image col="0" :src="'~/assets/emoji/' +item.value+ '.png' " class=" emoji" />
            <Label col="1" :text="item.name" class="lab" verticalAlignment="center" />
          </GridLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </GridLayout>
</template>

<script>
  import { Cards } from '../data/cards'

  import Detail from '../components/Detail'

  export default {
    data() {
      return {
        cards: Cards,
        name: "",
        meaning_up: "",
        meaning_rev: "",
        emoji: "",
        value: "",
        allCards: []
      }
    },
    methods: {
      getAllCards() {
        this.cards.forEach((card, index) => {
          if (card.type == "major") {
            this.allCards.push({
              name: card.name,
              emoji: card.emoji,
              value: card.value,
              meaning_up: card.meaning_up,
              meaning_rev: card.meaning_rev
            })
          }
        })
      },
      showDetailPageModally(item) {
        this.$showModal(Detail, {
          props: {
            name: item.name,
            value: item.value,
            meaning_up: item.meaning_up,
            meaning_rev: item.meaning_rev
          }
        })
      }
    },
    created() {
      this.getAllCards()
    }
  }
</script>

<style scoped>
  .meaning-card {
    margin: 10;
    padding: 5;
  }

  .arrow {
    margin-right: 5;
  }

  .arrow2 {
    margin-right: 5;
  }
</style>
