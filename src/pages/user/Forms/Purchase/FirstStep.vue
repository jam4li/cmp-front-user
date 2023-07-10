<template>
  <form @submit.prevent="validate">
    <div>
      <h5 class="info-text">
        Indicate the token percentage for purchasing the package (maximum 50%).
      </h5>
      <div class="md-layout">
        <div class="md-layout-item md-size-100 mt-4 md-small-size-100">
          <slider v-model="sliders.simple"> </slider>
        </div>
      </div>
      <div class="md-layout">
        <label class="md-layout-item md-size-15 md-form-label">
          You will pay
        </label>
        <div class="md-layout-item md-size-5">
          <md-field>
            <md-input v-model="formattedValueString" type="text"></md-input>
          </md-field>
        </div>
        <label class="md-layout-item md-size-30 md-form-label">
          percent of the package's price in EIT.
        </label>
      </div>
    </div>
  </form>
</template>
<script>
import { Slider } from "@/components";

export default {
  components: {
    Slider,
  },
  data() {
    return {
      sliders: {
        simple: 0,
      },
    };
  },
  methods: {
    validate() {
      console.log("Validate Method For First Form");
      const data = {
        slidersSimple: this.sliders.simple,
      };
      console.log(data);
      this.$emit("on-validated", true, this.sliders.simple);
      return Promise.resolve(true);
    },
  },
  computed: {
    formattedValue() {
      return Math.floor(this.sliders.simple); // or parseInt(this.sliders.simple, 10);
    },
    formattedValueString: {
      get() {
        return this.formattedValue.toString();
      },
      set(value) {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue)) {
          this.sliders.simple = parsedValue;
        }
      },
    },
  },
  watch: {
    formattedValue(newValue) {
      this.formattedValueString = newValue.toString();
    },
  },
};
</script>
<style></style>
