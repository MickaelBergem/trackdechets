export const statusLabels: { [key: string]: string } = {
  DRAFT: "Brouillon",
  SEALED: "En attente d'envoi",
  SENT: "En attente de réception",
  RECEIVED: "Reçu, en attente de traitement",
  PROCESSED: "Traité",
  AWAITING_GROUP: "Traité, en attente de regroupement",
  GROUPED: "Traité, annexé à un bordereau de regroupement",
  NO_TRACEABILITY: "Regroupé, avec autorisation de perte de traçabilité",
  REFUSED: "Refusé",
  TEMP_STORED: "Entreposé temporairement ou en reconditionnement",
  RESENT: "En attente de réception pour traitement",
  RESEALED: "En attente de départ de l'isntallation provisoire",
};

export const ITEMS_PER_PAGE = 50;
