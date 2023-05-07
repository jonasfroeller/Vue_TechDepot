# Tech Depot

A collection of useful tools for software development.

## Setup

* **install dependencies:**

    ```bash
    pnpm i
    ```

* **development server:**

    ```bash
    pnpm dev
    ```

* **build for production:**

    ```bash
    pnpm build
    ```

* **docker production build:**

  1. build docker image

      ```bash
      docker buildx build . -t vitesse:latest
      ```

  2. run a docker instance container

      ```bash
      docker run --rm -it -p 8080:80 vitesse:latest
      ```

## Tech

### i18n

[vue-i18n](https://github.com/intlify/vue-i18n-next) | [i18n Ally](https://github.com/lokalise/i18n-ally)

### Styling

[UnoCSS](https://github.com/unocss/unocss)
