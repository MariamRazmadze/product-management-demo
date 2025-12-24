import { proxy } from "valtio";
import type { CommentsState, ProductComment } from "./types/comment";
import {
  createCommonActions,
  createMessageActions,
} from "./utils/storeHelpers";

const initialState: CommentsState = {
  comments: {},
  isLoading: false,
  error: "",
  message: "",
};

export const CommentStore = proxy<CommentsState>(initialState);

export const CommentActions = {
  setComments: (productId: number, comments: ProductComment[]) => {
    CommentStore.comments[productId] = comments;
  },

  addComment: (comment: ProductComment) => {
    if (!CommentStore.comments[comment.postId]) {
      CommentStore.comments[comment.postId] = [];
    }
    CommentStore.comments[comment.postId].unshift(comment);
  },

  clearComments: (productId: number) => {
    delete CommentStore.comments[productId];
  },

  ...createCommonActions(CommentStore),
  ...createMessageActions(CommentStore),
};
