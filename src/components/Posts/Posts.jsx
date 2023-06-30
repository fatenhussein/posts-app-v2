import React, { useEffect, useState } from "react";
import "semantic-ui-css/semantic.min.css";
import Comments from "../commentes/Comments";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import "./posts.css";
const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [activePostId, setActivePostId] = useState(null);

  const [postAuther, setPostAuther] = useState("");
  const [postDesc, setPostDesc] = useState("");

  const [reply, setReply] = useState("");

  const [currentPost, setCurrentPost] = useState("");

  const [name, setName] = useState("");
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const newComment = {
    avatar: faker.image.avatar(),
    name: name,
    date: {
      day: new Date().toJSON().slice(0, 10),

      hours: new Date().getHours(),
      ments: new Date().getMinutes(),
    },
    content: reply,
    id: small_id,
  };
  const addReply = (comment ,post) => {
    const currentPost = JSON.parse(localStorage.getItem("currentPost"));
    const updatedComments = [...currentPost.comments, comment];
    const updatedPost = { ...currentPost, comments: updatedComments };

    axios
      .put(`http://localhost:3500/posts/${currentPost.id}`, updatedPost)
      .then((response) => {
        console.log(response.data);
        setCurrentPost({ ...currentPost, comments: updatedComments });
      })
      .catch((error) => console.error(error));
      localStorage.setItem("currentPost", JSON.stringify(post));
  };

  const newObj = {
    content: postDesc,
    date: new Date().toJSON().slice(0, 10),
    comments: [],
    userName: postAuther,
    avatar: faker.image.avatar(),
  };

  const handleToggle = (postId) => {
    setActivePostId((prevId) => (prevId === postId ? null : postId));

  };

  const addPost = (obj) => {
    axios
      .post(apiUrl, obj)
      .then((response) => {
        setPosts([...posts, response.data]);
      })
      .catch((error) => {
        console.error("An error occurred:", error.response.data);
      });
  
  };
  const apiUrl = "http://localhost:3500/posts";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [posts]);

  return (
    <div
      className="padding"
      style={{
        minheight: "100vh",
        marginTop: "0rem",
      }}
    >
      <div class="content">
        <h2 class="text_shadows">"Talk is cheap. Show me the code."</h2>
      </div>
      <form className="ui reply form">
        <label id="white">User Name </label>
        <br />
        <div class="ui input" id="nameInput">
          <input
            type="text"
            placeholder="name..."
            onChange={(e) => setPostAuther(e.target.value)}
          />
        </div>
        <div className="field">
          <label id="theprosLabel"> Ask the pros </label>
          <textarea
            placeholder="Add post..."
            onChange={(e) => setPostDesc(e.target.value)}
          ></textarea>
        </div>
        <div
          className="ui blue labeled submit icon button"
          onClick={() => addPost(newObj)}
        >
          <i className="icon edit"></i> Add qustion
        </div>
      </form>
      <div className="ui relaxed items">
        {posts.map((post) => {
          return (
            <>
              <div className="item" key={post.id}>
                <div className="ui small image">
                  <img src={post.avatar} alt="User Avatar" />
                </div>
                <div className="middle aligned content">
                  <div className="header" class="wihte">
                    {post.userName}
                  </div>
                  <div className="description" class="wihte">
                    {post.content}
                  </div>
                  <div className="extra">
                    <div className="date" class="date">
                      {post.date}
                    </div>
                    <button
                      className="ui right floated button"
                      id="btn"
                      onClick={() => handleToggle(post.id, post)}
                    >
                      comments
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {activePostId === post.id && (
                  <>
                    <Comments
                      comments={post.comments}
                      postId={post.id}
                      post={post}
                    />

                    <form className="ui reply form">
                      <label id="userNameLabel">User Name </label>
                      <br />
                      <div class="ui input" id="nameInput">
                        <input
                          type="text"
                          placeholder="name..."
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="field" id="commentText">
                        <textarea
                          placeholder="Add comment..."
                          onChange={(e) => setReply(e.target.value)}
                        ></textarea>
                      </div>
                      <div
                        className="ui blue labeled submit icon button"
                        onClick={() => addReply(newComment ,post)}
                      >
                        <i className="icon edit"></i> Add Reply
                      </div>
                    </form>
                  </>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Posts;
