/**
 * MoPage
 * Default page used through out the app, used to wrap elements with page like styles
 * provides a heading title and a subtitle for the page with loading spinner
 * @param {Boolean} isAdmin - based on user role
 * @param {String} title - Title for the page
 * @param {String} subtitle - Subtitle for the page
 */

import React from "react";

import MoTypography from "../MoTypography";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";

const MoPage = ({ classes, children, IconComponent, subtitle, title }) => {
  return (
    <section className={classes.section}>
      <MoTypography
        font="breeSerif"
        marginBottom="md"
        text={title}
        variant="h2"
      >
        {IconComponent && <IconComponent />}
      </MoTypography>
      <MoTypography
        font="openSans"
        marginBottom="md"
        text={subtitle}
        variant="h6"
      ></MoTypography>
      {children}
    </section>
  );
};

export default withStyles(styles)(MoPage);
