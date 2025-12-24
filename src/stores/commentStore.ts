import { proxy } from "valtio";
import type { CommentsState, ProductComment } from "./types/comment";
import { createCommonActions } from "./utils/storeHelpers";

const initialState: CommentsState = {
  comments: {},
  isLoading: false,
  error: "",
};

export const commentStore = proxy<CommentsState>(initialState);

export const CommentActions = {
  setComments: (productId: number, comments: ProductComment[]) => {
    commentStore.comments[productId] = comments;
  },

  addComment: (comment: ProductComment) => {
    if (!commentStore.comments[comment.postId]) {
      commentStore.comments[comment.postId] = [];
    }
    commentStore.comments[comment.postId].unshift(comment);
  },

  clearComments: (productId: number) => {
    delete commentStore.comments[productId];
  },

  ...createCommonActions(commentStore),
};
