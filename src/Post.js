import React from 'react';
import './index.css';

const Post = (props) => {
  return (
    <div className="post">
      <h2>{props.post.title} <i className="removePost" onClick={()=>{props.deletePost(props.post.id)}}>X</i></h2>
      <p>{props.post.description}</p>
    </div>
  );
}

export default Post;
