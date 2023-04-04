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
        <span v-if="$route.meta.rtlActive">
          {{ rtlTitle }}
          <b class="caret"></b>
        </span>
        <span v-else>
          {{ data.name }}
          <b class="caret"></b>
        </span>
      </a>

      <collapse-transition>
        <div v-show="!isClosed">
          <ul class="nav">
            <slot>
              <li>
                <a v-if="$route.meta.rtlActive" href="#vue">
                  <span class="sidebar-mini">مع</span>
                  <span class="sidebar-normal">ملف</span>
                </a>
                <a v-else href="#vue">
                  <span class="sidebar-mini">MP</span>
                  <span class="sidebar-normal">My Profile</span>
                </a>
              </li>
              <li>
                <a v-if="$route.meta.rtlActive" href="#vue">
                  <span class="sidebar-mini">هوع</span>
                  <span class="sidebar-normal">تعديل الملف الشخصي</span>
                </a>
                <a v-else href="#vue">
                  <span class="sidebar-mini">EP</span>
                  <span class="sidebar-normal">Edit Profile</span>
                </a>
              </li>
              <li>
                <a v-if="$route.meta.rtlActive" href="#vue">
                  <span class="sidebar-mini">و</span>
                  <span class="sidebar-normal">إعدادات</span>
                </a>
                <a v-else href="#vue">
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

import api from "@/api.js";

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
        const response = await api.get("/db95a7c7-b0f7-4521-ba84-571e796dcf5e"); // Replace with your API endpoint
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
