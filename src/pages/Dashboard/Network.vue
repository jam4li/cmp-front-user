<template>
  <div>
    <div class="header text-center">
      <h3 class="title">My Network</h3>
      <p class="category">
        Handcrafted by our friends from
        <a target="_blank" href="https://gionkunz.github.io/chartist-js/"
          >Chartist.js</a
        >. Please check out their
        <a
          href="https://gionkunz.github.io/chartist-js/getting-started.html"
          target="_blank"
          >full documentation.</a
        >
      </p>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-size-100 md-small-size-100">
        <TreeChart :json="treeData" />
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
</style>
