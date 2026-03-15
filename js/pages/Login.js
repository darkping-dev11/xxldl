export default {
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <h1>Login</h1>
        <p>Access your account to submit records.</p>
        <form @submit.prevent="submit">
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>
        <p class="auth-footer">
          Don't have an account? <router-link to="/register">Register</router-link>
        </p>
      </div>
    </div>
  `,
  data() { return { email: '', password: '' }; },
  methods: {
    submit() {
      alert('Login successful! (backend eklenecek)');
      this.$router.push('/profile');
    }
  }
};
