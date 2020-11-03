import React, { useState, createRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

/*
Options props must have this format:
[
  { id: 'o0', name: 'Option 1', action: null },
  ...
];

Actions props must have this format:
[
  { id: 'a0', name: 'Autostyle', icon: '/icon-content-autostyle.svg', action: null },
  ...
];
*/

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    padding: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '56px',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  button: {
    padding: 0,
    cursor: (props) => (props.expandable ? 'pointer' : 'default'),
    '& .MuiButton-label': {
      ...theme.typography.subtitle2,

      '& .MuiButton-startIcon': {
        marginLeft: 0,
        marginRight: theme.spacing(0.5),
      },
    },
    '&:hover': {
      background: 'none',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  content: {
    paddingTop: 0,
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}));

const IconMaximize = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<g fill="none" fillRule="evenodd">
    <g fill="#2C3032">
        <g>
            <g>
                <path d="M15 5c2.21 0 4 1.79 4 4v6c0 2.21-1.79 4-4 4H9c-2.21 0-4-1.79-4-4V9c0-2.21 1.79-4 4-4h6zm0 2H9c-1.054 0-1.918.816-1.995 1.85L7 9v6c0 1.054.816 1.918 1.85 1.995L9 17h6c1.054 0 1.918-.816 1.995-1.85L17 15V9c0-1.054-.816-1.918-1.85-1.995L15 7zm-2 2v2h2v2h-2v2h-2v-2H9v-2h2V9h2z" transform="translate(-542 -557) translate(526 541) translate(16 16)"/>
            </g>
        </g>
    </g>
</g>
</svg>);

const IconMinimize = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<g fill="none" fillRule="evenodd">
    <g fill="#2C3032">
        <g>
            <g>
                <path d="M15 5c2.21 0 4 1.79 4 4v6c0 2.21-1.79 4-4 4H9c-2.21 0-4-1.79-4-4V9c0-2.21 1.79-4 4-4h6zm0 2H9c-1.054 0-1.918.816-1.995 1.85L7 9v6c0 1.054.816 1.918 1.85 1.995L9 17h6c1.054 0 1.918-.816 1.995-1.85L17 15V9c0-1.054-.816-1.918-1.85-1.995L15 7zm0 4v2H9v-2h6z" transform="translate(-113 -443) translate(97 427) translate(16 16)"/>
            </g>
        </g>
    </g>
</g>
</svg>);

function WrapperWidgetUI(props) {
  const wrapper = createRef();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { options = [], actions = [] } = props;

  const handleExpandClick = () => {
    if (props.expandable) {
      setExpanded(!expanded);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionAction = (action) => {
    if (action) {
      action();
    }

    handleClose();
  };

  return (
    <Box className={classes.root}>
      <Grid container className={classes.header}>
        <Button
          className={classes.button}
          startIcon={
            props.expandable && (
              <Icon className={classes.icon}>
                {expanded ? (<IconMinimize/>) : (<IconMaximize />) /* TODO: Integrate with an icon theme */}
              </Icon>
            )
          }
          onClick={handleExpandClick}
        >
          {props.title}
        </Button>

        <Grid item style={{ display: 'flex' }}>
          {actions.map((action) => {
            return (
              <IconButton
                key={action.id}
                aria-label={action.label}
                onClick={action.action}
              >
                {(action.icon)}
              </IconButton>
            );
          })}

          {options.length > 0 && (
            <div>
              <IconButton
                aria-label='options'
                aria-controls='options-menu'
                aria-haspopup='true'
                onClick={handleClick}
              >
                <MoreVertIcon color='primary' />
              </IconButton>
              <Menu
                id='options-menu'
                elevation={3}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    marginTop: '48px',
                    maxHeight: '144px',
                    width: '128px',
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option.id}
                    selected={option.selected}
                    onClick={() => handleOptionAction(option.action)}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )}
        </Grid>
      </Grid>
      {/* TODO: check collapse error */}
      <Collapse ref={wrapper} in={expanded} timeout='auto' unmountOnExit>
        <Box className={classes.content}>{props.children}</Box>
      </Collapse>
    </Box>
  );
}

WrapperWidgetUI.defaultProps = {
  expandable: true,
};

WrapperWidgetUI.propTypes = {
  title: PropTypes.string.isRequired,
  expandable: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    action: PropTypes.func.isRequired
  })),
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};

export default WrapperWidgetUI;
