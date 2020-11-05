import React from 'react';
import { Divider, List, ListItem, ListItemIcon, ListItemText, makeStyles, Typography } from '@material-ui/core';
import { Drafts, Home, Inbox } from '@material-ui/icons';

export default {
  title: 'Common/List',
  component: List
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
}));

const Template = ({ ...args }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem button>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider/>
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="Trash" />
        </ListItem>
      </List>
    </div>
  )
};

export const Playground = Template.bind({});


export const NestedList = Template.bind({})
NestedList.args = {}

