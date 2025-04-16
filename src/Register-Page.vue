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

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="login-page">
    <img class="homeBG" src="./assets/home-bg.png" />
    <img class="loginWord" src="./assets/login word.png" />
    <router-link :to="{ path: '/' }">
      <img class="home-btn" src="./assets/logo.png" />
    </router-link>
    <div class="loginForm">
      <img class="usernameEntry" src="./assets/login username.png" />
      <img class="passwordEntry" src="./assets/login password.png" />
      <img class="loginGoButton" src="./assets/login go button.png" />
    </div>
  </div>
</template>


<style scoped>
:global(body) {
  background-color: rgb(7, 10, 6);
}

.homeBG {
  position: absolute;
  max-width: 100vw;
  overflow-x: hidden;
  z-index: 0;
  left: 0;
  top: 22vh;
}

.home-btn {
  display: block;
  width: 18vw;
  height: 9vh;
  position: fixed;
  left: 2vw;
  top: 23vh;
  z-index: 1;
}

.home-btn:hover {
  transform: scale(1.2);
}

.loginWord {
  position: relative;
  display: block;
  margin: 8rem auto 2rem auto;
  z-index: 2;
  width: 130px;
  top: 17vh;
}

.loginForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  position: relative;
  top: 13vh;
}

.usernameEntry,
.passwordEntry,
.loginGoButton {
  width: 160px;
}

@media (min-width: 1024px) {
  .homeBG {
    height: 100vh;
    width: 100vw;
    top: 0;
  }

  .home-btn {
    height: 18vh;
    top: 3vh;
  }

  .home-btn:hover {
    transform: scale(1.2);
  }

  .usernameEntry,
  .passwordEntry,
  .loginGoButton {
    width: 300px;
  }

  .loginForm {
    top: 9vh;
  }

  .loginWord {
    top: 10vh;
    width: 260px;
  }

}
</style>
