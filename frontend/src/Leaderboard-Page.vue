<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { supabase } from '@/supabase'
import {ref, onMounted} from "vue"

interface LeaderboardEntry {
  Username: string
  Score: number
  Time: String
}

const leaderboard = ref<LeaderboardEntry[]>([])

onMounted(async () => {
  const {data, error} = await supabase
      .from('Leaderboard')
      .select('Username, Score, Time')
      .order('Score', {ascending: false})
      .limit(5)

  if (error){
    console.error(error)
  }

  else leaderboard.value = data
})
</script>

<template>
  <div>
    <img class="homeBG" src="./assets/leaderboardBG.png" />
    <img class="logoLB" src="./assets/leaderboard-logo.png" />
    <img class="slots" src="./assets/slotsLB.png" />
    <router-link :to="{ path: '/' }">
      <img class="home-btn" src="./assets/logo.png" />
    </router-link>
    <router-link :to="{ path: '/register' }">
      <img class="profileButton" src="./assets/profile-btn.png" />
    </router-link>
    <div class ="leaderboard-wrapper">
      <div class="entries">
        <div
          v-for="(entry, index) in leaderboard"
          :key="entry.Username"
          class="entry-row"
          :style="{top: `${25 + index * 15}vh`}"
        >
          <span class="entry-name">{{entry.Username}}</span>
          <span class="entry-score">{{entry.Score}}</span>
          <span class="entry-time">{{entry.Time}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:global(body) {
  background-color: rgb(7, 10, 6);
}

.leaderboard-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.entries {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: 'bubblyFont', cursive, sans-serif;
  font-size: 2rem;
  color: #2a1503;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
}

.entry-row {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 60vw; /* tighter width */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1vw; /* smaller horizontal padding */
  height: 6vh;
  z-index: 100;
}

.entry-name,
.entry-score,
.entry-time {
  flex: none;
  width: 30%;            /* Adjust %s as needed — should total ~100% or a bit less */
  text-align: center;
  white-space: nowrap;
}

.homeBG {
  position: absolute;
  max-width: 100vw;
  overflow-x: hidden;
  z-index: 0;
  left: 0;
  top: 22vh;
}

.home-btn {
  display: block;
  width: 18vw;
  height: 9vh;
  position: fixed;
  left: 2vw;
  top: 23vh;
  z-index: 1;
}

.home-btn:hover {
  transform: scale(1.2);
}

.logoLB {
  display: block;
  width: 55vw;
  height: 10vh;
  position: fixed;
  left: 22vw;
  top: 23vh;
  z-index: 1;
}

.slots {
  display: block;
  width: 70vw;
  height: 37vh;
  position: fixed;
  left: 15vw;
  top: 30vh;
  z-index: 1;
}

.profileButton {
  cursor: pointer;
  border: none;
  width: 25vw;
  height: 11vh;
  position: fixed;
  left: 80vw;
  top: 27.5vw;
  z-index: 1;
}

.profileButton:hover {
  transform: scale(1.2);
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

@media (min-width: 1024px) {
  .homeBG {
    height: 100vh;
    width: 100vw;
    top: 0;
  }

  .home-btn {
    height: 18vh;
    top: 3vh;
  }

  .home-btn:hover {
    transform: scale(1.2);
  }

  .logoLB {
    height: 22vh;
    top: 0vh;
  }

  .slots {
    height: 85vh;
    top: 17vh;
  }

  .profileButton {
    height: 25vh;
    top: 0;
  }
}
</style>
