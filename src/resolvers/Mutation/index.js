import { createPost } from "./posts/createPost";
import { updatePost } from "./posts/updatePost";
import { deletePost } from "./posts/deletePost";
import { createTag } from "./tags/createTag";
import { deleteTag } from "./tags/deleteTag";
import { followTag } from "./tags/followTag";
import { unFollowTag } from "./tags/unFollowTag";
import { login } from "./users/login";
import { signup } from "./users/signup";
import { followAuthor } from "./users/followAuthor";
import { unFollowAuthor } from "./users/unFollowAuthor";


export default {
  login,
  signup,
  createPost,
  updatePost,
  deletePost,
  createTag,
  deleteTag,
  followTag,
  unFollowTag,
  followAuthor,
  unFollowAuthor
};