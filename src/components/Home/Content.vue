<template>
  <div class="container">
    <div class="home_container">
      <md-card
        :key="`home_post_${index}`"
        v-for="(post, index) in posts"
      >
        <md-card-media md-ratio="16:9">
          <img :src="require(`../../assets/images/featured/${post.img}`)" />
        </md-card-media>
        <md-card-header>
          <h2 class="title">{{ post.title }}</h2>
          <div class="md-subhead">
            <div>{{ post.description }}</div>
          </div>
        </md-card-header>
        <md-card-actions>
          <app-button
            :addClass="['small_link']"
            linkTo="#"
            type="link"
          >See review</app-button>
        </md-card-actions>
      </md-card>
    </div>
  </div>
</template>

<script>
import posts from "../../assets/posts.js";

export default {
  name: "Content",
  data() {
    return {
      posts
    };
  }
};
</script>

