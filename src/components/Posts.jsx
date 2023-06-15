import React from "react";
import { TextField, Button, Box } from "@mui/material";
import { server } from "../env";

function AnnouncementForm() {
  const [announcement, setAnnouncement] = React.useState({
    heading: "",
    body: "",
  });

  const handleMakeAnnouncement = () => {
    // Log the content of the heading and body fields
    console.log("Heading:", announcement.heading);
    console.log("Body:", announcement.body);

    // Make a POST request to create the announcement in the database
    fetch(`${server}/api/create-announcement`, {
      method: "POST",
      body: JSON.stringify(announcement),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Announcement created:", data);
        // Show a popup with the success message
        alert("Announcement created");

        // Reset the form values
        setAnnouncement({ heading: "", body: "" });
      })
      .catch((error) => {
        console.log("Error creating announcement:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prevAnnouncement) => ({
      ...prevAnnouncement,
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        padding: "16px",
        width: "300px",
        margin: "0 auto",
      }}
    >
      <h2>Create Announcement</h2>
      <TextField
        name="heading"
        label="Heading"
        value={announcement.heading}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <TextField
        name="body"
        label="Body"
        value={announcement.body}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        sx={{ marginBottom: "16px" }}
      />
      <Button variant="contained" onClick={handleMakeAnnouncement}>
        Make Announcement
      </Button>
    </Box>
  );
}

export default AnnouncementForm;
