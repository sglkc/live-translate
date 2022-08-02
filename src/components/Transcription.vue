<script setup>
import { inject, ref } from 'vue';

const textarea = ref(null);
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
  textarea.value.style.height = 'auto';
}

recognition.addListener('end', 'transcript', () => {
  oldTranscript.value += transcript.text + '\n';
});

recognition.onresult = function(event) {
  const transcripts = [];

  for (let i = 0; i < event.results.length; i++) {
    transcripts.push(event.results[i][0].transcript);
  }

  transcript.text = oldTranscript.value + transcripts.join('\n');
  textarea.value.style.height = '0px';
  textarea.value.style.height = textarea.value.scrollHeight + 'px';
};
</script>

<template>
  <div class="form-control">
    <div class="label">
      <span class="label-text">Transcription</span>
    </div>
    <textarea
      ref="textarea"
      class="textarea textarea-bordered whitespace-pre-line resize-none overflow-hidden transition-[height]"
      placeholder="Transcription goes here"
      rows="2"
      readonly
    >{{ transcript.text }}</textarea>
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
