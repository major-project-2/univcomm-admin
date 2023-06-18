import React, { useEffect, useState } from "react";
import { server } from "../env";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    fetch(`${server}/api/v1/users/inactive`, {
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
    const token = localStorage.getItem("adminToken");
    fetch(`${server}/api/v1/users/activate/${studentId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedStudents = students.filter(
          (student) => student.id !== studentId
        );
        setStudents(updatedStudents);
        setSelectedStudent(data);
        setOpenDialog(true);
        console.log("Student unrestricted successfully:", data);
      })
      .catch((error) => {
        console.log("Error unrestricting student:", error);
      });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedStudent(null);
  };

  if (!Array.isArray(students)) {
    console.log(students);
    return <div>Loading students...</div>;
  }

  return (
    <>
      <List>
        {students.map((student, index) => (
          <React.Fragment key={student.id}>
            <ListItem style={{ marginTop: "16px", marginBottom: "16px" }}>
              <ListItemText
                primary={student.first_name + " " + student.last_name}
              />
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Student Unrestricted</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedStudent &&
              `The student ${selectedStudent.first_name} ${selectedStudent.last_name} has been unrestricted.`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default StudentList;
