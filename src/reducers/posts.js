import { LOAD_POSTS } from "../actions";

export default function posts(state = [], action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.posts;
    default:
      return state;
  }
}