import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import {Button} from "@material-ui/core";
import Image from 'material-ui-image';
import Grid from '@material-ui/core/Grid';
import styled from "styled-components";
import Moral from "./Modal"
import {                 
    Avatar,   
    Typography as MuiTypography,  
    Card as MuiCard,
    CardActions,  
    CardContent,
    CardMedia as MuiCardMedia,
    CardHeader,
    withWidth,
    Typography
  } from "@material-ui/core";

import axios from 'axios';
import { AvatarGroup as MuiAvatarGroup } from '@material-ui/lab';
import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);
const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;


export default class NewsCarousel extends React.Component {
  _isMounted = false;
    state = {
      personas: []
    }
    componentDidMount() {
      this._isMounted = true;
      axios.get(`https://app.movilaesweb.com/power_outgages/read`)
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
                
                this.state.personas.map( (item, i) => <Item key={i} item={item} image={item.pic_url} title={item.type} description={item.affected_zones} dtdtail = {item.datetime_event} /> )                              
      )
    }
  }

  
function Item({ image, title, description, chip, dtdtail }) {
  return (
    
    <Grid item xs={12} lg={12} xl={12} >      
    <Card mb={6}>
      {image ? <CardMedia image={image} title={title} /> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <p gutterBottom variant="h5" component="h2">
          {description}
        </p>
        <span>
          {dtdtail}
        </span>
        {chip}
        <Typography mb={4} component="p">
          {/* {description} */}
        </Typography>      
      </CardContent>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Moral title={title} imagex={image} descriptionx={description}></Moral>
        {/* <Button size="small" color="primary">
          Ver más
        </Button> */}
      </CardActions>
    </Card>
    
    </Grid>    
      
  );
}

