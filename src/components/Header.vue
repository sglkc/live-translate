<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { BIconSun, BIconMoon } from 'bootstrap-icons-vue';
import { themeChange } from 'theme-change';
import Icon from '@/assets/icon.png';

const isLight = ref();

onMounted(() => {
  themeChange(false);
  nextTick(() => {
    isLight.value =
      document.documentElement.getAttribute('data-theme') === 'light';
  });
});
</script>

<template>
  <header
    class="relative mx-auto pt-5 sm-only:pt-3 flex justify-center items-center gap-4 w-full max-w-[820px]"
  >
    <img :src="Icon" class="w-14 sm:w-16" alt="LiveTranslate icon">
    <h1 class="font-bold text-3xl sm:text-4xl">LiveTranslate</h1>
    <label
      :class="{'swap-active':isLight}"
      class="absolute right-3 swap swap-rotate"
    >
      <input
        @click="() => isLight = !isLight"
        :checked="isLight"
        type="checkbox"
        data-toggle-theme="light,night"
      >
    <i class="swap-on">
      <BIconSun />
    </i>
    <i class="swap-off">
      <BIconMoon />
    </i>
  </label>
  </header>
</template>
