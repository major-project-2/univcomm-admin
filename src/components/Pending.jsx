import React, { useEffect, useState } from "react";
import { server } from "../env";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Toolbar,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";

const roles = {
  1: "Student",
  2: "Faculty",
  3: "Alumni",
};

function StudentList() {
  const [students, setStudents] = useState([]);

  const getUnverifiedUsers = () => {
    const token = localStorage.getItem("adminToken");

    fetch(`${server}/api/v1/users/unverified`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log("Error fetching restricted students:", error);
      });
  };

  useEffect(() => {
    getUnverifiedUsers();
  }, []);

  const verifyStudent = (studentId) => {
    fetch(`${server}/api/v1/users/verify/${studentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("User verified successfully");
          getUnverifiedUsers();
        } else {
          console.log("Failed to verify user");
          throw new Error("Failed to verify user");
        }
      })
      .catch((error) => {
        console.log("Error during user verification:", error);
      });
  };

  if (!Array.isArray(students)) {
    console.log(students);
    return <div>Loading users...</div>;
  }
  return (
    <List>
      {students.map((student, index) => {
        return (
          <ListItem
            key={index}
            secondaryAction={
              <Button
                variant="contained"
                color="primary"
                onClick={() => verifyStudent(student.id)}
              >
                Verify
              </Button>
            }
          >
            <ListItemText
              primary={`S.No.: ${index + 1} - Name: ${student.first_name} ${
                student.last_name
              }, Roll No. ${student.roll_no}, Email: ${student.email}, Role: ${
                roles[student.role_id]
              }`}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default StudentList;
