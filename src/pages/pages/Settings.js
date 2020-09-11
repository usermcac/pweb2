import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
import MapsPlaces from "./MapsPlaces"
import Modal from '@material-ui/core/Modal';

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


function Settings() {
  
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
      


      <Grid container spacing={6}>
        <Grid item xs={12}>
          {/* <Public /> */}
          {/* <Private /> */}
          <MapsPlaces/>      
            <Modal 
              open={true}
              onClose={Actions.open}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
            >
          moodal
        </Modal>    
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Settings;
