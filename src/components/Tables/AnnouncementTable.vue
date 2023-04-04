<template>
  <div>
    <md-table v-model="users" class="md-table-global-sales">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
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
          title: "Hyper Markets",
        },
        {
          title: "Off",
        },
        {
          title: "Updates",
        },
      ],
    };
  },
};
</script>
