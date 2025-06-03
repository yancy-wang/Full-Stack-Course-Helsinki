import React, { useState } from "react";
import { Box, Button, ButtonGroup } from "@mui/material";

import { EntryFormValues } from "../../../types";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalEntryForm from "./HospitalEntryForm";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");

  const renderForm = () => {
    switch (entryType) {
      case "HealthCheck":
        return <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />;
      case "OccupationalHealthcare":
        return <OccupationalHealthcareForm onSubmit={onSubmit} onCancel={onCancel} />;
      case "Hospital":
        return <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <ButtonGroup variant="contained" aria-label="entry type selection" style={{ marginBottom: "1em" }}>
        <Button 
          color={entryType === "HealthCheck" ? "primary" : "secondary"}
          onClick={() => setEntryType("HealthCheck")}
        >
          Health Check
        </Button>
        <Button 
          color={entryType === "OccupationalHealthcare" ? "primary" : "secondary"}
          onClick={() => setEntryType("OccupationalHealthcare")}
        >
          Occupational Healthcare
        </Button>
        <Button 
          color={entryType === "Hospital" ? "primary" : "secondary"}
          onClick={() => setEntryType("Hospital")}
        >
          Hospital
        </Button>
      </ButtonGroup>
      {renderForm()}
    </Box>
  );
};

export default AddEntryForm;