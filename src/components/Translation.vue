<script setup>
import { inject, ref, watch } from 'vue';
import axios from 'axios';

const TRANSLATE_API = import.meta.env.VITE_TRANSLATE_API;
const TRANSLATE_INTERVAL = import.meta.env.VITE_TRANSLATE_INTERVAL;
const interval = ref(0);
const translation = ref('');
const translating = ref(false);
const oldTranscript = ref('');
const error = ref(null);
const copyText = ref('Copy');
const recognition = inject('SpeechRecognition');
const transcript = inject('transcript');
const copyToClipboard = async () => {
  const text = oldTranscript.value + transcript.text;
  await navigator.clipboard.writeText(text);
  copyText.value = 'Copied!';

  setTimeout(() => {
    copyText.value = 'Copy';
  }, 2000);
}

recognition.addListener('start', 'translate', () => {
  error.value = null;
  interval.value = setInterval(() => {
    if (transcript.text.endsWith('MAX_REACHED')) return;
    if (
      translating.value ||
      transcript.text === '' ||
      oldTranscript.value === transcript.text
    ) return;

    translating.value = true;
    oldTranscript.value = transcript.text;

    axios(TRANSLATE_API, {
      method: 'post',
      data: {
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
        recognition.stop();
      });
  }, TRANSLATE_INTERVAL);
});

recognition.addListener('end', 'translate', () => {
  clearInterval(interval.value);
});

watch(transcript, (newTranscript) => {
  if (newTranscript.text === '') {
    translation.value = '';
  }
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
  <div v-else class="form-control text-left">
    <div class="label">
      <span class="label-text sm-only:text-xs">Translation</span>
    </div>
    <div
      class="textarea textarea-bordered whitespace-pre-line sm-only:px-2 sm-only:text-xs grow"
    >{{ translation || 'Translation goes here' }}</div>
    <div class="label px-0">
      <button
        @click="copyToClipboard"
        class="btn btn-xs btn-outline btn-secondary ml-auto"
      >{{ copyText }}</button>
    </div>
  </div>
</template>
