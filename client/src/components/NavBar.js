import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  BUSINESSPAGE_ROUTE,
  MEETINGSPAGE_ROUTE,
  MEETINGSTATISTICPAGE_ROUTE,
  SIGNIN_ROUTE,
} from "../utils/const";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Link
            href={BUSINESSPAGE_ROUTE}
            color="inherit"
            className={classes.title}
          >
            Business Page
          </Link>

          <Link
            href={MEETINGSPAGE_ROUTE}
            color="inherit"
            className={classes.title}
          >
            Meetings Page
          </Link>
          <Link
            href={MEETINGSTATISTICPAGE_ROUTE}
            color="inherit"
            className={classes.title}
          >
            Meeting Statistics Page
          </Link>
          <Button color="inherit" onClick={() => navigate(SIGNIN_ROUTE)}>
            Exit
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
