<template>
  <section class="post-list">
    <PostPreview id="1"
      thumbnail="https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg"
      title="Hello There!" previewText="This is my first post!" />
    <PostPreview id="2"
      thumbnail="https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg"
      title="Hello There - the second time!" previewText="This is my second post!" />
    <PostPreview id="3"
      thumbnail="https://www.brookings.edu/wp-content/uploads/2017/11/metro_20171121_tech-empowers-tech-polarizes-mark-muro.jpg"
      title="Hi!" previewText="This is my third post!" />
  </section>
</template>

<script>
import PostPreview from './PostPreview.vue';
export default {
  components: {
    PostPreview
  }
}
</script>

<style scoped>
.post-list {
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

}
</style>