<template>
  <ValidationObserver ref="form">
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
                <md-table v-model="packageData" table-header-color="green">
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell>{{ item.name }}</md-table-cell>
                    <md-table-cell>{{ item.amount }}</md-table-cell>
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
                <md-table v-model="paymentData" table-header-color="green">
                  <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell>{{ item.name }}</md-table-cell>
                    <md-table-cell>{{ item.percent }}</md-table-cell>
                    <md-table-cell>{{ item.amount }}</md-table-cell>
                  </md-table-row>
                </md-table>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </form>
  </ValidationObserver>
</template>
<script>
export default {
  data() {
    return {
      selected: [],
      packageData: [
        {
          name: "Tether",
          amount: "140 $",
        },
        {
          name: "Fee",
          amount: "10 $",
        },
      ],
      paymentData: [
        {
          name: "Tether",
          percent: "70 %",
          amount: "140 $",
        },
        {
          name: "EIT",
          percent: "30 %",
          amount: "60 $",
        },
      ],
    };
  },
  methods: {
    getClass: ({ id }) => ({
      "table-success": id === 1,
      "table-info": id === 3,
      "table-danger": id === 5,
      "table-warning": id === 7,
    }),
  },
};
</script>
<style></style>
