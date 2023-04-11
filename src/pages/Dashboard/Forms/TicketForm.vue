<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-small-size-100 md-medium-size-100 md-large-size-50"
    >
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>note_add</md-icon>
          </div>
          <h4 class="title">Create New Ticket</h4>
        </md-card-header>

        <md-card-content>
          <form class="form-horizontal" action="" method="post">
            <div class="md-layout">
              <label class="md-layout-item md-size-25 md-form-label">
                Title
              </label>
              <div class="md-layout-item md-size-75">
                <md-field>
                  <label>Enter Title</label>
                  <md-input v-model="layout1" type="text"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-25 md-form-label">
                Type
              </label>
              <div class="md-layout-item md-size-75">
                <md-field>
                  <label for="movies">Enter Type</label>
                  <md-select v-model="selectedMovies" name="movies" id="movies">
                    <md-option value="fight-club">Fight Club</md-option>
                    <md-option value="godfather">Godfather</md-option>
                    <md-option value="godfather-ii">Godfather II</md-option>
                    <md-option value="godfather-iii">Godfather III</md-option>
                    <md-option value="godfellas">Godfellas</md-option>
                    <md-option value="pulp-fiction">Pulp Fiction</md-option>
                    <md-option value="scarface">Scarface</md-option>
                  </md-select>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-25 md-form-label">
                Description
              </label>
              <div class="md-layout-item md-size-75">
                <md-field>
                  <label>Enter Description</label>
                  <md-input v-model="layout1" type="text"></md-input>
                </md-field>
              </div>
            </div>
          </form>
        </md-card-content>

        <md-card-actions md-alignment="left">
          <md-button class="md-success">Submit</md-button>
        </md-card-actions>
      </md-card>
    </div>
    <div
      class="md-layout-item md-small-size-100 md-medium-size-100 md-large-size-50"
    >
      <md-card>
        <md-card-header class="md-card-header-icon md-card-header-green">
          <div class="card-icon">
            <md-icon>help_center</md-icon>
          </div>
          <h4 class="title">FAQ</h4>
        </md-card-header>

        <md-card-content>
          <div class="faq-list">
            <div v-for="(faq, index) in faqs" :key="index">
              <div class="faq-question" @click="toggleDescription(index)">
                {{ faq.question }}
                <i
                  v-bind:class="[
                    { 'fa-chevron-circle-down': faq.showDescription },
                    { 'fa-chevron-circle-right': !faq.showDescription },
                  ]"
                  class="fa"
                ></i>
              </div>
              <div class="faq-description" v-if="faq.showDescription">
                {{ faq.description }}
              </div>
              <hr />
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
export default {
  el: "#app",
  components: {},
  data() {
    return {
      faqs: [
        {
          question: "What is Vue?",
          description:
            "Vue is a progressive framework for building user interfaces. It is designed to be easy to adopt and integrate into other libraries or existing projects.",
          showDescription: false,
        },
        {
          question: "What are the benefits of using Vue?",
          description:
            "Vue has a small footprint and is easy to learn. It provides reactive and composable view components, making it easy to build complex UIs. It also has a thriving ecosystem of tools and plugins.",
          showDescription: false,
        },
        {
          question: "How do I get started with Vue?",
          description:
            "You can get started with Vue by downloading it from the official website, or by using a package manager like npm or yarn. Vue also has a CLI tool that can generate a new project for you.",
          showDescription: false,
        },
        {
          question: "Is Vue suitable for large-scale applications?",
          description:
            "Yes, Vue is suitable for large-scale applications. It provides tools and patterns for managing state and scaling applications, and has been used by companies like Alibaba, Xiaomi, and Expedia for large-scale projects.",
          showDescription: false,
        },
        {
          question: "What is Vue?",
          description:
            "Vue is a progressive framework for building user interfaces. It is designed to be easy to adopt and integrate into other libraries or existing projects.",
          showDescription: false,
        },
        {
          question: "What are the benefits of using Vue?",
          description:
            "Vue has a small footprint and is easy to learn. It provides reactive and composable view components, making it easy to build complex UIs. It also has a thriving ecosystem of tools and plugins.",
          showDescription: false,
        },
        {
          question: "How do I get started with Vue?",
          description:
            "You can get started with Vue by downloading it from the official website, or by using a package manager like npm or yarn. Vue also has a CLI tool that can generate a new project for you.",
          showDescription: false,
        },
        {
          question: "Is Vue suitable for large-scale applications?",
          description:
            "Yes, Vue is suitable for large-scale applications. It provides tools and patterns for managing state and scaling applications, and has been used by companies like Alibaba, Xiaomi, and Expedia for large-scale projects.",
          showDescription: false,
        },
      ],
    };
  },
  methods: {
    toggleDescription(index) {
      this.faqs[index].showDescription = !this.faqs[index].showDescription;
    },
  },
};
</script>
<style lang="scss" scoped>
.md-card .md-card-actions {
  border: none;
}

.faq-question {
  cursor: pointer;
  margin-bottom: 10px;
  font-size: medium;
  font-weight: bold;
}

.faq-list hr {
  margin-top: 20px;
  margin-bottom: 20px;
}

.faq-description {
  margin-left: 20px;
  margin-bottom: 10px;
}

.fa {
  float: right;
}
</style>
