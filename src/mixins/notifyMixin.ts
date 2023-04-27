export default {
  methods: {
    notifyVue(
      message: string,
      type: string,
      icon: string,
      verticalAlign: string = "top",
      horizontalAlign: string = "center"
    ): void {
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
