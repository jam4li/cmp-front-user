<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-size-66 md-small-size-90 md-xsmall-size-95 mx-auto"
    >
      <simple-purchase>
        <template slot="header">
          <h3 class="title">Purchase a package</h3>
          <h5 class="category">
            Buy a package with ease, just follow the steps.
          </h5>
        </template>

        <purchase-tab :before-change="() => validateStep('step1')">
          <template slot="label"> TOKEN </template>
          <first-step
            ref="step1"
            @on-validated="onFirstStepValidated"
          ></first-step>
        </purchase-tab>

        <purchase-tab :before-change="() => validateStep('step2')">
          <template slot="label"> Inovice </template>
          <second-step
            ref="step2"
            @on-validated="onSecondStepValidated"
            :purchase-data="purchaseCalculatedData"
          ></second-step>
        </purchase-tab>

        <purchase-tab :before-change="() => validateStep('step3')">
          <template slot="label"> CONFIRMATION </template>
          <third-step ref="step3" @on-validated="purchaseComplete"></third-step>
        </purchase-tab>
      </simple-purchase>
    </div>
  </div>
</template>
<script>
import FirstStep from "./Purchase/FirstStep.vue";
import SecondStep from "./Purchase/SecondStep.vue";
import ThirdStep from "./Purchase/ThirdStep.vue";
import api from "@/api.js";
import Swal from "sweetalert2";
import { SimplePurchase, PurchaseTab } from "@/components";

export default {
  data() {
    return {
      purchaseModel: {},
      packageId: null,
      sliderValue: 0,
      purchaseCalculatedData: {},
      tether_amount: null,
      token_amount: null,
    };
  },
  created() {
    this.packageId = this.$route.params.packageId;
  },
  components: {
    FirstStep,
    SecondStep,
    ThirdStep,
    SimplePurchase,
    PurchaseTab,
  },
  methods: {
    validateStep(ref) {
      console.log("Validate Step");
      return this.$refs[ref].validate();
    },
    onFirstStepValidated(validated, slider) {
      this.slider = slider;

      api
        .post(`api/v1/purchase/user/calculate/`, {
          package: this.packageId,
          percent: this.slider,
        })
        .then((response) => {
          if (response.data.success) {
            this.purchaseCalculatedData = response.data.data;
            this.token_amount = this.purchaseCalculatedData.token_amount;
            this.tether_amount =
              this.purchaseCalculatedData.tether_amount +
              this.purchaseCalculatedData.fee;
            alert(response.data.message);
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again.");
        });
    },
    onSecondStepValidated(validated) {
      api
        .post(`api/v1/trc20/user/create/`, {
          package: this.packageId,
          tether_amount: this.tether_amount,
          token_amount: this.token_amount,
        })
        .then((response) => {
          if (response.data.success) {
            const gateway_url = response.data.data.gateway_url;
            window.location.href = gateway_url;
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again.");
        });
    },
    purchaseComplete() {
      Swal.fire({
        title: "Good job!",
        text: "You clicked the finish button!",
        type: "success",
        confirmButtonClass: "md-button md-success",
        buttonsStyling: false,
      });
    },
  },
};
</script>
