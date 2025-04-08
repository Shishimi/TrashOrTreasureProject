<!-- <template>
  <div class="register">
    <h2>Create an Account</h2>
    <form @submit.prevent="register">
      <div>
        <label>Username:</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input v-model="password2" type="password" required />
      </div>
      <button type="submit">Register</button>
    </form>

    <p v-if="error" style="color:red">{{ error }}</p>
    <p v-if="success" style="color:green">{{ success }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      password2: '',
      error: '',
      success: '',
    }
  },
  methods: {
    async register() {
      this.error = ''
      this.success = ''
      try {
        const response = await axios.post('http://localhost:8000/api/register/', {
          username: this.username,
          password: this.password,
          password2: this.password2,
        })
        this.success = response.data.message
        this.username = this.password = this.password2 = ''
      } catch (err) {
        if (err.response?.data) {
          const errors = err.response.data
          this.error = Object.values(errors).join(' ')
        } else {
          this.error = 'Something went wrong.'
        }
      }
    }
  }
}
</script>
-->

<template>
  <div class="login-page">
    <img class="homeBG" src="./assets/home-bg.png" />
    <img class="logo" src="./assets/logo.png" />
    <img class="loginWord" src="./assets/login word.png" />

    <div class="loginForm">
      <img class="usernameEntry" src="./assets/login username.png" />
      <img class="passwordEntry" src="./assets/login password.png" />
      <img class="loginGoButton" src="./assets/login go button.png" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.login-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.homeBG {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}

.logo {
  width: 200px;
  position: absolute;
  left: 1rem;
  top: 1rem;
  z-index: 1;
}

.loginWord {
  position: relative;
  display: block;
  margin: 8rem auto 2rem auto;
  z-index: 2;
  width: 300px;
}

.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
}

.usernameEntry,
.passwordEntry,
.loginGoButton {
  width: 300px;
  margin-bottom: 1rem;
}
</style>
