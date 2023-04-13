<template>
  <div>
    <div class="header text-center">
      <h3 class="title">{{ $t("package.title") }}</h3>
      <p class="category">{{ $t("package.subtitle") }}</p>
    </div>

    <div class="md-layout">
      <div
        v-for="packet in packages"
        :key="packet.id"
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-25"
      >
        <product-card header-animation="true">
          <img v-bind:src="packet.image" class="img" slot="imageHeader" />
          <md-icon slot="fixed-button">build</md-icon>
          <h4 slot="title" class="title">
            <a href="#">{{ packet.name }}</a>
          </h4>
          <div slot="description" class="card-description">
            {{ packet.summery }}
          </div>
          <template slot="footer">
            <div class="price">
              <md-button class="md-info">Buy</md-button>
            </div>
          </template>
        </product-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductCard } from "@/components";
import api from "@/api.js";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      packages: [],
    };
  },
  created() {
    this.fetchPackages();
  },
  methods: {
    async fetchPackages() {
      try {
        const response = await api.get("/api/v1/package/list/"); // Replace with your API endpoint
        this.packages = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
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
  margin: 0;
}

.md-card-actions .md-layout-item {
  padding: 0;
}
</style>
