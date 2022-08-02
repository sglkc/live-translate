<script setup>
import { inject, ref } from 'vue';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const oldTranscript = ref('');
const copyText = ref('Copy');
const transcript = inject('transcript');
const recognition = inject('SpeechRecognition');
const copyToClipboard = async () => {
  const text = oldTranscript.value + transcript.text;
  await navigator.clipboard.writeText(text);
  copyText.value = 'Copied!';

  setTimeout(() => {
    copyText.value = 'Copy';
  }, 2000);
};
const clearText = () => {
  oldTranscript.value = '';
  transcript.text = '';
}

recognition.addListener('end', 'transcript', () => {
  oldTranscript.value += transcript.text + '\n';
});

recognition.onresult = function(event) {
  if (!isMobile) {
    const transcripts = [];

    for (let i = 0; i < event.results.length; i++) {
      transcripts.push(event.results[i][0].transcript);
    }

    transcript.text = oldTranscript.value + transcripts.join('\n');
    return;
  }

  transcript.text =
    oldTranscript.value + event.results[event.resultIndex][0].transcript
      .replace(oldTranscript.value, '');
};
</script>

<template>
  <div class="form-control text-left">
    <div class="label">
      <span class="label-text sm-only:text-xs">Transcription</span>
    </div>
    <div
      class="textarea textarea-bordered whitespace-pre-line sm-only:px-2 sm-only:text-xs grow"
    >{{ transcript.text || 'Transcript goes here' }}</div>
    <div class="label px-0">
      <button
        @click="clearText"
        class="btn btn-xs btn-ghost btn-neutral"
      >Clear</button>
      <button
        @click="copyToClipboard"
        class="btn btn-xs btn-outline btn-secondary"
      >{{ copyText }}</button>
    </div>
  </div>
</template>
