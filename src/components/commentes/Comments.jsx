import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import "./comments.css";
const Comments = ({ comments, post }) => {
  const [clicked, setclicked] = useState(false);
  const [editetComment, setEditetComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);
  const deleteComment = (id) => {
    const arrComments = comments;
    const deleted = arrComments.filter((comment) => comment.id !== id);

    const updatedPost = { ...post, comments: deleted };
    axios
      .put(`http://localhost:3500/posts/${post.id}`, updatedPost)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
    localStorage.setItem("currentPost", JSON.stringify(updatedPost));
  };
  const editComment = (comment, id) => {
    let arrComments = comments;
    console.log(arrComments);

    const index = arrComments.findIndex((comment) => comment.id === id);
    if (index !== -1) {
      const updatedComment = { ...arrComments[index], content: editetComment };
      arrComments = arrComments.map((comment, i) =>
        i === index ? updatedComment : comment
      );

      setActiveCommentId((prevId) => (prevId === id ? null : id));
    }

    console.log(arrComments);

    const updatedPost = { ...post, comments: arrComments };
    axios
      .put(`http://localhost:3500/posts/${post.id}`, updatedPost)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
    localStorage.setItem("currentPost", JSON.stringify(updatedPost));
    setEditetComment("");
  };
  return (
    <div className="ui comments">
      <h3 className="ui dividing header">Comments</h3>
      {comments.map((comment) => {
        return (
          <div className="comment">
            <a className="avatar">
              <img src={comment.avatar} />
            </a>

            <div className="content">
              <a className="author" id="wihte">
                {comment.name}
              </a>
              <div className="metadata">
                <span className="date">{`${comment.date.day} At ${comment.date.hours}:${comment.date.ments}`}</span>
              </div>

              <div className="text" id="wihte">
                {comment.content}
              </div>

              <div className="actions">
                <a className="reply" id="gray">
                  Reply
                </a>
                <a
                  className="reply"
                  id="gray"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </a>
                <a
                  className="reply"
                  id="gray"
                  onClick={() => editComment(comment, comment.id)}
                >
                  Edit
                </a>
              </div>
            </div>
            {activeCommentId === comment.id && (
              <div class="ui input">
                <input
                  type="text"
                  placeholder="Edit..."
                  onChange={(e) => setEditetComment(e.target.value)}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
