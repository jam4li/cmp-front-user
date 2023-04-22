<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100 md-medium-size-100">
      <tabs
        :tab-name="['Email', 'Pending', 'Accepted', 'Rejected']"
        color-button="info"
      >
        <h4 class="title" slot="header-title">
          {{ $t("authentication.title") }} -
          <small class="description">{{ $t("authentication.subtitle") }}</small>
        </h4>

        <!-- here you can add your content for tab-content -->
        <template slot="tab-pane-1">
          <form class="form-horizontal" @submit.prevent="submitForm">
            <div class="md-layout">
              <label class="md-layout-item md-size-25 md-form-label">
                Email
              </label>
              <div class="md-layout-item md-size-75">
                <md-field>
                  <label>Enter Email</label>
                  <md-input v-model="email" type="email"></md-input>
                </md-field>
              </div>
            </div>

            <md-card-actions md-alignment="left">
              <md-button type="submit" class="md-success">Submit</md-button>
            </md-card-actions>
          </form>
        </template>

        <template slot="tab-pane-2"> </template>

        <template slot="tab-pane-3"> </template>
      </tabs>
    </div>
  </div>
</template>
<script>
import api from "@/api.js";
import { Tabs } from "@/components";

export default {
  components: {
    Tabs,
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitForm() {
      api
        .post("api/v1/exchange/user/create/", {
          parent_email: this.email,
        })
        .then((response) => {
          if (response.data.success) {
            this.$emit("emailSubmitted", response.data);
            alert(response.data.message);
            // Reset the form
            this.email = "";
          } else {
            alert(response.data);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again.");
        });
    },
  },
};
</script>
