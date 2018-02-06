import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import { fetchQuery } from './PostsList';

const createPost = gql`mutation CreatePost($imageUrl: String!, $title: String!, $description: String!) {
  createPost(
    imageUrl: $imageUrl
    title: $title
    description: $description){
    id
    title
    description
  }
}`;

class NewPostForm extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      form: {}
    }
  }

  handleInputChange = (field) => (e) => {
      this.setState({
        form: {
          ...this.state.form,
          [field]:e.target.value
        }
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const imageUrl = "testing";
    const title = this.state.form.title;
    const description = this.state.form.description;

    this.props.mutate({
      variables: {
        imageUrl,
        title,
        description
      },
      update: (store, {data: {createPost}}) => {
        const posts = store.readQuery({query: fetchQuery});
        store.writeQuery({query: fetchQuery, data: {allPosts: [...posts.allPosts, createPost]}});
      }
    }).then((response) => {
      this.setState({
        form: {
          title: '',
          description: ''
        }
      });

      this.titleInput.focus();

    })
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
      <fieldset>
        <input type="text" name="title" ref={(titleInput) => {this.titleInput = titleInput}}
        placeholder="title"
        value={this.state.form.title} onChange={this.handleInputChange("title").bind(this)}/> <br/>
        <input type="text" name="description" placeholder="description"
        value={this.state.form.description} onChange={this.handleInputChange("description").bind(this)}/> <br/>
        <button type="submit">Save post</button>
      </fieldset>
      </form>
    );
  }
}

export default graphql(createPost)(NewPostForm);
