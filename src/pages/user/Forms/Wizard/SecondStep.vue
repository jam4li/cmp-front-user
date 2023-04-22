<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <h5 class="info-text">
          Please enter the email address of the person who invited you to our
          site.
        </h5>
        <div class="md-layout">
          <div class="md-layout-item md-size-50 mt-4 md-small-size-100"></div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>

<style></style>
