import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from 'axios';
import {storage} from "../../firebase";
import Helmet from 'react-helmet';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import Detalle from "./InterrupcionesDetail"
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  CardContent,
  Grid,
  Link,  
  Breadcrumbs as MuiBreadcrumbs,
  CardMedia as MuiCardMedia,
  Card as MuiCard,
  Divider as MuiDivider,
  Paper as MuiPaper,
  CardActions,  
  List,
//   TextField as MuiTextField,
  TextField,
  Typography
} from "@material-ui/core";

import { spacing } from "@material-ui/system";
import { Alert as MuiAlert } from '@material-ui/lab';
import Dropzone from "react-dropzone";
import Dialog from '@material-ui/core/Dialog';

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Paper = styled(MuiPaper)(spacing);

const Spacer = styled.div(spacing);

const CardMedia = styled(MuiCardMedia)`
  height: 600px;  
  object-fit: scale-down; 
`

const Alert = styled(MuiAlert)(spacing);

class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props);        
  }
  
  state = {            
    descripcion: "",
    interrupciones: [],
    noRows:false
  };

  componentDidMount() {
    this._isMounted = true;
    axios.get(`https://app.movilaesweb.com/power_outgages/read`)
      .then(res => {
        if (this._isMounted) {
        const interrupciones = res.data.data;
        this.setState({ interrupciones });
        }
      })
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value                  
    });    
    console.log(event.target.value);
    console.log(name);
    var token = localStorage.getItem("token");
    var ins = this;
    if(name === "descripcion" && this.state.descripcion.length>5){      
      axios.post('https://mcacdvmobileapi001.azurewebsites.net/power_outgages/findByNIC', {
        nic: event.target.value
      },
      {
        headers: {
            'Authorization': 'Bearer '+token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
    }
      )
      .then(function (response) {
        console.log(response);     
        const interrupciones = response.data.data;
        ins.setState({ interrupciones});
        if (interrupciones.length==0){            
            ins.setState({noRows: true});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }    
    else{
      axios.get(`https://app.movilaesweb.com/power_outgages/read`)
      .then(res => {
        if (this._isMounted) {
        const interrupciones = res.data.data;
        this.setState({ interrupciones });
        }
      })
    }
  };

  _renderTodos(){        
    return  this.state.interrupciones.map( (item, i) => <Item key={i} item={item} image={item.pic_url} title={item.type} description={item.affected_zones} dtdtail = {item.datetime_event} /> )                                  
}

  render() {
    return (
        <Card mb={10}>
        <CardContent>          
          <Typography variant="body2" gutterBottom align='justify' >
            Informate de las interrupciones programadas o busca por NIC
          </Typography>
          <Spacer mb={10} />   
          <Paper mt={3}>            
            <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={12} xl={12}
                    >    
                    <TextField
                    fullWidth
                    length={7}
                    id="descripcion_text"
                    label="Buscar por NIC"
                    type="number"
                    maxLength={7}                
                    m={1}
                    value={this.state.descripcion}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,7)
                  }}
                    onChange={this.handleChange("descripcion")}
                    variant="outlined"
                    />                    
                    </Grid>       
                    <List>
                {this._renderTodos()}                  
                {this.state.noRows ? <Typography mb={4} component="p">No hay interrupciones</Typography> : ""}              
            </List>           
                </Grid>
            
            
          </Paper>
        </CardContent>
      </Card>                            
      
    );

    

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
        <Detalle title={title} imagex={image} descriptionx={description} dtx = {dtdtail}></Detalle>
        {/* <Button size="small" color="primary">
          Ver más
        </Button> */}
      </CardActions>
    </Card>    
    </Grid>          
  );
}

class RightPanelImage extends React.Component {
    render() {
      return (    
          <Card mb={10}>
          <CardContent>            
            <CardMedia 
            component="img"
            image="http://2.bp.blogspot.com/-HMafVCtMZO0/T8eWkUwPbVI/AAAAAAAAALE/v0pxwuAMUsY/s1600/Interrupciones-copy.jpg" 
            title={"denuncia_hurto"}             
            />
          </CardContent>
        </Card>                            
      );
    }
}



function TextFields() {
  return (
    <React.Fragment>
      <Helmet title="Interrupciones programadas" />
      <Typography variant="h3" gutterBottom display="inline">
        Interrupciones programadas
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Inicio
        </Link>
        <Link component={NavLink} exact to="/">
          Consultas
        </Link>
        <Typography>Interrupciones programadas</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <Grid container spacing={6} xs={12} >
        <Grid item xs={12} md={8} >          
          <OutlinedTextFields />          
        </Grid>
        <Grid item xs={12} md={4} >          
          <RightPanelImage />          
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default TextFields;

