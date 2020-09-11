import React from "react";
import styled from "styled-components";

import {
  Grid,
  Hidden,
  List,
  ListItemText,
  ListItem as MuiListItem
} from "@material-ui/core";

const Wrapper = styled.div`
  padding: ${props => props.theme.spacing(1) / 4}px
    ${props => props.theme.spacing(4)}px;
  background: ${props => props.theme.palette.common.white};
  position: relative;
`;

const ListItem = styled(MuiListItem)`
  display: inline-block;
  width: auto;
  padding-left: ${props => props.theme.spacing(2)}px;
  padding-right: ${props => props.theme.spacing(2)}px;

  &,
  &:hover,
  &:active {
    color: #000;
  }
`;

function Footer() {
  return (
    <Wrapper>
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid container item xs={12} md={6}>
            <List>
              {/* CODITY FOOTER */}
              <ListItem component="a" target="_blank" href="https://www.facebook.com/aeselsalvador">
                <ListItemText primary="Facebook" />
              </ListItem>
              <ListItem component="a" target="_blank" href="https://www.twitter.com/aeselsalvador">
                <ListItemText primary="Twitter" />
              </ListItem>
              <ListItem component="a" target="_blank" href="https://www.instagram.com/aeselsalvador">
                <ListItemText primary="Instagram" />
              </ListItem>
              <ListItem component="a" target="_blank" href="https://www.aeselsalvador.com">
                <ListItemText primary="www.aeselsalvador.com" />
              </ListItem>
            </List>
          </Grid>
        </Hidden>
        <Grid container item xs={12} md={6} justify="flex-end">
          <List>
            <ListItem>
              {/* <ListItemText primary={`© ${new Date().getFullYear()} - AES El Salvador`} /> */}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

export default Footer;
