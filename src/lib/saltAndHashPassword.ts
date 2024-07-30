import bcrypt from "bcryptjs";

export default async function saltAndHashPassword(
  password: string,
): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
}
