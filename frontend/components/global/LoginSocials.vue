<template>
  <div>
    <ul class="auth-providers">
      <li class="auth-providers__item">
        <a class="auth-providers__link" :href="loginWithGithubUrl">
          <BaseButton
            buttonType="secondary"
            class="provider-button"
            @click.prevent=""
          >
            <svg class="provider-button__svg provider-button__svg--github">
              <path
                class="provider-button__logo"
                clip-rule="evenodd"
                d="M16.003,0C7.17,0,0.008,7.162,0.008,15.997  c0,7.067,4.582,13.063,10.94,15.179c0.8,0.146,1.052-0.328,1.052-0.752c0-0.38,0.008-1.442,0-2.777  c-4.449,0.967-5.371-2.107-5.371-2.107c-0.727-1.848-1.775-2.34-1.775-2.34c-1.452-0.992,0.109-0.973,0.109-0.973  c1.605,0.113,2.451,1.649,2.451,1.649c1.427,2.443,3.743,1.737,4.654,1.329c0.146-1.034,0.56-1.739,1.017-2.139  c-3.552-0.404-7.286-1.776-7.286-7.906c0-1.747,0.623-3.174,1.646-4.292C7.28,10.464,6.73,8.837,7.602,6.634  c0,0,1.343-0.43,4.398,1.641c1.276-0.355,2.645-0.532,4.005-0.538c1.359,0.006,2.727,0.183,4.005,0.538  c3.055-2.07,4.396-1.641,4.396-1.641c0.872,2.203,0.323,3.83,0.159,4.234c1.023,1.118,1.644,2.545,1.644,4.292  c0,6.146-3.74,7.498-7.304,7.893C19.479,23.548,20,24.508,20,26c0,2,0,3.902,0,4.428c0,0.428,0.258,0.901,1.07,0.746  C27.422,29.055,32,23.062,32,15.997C32,7.162,24.838,0,16.003,0z"
                fill="#181616"
                fill-rule="evenodd"
              />
            </svg>
            <span class="provider-button__text">Login with GitHub</span>
          </BaseButton>
        </a>
      </li>
    </ul>
    <div v-if="dividerText" class="divider">
      <span class="divider__text">{{ dividerText }}</span>
    </div>
  </div>
</template>

<script>
import { useContext } from '@nuxtjs/composition-api'
export default {
  props: ['dividerText'],
  setup() {
    const { $config } = useContext()

    const loginWithGithubUrl = `${$config.strapiUrl}/connect/github`

    return { loginWithGithubUrl }
  },
}
</script>

<style lang="scss" scoped>
.auth-providers {
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  &__item {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  &__link {
    &:link,
    &:visited {
      color: inherit;
      text-decoration: none;
    }
    &:hover {
      text-decoration: none;
    }
  }
}

.divider {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &__text {
    background-color: $accelerate-blue-5;
    display: inline-block;
    padding: 0 1rem;
    z-index: 5;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: $letter-spacing;
  }

  &::before {
    content: '';
    width: 100%;
    height: 0.125rem;
    background-color: $accelerate-blue-3;
    left: 0;
    top: calc(50% - 0.0625rem);
    position: absolute;
    z-index: 3;
  }
}
.provider-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  &__text {
    display: block;
  }
  &__svg {
    margin-right: 1rem;
    &--github {
      width: 2rem;
      height: 2rem;
    }
  }
  &__logo {
    fill: $discovery-blue-primary;
  }
}
</style>
