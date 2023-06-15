import React, { useEffect, useState } from "react";
import { server } from "../env";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
} from "@mui/material";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    console.log(!!token);
    setHasToken(!!token); // Check if token exists

    if (token) {
      fetch(`${server}/api/v1/users`)
        .then((response) => response.json())
        .then((data) => setStudents(data))
        .catch((error) => console.log("Error fetching students:", error));
    }
  }, []);
  console.log(students);

  const toggleRestricted = (studentId) => {
    const updatedStudents = students.map((student) =>
      student.id === studentId
        ? { ...student, restricted: !student.restricted }
        : student
    );
    setStudents(updatedStudents);

    // Make the PATCH request to toggle the student's restriction status
    fetch(`${server}/api/v1/users/deactivate/${studentId}`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Student restriction updated successfully:", data);
      })
      .catch((error) => {
        console.log("Error toggling student restriction:", error);
      });
  };

  // if (!hasToken) {
  //   return <div>No token available. Please authenticate first.</div>;
  // }

  if (!Array.isArray(students)) {
    return <div>Loading students...</div>;
  }

  return (
    <List>
      {students.map((student, index) => (
        <React.Fragment key={student.id}>
          <ListItem>
            <ListItemText primary={student.name} />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color={student.restricted ? "primary" : "default"}
                onClick={() => toggleRestricted(student.id)}
              >
                {student.restricted ? "Restrict" : "Unrestrict"}
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          {index !== students.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

export default StudentList;
