<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("network.title") }}</h3>
      <p class="category">
        {{ $t("network.subtitle") }}
      </p>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-size-100 md-small-size-100">
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>account_tree</md-icon>
            </div>
            <h4 class="title">Network Tree</h4>
          </md-card-header>

          <md-card-content>
            <TreeChart :json="treeData" />
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import TreeChart from "vue-tree-chart";

export default {
  components: {
    TreeChart,
  },
  data() {
    return {
      treeData: {
        name: "Root",
        children: [
          {
            name: "Child 1",
          },
          {
            name: "Child 2",
            children: [
              {
                name: "Grandchild 1",
              },
              {
                name: "Grandchild 2",
              },
            ],
          },
        ],
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

.vue-tree-chart {
  border: 1px solid #ddd;
  border-radius: 5px;
}

.vue-tree-node {
  padding: 10px;
  margin: 5px;
  background-color: #f5f5f5;
}

.vue-tree-link {
  stroke: #333;
  stroke-width: 2px;
}
</style>
