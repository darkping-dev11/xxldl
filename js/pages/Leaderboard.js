import { fetchLeaderboard } from '../content.js';
import { localize } from '../util.js';
import Spinner from '../components/Spinner.js';

export default {
    name: "LeaderboardPage",
    components: { Spinner },
    data: () => ({
        leaderboard: [],
        loading: true,
        selected: 0,
        err: [],
        searchQuery: '',
    }),
    template: `
        <main v-if="loading" class="page-leaderboard-container">
            <Spinner></Spinner>
        </main>
        <main v-else class="page-leaderboard-container">
            <div class="page-leaderboard">
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
                                <th class="rank">#</th>
                                <th class="total">Stars</th>
                                <th class="user">Player</th>
                                <th class="flag">Flag</th>
                                <th class="clan">Clan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ientry, i) in leaderboard" :key="i" v-if="ientry.visible">
                                <td class="rank"><p>#{{ i + 1 }}</p></td>
                                <td class="total">{{ localize(ientry.total) }}</td>
                                <td class="user" :class="{ 'active': selected === i }">
                                    <button @click="selected = i">{{ ientry.user }}</button>
                                </td>
                                <td class="flag">{{ ientry.flag }}</td>
                                <td class="clan">{{ ientry.clan }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Player Details -->
                <div class="player-container">
                    <div class="player">
                        <!-- Player Search -->
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

                        <h2 v-if="entry.verified.length">Verified ({{ entry.verified.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.verified" :key="score.level">
                                <td class="rank">#{{ score.rank }}</td>
                                <td class="level">
                                    <a :href="score.link" target="_blank">{{ score.level }}</a>
                                </td>
                                <td class="score">+{{ localize(score.score) }}</td>
                            </tr>
                        </table>

                        <h2 v-if="entry.completed.length">Completed ({{ entry.completed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.completed" :key="score.level">
                                <td class="rank">#{{ score.rank }}</td>
                                <td class="level">
                                    <a :href="score.link" target="_blank">{{ score.level }}</a>
                                </td>
                                <td class="score">+{{ localize(score.score) }}</td>
                            </tr>
                        </table>

                        <h2 v-if="entry.progressed.length">Progressed ({{ entry.progressed.length }})</h2>
                        <table class="table">
                            <tr v-for="score in entry.progressed" :key="score.level">
                                <td class="rank">#{{ score.rank }}</td>
                                <td class="level">
                                    <a :href="score.link" target="_blank">{{ score.percent }}% {{ score.level }}</a>
                                </td>
                                <td class="score">+{{ localize(score.score) }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    `,
    computed: {
        entry() {
            return this.leaderboard[this.selected] || { verified: [], completed: [], progressed: [], user: '', total: 0 };
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
    async mounted() {
        try {
            const result = await fetchLeaderboard();
            const leaderboardData = Array.isArray(result) && result.length ? result[0] : [];
            const errData = Array.isArray(result) && result.length ? result[1] : [];

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
        } catch (e) {
            console.error("fetchLeaderboard error:", e);
            this.leaderboard = [];
            this.err = ["Failed to fetch leaderboard"];
        } finally {
            this.loading = false;
        }
    }
};