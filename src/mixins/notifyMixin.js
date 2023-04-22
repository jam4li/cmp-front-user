export default {
  methods: {
    notifyVue(
      message,
      type,
      icon,
      verticalAlign = "top",
      horizontalAlign = "center"
    ) {
      this.$notify({
        timeout: 2500,
        message: message,
        icon: icon,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: type,
      });
    },
  },
};
