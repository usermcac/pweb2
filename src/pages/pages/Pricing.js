import React from "react";
import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";
import NewsCarousel from "./NewsCarousel"
import Helmet from 'react-helmet';

import {
  Avatar,
  Button,
  CardActions,  
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardMedia as MuiCardMedia,
  Chip as MuiChip,
  CardHeader as MuiCardHeader,
  Divider as MuiDivider,
  Typography
} from "@material-ui/core";

import { StarBorder as StarIcon } from "@material-ui/icons";
import { AvatarGroup as MuiAvatarGroup } from '@material-ui/lab';

import { spacing } from "@material-ui/system";
import { red, green, orange } from "@material-ui/core/colors";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)`
  border-bottom: 1px solid ${props => props.theme.palette.grey[300]};
`;

const CardMedia = styled(MuiCardMedia)`
  height: 220px;
`;

const NavLink = React.forwardRef((props, ref) => (
  <RouterNavLink innerRef={ref} {...props} />
));
const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 85%;
  background-color: ${props => props.rgbcolor};
  color: ${props => props.theme.palette.common.white};
  margin-bottom: ${props => props.theme.spacing(4)}px;
`;
const CardHeader = styled(MuiCardHeader)(spacing);

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const Price = styled.div`
  text-align: center;
  padding-bottom: ${props => props.theme.spacing(3)}px;
`;
const AvatarGroup = styled(MuiAvatarGroup)`
  margin-left: ${props => props.theme.spacing(2)}px;
`

const Header = styled.div`
  padding: ${props => props.theme.spacing(6)}px 0;
`;
function Project({ image, title, description, chip }) {
  return (
    <Card mb={6}>
      {image ? <CardMedia image={image} title="Contemplative Reptile" /> : null}
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>

        {chip}

        <Typography mb={4} component="p">
          {description}
        </Typography>

        <AvatarGroup max={3}>
          <Avatar alt="Avatar" src="/static/img/avatars/avatar-1.jpg" />
          <Avatar alt="Avatar" src="/static/img/avatars/avatar-2.jpg" />
          <Avatar alt="Avatar" src="/static/img/avatars/avatar-3.jpg" />
        </AvatarGroup>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
function Pricing() {
  return (
    <React.Fragment>
      <Helmet title="Noticias" />
      <Typography variant="h3" gutterBottom display="inline">
        Noticias
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Link component={NavLink} exact to="/">
          Inicio
        </Link>
        <Link component={NavLink} exact to="/">
          Consultas
        </Link>
        <Typography>Noticias</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      {/* <Header>
        <Typography variant="h3" gutterBottom align="center">
          We have a plan for everyone 
        </Typography>

        <Typography variant="subtitle1" gutterBottom align="center">
          Whether you're a business or an individual, 14-day trial no credit
          card required.
        </Typography>
      </Header> */}


      <Grid container spacing={6}>
      <NewsCarousel/>
      </Grid>      
    </React.Fragment>
  );
}

export default Pricing;
