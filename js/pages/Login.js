export default {
  template: `
    <div class="auth-page">
      <h2>Login</h2>
      <form @submit.prevent="submit">
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  `,
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    submit() {
      console.log('Login', this.email);
      alert('Login successful! (Backend ekle)');
      this.$router.push('/profile'); // login sonrası profile sayfasına yönlendir
    }
  }
};
