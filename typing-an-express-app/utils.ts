import { NewPatientEntry, Gender } from './types';

export const parseName = (name: unknown): string => {
  if (!name || typeof name !== 'string') {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

export const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || typeof dateOfBirth !== 'string') {
    throw new Error('Incorrect or missing date of birth');
  }
  return dateOfBirth;
};

export const parseSsn = (ssn: unknown): string => {
  if (!ssn || typeof ssn !== 'string') {
    throw new Error('Incorrect or missing SSN');
  }
  return ssn;
};

export const parseGender = (gender: unknown): Gender => {
  if (
    !gender ||
    typeof gender !== 'string' ||
    !Object.values(Gender).includes(gender as Gender)
  ) {
    throw new Error('Incorrect or missing gender');
  }
  return gender as Gender;
};

export const parseOccupation = (occupation: unknown): string => {
  if (!occupation || typeof occupation !== 'string') {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

/**
 * Converts an unknown object into a NewPatientEntry object.
 *
 * @param {unknown} object - The object to be converted.
 * @returns {NewPatientEntry} - The converted NewPatientEntry object.
 * @throws {Error} - Throws an error if the input object is incorrect or missing required fields.
 */
export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    };

    return newEntry;
  }

  throw new Error('Incorrect or missing data for NewPatientEntry');
};

export default toNewPatientEntry;
