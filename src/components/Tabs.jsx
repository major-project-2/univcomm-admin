import React from "react";
import {
  Tabs as CustomTabs,
  Tab,
  Box,
  Menu,
  MenuItem,
  Button,
  ThemeProvider,
  createTheme,
  IconButton,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import Pending from "./Pending";
import Users from "./Users";
import Restricted from "./Restricted";
import Posts from "./Posts";
import CreateUser from "./CreateUser";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Tabs() {
  const [value, setValue] = React.useState(0);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleTabClick = (index) => {
    setValue(index);
    handleDropdownClose();
  };

  return (
    <div>
      {isMobile ? (
        <>
          <Button onClick={handleDropdownOpen}>
            {value === 0 && "Pending requests"}
            {value === 1 && "All Users"}
            {value === 2 && "Restricted Accounts"}
            {value === 3 && "Announcement"}
            {value === 4 && "Create User"}
            <ArrowDropDownIcon />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleDropdownClose}
          >
            <MenuItem onClick={() => handleTabClick(0)}>
              Pending requests
            </MenuItem>
            <MenuItem onClick={() => handleTabClick(1)}>All Users</MenuItem>
            <MenuItem onClick={() => handleTabClick(2)}>
              Restricted Accounts
            </MenuItem>
            <MenuItem onClick={() => handleTabClick(3)}>Announcement</MenuItem>
            <MenuItem onClick={() => handleTabClick(4)}>Create User</MenuItem>
          </Menu>
        </>
      ) : (
        <CustomTabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Pending requests" />
          <Tab label="All Users" />
          <Tab label="Restricted Accounts" />
          <Tab label="Announcement" />
          <Tab label="Create User" />
        </CustomTabs>
      )}
      <TabPanel value={value} index={0}>
        <Pending />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Users />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Restricted />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CreateUser />
      </TabPanel>
    </div>
  );
}

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Tabs />
    </ThemeProvider>
  );
}

export default App;

/*
import React from "react";
import { Tabs as CustomTabs, Tab, Box, FormControl, Select, MenuItem } from "@mui/material";
import Pending from "./Pending";
import Users from "./Users";
import Restricted from "./Restricted";
import Posts from "./Posts";
import CreateUser from "./CreateUser";

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Tabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <Select
          value={value}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Tabs dropdown menu" }}
        >
          <MenuItem value={0}>All Users</MenuItem>
          <MenuItem value={1}>Pending requests</MenuItem>
          <MenuItem value={2}>Restricted Accounts</MenuItem>
          <MenuItem value={3}>Posts</MenuItem>
          <MenuItem value={4}>Create User</MenuItem>
        </Select>
      </FormControl>
      <TabPanel value={value} index={0}>
        <Users />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Pending />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Restricted />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Posts />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CreateUser />
      </TabPanel>
    </div>
  );
}

export default Tabs;

*/
