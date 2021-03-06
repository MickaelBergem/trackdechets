import { prisma } from "../../generated/prisma-client";
import { hash, compare } from "bcrypt";
import { UserInputError } from "apollo-server-express";
import { MutationChangePasswordArgs } from "../../generated/graphql/types";

/**
 * Change user password
 */
export async function changePassword(
  userId: string,
  { oldPassword, newPassword }: MutationChangePasswordArgs
) {
  const user = await prisma.user({ id: userId });
  const passwordValid = await compare(oldPassword, user.password);
  if (!passwordValid) {
    throw new UserInputError("L'ancien mot de passe est incorrect.", {
      invalidArgs: ["oldPassword"]
    });
  }

  const hashedPassword = await hash(newPassword, 10);
  return await prisma.updateUser({
    where: { id: userId },
    data: { password: hashedPassword }
  });
}
