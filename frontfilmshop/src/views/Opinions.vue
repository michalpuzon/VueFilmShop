<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
          cols="12"
          sm="8"
          md="6"
          lg="4"
          v-for="opinion in opinions.filter(o => o.filmTitle === $store.getters.getSelectedFilm.title)"
          :key="opinion.id"
      >
        <opinion-card  :opinion="opinion"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OpinionCard from "../components/OpinionCard"


export default {
  name: "Opinions",
  components: {

    OpinionCard,
  },
  computed: {
    opinions() {
      return this.$store.getters.getOpinions
    },
  },
}
</script>

<style scoped></style>
