import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField as MuiTextField, Typography } from "@mui/material";

import { Diagnosis } from "../types";

// structure of a single option
export type SelectFieldOption = {
  value: string | number;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: SelectFieldOption[];
};

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <FormControl fullWidth style={{ marginBottom: '0.5em' }}>
    <InputLabel>{label}</InputLabel>
    <Field as={Select} name={name} label={label}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
    <Typography variant="inherit" color="textSecondary" component="div">
      <ErrorMessage name={name} />
    </Typography>
  </FormControl>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
  type?: string;
}

export const TextField = ({ field, label, placeholder, type }: TextProps) => (
  <div style={{ marginBottom: '1em' }}>
    <MuiTextField
      fullWidth
      label={label}
      placeholder={placeholder}
      type={type}
      {...field}
    />
    <Typography variant="inherit" color="textSecondary" component="div">
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface DiagnosisSelectionProps {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched
}: DiagnosisSelectionProps) => {
  const [selectedDiagnoses, setDiagnoses] = React.useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, data);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.code} ${diagnosis.name}`,
    value: diagnosis.code
  }));

  return (
    <FormControl style={{ width: '100%', marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<OutlinedInput label="Diagnoses" />}
        renderValue={(selected) => (selected as string[]).join(', ')}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            <Checkbox checked={selectedDiagnoses.indexOf(option.value) > -1} />
            <ListItemText primary={option.text} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};