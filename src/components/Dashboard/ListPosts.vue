<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Title</md-table-head>
        <md-table-head>Dscription</md-table-head>
        <md-table-head>Rating</md-table-head>
        <md-table-head>Action</md-table-head>
      </md-table-row>
      <md-table-row
        :key="`post_table_${index}`"
        v-for="(post, index) in posts"
      >
        <md-table-cell>{{ post.title }}</md-table-cell>
        <md-table-cell>{{ post.desc }}</md-table-cell>
        <md-table-cell>{{ post.rating }}</md-table-cell>
        <md-table-cell>
          <div
            class="post_delete"
            @click="deleteHandler(post.id)"
          >
            Delete
          </div>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ListPosts",
  created() {
    this.$store.dispatch("admin/getAdminPosts");
  },
  computed: {
    posts() {
      const posts = this.$store.getters["admin/getAdminPosts"];
      console.log("Posts: ", posts);
      return posts;
    }
  },
  methods: {
    deleteHandler(id) {
      console.log("DELETING: ", id);
    }
  }
};
</script>

