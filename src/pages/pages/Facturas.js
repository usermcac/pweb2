import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from 'axios';
import {storage} from "../../firebase";
import Helmet from 'react-helmet';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import firebase from '../../firebase'
import { useHistory } from "react-router-dom";

import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";
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
  Button,
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

const handleSocialClick = (sns) => {
  console.log(sns);
  var provider= firebase.auth.AuthProvider;
        switch (sns) {
            case "Facebook":
                provider = new firebase.auth.FacebookAuthProvider();
                console.log(provider, 'fbprovider');
                break;
            
            case "Google":
                provider = new firebase.auth.GoogleAuthProvider();
                console.log(provider, 'gprovider');
                break;            
        
            default:
                throw new Error("Unsupported SNS" + sns)
        }
       firebase
        .auth()
        .signInWithRedirect(provider)
        .catch();
}



class OutlinedTextFields extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleQueryCreated = this.handleQueryCreated.bind(this);
  }
  
  state = {                
    nic_actual: "",
    nics: [],
    isLoadingData: false,
    isLogged:false,
    csmo:"",
    mes:"",
    vencimiento:"",
    c_energia:"",
    c_otros:"",
    c_alcaldia:"",
    total_pagar:"",
    titular:"",
    idcobro:"",
    npe:"",
    url_fact:""    
  };
  
  componentDidMount() {    
    var is_logged = localStorage.getItem("api_stat");

    if(is_logged=="1"){
      this.setState({ isLogged:true });
      this.handleReadMyNICS();
      
    }
    else{
      this.setState({ isLogged:false });
    }

        
  }
  
  handleReadMyNICS(){
    //https://mcacdvmobileapi001.azurewebsites.net/user_profile/readNICS
    var token = localStorage.getItem("token");
    var ins = this;
    axios.get(`https://app.movilaeswebdes.com/user_profile/readNICS`,                    
                        {
                            headers: {
                                        'Authorization': 'Bearer '+token,
                                        'Accept' : '*/*',
                                        'Content-Type': 'application/json'
                                    }
                        }
                    )
                        .then(res => {                                              
                            var nics_v = [];
                            nics_v = res.data.data;
                            console.log(nics_v);
                            this.setState({ nics:nics_v });                            
                            if(nics_v.length>0){
                              this.loadLastInvoiceDetails(nics_v[0]);
                            }
                            
                        });
                
  }
  
  loadLastInvoiceDetails(nic){
    // console.log(nic['user_alias']);
    var ins = this;
    axios.get(`https://app.movilaeswebdes.com/account_operations/lastInvoice/`+nic['nic'])
    .then(res => {                
        ins.setState({ csmo:res.data.data['csmo_fact']});                                            
        ins.setState({ mes:res.data.data['f_fact']});
        ins.setState({ vencimiento:res.data.data['f_vencimiento'].replace("12:00:00 a.m.","")});                                            
        ins.setState({ c_energia:res.data.data['consumo']});                                            
        ins.setState({ c_otros:res.data.data['otros_servicios']});                                            
        ins.setState({ c_alcaldia:res.data.data['alcaldia']});                                            
        ins.setState({ total_pagar:res.data.data['saldo_pagar']});                                            
        ins.setState({ titular:res.data.data['cliente']});                                            
        ins.setState({ idcobro:res.data.data['id_cobro']});                                            
        ins.setState({ npe:res.data.data['npe']});                                            
        ins.setState({ url_fact:res.data.data['url']});                                            
    });
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value                  
    });        
    console.log(event.target.value);
    console.log(name);  

    if(name === "departamento"){
        axios.get(`https://app.movilaeswebdes.com/cities/read?department_id=`+event.target.value)
        .then(res => {
          const municipios = res.data.data;                 
          municipios.unshift({code: "0", created_at: null, department_id: null, id: 0, name: "Seleccione"});
          console.log(municipios);
          this.setState({ municipios });                
        //   console.log(municipios);
        });
    }
    
  };

  handleSubmit(event) {
    event.preventDefault();
    
    this.setState({isSending: true});
    var ins = this;
    var token = localStorage.getItem("token");
    
    var id_c = 0;
    // console.log(this.state.urls);

  }

_renderAddNICS(){        
  return  (
    <Typography variant="body2" gutterBottom align='justify' >
          No tienes NICs agregados
    </Typography>
  )
}
_renderSocialLoginRegister(){
  return  (
    <div>
        <Typography variant="h4" gutterBottom align='justify'>
          Para utilizar esta función, inicia sesión o regístrate
        </Typography>
        
        <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={12} xl={6}
                    >    
        <TextField
                    fullWidth
                        id="txt_user"                                    
                        label="Usuario"
                        m={1}
                        value={this.state.motivo}
                        onChange={this.handleChange("user")}                        
                        variant="outlined"
                    >                        
          </TextField>
          <Spacer mb={5} />   
          </Grid>
          </Grid>
          <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={12} xl={6}
                    >    
          <TextField
                    fullWidth
                        id="txt_pw"                                    
                        label="Contraseña"
                        m={1}
                        value={this.state.motivo}
                        onChange={this.handleChange("pw")}                        
                        variant="outlined"
                    >                        
          </TextField>          
          </Grid>
          </Grid>
          <Spacer mb={5} />   
          <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={12} xl={6}
                    >    
          <Button fullWidth color="primary" variant="contained" onClick={() => handleSocialClick("Login")}>Iniciar sesión</Button><br/><br/>
          <Button fullWidth color="secondary" variant="contained" onClick={() => handleSocialClick("Login")}>Registrar</Button><br/><br/>

       <Spacer mb={15} />   
       <Button fullWidth variant="outlined" onClick={() => handleSocialClick("Facebook")}>Facebook</Button><br/><br/>
       <Button fullWidth variant="outlined" onClick={() => handleSocialClick("Google")}>Google</Button><br/><br/>
       
          </Grid>
          </Grid>
       {/* <Button variant="outlined" onClick={() => handleSocialClick("Twitter")}>Número de teléfono</Button><br/><br/> */}
    </div>
  )
}

_renderLastBillData(){
  
  return  (
    <div>
    <Divider />
    <Grid container spacing={3}>
                  
                      
                      <Grid item xs={6} md={6} lg={6} xl={6}> 
                        <Spacer mb={5} />  
                          <Typography             
                            variant="body2" gutterBottom display="block" >
                            Consumo en kWh
                          </Typography>
                      </Grid>
                    
                    
                        <Grid item xs={6} md={6} lg={6} xl={6}> 
                        <Spacer mb={5} />  
                        <Typography             
                          variant="body2" align="right"  gutterBottom display="block" >
                          {this.state.csmo}
                        </Typography>                    
                        </Grid>
                   

                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" gutterBottom display="block" >
                      Mes facturado
                    </Typography>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" align="right"  gutterBottom display="block" >
                      {this.state.mes}
                    </Typography>                    
                    </Grid>

                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="subtitle2" gutterBottom display="block" >
                      Fecha de vencimiento
                    </Typography>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" align="right"  gutterBottom display="block" >
                      {this.state.vencimiento}
                    </Typography>                    
                    </Grid>



                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" gutterBottom display="block" >
                      Cargo de energía
                    </Typography>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" align="right"  gutterBottom display="block" >
                      {this.state.c_energia}
                    </Typography>                    
                    </Grid>


                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" gutterBottom display="block" >
                      Otros servicios
                    </Typography>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" align="right"  gutterBottom display="block" >
                      {this.state.c_otros}
                    </Typography>                    
                    </Grid>


                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" gutterBottom display="block" >
                      Total alcaldia
                    </Typography>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="body2" align="right"  gutterBottom display="block" >
                      {this.state.c_alcaldia}
                    </Typography>                    
                    </Grid>


                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="subtitle2" gutterBottom display="block"  color="primary">
                      Total a pagar
                    </Typography>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} xl={6}> 
                    <Typography             
                      variant="subtitle2" color="primary" align="right"  gutterBottom display="block" >
                      {this.state.total_pagar}
                    </Typography>                    
                    </Grid>
    </Grid>
    </div>
  )
}



  render() {
    return (
    
        <Card mb={10}>
        <CardContent>   
        
        

          <Paper mt={3}>

          <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={12} xl={12}
                    >    
                    {/* <TextField
                    fullWidth
                    select
                    length={7}
                    id="descripcion_text"
                    label="Selecciona un NIC"
                    type="number"
                    maxLength={7}                
                    m={1}
                    value={this.state.nics}
                    onInput = {(e) =>{
                      e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,7)
                  }}
                    onChange={this.handleChange("descripcion")}
                    variant="outlined"
                    />                     */}

                  <TextField
                    fullWidth
                    id="nics_select"
                    select
                    label="Selecciona un NIC"
                    m={1}
                    value={this.state.nics}
                    onChange={this.handleChange("nics")}
                    SelectProps={{
                    native: true
                    }}                
                    variant="outlined"
                >
                    {this.state.nics.map(option => (                
                    <option key={option.user_alias} value={option.nic}>
                        {option.nic}      -        {option.user_alias}
                    </option>
                    ))}
                </TextField>   
            </Grid>       
                    
            <Spacer mb={20} />   
            <Typography             
            variant="h6"  gutterBottom display="block" color="primary">
              Detalles de última factura
            </Typography>
            
            <Spacer mb={10} />  
                {!this.state.isLogged ? this._renderSocialLoginRegister() : 
                  this._renderLastBillData()
                }                       
                {this.state.nics.length==0&&this.state.isLogged ? this._renderAddNICS() : 
                ""
                }       
                
          </Grid>

          </Paper>
        </CardContent>
      </Card>                            
    );
  }
}

class RightPanelImage extends React.Component {
    render() {
      return (    
          <Card mb={10}>
          <CardContent>            
            <CardMedia 
            component="img"
            image="https://firebasestorage.googleapis.com/v0/b/aes-app-755d2.appspot.com/o/120241778_4050910088275041_6912402123858445267_n.jpg?alt=media&token=f6702103-d08f-4241-9b8c-e8bcdb2a97d1" 
            title={"paga_tus_facturas_a_tiempo"}             
            />
          </CardContent>
        </Card>                            
      );
    }
}



function TextFields() {
  return (
    <React.Fragment>
      <Helmet title="Consulta y pago de facturas" />
      
      <Grid
        justify="space-between"
        container 
        spacing={24}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
            Consulta y pago de facturas
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
              Inicio
            </Link>
            <Link component={NavLink} exact to="/">
              Consultas
            </Link>
            <Typography>Consulta y pago de facturas</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary">
              <AddIcon />
              Agregar NIC
            </Button>
          </div>
        </Grid>
        </Grid>

     

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

