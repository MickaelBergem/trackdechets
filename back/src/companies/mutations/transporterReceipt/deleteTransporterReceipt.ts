import { prisma } from "../../../generated/prisma-client";
import { DeleteTransporterReceiptInput } from "../../../generated/graphql/types";

/**
 * Delete a transporter receipt
 * @param id
 */
export default function deleteTransporterReceipt({
  id
}: DeleteTransporterReceiptInput) {
  return prisma.deleteTransporterReceipt({ id });
}
