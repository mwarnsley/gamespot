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
    <md-dialog-confirm
      :md-active.sync="confirmDelete"
      md-title="Confirm Delete"
      md-content="Are you sure you want to delete this post? ( There is no turning back )"
      md-confirm-text="Yes, Delete this post"
      md-cancel-text="NO, DO NOT DELETE IT!"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"
    />
  </div>
</template>

<script>
export default {
  name: "ListPosts",
  data() {
    return {
      confirmDelete: false,
      deleteId: ""
    };
  },
  created() {
    this.$store.dispatch("admin/getAdminPosts");
  },
  computed: {
    posts() {
      const posts = this.$store.getters["admin/getAdminPosts"];
      return posts;
    }
  },
  methods: {
    deleteHandler(id) {
      this.confirmDelete = true;
      this.deleteId = id;
    },
    onCancel() {
      this.confirmDelete = false;
      this.deleteId = "";
    },
    onConfirm() {
      this.$store.dispatch("admin/deletePost", this.deleteId);
      this.confirmDelete = false;
      this.deleteId = "";
    }
  }
};
</script>

