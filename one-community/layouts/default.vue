<template>
  <div>
    <LayoutTheHeader />
    <Nuxt />
    <LayoutTheFooter />
  </div>
</template>

<style lang="scss">
* {
  font-family: 'Roboto', sans-serif;
  font-size: $default-font-size;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'RobotoBold', sans-serif;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.25rem;
}

h3 {
  font-size: 1.5rem;
}

.secondary-link {
  text-decoration: none;
  color: inherit;
  &:link,
  &:visited {
  }

  &:hover,
  &:active {
    text-decoration: underline;
  }
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
