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
          <div v-if="status === 'accepted'">
            <h6>
              <md-icon>verified_user</md-icon>
              Congratulations! Your request has been accepted by
              {{ parentInfo.parent }}
            </h6>
          </div>
          <div v-else-if="status === 'pending'">
            <h6>
              <md-icon>pending</md-icon>
              Your request is awaiting approval from
              {{ parentInfo.parent }}
            </h6>
          </div>
          <div v-else>
            <div v-if="status === 'rejected'">
              <h6>
                <md-icon>error</md-icon>
                Unfortunately, your request has been rejected by
                {{ parentInfo.parent }}
              </h6>
            </div>
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
          </div>
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
import notifyMixin from "@/mixins/notifyMixin";

export default {
  mixins: [notifyMixin],
  components: {
    Tabs,
  },
  data() {
    return {
      email: "",
      status: null,
      parentInfo: null,
    };
  },
  created() {
    this.fetchParentInfo();
  },
  methods: {
    async fetchParentInfo() {
      try {
        const response = await api.get("/api/v1/exchange/user/detail/");
        if (response.data.success) {
          this.parentInfo = response.data.data;
          if (this.parentInfo.status) {
            this.status = this.parentInfo.status;
          }
        } else {
          this.notifyVue(response.data.error, "danger", "error_outline");
        }
      } catch (error) {
        this.notifyVue(
          "An error occurred while fetching data",
          "danger",
          "error_outline"
        );
      }
    },
    submitForm() {
      api
        .post("api/v1/exchange/user/create/", {
          parent_email: this.email,
        })
        .then((response) => {
          if (response.data.success) {
            this.$emit("emailSubmitted", response.data);
            this.notifyVue(response.data.message, "success", "error_outline");
            // Reset the form
            this.email = "";
          } else {
            this.notifyVue(
              response.data.error.message,
              "danger",
              "error_outline"
            );
          }
        })
        .catch((error) => {
          this.notifyVue(error, "danger", "error_outline");
        });
    },
  },
};
</script>
