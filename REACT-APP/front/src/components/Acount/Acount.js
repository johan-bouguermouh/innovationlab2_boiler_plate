import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Avatar } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { selectUserData } from '../../services/userApi';
import { API_URL } from '../../config'
import jwrDecode from "jwt-decode"
import { avatarUser } from './avatarUser';

const form = document.querySelector('form');


class UserAcount extends React.Component {

    state = {
      singleUser: null,
      avatarUser: {},
      error: null,
      avatarFiles: null
    };
    
    componentDidMount = async () => {
      console.log("did mount")
      try {
        const userid = jwrDecode(localStorage.getItem('authToken')).id
        console.log(userid)

        const response = await selectUserData(userid) ;
        this.setState({ singleUser: response.data, avatarUser: response.data.avatar ? response.data.avatar : null});
        // console.log())

      } catch (error) {
        this.setState({ error });
      }
    };

    setPicture = async (event) => {
        // console.log(event.target)
        const uploadFile = new FormData()
        uploadFile.append('files', event.target.files[0])
        if(event.target.files[0] !== null)
        {
          //envoie de l'image dans la base de donnée
          await fetch(API_URL+'/api/upload', {
            method: 'post',
            body: uploadFile
            })
          .then(response => response.json())
          .then(data => {
            // console.log(data[0])
            const imageUrl = data[0].url
            const putimage = new FormData()
            putimage.append('avatar', imageUrl)

            axios.put(API_URL+'/api/users/'+this.state.singleUser.id,putimage)
            .then((response)=>{
              console.log("RES ====", response)
              window.location.reload()

            }).catch((error)=>{
                //handle error
              })
          });
        }
        else{
          console.log('avatarstate non valide')
        }
    }

    render() {
  
      // Print errors if any
      if (this.state.error) {
        return <div>An error occured: {this.state.error.message}</div>;
      }
      //
      return (
        <section className='headerAcountUser'>
          <div className="heroBannerAcountUser">
            <img
              alt= {'photo de bannière de'}
              src= "http://localhost:1337/uploads/bangkok_946f80eedc.jpg"></img>
          </div>
          <section className = 'headerUserAcount'>
              <div>
                  {this.state.singleUser && avatarUser(this.state.singleUser.username,this.state.avatarUser)}
              <label className="labeluploadImageAvatar">
                    <i className="fas fa-upload"></i>
                    <input id="uploadImageAvatar" onChange={ this.setPicture } type="file" name="uploadButton"/>
              </label>
              </div>
              <div>
                  <Typography gutterBottom variant="h5" component="div">
                  {this.state.singleUser?.username}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                  {this.state.singleUser?.email}
                  </Typography>
              </div>
          </section>
        </section>
      );
    }
  }
  
  export default UserAcount;