import React, { useState } from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { server } from "../env";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  ClickAwayListener,
  Paper,
  Popper,
  List,
  ListItem,
  ListItemText,
  Modal,
  Box,
} from "@mui/material";
import { Notifications, Logout, Close } from "@mui/icons-material";

function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Notification 1", read: false },
    { id: 2, text: "Notification 2", read: false },
    { id: 3, text: "Notification 3", read: false },
  ]);

  const anchorRef = React.useRef(null);
  const navigate = useNavigate();

  const handleToggle = () => {
    setOpenDropdown((prevOpen) => !prevOpen);
  };

  const handleClick = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
    markNotificationAsRead(notification);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenDropdown(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const markNotificationAsRead = (notification) => {
    const updatedNotifications = notifications.map((item) =>
      item.id === notification.id ? { ...item, read: true } : item
    );
    setNotifications(updatedNotifications);
  };

  const getUnreadNotificationCount = () => {
    return notifications.filter((item) => !item.read).length;
  };

  const handleLogout = () => {
    // Send a POST request to the logout API endpoint
    fetch(`${server}/api/v1/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          // Logout successful
          console.log("Logout successful");

          // Clear the admin token from localStorage
          localStorage.removeItem("adminToken");

          // Redirect to the login page or desired page
          navigate("/login");
        } else {
          // Logout failed
          console.log("Logout failed");
          throw new Error("Logout failed");
        }
      })
      .catch((error) => {
        console.log("Error during logout:", error);
      });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          UNIVCOMM
        </Typography>
        <IconButton
          color="inherit"
          ref={anchorRef}
          sx={{ paddingRight: "20px" }}
          onClick={handleToggle}
        >
          <Badge badgeContent={getUnreadNotificationCount()} color="error">
            <Notifications />
          </Badge>
        </IconButton>
        <IconButton color="inherit" onClick={handleLogout}>
          <Logout />
        </IconButton>
        <Popper
          open={openDropdown}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
          placement="bottom-startend"
        >
          {({ TransitionProps }) => (
            <Paper
              sx={{
                marginTop: "8px",
                // width: "250px",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <List>
                  {notifications.map((notification) => (
                    <ListItem
                      key={notification.id}
                      button
                      onClick={() => handleClick(notification)}
                      sx={{
                        backgroundColor: notification.read
                          ? "transparent"
                          : "#f5f5f5",
                      }}
                    >
                      <ListItemText primary={notification.text} />
                    </ListItem>
                  ))}
                </List>
              </ClickAwayListener>
            </Paper>
          )}
        </Popper>
        <Modal
          open={openModal}
          onClose={handleModalClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              p: 3,
              bgcolor: "background.paper",
              borderRadius: "8px",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: "8px", right: "8px" }}
              onClick={handleModalClose}
            >
              <Close />
            </IconButton>
            <Typography variant="h6" id="modal-title" gutterBottom>
              Modal Title
            </Typography>
            <Typography id="modal-description">Modal Content</Typography>
          </Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return <Navbar />;
}

export default App;
