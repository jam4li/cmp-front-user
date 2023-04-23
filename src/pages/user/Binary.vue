<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("binary.title") }}</h3>
      <p class="category">
        {{ $t("binary.subtitle") }}
      </p>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-size-50 md-small-size-100">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>groups</md-icon>
            </div>
            <h4 class="title">Overview</h4>
          </md-card-header>
          <md-card-content>
            Left Count:
            {{ binaryInfo.left_count }}
            <br /><br />
            Right Count:
            {{ binaryInfo.right_count }}
            <br /><br />
            <br /><br />
            Left Amount:
            {{ binaryInfo.left_amount }}
            <br /><br />
            Right Amount:
            {{ binaryInfo.right_amount }}
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";

export default {
  components: {},
  data() {
    return {
      binaryInfo: null,
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
