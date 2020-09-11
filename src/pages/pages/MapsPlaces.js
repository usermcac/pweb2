import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import {
    Button,
    CardMedia as MuiCardMedia,
    Card as MuiCard,
    Typography
} from "@material-ui/core";


const mapStyles = {
  width: '80%',
  height: '70%'
};

const CardMedia = styled(MuiCardMedia)`
  height: 320px;
`;

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
    axios.get(`https://mcacdvmobileapi001.azurewebsites.net/places/read?lt=`+Newlat+`&ln=`+Newlng)
        .then(res => {
          
          const places = res.data.data;
          console.log("-->"+places);
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
    axios.get(`https://mcacdvmobileapi001.azurewebsites.net/places/read?lt=`+Newlat+`&ln=`+Newlng)
        .then(res => {        
          const places = res.data.data;
          console.log("-->"+places);
          self.setState({ places });  
          self.setState({ _isLoading:false });                         
        })    

  }
  
  render() {
      //console.log("Render:",this.state.currentLatLng.lat,",",this.state.currentLatLng.lng);
      const coords = { lat: this.state.lt, lng: this.state.ln };
      //const classes = useStyles();
        //console.log(this.props);
    return (
      <div>
            { this.state._isLoading &&
                <LinearProgress />
            }   
        
                <Map
                google={this.props.google}
                zoom={this.state.zoom}
                onReady={this.fetchPlaces}
                className={'map_places'}
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
                            icon={{
                                url: "https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/aes_marker.png?alt=media&token=efb74ce3-fbbf-455c-94df-651452723e66",
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
                    {/* <Paper mb={12} lg={12}>
                        <CardMedia
                        image={this.state.selectedPlace.image} 
                        title={this.state.selectedPlace.name}         
                        />                                                        
                        <Typography gutterBottom variant="subtitle1" component="subtitle1">
                        {this.state.selectedPlace.name}
                        </Typography>
                    </Paper>                         */}
                    </div>                                            
                </InfoWindow>        
        </Map>
        
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBTz_J6_xXnJb1p1w96qE5VFa2a00mXeTo'
})(MapsPlaces);