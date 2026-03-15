export default {
  template: `
    <div class="auth-page register-page">
      <div class="auth-container">
        <h1>Register</h1>
        <p>Create your account to submit records.</p>
        <form @submit.prevent="submit">
          <input type="text" placeholder="Username" v-model="username" required />
          <input type="email" placeholder="Email" v-model="email" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <button type="submit">Register</button>
        </form>
        <p class="auth-footer">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  `,
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    submit() {
      alert('Register submitted! (Backend eklenecek)');
      this.$router.push('/login');
    }
  }
};
