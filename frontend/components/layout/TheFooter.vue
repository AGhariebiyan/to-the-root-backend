<template>
  <footer class="footer">
    <div class="wrapper">
      <div class="footer__columns">
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
              >Code of conduct</NuxtLink
            >
            <NuxtLink to="/privacy" class="column__link">Privacy</NuxtLink>
          </nav>
        </div>
      </div>
      <span id="copyright"> © {{ currentYear }} Ordina </span>
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
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
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
  display: flex;
  flex-direction: column;
}

.footer {
  background-color: $gray-darker;
  color: $gray-lighter;
  padding: 5rem 0 2rem;
  height: auto;

  &__columns {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5rem;

    @media (max-width: $max-width-tablet) {
      justify-content: space-between;
      margin-bottom: 1rem;
    }

    .column {
      margin-bottom: 2rem;
      margin-right: 17.5rem;

      @media (max-width: $max-width-tablet) {
        margin-right: unset;
      }

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
        color: $gray-lighter;
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

  #copyright {
    align-self: center;
  }

  @media (max-width: $max-width-phone) {
    &__columns {
      flex-direction: column;
      align-items: center;
      text-align: center;

      .column {
        margin-bottom: 2.5rem;
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
