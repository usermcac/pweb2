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



      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          // ...          
          localStorage.setItem("uid", uid);
          //register to get token
          axios.post('https://mcacdvmobileapi001.azurewebsites.net/auth/register', {
            email: "n/d",
            firebase_uuid: uid,
            last_name: "n/d",
            name:"n/d",
            password:uid,
            phone_language: "es",
            provider:"Anonymous",
            push_tok:"n/d",
            pic_url:""
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


      axios.get(`https://mcacdvmobileapi001.azurewebsites.net/aes_news/read`)
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