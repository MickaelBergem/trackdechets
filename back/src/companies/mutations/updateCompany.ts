import { prisma, CompanyType } from "../../generated/prisma-client";

export type Payload = {
  siret: string;
  gerepId?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  companyTypes?: CompanyType[];
  givenName?: string;
  transporterReceiptId?: string;
  traderReceiptId?: string;
};

export default function updateCompany({
  siret,
  companyTypes,
  gerepId,
  contactEmail,
  contactPhone,
  website,
  givenName,
  transporterReceiptId,
  traderReceiptId
}: Payload) {
  const data = {
    ...(companyTypes !== undefined
      ? { companyTypes: { set: companyTypes } }
      : {}),
    ...(gerepId !== undefined ? { gerepId } : {}),
    ...(contactEmail !== undefined ? { contactEmail } : {}),
    ...(contactPhone !== undefined ? { contactPhone } : {}),
    ...(website !== undefined ? { website } : {}),
    ...(givenName !== undefined ? { givenName } : {}),
    ...(transporterReceiptId
      ? { transporterReceipt: { connect: { id: transporterReceiptId } } }
      : {}),
    ...(traderReceiptId
      ? { traderReceipt: { connect: { id: traderReceiptId } } }
      : {})
  };

  return prisma.updateCompany({
    where: { siret },
    data
  });
}
