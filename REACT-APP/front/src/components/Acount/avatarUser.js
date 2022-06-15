import React from 'react'
import { Avatar } from '@mui/material';
import { API_URL } from '../../config'
//avatarPicture : this.props.data?.avatar[0],
//firstleterName : this.props.data.username,
export function avatarUser(username, avatarUrl){
        if (avatarUrl) {
          return <Avatar
          className="AvatarImage"
          alt= {'photo de profil de' + username}
          src= {API_URL + avatarUrl}
          />;
        }
        //
        return (
            <Avatar className="AvatarImage">{username.substr(0, 1).toUpperCase()}</Avatar>
        );
}

