import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import "./comments.css";
const Comments = ({ comments, post }) => {
  const [editetComment, setEditetComment] = useState("");
  const [activeCommentId, setActiveCommentId] = useState(null);

  // delet the commont function
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

  // edit the comment
  const editComment = (comment, id) => {
      //id for the current comment 
    let arrComments = comments;
    console.log(arrComments);

  // itrate over the comments array to find the id if it found retrun the index of it else
  // retrun -1
      
    const index = arrComments.findIndex((comment) => comment.id === id);
    if (index !== -1) {
      // update the  content proprty of the current content  with the thing the useer will enter 
      const updatedComment = {...arrComments[index], content: editetComment };
     // update the  arrComments  by naping ovser it and replace the current comment(index) with the updated comment
      arrComments = arrComments.map((comment, i) =>
        i === index ? updatedComment : comment
      );


      {/*  th toggle part */}
      setActiveCommentId((prevId) => (prevId === id ? null : id));
    }

    console.log(arrComments);


    {/*  after update the arrComments  upddate the current post comments */}
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
      <h3 className="ui dividing header" >Comments</h3>
      {/**map over the comment proprteis */}
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
