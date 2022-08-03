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
  if (transcript.text.includes(oldTranscript.value)) {
    oldTranscript.value = transcript.text;
    return;
  }

  oldTranscript.value += ' ' + transcript.text + '\n'.replace(/^\s*\n/gm, '');
});

recognition.onresult = function(event) {
  if (transcript.text.length > 4500) {
    transcript.text += ' MAX_REACHED';
    recognition.stop();
    return;
  }

  const latestTranscript = event.results[event.resultIndex][0].transcript;

  if (!isMobile || latestTranscript === '') {
    const transcripts = [];

    for (let i = 0; i < event.results.length; i++) {
      transcripts.push(event.results[i][0].transcript);
    }

    transcript.text = oldTranscript.value +
      (isMobile
        ? (transcripts.findLast((t) => t !== '') || '')
        : transcripts.join('\n'));
    return;
  }

  transcript.text = oldTranscript.value + ' ' + latestTranscript;
};
</script>

<template>
  <div class="form-control text-left">
    <div class="label">
      <span class="label-text sm-only:text-xs">Transcription</span>
      <span
        :class="{'text-error': transcript.text.length > 4500}"
        class="label-text text-xs opacity-75"
      >{{ transcript.text.length }}</span>
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
