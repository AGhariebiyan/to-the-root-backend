<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__columns">
        <div class="column">
          <div class="column__header">Socials</div>
          <nav class="column__links--socials">
            <a class="column__link" href="https://www.facebook.com/ordina/"
              ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path
                  d="M15 4.129h-2.856c-.338 0-.715.444-.715 1.039V7.23H15v2.94h-3.571V19H8.057v-8.829H5V7.23h3.057V5.5c0-2.481 1.722-4.5 4.086-4.5H15v3.129z"
                  fill="currentColor"
                /></svg
            ></a>
            <a
              class="column__link"
              href="https://www.linkedin.com/company/ordina/"
              ><svg width="18" height="17" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.963 10.42v6.562h-3.85V10.86c0-1.538-.557-2.588-1.95-2.588-1.064 0-1.697.708-1.976 1.392-.101.245-.128.585-.128.927v6.39H6.208s.052-10.368 0-11.442h3.851v1.622l-.025.037h.025v-.037c.512-.779 1.425-1.89 3.47-1.89 2.535 0 4.434 1.635 4.434 5.15zM2.18.023C.862.023 0 .877 0 2c0 1.098.837 1.978 2.128 1.978h.026c1.343 0 2.178-.88 2.178-1.978C4.307.877 3.497.023 2.18.023zM.23 16.982h3.85V5.539H.229v11.443z"
                  fill="currentColor"
                /></svg
            ></a>
          </nav>
        </div>
        <div class="column">
          <div class="column__header">Organisation</div>
          <nav class="column__links">
            <NuxtLink to="/contact" class="column__link">Contact</NuxtLink>
            <NuxtLink to="/about" class="column__link">About us</NuxtLink>
            <NuxtLink to="/discord" class="column__link"
              >Join our Discord</NuxtLink
            >
          </nav>
        </div>
        <div class="column">
          <div class="column__header">Terms & Policies</div>
          <nav class="column__links">
            <NuxtLink to="/cookie-policy" class="column__link"
              >Cookie Policy</NuxtLink
            >
            <NuxtLink to="/privacy" class="column__link">Privacy</NuxtLink>
          </nav>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="ordina-legal">© 2022 Ordina NV</div>
        <button class="footer__nav-link" @click="showCookieModal = true">
          Cookies
        </button>
      </div>
    </div>
    <CookieModal v-if="showCookieModal" @close="showCookieModal = false" />
  </footer>
</template>

<script lang="ts">
import {
  defineComponent,
  useContext,
  onMounted,
  ref,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const context: any = useContext()
    const { $gtm, $cookies } = context

    const showCookieModal = ref()

    onMounted(async () => {
      try {
        if (!$cookies.get('allowsCookies')) {
          showCookieModal.value = true
        } else {
          $gtm.init()
        }
      } catch (err) {
        console.log(err)
      }
    })

    return { showCookieModal }
  },
})
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 0 2rem;
  max-width: $desktop-max-width;
  margin: 0 auto;
}

.footer {
  background-color: $gray-darker;
  color: $gray-lightest;
  padding: 5rem 0 2rem;

  &__columns {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .column {
      margin-bottom: 2rem;

      &__header {
        font-family: 'Poppins-Bold';
        margin-bottom: 0.9rem;
        font-size: 1.1rem;
      }

      &__links {
        display: flex;
        flex-direction: column;
      }

      &__link {
        font-size: 0.9rem;
        color: $gray-lightest;
        text-decoration: none;

        &:hover,
        &:focus {
          cursor: pointer;
          color: $ordina-orange;
        }
      }
    }
  }

  &__bottom {
    margin-top: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .ordina-legal {
      font-size: 0.7rem;
    }
  }

  @media (max-width: $max-width-phone) {
    &__columns {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .column:not(:last-child) {
        margin-bottom: 4rem;
      }
    }

    &__bottom {
      justify-content: center;
    }
  }
}

.footer__nav {
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

.footer__nav-link {
  text-decoration: none;
  color: $gray;
  margin: 1.2rem;
  background: transparent;
  outline: none;
  border: none;

  &:hover,
  &:focus {
    cursor: pointer;
    color: $ordina-orange;
  }
}
</style>
