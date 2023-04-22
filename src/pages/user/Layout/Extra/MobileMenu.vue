<template>
  <ul class="nav nav-mobile-menu">
    <li>
      <drop-down>
        <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
          <i class="material-icons">language</i>
          <p>Language</p>
        </a>
        <ul class="dropdown-menu dropdown-menu-right">
          <li>
            <a href="#" @click.prevent="changeLanguage('en')">English</a>
          </li>
          <li>
            <a href="#" @click.prevent="changeLanguage('tr')">Turkish</a>
          </li>
          <li>
            <a href="#" @click.prevent="changeLanguage('ru')">Russian</a>
          </li>
        </ul>
      </drop-down>
    </li>
  </ul>
</template>
<script>
import i18n from "@/i18n";

export default {
  data() {
    return {};
  },
  methods: {
    changeLanguage(lang) {
      i18n.locale = lang;
    },
  },
};
</script>
