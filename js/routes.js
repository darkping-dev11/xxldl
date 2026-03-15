import List from './pages/List.js';
import Leaderboard from './pages/Leaderboard.js';
import Roulette from './pages/Roulette.js';
import Submit from './pages/Submit.js';
import Profile from './pages/Profile.js'; // yeni ekleme

export default [
  { path: '/', component: List },
  { path: '/leaderboard', component: Leaderboard },
  { path: '/roulette', component: Roulette },
  { path: '/submit', component: Submit },
  { path: '/profile', component: Profile }, // login sonrası gidilecek sayfa
];
