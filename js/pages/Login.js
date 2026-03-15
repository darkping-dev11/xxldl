export default {
  template: `
    <div class="auth-page login-page">
      <div class="auth-container">
        <h1>Login</h1>
        <p>Access your account to submit records.</p>
        <form @submit.prevent="submit">
          <input type="email" placeholder="Email" v-model="email" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <button type="submit">Login</button>
        </form>
        <p class="auth-footer">
          Don't have an account? <router-link to="/register">Register</router-link>
        </p>
      </div>
    </div>
  `,
  data() {
    return { email: '', password: '' }
  },
  methods: {
    submit() {
      alert('Login successful! (Backend eklenecek)');
      this.$router.push('/profile');
    }
  }
};
