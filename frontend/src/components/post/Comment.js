import Moment from "react-moment";
import { useEffect, useRef, useState } from "react";
import CreateCommentsInComment from "./CreateCommentInComment";
import { getCommentInComment } from "../../functions/comment";
export default function Comment({ comment, user }) {
  const [isReplying, setIsReplying] = useState(false);
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
  const showMore = () => {
    setCount((prev) => prev + 3);
  };
  const handleReplyClick = () => {
    setIsReplying((prevIsReplying) => !prevIsReplying);
  };
  useEffect(() => {
    getComments();
  }, [comment]);

  const getComments = async () => {
    const res = await getCommentInComment(comment._id, user.token);
    setComments(res);
  };
  return (
    <>
      <div className="comment">
        <img src={comment.commentBy.picture} alt="" className="comment_img" />
        <div className="comment_col">
          <div className="comment_wrap">
            <div className="comment_name">
              {comment.commentBy.first_name} {comment.commentBy.last_name}
            </div>
            <div className="comment_text">{comment.comment}</div>
          </div>
          {comment.image && (
            <img src={comment.image} alt="" className="comment_image" />
          )}
          <div className="comment_actions">
            
            <span>Like</span>
            <span onClick={handleReplyClick}>Reply</span>
            <span>
              <Moment fromNow interval={30}>
                {comment.commentAt}
              </Moment>
            </span>
          </div>
        </div>
      </div>
      <div className="commentIncomment">
        {comments &&
          comments
            .sort((a, b) => {
              return new Date(b.commentAt) - new Date(a.commentAt);
            })
            .slice(0, count)
            .map((comment, i) => (
              <Comment comment={comment} user={user} key={i} />
            ))}
        {count < comments.length && (
          <div className="view_comments" onClick={() => showMore()}>
            View more {comments.length} comments
          </div>
        )}
      </div>

      <div className="commentIncomment">
        {isReplying && (
          <CreateCommentsInComment
            user={user}
            commentId={comment._id}
            setComments={setComments}
            setCount={setCount}
          />
        )}
      </div>
    </>
  );
}
