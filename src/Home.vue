<script setup lang="ts">
//import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="homeBG">
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
  background-image: url('./assets/home-bg.png');
  display: flex;
  background-position: center;
  background-size: cover;
}

.logo {
  display: flex;
  width: 50%;
  height: 50%;
  margin: auto;
}

.playButton {
  display: flex;
  cursor: pointer;
  border: none;
  width: 20%;
  height: 20%;
}

.playButton:hover {
  transform: scale(1.05);
}

.profileButton {
  display: flex;
  cursor: pointer;
  border: none;
  width: 20%;
  height: 20%;
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
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

