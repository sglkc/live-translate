<script setup>
import { BIconGithub } from 'bootstrap-icons-vue';
</script>

<template>
  <div class="max-w-[720px] mx-auto py-5 px-3 flex justify-between text-sm">
    <div class="text-left space-y-1">
      <div>
        Maintained by
        <a class="link" href="https://github.com/sglkc">sglkc</a>
      </div>
      <div>
        Licensed under the
        <a
          class="link"
          href="https://github.com/sglkc/live-translate/blob/master/LICENSE"
        >
          MIT License
        </a>
      </div>
      <div class="text-4xl">
        <a href="https://github.com/sglkc/live-translate">
          <BIconGithub />
        </a>
      </div>
    </div>
    <div class="text-right space-y-1">
      <div>Report bugs or request features</div>
      <div>
        <a class="link" href="https://github.com/sglkc/live-translate/issues">
          Open a new issue on GitHub
        </a>
      </div>
    </div>
  </div>
</template>
