<template>
  <div class="md-layout">
    <div class="md-layout-item md-size-100">
      <time-line plain :type="simpleTimeline">
        <time-line-item inverted badge-type="info" badge-icon="update">
          <badge slot="header" type="info">
            {{ $t("roadmap.firstPhase.title") }}
          </badge>
          <div slot="content">
            <p>
              {{ $t("roadmap.firstPhase.description") }}
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
          <badge slot="header" type="success">{{
            $t("roadmap.secondPhase.title")
          }}</badge>
          <div slot="content">
            <p>
              {{ $t("roadmap.secondPhase.description") }}
            </p>
          </div>
        </time-line-item>

        <time-line-item inverted badge-type="primary" badge-icon="fingerprint">
          <badge slot="header" type="primary">{{
            $t("roadmap.thirdPhase.title")
          }}</badge>
          <div slot="content">
            <p>
              {{ $t("roadmap.thirdPhase.description") }}
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
