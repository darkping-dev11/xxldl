import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';
import Spinner from '../components/Spinner.js';

export default {
    name: "LeaderboardPage",
    components: { Spinner },
    data() {
        return {
            leaderboard: [],
            loading: true,
            selected: 0,
            err: [],
            searchQuery: '',
        };
    },
    template: `
        <main v-if="loading" class="page-leaderboard-container">
            <Spinner />
        </main>

        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">

                <!-- Hata mesajı -->
                <div class="error-container" v-if="err.length">
                    <p class="error">
                        Leaderboard may be incorrect, levels not loaded: {{ err.join(', ') }}
                    </p>
                </div>

                <!-- Board -->
                <div class="board-container">
                    <table class="board">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Stars</th>
                                <th>Player</th>
                                <th>Flag</th>
                                <th>Clan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(player, i) in leaderboard" :key="i" v-if="player.visible">
                                <td>#{{ i + 1 }}</td>
                                <td>{{ localize(player.total) }}</td>
                                <td :class="{ 'active': selected === i }">
                                    <button @click="selected = i">{{ player.user }}</button>
                                </td>
                                <td>{{ player.flag }}</td>
                                <td>{{ player.clan }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Player Details -->
                <div class="player-container">
                    <div class="player">

                        <!-- Player Search -->
                        <div class="player-search">
                            <input type="text" placeholder="Search Player..." v-model="searchQuery" @input="filterPlayers" />
                        </div>

                        <h1 v-if="entry.user">#{{ selected + 1 }} {{ entry.user }}</h1>
                        <h3 v-if="entry.total !== undefined">{{ entry.total }}</h3>

                        <div v-if="entry.verified?.length">
                            <h2>Verified ({{ entry.verified.length }})</h2>
                            <table class="table">
                                <tr v-for="score in entry.verified" :key="score.level">
                                    <td>#{{ score.rank }}</td>
                                    <td><a :href="score.link" target="_blank">{{ score.level }}</a></td>
                                    <td>+{{ localize(score.score) }}</td>
                                </tr>
                            </table>
                        </div>

                        <div v-if="entry.completed?.length">
                            <h2>Completed ({{ entry.completed.length }})</h2>
                            <table class="table">
                                <tr v-for="score in entry.completed" :key="score.level">
                                    <td>#{{ score.rank }}</td>
                                    <td><a :href="score.link" target="_blank">{{ score.level }}</a></td>
                                    <td>+{{ localize(score.score) }}</td>
                                </tr>
                            </table>
                        </div>

                        <div v-if="entry.progressed?.length">
                            <h2>Progressed ({{ entry.progressed.length }})</h2>
                            <table class="table">
                                <tr v-for="score in entry.progressed" :key="score.level">
                                    <td>#{{ score.rank }}</td>
                                    <td><a :href="score.link" target="_blank">{{ score.percent }}% {{ score.level }}</a></td>
                                    <td>+{{ localize(score.score) }}</td>
                                </tr>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected] || { user: '', total: 0, verified: [], completed: [], progressed: [] };
        }
    },
    methods: {
        localize,
        filterPlayers() {
            const q = this.searchQuery.toLowerCase().trim();
            this.leaderboard.forEach(player => {
                player.visible = !q || player.user.toLowerCase().includes(q);
            });
            // Eğer aranan oyuncu varsa onu seç
            const firstMatch = this.leaderboard.findIndex(p => p.visible);
            if(firstMatch !== -1) this.selected = firstMatch;
        }
    },
    async mounted() {
        try {
            const result = await fetchLeaderboard();
            const leaderboardData = Array.isArray(result) && result.length ? result[0] : [];
            const errData = Array.isArray(result) && result.length > 1 ? result[1] : [];

            // Flag & Clan ekle
            leaderboardData.forEach(player => {
                switch(player.user) {
                    case "Exen": player.flag="🇺🇸"; player.clan="DarkGuild"; break;
                    case "Zeronium": player.flag="🇫🇷"; player.clan="LightClan"; break;
                    case "ZmL": player.flag="🇩🇪"; player.clan="NightCrew"; break;
                    default: player.flag="🏳️"; player.clan="NoClan";
                }
                player.visible = true;
            });

            this.leaderboard = leaderboardData;
            this.err = errData;
        } catch(e) {
            console.error("fetchLeaderboard error:", e);
            this.leaderboard = [];
            this.err = ["Failed to fetch leaderboard"];
        } finally {
            this.loading = false; // Spinner kapanır
        }
    }
};