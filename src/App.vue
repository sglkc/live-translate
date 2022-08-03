<script setup>
import { provide, reactive } from 'vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import LanguageSelect from '@/components/LanguageSelect.vue';
import RecordButton from '@/components/RecordButton.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
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
    <Header />
    <main
      class="px-3 py-5 sm-only:pt-2 sm-only:mb-5 mx-auto w-full max-w-[720px] grow"
    >
      <section class="flex flex-col gap-3 mb-2">
        <div class="flex flex-wrap justify-center gap-y-1 gap-x-2">
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
