<script setup>
import { inject, ref, watch } from 'vue';

const timer = ref(0);
const recognition = inject('SpeechRecognition');
const transcript = inject('transcript');

recognition.addListener('start', 'translate', () => {
  timer.value = setInterval(() => {
    console.log('TODO: text will translate here');
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
  <div class="form-control">
    <label class="label">
      <span class="label-text">Translation</span>
    </label>
    <textarea
      class="textarea textarea-bordered min-w-full"
      placeholder="Translation goes here"
    ></textarea>
  </div>
</template>
