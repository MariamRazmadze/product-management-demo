import { useSnapshot } from "valtio";
import { useEffect, useState } from "react";
import { useComments } from "../../hooks/useComments";
import { CommentStore, CommentActions } from "../../stores/commentStore";
import { useTranslation } from "../../hooks/useTranslation";
import AlertMessage from "../ui/AlertMessage";

type CommentSectionProps = {
  productId: number;
};

export default function CommentSection({ productId }: CommentSectionProps) {
  const { t } = useTranslation();
  const { addComment, fetchComments } = useComments(productId);
  const commentState = useSnapshot(CommentStore);
  const comments = commentState.comments[productId] || [];
  const { isLoading, error, message } = commentState;
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    return () => {
      CommentActions.clearMessages();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    await addComment(commentText);
    setCommentText("");
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
        {t.comments?.title || "Comments"}{" "}
        {isLoading && comments.length === 0 ? (
          <span className="text-gray-400">...</span>
        ) : (
          `(${comments.length})`
        )}
      </h3>

      <AlertMessage message={message} error={error} />

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={t.comments?.placeholder || "Write a comment..."}
          className="w-full p-3 rounded-lg border bg-white border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !commentText.trim()}
          className="mt-2 px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? t.common?.loading || "Loading..."
            : t.comments?.post || "Post Comment"}
        </button>
      </form>

      <div className="space-y-4">
        {isLoading && comments.length === 0 ? (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t.common?.loading || "Loading..."}
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {comment.user.username}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {comment.likes} {comment.likes === 1 ? "like" : "likes"}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-200">{comment.body}</p>
            </div>
          ))
        )}

        {comments.length === 0 && !isLoading && (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            {t.comments?.noComments ||
              "No comments yet. Be the first to comment!"}
          </p>
        )}
      </div>
    </div>
  );
}
