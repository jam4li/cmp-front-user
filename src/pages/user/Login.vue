<template>
  <v-container fluid class="bg-custom">
    <v-row justify="center" class="d-flex">
      <v-col cols="12" md="10" lg="8" xl="6">
        <v-card theme="dark">
          <v-card-title class="text-center"> Terms And Conditions</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-virtual-scroll :height="300" :items="rules" class="pa-5">
              <template v-slot:default="{ item }">
                <h3>{{ item.title }}</h3>
                <p class="description">
                  {{ item.description }}
                </p>
                <br />
              </template>
            </v-virtual-scroll>
            <v-checkbox v-model="checkbox" color="success">
              <template v-slot:label>
                <div>I agree to the Terms And Conditions.</div>
              </template>
            </v-checkbox>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="loading"
              :loading="loading"
              class="text-none mb-4"
              color="success"
              size="x-large"
              variant="flat"
              @click="loading = !loading"
            >
              Get Started
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/api";
import logger from "@/logger";
export default {
  components: {},
  methods: {
    redirectToGmailLogin() {
      this.loading = true;
      api
        .get("/api/v1/auth/user/google-url")
        .then((response) => {
          window.location.href = response.data.url;
        })
        .catch((error) => {
          logger.log(error);
          this.loading = false;
        });
    },
  },
  mounted() {
    this.loading = false;
  },
  watch: {
    loading(val) {
      if (!val) return;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
  data() {
    return {
      loading: false,
      boolean: false,
      checkbox: false,
      rules: [
        {
          colorIcon: "icon-info",
          icon: "feed",
          title: "01. General Sentences",
          description:
            "1.1. To register on the company website and become an investor, one must be at least 18 years of age at the time of registration. 1.2 The user automatically receives the investor status immediately after registering on the website and accepting all the terms of the agreement, and invests at his own discretion. 1.3 If the User disagrees with any of the provisions of this Agreement or is in doubt about certain matters - the registration must be terminated. And if he invests or does what he wants. 1.4. All financial transactions made through the Company's Website are confidential and will not be disclosed to third parties. An investor is only given the opportunity to make financial transactions and use other services of the company after registering on the website.",
        },
        {
          colorIcon: "icon-info",
          icon: "apartment",
          title: "02. Corporate Rights and Duties",
          description:
            "2.1. The company is committed to using investor funds for its intended purpose and to drive real activity in the Forex market. Do the robot and wherever he likes. 2.2. The company guarantees investor budget security for the profits it owns and commits to timely depositing and withdrawing profits, except in exceptional cases. Corporate profit is 0.5 to 1%. 2.3 The Company is not responsible for any technical defects in electronic payment systems. Financial transactions associated with depositing and withdrawing funds into electronic payment systems account are irreversible and final. 2.4 Cloudminepro does not assume responsibility for incorrect transactions with funds and inaccurate financial accounts. 2.5. The company is responsible for maintaining the confidentiality of personal information provided by the investor.",
        },
        {
          colorIcon: "icon-info",
          icon: "contact_page",
          title: "03. Investor Rights and Duties",
          description:
            "3.1 The investor, in filling in the registration form, is personally responsible for the accuracy of the information provided and if the information is incorrect, it is the investor's responsibility. 3.2 The investor is obliged to check each transaction in its financial account. If any uncertainty or disagreement is identified, the investor can request support from cloudminepro support. 3.3 All services provided by the Company are used solely for the purpose of investing by the investor. 3.4 The Investor agrees to the processing of personal information in accordance with the provisions of the law.",
        },
        {
          colorIcon: "icon-info",
          icon: "emergency",
          title: "04. Risk Reduction",
          description:
            "4.1 The Company minimizes the risks of conducting operations in the foreign exchange market. In addition, the risks associated with using an Internet-based trading transaction system include risks associated with possible hardware or software failures.",
        },
        {
          colorIcon: "icon-info",
          icon: "copyright",
          title: "05. Copyright Notice",
          description:
            "5.1. The cloudminepro.com website (www.cloudminepro.com), all hosted information and services are proprietary to the company and are protected by copyright. 5.2 An investor will be prosecuted for copyright infringement (damaging the website, copying content, etc.). His account will be frozen with funds in his personal account.",
        },
        {
          colorIcon: "icon-info",
          icon: "block",
          title: "06. Indescribable Resistance Cycles",
          description:
            "6.1. Important note: For the duration of the indivisible force conditions (changes in laws, disasters, military status, etc.); the Company has the right to suspend its operations indefinitely. Such conditions cannot be affected by the company and the investor. 6.2. The circumstances of inseparable force imply the impossibility to carry out any transactions and financial transactions in standard mode.",
        },
        {
          colorIcon: "icon-info",
          icon: "post_add",
          title: "07. Introduction of amendments and additions",
          description:
            "7.1. Applicable rules and the terms of the agreement can be reviewed by the project administration. 7.2. The administration has the right to make changes and additions at any time. Additions and changes are published in this section and shall take effect immediately after their announcement. 7.3. In order to be aware of possible changes, we encourage you to periodically review this section.",
        },
        {
          colorIcon: "icon-info",
          icon: "cancel",
          title: "08. Termination of the cooperation",
          description:
            "8.1. Termination of the cooperation between the Company and the Investor may be initiated by either side. 8.2. The Company has the right to unilaterally terminate the cooperation with the Investor in case of violation of terms and conditions of the agreement. 8.3. The Investor can terminate the agreement if they decide to cease their investment activities in the Company.",
        },
        {
          colorIcon: "icon-info",
          icon: "forum",
          title: "09. The scheme of arrangement",
          description:
            "9.1. Conflict resolution between the Company and the Investor shall be held in the format of negotiations or in accordance.",
        },
      ],
    };
  },
};
</script>
<style>
.bg-custom {
  background: url("../../../public/img/lock.jpg");
  background-size: cover;
  height: 100vh;
}
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
</style>
