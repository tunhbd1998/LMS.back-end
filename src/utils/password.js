import bcrypt from 'bcrypt';
import { BCRYPT } from '../config';

export const hashPassword = async rawPassword => {
  return bcrypt.hash(rawPassword, BCRYPT.SALT_ROUNDS);
};

export const comparePassword = async (rawPassword, hashedPassword) => {
  return bcrypt.compare(rawPassword, hashedPassword);
};
