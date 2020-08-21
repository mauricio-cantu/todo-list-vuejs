<template dark>
  <v-app>
    <v-main>
      <v-container>
        <v-row class="justify-center">
          <v-col cols="12" md="6" lg="7" xl="5">
            <h1 class="primary sm-col-12 lg-col-4 pr-3 pl-3 d-md-inline-block text-center">
              <v-icon large class="mr-2">mdi-playlist-check</v-icon>Todo list
            </h1>
          </v-col>
        </v-row>
        <v-row class="justify-center">
          <v-col cols="12" md="6" lg="7" xl="5">
            <TodoList />
            <div class="mt-3 font-weight-bold">
              Developed by
              <strong>Maurício Cantú</strong>, 2020.
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TodoList from "./components/TodoList/TodoList.vue";

export default {
  name: "App",

  components: {
    TodoList,
  },
};
</script>
