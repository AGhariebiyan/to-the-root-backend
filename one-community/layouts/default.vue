<template>
  <div>
    <LayoutTheHeader />
      <main>
        <Nuxt />
      </main>
    <LayoutTheFooter />
  </div>
</template>

<style lang="scss">
@use "~assets/scss/main";

* {
    font-family: 'Roboto', sans-serif;
    font-size: main.$default-font-size;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'RobotoBold', sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

</style>
