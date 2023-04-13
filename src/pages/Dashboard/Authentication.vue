<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100 md-xsmall-size-100 mx-auto">
      <simple-wizard>
        <template slot="header">
          <h3 class="title">{{ $t("authentication.title") }}</h3>
          <h5 class="category">
            {{ $t("authentication.subtitle") }}
          </h5>
        </template>

        <wizard-tab>
          <template slot="label"> Email </template>
          <first-step ref="step1"></first-step>
        </wizard-tab>

        <wizard-tab>
          <template slot="label"> Pending </template>
          <second-step ref="step2"></second-step>
        </wizard-tab>

        <wizard-tab>
          <template slot="label"> Accepted </template>
          <second-step ref="step2"></second-step>
        </wizard-tab>

        <wizard-tab>
          <template slot="label"> Rejected </template>
          <second-step ref="step2"></second-step>
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
  methods: {},
};
</script>
