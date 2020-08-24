export default {
  name: "TodoList",

  data: () => ({
    todoItems: [],
    categories: [],
    tab: null,
    itemTitle: "",
    selectedCategory: null,
    categoryTitle: "",
    categoryColor: "",
    filterOptions: [
      { text: "All", value: "" },
      { text: "Active", value: "active" },
      { text: "Completed", value: "completed" },
    ],
    filterOptionSelected: "",
  }),

  mounted() {
    this.fetchItems();
    this.fetchCategories();
    this.randomColor();
  },

  computed: {
    filteredItems: function() {
      return this.filterItems();
    },
    doneItems: function() {
      return this.todoItems.filter((item) => item.done).length;
    },
    totalItems: function() {
      return this.todoItems.length;
    },
    itemsPercentage: function() {
      return (this.doneItems / this.totalItems) * 100;
    },
  },

  methods: {
    addNewItem: function() {
      if (!this.itemTitle) {
        this.$refs.itemTitle.focus();
        return;
      }
      this.todoItems.push({
        id: new Date().getTime(),
        title: this.itemTitle,
        done: false,
        category: this.selectedCategory,
      });
      this.saveItems();
      this.itemTitle = "";
    },
    addNewCategory: function() {
      if (!this.categoryTitle) {
        this.$refs.categoryTitle.focus();
        return;
      }
      this.categories.push({
        id: new Date().getTime(),
        title: this.categoryTitle,
        color: this.categoryColor,
      });
      this.saveCategories();
      this.categoryTitle = "";
      this.randomColor();
    },
    getCategory: function(categoryId) {
      return this.categories.find((category) => category.id === categoryId);
    },
    deleteItem: function(itemId) {
      this.todoItems = this.todoItems.filter((item) => item.id !== itemId);
      this.saveItems();
    },
    deleteCategory: function(categoryId) {
      this.categories = this.categories.filter(
        (category) => category.id !== categoryId
      );
      this.saveCategories();
    },
    toggleDone: function(itemId) {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === itemId) {
          item.done = !item.done;
        }
        return item;
      });
      this.saveItems();
    },
    randomColor: function() {
      let n = (Math.random() * 0xfffff * 1000000).toString(16);
      this.categoryColor = "#" + n.slice(0, 6);
    },
    fetchItems: function() {
      if (localStorage.getItem("todoItems")) {
        try {
          this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
        } catch (err) {
          localStorage.removeItem("todoItems");
        }
      }
    },
    saveItems: function() {
      localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
    },
    saveCategories: function() {
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    fetchCategories: function() {
      if (localStorage.getItem("categories")) {
        try {
          this.categories = JSON.parse(localStorage.getItem("categories"));
        } catch (err) {
          localStorage.removeItem("categories");
        }
      }
    },
    filterItems: function() {
      if (this.filterOptionSelected === "active")
        return this.todoItems.filter((item) => !item.done);
      if (this.filterOptionSelected === "completed")
        return this.todoItems.filter((item) => item.done);
      return this.todoItems;
    },
    clearCompleted: function() {
      this.todoItems = this.todoItems.filter((item) => !item.done);
      this.saveItems();
    },
    completeAll: function() {
      this.todoItems = this.todoItems.map((item) => {
        if (!item.done) {
          item.done = true;
          return item;
        }
      });
      this.saveItems();
    },
  },
};
