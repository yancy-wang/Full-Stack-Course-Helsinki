import React from "react";
import { Grid, Button } from "@mui/material";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../../FormField";
import { OccupationalHealthcareEntry } from "../../../types";
import { useStateValue } from "../../../state/state";

interface Props {
  onSubmit: (values: Omit<OccupationalHealthcareEntry, "id">) => void;
  onCancel: () => void;
}

const OccupationalHealthcareForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        type: "OccupationalHealthcare" as const
      }}
      onSubmit={(values) => {
        const formattedValues = {
          ...values,
          sickLeave: values.sickLeave.startDate && values.sickLeave.endDate 
            ? values.sickLeave 
            : undefined
        };
        onSubmit(formattedValues);
      }}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              type="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="Sick leave start date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              type="date"
              component={TextField}
            />
            <Field
              label="Sick leave end date"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              type="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OccupationalHealthcareForm;