<template>
  <div class="dashboard_form">
    <h1>Add Posts</h1>
    <form @submit.prevent="onSubmit">
      <div v-if="imageUpload">
        <img :src="imageUpload" />
      </div>
      <div class="input_field">
        <input
          @change="processFile($event)"
          ref="addPostImageInput"
          type="file"
        />
      </div>
      <div
        class="input_field"
        :class="{ invalid: $v.formData.title.$error}"
      >
        <label for="title">Title</label>
        <input
          @blur="$v.formData.title.$touch()"
          type="text"
          v-model="formData.title"
        />
        <p
          class="error_label"
          v-if="$v.formData.title.$error"
        >
          Title is required
        </p>
      </div>
      <div
        class="input_field"
        :class="{ invalid: $v.formData.desc.$error}"
      >
        <label for="desc">Description</label>
        <input
          @blur="$v.formData.desc.$touch()"
          type="text"
          v-model="formData.desc"
        />
        <p
          class="error_label"
          v-if="$v.formData.desc.$error"
        >
          Description is required
        </p>
        <p
          class="error_label"
          v-if="!$v.formData.desc.maxLength"
        >
          Must not be greater than {{ $v.formData.desc.$params.maxLength.max }} characters
        </p>
      </div>
      <div
        class="input_field"
        :class="{ invalid: $v.formData.desc.$error}"
      >
        <wysiwyg v-model="formData.content" />
      </div>
      <div
        class="input_field"
        :class="{ invalid: $v.formData.desc.$error}"
      >
        <label for="rating">Rating</label>
        <select
          @blur="$v.formData.rating.$touch()"
          :class="{ invalid: $v.formData.rating.$error}"
          name="rating"
          v-model="formData.rating"
        >
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <p
          class="error_label"
          v-if="$v.formData.rating.$error"
        >
          You need to select a rating
        </p>
      </div>
      <button type="submit">Add Post</button>
    </form>

    <div
      class="post_succesfull"
      v-if="addPostStatus"
    >
      Your post was added succesfully
    </div>

    <md-dialog :md-active="dialog">
      <p>Your most has no content, are you sure you want to post this?</p>
      <md-dialog-actions>
        <md-button @click="dialogOnCancel">Oops, cancel save</md-button>
        <md-button @click="dialogOnConfirm">Yes, I am sure</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import { maxLength, required } from "vuelidate/lib/validators";

export default {
  name: "AddPosts",
  data() {
    return {
      dialog: false,
      formData: {
        img: "",
        title: "",
        desc: "",
        content: "",
        rating: ""
      }
    };
  },
  validations: {
    formData: {
      title: {
        required
      },
      desc: {
        maxLength: maxLength(100),
        required
      },
      rating: {
        required
      }
    }
  },
  destroyed() {
    this.$store.commit("admin/clearImageUpload");
  },
  computed: {
    addPostStatus() {
      const status = this.$store.getters["admin/addPostStatus"];

      if (status) {
        this.clearPost();
        this.$store.commit("admin/clearImageUpload");
      }

      return status;
    },
    imageUpload() {
      const imageUrl = this.$store.getters["admin/imageUpload"];

      this.formData.img = imageUrl;

      return imageUrl;
    }
  },
  methods: {
    async addPost() {
      this.$store.dispatch("admin/addPost", this.formData);
    },
    clearPost() {
      this.$v.$reset();
      this.$refs.addPostImageInput.value = "";
      this.formData = {
        title: "",
        desc: "",
        content: "",
        rating: ""
      };
    },
    dialogOnCancel() {
      this.dialog = false;
    },
    dialogOnConfirm() {
      this.dialog = false;
      this.addPost();
    },
    onSubmit() {
      if (!this.$v.$invalid) {
        if (!this.formData.content) {
          // If the WYSIWYG is empty then we will show a dialog
          this.dialog = true;
        } else {
          this.addPost();
        }
      } else {
        alert("Something went wrong");
      }
    },
    processFile(event) {
      const file = event.target.files[0];

      this.$store.dispatch("admin/imageUpload", file);
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.input_field.invalid input,
.input_field.invalid select {
  border: 1px solid red;
}
</style>