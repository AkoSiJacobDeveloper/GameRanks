<template>
  <div class="container-fluid">
    <Header />
    <div class="d-flex justify-content-center align-items-center">
      <h1><strong>To Be Developed</strong></h1>
    </div>
  </div>
</template>

<script>
import Header from '../Header/Header.vue'
export default {
  components: { Header },
}
</script>

<style lang="scss" scoped>
@import '../../assets/Styles/Styles.scss';

.container-fluid {
  div {
    height: 80vh;
    h1 {
      font-family: $headline-font;
    }
  }
}
</style>
