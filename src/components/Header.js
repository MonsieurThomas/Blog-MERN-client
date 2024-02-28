

import React, { useState } from "react";
import { AppBar, Typography, Toolbar, Box, Button, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();

  const [value, setValue] = useState();

  const handleSignupClick = () => {
    console.log("abcd")
    navigate('/auth', { state: { initialIsSignup: true } });
  };

  const handleLoginClick = () => {
    navigate('/auth', { state: { initialIsSignup: false } });
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h5"> 
          BlogsApp
        </Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto">
            <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blog" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn ? (
            <>
                <Button onClick={handleSignupClick} variant="outlined" color="inherit" sx={{ margin: 1 }}>
                  Signup
                </Button>
                <Button onClick={handleLoginClick} variant="outlined" color="inherit" sx={{ margin: 1 }}>
                  Login
                </Button>
            </>
          ) : (
            <Button
              onClick={() => dispatch(authActions.logout())}
              LinkComponent={Link}
              to="/auth"
              variant="outlined"
              color="inherit"
              sx={{ margin: 1 }}
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
