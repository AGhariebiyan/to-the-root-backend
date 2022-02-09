<template>
  <footer class="footer">
    <div class="footer__content">
      <a class="footer__logo" href="https://www.ordina.nl/" target="_blank">
        <img src="@/assets/Logo_pay-off_cmyk1.svg" />
      </a>
      <nav class="footer__nav">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.to"
          class="footer__nav-link"
          >{{ link.name }}</NuxtLink
        >
        <a class="footer__nav-link" @click="showCookieModal = true">
          Cookies
        </a>
      </nav>
      <div class="footer__social-icons">
        <a class="footer__social-link" href="https://www.facebook.com/ordina/"
          ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <path
              d="M15 4.129h-2.856c-.338 0-.715.444-.715 1.039V7.23H15v2.94h-3.571V19H8.057v-8.829H5V7.23h3.057V5.5c0-2.481 1.722-4.5 4.086-4.5H15v3.129z"
              fill="#333"
            /></svg
        ></a>
        <a
          class="footer__social-link"
          href="https://www.linkedin.com/company/ordina/"
          ><svg width="18" height="17" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.963 10.42v6.562h-3.85V10.86c0-1.538-.557-2.588-1.95-2.588-1.064 0-1.697.708-1.976 1.392-.101.245-.128.585-.128.927v6.39H6.208s.052-10.368 0-11.442h3.851v1.622l-.025.037h.025v-.037c.512-.779 1.425-1.89 3.47-1.89 2.535 0 4.434 1.635 4.434 5.15zM2.18.023C.862.023 0 .877 0 2c0 1.098.837 1.978 2.128 1.978h.026c1.343 0 2.178-.88 2.178-1.978C4.307.877 3.497.023 2.18.023zM.23 16.982h3.85V5.539H.229v11.443z"
              fill="#333"
            /></svg
        ></a>
      </div>
    </div>
    <CookieModal v-if="showCookieModal" @close="showCookieModal = false" />
  </footer>
</template>

<script lang="ts">
import { onAnalyticsReady } from 'vue-analytics'
import {
  defineComponent,
  useContext,
  onMounted,
  computed,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
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
        name: 'About Us',
        to: '/about',
      },
    ]

    const context: any = useContext()
    const { $auth, $ga, $cookies } = context

    const showCookieModal = ref()

    onMounted(async () => {
      try {
        await onAnalyticsReady().then(() => {
          if (!$cookies.get('allowsCookies')) {
            showCookieModal.value = true
            return
          } else {
            $ga.enable()
          }
        })
      } catch (err) {
        console.log(err)
      }
    })

    return { showCookieModal, links }
  },
})
</script>

<style lang="scss" scoped>
.footer {
  background-color: $gray-light;
  padding: 1rem;
}

.footer__content {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: $nav-max-width;
  margin: 0 auto;
}

.footer__nav {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

.footer__nav-link {
  text-decoration: none;
  color: $gray-darkest;
  margin: 1.2rem;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.footer__logo img {
  max-width: 9rem;
  margin-right: 1.2rem;
  align-self: flex-start;
}

.footer__social-icons {
  flex-grow: 1;
  max-width: 9rem;
  display: flex;
  justify-content: flex-end;
}

.footer__social-link:not(:last-child) {
  margin-right: 1rem;
}

.footer__social-link:hover svg path {
  fill: $discovery-blue-primary;
}

@include respond(tab-portrait) {
  .footer,
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

@media only screen and (max-width: 54.5em) {
  .footer__logo {
    display: none;
  }

  .footer__content {
    flex-direction: column;
  }
}
</style>
