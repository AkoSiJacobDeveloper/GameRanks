<template>
  <div class="container-fluid">
    <Header />
    <main class="container-fluid">
      <Hero />
    </main>
  </div>
</template>

<script>
import Hero from '../Section/Hero.vue'
import Header from '../Header/Header.vue'

export default {
  components: { Hero, Header },
  data() {
    return {
      webTitle: 'GameRanks',
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/Styles/Styles.scss';

.web-title {
  font-family: $title-font;
  color: $font-color;
  font-size: 1.5em;
}
</style>
