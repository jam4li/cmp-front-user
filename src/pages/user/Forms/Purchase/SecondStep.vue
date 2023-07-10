<template>
  <form @submit.prevent="validate">
    <div>
      <h5 class="info-text">
        Please review your invoice attentively and proceed to the next step.
      </h5>
      <div class="md-layout">
        <div class="md-layout-item md-size-50 mt-4 md-small-size-100"></div>
        <div class="md-layout-item md-size-100">
          <md-card>
            <md-card-header class="md-card-header-icon md-card-header-green">
              <div class="card-icon">
                <md-icon>assignment</md-icon>
              </div>
              <h4 class="title">Package Detail</h4>
            </md-card-header>
            <md-card-content>
              <md-table table-header-color="green">
                <md-table-row slot="md-table-row">
                  <md-table-cell>Price</md-table-cell>
                  <md-table-cell>{{
                    purchaseData.package_price
                  }}</md-table-cell>
                </md-table-row>
                <md-table-row slot="md-table-row">
                  <md-table-cell>Fee</md-table-cell>
                  <md-table-cell>{{ purchaseData.fee }}</md-table-cell>
                </md-table-row>
              </md-table>
            </md-card-content>
          </md-card>
        </div>
        <div class="md-layout-item md-size-100">
          <md-card>
            <md-card-header class="md-card-header-icon md-card-header-green">
              <div class="card-icon">
                <md-icon>assignment</md-icon>
              </div>
              <h4 class="title">You PAY</h4>
            </md-card-header>
            <md-card-content>
              <md-table table-header-color="green">
                <md-table-row slot="md-table-row">
                  <md-table-cell>Tether</md-table-cell>
                  <md-table-cell
                    >{{ purchaseData.tether_percent }} %</md-table-cell
                  >
                  <md-table-cell
                    >{{ purchaseData.tether_amount }} $</md-table-cell
                  >
                </md-table-row>
                <md-table-row slot="md-table-row">
                  <md-table-cell>EIT</md-table-cell>
                  <md-table-cell
                    >{{ purchaseData.token_percent }} %</md-table-cell
                  >
                  <md-table-cell>{{ purchaseData.token_amount }}</md-table-cell>
                </md-table-row>
              </md-table>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  methods: {
    validate() {
      console.log("Validate Second Form");
      this.$emit("on-validated", true, this.model);
      return Promise.resolve(true);
    },
  },
  props: {
    purchaseData: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    console.log("purchaseData:", this.purchaseData);
  },
};
</script>
<style></style>
