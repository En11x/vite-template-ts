<template>
  <div>user:{{ data }}</div>
</template>
<script lang="ts" setup>
import { useGetUsers } from '@/apis/user';

const { data } = useGetUsers({ id: '1' });
</script>
