import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { selectPost } from '../../services/postApi';


class Post extends React.Component {



  state = {
    singleposts: [],
    error: null,
  };

  componentDidMount = async () => {
    try {
      const response = selectPost() ;
      console.log(response)
      this.setState({ singleposts: response.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { error, singlepost } = this.state;

    // Print errors if any
    if (error) {
      return <div>An error occured: {error.message}</div>;
    }

    return (

      <div className="App">
        <ul>
          {this.state.singleposts.map(singlepost => (
            <li key={singlepost.id}>{singlepost.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Post;
