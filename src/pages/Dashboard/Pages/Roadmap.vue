<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <time-line plain :type="simpleTimeline">
        <time-line-item inverted badge-type="info" badge-icon="update">
          <badge slot="header" type="info">
            Upgrade Site and Improve Security
          </badge>
          <div slot="content">
            <p>
              The first phase of the roadmap focuses on enhancing the site's
              overall performance and fortifying its security measures. This
              phase will entail updating the website's underlying technologies,
              ensuring it adheres to modern coding practices and industry
              standards. Additionally, we will conduct a comprehensive security
              audit to identify potential vulnerabilities and address them
              accordingly. By prioritizing these improvements, we aim to provide
              a safe and efficient platform for our investors.
            </p>
            <hr />
          </div>
          <h6 slot="footer">
            <i class="ti-time"></i>
            Current Phase
          </h6>
        </time-line-item>

        <time-line-item
          :class="{ 'timeline-inverted': responsive }"
          badge-type="success"
          badge-icon="contact_support"
        >
          <badge slot="header" type="success">Add Support Section</badge>
          <div slot="content">
            <p>
              To further cater to our investors' needs, this phase of our
              roadmap involves the addition of a dedicated Support section to
              the website. This new feature will offer investors quick access to
              vital resources, such as FAQs, knowledge base articles, and
              step-by-step guides. Moreover, the Support section will facilitate
              direct communication with our customer service team, enabling
              users to submit support tickets and receive prompt assistance with
              any concerns or issues they may encounter.
            </p>
          </div>
        </time-line-item>

        <time-line-item inverted badge-type="primary" badge-icon="fingerprint">
          <badge slot="header" type="primary"
            >Add Exchange's Authentication</badge
          >
          <div slot="content">
            <p>
              In this phase of our roadmap, we will implement a robust exchange
              authentication mechanism to enhance the user experience and
              streamline the investment process. This new feature will allow
              investors to securely connect their existing exchange accounts to
              our platform, facilitating seamless transactions and data
              synchronization. By incorporating this advanced authentication
              system, we aim to provide a frictionless experience for our users,
              while maintaining the highest levels of security and privacy.
            </p>
          </div>
        </time-line-item>
      </time-line>
    </div>
  </div>
</template>
<script>
import { TimeLine, TimeLineItem, Badge } from "@/components";
export default {
  components: {
    TimeLine,
    TimeLineItem,
    Badge,
  },
  data() {
    return {
      responsive: false,
    };
  },
  computed: {
    simpleTimeline() {
      if (this.responsive) {
        return "simple";
      }
      return "";
    },
  },
  methods: {
    onResponsiveInverted() {
      if (window.innerWidth < 768) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    },
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  },
};
</script>
<style></style>
