import Vuex from "vuex";

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
        return context.app.$axios
          .$get("/posts.json")
          .then(data => {
            const postsArray = [];
            for (const key in data) {
              postsArray.push({ ...data[key], id: key });
            }
            vuexContext.commit("setPosts", postsArray);
          })
          .catch(e => context.error(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit("setPosts", posts);
      },
      addPost(vuexContext, postData) {
        const createdPost = {
          ...postData,
          updatedDate: new Date()
        };
        return this.$axios
          .$post("/posts.json", createdPost)
          .then(data => {
            vuexContext.commit("addPost", {
              ...postData,
              id: data.name
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      editPost(vuexContext, editedPost) {
        return this.$axios
          .$put(
            process.env.baseUrl + "/posts/" + editedPost.id + ".json",
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
