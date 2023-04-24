<template>
  <div>
    <div class="header text-center">
      <h3 class="title">Ticket Details and Support</h3>
      <p class="category">
        View the details of your support ticket and respond to the support team
        if needed, ensuring a seamless communication experience.
      </p>
    </div>

    <div class="md-layout">
      <div
        class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-50"
      >
        <testimonial-card>
          <template slot="content">
            <h5 class="description">
              Your products, all the kits that I have downloaded from your site
              and worked with are sooo cool! I love the color mixtures, cards...
              everything. Keep up the great work!
            </h5>
          </template>
          <template slot="footer">
            <h4 class="title">Admin</h4>
            <div class="avatar">
              <a href="#pablo">
                <img class="img" :src="profileCard" />
              </a>
            </div>
          </template>
        </testimonial-card>
        <testimonial-card>
          <template slot="content">
            <h5 class="description">
              Your products, all the kits that I have downloaded from your site
              and worked with are sooo cool! I love the color mixtures, cards...
              everything. Keep up the great work!
            </h5>
          </template>
        </testimonial-card>
        <testimonial-card>
          <template slot="content">
            <h5 class="description">
              Your products, all the kits that I have downloaded from your site
              and worked with are sooo cool! I love the color mixtures, cards...
              everything. Keep up the great work!
            </h5>
          </template>
          <template slot="footer">
            <h4 class="title">Admin</h4>
            <div class="avatar">
              <a href="#pablo">
                <img class="img" :src="profileCard" />
              </a>
            </div>
          </template>
        </testimonial-card>
      </div>
      <div
        class="md-layout-item md-small-size-100 md-medium-size-50 md-large-size-50"
      >
        <md-card>
          <md-card-header class="md-card-header-icon md-card-header-green">
            <div class="card-icon">
              <md-icon>note_add</md-icon>
            </div>
            <h4 class="title">Reply</h4>
          </md-card-header>

          <md-card-content>
            <form class="form-horizontal" @submit.prevent="submitForm">
              <div class="md-layout">
                <label class="md-layout-item md-size-25 md-form-label">
                  Description
                </label>
                <div class="md-layout-item md-size-75">
                  <md-field>
                    <label>Enter Description</label>
                    <md-input v-model="description" type="text"></md-input>
                  </md-field>
                </div>
              </div>
              <md-card-actions md-alignment="left">
                <md-button type="submit" class="md-success">Submit</md-button>
                <md-button @click="createNewTicket" class="md-danger">
                  Close The Ticket
                </md-button>
              </md-card-actions>
            </form>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
// import api from "@/api.js";
// import notifyMixin from "@/mixins/notifyMixin";
import { TestimonialCard } from "@/components";

export default {
  components: {
    TestimonialCard,
  },
  data() {
    return {};
  },
  props: {
    profileCard: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
    },
  },
};
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
.category {
  margin: 10px;
}

.md-card-actions .md-layout-item {
  padding: 0;
}

.md-just-icon {
  margin: 0 15px 0 0;
}
</style>
