import List from './pages/List.js';
import Leaderboard from './pages/Leaderboard.js';
import Roulette from './pages/Roulette.js';
import Submit from './pages/Submit.js';
import Register from './pages/Register.js';
import Login from './pages/Login.js';
import Profile from './pages/Profile.js';

export default [
  { path: '/', component: List },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/roulette', component: Roulette },
  { path: '/submit', component: Submit },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile }
];
