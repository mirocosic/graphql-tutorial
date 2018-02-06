import React from 'react';
import Post from './Post';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

export const fetchQuery = gql`
  query {
    allPosts {
      id
      title
      description
    }
  }
`;

const deletePost =  gql`mutation deletePost($id: ID!) {
  deletePost(id: $id){
    id
  }
}`;

class PostsList extends React.Component {

  deletePost = (id) => {
    this.props.deletePost({
      variables: {
        id
      },
      update: (store, {data: { deletePost }}) => {
        const posts = store.readQuery({ query: fetchQuery });
        const updatedPosts = posts.allPosts.filter(post => {
          return post.id !== deletePost.id;
        })
        store.writeQuery({query: fetchQuery, data: {allPosts: updatedPosts}});
      }
    }).then((response)=>{

    })
  }

  render(){
    const data = this.props.fetchQuery;
    if (data.loading) {
      return (<p>Loading...</p>);
    }

    if (data.allPosts) {
      return (
        <div>
        { data.allPosts.map(post => {
            return <Post post={post} key={post.id} deletePost={this.deletePost}/>
          })
        }
        </div>
      );
    }
    return (<p>No data...</p>);

  }

}


export default compose(
   graphql(fetchQuery, {
      name: "fetchQuery"
   }),
   graphql(deletePost, {
      name: "deletePost"
   }),
)(PostsList);
