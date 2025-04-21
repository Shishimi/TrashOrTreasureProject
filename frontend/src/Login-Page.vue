<script>
import { RouterLink, RouterView } from 'vue-router'
import { supabase } from './supabase.js'
import bcrypt from 'bcryptjs'
export default{
  data() {
    return {
      username: '',
      password: '',
      success: '',
      error: ''
    }
  },
  methods: {
    async submitForm(){
      this.error = ''
      this.success = ''

      if (!this.username || !this.password) {
        this.error = "Username and password are required."
        return
      }

      try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(this.password, salt)

        const {data, error } = await supabase
        .from('Users')
            .insert([
                {Username: this.username, Password: hashedPassword}
            ])

        if (error) {
          this.error = error.message
        } else {
          this.success = "User saved!"
          this.username = ''
          this.password = ''
          console.log('Saved:', data)
        }
    } catch (errr) {
        console.error("Encryption error:", err)
        this.error = "Something went wrong."
      }
    }
  }
}
</script>

<template>
  <div class="login-page">
    <img class="homeBG" src="./assets/home-bg.png" />
    <img class="loginWord" src="./assets/login word.png" />
    <router-link :to="{ path: '/' }">
      <img class="home-btn" src="./assets/logo.png" />
    </router-link>
    <router-link :to="{ path: '/register'}">
        <img class="register" src="./assets/register-btn.png"/>
    </router-link>
    <div class="loginForm">
      <div class="input-wrapper">
        <img class="usernameEntry" src="./assets/login username.png" />
        <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="overlay-input"
        />
      </div>

      <div class="input-wrapper">
        <img class="passwordEntry" src="./assets/login password.png" />
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="overlay-input"
        />
      </div>

      <div class = "loginGoButton-wrapper" @click="submitForm">
        <img class="loginGoButton" src="./assets/login go button.png" />
      </div>

        <p v-if="error" class="error">{{ error }}</p>
        <p v-if="success" class="success">{{ success }}</p>
    </div>
  </div>
</template>


<style scoped>
:global(body) {
  background-color: rgb(7, 10, 6);
}

.input-wrapper{
  position: relative;
  width: fit-content;
  margin-bottom: 15px;
}

.register {
display: block;
  width: 20vw;
  height: 20vh;
  position: fixed;
  left: 40vw;
  top: 63vh;
  z-index: 2;
}

.register:hover {
  transform: scale(1.2);
}

.overlay-input{
    position: absolute;
  top: 50%;
  left: 33px;
  right: 20px;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.7rem;
  width: auto;
  color: #2c3e50;
  font-family: inherit;
  z-index: 3;
  padding-right: 5px;
  max-width: calc(100% - 95px);
}

::placeholder{
  color: #888;
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
    position: absolute;
  display: block;
  z-index: 2;
  width: 13vw;
  top: 38vh;
  left: 46.5vh;
}

.loginForm {
    display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  top: 42vh;
}

.usernameEntry,
.passwordEntry,
.loginGoButton {
  width: 17vw;
  cursor: pointer;
}


.loginGoButton:hover{
  transform: scale(1.1);
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

  .loginForm {
    top: 29vh;
    left: 1.1vh;
  }

  .loginWord {
    top: 15vh;
    width: 20vw;
    left: 40vw;
  }

  .usernameEntry,
  .passwordEntry,
  .loginGoButton {
    width: 23vw;
  }

  .overlay-input {
    font-size: 1.5rem;
    left: 10vh;
  }

  .register {
    width: 30vh;
    height: 30vh;
    left: 20vw;
    top: 70vh;
  }

}
</style>
