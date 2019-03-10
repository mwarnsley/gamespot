<template>
  <div class="dashboard_form">
    <h1>Add Posts</h1>
    <form @submit.prevent="onSubmit">
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
  </div>
</template>

<script>
import { maxLength, required } from "vuelidate/lib/validators";

export default {
  name: "AddPosts",
  data() {
    return {
      formData: {
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
  methods: {
    onSubmit() {
      console.log("Submitting");
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