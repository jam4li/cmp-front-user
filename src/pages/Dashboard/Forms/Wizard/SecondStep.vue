<template>
  <ValidationObserver ref="form">
    <form @submit.prevent="validate">
      <div>
        <h5 class="info-text">
          Please enter the email address of the person who invited you to our
          site.
        </h5>
        <div class="md-layout">
          <div class="md-layout-item md-size-50 mt-4 md-small-size-100">
            <ValidationProvider
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
            </ValidationProvider>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
import { SlideYDownTransition } from "vue2-transitions";
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("required", required);
extend("email", email);

export default {
  components: {
    SlideYDownTransition,
  },
  props: {
    avatar: {
      type: String,
      default: "./img/default-avatar.png",
    },
  },
  data() {
    return {
      image: "",
      firstName: "",
      lastName: "",
      email: "",
    };
  },
  methods: {
    handlePreview(file) {
      this.model.imageUrl = URL.createObjectURL(file.raw);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    validate() {
      return this.$refs.form.validate().then((res) => {
        this.$emit("on-validated", res);
        return res;
      });
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>
<style></style>
