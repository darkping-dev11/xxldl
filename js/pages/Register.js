export default {
  template: `
    <div class="auth-page">
      <h2>Register</h2>
      <form @submit.prevent="submit">
        <input type="text" placeholder="Username" v-model="username" required />
        <input type="email" placeholder="Email" v-model="email" required />
        <input type="password" placeholder="Password" v-model="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  `,
  data() {
    return {
      username: '',
      email: '',
      password: '',
    }
  },
  methods: {
    submit() {
      console.log('Register', this.username, this.email);
      alert('Register submitted! (Backend ekle)');
      this.$router.push('/login'); // register sonrası login sayfasına yönlendir
    }
  }
};
