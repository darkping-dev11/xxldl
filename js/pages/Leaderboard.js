import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';

import Spinner from '../components/Spinner.js';

export default {
    components: {
        Spinner,
    },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
        searchQuery: '',
    }),
    template: `
        <main v-if="loading">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
                <div class="error-container">
                    <p class="error" v-if="err.length > 0">
                        Leaderboard may be incorrect, as the following levels could not be loaded: {{ err.join(', ') }}
                    </p>
                </div>

                <!-- Board -->
                <div class="board-container">
                    <table class="board">
                        <thead>
                            <tr>
                                <th class="rank">#</th>
                                <th class="total">Stars</th>
                                <th class="user">Player</th>
                                <th class="flag">Flag</th>
                                <th class="clan">Clan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ientry, i) in leaderboard" 
                                :key="i" 
                                v-if="ientry.visible !== false">
                                <td class="rank"><p class="type-label-lg">#{{ i + 1 }}</p></td>
                                <td class="total"><p class="type-label-lg">{{ localize(ientry.total) }}</p></td>
                                <td class="user" :class="{ 'active': selected == i }">
                                    <button @click="selected = i">
                                        <span class="type-label-lg">{{ ientry.user }}</span>
                                    </button>
                                </td>
                                <td class="flag"><span class="type-label-lg">{{ ientry.flag }}</span></td>
                                <td class="clan"><span class="type-label-lg">{{ ientry.clan }}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Player Details -->
                <div class="player-container">
                    <div class="player">
                        <!-- Search -->
                        <div class="player-search">
                            <input
                                type="text"
                                placeholder="Search Player..."
                                v-model="searchQuery"
                                @input="filterPlayers"
                            />
                        </div>

                        <h1>#{{ selected + 1 }} {{ entry.user }}</h1>
                        <h3>{{ entry.total }}</h3>

                        <h2 v-if="entry.verified.length > 0">Verified ({{ entry.verified.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified" :key="score.level">
                                <td class="rank"><p>#{{ score.rank }}</p></td>
                                <td class="level">
                                    <a class="type-label-lg" :href="score.link" target="_blank">{{ score.level }}</a>
                                </td>
                                <td class="score"><p>+{{ localize(score.score) }}</p></td>
                            </tr>
                        </table>

                        <h2 v-if="entry.completed.length > 0">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed" :key="score.level">
                                <td class="rank"><p>#{{ score.rank }}</p></td>
                                <td class="level">
                                    <a class="type-label-lg" :href="score.link" target="_blank">{{ score.level }}</a>
                                </td>
                                <td class="score"><p>+{{ localize(score.score) }}</p></td>
                            </tr>
                        </table>

                        <h2 v-if="entry.progressed.length > 0">Progressed ({{ entry.progressed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed" :key="score.level">
                                <td class="rank"><p>#{{ score.rank }}</p></td>
                                <td class="level">
                                    <a class="type-label-lg" :href="score.link" target="_blank">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score"><p>+{{ localize(score.score) }}</p></td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected] || { verified: [], completed: [], progressed: [] };
        },
    },
    async mounted() {
        try {
            const result = await fetchLeaderboard();
            // fetchLeaderboard sonucu zaten [leaderboard, err] formatında
            const leaderboardData = Array.isArray(result) ? result[0] : [];
            const errData = Array.isArray(result) ? result[1] : [];

            // Flag & Clan ekle
            leaderboardData.forEach(player => {
                player.flag = player.flag || "🏳️";
                player.clan = player.clan || "NoClan";
                player.visible = true;
            });

            this.leaderboard = leaderboardData || [];
            this.err = errData || [];

        } catch (e) {
            console.error("fetchLeaderboard error:", e);
            this.leaderboard = [];
            this.err = ["Failed to fetch leaderboard"];
        } finally {
            this.loading = false; // Spinner kapanır
        }
    },
    methods: {
        localize,
        filterPlayers() {
            const q = this.searchQuery.toLowerCase().trim();
            this.leaderboard.forEach(player => {
                player.visible = !q || player.user.toLowerCase().includes(q);
            });
        }
    },
};