import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store";
const Header = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          " linear-gradient(90deg, rgba(0,4,36,1) 0%, rgba(9,85,121,1) 64%, rgba(0,177,255,1) 96%);",
      }}
    >
      <Toolbar>
        <Typography variant="h4">BlogApp</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight={"auto"}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs"></Tab>
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"></Tab>
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog"></Tab>
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: "1", borderRadius: 10 }}
              color="warning"
            >
              Login
            </Button>
          )}
          {!isLoggedIn && (
            <Button
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: "1", borderRadius: 10 }}
              color="warning"
            >
              SignUp
            </Button>
          )}

          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="contained"
              sx={{ margin: "1", borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
