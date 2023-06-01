<template>
  <Sidebar />
  <div>
    <Navbar />
    <app-main />
  </div>
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain.vue';
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';
</script>
