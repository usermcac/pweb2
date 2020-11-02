import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import MapsPlaces from "./MapsPlaces"
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { sizing } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Actions from "./Actions";

import Helmet from 'react-helmet';

import {
  Avatar,
  Breadcrumbs as MuiBreadcrumbs,
  Button as MuiButton,
  Card as MuiCard,
  CardContent,
  Divider as MuiDivider,
  FormControl as MuiFormControl,
  Grid,
  Link,
  TextField as MuiTextField,
  Typography
} from "@material-ui/core";

import { CloudUpload as MuiCloudUpload } from "@material-ui/icons";
import {
  Add as AddIcon,
  Archive as ArchiveIcon,
  FilterList as FilterListIcon,
  RemoveRedEye as RemoveRedEyeIcon
} from "@material-ui/icons";
import { spacing } from "@material-ui/system";
import Moral from "./Modal"

const coords = {
  lat: 13.7156481,
  lng: -89.2456234
};
 
// import FilterListIcon from '@material-ui/icons/FilterList';
const params = {v: '3.exp', key: 'AIzaSyAIBsCgLTU3OiUqq8wJYCl09bTFP4IHobo'};

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Card = styled(MuiCard)(spacing);

const Divider = styled(MuiDivider)(spacing);

const FormControl = styled(MuiFormControl)(spacing);

const TextField = styled(MuiTextField)(spacing);

const Button = styled(MuiButton)(spacing);

const CloudUpload = styled(MuiCloudUpload)(spacing);

const CenteredContent = styled.div`
  text-align: center;
`;

const BigAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto ${props => props.theme.spacing(2)}px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

function Settings() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Actions />
      <Helmet title="Agencias y puntos de pago" />
      
      <Grid
        justify="space-between"
        container 
        spacing={10}
      >
        <Grid item>
          <Typography variant="h3" gutterBottom display="inline">
          Agencias y puntos de pago
          </Typography>

          <Breadcrumbs aria-label="Breadcrumb" mt={2}>
            <Link component={NavLink} exact to="/">
            Inicio
            </Link>
            <Link component={NavLink} exact to="/">
            Consultas
            </Link>
            <Typography>Agencias y puntos de pago</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item>
          <div>
            <Button variant="contained" color="primary">
              <FilterListIcon />
              Filtros
            </Button>
          </div>
        </Grid>
      </Grid>

      <Divider my={6} />
      
      <Card mb={6}>
      <CardContent>                
        <Box mt={0}>
          <MapsPlaces/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Paper>
          <Typography variant="h6" gutterBottom>
          AGENCIA CONSTITUCIÓN
        </Typography>
        <Typography variant="body2" gutterBottom>
          Calle a San Antonio Abad #5 San Salvador
        </Typography>
              
          </Paper> 
        </Box>
      </CardContent>
    </Card>

      


      
{/* <Grid containerdirection="row"  spacing={2} lg={12} xl={12} >      
        <Grid item lg={12} xl={12} >      
          <MapsPlaces />          
        </Grid>               
        <Grid item xs={12} lg={12} xl={12}>
          <Paper                 
        >
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
              askdjaldkjasldjasldjaslkdjaslkdajsldkjasdlkasjdlkasjdlkasjdalskjdaslkdjaslkjdalsk
          </Paper>           
        </Grid>
      </Grid> */}

    </React.Fragment>
  );
}

export default Settings;
