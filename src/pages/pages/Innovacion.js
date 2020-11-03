import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import axios from 'axios';
import {storage} from "../../firebase";
import Helmet from 'react-helmet';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
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
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleQueryCreated = this.handleQueryCreated.bind(this);
    this.motivos = [
        {
          value: "1",
          label: "Línea directa"
        },
        {
            value: "2",
            label: "Medidor dañado"
        },
        {
            value: "3",
            label: "Medidor con suciedad o quebrado"
        },
        {
            value: "4",
            label: "Servicio conectado directo"
        },
        {
            value: "5",
            label: "Soldador conectado"
        },
        {
            value: "6",
            label: "Otros"
        },
        {
            value: "7",
            label: "Manipulación de Medidor"
        },
    ]
    this.horarios = [
        {
          value: "1",
          label: "Mañana"
        },
        {
            value: "2",
            label: "Tarde"
          },
          {
            value: "3",
            label: "Noche"
          },
          {
            value: "4",
            label: "Permanente"
          },
    ]
    this.departamentos = [
        {
            value: "0",
            label: "Seleccione"
          },
      {
        value: "1",
        label: "Ahuachapan"
      },
      {
        value: "2",
        label: "Sonsonate"
      },
      {
        value: "3",
        label: "Santa Ana"
      },
      {
        value: "4",
        label: "San Salvador"
      },
      {
        value: "5",
        label: "La Libertad"
      },
      {
        value: "6",
        label: "Cuscatlán"
      },
      {
        value: "7",
        label: "San Vicente"
      },
      {
        value: "8",
        label: "San Miguel"
      },
      {
        value: "9",
        label: "Morazán"
      },
      {
        value: "10",
        label: "Usulután"
      },
      {
        value: "11",
        label: "La Unión"
      },
      {
        value: "12",
        label: "Chalatenango"
      },
      {
        value: "13",
        label: "Cabañas"
      }
    ];    
  }
  
  state = {                
    descripcion: "",
    urls: [],
    isLoadingImage: false,
    isSending: false
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value                  
    });
    
    //console.log(this.departamentos)
    console.log(event.target.value);

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

   makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 
 

  handleSubmit(event) {
    event.preventDefault();
    
    this.setState({isSending: true});
    var ins = this;
    var token = localStorage.getItem("token");
    var id_c = 0;
    // console.log(this.state.urls);


    
        axios.post('https://app.movilaeswebdes.com/innovation_forms/create', {
            body_content: this.state.descripcion            
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
            ins.setState({isSending: false});
            alert("Gracias por tu denuncia, se ha creado el reporte con el número: "+response.data.code);
            window.location.reload();
            // handleQueryCreated(response.id);
          })
          .catch(function (error) {
            console.log(error);
          });
    

    

  }

handleFirebaseUpload = (fileObject) => {       
    this.setState({isLoadingImage: true});
    
    var mkid = this.makeid(5);
    const uploadTask = storage.ref(`/pweb/${mkid}`)
        .put(fileObject[0])
    uploadTask.on('state_changed',
        (snapShot) => {
        },
        (error) => {
        
        },
        () => {
            storage.ref('pweb').child(mkid).getDownloadURL()
                .then(firebaseUrl => {                    
                    this.state.urls.push(firebaseUrl)                    
                    this.setState({isLoadingImage: false});                    
                })
        }
    )

}

  render() {
    return (
    
        <Card mb={10}>
        <CardContent>
          {/* <Typography variant="h6" gutterBottom>
            Denuncia el hurto de energía
          </Typography> */}
          <Typography variant="body2" gutterBottom align='justify' >
          En AES El Salvador estamos interesados en conocer tus ideas innovadoras en relación al servicio de Energía Eléctrica, por lo que te invitamos a formar parte del equipo creativo que contribuirá a la máxima satisfacción de nuestros clientes
          </Typography>
          <Spacer mb={10} />   
          <Paper mt={3}>
            <form autoComplete="off" onSubmit={this.handleSubmit}>

           
               

              <Spacer mb={1} />   
            
              <Grid container spacing={3}>
            <Grid item
                xs={12} md={12} lg={12} xl={12}
                >        
                <TextField
                    fullWidth
                    id="direccion_text"
                    label="Describe tu idea de innovación"
                    helperText={`${this.state.descripcion.length}/2000`}
                    rowsMax="6"
                    inputProps={{maxLength: 2000}}
                    required
                    multiline={true}
                    rows={3}
                    m={1}
                    value={this.state.descripcion}
                    onChange={this.handleChange("descripcion")}
                    variant="outlined"
                />
              </Grid>
              </Grid>

             
            
            
            <Spacer mb={10} />
            <Button            
                // xs={12} md={12} lg={12} xl={12}
                fullWidth
                onClick={this.handleSubmit}
                type="submit"
                disabled={this.state.isLoadingImage}
                variant="contained" color="primary">
                Enviar idea de innovación
                </Button>
                {this.state.isSending ? <CircularProgress/> : ""}
                
            
            <Spacer mb={12} />
            {/* <Alert mb={4} severity="info">Los datos del denunciante serán tratados de forma confidencial</Alert> */}
                                


            </form>
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
            image="http://www.aes-elsalvador.com/site/assets/files/9723/revista-cne---aes-2.jpg" 
            title={"ideas_innovacion"}             
            />
          </CardContent>
        </Card>                            
      );
    }
}



function TextFields() {
  return (
    <React.Fragment>
      <Helmet title="Ideas de innovación" />
      <Typography variant="h3" gutterBottom display="inline">
        Ideas de innovación
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Inicio
        </Link>
        <Link component={NavLink} exact to="/">
          Consultas
        </Link>
        <Typography>Ideas de innovación</Typography>
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

