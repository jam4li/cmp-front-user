<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("wallet.title") }}</h3>
      <p class="category">
        {{ $t("wallet.subtitle") }}
      </p>
    </div>

    <div class="md-layout">
      <div class="md-layout-item">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>account_balance_wallet</md-icon>
            </div>
            <h4 class="title">{{ $t("wallet.table.title") }}</h4>
          </md-card-header>
          <md-card-content>
            <md-table
              :value="queriedData"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              class="paginated-table table-striped table-hover"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell v-bind:md-label="$t('wallet.table.title')">{{
                  item.title
                }}</md-table-cell>
                <md-table-cell v-bind:md-label="$t('wallet.table.type')">{{
                  item.type
                }}</md-table-cell>
                <md-table-cell v-bind:md-label="$t('wallet.table.balance')">{{
                  item.balance
                }}</md-table-cell>
              </md-table-row>
            </md-table>
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
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
  },
  data() {
    return {
      pagination: {
        perPage: 5,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      tableData: [],
      searchedData: [],
    };
  },
  mounted() {
    api.get("/api/v1/wallet/user/list/").then((response) => {
      if (response.data.success) {
        this.tableData = response.data.data;
      } else {
        this.notifyVue(response.data.error, "danger", "error_outline");
      }
    });
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
