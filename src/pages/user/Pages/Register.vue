<template>
  <div class="md-layout">
    <div class="md-layout-item">
      <div v-if="loading" class="spinner-container">
        <md-progress-spinner
          :md-diameter="40"
          :md-stroke="4"
          md-mode="indeterminate"
        >
        </md-progress-spinner>
      </div>
      <signup-card v-else>
        <h2 class="title text-center" slot="title">Register New User</h2>
        <div
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 ml-auto"
          slot="content-left"
        >
          <div class="info info-horizontal">
            <div class="description">
              <h4 class="info-title">Join CME For Free</h4>
              <p class="description">
                Unlock your financial potential and become a member of our
                thriving network. Register for free today and gain access to
                exclusive financial opportunities, expert guidance, and a
                supportive community. Take control of your financial future and
                embark on a journey towards financial success with us.
              </p>
            </div>
          </div>
        </div>
        <div
          class="md-layout-item md-size-50 md-medium-size-50 md-small-size-100 mr-auto"
          slot="content-right"
        >
          <div class="button-container">
            <md-button
              href
              class="md-success md-round mt-4"
              slot="footer"
              @click="register"
              >Register</md-button
            >
          </div>
        </div>
      </signup-card>
    </div>
  </div>
</template>
<script>
import api from "@/api.js";
import { SignupCard } from "@/components";

export default {
  components: {
    SignupCard,
  },
  mounted() {
    this.loading = false;
    this.side = this.$route.params.side;
    this.referrerCode = this.$route.params.referrer_code;
  },
  data() {
    return {
      loading: false,
      boolean: false,
      referrerCode: null,
      side: null,
    };
  },
  methods: {
    register() {
      api
        .post("api/v1/user/user/create/", {
          referrer: this.referrerCode,
          side: this.side,
        })
        .then((response) => {
          window.location.href = response.data.url;
        })
        .catch((error) => {
          logger.log(error);
          this.loading = false;
        });
    },
  },
};
</script>
<style>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
