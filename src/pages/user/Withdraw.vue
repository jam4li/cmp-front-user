<template>
  <div>
    <div class="header text-center">
      <h3 class="title">Withdraw</h3>
      <p class="category">You can withdraw your profits on Fridays</p>
      <h6 v-if="isActive" class="category text-success">
        <md-icon class="text-success">lock_open</md-icon>
        Withdraw is activated
      </h6>
      <h6 v-else class="category text-danger">
        <md-icon class="text-danger">lock</md-icon>
        Withdraw is not activated
      </h6>
    </div>
    <div class="md-layout">
      <div
        class="md-layout-item md-small-size-100 md-medium-size-100 md-large-size-50"
      >
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>note_add</md-icon>
            </div>
            <h4 class="title">Create New Withdraw Request</h4>
          </md-card-header>

          <md-card-content>
            <form class="form-horizontal" @submit.prevent="submitForm">
              <div class="md-layout">
                <label class="md-layout-item md-size-25 md-form-label">
                  Wallet Address
                </label>
                <div class="md-layout-item md-size-75">
                  <md-field>
                    <label>Enter Wallet Address</label>
                    <md-input v-model="walletAddress" type="text"></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-25 md-form-label">
                  Wallet Type
                </label>
                <div class="md-layout-item md-size-60">
                  <md-field>
                    <label for="movies">Enter Wallet Type</label>
                    <md-select v-model="selectedWalletType" id="types">
                      <md-option
                        v-for="item in walletType"
                        :key="item.wallet_type"
                        :value="item.wallet_type"
                      >
                        {{ item.display_name }}
                      </md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-25 md-form-label">
                  Amount
                </label>
                <div class="md-layout-item md-size-60">
                  <md-field>
                    <label>Enter Amount</label>
                    <md-input
                      v-model="amount"
                      type="number"
                      step="0.01"
                    ></md-input>
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
      <div
        class="md-layout-item md-small-size-100 md-medium-size-100 md-large-size-50"
      >
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>account_balance_wallet</md-icon>
            </div>
            <h4 class="title">{{ $t("wallet.table.title") }}</h4>
          </md-card-header>
          <md-card-content>
            <md-table
              v-model="walletListData"
              class="paginated-table table-striped table-hover"
            >
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell v-bind:md-label="$t('wallet.table.title')">{{
                  item.title
                }}</md-table-cell>
                <md-table-cell v-bind:md-label="$t('wallet.table.balance')"
                  >{{ item.balance }} $</md-table-cell
                >
              </md-table-row>
            </md-table>
          </md-card-content>
        </md-card>
      </div>
      <div
        class="md-layout-item md-small-size-100 md-medium-size-100 md-large-size-100"
      >
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>assignment</md-icon>
            </div>
            <h4 class="title">{{ $t("withdraw.table.title") }}</h4>
          </md-card-header>
          <md-card-content>
            <md-table
              :value="queriedData"
              :md-sort.sync="currentSort"
              :md-sort-order.sync="currentSortOrder"
              :md-sort-fn="customSort"
              class="paginated-table table-striped table-hover"
            >
              <md-table-toolbar>
                <md-field>
                  <label for="pages">Per page</label>
                  <md-select v-model="pagination.perPage" name="pages">
                    <md-option
                      v-for="item in pagination.perPageOptions"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                      {{ item }}
                    </md-option>
                  </md-select>
                </md-field>
              </md-table-toolbar>
              <md-table-row slot="md-table-row" slot-scope="{ item }">
                <md-table-cell
                  v-bind:md-label="$t('withdraw.table.walletType')"
                  md-sort-by="wallet_type"
                >
                  {{ item.wallet_type }}
                </md-table-cell>
                <md-table-cell
                  v-bind:md-label="$t('withdraw.table.walletAddress')"
                >
                  {{ item.wallet_address }}
                </md-table-cell>
                <md-table-cell v-bind:md-label="$t('withdraw.table.amount')">
                  {{ item.amount }}
                </md-table-cell>
                <md-table-cell v-bind:md-label="$t('withdraw.table.status')">
                  {{ item.status }}
                </md-table-cell>
                <md-table-cell md-label="Create">
                  {{ item.created_at }}
                </md-table-cell>
                <md-table-cell md-label="Update">
                  {{ item.updated_at }}
                </md-table-cell>
              </md-table-row>
            </md-table>
          </md-card-content>
          <md-card-actions md-alignment="space-between">
            <div class="">
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
              </p>
            </div>
            <pagination
              class="pagination-no-border pagination-success"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </pagination>
          </md-card-actions>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api.js";
import { Pagination } from "@/components";
import users from "./Tables/users";

export default {
  components: {
    Pagination,
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.withdrawListData;
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
      return this.withdrawListData.length;
    },
  },
  data() {
    return {
      currentSort: "name",
      currentSortOrder: "asc",
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      withdrawListData: [],
      walletListData: [],
      walletType: [],
      walletAddress: null,
      amount: null,
      selectedWalletType: null,
      isActive: false,
    };
  },
  methods: {
    customSort(value) {
      return value.sort((a, b) => {
        const sortBy = this.currentSort;
        if (this.currentSortOrder === "desc") {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return b[sortBy].localeCompare(a[sortBy]);
      });
    },
    submitForm() {
      api
        .post("api/v1/withdraw/user/create/", {
          wallet_address: this.walletAddress,
          wallet_type: this.selectedWalletType,
          amount: this.amount,
        })
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
            window.location.reload();
          } else {
            alert(response.data.error.detail);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again.");
        });
    },
  },
  mounted() {
    api.get("/api/v1/withdraw/user/list/").then((response) => {
      if (response.data.success) {
        this.withdrawListData = response.data.data;
      } else {
        this.notifyVue(response.data.error, "danger", "error_outline");
      }
    });
    api.get("api/v1/withdraw/user/detail/").then((response) => {
      if (response.data.success) {
        this.walletType = response.data.data.wallet_types;
        this.isActive = response.data.data.is_active;
      } else {
        this.notifyVue(response.data.error, "danger", "error_outline");
      }
    });
    api.get("/api/v1/wallet/user/list/").then((response) => {
      if (response.data.success) {
        this.walletListData = response.data.data;
      } else {
        this.notifyVue(response.data.error, "danger", "error_outline");
      }
    });
  },
};
</script>

<style lang="css" scoped>
.md-card .md-card-actions {
  border: 0;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
