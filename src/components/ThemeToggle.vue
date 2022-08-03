<script setup>
import { onMounted } from 'vue';
import { BIconSun, BIconMoon } from 'bootstrap-icons-vue';
import { themeChange } from 'theme-change';

onMounted(() => {
  themeChange(false);
});
</script>

<template>
  <label class="absolute right-0 swap swap-rotate">
    <input type="checkbox" data-toggle-theme="light,night">
    <i class="swap-on">
      <BIconSun />
    </i>
    <i class="swap-off">
      <BIconMoon />
    </i>
  </label>
</template>
