<template>
  <v-card @click="displayOpinions" class="film-card" color="grey darken-1">
    <v-card-title class="white--text justify-center">{{ film.title }}</v-card-title>
    <update-film v-if="this.$store.state.admin" :film="film"/>
    <v-card-subtitle class="white--text"
    >Reżyser: {{ film.directorName }}
    </v-card-subtitle
    >
    <v-card-text class="white--text">Cena: {{ film.price }}zł</v-card-text>
    <v-card-text class="white--text">{{ film.description }}</v-card-text>
    <v-card-actions class="class-actions">
      <v-btn class="film-card-button" v-on:click="addFilmToCard(film)">
        Dodaj do koszyka
      </v-btn>
      <add-opinion-dialog :film-title="film.title"/>
    </v-card-actions>
  </v-card>
</template>

<script>
import AddOpinionDialog from "./AddOpinionDialog"
import UpdateFilm from "@/components/UpdateFilmDialog";

export default {
  name: "FilmCard",
  props: ["film"],
  components: {
    UpdateFilm,
    AddOpinionDialog,
  },
  methods: {
    displayOpinions(){
      console.log(this.film)
      this.$store.commit('setSelectedFilm', this.film)
      this.$router.replace('/opinions')
    },
    addFilmToCard(film) {
      this.$store.commit("addToCard", film)
    },
  },
}
</script>

<style scoped>
.film-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 360px;
}

.class-actions {
  justify-content: space-around;
  margin-top: auto;
  margin-bottom: 10px;
  width: 100%;
}

.film-card-button {
  width: 45%;
  font-size: 12px;
}

@media (max-width: 320px) {
  .class-actions {
    flex-direction: column;
  }

  .film-card-button {
    width: 70%;
  }
}
</style>
