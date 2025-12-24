import { CommentActions } from "../stores/commentStore";
import type { ProductComment, CommentsResponse } from "../stores/types/comment";
import { useApi } from "./useApi";
import { handleAsync } from "../utils/asyncHandler";
import { AuthStore } from "../stores/authStore";

export const useComments = (productId: number) => {
  const api = useApi();

  const fetchComments = async () => {
    const result = await handleAsync(
      async () => {
        const data = await api.get<CommentsResponse>(
          `/comments/post/${productId}`
        );

        CommentActions.setComments(productId, data.comments);
        return true;
      },
      {
        setLoading: CommentActions.setLoading,
        setError: CommentActions.setError,
        errorMessage: "Failed to fetch comments",
      }
    );

    return result ?? false;
  };

  const addComment = async (text: string) => {
    const result = await handleAsync(
      async () => {
        const response = await api.post<ProductComment>("/comments/add", {
          body: text,
          postId: productId,
          userId: AuthStore.user?.id || 1,
        });
        const newComment: ProductComment = {
          id: response.id,
          body: text,
          postId: productId,
          likes: 0,
          user: {
            id: AuthStore.user?.id || 1,
            username: AuthStore.user?.username || "Guest",
            fullName: `${AuthStore.user?.firstName || "Guest"} ${AuthStore.user?.lastName || "User"}`,
          },
        };

        CommentActions.addComment(newComment);
        CommentActions.setMessage("Comment added successfully!");
        return true;
      },
      {
        setLoading: CommentActions.setLoading,
        setError: CommentActions.setError,
        errorMessage: "Failed to add comment",
      }
    );

    return result ?? false;
  };

  return {
    fetchComments,
    addComment,
  };
};
