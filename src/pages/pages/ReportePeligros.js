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
            value: "0",
            label: "Seleccione"
          },
        {
          value: "1",
          label: "Daño en el transformador"
        },
        {
            value: "2",
            label: "Lineas en el suelo"
        },
        {
            value: "3",
            label: "Variaciones de voltaje"
        },
        {
            value: "4",
            label: "Daños retenida"
        },
        {
            value: "5",
            label: "Daños en acometida"
        },
        {
            value: "6",
            label: "Línea rota"
        },
        {
            value: "7",
            label: "Poste chocado"
        },
        {
            value: "8",
            label: "Conato de incendio"
        },
        {
            value: "9",
            label: "Líneas eléctricas bajas"
        },
        {
            value: "10",
            label: "Líneas cortocircuitadas"
        },
        {
            value: "11",
            label: "Falso contacto"
        },
        {
            value: "12",
            label: "Poste desplomado"
        },
        {
            value: "13",
            label: "Poste lavado de la base"
        },
        {
            value: "14",
            label: "Fallas en alumbrado público"
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
    departamento: "",
    municipio: "",
    municipios:[],
    direccion: "",
    motivo: "",    
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
        axios.get(`https://mcacdvmobileapi001.azurewebsites.net/cities/read?department_id=`+event.target.value)
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


    if(this.state.urls.length>0){
        axios.post('https://mcacdvmobileapi001.azurewebsites.net/hazard_report_web/create', {
        department_id: this.state.departamento,
        city_id: this.state.municipio,
        address_reference: this.state.direccion,        
        reason_id:this.state.reason_id,
        description: this.state.descripcion,
        lat:"0.00",
        lng:"0.00",
        pics_num:this.state.urls.length
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
            id_c = response.data.id;        
            ins.state.urls.forEach( function(urlact, indice, array) {                
                axios.post('https://mcacdvmobileapi001.azurewebsites.net/images/create', {
                    row_reference: id_c,
                    type: "hazard",
                    pic_url: urlact
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
                console.log(indice);
                console.log(ins.state.urls.length);
                if(indice+1==ins.state.urls.length){                    
                    axios.get(`https://mcacdvmobileapi001.azurewebsites.net/hazard_report/read?id=`+id_c,                    
                        {
                            headers: {
                                        'Authorization': 'Bearer '+token,
                                        'Accept' : '*/*',
                                        'Content-Type': 'application/json'
                                    }
                        }
                    )
                        .then(res => {
                            console.log(res);
                            alert("Gracias por tu reporte, se ha creado el reporte con el número: "+res.data.data[0].code);
                            window.location.reload();
                        });
                }                
              })
              .catch(function (error) {
                console.log(error);
              });

            });
        })
        .catch(function (error) {
          console.log(error);
        });
           
    

        // window.location.reload();
        // handleQueryCreated(response.id);
     
    }
    else{
        axios.post('https://mcacdvmobileapi001.azurewebsites.net/hazard_report_web/create', {
            department_id: this.state.departamento,
            city_id: this.state.municipio,
            address_reference: this.state.direccion,            
            reason_id:this.state.motivo,
            description: this.state.descripcion,
            lat:"0.00",
            lng:"0.00",
            pics_num:this.state.urls.length
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
            alert("Gracias por tu reporte, se ha creado el reporte con el número: "+response.data.code);
            window.location.reload();
            // handleQueryCreated(response.id);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    

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
          AES aconseja a la población mantenerse a más de un metro de distancia de los cables y equipos eléstricos; el contacto con ellos puede poner en riesgo la seguridad física e incluso ocasionar la muerte.
          </Typography>
          <Spacer mb={10} />   
          <Paper mt={3}>
            <form autoComplete="off" onSubmit={this.handleSubmit}>

            <Grid container spacing={3}>
            <Grid item
                xs={12} md={12} lg={6} xl={6}
                >        
                <TextField
                    fullWidth
                    id="departamento_select"
                    select                            
                    label="Departamento"
                    required
                    m={1}                           
                    value={this.state.departamento}
                    onChange={this.handleChange("departamento")}
                    SelectProps={{
                    native: true                    
                    }}                
                    variant="outlined"                    
                >
                    {this.departamentos.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </TextField>

                </Grid>

                <Grid 
                item
                xs={12} md={12} lg={6} xl={6}
                >        
                <TextField
                    fullWidth
                    id="municipio_select"
                    select
                    label="Municipio"
                    m={1}
                    value={this.state.municipio}
                    onChange={this.handleChange("municipio")}
                    SelectProps={{
                    native: true
                    }}                
                    variant="outlined"
                >
                    {this.state.municipios.map(option => (                
                    <option key={option.code} value={option.id}>
                        {option.name}
                    </option>
                    ))}
                </TextField>   
              

              </Grid>
              </Grid>

                
               

              <Spacer mb={1} />   
            
              <Grid container spacing={3}>
            <Grid item
                xs={12} md={12} lg={12} xl={12}
                >        
                <TextField
                    fullWidth
                    id="direccion_text"
                    label="Dirección/Referencia"
                    required
                    m={1}
                    value={this.state.direccion}
                    onChange={this.handleChange("direccion")}
                    variant="outlined"
                />
              </Grid>
              </Grid>

              <Spacer mb={1} />   

              <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={6} xl={6}
                    >        
                    <TextField
                    fullWidth
                        id="motivo_select"
                        select                
                        label="Peligro observado"
                        m={1}
                        value={this.state.motivo}
                        onChange={this.handleChange("motivo")}
                        SelectProps={{
                        native: true
                        }}                
                        variant="outlined"
                    >
                        {this.motivos.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </TextField>
                </Grid>
                
              </Grid>

              <Spacer mb={1} />   

              <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={12} xl={12}
                    >    
                    <TextField
                    fullWidth
                    id="descripcion_text"
                    label="Decripción de los hechos"
                    m={1}
                    value={this.state.descripcion}
                    onChange={this.handleChange("descripcion")}
                    variant="outlined"
                    />
                    </Grid>
                </Grid>
            <Spacer mb={1} />
            
            <Grid container spacing={3}>
                <Grid item
                    xs={12} md={12} lg={12} xl={12}
                    >        
            <Dropzone            
                onDrop={acceptedFiles => this.handleFirebaseUpload(acceptedFiles)}     
                accept="image/*,.pdf">
                {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                                <Typography variant="h6" gutterBottom>
                                    Evidencias del reporte
                                </Typography>
                                <Button
                                disabled={this.state.isLoadingImage}
                                 variant="outlined" color="secondary">
                                Agregar imagenes
                                </Button>
                                <Spacer mb={1} />
                                <p>
                                    {this.state.urls.length} imágenes agregadas
                                </p>
                                {this.state.isLoadingImage ? <CircularProgress/> : ""}
                    </div>
                </section>
                )}
            </Dropzone>
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
                Enviar reporte
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
            image="http://www.aes-elsalvador.com/site/assets/files/12688/aes-prevencion.jpg" 
            title={"peligro_aes"}             
            />
          </CardContent>
        </Card>                            
      );
    }
}



function TextFields() {
  return (
    <React.Fragment>
      <Helmet title="Reporte de peligros en la red" />
      <Typography variant="h3" gutterBottom display="inline">
        Reporte de peligros en la red
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Inicio
        </Link>
        <Link component={NavLink} exact to="/">
          Consultas
        </Link>
        <Typography>Reporte de peligros en la red</Typography>
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

