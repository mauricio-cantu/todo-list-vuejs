export default {
  name: "TodoList",

  data: () => ({
    todoItems: [],
    tab: null,
    categories: [{ id: 1, title: "Default", color: "#FDD835" }],
    selectedCategory: 1,
    itemTitle: "",
    itemCategory: 1,
    categoryTitle: "",
    categoryColor: "",
    itemRules: [(title) => !!title || "A title is required"],
    categoryRules: [(title) => !!title || "A title is required"],
  }),

  mounted() {
    if (localStorage.getItem("todoItems")) {
      try {
        this.todoItems = JSON.parse(localStorage.getItem("todoItems"));
      } catch (err) {
        localStorage.removeItem("todoItems");
      }
    }

    if (localStorage.getItem("categories")) {
      try {
        this.categories = JSON.parse(localStorage.getItem("categories"));
      } catch (err) {
        localStorage.removeItem("categories");
      }
    }

    this.randomColor();
  },

  computed: {
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
      localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
      this.itemTitle = "";
      this.$refs.itemTitle.resetValidation();
      this.$refs.selectedCategory.resetValidation();
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
      localStorage.setItem("categories", JSON.stringify(this.categories));
      this.categoryTitle = "";
      this.randomColor();
      this.$refs.categoryTitle.resetValidation();
    },
    getCategory: function(categoryId) {
      return this.categories.find((category) => category.id === categoryId);
    },
    deleteItem: function(itemId) {
      this.todoItems = this.todoItems.filter((item) => item.id !== itemId);
      localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
    },
    deleteCategory: function(categoryId) {
      this.categories = this.categories.filter(
        (category) => category.id !== categoryId
      );
      localStorage.setItem("categories", JSON.stringify(this.categories));
    },
    toggleDone: function(itemId) {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === itemId) {
          item.done = !item.done;
        }
        return item;
      });

      localStorage.setItem("todoItems", JSON.stringify(this.todoItems));
    },
    randomColor: function() {
      let n = (Math.random() * 0xfffff * 1000000).toString(16);
      this.categoryColor = "#" + n.slice(0, 6);
    },
    resetFormValidation: function(tabTarget) {
      if (tabTarget === 1) {
        this.$refs.itemTitle.resetValidation();
        this.$refs.selectedCategory.resetValidation();
      } else {
        this.$refs.categoryTitle.resetValidation();
      }
    },
  },
};
