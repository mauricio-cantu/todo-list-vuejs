<template>
  <div>
    <v-card dark>
      <v-tabs v-model="tab" color="primary" centered dark slider-color="primary">
        <v-tab key="items">Items</v-tab>
        <v-tab key="categories">Categories</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" dark>
        <v-tab-item key="items">
          <v-card-title primary-title>
            <strong>New item</strong>
          </v-card-title>
          <div class="pa-3">
            <v-row>
              <v-col cols="12" lg="6">
                <v-text-field
                  label="What you working on?"
                  name="title"
                  v-model="itemTitle"
                  @keydown.enter="addNewItem"
                  ref="itemTitle"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12" lg="6">
                <v-select
                  :items="categories"
                  item-value="id"
                  item-text="title"
                  :color="getCategory(selectedCategory) && getCategory(selectedCategory).color"
                  v-model="selectedCategory"
                  clearable
                  ref="selectedCategory"
                  outlined
                  label="Category"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-center">
                <v-btn color="success" @click="addNewItem">Add item</v-btn>
              </v-col>
              <v-col v-if="todoItems.length">
                <v-select
                  :items="filterOptions"
                  v-model="filterOptionSelected"
                  outlined
                  dense
                  label="Filter"
                ></v-select>
              </v-col>
              <v-col v-if="todoItems.length" class="text-center">
                <v-progress-circular
                  :value="itemsPercentage"
                  size="50"
                  width="4"
                  color="primary"
                  :title="`${doneItems} of ${totalItems} items completed`"
                >
                  <span>
                    {{doneItems}} /
                    {{totalItems}}
                  </span>
                </v-progress-circular>
              </v-col>
            </v-row>
            <v-btn
              color="primary"
              text
              v-if="filteredItems.length && filteredItems.some(item => !item.done) && (filterOptionSelected === '' || filterOptionSelected === 'active')"
              @click="completeAll"
            >Complete all</v-btn>
            <v-btn
              color="primary"
              text
              v-if="filteredItems.length && filterOptionSelected === 'completed'"
              @click="clearCompleted"
            >Clear completed</v-btn>
            <v-divider v-if="filteredItems.length" class="mt-4"></v-divider>
            <v-virtual-scroll
              v-if="filteredItems.length"
              :items="filteredItems"
              height="250"
              item-height="50"
            >
              <template v-slot="{ item }">
                <v-list-item :key="item.title">
                  <v-list-item-action>
                    <v-checkbox @click="toggleDone(item.id)" :input-value="item.done"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>
                      <strong
                        :class="item.done && 'text-decoration-line-through' || 'white--text'"
                      >{{ item.title }}</strong>
                      <v-chip
                        class="ml-5"
                        small
                        outlined
                        v-if="getCategory(item.category)"
                        label
                        :color="getCategory(item.category).color"
                      >{{ getCategory(item.category).title }}</v-chip>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-icon @click="deleteItem(item.id)">mdi-delete</v-icon>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </template>
            </v-virtual-scroll>
          </div>
        </v-tab-item>
        <v-tab-item key="categories">
          <v-card-title primary-title>
            <strong>New category</strong>
          </v-card-title>
          <div class="pa-3">
            <v-row>
              <v-col class="justify-space-around" lg="6">
                <div class="d-flex flex-column" style="height:95%">
                  <v-text-field
                    label="Title"
                    name="title"
                    v-model="categoryTitle"
                    ref="categoryTitle"
                    @keydown.enter="addNewCategory"
                    outlined
                  ></v-text-field>
                  <div class="d-flex justify-space-between">
                    <v-btn color="success" @click="addNewCategory">Add category</v-btn>
                    <v-btn class="random-color-btn" @click="randomColor">Random color</v-btn>
                  </div>
                </div>
              </v-col>
              <v-col sm="12" lg="6" class="d-flex justify-center">
                <v-color-picker elevation="15" hide-inputs mode="hexa" v-model="categoryColor"></v-color-picker>
              </v-col>
            </v-row>
            <v-divider v-if="categories.length" class="mt-4"></v-divider>
            <v-row>
              <v-col>
                <v-chip
                  v-for="(category, i) in categories"
                  outlined
                  label
                  :v-if="categories.length"
                  close
                  @click:close="deleteCategory(category.id)"
                  :key="i"
                  :color="category.color"
                  class="ma-2"
                >{{ category.title }}</v-chip>
              </v-col>
            </v-row>
          </div>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script type="text/javascript" src="./script.js" />

<style scoped>
.random-color-btn {
  background: linear-gradient(
    90deg,
    rgba(131, 58, 180, 1) 0%,
    rgba(253, 29, 29, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  ) !important;
}
</style>