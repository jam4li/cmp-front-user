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
          <form class="form-horizontal" @submit.prevent="submitForm">
            <div class="md-layout">
              <label class="md-layout-item md-size-25 md-form-label">
                Title
              </label>
              <div class="md-layout-item md-size-75">
                <md-field>
                  <label>Enter Title</label>
                  <md-input v-model="title" type="text"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-25 md-form-label">
                Department
              </label>
              <div class="md-layout-item md-size-75">
                <md-field>
                  <label for="movies">Enter Department</label>
                  <md-select v-model="selectedDepartment" id="departments">
                    <md-option
                      v-for="department in departmentList"
                      :key="department.id"
                      :value="department.id"
                      >{{ department.name }}</md-option
                    >
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
                  <md-input v-model="description" type="text"></md-input>
                </md-field>
              </div>
            </div>
            <md-card-actions md-alignment="left">
              <md-button type="submit" class="md-success">Submit</md-button>
            </md-card-actions>
          </form>
        </md-card-content>
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
          <collapse
            :collapse="[
              'Collapsible Group Item #1',
              'Collapsible Group Item #2',
              'Collapsible Group Item #3',
            ]"
            icon="keyboard_arrow_down"
            color-collapse="success"
          >
            <template slot="md-collapse-pane-1">
              <p>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch. Food truck quinoa
                nesciunt laborum eiusmod.
              </p>
            </template>
            <template slot="md-collapse-pane-2">
              <p>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. Food truck quinoa nesciunt
                laborum eiusmod.
              </p>
            </template>
            <template slot="md-collapse-pane-3">
              <p>
                Anim pariatur cliche reprehenderit, enim eiusmod high life
                accusamus terry richardson ad squid. 3 wolf moon officia aute,
                non cupidatat skateboard dolor brunch.
              </p>
            </template>
          </collapse>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>
<script>
import { Collapse } from "@/components";
import api from "@/api.js";

export default {
  components: {
    Collapse,
  },
  data() {
    return {
      departmentList: [],
      title: "",
      description: "",
      selectedDepartment: null,
    };
  },
  created() {
    this.fetchDepartments();
  },
  methods: {
    fetchDepartments() {
      api
        .get("api/v1/support/user/department/list/")
        .then((response) => {
          this.departmentList = response.data.data; // Assuming the API returns an array of movie objects
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    },
    submitForm() {
      api
        .post("api/v1/support/user/ticket/create/", {
          title: this.title,
          department: this.selectedDepartment,
          content: this.description,
        })
        .then((response) => {
          if (response.data.success) {
            this.$emit("ticketCreated", response.data.ticket_id);
            alert(response.data.message);
            // Reset the form
            this.title = "";
            this.selectedDepartment = null;
            this.description = "";
          } else {
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again.");
        });
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
