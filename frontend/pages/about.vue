<template>
  <BasePageLayout>
    <BaseContainer>
      <h1>About Us</h1>
      <p>
        To The Root is an open community for software developers that welcomes
        everyone who is looking to grow and contribute. We're all about the
        latest insights from people working in the field, about cool events
        where we can bang our tech-heads together and about contributing, to
        each other, to open-source technology and to the world. Here you'll find
        inspiration to become a better software developer guided by articles,
        videos, events for peers from peers. So please have a look around. And,
        if you feel at home, don't hesitate to join our mission!
      </p>
      <p>To The Root was founded in 2022 by Ordina Software development.</p>
      <BaseButton buttonType="primary"
        ><a href="#about__contribute">How to Contribute</a></BaseButton
      >
    </BaseContainer>
    <BaseContainer>
      <h2>Our Mission</h2>
      <p>
        Technology, more than any other science, is a field of cooperation. Not
        only do we do better work together, we wouldn't even have a field if it
        wasn't for giants like Nicola Tesla, Alan Turing and Tim Berners-Lee.
        That is what To The Root is all about. It's about appreciating the
        shoulders we stand on, and, in all modesty, trying to be the shoulders
        for the next generation. Not only do we share our best ideas, we go to
        work on them. So if you are looking to join a community that is on a
        mission to make a difference - you can to the right place.
      </p>
      <BaseButton buttonType="primary">How to Contribute</BaseButton>
      <BaseButton buttonType="secondary"
        ><a href="/signup">Join us Now</a></BaseButton
      >
    </BaseContainer>
    <BaseContainer id="about__contribute">
      <h2>How to Contribute</h2>

      <h3>Share your thoughts</h3>
      <p>
        Anyone can start contributing to the community by sharing with the
        community. So, do you know stuff that could help others? And are you
        ready to sharing? <a href="/contact">Get in touch</a> with our
        organization and we will be more than happy to help you on your way to
        start contributing on To The Root!
      </p>
      <p>More about <a href="#">writing articles</a></p>
      <p>More about <a href="#">creating videos</a></p>

      <h3>Join our Discord community</h3>
      <p>
        Looking to connect to like-minded professionals? Our in our Discord
        community you'll find them! It is the place where we meet and talk about
        tech, our dreams to change the world and anything else that interest us.
        So come and <a href="#">have a look</a> at our Discord community! See
        you there.
      </p>

      <h3>Contribute to Open Source</h3>
      <p>
        We regularly hold Mob Programming sessions to make contributions to Open
        Source technology. We do so by picking up issues and request from the
        Open Source communities and, where possible, we work closely together
        with the respective organisations. Are you interested in joining a To
        The Root Mobbing session for Open Source? <a href="#">Join us</a> now!
      </p>
      <p>More about <a href="#">Mob Programming</a></p>
      <p>More about <a href="#">contributing to Open Source</a></p>
      <p>
        As you can see, there is lots to do! So please join us now, the world is
        big and technology is huge, so we need your shoulders too.
      </p>
    </BaseContainer>
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
  margin: 1rem 0;
}
</style>
