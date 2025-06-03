import React from "react";
import { Box, Typography } from "@mui/material";
import { Work, LocalHospital, MonitorHeart } from "@mui/icons-material";

import { Entry, Diagnosis, HealthCheckRating } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: { [code: string]: Diagnosis };
}

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const getHealthCheckRatingText = (rating: HealthCheckRating): string => {
    switch (rating) {
      case HealthCheckRating.Healthy:
        return "💚 Healthy";
      case HealthCheckRating.LowRisk:
        return "💛 Low Risk";
      case HealthCheckRating.HighRisk:
        return "🧡 High Risk";
      case HealthCheckRating.CriticalRisk:
        return "❤️ Critical Risk";
      default:
        return "";
    }
  };

  const getEntryIcon = () => {
    switch (entry.type) {
      case "HealthCheck":
        return <MonitorHeart />;
      case "Hospital":
        return <LocalHospital />;
      case "OccupationalHealthcare":
        return <Work />;
      default:
        return null;
    }
  };

  const renderEntryDetails = () => {
    switch (entry.type) {
      case "HealthCheck":
        return (
          <Typography>
            {getHealthCheckRatingText(entry.healthCheckRating)}
          </Typography>
        );
      case "Hospital":
        return (
          <Typography>
            <strong>Discharge:</strong> {entry.discharge.date} - {entry.discharge.criteria}
          </Typography>
        );
      case "OccupationalHealthcare":
        return (
          <div>
            <Typography><strong>Employer:</strong> {entry.employerName}</Typography>
            {entry.sickLeave && (
              <Typography>
                <strong>Sick leave:</strong> {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
              </Typography>
            )}
          </div>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Box sx={{ border: 1, borderColor: 'grey.300', padding: 2, margin: 1, borderRadius: 1 }}>
      <Typography variant="body1" style={{ marginBottom: "0.5em" }}>
        {entry.date} {getEntryIcon()}
      </Typography>
      <Typography style={{ fontStyle: 'italic', marginBottom: "0.5em" }}>
        {entry.description}
      </Typography>
      
      {renderEntryDetails()}
      
      {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
        <Box style={{ marginTop: "0.5em" }}>
          <Typography variant="body2"><strong>diagnose by {entry.specialist}</strong></Typography>
          <ul>
            {entry.diagnosisCodes.map(code => (
              <li key={code}>
                {code} {diagnoses[code] ? diagnoses[code].name : ''}
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default EntryDetails;