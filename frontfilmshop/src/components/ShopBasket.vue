<template>
  <div>
  <v-dialog v-model="dialog" width="50%">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          icon
          style="margin: 5px 15px 15px auto; float: right"
          v-on="on"
          v-bind="attrs"
      >
        <v-badge
            color="blue-grey darken-2"
            :content="getNumberOfCardElements()"
            :value="getNumberOfCardElements() > 0"
        >
          <v-icon color="light-green accent-3">
            mdi-cart
          </v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="blue-grey darken-2" dark>
        <span>Cena ogólna: {{ getTotalPrice() }}zł</span>
        <v-spacer></v-spacer>
        <v-btn
            width="10%"
            style="position: center"
            color="green darken-1"
            @click="buyAndSendEmail"
        >Kup
        </v-btn
        >
      </v-toolbar>
      <div v-if="getNumberOfCardElements() === 0">
        <v-card-text>
          <h1 style="text-align: center">Twój Koszyk jest pusty</h1>
          <br/>
        </v-card-text>
      </div>
      <div v-if="getNumberOfCardElements() > 0">
        <v-card-text v-for="film in cart" :key="film.id">
          <film :film="film"></film>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
  <v-dialog>
    <v-alert v-if="transactionComplete" type="success">
      Dziękujemy za dokonanie Zakupu
    </v-alert>
  </v-dialog>
  </div>
</template>

<script>
import Film from "./Film"
import {sendEmail} from "@/api/api"

export default {
  name: "ShopBasket",
  components: {Film},
  computed: {
    cart() {
      return this.$store.getters.getCardElements
    },
  },
  data: () => ({
    transactionComplete: false,
    dialog: false,
  }),
  methods: {
    getNumberOfCardElements() {
      return this.$store.state.cart.length
    },
    getTotalPrice() {
      let sum = 0
      for (let film of this.cart) {
        sum += parseFloat(film.price)
      }
      return Math.round(sum)
    },
    buyAndSendEmail() {
      if (this.cart !== []) {
        sendEmail(this.$store.getters.getLoggedEmail, this.cart, this.getTotalPrice())
            .then (() => this.transactionComplete = true)
            .then(() => (this.dialog = false))
            .then(() => this.$store.state.cart = [])

      }
    },
  },
}
</script>

<style scoped></style>
