import routes from './routes.js';

export const store = Vue.reactive({
  dark: JSON.parse(localStorage.getItem('dark')) || false,
  toggleDark() {
    this.dark = !this.dark;
    localStorage.setItem('dark', JSON.stringify(this.dark));
  },

  // Auth state
  user: null, // login olursa user bilgisi buraya gelir
  showAuthModal: false,
  authMode: 'register', // 'register' veya 'login'
});

const app = Vue.createApp({
  data: () => ({ store }),

  methods: {
    openRegister() {
      this.store.showAuthModal = true;
      this.store.authMode = 'register';
    },
    openLogin() {
      this.store.showAuthModal = true;
      this.store.authMode = 'login';
    },
    closeAuth() {
      this.store.showAuthModal = false;
    },
    submitRegister(formData) {
      // Backend entegresi eklenebilir
      console.log('Register submitted:', formData);
      alert('Register completed! (Backend ekle)');
      this.store.showAuthModal = false;
      this.store.authMode = 'login'; // sonraki adım login
    },
    submitLogin(formData) {
      console.log('Login submitted:', formData);
      alert('Login completed! (Backend ekle)');
      this.store.user = { username: formData.username || 'DemoUser' }; // örnek user
      this.store.showAuthModal = false;
      // Login sonrası Profile sayfasına yönlendirme
      router.push('/profile'); // /profile sayfası routes eklenirse çalışır
    },
  },
});

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

app.use(router);

app.mount('#app');

// Vue ile modal yönetimi (HTML’de v-if veya v-show ile bağlanacak)
