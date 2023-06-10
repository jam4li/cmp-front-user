<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("authentication.title") }}</h3>
      <p class="category">
        {{ $t("authentication.subtitle") }}
      </p>
      <h6 class="category text-success" v-if="status === 'accepted'">
        <md-icon class="text-success">verified_user</md-icon>
        Congratulations! Your request has been accepted by
        {{ parentInfo.parent }}
      </h6>
      <h6 class="category text-info" v-else-if="status === 'pending'">
        <md-icon class="text-info">hourglass_empty</md-icon>
        Your request is awaiting approval from
        {{ parentInfo.parent }}
      </h6>
      <p class="category text-danger" v-else-if="status === 'rejected'">
        <md-icon class="text-danger">cancel</md-icon>
        Your request is awaiting approval from
        {{ parentInfo.parent }}
      </p>
    </div>

    <div class="md-layout" v-if="status === 'accepted'">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>pending</md-icon>
            </div>
            <h4 class="title">{{ $t("authentication.pending.title") }}</h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="pendingTable" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Actions">
                  <md-button
                    class="md-success md-just-icon md-round"
                    @click.native="showSwal('accept', item.accept_url)"
                  >
                    <md-icon>check</md-icon></md-button
                  >
                  <md-button
                    class="md-danger md-just-icon md-round"
                    @click.native="showSwal('reject', item.reject_url)"
                  >
                    <md-icon>close</md-icon></md-button
                  >
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>

        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>verified_user</md-icon>
            </div>
            <h4 class="title">{{ $t("authentication.accepted.title") }}</h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="acceptedTable" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
                <md-table-cell md-label="Actions">
                  <md-button
                    class="md-danger md-just-icon md-round"
                    @click.native="
                      showSwal('remove-from-accepted', item.reject_url)
                    "
                  >
                    <md-icon>close</md-icon></md-button
                  >
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>

        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>error</md-icon>
            </div>
            <h4 class="title">{{ $t("authentication.rejected.title") }}</h4>
          </md-card-header>
          <md-card-content>
            <md-table v-model="rejectedTable" table-header-color="green">
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
    </div>

    <div class="md-layout" v-else-if="status === 'rejected' || status === null">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>list_alt</md-icon>
            </div>
            <h4 class="title">Email Submission</h4>
          </md-card-header>
          <md-card-content>
            <form class="form-horizontal" @submit.prevent="submitForm">
              <div class="md-layout">
                <label class="md-layout-item md-size-25 md-form-label">
                  Email
                </label>
                <div class="md-layout-item md-size-50">
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
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import notifyMixin from "@/mixins/notifyMixin";
import Swal from "sweetalert2";

export default {
  mixins: [notifyMixin],
  components: {},
  data() {
    return {
      pendingTable: [],
      acceptedTable: [],
      rejectedTable: [],
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
            this.pendingTable = this.parentInfo.pending_users;
            this.acceptedTable = this.parentInfo.accepted_users;
            this.rejectedTable = this.parentInfo.rejected_users;
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
    async modifyUser(url) {
      try {
        const response = await api.get(url).then((response) => {
          window.location.reload();
        });
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
    showSwal(type, url) {
      if (type === "accept") {
        Swal.fire({
          title: "Are you sure?",
          text: `You want to accept this user`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, accept it!",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.modifyUser(url);
          }
        });
      } else if (type === "reject") {
        Swal.fire({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, accept it!",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.modifyUser(url);
          }
        });
      } else if (type === "remove-from-accepted") {
        Swal.fire({
          title: "Are you sure?",
          text: `You won't be able to revert this!`,
          type: "warning",
          showCancelButton: true,
          confirmButtonClass: "md-button md-success",
          cancelButtonClass: "md-button md-danger",
          confirmButtonText: "Yes, delete it!",
          buttonsStyling: false,
        }).then((result) => {
          if (result.value) {
            this.modifyUser(url);
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
.category {
  margin: 10px;
}

.md-card-actions .md-layout-item {
  padding: 0;
}

.md-just-icon {
  margin: 0 15px 0 0;
}
</style>
