<script setup>
import { computed, inject, ref, watch } from 'vue';
import { languages } from '@/assets/languages.json';

const recognition = inject('SpeechRecognition');
const language = ref(57);
const languageSelect = computed({
  get() {
    region.value = regions.value[0][0];
    return language.value;
  },
  set(value) {
    language.value = value;
  }
});

const region = ref('');
const regions = computed(() => {
  return languages[language.value].regions;
});

watch(region, (language) => {
  recognition.stop();
  recognition.lang = language;
});
</script>

<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">Language</span>
    </label>
    <select v-model="languageSelect" class="select select-sm select-primary">
      <option v-for="(language, index) in languages" :value="index">
        {{ language.name }}
      </option>
    </select>
  </div>
  <div v-if="regions.length > 1" class="form-control">
    <label class="label">
      <span class="label-text">Region</span>
    </label>
    <select v-model="region" class="select select-sm select-secondary">
      <option v-for="region in regions" :value="region[0]">
        {{ region[1] }}
      </option>
    </select>
  </div>
</template>
