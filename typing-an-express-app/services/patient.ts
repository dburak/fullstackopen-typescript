import patientData from '../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

export default {
  getPatients,
  getNonSensitivePatients,
};
