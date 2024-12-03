<template>
  <section class="container d-flex justify-content-center align-items-center flex-column">
    <p class="headlines m-0">{{ headlines }}</p>
    <p class="subtext">{{ subtext }}</p>
    <div class="d-flex gap-2">
      <LoginAdmin @open-modal="showModal" />
      <LoginGuest @click="continueAsGuest" />
    </div>
    <Login :is-visible="isModalVisible" @close-modal="hideModal" />
  </section>
</template>

<script>
import LoginAdmin from '../Buttons/LoginAdmin.vue'
import LoginGuest from '../Buttons/LoginGuest.vue'
import Login from '../Modal/Login.vue'

export default {
  components: { Login, LoginAdmin, LoginGuest },
  data() {
    return {
      isModalVisible: false,
      headlines: 'Climb the Ranks, Show Your Skills',
      subtext:
        'Welcome to the ultimate gaming leaderboard! Compete against the best and see where you stand in real-time. Who will take the top spot?',
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true
      console.log('Modal is being shown')
    },
    hideModal() {
      this.isModalVisible = false
    },
    continueAsGuest() {
      this.$router.push({ name: "guest-home"})
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/Styles/Styles.scss';

.container {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .headlines {
    font-family: $headline-font;
    font-weight: bold;
    font-size: 4em;
    background: linear-gradient(to right, #1e90ff, #32cd32);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }

  .subtext {
    font-family: $texts-font;
  }
}
</style>
