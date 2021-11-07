/**
 *
 * @author MoSkool
 * @version 1.0.0
 * @visibleName Typography component
 *
 * Handles all types of typography such as Heading and Paragraph elements
 * Can be customized with different fonts, color and margin
 *
 * @param {Object} children - Pass child components that are being wrapped by this component
 * @param {String} font - Font family one of "breeSerif", "openSans"
 * @param {String} marginBottom - Bottom margin one of "xs", "sm", "md", "lg"
 * @param {String} marginTop - Top margin one of "xs", "sm", "md", "lg"
 * @param {String} text - text displayed in typography component
 * @param {String} variant - Material UI component variant, see propTypes at the bottom of component
 * @returns {<Typography/>} - returns Material UI Typography
 *
 * @see See [Material Typography](https://material-ui.com/components/typography/)
 * */

import React from "react";

import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";

const MoTypography = ({
  children,
  font,
  marginBottom,
  marginTop,
  text,
  variant,
}) => {
  const useStyles = makeStyles((theme) =>
    createStyles({
      breeSerif: {
        fontFamily: theme.breeSerif,
      },
      openSans: {
        fontFamily: theme.openSans,
      },
      margin: {
        marginBottom: marginBottom && theme.space[marginBottom],
        marginTop: marginTop && theme.space[marginTop],
      },
    })
  );

  const classes = useStyles();

  if (!text && !children) {
    return null;
  }

  return (
    <Typography
      className={`${classes.margin} ${classes[font]}`}
      variant={variant}
    >
      {text}
      {children}
    </Typography>
  );
};

MoTypography.propTypes = {
  font: PropTypes.oneOf(["breeSerif", "openSans"]),
  marginBottom: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  marginTop: PropTypes.oneOf(["xs", "sm", "md", "lg"]),
  text: PropTypes.string,
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "subtitle1",
    "subtitle2",
    "body1",
    "body2",
    "button",
    "caption",
    "overline",
  ]).isRequired,
};

export default MoTypography;
