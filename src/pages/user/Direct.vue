<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("direct.title") }}</h3>
      <p class="category">
        {{ $t("direct.subtitle") }}
      </p>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-size-100 md-medium-size-100">
        <tabs :tab-name="['Left', 'Right']" color-button="warning">
          <h4 class="title" slot="header-title">
            Network Invitation Links -
            <small class="description">Left & Right</small>
          </h4>

          <!-- here you can add your content for tab-content -->
          <template slot="tab-pane-1">
            Share these links with potential referrals to help them join your
            network on the Left side.
            <br /><br />
            <a :href="leftLink">{{ leftLink }}</a>
          </template>
          <template slot="tab-pane-2">
            Share these links with potential referrals to help them join your
            network on the Right side.
            <br /><br />
            <a :href="rightLink">{{ rightLink }}</a>
          </template>
        </tabs>
      </div>
      <div class="md-layout-item md-size-100 md-medium-size-100">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>arrow_circle_up</md-icon>
            </div>
            <h4 class="title">{{ $t("direct.table.title") }}</h4>
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
                <md-table-cell v-bind:md-label="$t('direct.table.title')">{{
                  item.user.email
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
import { Tabs } from "@/components";

export default {
  components: {
    Tabs,
  },
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
      leftLink: null,
      rightLink: null,
      referrerCode: null,
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
    api.get("/api/v1/user/user/referral/").then((response) => {
      if (response.data.success) {
        this.referrerCode = response.data.data.referrer_code;
        const mainSiteUrl = window.location.origin;

        this.leftLink = `${mainSiteUrl}/${this.referrerCode}/left`;
        this.rightLink = `${mainSiteUrl}/${this.referrerCode}/right`;
      } else {
        this.notifyVue(response.data.error, "danger", "error_outline");
      }
    });
    api.get("/api/v1/referral/user/direct/list/").then((response) => {
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
