<script setup>
import { computed, inject, ref } from 'vue';
import { languages } from '@/assets/languages.json';

const recognition = inject('SpeechRecognition');
const language = ref(localStorage.getItem('language') || 57);
const languageSelect = computed({
  get() {
    region.value = regions.value[0][0];
    recognition.stop();
    recognition.lang = region.value;
    localStorage.setItem('region', region.value);
    return language.value;
  },
  set(value) {
    language.value = value;
    localStorage.setItem('language', value);
  }
});

const region = ref(localStorage.getItem('region') || 'ja-JP');
const regions = computed(() => {
  return languages[language.value].regions;
});
const regionSelect = computed({
  get() {
    return region.value;
  },
  set(value) {
    recognition.stop();
    recognition.lang = value;
    localStorage.setItem('region', value);
  }
});
</script>

<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text sm-only:text-xs">Language</span>
    </label>
    <select
      v-model="languageSelect"
      class="select select-sm select-primary sm-only:text-xs"
    >
      <option v-for="(language, index) in languages" :value="index">
        {{ language.name }}
      </option>
    </select>
  </div>
  <div v-if="regions.length > 1" class="form-control sm-only:text-xs">
    <label class="label">
      <span class="label-text sm-only:text-xs">Region</span>
    </label>
    <select
      v-model="regionSelect"
      class="select select-sm select-secondary sm-only:text-xs"
    >
      <option v-for="region in regions" :value="region[0]">
        {{ region[1] }}
      </option>
    </select>
  </div>
</template>
