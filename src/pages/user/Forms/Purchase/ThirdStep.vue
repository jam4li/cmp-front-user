<template>
  <form @submit.prevent="validate">
    <div class="md-layout"></div>
  </form>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    validate() {
      return this.$refs.form.validate().then((res) => {
        if (!res) {
          return;
        }
        this.$emit("on-validated", res);
        return res;
      });
    },
  },
};
</script>
<style></style>
