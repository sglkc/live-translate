<div align="center">
  <h1>LiveTranslate</h1>
  <img src="public/thumbnail.png?raw=true" alt="LiveTranslate thumbnail">
  
  ![Google Chrome](https://img.shields.io/badge/Google%20Chrome-33-4285F4.svg?logo=googlechrome)
  [![Vue.js](https://img.shields.io/badge/Vue.js-v3-4FC08D.svg?logo=vuedotjs)](https://vuejs.org/guide/introduction.html)
  [![Vite](https://img.shields.io/badge/Vite-3-646CFF.svg?logo=Vite)](https://vitejs.dev/guide/)
  [![Build](https://img.shields.io/github/workflow/status/sglkc/asobimashou/pages%20build%20and%20deployment?logo=github)](https://sglkc.github.io/live-translate)
  [![Issues](https://img.shields.io/github/issues/sglkc/live-translate.svg)](https://github.com/sglkc/live-translate/issues)
  [![MIT License](https://img.shields.io/github/license/sglkc/live-translate.svg)](LICENSE)

  Implements Google Chrome's Web Speech API and translates the transcription allowing users to translate speeches in real-time.
  
  <a href="https://github.com/sglkc/live-translate/issues">Report a Bug</a>
  <strong>·</strong>
  <a href="https://github.com/sglkc/live-translate/issues">Request a Feature</a>
</div>

## About The Project

This single-page website is made with Vue.js v3 and Vite 3, and Tailwind CSS and daisyUI for the user interface.
The project is fairly simple, it's to make use of Web Speech API and using an external API to translate the transcriptions.
Read [Translate API](#translate-api) section below for explanations regarding the translation API.

<strong>Note: </strong> The Web Speech API is not supported by every major browsers, this is why I explicitly mentioned Google Chrome and not the others,
for compatibilities [check this page by MDN.](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API#browser_compatibility)

## Translate API

The API uses [@vitalets/google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api) package for translation.
To host your own API for translation, copy the [api folder](/api) and deploy it on Vercel.

To make your own implementation of the API for your platform, make sure to follow these rules:
- Check for CORS headers to allow your website to fetch the API
- POST request endpoint with the following body:
  - `text` for the text to translate
  - `to` for target language
- POST request endpoint must return the value from [@vitalets/google-translate-api](https://www.npmjs.com/package/@vitalets/google-translate-api)'s `translate` function

## Getting Started

You can try the demo here https://sglkc.github.io/live-translate.

Or follow these steps below to get the website running on your local machine:

1. Clone the repo
  ```sh
  git clone https://github.com/sglkc/live-translate.git
  cd live-translate
  ```
2. Install npm dependencies
  ```sh
  npm install
  ```
3. Copy or rename `.env.example` to `.env`
4. Enter your translate API endpoint in `.env` (You may also want to change translation interval here)
5. Compile and minify for production
  ```sh
  npm run build
  ```

## Contributing

Every contributions are **greatly appreciated**! You can start by forking this repository then create a pull request.

1. Fork the repository
2. Create your branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -m 'feat: add new command'`)
4. Push to the branch (`git push origin new-feature`)
5. Open a [pull request](https://github.com/sglkc/live-translate/pulls)

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
