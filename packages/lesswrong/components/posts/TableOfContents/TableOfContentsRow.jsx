import React, { PureComponent } from 'react';
import { registerComponent } from 'meteor/vulcan:core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    position: "relative",
    ...theme.typography.body2,
    ...theme.typography.commentsStyle,
    direction:"ltr",
  },

  // For the highlighted section only, disable the half-opacity-on-hover effect
  // that's otherwise globally applied to <a> tags.
  highlighted: {
    '& $link': {
      color: "black",
    },
    '& $link:after': {
      content: `"•"`,
      marginLeft: 3,
      position: 'relative',
      top: 1
    },
    "& a:focus, & a:hover": {
      opacity: "initial",
    }
  },
  link: {
    display: "block",
    paddingTop: 6,
    paddingBottom: 6,
    color: theme.palette.grey[600],
    lineHeight: "1.2em",
    '&:hover':{
      opacity:1,
      color: "black",
      textShadow: "0 0 0 rgba(0,0,0,1].87)",
    }
  },
  // Makes sure that the start of the ToC is in line with the start of the text
  title: {
    paddingTop: 3
  },
  level0: {
    display:"inline-block",
    maxWidth: '100%',
    marginBottom: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    borderBottom: "solid 1px rgba(0,0,0,.1)",
    '& $link': {
      whiteSpace: "normal",
    },
    // Don't show location dot for level0
    '& $link:after': {
      content: `""`
    },
    '&:last-of-type': {
      borderBottom: "none",
      marginTop: theme.spacing.unit,
      paddingTop: theme.spacing.unit,
      borderTop: "solid 1px rgba(0,0,0,.1)",
    }
  },
  level1: {
    paddingLeft: 0,
  },
  level2: {
    fontSize:"1.1rem",
    paddingLeft: 16,

  },
  level3: {
    fontSize:"1.1rem",
    color:theme.palette.grey[700],
    paddingLeft: 32,
  },
  level4: {
    fontSize:"1.1rem",
    color:theme.palette.grey[700],
    paddingLeft: 48,
  },
  divider: {
    width: 60,
    marginBottom:theme.spacing.unit,
    borderBottom: "solid 1px rgba(0,0,0,.1)",
    paddingBottom: theme.spacing.unit,
    display:"inline-block",
  }
});

class TableOfContentsRow extends PureComponent
{
  render() {
    const {indentLevel=0, highlighted=false, href, onClick, children, classes, title, divider } = this.props;

    if (divider) return <div className={classes.divider} />

    return <Typography variant="body2"
      className={classNames(
        classes.root,
        this.levelToClassName(indentLevel),
        { [classes.highlighted]: highlighted }
      )}
    >
      <a href={href} onClick={onClick} className={classNames(classes.link, {[classes.title]: title})}>
        {children}
      </a>
    </Typography>
  }

  levelToClassName = (level) => {
    const { classes } = this.props;
    switch(level) {
      case 0: return classes.level0;
      case 1: return classes.level1;
      case 2: return classes.level2;
      case 3: return classes.level3;
      default: return classes.level4;
    }
  }
}

registerComponent("TableOfContentsRow", TableOfContentsRow,
  withStyles(styles, { name: "TableOfContentsRow" }));
