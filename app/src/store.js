import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const yandexApiKey = '1ddc3542-feaf-442b-92a5-7ed263b02e42'
const lat = 55.37564
const lon = 37.74823

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    weather: []
  },

  getters: {
    weather: state => state.weather
  },

  mutations: {
    SET_WEATHER (state, weather) {
      state.weather = weather
    }
  },

  actions: {
    initWeather: ({ commit }) => {
      axios({
        method: 'get',
        url: 'https://api.weather.yandex.ru/v1/informers?lat=' + lat + '&lon=' + lon,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'X-Yandex-API-Key': yandexApiKey
        }
      })
        .then((response) => {
          console.log(response.data)
          commit('SET_WEATHER', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
})
