<template>
  <v-dialog width="50%" v-model="dialog" transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="film-card-button mx-2"
        dark
        color="indigo"
        v-on="on"
        v-bind="attrs"
      >
        Dodaj Komentarz
      </v-btn>
    </template>
    <v-card color="grey darken-3">
      <v-card-title class="justify-center white--text">
        Tworzenie Opinii
      </v-card-title>
      <v-card-subtitle
        class="text-center white--text"
        style="position: center"
        >{{ newOpinion.filmTitle }}</v-card-subtitle
      >
      <v-rating
          v-model="newOpinion.rate"
          hover
      ></v-rating>
      <v-text-field
        dark
        label="Dodaj opinię"
        v-model="newOpinion.description"
        style="margin: 10px"
      ></v-text-field>
      <v-card-actions class="justify-center">
        <v-btn dark color="indigo" @click="addOpinion">Dodaj Komentarz</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { createOpinion } from "@/api/api"

export default {
  name: "AddOpinionDialog",
  props: ["filmTitle"],

  data() {
    return {
      dialog: false,
      rates: [1, 2, 3, 4, 5],
      newOpinion: {
        filmTitle: this.filmTitle,
        rate: "",
        description: "",
      },
    }
  },
  methods: {
    addOpinion() {
      createOpinion(this.newOpinion).then((response) => {
        this.$store
          .dispatch("fetchOpinions", response.data)
          .catch((error) => alert(error.response.data))
      })
      this.dialog = false
      this.newOpinion.rate = ""
      this.newOpinion.description = ""
    },
  },
}
</script>

<style scoped>
.film-card-button {
  width: 45%;
  font-size: 12px;
}

@media (max-width: 320px) {
  .film-card-button {
    width: 70%;
    margin-top: 10px;
  }
}
</style>
