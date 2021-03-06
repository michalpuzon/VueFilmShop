import Vue from 'vue'
import Vuex from 'vuex'
import {getAllFilms, getAllOpinions} from "@/api/api";
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        selectedFilm: {},
        films: [],
        opinions: [],
        cart: [],
        authToken: '',
        loggedEmail: '',
        admin: false
    },
    mutations: {
        setSelectedFilm(state, film){
            state.selectedFilm = film
        },
        setFilms(state, films) {
            state.films = films
        },
        setOpinions(state, opinions) {
            state.opinions = opinions
        },
        addToCard(state, film) {
            for (const f of state.cart) {
                if (f.title === film.title &&
                    f.price === film.price &&
                    f.description === film.description &&
                    f.directorName === film.directorName) {
                    return null;
                }
            }
            state.cart.push(film)
        },
        removeFromCard(state,film){
            state.cart = state.cart.filter(f => f._id !== film._id)
        },
        setToken(state, token){
            state.authToken = token
        },
        setLoggedEmail(state,email){
            state.loggedEmail = email
        },
        adminLogged(state, email){
            state.admin = email === 'admin@wp.pl';
        }
    },
    actions: {
        fetchFilms(context) {
            return getAllFilms()
                .then(response => {
                    context.commit("setFilms", response.data)
                })
        },
        fetchOpinions(context) {
            return getAllOpinions()
                .then(response => {
                    context.commit("setOpinions", response.data)
                })
        },
    },
    getters: {
        getFilms(state) {
            return state.films
        },
        getOpinions(state) {
            return state.opinions
        },
        getCardElements(state) {
            return state.cart
        },
        getToken(state){
            if (!state.authToken)
            return state.authToken
            else return false
        },
        getLoggedEmail(state){
            return state.loggedEmail
        },
        isAdminLogged(state){
            return state.admin
        },
        getSelectedFilm(state){
            return state.selectedFilm
        }
    }
})
