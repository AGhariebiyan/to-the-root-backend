<template>
  <BasePageLayout>
    <div class="oops-wrapper">
      <div class="wrapper">
        <h1>Join our Discord</h1>

        <p>
          We're still working on the server. We can let you know as soon as it's
          ready if you leave your email.
        </p>

        <MailingListForm interest="Join Discord" />
      </div>
    </div>
  </BasePageLayout>
</template>

<style lang="scss" scoped>
.oops-wrapper {
  background: linear-gradient(
      0deg,
      rgba($accelerate-blue-primary, 0.5),
      rgba($accelerate-blue-primary, 0.5)
    ),
    url('https://images.unsplash.com/photo-1480506132288-68f7705954bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2420&q=80');
  background-size: cover;
  height: 100vh;
}

.wrapper {
  background: $accelerate-blue-primary;
  max-width: 630px;
  margin: 150px auto 0;
  padding: 50px;
  text-align: center;
  color: $white;

  p {
    padding: 30px 0;
  }
}
</style>
