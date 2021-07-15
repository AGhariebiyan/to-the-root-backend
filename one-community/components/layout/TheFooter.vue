<template>
  <footer>
    <a class="footer__logo" href="https://www.ordina.nl/" target="_blank">
      <img src="@/static/Logo_pay-off_rgb.png" />
    </a>
    <nav class="footer__nav">
      <NuxtLink v-for="link in links" :key="link.name" :to="link.to">{{
        link.name
      }}</NuxtLink>
    </nav>
    <div class="footer__social-icons">
      <a href="https://www.facebook.com/ordina/"
        ><img src="@/static/facebook.svg" alt="facebook logo"
      /></a>
      <a href="https://www.linkedin.com/company/ordina/"
        ><img src="@/static/linkedin.svg" alt="linkedin logo"
      /></a>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, useStore } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore()
    const links = [
      {
        name: 'Proclaimer',
        to: '/proclaimer',
      },
      {
        name: 'Privacy & Cookies',
        to: '/privacy',
      },
      {
        name: 'About Ordina',
        to: '/about',
      },
    ]
    return { links }
  },
})
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  max-width: 1260px;
  margin: 0 auto;
}

.footer__nav {
  display: flex;
  flex-grow: 1;
  a {
    text-decoration: none;
    color: $gray-darkest;
    margin: 1.2rem;
  }
}

.footer__logo img {
  max-width: 9rem;
  margin-right: 1.2rem;
}

.footer__social-icons {
  align-self: flex-end;
  img {
    height: 1.5rem;
  }
}

@media screen and (max-width: 48em) {
  footer,
  .footer__nav {
    flex-direction: column;
    text-align: center;
  }

  .footer__social-icons {
    align-self: center;
    margin-top: 1rem;
  }

  .footer__logo img {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
