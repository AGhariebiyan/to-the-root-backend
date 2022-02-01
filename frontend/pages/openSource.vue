<template>
  <BasePageLayout>
    <div class="oops-wrapper">
      <div class="wrapper">
        <h1>Contribute to Open Source</h1>

        <p>
          If you're interested in contributing to Open Source as much as we are,
          make sure to leave your email and we'll keep you updated about our
          community!
        </p>

        <MailingListForm interest="Contribute (Open Source)" />
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
