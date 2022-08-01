<script setup>
import { inject } from 'vue';

const transcript = inject('transcript');
const recognition = inject('SpeechRecognition');

recognition.onresult = function(event) {
  const transcripts = [];

  for (let i = 0; i < event.results.length; i++) {
    transcripts.push(event.results[i][0].transcript);
  }

  transcript.text = transcripts.join('\n');
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
      readonly
    >{{ transcript.text }}</textarea>
  </div>
</template>
