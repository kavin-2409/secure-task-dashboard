import jwt from "jsonwebtoken";
console.log("JWT_SECRET in token.ts:", process.env.JWT_SECRET);
export const generateToken = (userId: string) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );
};