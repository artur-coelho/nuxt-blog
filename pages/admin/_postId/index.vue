<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmited" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from '../../../components/Admin/AdminPostForm.vue';
import axios from 'axios'

export default {
  layout: 'admin',
  components: {
    AdminPostForm
  },
  asyncData(context) {
    return axios.get('https://nuxt2-blog-default-rtdb.firebaseio.com/posts/' + context.params.postId + '.json')
      .then(res => {
        return {
          loadedPost: { ...res.data, id: context.params.postId }
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    onSubmited(editedPost) {
      this.$store.dispatch('editPost', editedPost)
        .then(() => {
          this.$router.push("/admin");

        })
    }
  }
}
</script>

<style scoped>
.update-form {
  width: 90%;
  margin: 20px auto;
}

@media (min-width: 768px) {
  .update-form {
    width: 500px;
  }
}
</style>