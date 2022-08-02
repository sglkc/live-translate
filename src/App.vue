<script setup>
import { provide, reactive } from 'vue';
import Icon from '@/assets/icon.png';
import Footer from '@/components/Footer.vue';
import LanguageSelect from '@/components/LanguageSelect.vue';
import RecordButton from '@/components/RecordButton.vue';
import TranslateSelect from '@/components/TranslateSelect.vue';
import Transcription from '@/components/Transcription.vue';
import Translation from '@/components/Translation.vue';

const transcript = reactive({
  text: '',
  translateTo: 'en'
});
provide('transcript', transcript);
</script>

<template>
  <div class="flex flex-col text-center h-full">
    <header class="pt-5 flex justify-center items-center gap-4">
      <img :src="Icon" class="w-16" alt="LiveTranslate icon">
      <h1 class="text-4xl font-bold">LiveTranslate</h1>
    </header>
    <main class="px-3 py-5 space-y-2 mx-auto w-full max-w-[720px] grow">
      <section class="flex flex-col gap-3">
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
    </main>
    <Footer />
  </div>
</template>

<style>
html, body {
  height: 100%;
}
</style>
