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

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch(`${server}/api/v1/users/restricted`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => {
        console.log("Error fetching restricted students:", error);
      });
  }, []);

  const verifyStudent = (studentId) => {
    fetch(`${server}/api/v1/users/verify/${studentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setStudents((prevStudents) =>
            prevStudents.map((student) => {
              if (student.id === studentId) {
                return { ...student, restricted: false };
              }
              return student;
            })
          );
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
    return <div>Loading students...</div>;
  }
  return (
    <List>
      {students.map((student, index) => (
        <React.Fragment key={student.id}>
          <ListItem>
            <ListItemText primary={student.name} />
            <ListItemSecondaryAction>
              {!student.restricted && (
                <Button variant="contained" disabled>
                  Verified
                </Button>
              )}
              {student.restricted && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => verifyStudent(student.id)}
                >
                  Verify
                </Button>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          {index !== students.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
}

export default StudentList;
