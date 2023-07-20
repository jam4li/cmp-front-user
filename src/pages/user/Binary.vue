<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("binary.title") }}</h3>
      <p class="category">
        {{ $t("binary.subtitle") }}
      </p>
      <h6 v-if="isActive" class="category text-success">
        <md-icon class="text-success">lock_open</md-icon>
        Your binary is activate
      </h6>
      <h6 v-else class="category text-danger">
        <md-icon class="text-danger">lock</md-icon>
        Your binary is not activate
      </h6>
    </div>

    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100 md-size-25"
      >
        <binary-card :icon-color="isActive ? 'icon-success' : 'icon-danger'">
          <h4 slot="category" class="category">Count</h4>
          <md-icon slot="icon">people_alt</md-icon>
          <h4 slot="title" class="title">
            Right Count: {{ binaryInfo.right_count }}
          </h4>
          <h4 slot="title" class="title">
            Left Count: {{ binaryInfo.left_count }}
          </h4>
        </binary-card>
      </div>
      <div
        class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100 md-size-25"
      >
        <binary-card :icon-color="isActive ? 'icon-success' : 'icon-danger'">
          <h4 slot="category" class="category">Amount</h4>
          <md-icon slot="icon">balance</md-icon>
          <h4 slot="title" class="title">
            Right Amount: {{ binaryInfo.right_amount }} $
          </h4>
          <h4 slot="title" class="title">
            Left Amount: {{ binaryInfo.left_amount }} $
          </h4>
        </binary-card>
      </div>
      <div
        class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100 md-size-25"
      >
        <binary-card :icon-color="isActive ? 'icon-success' : 'icon-danger'">
          <h4 slot="category" class="category">Invest</h4>
          <md-icon slot="icon">attach_money</md-icon>
          <h4 slot="title" class="title">
            Last Invest: {{ binaryInfo.last_invest }} $
          </h4>
          <h4 slot="title" class="title">
            Total Invest: {{ binaryInfo.total_invest }} $
          </h4>
        </binary-card>
      </div>
      <div
        class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-100 md-size-25"
      >
        <binary-card :icon-color="isActive ? 'icon-success' : 'icon-danger'">
          <h4 slot="category" class="category">Network</h4>
          <md-icon slot="icon">lan</md-icon>
          <h4 slot="title" class="title">
            Network Profit: {{ binaryInfo.network_profit }} $
          </h4>
          <h4 slot="title" class="title">
            Network Profit Daily Limit:
            {{ binaryInfo.network_profit_daily_limit }} $
          </h4>
        </binary-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import { BinaryCard } from "@/components";

export default {
  components: {
    BinaryCard,
  },
  data() {
    return {
      binaryInfo: null,
      isActive: false,
    };
  },
  created() {
    this.fetchBinaryInfo();
  },
  methods: {
    async fetchBinaryInfo() {
      try {
        const response = await api.get("/api/v1/referral/user/binary/detail/");
        if (response.data.success) {
          this.binaryInfo = response.data.data;
          this.isActive = response.data.data.status;
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
</style>
