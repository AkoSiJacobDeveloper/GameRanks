<template>
  <header class="container-fluid p-3">
    <p class="web-title m-0">{{ webTitle }}</p>
  </header>
</template>

<script>
export default {
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
