import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setTheme } from "../../redux/actions/themeActions";
import { useHistory } from "react-router-dom";
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import Image from 'material-ui-image';
import Helmet from 'react-helmet';
//import async from "../../components/Async";
import NewsCarousel from './NewsCarousel'
import {
  Button,
  Container,
  Grid,
  Divider as MuiDivider,
  Tooltip,
  Typography as MuiTypography,  
  Card as MuiCard,
  CardContent,
  CardHeader,
  withWidth
} from "@material-ui/core";


import { isWidthUp } from "@material-ui/core/withWidth";

import { spacing } from "@material-ui/system";
// import Carousel from "react-material-ui-carousel";

const Spacer = styled.div(spacing);

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const IntroductionContent = styled.div`
  padding: 3vw 5vw;
  text-align: center;
  line-height: 150%;
`;

const IntroductionSubtitle = styled(Typography)`
  font-size: ${props => props.theme.typography.h5.fontSize};
  font-weight: ${props => props.theme.typography.fontWeightRegular};
  color: ${props => props.theme.palette.common.black};
  font-family: ${props => props.theme.typography.fontFamily};
  margin-bottom: ${props => props.theme.spacing(4)}px;
`;

const BrandIcons = styled.div``;

const BrandIcon = styled.img`
  vertical-align: middle;
  margin: ${props => props.theme.spacing(1)}px;
  height: auto;
`;

const BrandIconStyledComponents = styled.span`
  font-size: 1.875rem;
  vertical-align: middle;
  margin: ${props => props.theme.spacing(1)}px;
  cursor: default;
`;

const DemoListContent = styled.div`
  ${spacing};
  background: ${props => props.theme.palette.common.white};
  text-align: center;
`;

const DemoContent = styled.div(spacing);

const DemoLink = styled.div`
  cursor: pointer;
`;

const DemoScreenshot = styled.img`
  max-width: 100%;
  height: auto;
  border: 1px solid ${props => props.theme.palette.grey[300]};
  display: block;
`;

const JoinUsContent = styled.div`
  ${spacing};
  text-align: center;
`;
//const AsyncCarousel = async(() => import("./NewsCarousel"));

function Introduction() {
  return (
    <Container>
      <Grid container spacing={6} alignItems="center" justify="center">
        <Grid item xs={12} md={12} lg={10} xl={10}>
          <IntroductionContent>
            <NewsCarousel/>
            <Typography variant="h1" gutterBottom>
              Modern, Flexible and Responsive0
              <br /> Material-UI Admin Template
            </Typography>
            <IntroductionSubtitle>
              A professional package that comes with plenty of UI components,
              forms, tables, charts, dashboards, pages and svg icons. Each one is
              fully customizable, responsive and easy to use.
            </IntroductionSubtitle>

            <BrandIcons>
              <Tooltip title="Material-UI">
                <BrandIcon
                  alt="Material-UI"
                  src="/static/img/brands/material-ui.svg"
                  style={{ width: "44px" }}
                />
              </Tooltip>
              <Tooltip title="Webpack">
                <BrandIcon
                  alt="Webpack"
                  src="/static/img/brands/webpack.svg"
                  style={{ width: "48px" }}
                />
              </Tooltip>
              <Tooltip title="Npm / Yarn">
                <BrandIcon
                  alt="Npm"
                  src="/static/img/brands/npm.svg"
                  style={{ width: "48px" }}
                />
              </Tooltip>
              <Tooltip title="Styled Components">
                <BrandIconStyledComponents>
                  <span role="img" aria-label="Styled Components">
                    💅
                  </span>
                </BrandIconStyledComponents>
              </Tooltip>
              <Tooltip title="React">
                <BrandIcon
                  alt="React"
                  src="/static/img/brands/react.svg"
                  style={{ width: "50px" }}
                />
              </Tooltip>
              <Tooltip title="Redux">
                <BrandIcon
                  alt="Redux"
                  src="/static/img/brands/redux.svg"
                  style={{ width: "38px" }}
                />
              </Tooltip>
            </BrandIcons>
          </IntroductionContent>
        </Grid>
      </Grid>
    </Container>
  );
}

function Demo({ dispatch, id, title, img }) {
  const history = useHistory();

  const toggleDemo = id => {
    dispatch(setTheme(id));
    history.push("/dashboard/analytics");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4}>
      <DemoContent px={4}>
        <DemoLink onClick={() => toggleDemo(id)}>
          <DemoScreenshot
            alt={title}
            src={`/static/img/screenshots/${img}.png`}
          />
        </DemoLink>
        <Spacer mb={3} />
        <Typography variant="h6">{title}</Typography>
      </DemoContent>
    </Grid>
  );
}

const ConnectedDemo = connect()(Demo);

function DemoList({ width }) {
  return (
    <DemoListContent mx={isWidthUp("lg", width) ? -10 : -5} py={10}>
      <Container>
        <Typography variant="h3" gutterBottom>
          Multiple Demos
        </Typography>
        <Spacer mb={6} />

        <Grid container spacing={6}>
          <ConnectedDemo id={0} title="Dark variant" img="dark" />
          <ConnectedDemo id={1} title="Light variant" img="light" />
          <ConnectedDemo id={2} title="Blue variant" img="blue" />
          <ConnectedDemo id={3} title="Green variant" img="green" />
          <ConnectedDemo id={4} title="Indigo variant" img="indigo" />
          <ConnectedDemo id={5} title="Teal variant" img="teal" />
        </Grid>
      </Container>
    </DemoListContent>
  );
}

function JoinUs() {
  return (
    <JoinUsContent pt={12} pb={4}>
      <Container>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <Typography variant="h2" gutterBottom>
              Join over 3,000 developers who are already working with our
              products
            </Typography>
            <Spacer mb={4} />

            <Button
              href="https://themes.material-ui.com/themes/material-app/"
              variant="contained"
              color="primary"
              size="large"
              target="_blank"
            >
              Purchase Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </JoinUsContent>
  );
}

function Presentation({ width }) {
  return (
    // <React.Fragment>
      
    //   {/* <NewsCarousel/> */}
    //   {/* <Introduction /> */}
    //   {/* <DemoList width={width} />
    //   <JoinUs /> */}


    // </React.Fragment>
    // CODITY HOMESCREEN PUBLICA
    <React.Fragment>
      <Helmet title="Portal Web de clientes" />
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" display="inline">
            Portal Web de clientes AES El Salvador
          </Typography>
          {/* <Typography variant="body2" ml={2} display="inline">
          {`Monday, 29 April ${new Date().getFullYear()}`}
          </Typography> */}
        </Grid>

        <Grid item>
          {/* <Actions /> */}
        </Grid>
      </Grid>

      <Divider my={6} />
      {/* <NewsCarousel/> */}
      {/* <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Sales Today"
            amount="2.532"
            chip="Today"
            percentageText="+26%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Visitors"
            amount="170.212"
            chip="Annual"
            percentageText="-14%"
            percentagecolor={red[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Total Earnings"
            amount="$ 24.300"
            chip="Monthly"
            percentageText="+18%"
            percentagecolor={green[500]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3} xl>
          <Stats
            title="Pending Orders"
            amount="45"
            chip="Yearly"
            percentageText="-9%"
            percentagecolor={red[500]}
          />
        </Grid>
      </Grid> */}
 
      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={5} xl={4}>
        <NewsCarousel/>
          {/* <NewsCarousel/> */}
          {/* <LineChart /> */} 
          {/* newschart */}
        </Grid>
        <Grid  item xs={12} sm={12} md={12} lg={5} xl={4}>
        <Paper>
        
        <Typography variant="h4" gutterBottom p={2}>          
          Bienvenido
          {/* <Spacer mb={3} /> */}
          {/* <br/>           */}
        </Typography>
        <Typography variant="body2"  p={2}>          
          Encuentra todas las herramientas digitales para gestionar tu servicio en nuestro nuevo portal web para clientes.
        </Typography>
          <br/>
          
        </Paper>                    
        </Grid>        
      </Grid>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={4}>
        <Paper>
        <Typography variant="h4" gutterBottom p={2}>          
          Tips para ahorrar energía
        </Typography>
        <Typography variant="body1" gutterBottom p={2}>          
          Utiliza focos ahorradores o LED, éstos consumen menos energía eléctrica que los convencionales.
        </Typography>
          
        </Paper>
          {/* <BarChart /> */}
          {/* espacio 2 */}
        </Grid>
        <Grid item xs={12} lg={8}>
          {/* <Table /> */}
          {/* <NewsCarousel/> */}
          {/* espacio 3 */}
          <Paper>
          {/* Tips de ahorro  3 */}
        </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withWidth()(Presentation);
