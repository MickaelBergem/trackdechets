import { useQuery } from "@apollo/react-hooks";
import React, { useContext } from "react";
import { FaClone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { InlineError } from "../../../common/Error";
import Loader from "../../../common/Loader";
import {
  FormStatus,
  Query,
  QueryFormsArgs,
} from "../../../generated/graphql/types";
import { SiretContext } from "../../Dashboard";
import { GET_SLIPS } from "../query";
import Slips from "../Slips";
import LoadMore from "./LoadMore";

export default function DraftsTab() {
  const { siret } = useContext(SiretContext);
  const { loading, error, data, fetchMore } = useQuery<
    Pick<Query, "forms">,
    Partial<QueryFormsArgs>
  >(GET_SLIPS, {
    variables: { siret, status: [FormStatus.Draft] },
  });

  if (loading) return <Loader />;
  if (error) return <InlineError apolloError={error} />;
  if (!data?.forms?.length)
    return (
      <div className="empty-tab">
        <img src="/illu/illu_empty.svg" alt="" />
        <h4>Il n'y a aucun bordereau en brouillon</h4>
        <p>
          Si vous le souhaitez, vous pouvez{" "}
          <Link to="/form">
            <button className="button-outline small primary">
              créer un bordereau
            </button>
          </Link>{" "}
          ou dupliquer un bordereau déjà existant dans un autre onglet grâce à
          l'icône <FaClone />
        </p>
      </div>
    );

  return (
    <>
      <Slips
        siret={siret}
        forms={data.forms}
        hiddenFields={["status", "readableId"]}
        dynamicActions={true}
      />

      <LoadMore forms={data.forms} fetchMore={fetchMore} />
    </>
  );
}
