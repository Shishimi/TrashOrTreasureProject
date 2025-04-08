<template>
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

    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-if="success" style="color: green">{{ success }}</p>
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
    },
  },
}
</script>
