export default {
  template: `
    <div class="auth-page">
      <div class="auth-container">
        <h1>Register</h1>
        <p>Create your account to submit records.</p>
        <form @submit.prevent="submit">
          <input type="text" v-model="username" placeholder="Username" required />
          <input type="email" v-model="email" placeholder="Email" required />
          <input type="password" v-model="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p class="auth-footer">
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </div>
  `,
  data() { return { username: '', email: '', password: '' }; },
  methods: {
    submit() {
      alert('Register submitted! (backend eklenecek)');
      this.$router.push('/login');
    }
  }
};
