import bcrypt from "bcryptjs";

// hash password before saving
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// compare entered password with stored hash
export const comparePassword = async (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};