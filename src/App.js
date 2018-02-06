import React, { Component } from 'react';
import Post from './Post';
import NewPostForm from './NewPostForm';
import PostsList from './PostsList';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';



class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      posts: []
    }

  };


  handleSubmit = (e) => {
    e.preventDefault();

    const title = this.state.form.title;
    const description = this.state.form.description;

    this.props.client.mutate({
      query: gql`
      mutation {
        createPost(
          imageUrl: ""
          title: $title
          description: $description){
          id
        }
      }
    `
    }).then(response => {
      this.fetchPosts();
    });
  }

  render() {
    return (
      <div className="App" style={{width:"500px", margin:"auto"}}>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React & GraphQL</h1>
        </header>

        <h1>Posts:</h1>
        <PostsList />
        <NewPostForm />
      
      </div>
    );
  }
}

export default App;
