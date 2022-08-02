<script setup>
import { inject, ref, watch } from 'vue';
import axios from 'axios';

const TRANSLATE_API = import.meta.env.VITE_TRANSLATE_API;
const textarea = ref(null);
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
  interval.value = setInterval(() => {
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
        textarea.value.style.height = '0px';
        textarea.value.style.height = textarea.value.scrollHeight + 26 + 'px';
      })
      .catch((err) => {
        delete err.config;
        error.value = JSON.stringify(err, null, 2);
        translating.value = false;
      });
  }, 3000);
});

recognition.addListener('end', 'translate', () => {
  clearInterval(interval.value);
});

watch(transcript, (newTranscript) => {
  if (newTranscript === '') translation.value = '';
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
    <div class="label">
      <span class="label-text">Translation</span>
    </div>
    <textarea
      ref="textarea"
      class="textarea textarea-bordered whitespace-pre-line resize-none overflow-hidden"
      placeholder="Translation goes here"
      rows="2"
      readonly
    >{{ translation }}</textarea>
    <div class="label px-0">
      <button
        @click="copyToClipboard"
        class="btn btn-xs btn-outline btn-secondary ml-auto"
      >{{ copyText }}</button>
    </div>
  </div>
</template>
