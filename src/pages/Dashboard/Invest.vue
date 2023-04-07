<template>
  <div>
    <div class="header text-center">
      <h3 class="title">Welcome to your Investment Dashboard.</h3>
      <p>
        As a valued investor, this dashboard is designed to provide you with a
        comprehensive overview of your financial portfolio.
      </p>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-size-25 md-small-size-100">
        <invest-card
          header-animation="false"
          :chart-data="pieChart.data"
          :chart-options="pieChart.options"
          chart-type="Pie"
          header-icon
          chart-inside-content
          background-color="green"
        >
          <template slot="chartInsideHeader">
            <h4 class="title">Pie Chart</h4>
          </template>
          <template slot="footer">
            <div class="md-layout">
              <div class="md-layout-item md-size-100">
                <md-icon>paid</md-icon> Invest: 100$
              </div>
              <div class="md-layout-item md-size-100">
                <md-icon>payments</md-icon> Profit: 73$
              </div>
              <div class="md-layout-item md-size-100">
                <md-icon>savings</md-icon> Staking: 73$
              </div>
            </div>
          </template>
        </invest-card>
      </div>
    </div>
  </div>
</template>

<script>
import { InvestCard } from "@/components";
export default {
  components: {
    InvestCard,
  },
  data() {
    return {
      pieChart: {
        data: {
          labels: ["62%"],
          series: [62],
        },
        options: {
          height: "190px",
          donut: true,
          donutWidth: 40,
          startAngle: 270,
          showLabel: true,
          total: 100,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
.category {
  margin: 0;
}

.md-card-actions .md-layout-item {
  padding: 0;
}
</style>
