import patientData from '../data/patients';
import {
  NonSensitivePatientEntry,
  PatientEntry,
  NewPatientEntry,
} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): PatientEntry[] => {
  return patientData;
};

const getNonSensitivePatients = (): NonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };

  patientData.push(newPatient);

  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
};
