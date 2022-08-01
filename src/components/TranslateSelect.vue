<script setup>
import { computed, inject, ref } from 'vue';
import { translations } from '@/assets/translations.json';

const transcript = inject('transcript');
const translate = computed({
  get() {
    return transcript.translateTo;
  },
  set(value) {
    transcript.translateTo = value;
  }
});
</script>

<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">Translate to</span>
    </label>
    <select v-model="translate" class="select select-sm select-primary">
      <option v-for="language in translations" :value="language.code">
        {{ language.name }}
      </option>
    </select>
  </div>
</template>
