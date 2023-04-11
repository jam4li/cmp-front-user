<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100 md-xsmall-size-100 mx-auto">
      <simple-wizard>
        <template slot="header">
          <h3 class="title">Authentication</h3>
          <h5 class="category">
            This will help us verify your invitation and grant you access to the
            appropriate features.
          </h5>
        </template>

        <wizard-tab :before-change="() => validateStep('step1')">
          <template slot="label"> Email </template>
          <first-step ref="step1" @on-validated="onStepValidated"></first-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label"> Pending </template>
          <second-step
            ref="step2"
            @on-validated="onStepValidated"
          ></second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label"> Accepted </template>
          <second-step
            ref="step2"
            @on-validated="onStepValidated"
          ></second-step>
        </wizard-tab>

        <wizard-tab :before-change="() => validateStep('step2')">
          <template slot="label"> Rejected </template>
          <second-step
            ref="step2"
            @on-validated="onStepValidated"
          ></second-step>
        </wizard-tab>
      </simple-wizard>
    </div>
  </div>
</template>
<script>
import FirstStep from "./Forms/Wizard/FirstStep.vue";
import SecondStep from "./Forms/Wizard/SecondStep.vue";
import Swal from "sweetalert2";
import { SimpleWizard, WizardTab } from "@/components";

export default {
  data() {
    return {
      wizardModel: {},
    };
  },
  components: {
    FirstStep,
    SecondStep,
    SimpleWizard,
    WizardTab,
  },
  methods: {
    validateStep(ref) {
      return this.$refs[ref].validate();
    },
    onStepValidated(validated, model) {
      this.wizardModel = { ...this.wizardModel, ...model };
    },
    wizardComplete() {
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
