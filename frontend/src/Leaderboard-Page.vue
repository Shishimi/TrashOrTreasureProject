<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {supabase} from "@/supabase";
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
          :key="entry.id"
          class="entry-row"
          :style="{top: '${110 + index * 60}px'}"
        >
          <span class="entry-name">{{entry.Username}}</span>
          <span class="entry-name">{{entry.Score}}</span>
          <span class="entry-name">{{entry.Time}}</span>
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
  position: fixed;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.entries {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: 'bubblyFont', cursive, sans-serif;
  font-size: 1.5rem;
  color: #2a1503;
  font-weight: bold;
  text-align: center;
  pointer-events: none;
}

.entry-row {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 0 2rem;
}

.entry-name,
.entry-score,
.entry-time {
  width: 30%;
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
