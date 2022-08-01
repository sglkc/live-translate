<script setup>
import { ref } from 'vue';
import { translations } from '@/assets/translations.json';

const props = defineProps({
  translate: {
    type: String,
    default: 'en'
  }
});

const translate = ref(props.translate);
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
