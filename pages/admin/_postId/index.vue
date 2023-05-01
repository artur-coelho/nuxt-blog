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
    console.log(context)
    return axios.get('https://nuxt2-blog-default-rtdb.firebaseio.com/posts/' + context.params.postId + '.json')
      .then(res => {
        return {
          loadedPost: res.data
        }
      })
      .catch(e => context.error(e))
  },
  methods: {
    onSubmited(editedPost) {
      axios.put('https://nuxt2-blog-default-rtdb.firebaseio.com/posts/' + this.$route.params.postId + '.json', editedPost)
        .then(res => {
          console.log(res)
          this.$router.push('/admin')
        })
        .catch(e => {
          console.log(e)
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