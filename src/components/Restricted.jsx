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
      .catch((error) =>
        console.log("Error fetching restricted students:", error)
      );
  }, []);

  const removeStudent = (studentId) => {
    const token = localStorage.getItem("adminToken"); // Retrieve token from local storage

    fetch(`${server}/api/v1/users/activate/${studentId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedStudents = students.map((student) =>
          student.id === studentId ? { ...student, restricted: false } : student
        );
        setStudents(updatedStudents);
        console.log("Student unrestricted successfully:", data);
      })
      .catch((error) => {
        console.log("Error unrestricting student:", error);
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => removeStudent(student.id)}
              >
                Unrestrict
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
