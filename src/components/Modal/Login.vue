<template>
  <div v-if="isVisible" class="modal-backdrop">
    <div class="container p-4 rounded-1">
      <div class="d-flex justify-content-between">
        <h3 class="m-0">Login</h3>
        <i
          class="bi bi-x d-flex justify-content-center align-items-center"
          @click="$emit('close-modal')"
        ></i>
      </div>
      <hr />
      <form @submit.prevent>
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          class="form-control my-1 p-3"
        />

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          class="form-control my-1 p-3"
        />

        <LoginAdminBtn />
      </form>
    </div>
  </div>
</template>

<script>
import LoginAdminBtn from '../Buttons/LoginAdminBtn.vue'

export default {
  components: { LoginAdminBtn },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/Styles/Styles.scss';

.container {
  width: 35%;

  h3 {
    font-family: $headline-font;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form {
    label {
      font-family: $headline-font;
    }

    input {
      background: none;
    }
  }
}
</style>
