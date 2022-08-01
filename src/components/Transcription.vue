<script setup>
import { inject } from 'vue';

const transcript = inject('transcript');
const recognition = inject('SpeechRecognition');

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    transcript.value = event.results[i][0].transcript;
  }
};
</script>

<template>
  <div class="form-control">
    <label class="label">
      <span class="label-text">Transcription</span>
    </label>
    <textarea
      class="textarea textarea-bordered min-w-full whitespace-pre-line"
      placeholder="Transcription goes here"
    >{{ transcript }}</textarea>
  </div>
</template>
