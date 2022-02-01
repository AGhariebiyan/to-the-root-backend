<template>
  <BasePageLayout>
    <section class="about-us__wrapper">
      <div class="wrapper">
        <div class="about-us__content">
          <h1 class="about-us__header">About Us</h1>
          <p class="about-us__paragraph">
            To The Root is an open community for software developers that
            welcomes everyone who is looking to grow and contribute. We're all
            about the latest insights from people working in the field, about
            cool events where we can bang our tech-heads together and about
            contributing, to each other, to open-source technology and to the
            world. Here you'll find inspiration to become a better software
            developer guided by articles, videos, events for peers from peers.
            So please have a look around. And, if you feel at home, don't
            hesitate to join our mission!
          </p>
          <p class="about-us__founded-text">
            To The Root was founded in 2022 by Ordina Software development.
          </p>
          <a class="about-us__action-button new-button" href="#contribute"
            >How to Contribute</a
          >
        </div>
      </div>
    </section>

    <div class="wrapper">
      <section class="people">
        <h2 class="people__header">Say Hello!</h2>
        <h3 class="people__sub-header">To the creators of To The Root:</h3>
        <div class="people__people-container">
          <div class="people__people-item">
            <img
              src="https://www.vdeplant.nl/wp-content/uploads/2020/07/Philodendron-White-Wave-1-1-480x480.jpg"
              alt=""
            />
            <p>Menno Wielhouwer</p>
            <a
              class="people__link"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              >Git</a
            >
          </div>
          <div class="people__people-item">
            <img
              src="https://www.vdeplant.nl/wp-content/uploads/2020/07/Philodendron-White-Wave-1-1-480x480.jpg"
              alt=""
            />
            <p>Joran Minjon</p>
            <a
              class="people__link"
              href="https://github.com/DrKlonk"
              target="_blank"
              rel="noopener noreferrer"
              >Git</a
            >
          </div>
          <div class="people__people-item">
            <img
              src="https://www.vdeplant.nl/wp-content/uploads/2020/07/Philodendron-White-Wave-1-1-480x480.jpg"
              alt=""
            />
            <p>Dennis van Oosten</p>
            <a
              class="people__link"
              href="https://github.com/dennis-ordina"
              target="_blank"
              rel="noopener noreferrer"
              >Git</a
            >
          </div>
          <div class="people__people-item">
            <img
              src="https://www.vdeplant.nl/wp-content/uploads/2020/07/Philodendron-White-Wave-1-1-480x480.jpg"
              alt=""
            />
            <p>Cindy Davids</p>
            <a
              class="people__link"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              >Git</a
            >
          </div>
          <div class="people__people-item">
            <img
              src="https://www.vdeplant.nl/wp-content/uploads/2020/07/Philodendron-White-Wave-1-1-480x480.jpg"
              alt=""
            />
            <p>Jolissa Latour</p>
            <a
              class="people__link"
              href="https://github.com/Jolissa1"
              target="_blank"
              rel="noopener noreferrer"
              >Git</a
            >
          </div>
        </div>
      </section>
    </div>

    <section class="mission__wrapper">
      <div class="wrapper">
        <div class="mission__content">
          <h2 class="mission__header">Our Mission</h2>
          <p class="mission__paragraph">
            Technology, more than any other science, is a field of cooperation.
            Not only do we do better work together, we wouldn't even have a
            field if it wasn't for giants like Nicola Tesla, Alan Turing and Tim
            Berners-Lee. That is what To The Root is all about. It's about
            appreciating the shoulders we stand on, and, in all modesty, trying
            to be the shoulders for the next generation. Not only do we share
            our best ideas, we go to work on them. So if you are looking to join
            a community that is on a mission to make a difference - you can to
            the right place.
          </p>
          <div class="side-by-side-buttons">
            <a class="new-button" href="#contribute">How to Contribute</a>
            <a class="new-button" href="/signup">Join us Now</a>
          </div>
        </div>
      </div>
    </section>

    <div class="wrapper">
      <section id="contribute" class="contribute">
        <h2 class="contribute__header">How to Contribute</h2>

        <div class="contribute__section thoughts">
          <h3 class="contribute__sub-header">Share your thoughts</h3>
          <p class="contribute__paragraph">
            Anyone can start contributing to the community by sharing with the
            community. So, do you know stuff that could help others? And are you
            ready to sharing? Get in touch with our organization and we will be
            more than happy to help you on your way to start contributing on To
            The Root!
          </p>
          <div class="side-by-side-buttons">
            <a class="new-button" href="/contact">Get in touch</a>
            <a class="new-button" href="/produceContent"
              >More on contributing</a
            >
          </div>
        </div>

        <div class="contribute__section discord">
          <h3 class="contribute__sub-header">Join our Discord community</h3>
          <p class="contribute__paragraph">
            Looking to connect to like-minded professionals? Our in our Discord
            community you'll find them! It is the place where we meet and talk
            about tech, our dreams to change the world and anything else that
            interest us. So come and have a look at our Discord community! See
            you there.
          </p>
          <a class="new-button" href="/discord">Join our Discord community</a>
        </div>

        <div class="contribute__section open-source">
          <h3 class="contribute__sub-header">Contribute to Open Source</h3>
          <p class="contribute__paragraph">
            We regularly hold Mob Programming sessions to make contributions to
            Open Source technology. We do so by picking up issues and request
            from the Open Source communities and, where possible, we work
            closely together with the respective organisations. Are you
            interested in joining a To The Root Mobbing session for Open Source?
          </p>
          <div class="side-by-side-buttons">
            <a class="new-button" href="/discord">Mob Programming on Discord</a>
            <a class="new-button" href="/openSource"
              >Contribute to Open Source</a
            >
          </div>
        </div>

        <div class="contribute__section closing-text">
          <p>
            As you can see, there is lots to do! So please join us now, the
            world is big and technology is huge, so we need your shoulders too.
          </p>
        </div>
      </section>
    </div>
  </BasePageLayout>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

<style lang="scss" scoped>
p {
  line-height: 1.4rem;
}

.wrapper {
  max-width: 630px;
  margin: 0 auto;
}

.about-us {
  &__wrapper {
    background: linear-gradient(
        0deg,
        rgba($accelerate-blue-primary, 0.5),
        rgba($accelerate-blue-primary, 0.5)
      ),
      url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    padding: 100px 0;
  }

  &__content {
    background-color: $accelerate-blue-primary;
    padding: 40px;
    color: white;
    display: flex;
    flex-direction: column;
  }

  &__header {
    font-size: 5rem;
    margin-bottom: 30px;
    text-align: center;
  }

  &__paragraph {
    margin-bottom: 20px;
  }

  &__founded-text {
    margin-bottom: 40px;
  }

  &__action-button {
    margin: 0 auto;
  }
}

.people {
  margin-top: 100px;
  text-align: center;

  &__header {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  &__sub-header {
    font-size: 1.3rem;
    margin-bottom: 20px;
  }

  &__people-container {
    margin-top: 60px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  &__people-item {
    border-radius: 10px;
    box-shadow: 5px 3px 10px $gray-dark;

    width: 40%;
    min-width: 200px;
    padding: 30px 10px 40px;
    margin-bottom: 50px;
    text-align: center;

    img {
      margin: 0 auto;
      display: block;
      max-width: 70%;
    }

    p {
      margin-top: 10px;
      font-weight: bold;
    }

    a {
      margin-top: 7px;
      display: block;
    }
  }

  &__link {
    color: $ordina-orange;
    text-decoration: none;

    &:active,
    &:hover {
      color: $ordina-orange-hover;
      text-decoration: underline;
    }
  }
}

.mission {
  &__wrapper {
    margin: 50px 0 80px;
    background: linear-gradient(
        0deg,
        rgba($accelerate-blue-primary, 0.5),
        rgba($accelerate-blue-primary, 0.5)
      ),
      url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80');
    background-size: cover;
    padding: 70px 0;
  }

  &__content {
    background-color: $accelerate-blue-primary;
    padding: 40px;
    color: white;
    display: flex;
    flex-direction: column;
  }

  &__header {
    font-size: 3rem;
    margin-bottom: 40px;
    text-align: center;
  }

  &__paragraph {
    margin-bottom: 40px;
  }
}

.contribute {
  text-align: center;

  &__header {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  &__sub-header {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }

  &__section {
    margin: 75px 0 120px;
  }

  &__paragraph {
    margin-bottom: 30px;
  }
}

.side-by-side-buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  a {
    margin: 5px 10px;
  }
}

@media (max-width: 500px) {
  .about-us {
    &__wrapper {
      padding: 0;
    }

    &__content {
      padding: 40px 30px;
    }

    &__header {
      font-size: 3rem;
    }
  }

  .mission {
    &__wrapper {
      padding: 0;
    }

    &__content {
      padding: 40px 30px;
    }

    &__header {
      font-size: 3rem;
    }
  }

  .contribute {
    padding: 40px 30px;
  }
}
</style>
