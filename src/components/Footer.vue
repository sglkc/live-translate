<script setup>
import { BIconGithub } from 'bootstrap-icons-vue';
</script>

<template>
  <footer class="bg-base-200 text-base-content text-xs sm:text-sm">
    <div
      class="max-w-[900px] mx-auto py-3 sm:py-5 px-3 md:px-16 flex justify-between"
    >
      <div class="text-left space-y-1">
        <div>
          Maintained by
          <a class="link" href="https://github.com/sglkc">sglkc</a>
        </div>
        <div>
          Licensed under
          <a
            class="link"
            href="https://github.com/sglkc/live-translate/blob/master/LICENSE"
          >
            MIT License
          </a>
        </div>
        <div class="!mt-2 text-3xl sm:text-4xl">
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
  </footer>
</template>
