import Vuex from "vuex";
import axios from "axios";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: []
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts;
      },
      addPost(state, post) {
        state.loadedPosts.push(post);
      },
      editPost(state, editedPost) {
        const index = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[index] = editedPost;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios
          .get("https://nuxt2-blog-default-rtdb.firebaseio.com/posts.json")
          .then(res => {
            console.log(res);
            const postsArray = [];
            for (const key in res.data) {
              postsArray.push({ ...res.data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, postData) {
        return axios
          .post("https://nuxt2-blog-default-rtdb.firebaseio.com/posts.json", {
            ...postData,
            updatedDate: new Date()
          })
          .then(result => {
            console.log(result);
            vuexContext.commit("addPost", {
              ...postData,
              id: result.data.name
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      editPost(vuexContext, editedPost) {
        return axios
          .put(
            "https://nuxt2-blog-default-rtdb.firebaseio.com/posts/" +
              editedPost.id +
              ".json",
            editedPost
          )
          .then(res => {
            console.log(res);
            vuexContext.commit("editPost", editedPost);
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts;
      }
    }
  });
};

export default createStore;
