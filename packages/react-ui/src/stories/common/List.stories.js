import React from 'react';
import {
  Avatar,
  Checkbox,
  Collapse,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Switch,
  Paper
} from '@material-ui/core';
import {
  Drafts,
  Delete,
  ExpandLess,
  ExpandMore,
  Home,
  Inbox,
  Star
} from '@material-ui/icons';

export default {
  title: 'Common/List',
  component: List
}
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100]
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Template = ({ secondary, ...args }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={6} className={classes.root}>
      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText primary="Home" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Inbox" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Drafts" secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon>
                  <Inbox />
                </ListItemIcon>
                <ListItemText primary="Inbox" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon>
                  <Drafts />
                </ListItemIcon>
                <ListItemText primary="Drafts" secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemIcon>
                  <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary="Home" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary="Inbox" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemIcon>
                  <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary="Drafts" secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Home" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Inbox" secondary={secondary} />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Star />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Drafts" secondary={secondary} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
};

const TemplateSecondaryActions = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={6} className={classes.root}>
      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText primary="Home" />
                <ExpandMore />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Inbox" />
                <ExpandMore />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Drafts" />
                <ExpandMore />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText primary="Home" />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Inbox" />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Drafts" />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText primary="Home" />
                <ListItemSecondaryAction>
                  <IconButton size="small" edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Inbox" />
                <ListItemSecondaryAction>
                  <IconButton size="small" edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Drafts" />
                <ListItemSecondaryAction>
                  <IconButton size="small" edge="end" aria-label="delete">
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText primary="Home" />
                <ListItemSecondaryAction>
                  <Switch edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Inbox" />
                <ListItemSecondaryAction>
                  <Switch edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Drafts" />
                <ListItemSecondaryAction>
                  <Switch edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
};

const TemplateNested = ({ ...args }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={6} className={classes.root}>
      <Grid container item spacing={2}>
        <Grid item xs={3}>
          <Paper>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem button>
                <ListItemText primary="Home" />
                <ExpandLess />
              </ListItem>
              <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button>
                    <ListItemText primary="Sub item" />
                  </ListItem>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Sub item 2" />
                    </ListItem>
                    <List component="div" disablePadding>
                      <ListItem button>
                        <ListItemText primary="Sub item 3" />
                      </ListItem>
                      <List component="div" disablePadding>
                        <ListItem button>
                          <ListItemText primary="Sub item 4" />
                        </ListItem>
                      </List>
                    </List>
                  </List>
                </List>
              </Collapse>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Inbox" />
                <ExpandMore />
              </ListItem>
              <Divider/>
              <ListItem button>
                <ListItemText primary="Drafts" />
                <ExpandMore />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}


export const Playground = Template.bind({});


export const OneLine = Template.bind({})

export const TwoLines = Template.bind({})
TwoLines.args = { secondary: 'Secondary text' }

export const SecondaryActions = TemplateSecondaryActions.bind({});

export const NestedOptions = TemplateNested.bind({});

