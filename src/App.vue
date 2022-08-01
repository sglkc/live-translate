<script setup>
import { provide, ref } from 'vue';
import LanguageSelect from '@/components/LanguageSelect.vue'
import RecordButton from '@/components/RecordButton.vue';
import TranslateSelect from '@/components/TranslateSelect.vue';
import Transcription from '@/components/Transcription.vue';
import Translation from '@/components/Translation.vue';

const transcript = ref('');
provide('transcript', transcript);
</script>

<template>
  <main class="mx-auto px-3 text-center max-w-[720px]">
    <header class="my-3">
      <h1 class="text-4xl font-bold">Live Translate</h1>
    </header>
    <section class="my-5 flex flex-col gap-3">
      <div class="flex flex-wrap justify-center gap-2">
        <LanguageSelect />
        <TranslateSelect />
      </div>
      <RecordButton />
    </section>
    <section class="grid grid-cols-2 gap-3">
      <Transcription />
      <Translation />
    </section>
    <div id="translate"></div>
    <div id="result" class="mt-3"></div>
  </main>
</template>

<style>
textarea {
  height: 500px;
}
</style>
