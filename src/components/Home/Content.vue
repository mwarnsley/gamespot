<template>
  <div class="container">
    <div class="home_container">
      <md-card
        :key="`home_post_${index}`"
        v-for="(post, index) in posts"
      >
        <md-card-media md-ratio="4:3">
          <img :src="post.img" />
        </md-card-media>
        <md-card-header>
          <h2 class="md-title">{{ post.title }}</h2>
          <div class="md-subhead">
            <div>{{ post.desc }}</div>
          </div>
        </md-card-header>
        <md-card-actions>
          <app-button
            :addClass="['small_link']"
            :linkTo="`/post/${post.id}`"
            type="link"
          >See review</app-button>
        </md-card-actions>
      </md-card>
    </div>
    <div class="load_more">
      <app-button
        :addClass="['small_link']"
        :action="loadMore"
        type="btn"
      >Load More</app-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  created() {
    this.$store.dispatch("posts/getAllPosts", {
      limit: 3
    });
  },
  computed: {
    posts() {
      return this.$store.getters["posts/getAllPosts"];
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch("posts/getAllPosts", {
        limit: this.posts.length + 3
      });
    }
  }
};
</script>

