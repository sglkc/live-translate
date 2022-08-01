<script setup>
import { inject, ref, watch } from 'vue';
import axios from 'axios';

const TRANSLATE_API = import.meta.env.VITE_TRANSLATE_API;
const timer = ref(0);
const translation = ref('');
const translating = ref(false);
const oldTranscript = ref('');
const error = ref(null);
const recognition = inject('SpeechRecognition');
const transcript = inject('transcript');

recognition.addListener('start', 'translate', () => {
  timer.value = setInterval(() => {
    if (!translating.value && oldTranscript.value === transcript.text) return;

    translating.value = true;
    oldTranscript.value = transcript.text;

    axios(TRANSLATE_API, {
      method: 'get',
      params: {
        text: transcript.text,
        to: transcript.translateTo
      }
    })
      .then((res) => {
        translation.value = res.data;
        translating.value = false;
      })
      .catch((err) => {
        delete err.config;
        error.value = JSON.stringify(err, null, 2);
        translating.value = false;
      });
  }, 3000);
});

recognition.addListener('end', 'translate', () => {
  clearInterval(timer.value);
});

watch(transcript, (newTranscript) => {
  transcript.value = newTranscript;
});
</script>

<template>
  <div
    v-if="error"
    class="bg-error text-error-content rounded-lg text-left p-5 my-auto"
  >
    <h3 class="text-md font-bold mb-3">An unexpected error has occured</h3>
    <p class="text-sm">You might want to report this to developer</p>
    <p class="text-sm whitespace-pre-wrap">{{ error }}</p>
  </div>
  <div v-else class="form-control">
    <label class="label">
      <span class="label-text">Translation</span>
    </label>
    <textarea
      class="textarea textarea-bordered min-w-full"
      placeholder="Translation goes here"
      readonly
    >{{ translation }}</textarea>
  </div>
</template>
