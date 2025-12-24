export type CommentUser = {
  id: number;
  username: string;
  fullName: string;
};

export type ProductComment = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: CommentUser;
};

export type CommentsState = {
  comments: Record<number, ProductComment[]>;
  isLoading: boolean;
  error: string;
  message: string;
};

export type CommentsResponse = {
  comments: ProductComment[];
  total: number;
  skip: number;
  limit: number;
};
