<template>
  <div class="container-fluid">
    <header class="container-fluid p-3">
      <p class="web-title">{{ webTitle }}</p>
    </header>
    <main class="container-fluid">
      <Hero />
    </main>
  </div>
</template>

<script>
import Hero from '../Section/Hero.vue'

export default {
  components: { Hero },
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
