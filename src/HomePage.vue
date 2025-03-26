<script setup lang="ts">
// import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div>
    <img class="homeBG" src="./assets/home-bg.png" />
    <img class="logo" src="./assets/logo.png" />
    <a href="#">
      <img class="playButton" src="./assets/play-btn.png" />
    </a>
    <a href="#">
      <img class="profileButton" src="./assets/profile-btn.png" />
    </a>
  </div>
</template>

<style scoped>
.homeBG {
  position: absolute;
  max-width: 100vw;
  overflow-x: hidden;
  z-index: 0;
  left: 0;
  top: 0;
}

.logo {
  display: block;
  width: 60vw;
  height: 30vh;
  position: fixed;
  left: 20vw;
  top: 5vh;
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
  top: 30vh;
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
  top: 0vw;
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
  }
}
</style>
