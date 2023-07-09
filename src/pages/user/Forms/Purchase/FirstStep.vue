<template>
  <ValidationObserver ref="form">
    <form>
      <div>
        <h5 class="info-text">
          Indicate the token percentage for purchasing the package (maximum
          50%).
        </h5>
        <div class="md-layout">
          <div class="md-layout-item md-size-100 mt-4 md-small-size-100">
            <slider v-model="sliders.simple"> </slider>
            <!-- <ValidationProvider
              name="email"
              rules="required|email"
              v-slot="{ passed, failed }"
            >
              <md-field
                :class="[
                  { 'md-error': failed },
                  { 'md-valid': passed },
                  { 'md-form-group': true },
                ]"
              >
                <md-icon>email</md-icon>
                <label>Email</label>
                <md-input v-model="email" type="text"> </md-input>

                <slide-y-down-transition>
                  <md-icon class="error" v-show="failed">close</md-icon>
                </slide-y-down-transition>
                <slide-y-down-transition>
                  <md-icon class="success" v-show="passed">done</md-icon>
                </slide-y-down-transition>
              </md-field>
            </ValidationProvider> -->
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
  </ValidationObserver>
</template>
<script>
// import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { Slider } from "@/components";

extend("required", required);
extend("email", email);

export default {
  components: {
    // SlideYDownTransition,
    Slider,
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png",
    },
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
      return this.$refs.form.validate().then((res) => {
        this.$emit("on-validated", res);
        return res;
      });
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
