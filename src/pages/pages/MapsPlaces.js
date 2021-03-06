import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Moral from "./Modal"
import Box from '@material-ui/core/Box';
import {
  CardActionArea,
  CardActions,
  CardContent,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardMedia as MuiCardMedia,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core";
import { elementClosest } from "@fullcalendar/core";
import { spacing } from "@material-ui/system";
const Card = styled(MuiCard)(spacing);
const containerStyle = {
  // position: 'relative',
  background: 'red',
  width: 'auto',
  height: '60%'
}

const mapStyles = {  
  width: '100%',
  height: '100%',
  
};


// const mapStyles = {
//   width: '80%',
//   height: '60%'
// };

const cardStyles = {
  width: '80%',
  height: '90%',
  background: 'red'
};
// 80% y 70%

const CardMedia = styled(MuiCardMedia)`
width: '80%',
height: '90%',
background: 'red'
`;
// const CardMedia = styled(MuiCardMedia)`
//   height: 320px;
// `;

class MapsPlaces extends React.Component {
    
    constructor(props) {
        super(props);
        this._child = React.createRef();
    
        this.paymentPointIcon = "https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/ic_payment_place.png?alt=media&token=fc816efc-e30c-4f82-a2f3-ccb91dadc0df";
        this.apiKeyaesOfficeIcon = "https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/aes_marker.png?alt=media&token=efb74ce3-fbbf-455c-94df-651452723e66";
        this.state = {
                    lt:13.6915591,
                    ln:-89.2502712,
                    showingInfoWindow: false,
                    activeMarker: {},
                    selectedPlace: {},
                    myPositionLoaded:false,
                    zoom: 12,
                    places: [],
                    _isMounted : false,
                    _isLoading : true
        }    
        this.fetchPlaces = this.fetchPlaces.bind(this)
        this.centerMoved = this.centerMoved.bind(this)      
    }            
    
      
    

      
  componentDidMount() {
    this._isMounted = true;
    this.setState({ _isMounted:true });       
    let self = this;
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function(position) {        
            if(isNaN(position.coords.latitude)){
                console.log("backup");
            }
            else{
                //self.setState({ currentLatLng:newcurrentLatLng });      
                if(!self.state.myPositionLoaded){
                    self.setState({ lt:position.coords.latitude });                
                    self.setState({ ln:position.coords.longitude });       
                    self.setState({ myPositionLoaded:true });       
                }                                   
            }
            
      });
    }
    else{
        //console.log("not DIDMOUNT")
    }
  }
  
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  onMarkerClick = (props, marker, e) =>  
  this.setState({      
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  }  
  );
  
  fetchPlaces(mapProps, map) {
    //const {google} = mapProps;
    //const service = new google.maps.places.PlacesService(map);
    
    console.log("fetchplaces");
    var Newlat = map.getCenter().lat();
    var Newlng = map.getCenter().lng();
    var self = this;
        self.setState({ lt:Newlat });                
        self.setState({ ln:Newlng });       
        self.setState({ myPositionLoaded:true });       
        self.setState({ _isLoading:true });                
    
    console.log("1FETCHING PLACES: "+ Newlat);
    console.log("1FETCHING PLACES: "+ Newlng);
    axios.get(`https://app.movilaeswebdes.com/places/read?lt=`+Newlat+`&ln=`+Newlng)
        .then(res => {
          
          const places = res.data.data;
          places.forEach(function(part, index, theArray) {
            
            if(theArray[index].allow_reservations){
              theArray[index].pic_url = "https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/aes_marker.png?alt=media&token=efb74ce3-fbbf-455c-94df-651452723e66";
            }
            else{
              theArray[index].pic_url = "https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/ic_payment_place.png?alt=media&token=fc816efc-e30c-4f82-a2f3-ccb91dadc0df"
            }
          });
          console.log(places);
          self.setState({ places });
          self.setState({ _isLoading:false });                
          
           
         
        })    
  }

  centerMoved(mapProps, map) {
    console.log("centermoved");
    var Newlat = map.getCenter().lat();
    var Newlng = map.getCenter().lng();
    var self = this;
        self.setState({ lt:Newlat });                
        self.setState({ lt:Newlat });                
        self.setState({ ln:Newlng });       
        self.setState({ myPositionLoaded:true });    
        self.setState({ _isLoading:true });                   
    
    console.log("2FETCHING PLACES: "+ Newlat);
    console.log("2FETCHING PLACES: "+ Newlng);
    axios.get(`https://app.movilaeswebdes.com/places/read?lt=`+Newlat+`&ln=`+Newlng)
        .then(res => {        
          const places = res.data.data;
          places.forEach(function(part, index, theArray) {
            
            if(theArray[index].allow_reservations){
              theArray[index].pic_url = "https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/aes_marker.png?alt=media&token=efb74ce3-fbbf-455c-94df-651452723e66";
            }
            else{
              theArray[index].pic_url = "https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/ic_payment_place.png?alt=media&token=fc816efc-e30c-4f82-a2f3-ccb91dadc0df"
            }
          });
          //console.log("-->"+places);
          self.setState({ places });  
          self.setState({ _isLoading:false });                         
        })    

  }
  
  render() {      
    const coords = { lat: this.state.lt, lng: this.state.ln };      
    return (
      // <div style={mapStyles}>            
      <Card mb={6}>
            { this.state._isLoading &&
                <LinearProgress />
            }                 
            
                  <Map          
                    containerStyle={containerStyle}          
                    google={this.props.google}
                    zoom={this.state.zoom}
                    onReady={this.fetchPlaces}                    
                    style={mapStyles}
                    initialCenter={coords}
                    center={{
                        lat: this.state.lt,
                        lng: this.state.ln
                    }}
                    onDragend={this.centerMoved}
                >            
                    {   
                        this.state.places.map( (item, i) => 
                        <Marker key={i} item={item} 
                            name={item.title}
                            position={{lat: item.lat, lng: item.lng}}                                        
                            onClick={this.onMarkerClick}    
                            title={item.title}    
                            image={item.pic_url}    
                            address={item.address}
                            phone={item.phone_number}
                            sched1={item.business_sched_1}
                            sched2={item.business_sched_2}
                            icon={{
                                url: item.pic_url,
                                anchor: new window.google.maps.Point(8,8),
                                scaledSize: new window.google.maps.Size(32,32)      
                                }} 
                        /> 
                        )                
                    }                
                <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
                >  
                    <div>                    
                        <b>{this.state.selectedPlace.name}</b>
                        <br></br>
                        <br></br>                        
                        {this.state.selectedPlace.address}
                        <br></br>
                        {this.state.selectedPlace.phone}
                        <br></br>
                        {this.state.selectedPlace.sched1}
                        <br></br>
                        {this.state.selectedPlace.sched2f}                                                            
                    </div>                                            
                </InfoWindow>        
        </Map> 
                                     
      {/* </div> */}
      </Card>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBTz_J6_xXnJb1p1w96qE5VFa2a00mXeTo'
})(MapsPlaces);