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

        <purchase-tab>
          <template slot="label"> TOKEN </template>
          <first-step ref="step1" @on-validated="onStepValidated"></first-step>
        </purchase-tab>

        <purchase-tab :before-change="() => validateStep('step2')">
          <template slot="label"> Inovice </template>
          <second-step
            ref="step2"
            @on-validated="onStepValidated"
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
import Swal from "sweetalert2";
import { SimplePurchase, PurchaseTab } from "@/components";

export default {
  data() {
    return {
      purchaseModel: {},
    };
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
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.purchaseModel = { ...this.purchaseModel, ...model };
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
