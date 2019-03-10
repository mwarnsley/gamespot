<template>
  <div class="container dashboard_container">
    <div class="admin_nav">
      <ul>
        <li>
          <router-link to="/dashboard/add_posts">Add Posts</router-link>
        </li>
        <li>
          <router-link to="/dashboard/posts_list">Manage Posts</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Dashboard"
};
</script>

