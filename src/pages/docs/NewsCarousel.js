import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import {Button} from "@material-ui/core";
import Image from 'material-ui-image';
import Grid from '@material-ui/core/Grid';
import styled from "styled-components";
import firebase from '../../firebase'
// import OneSignal from 'react-onesignal';
import {                    
    Typography as MuiTypography,  
    Card as MuiCard,
    CardContent,
    CardHeader,
    withWidth
  } from "@material-ui/core";

import axios from 'axios';

import { spacing } from "@material-ui/system";
const Card = styled(MuiCard)(spacing);
// 58vh
const ChartWrapper = styled.div`
height: calc(55vh - 16px);
`;
const ChartWrapperOut = styled.div`
height: calc(58vh - 16px);
`;



export default class NewsCarousel extends React.Component {
  _isMounted = false;
    state = {
      personas: []
    }
    componentDidMount() {
      this._isMounted = true;
      // var options = {
      //   autoResubscribe:true,
      // }
      // OneSignal.initialize('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', options);
      var token = localStorage.getItem("token");

      if(token=="" || token == null){
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            
            var user = firebase.auth().currentUser;
            var name, email, photoUrl, uid, emailVerified;

            if (user != null) {
              name = user.displayName;
              email = user.email;
              photoUrl = user.photoURL;
              emailVerified = user.emailVerified;
              uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                               // this value to authenticate with your backend server, if
                               // you have one. Use User.getToken() instead.
                               user.providerData.forEach(function (profile) {
                                console.log("Sign-in provider: " + profile.providerId);
                                console.log("  Provider-specific UID: " + profile.uid);
                                console.log("  Name: " + profile.displayName);
                                console.log("  Email: " + profile.email);
                                console.log("  Photo URL: " + profile.photoURL);
                              });
            }
            localStorage.setItem("uid", uid);  
            //register to get token
            axios.post('https://app.movilaeswebdes.com/auth/register', {
              email: email,
              firebase_uuid: uid,
              last_name: "n/d",
              name:name,
              password:uid,
              phone_language: "es",
              provider:"Anonymous",
              push_tok:"n/d",
              pic_url:photoUrl
        },
        {
          headers: {            
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }    
      }
        )
        .then(function (response) {
          
          localStorage.setItem("token", response.data.auth_token);
          localStorage.setItem("tp", "0");
          localStorage.setItem("paths", []);
        })
        .catch(function (error) {
          console.log(error);
        });
  
          } else {
            localStorage.setItem("uid", "");
            // User is signed out.
            // ...
          }
          // ...
        });
  
        firebase.auth().signInAnonymously().catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
      }
      else{

      }
      
      


      axios.get(`https://app.movilaeswebdes.com/aes_news/read`)
        .then(res => {
          if (this._isMounted) {
          const personas = res.data.data;
          this.setState({ personas });
          }
        })
    }
    
    componentWillUnmount() {
      this._isMounted = false;
    }

    render() {
      return (        
        <Card>        
        <CardContent>
        <ChartWrapperOut>
          <Carousel>
            {
                this.state.personas.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
        </ChartWrapperOut>
        </CardContent>
      </Card>  
      )
    }
  }

function truncate(str) {
    return str.length > 65 ? str.substring(0, 62) + "..." : str;
}


function Item(props)
{    
    return (        
        <Paper>
            <ChartWrapper>
            <Image 
                onClick={() => console.log('onClick')}
                src={props.item.pic_url}
                style={{   }}                                                            
                />
            {/* <h2>{props.item.title}</h2> */}
            <h2 style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>             
                {truncate(props.item.title)}
            </h2>
            {/* <p>{props.item.albumId}</p> */}
            {/* <Button className="CheckButton">
                Check it out!
            </Button> */}
            </ChartWrapper>
        </Paper>        
    )
}