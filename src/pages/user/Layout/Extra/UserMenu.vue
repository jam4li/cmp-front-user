<template>
  <div class="user">
    <div class="photo">
      <img :src="avatar" alt="avatar" />
    </div>
    <div class="user-info">
      <a
        data-toggle="collapse"
        :aria-expanded="!isClosed"
        @click.stop="toggleMenu"
        @click.capture="clicked"
      >
        <span>
          {{ data.name }}
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <li>
                <a href="#vue">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </a>
              </li>
              <li>
                <a href="#vue">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </a>
              </li>
              <li>
                <a href="#vue">
                  <span class="sidebar-mini">S</span>
                  <span class="sidebar-normal">Settings</span>
                </a>
              </li>
            </slot>
          </ul>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>
<script>
import { CollapseTransition } from "vue2-transitions";

import api from "@/api";

export default {
  components: {
    CollapseTransition,
  },
  data() {
    return {
      isClosed: true,
      data: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await api.get("/api/v1/user/user/detail/"); // Replace with your API endpoint
        this.data = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    clicked: function (e) {
      e.preventDefault();
    },
    toggleMenu: function () {
      this.isClosed = !this.isClosed;
    },
  },
};
</script>
<style>
.collapsed {
  transition: opacity 1s;
}
</style>
