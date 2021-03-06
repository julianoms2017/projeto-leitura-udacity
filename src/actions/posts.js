import * as API from "../services/Api";

export const LOAD_POSTS = "LOAD_POSTS";
export const INSERT_POST = "INSERT_POST";
export const UPDATE_POST = "UPDATE_POST";
export const GET_POST = "GET_POST";

export const loadPosts = posts => {
  return {
    type: LOAD_POSTS,
    posts
  };
};

export const getPost = post => {
  return {
    type: GET_POST,
    post
  };
};

export const insertNewPost = post => {
  return {
    type: INSERT_POST,
    post
  };
};

export const updatePost = post => {
  return {
    type: UPDATE_POST,
    post
  };
};

export const getPosts = () => {
  return dispatch => {
    API.getAllPosts().then(posts => {
      dispatch(loadPosts(posts));
    });
  };
};

export const getPostById = id => {
  return dispatch => {
    API.getPost(id).then(post => {
      dispatch(getPost(post));
    });
  };
};

export const getPostsByCategory = category => {
  return dispatch => {
    API.getAllPostsByCategory(category).then(posts => {
      dispatch(loadPosts(posts));
    });
  };
};

export const persistPost = (post, successCallback, isEdit = false) => {
  return dispatch => {
    if (isEdit) {
      API.updatePost({
        ...post
      }).then(response => {
        const updatedPost = response.data;
        if (successCallback) successCallback();
        dispatch(updatePost(updatedPost));
        dispatch(getPost(updatedPost));
      });
    } else {
      API.savePost({
        ...post
      }).then(response => {
        const newPost = response.data;
        if (successCallback) successCallback();
        dispatch(insertNewPost(newPost));
      });
    }
  };
};

export const saveVote = (id, typeVote) => {
  return dispatch => {
    API.sendVote(id, typeVote).then(response => {
      const updatedPost = response.data;
      dispatch(updatePost(updatedPost));
    });
  };
};
