import User from "../models/user";

export async function ensureOwnerUser(): Promise<void> {
  const email = process.env.OWNER_EMAIL?.trim();
  const password = process.env.OWNER_PASSWORD;
  const name = process.env.OWNER_NAME?.trim() || "Owner";

  if (!email || !password) {
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return;
  }

  const owner = new User({ email, password, name });
  await owner.save();
  console.log("Owner user created:", email);
}
