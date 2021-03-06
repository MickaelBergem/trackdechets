import React from "react";
import { CompanyPrivate } from "../generated/graphql/types";

export const currentSiretService = {
  getSiret: () => window.localStorage.getItem(SIRET_STORAGE_KEY) || "",
  setSiret: (value: string) =>
    window.localStorage.setItem(SIRET_STORAGE_KEY, value),
};

interface IProps {
  siret: string;
  companies: CompanyPrivate[];
  handleCompanyChange: (siret: string) => void;
}

export const SIRET_STORAGE_KEY = "td-selectedSiret";
export default function CompanySelector({
  siret,
  companies,
  handleCompanyChange,
}: IProps) {
  const handleChange = (siret: string) => {
    handleCompanyChange(siret);
  };

  return (
    <select value={siret} onChange={(e) => handleChange(e.target.value)}>
      {companies.map((c) => (
        <option key={c.siret} value={c.siret}>
          {c.givenName || c.name} ({c.siret})
        </option>
      ))}
    </select>
  );
}
