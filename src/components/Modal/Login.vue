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
      <form @submit.prevent="handleLogin">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          v-model="form.username"
          placeholder="Username"
          class="form-control my-1 p-3 text-white"
        />

        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          placeholder="Password"
          class="form-control my-1 p-3 text-white"
        />

        <LoginAdminBtn />
      </form>
      <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import LoginAdminBtn from "../Buttons/LoginAdminBtn.vue";

export default {
  components: { LoginAdminBtn },
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    handleLogin() {
      const adminUsername = localStorage.getItem("adminUsername");
      const adminPassword = localStorage.getItem("adminPassword");
      
      if (
        this.form.username === adminUsername &&
        this.form.password === adminPassword
      ) {
        localStorage.setItem("isAdminLoggedIn", "true");
        
        alert("Login successful!");
        this.$emit("close-modal");
        this.$router.push({ name: 'admin-home'});
      } else {
        this.errorMessage = "Invalid username or password";
      }
    },

    handleLogout() {
      localStorage.removeItem("isAdminLoggedIn");
      alert("You have logged out.");
    }
  },
  mounted() {
    const defaultUsername = "admin";
    const defaultPassword = "admin123";

    if (!localStorage.getItem("adminUsername")) {
      localStorage.setItem("adminUsername", defaultUsername);
      localStorage.setItem("adminPassword", defaultPassword);
      console.log("Default admin credentials saved to local storage.");
    } else {
      console.log("Admin credentials already exist in local storage.");
    }
  },
};
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
