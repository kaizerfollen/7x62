<template lang="pug">
  v-app#inspire
    v-navigation-drawer(
      v-model='drawer' app='' clipped=''
    )
      v-list(
        dense=''
      )
        router-link(
          to="/"
          tag="span"
        )
          v-list-item(
            @click=''
          )
            v-list-item-action
              v-icon mdi-earth
            v-list-item-content
              v-list-item-title Home
        router-link(
          to="/aboutMe"
          tag='span'
        )
          v-list-item(
            @click=''
          )
            v-list-item-action
              v-icon mdi-account
            v-list-item-content
              v-list-item-title About me
    v-app-bar(
      app=''
      clipped-left=''
    )
      v-app-bar-nav-icon(
        @click.stop='drawer = !drawer'
      )
      v-toolbar-title Application

    v-content
      router-view

    v-footer(
      app=''
    )
      router-link(
        tag="p"
        to="https://www.instagram.com/7x62/"
      )
      span &copy; 2019
</template>

<script>

export default {
  props: {
    source: String
  },

  data: () => ({
    drawer: null
  }),

  created () {
    this.$vuetify.theme.dark = true
  }
}

</script>
