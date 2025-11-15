import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Button,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { toast } from "react-toastify";

// Sample patient data
const samplePatients = [
  { id: "P001", name: "Aaryan Sharma", age: 45, gender: "Male", lastVisit: "2025-11-10", status: "Active", imagesProcessed: 12, notesGenerated: 8 },
  { id: "P002", name: "Sushmita Rao", age: 62, gender: "Female", lastVisit: "2025-11-11", status: "Active", imagesProcessed: 5, notesGenerated: 3 },
  { id: "P003", name: "Rohan Mehta", age: 38, gender: "Male", lastVisit: "2025-11-08", status: "Inactive", imagesProcessed: 8, notesGenerated: 5 },
  { id: "P004", name: "Priya Patel", age: 29, gender: "Female", lastVisit: "2025-11-12", status: "Active", imagesProcessed: 15, notesGenerated: 11 },
];

export default function PatientManagement() {
  const [patients, setPatients] = useState(samplePatients);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: "", age: "", gender: "Male" });

  const handleViewPatient = (patient) => {
    toast.info(`Viewing details for ${patient.name}`);
  };

  const toggleStatus = (id) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
    toast.success("Patient status updated");
  };

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.age) return toast.error("Fill all fields");

    const patient = {
      id: `P${String(patients.length + 1).padStart(3, "0")}`,
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      lastVisit: new Date().toISOString().split("T")[0],
      status: "Active",
      imagesProcessed: 0,
      notesGenerated: 0,
    };

    setPatients([...patients, patient]);
    setOpenDialog(false);
    setNewPatient({ name: "", age: "", gender: "Male" });
    toast.success("Patient added successfully!");
  };

  return (
    <Box sx={{ p: 3, background: "#FFF7F2", minHeight: "100vh", borderRadius: 3 }}>
      
      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#4B3A36" }}>
          Patient Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            background: "#F7BFA0",
            color: "#4B3A36",
            fontWeight: 600,
            px: 3,
            borderRadius: "12px",
            "&:hover": {
              background: "#F4A87A",
            },
          }}
        >
          Add Patient
        </Button>
      </Box>

      {/* PATIENT TABLE */}
      <Card sx={{ borderRadius: "18px", boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}>
        <CardContent>
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: "12px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#FCE7DB" }}>
                  {["ID", "Name", "Age", "Gender", "Last Visit", "Images", "Notes", "Status", "Actions"].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: 700, color: "#4B3A36" }}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id} hover sx={{ transition: "0.2s", "&:hover": { background: "#FFF1EA" } }}>
                    <TableCell>{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>{patient.imagesProcessed}</TableCell>
                    <TableCell>{patient.notesGenerated}</TableCell>

                    <TableCell>
                      <Chip
                        label={patient.status}
                        sx={{
                          background: patient.status === "Active" ? "#6EC6A8" : "#A88E85",
                          color: "white",
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {/* VIEW BUTTON */}
                      <Tooltip title="View Patient">
                        <IconButton onClick={() => handleViewPatient(patient)} sx={{ color: "#4B3A36" }}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>

                      {/* TOGGLE STATUS */}
                      <Tooltip title="Activate / Deactivate">
                        <IconButton onClick={() => toggleStatus(patient.id)} sx={{ color: "#F7BFA0" }}>
                          <AutorenewIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>

            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* ADD PATIENT DIALOG */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: "#F7BFA0", color: "#4B3A36", fontWeight: 700 }}>
          Add New Patient
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Patient Name"
                fullWidth
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Age"
                type="number"
                fullWidth
                value={newPatient.age}
                onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Gender"
                select
                fullWidth
                value={newPatient.gender}
                onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

          <Button
            variant="contained"
            onClick={handleAddPatient}
            sx={{
              background: "#F7BFA0",
              color: "#4B3A36",
              fontWeight: 600,
              "&:hover": { background: "#F4A87A" },
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
