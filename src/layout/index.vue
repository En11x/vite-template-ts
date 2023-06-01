<template>
  <div class="main">
    <Sidebar />
    <div class="right">
      <Navbar />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain.vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<style scoped>
.main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 240px 1fr;
}
.right {
  display: grid;
  grid-template-rows: 40px 1fr;
}
</style>
