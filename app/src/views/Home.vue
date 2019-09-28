<template lang="pug">
  div
    h1 Hello!
    transition-group(
      name="fade"
      tag="div"
    )
      div.slider(
        v-for="(item, index) in [currentIndex]"
        :key="item"
      )
        img(
          :src="currentImg"
        )
    v-btn.next(
      :absolute="true"
      color="red"
      @click="nextSlide"
    ) Next
    v-btn.prew(
      :absolute="true"
      color="red"
      @click="prewSlide"
    ) Prew
</template>

<script>

export default {
  name: 'Home',
  data: () => {
    return {
      img: [
        'static/img/1.jpg',
        'static/img/2.jpg',
        'static/img/3.jpg',
        'static/img/4.jpg'
      ],
      timer: null,
      currentIndex: 0
    }
  },
  mounted () {
    this.$store.dispatch('initWeather')
    this.startSlider()
  },
  computed: {
    currentImg () {
      return this.img[Math.abs(this.currentIndex) % this.img.length]
    }
  },
  methods: {
    startSlider () {
      this.timer = setInterval(this.next, 1000)
    },
    nextSlide () {
      this.currentIndex += 1
    },
    prewSlide () {
      this.currentIndex -= 1
    }
  }
}
</script>

<style lang="stylus" scoped>
.slier
  height 80vh
  overflow hidden
.fade-enter-active, .fade-leave-active
  transition all .9s ease
  overflow hidden
  visibility visible
  position absolute
  width 100%
  opacity 1

.fade-enter, .fade-leave-to
  visibility hidden
  width 100%
  opacity 0

img
  height 80vh
  width 100%

.next, .prew
  cursor pointer
  position absolute
  top 50%
  width auto
  padding 16px
  color #fff
  font-weight bold
.next
  right 0
.prev
  left 0
</style>
