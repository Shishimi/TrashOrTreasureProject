<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView></RouterView>
  <div>
    <img class="homeBG" src="./assets/home-bg.png" />
    <img class="logo" src="./assets/logo.png" />
    <a href="#">
      <img class="playButton" src="./assets/play-btn.png" />
    </a>
    <router-link :to="{ path: '/register' }">
      <img class="profileButton" src="./assets/profile-btn.png" />
    </router-link>
    <router-link :to="{ path: '/leaderboard' }">
      <img class="leaderboardButton" src="./assets/leaderboard-btn.png" />
    </router-link>
  </div>
</template>

<style scoped>
:global(body) {
  background-color: rgb(7, 10, 6);
}

.homeBG {
  position: absolute;
  max-width: 100vw;
  overflow-x: hidden;
  z-index: 0;
  left: 0;
  top: 22vh;
}

.logo {
  display: block;
  width: 60vw;
  height: 30vh;
  position: fixed;
  left: 20vw;
  top: 27vh;
  z-index: 1;
}

.playButton {
  cursor: pointer;
  border: none;
  width: 20vw;
  height: 10vh;
  position: fixed;
  z-index: 2;
  left: 38vw;
  top: 53vh;
}

.playButton:hover {
  transform: scale(1.2);
}

.profileButton {
  cursor: pointer;
  border: none;
  width: 25vw;
  height: 12.5vh;
  position: fixed;
  left: 80vw;
  top: 24vw;
  z-index: 1;
}

.profileButton:hover {
  transform: scale(1.2);
}

.leaderboardButton {
  cursor: pointer;
  border: none;
  width: 14vw;
  height: 10vh;
  position: fixed;
  left: 85.5vw;
  top: 37vw;
  z-index: 1;
}

.leaderboardButton:hover {
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

  .logo {
    height: 60vh;
    top: 10vh;
  }

  .playButton {
    height: 20vh;
    top: 60vh;
  }

  .profileButton {
    height: 25vh;
    top: 0;
  }

  .leaderboardButton {
    height: 20vh;
    top: 23vh;
  }
}
</style>
