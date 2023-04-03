<template>
  <div>
    <md-table v-model="users" class="md-table-global-sales">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="">
          <div class="flag">
            <img :src="item.icon" />
          </div>
        </md-table-cell>
        <md-table-cell>{{ item.title }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "announcement-table",
  data() {
    return {
      selected: [],
      users: [
        {
          icon: "./img/flags/US.png",
          title: "Hyper Markets",
        },
        {
          icon: "./img/flags/US.png",
          title: "Off",
        },
        {
          icon: "./img/flags/US.png",
          title: "Updates",
        },
      ],
    };
  },
};
</script>
