export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `DateTime` scalar expects a date-formatted string matching one of the following formats:
   * - "yyyy-MM-dd" (eg. 2020-11-23)
   * - "yyyy-MM-ddTHH:mm:ss" (eg. 2020-11-23T13:34:55)
   * - "yyyy-MM-ddTHH:mm:ssX" (eg. 2020-11-23T13:34:55Z)
   * - "yyyy-MM-dd'T'HH:mm:ss.SSS" (eg. 2020-11-23T13:34:55.987)
   * - "yyyy-MM-dd'T'HH:mm:ss.SSSX" (eg. 2020-11-23T13:34:55.987Z)
   */
  DateTime: any;
  JSON: any;
};

/** Payload de création d'une annexe 2 */
export type AppendixFormInput = {
  /** N° de bordereau */
  readableId: Maybe<Scalars['ID']>;
};

/** Cet objet est renvoyé par la mutation login qui est dépréciée */
export type AuthPayload = {
   __typename?: 'AuthPayload';
  /**
   * Bearer token à durée illimité permettant de s'authentifier
   * à l'API Trackdéchets. Pour ce faire, il doit être passé dans le
   * header d'autorisation `Authorization: Bearer ******`
   */
  token: Scalars['String'];
  /** Utilisateur lié au token */
  user: User;
};

/**
 * Information sur établissement accessible dans la liste des favoris
 * La liste des favoris est constituée à partir de l'historique des
 * BSD édités
 */
export type CompanyFavorite = {
   __typename?: 'CompanyFavorite';
  /** Nom de l'établissement */
  name: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address: Maybe<Scalars['String']>;
  /** Nom du contact */
  contact: Maybe<Scalars['String']>;
  /** Numéro de téléphone */
  phone: Maybe<Scalars['String']>;
  /** Email de contact */
  mail: Maybe<Scalars['String']>;
  /** Récépissé transporteur associé à cet établissement (le cas échéant) */
  transporterReceipt: Maybe<TransporterReceipt>;
  /** Récépissé négociant associé à cet établissement (le cas échant) */
  traderReceipt: Maybe<TraderReceipt>;
};

/** Payload d'un établissement */
export type CompanyInput = {
  /** SIRET de l'établissement */
  siret: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address: Maybe<Scalars['String']>;
  /** Nom du contact dans l'établissement */
  contact: Maybe<Scalars['String']>;
  /** Email du contact dans l'établissement */
  mail: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact dans l'établissement */
  phone: Maybe<Scalars['String']>;
};

/** Information sur utilisateur au sein d'un établissement */
export type CompanyMember = {
   __typename?: 'CompanyMember';
  /** Identifiant opaque */
  id: Scalars['ID'];
  /** Email */
  email: Scalars['String'];
  /** Nom de l'utilisateur */
  name: Maybe<Scalars['String']>;
  /** Rôle de l'utilisateur dans l'établissement (admin ou membre) */
  role: Maybe<UserRole>;
  /** Si oui ou non l'email de l'utilisateur a été confirmé */
  isActive: Maybe<Scalars['Boolean']>;
  /** Si oui ou non une une invitation à joindre l'établissement est en attente */
  isPendingInvitation: Maybe<Scalars['Boolean']>;
  /** Si oui ou non cet utilisateur correspond à l'utilisateur authentifié */
  isMe: Maybe<Scalars['Boolean']>;
};

/** Information sur un établissement accessible par un utilisateur membre */
export type CompanyPrivate = {
   __typename?: 'CompanyPrivate';
  /** Identifiant opaque */
  id: Scalars['ID'];
  /** Profil de l'établissement */
  companyTypes: Array<CompanyType>;
  /** Identifiant GEREP */
  gerepId: Maybe<Scalars['String']>;
  /** Code de sécurité permettant de signer les BSD */
  securityCode: Scalars['Int'];
  /** Email de contact (visible sur la fiche entreprise) */
  contactEmail: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact (visible sur la fiche entreprise) */
  contactPhone: Maybe<Scalars['String']>;
  /** Site web (visible sur la fiche entreprise) */
  website: Maybe<Scalars['String']>;
  /** Liste des utilisateurs appartenant à cet établissement */
  users: Maybe<Array<CompanyMember>>;
  /** Rôle de l'utilisateur authentifié cau sein de cet établissement */
  userRole: Maybe<UserRole>;
  /**
   * Nom d'usage de l'entreprise qui permet de différencier
   * différents établissements ayant le même nom
   */
  givenName: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret: Scalars['String'];
  /** Adresse de l'établissement */
  address: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name: Maybe<Scalars['String']>;
  /** Code NAF de l'établissement */
  naf: Maybe<Scalars['String']>;
  /** Libellé NAF de l'établissement */
  libelleNaf: Maybe<Scalars['String']>;
  /** Longitude de l'établissement (info géographique) */
  longitude: Maybe<Scalars['Float']>;
  /** Latitude de l'établissement (info géographique) */
  latitude: Maybe<Scalars['Float']>;
  /**
   * Installation classée pour la protection de l'environnement (ICPE)
   * associé à cet établissement (le cas échéant)
   */
  installation: Maybe<Installation>;
  /** Récépissé transporteur (le cas échéant, pour les profils transporteur) */
  transporterReceipt: Maybe<TransporterReceipt>;
  /** Récépissé négociant (le cas échéant, pour les profils transporteur) */
  traderReceipt: Maybe<TraderReceipt>;
};

/** Information sur un établissement accessible publiquement */
export type CompanyPublic = {
   __typename?: 'CompanyPublic';
  /** Email de contact */
  contactEmail: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact */
  contactPhone: Maybe<Scalars['String']>;
  /** Site web */
  website: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret: Maybe<Scalars['String']>;
  /** État administratif de l'établissement. A = Actif, F = Fermé */
  etatAdministratif: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name: Maybe<Scalars['String']>;
  /** Code NAF */
  naf: Maybe<Scalars['String']>;
  /** Libellé NAF */
  libelleNaf: Maybe<Scalars['String']>;
  /** Longitude de l'établissement (info géographique) */
  longitude: Maybe<Scalars['Float']>;
  /** Latitude de l'établissement (info géographique) */
  latitude: Maybe<Scalars['Float']>;
  /**
   * Installation classée pour la protection de l'environnement (ICPE)
   * associé à cet établissement
   */
  installation: Maybe<Installation>;
  /** Si oui on non cet établissement est inscrit sur la plateforme Trackdéchets */
  isRegistered: Maybe<Scalars['Boolean']>;
  /** Récépissé transporteur associé à cet établissement (le cas échéant) */
  transporterReceipt: Maybe<TransporterReceipt>;
  /** Récépissé négociant associé à cet établissement (le cas échant) */
  traderReceipt: Maybe<TraderReceipt>;
};

/** Information sur un établissement accessible publiquement en recherche */
export type CompanySearchResult = {
   __typename?: 'CompanySearchResult';
  /** SIRET de l'établissement */
  siret: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name: Maybe<Scalars['String']>;
  /** Profil de l'établissement */
  companyTypes: Maybe<Array<Maybe<CompanyType>>>;
  /** Code NAF */
  naf: Maybe<Scalars['String']>;
  /** Libellé NAF */
  libelleNaf: Maybe<Scalars['String']>;
  /** Longitude de l'établissement (info géographique) */
  longitude: Maybe<Scalars['Float']>;
  /** Latitude de l'établissement (info géographique) */
  latitude: Maybe<Scalars['Float']>;
  /**
   * Installation classée pour la protection de l'environnement (ICPE)
   * associé à cet établissement
   */
  installation: Maybe<Installation>;
  /** Récépissé transporteur associé à cet établissement (le cas échéant) */
  transporterReceipt: Maybe<TransporterReceipt>;
  /** Récépissé négociant associé à cet établissement (le cas échant) */
  traderReceipt: Maybe<TraderReceipt>;
};

/** Statistiques d'un établissement */
export type CompanyStat = {
   __typename?: 'CompanyStat';
  /** Établissement */
  company: Maybe<FormCompany>;
  /** Liste des statistiques */
  stats: Array<Stat>;
};

/** Profil entreprise */
export enum CompanyType {
  /** Producteur de déchet */
  Producer = 'PRODUCER',
  /** Installation de Transit, regroupement ou tri de déchets */
  Collector = 'COLLECTOR',
  /** Installation de traitement */
  Wasteprocessor = 'WASTEPROCESSOR',
  /** Transporteur */
  Transporter = 'TRANSPORTER',
  /** Installation d'entreposage, dépollution, démontage, découpage de VHU */
  WasteVehicles = 'WASTE_VEHICLES',
  /** Installation de collecte de déchets apportés par le producteur initial */
  WasteCenter = 'WASTE_CENTER',
  /** Négociant */
  Trader = 'TRADER'
}

/** Consistance du déchet */
export enum Consistence {
  /** Solide */
  Solid = 'SOLID',
  /** Liquide */
  Liquid = 'LIQUID',
  /** Gazeux */
  Gaseous = 'GASEOUS'
}

/** Payload de création d'un récépissé négociant */
export type CreateTraderReceiptInput = {
  /** Numéro de récépissé négociant */
  receiptNumber: Scalars['String'];
  /** Limite de validatié du récépissé */
  validityLimit: Scalars['DateTime'];
  /** Département ayant enregistré la déclaration */
  department: Scalars['String'];
};

/** Payload de création d'un récépissé transporteur */
export type CreateTransporterReceiptInput = {
  /** Numéro de récépissé transporteur */
  receiptNumber: Scalars['String'];
  /** Limite de validatié du récépissé */
  validityLimit: Scalars['DateTime'];
  /** Département ayant enregistré la déclaration */
  department: Scalars['String'];
};


/** Représente une ligne dans une déclaration GEREP */
export type Declaration = {
   __typename?: 'Declaration';
  /** Année de la déclaration */
  annee: Maybe<Scalars['String']>;
  /** Code du déchet */
  codeDechet: Maybe<Scalars['String']>;
  /** Description du déchet */
  libDechet: Maybe<Scalars['String']>;
  /** Type de déclaration GEREP: producteur ou traiteur */
  gerepType: Maybe<GerepType>;
};

/** Payload de suppression d'un récépissé négociant */
export type DeleteTraderReceiptInput = {
  /** The id of the trader receipt to delete */
  id: Scalars['ID'];
};

/** Payload de suppression d'un récépissé transporteur */
export type DeleteTransporterReceiptInput = {
  /** The id of the transporter receipt to delete */
  id: Scalars['ID'];
};

export type Destination = {
   __typename?: 'Destination';
  /** N° de CAP (le cas échéant) */
  cap: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation: Maybe<Scalars['String']>;
  /** Établissement de destination */
  company: Maybe<FormCompany>;
  /** Indique si l'information a été saisie par l'émetteur du bordereau ou l'installation d'entreposage */
  isFilledByEmitter: Maybe<Scalars['Boolean']>;
};

export type DestinationInput = {
  /** Installation de destination prévue */
  company: Maybe<CompanyInput>;
  /** N° de CAP prévu (le cas échéant) */
  cap: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation: Maybe<Scalars['String']>;
};

/**
 * Eco-organisme
 * Les éco-organismes n'apparaissent pas en case 1 du bordereau mais sont quand même responsables du déchet.
 * C'est l'entreprise de collecte de déchet qui apparait en case 1.
 * Pour pouvoir saisir un éco-organisme, le détenteur du déchet doit être défini comme 'Autre détenteur'.
 * Seul un éco-organisme enregistré dans Trackdéchet peut être associé.
 */
export type EcoOrganisme = {
   __typename?: 'EcoOrganisme';
  id: Scalars['ID'];
  /** Nom de l'éco-organisme */
  name: Scalars['String'];
  /** Siret de l'éco-organisme */
  siret: Scalars['String'];
  /** Adresse de l'éco-organisme */
  address: Scalars['String'];
};

/** Payload de liason d'un BSD à un eco-organisme */
export type EcoOrganismeInput = {
  id: Maybe<Scalars['ID']>;
};

/** Émetteur du BSD (case 1) */
export type Emitter = {
   __typename?: 'Emitter';
  /** Type d'émetteur */
  type: Maybe<EmitterType>;
  /** Adresse du chantier */
  workSite: Maybe<WorkSite>;
  /**
   * DEPRECATED - Ancienne adresse chantier
   * @deprecated Migration vers `workSite` obligatoire
   */
  pickupSite: Maybe<Scalars['String']>;
  /** Établissement émetteur */
  company: Maybe<FormCompany>;
};

/** Payload lié à un l'émetteur du BSD (case 1) */
export type EmitterInput = {
  /** Type d'émetteur */
  type: Maybe<EmitterType>;
  /** Adresse du chantier */
  workSite: Maybe<WorkSiteInput>;
  /** DEPRECATED - Ancienne adresse chantier */
  pickupSite: Maybe<Scalars['String']>;
  /** Établissement émetteur */
  company: Maybe<CompanyInput>;
};

/** Types d'émetteur de déchet (choix multiple de la case 1) */
export enum EmitterType {
  /** Producetur de déchet */
  Producer = 'PRODUCER',
  /** Autre détenteur */
  Other = 'OTHER',
  /** Collecteur de petites quantités de déchets relevant de la même rubrique */
  Appendix1 = 'APPENDIX1',
  /** Personne ayant transformé ou réalisé un traitement dont la provenance des déchets reste identifiable */
  Appendix2 = 'APPENDIX2'
}

/** Type d'établissement favoris */
export enum FavoriteType {
  Emitter = 'EMITTER',
  Transporter = 'TRANSPORTER',
  Recipient = 'RECIPIENT',
  Trader = 'TRADER',
  NextDestination = 'NEXT_DESTINATION',
  TemporaryStorageDetail = 'TEMPORARY_STORAGE_DETAIL',
  Destination = 'DESTINATION'
}

/**
 * URL de téléchargement accompagné d'un token
 * permettant de valider le téléchargement.
 */
export type FileDownload = {
   __typename?: 'FileDownload';
  /** Token ayant une durée de validité de 10s */
  token: Maybe<Scalars['String']>;
  /** Lien de téléchargement */
  downloadLink: Maybe<Scalars['String']>;
};

/**
 * Bordereau de suivi de déchets (BSD)
 * Version dématérialisée du [CERFA n°12571*01](https://www.service-public.fr/professionnels-entreprises/vosdroits/R14334)
 */
export type Form = {
   __typename?: 'Form';
  /** Identifiant interne du BSD */
  id: Scalars['ID'];
  /** Identifiant utilisé dans la case 'Bordereau n° ****' */
  readableId: Scalars['String'];
  /**
   * Identifiant personnalisé permettant de faire le lien avec un
   * objet un système d'information tierce
   */
  customId: Maybe<Scalars['String']>;
  /** Établissement émetteur/producteur du déchet (case 1) */
  emitter: Maybe<Emitter>;
  /** Établissement qui reçoit le déchet (case 2) */
  recipient: Maybe<Recipient>;
  /** Transporteur du déchet (case 8) */
  transporter: Maybe<Transporter>;
  /** Détails du déchet (case 3) */
  wasteDetails: Maybe<WasteDetails>;
  /** Négociant (case 7) */
  trader: Maybe<Trader>;
  /** Date de création du BSD */
  createdAt: Maybe<Scalars['DateTime']>;
  /** Date de la dernière modification du BSD */
  updatedAt: Maybe<Scalars['DateTime']>;
  /** ID de l'utilisateur ayant crée le BSD */
  ownerId: Maybe<Scalars['Int']>;
  /** Statut du BSD (brouillon, envoyé, reçu, traité, etc) */
  status: FormStatus;
  /** Si oui ou non le BSD a été signé par un transporteur */
  signedByTransporter: Maybe<Scalars['Boolean']>;
  /** Date de l'envoi du déchet par l'émetteur (case 9) */
  sentAt: Maybe<Scalars['DateTime']>;
  /** Nom de la personne responsable de l'envoi du déchet (case 9) */
  sentBy: Maybe<Scalars['String']>;
  /** Statut d'acceptation du déchet (case 10) */
  wasteAcceptationStatus: Maybe<Scalars['String']>;
  /** Raison du refus (case 10) */
  wasteRefusalReason: Maybe<Scalars['String']>;
  /** Nom de la personne en charge de la réception du déchet (case 10) */
  receivedBy: Maybe<Scalars['String']>;
  /** Date à laquelle le déchet a été reçu (case 10) */
  receivedAt: Maybe<Scalars['DateTime']>;
  /** Quantité réelle présentée (case 10) */
  quantityReceived: Maybe<Scalars['Float']>;
  /**
   * Quantité actuellement connue en tonnes.
   * Elle est calculée en fonction des autres champs pour renvoyer la dernière quantité connue.
   * Elle renvoi ainsi soit la quantité envoyée estimée, soit la quantitée recue
   * sur le site d'entreposage, soit la quantitée réelle recue.
   */
  actualQuantity: Maybe<Scalars['Float']>;
  /** Traitement réalisé (code D/R) */
  processingOperationDone: Maybe<Scalars['String']>;
  /** Description de l'opération de traitement (case 11) */
  processingOperationDescription: Maybe<Scalars['String']>;
  /** Personne en charge du traitement */
  processedBy: Maybe<Scalars['String']>;
  /** Date à laquelle le déchet a été traité */
  processedAt: Maybe<Scalars['DateTime']>;
  /** Si oui ou non il y a eu perte de traçabalité */
  noTraceability: Maybe<Scalars['Boolean']>;
  /** Destination ultérieure prévue (case 12) */
  nextDestination: Maybe<NextDestination>;
  /** Annexe 2 */
  appendix2Forms: Maybe<Array<Form>>;
  ecoOrganisme: Maybe<EcoOrganisme>;
  /** BSD suite - détail des champs de la partie entreposage provisoire ou reconditionnement */
  temporaryStorageDetail: Maybe<TemporaryStorageDetail>;
  /** Résumé des valeurs clés du bordereau à l'instant T */
  stateSummary: Maybe<StateSummary>;
};

/** Information sur un établissement dans un BSD */
export type FormCompany = {
   __typename?: 'FormCompany';
  /** Nom de l'établissement */
  name: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address: Maybe<Scalars['String']>;
  /** Nom du contact dans l'établissement */
  contact: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact dans l'établissement */
  phone: Maybe<Scalars['String']>;
  /** Email du contact dans l'établissement */
  mail: Maybe<Scalars['String']>;
};

/** Payload de création d'un BSD */
export type FormInput = {
  /** Identifiant opaque */
  id: Maybe<Scalars['ID']>;
  /**
   * Identifiant personnalisé permettant de faire le lien avec un
   * objet un système d'information tierce
   */
  customId: Maybe<Scalars['String']>;
  /** Établissement émetteur/producteur du déchet (case 1) */
  emitter: Maybe<EmitterInput>;
  /** Établissement qui reçoit le déchet (case 2) */
  recipient: Maybe<RecipientInput>;
  /** Transporteur du déchet (case 8) */
  transporter: Maybe<TransporterInput>;
  /** Détails du déchet (case 3) */
  wasteDetails: Maybe<WasteDetailsInput>;
  /** Négociant (case 7) */
  trader: Maybe<TraderInput>;
  /** Annexe 2 */
  appendix2Forms: Maybe<Array<Maybe<AppendixFormInput>>>;
  ecoOrganisme: Maybe<EcoOrganismeInput>;
  temporaryStorageDetail: Maybe<TemporaryStorageDetailInput>;
};

export enum FormRole {
  /** Les BSD's dont je suis transporteur */
  Transporter = 'TRANSPORTER',
  /** Les BSD's dont je suis la destination de traitement */
  Recipient = 'RECIPIENT',
  /** Les BSD's dont je suis l'émetteur */
  Emitter = 'EMITTER',
  /** Les BSD's dont je suis le négociant */
  Trader = 'TRADER',
  /** Les BSD's dont je suis éco-organisme */
  EcoOrganisme = 'ECO_ORGANISME'
}

/** Informations du cycle de vie des bordereaux */
export type FormsLifeCycleData = {
   __typename?: 'formsLifeCycleData';
  /** Liste des changements de statuts */
  statusLogs: Array<StatusLog>;
  /** pagination, indique si d'autres pages existent après */
  hasNextPage: Maybe<Scalars['Boolean']>;
  /** pagination, indique si d'autres pages existent avant */
  hasPreviousPage: Maybe<Scalars['Boolean']>;
  /** Premier id de la page, à passer dans cursorAfter ou cursorBefore de la query formsLifeCycle */
  startCursor: Maybe<Scalars['ID']>;
  /** Dernier ID de la page, à passer dans cursorAfter ou cursorBefore de la query formsLifeCycle */
  endCursor: Maybe<Scalars['ID']>;
  /** Nombre de changements de statuts renvoyés */
  count: Maybe<Scalars['Int']>;
};

/** Type pour l'export du registre */
export enum FormsRegisterExportType {
  /** Déchets entrants */
  Incoming = 'INCOMING',
  /** Déchets sortants */
  Outgoing = 'OUTGOING'
}

/** Différents statuts d'un BSD au cours de son cycle de vie */
export enum FormStatus {
  /**
   * BSD à l'état de brouillon
   * Des champs obligatoires peuvent manquer
   */
  Draft = 'DRAFT',
  /**
   * BSD finalisé
   * Les champs sont validés pour détecter des valeurs manquantes ou erronnées
   */
  Sealed = 'SEALED',
  /** BSD envoyé vers l'établissement de destination */
  Sent = 'SENT',
  /** BSD reçu par l'établissement de destination */
  Received = 'RECEIVED',
  /** BSD dont les déchets ont été traités */
  Processed = 'PROCESSED',
  /** BSD en attente de regroupement */
  AwaitingGroup = 'AWAITING_GROUP',
  /** Regroupement effectué */
  Grouped = 'GROUPED',
  /** Perte de traçabalité */
  NoTraceability = 'NO_TRACEABILITY',
  /** Déchet refusé */
  Refused = 'REFUSED',
  /** Déchet arrivé sur le site d'entreposage ou reconditionnement */
  TempStored = 'TEMP_STORED',
  /** Déchet avec les cadres 14-19 complétées (si besoin), prêt à partir du site d'entreposage ou reconditionnement */
  Resealed = 'RESEALED',
  /** Déchet envoyé du site d'entreposage ou reconditionnement vers sa destination de traitement */
  Resent = 'RESENT'
}

/**
 * DEPRECATED - Privilégier l'utilisation d'un polling régulier sur la query `formsLifeCycle`
 * 
 * Mise à jour d'un BSD
 */
export type FormSubscription = {
   __typename?: 'FormSubscription';
  /** Type de mutation */
  mutation: Maybe<Scalars['String']>;
  /** BSD concerné */
  node: Maybe<Form>;
  /** Liste des champs mis à jour */
  updatedFields: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Ancienne valeurs */
  previousValues: Maybe<Form>;
};

/** Valeur possibles pour le filtre de la query `forms` */
export enum FormType {
  /** DEPRECATED - Uniquement les BSD's dont je suis émetteur ou destinataire (cas par défaut) */
  Actor = 'ACTOR',
  /** Uniquement les BSD's dont je suis transporteur */
  Transporter = 'TRANSPORTER'
}

/** Type d'une déclaration GEREP */
export enum GerepType {
  Producteur = 'Producteur',
  Traiteur = 'Traiteur'
}

/** Installation pour la protection de l'environnement (ICPE) */
export type Installation = {
   __typename?: 'Installation';
  /** Identifiant S3IC */
  codeS3ic: Maybe<Scalars['String']>;
  /** URL de la fiche ICPE sur Géorisques */
  urlFiche: Maybe<Scalars['String']>;
  /** Liste des rubriques associées */
  rubriques: Maybe<Array<Rubrique>>;
  /** Liste des déclarations GEREP */
  declarations: Maybe<Array<Declaration>>;
};


export type Mutation = {
   __typename?: 'Mutation';
  /**
   * USAGE INTERNE
   * Modifie le mot de passe d'un utilisateur
   */
  changePassword: User;
  /**
   * USAGE INTERNE
   * Rattache un établissement à l'utilisateur authentifié
   */
  createCompany: CompanyPrivate;
  /**
   * USAGE INTERNE
   * Crée un récépissé transporteur
   */
  createTraderReceipt: Maybe<TraderReceipt>;
  /**
   * USAGE INTERNE
   * Crée un récépissé transporteur
   */
  createTransporterReceipt: Maybe<TransporterReceipt>;
  /**
   * USAGE INTERNE
   * Récupère une URL signé pour l'upload d'un fichier
   */
  createUploadLink: UploadLink;
  /** Supprime un BSD */
  deleteForm: Maybe<Form>;
  /**
   * USAGE INTERNE
   * Supprime une invitation à un établissement
   */
  deleteInvitation: CompanyPrivate;
  /**
   * USAGE INTERNE
   * Supprime un récépissé négociant
   */
  deleteTraderReceipt: Maybe<TransporterReceipt>;
  /**
   * USAGE INTERNE
   * Supprime un récépissé transporteur
   */
  deleteTransporterReceipt: Maybe<TransporterReceipt>;
  /** Duplique un BSD */
  duplicateForm: Maybe<Form>;
  /**
   * USAGE INTERNE
   * Met à jour les informations de l'utilisateur
   */
  editProfile: User;
  /**
   * USAGE INTERNE
   * Invite un nouvel utilisateur à un établissement
   */
  inviteUserToCompany: CompanyPrivate;
  /**
   * USAGE INTERNE
   * Active le compte d'un utilisateur invité
   */
  joinWithInvite: User;
  /**
   * DEPRECATED - La récupération de token pour le compte de tiers
   * doit s'effectuer avec le protocole OAuth2
   * 
   * Récupére un token à partir de l'email et du mot de passe
   * d'un utilisateur.
   */
  login: AuthPayload;
  /** Valide le traitement d'un BSD */
  markAsProcessed: Maybe<Form>;
  /** Valide la réception d'un BSD */
  markAsReceived: Maybe<Form>;
  /** Valide la complétion des cadres 14 à 19 lors d'un entreposage provisoire ou reconditionnement */
  markAsResealed: Maybe<Form>;
  /** Valide l'envoi du BSD après un entreposage provisoire ou reconditionnement */
  markAsResent: Maybe<Form>;
  /** Scelle un BSD */
  markAsSealed: Maybe<Form>;
  /** Valide l'envoi d'un BSD */
  markAsSent: Maybe<Form>;
  /** Valide la réception d'un BSD d'un entreposage provisoire ou reconditionnement */
  markAsTempStored: Maybe<Form>;
  /**
   * USAGE INTERNE
   * Supprime les droits d'un utilisateurs sur un établissement
   */
  removeUserFromCompany: CompanyPrivate;
  /**
   * USAGE INTERNE
   * Renouvelle le code de sécurité de l'établissement
   */
  renewSecurityCode: CompanyPrivate;
  /**
   * USAGE INTERNE
   * Renvoie l'email d'invitation à un établissement
   */
  resendInvitation: Scalars['Boolean'];
  /**
   * USAGE INTERNE
   * Envoie un email pour la réinitialisation du mot de passe
   */
  resetPassword: Scalars['Boolean'];
  /** Sauvegarde un BSD (création ou modification, si `FormInput` contient un ID) */
  saveForm: Maybe<Form>;
  /** Valide la prise en charge par le transporteur, et peut valider l'envoi */
  signedByTransporter: Maybe<Form>;
  /**
   * USAGE INTERNE
   * Permet de créer un nouvel utilisateur
   */
  signup: User;
  /**
   * USAGE INTERNE
   * Édite les informations d'un établissement
   */
  updateCompany: CompanyPrivate;
  /**
   * USAGE INTERNE
   * Édite les informations d'un récépissé négociant
   */
  updateTraderReceipt: Maybe<TraderReceipt>;
  /** Met à jour la plaque d'immatriculation ou le champ libre du transporteur */
  updateTransporterFields: Maybe<Form>;
  /**
   * USAGE INTERNE
   * Édite les informations d'un récépissé transporteur
   */
  updateTransporterReceipt: Maybe<TransporterReceipt>;
};


export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateCompanyArgs = {
  companyInput: PrivateCompanyInput;
};


export type MutationCreateTraderReceiptArgs = {
  input: Maybe<CreateTraderReceiptInput>;
};


export type MutationCreateTransporterReceiptArgs = {
  input: Maybe<CreateTransporterReceiptInput>;
};


export type MutationCreateUploadLinkArgs = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
};


export type MutationDeleteFormArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteInvitationArgs = {
  email: Scalars['String'];
  siret: Scalars['String'];
};


export type MutationDeleteTraderReceiptArgs = {
  input: Maybe<DeleteTraderReceiptInput>;
};


export type MutationDeleteTransporterReceiptArgs = {
  input: Maybe<DeleteTransporterReceiptInput>;
};


export type MutationDuplicateFormArgs = {
  id: Scalars['ID'];
};


export type MutationEditProfileArgs = {
  name: Maybe<Scalars['String']>;
  phone: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
};


export type MutationInviteUserToCompanyArgs = {
  email: Scalars['String'];
  siret: Scalars['String'];
  role: UserRole;
};


export type MutationJoinWithInviteArgs = {
  inviteHash: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationMarkAsProcessedArgs = {
  id: Maybe<Scalars['ID']>;
  processedInfo: ProcessedFormInput;
};


export type MutationMarkAsReceivedArgs = {
  id: Maybe<Scalars['ID']>;
  receivedInfo: ReceivedFormInput;
};


export type MutationMarkAsResealedArgs = {
  id: Scalars['ID'];
  resealedInfos: ResealedFormInput;
};


export type MutationMarkAsResentArgs = {
  id: Scalars['ID'];
  resentInfos: ResentFormInput;
};


export type MutationMarkAsSealedArgs = {
  id: Maybe<Scalars['ID']>;
};


export type MutationMarkAsSentArgs = {
  id: Maybe<Scalars['ID']>;
  sentInfo: SentFormInput;
};


export type MutationMarkAsTempStoredArgs = {
  id: Scalars['ID'];
  tempStoredInfos: TempStoredFormInput;
};


export type MutationRemoveUserFromCompanyArgs = {
  userId: Scalars['ID'];
  siret: Scalars['String'];
};


export type MutationRenewSecurityCodeArgs = {
  siret: Scalars['String'];
};


export type MutationResendInvitationArgs = {
  email: Scalars['String'];
  siret: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSaveFormArgs = {
  formInput: FormInput;
};


export type MutationSignedByTransporterArgs = {
  id: Scalars['ID'];
  signingInfo: TransporterSignatureFormInput;
};


export type MutationSignupArgs = {
  userInfos: SignupInput;
};


export type MutationUpdateCompanyArgs = {
  siret: Scalars['String'];
  gerepId: Maybe<Scalars['String']>;
  contactEmail: Maybe<Scalars['String']>;
  contactPhone: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
  companyTypes: Maybe<Array<Maybe<CompanyType>>>;
  givenName: Maybe<Scalars['String']>;
  transporterReceiptId: Maybe<Scalars['String']>;
  traderReceiptId: Maybe<Scalars['String']>;
};


export type MutationUpdateTraderReceiptArgs = {
  input: Maybe<UpdateTraderReceiptInput>;
};


export type MutationUpdateTransporterFieldsArgs = {
  id: Scalars['ID'];
  transporterNumberPlate: Maybe<Scalars['String']>;
  transporterCustomInfo: Maybe<Scalars['String']>;
};


export type MutationUpdateTransporterReceiptArgs = {
  input: Maybe<UpdateTransporterReceiptInput>;
};

/** Destination ultérieure prévue (case 12) */
export type NextDestination = {
   __typename?: 'NextDestination';
  /** Traitement prévue (code D/R) */
  processingOperation: Maybe<Scalars['String']>;
  /** Établissement ultérieure */
  company: Maybe<FormCompany>;
};

export type NextDestinationInput = {
  /** Traitement prévue (code D/R) */
  processingOperation: Maybe<Scalars['String']>;
  /** Établissement de destination ultérieur */
  company: Maybe<CompanyInput>;
};

/** Type de packaging du déchet */
export enum Packagings {
  /** Fut */
  Fut = 'FUT',
  /** GRV */
  Grv = 'GRV',
  /** Citerne */
  Citerne = 'CITERNE',
  /** Benne */
  Benne = 'BENNE',
  /** Autre */
  Autre = 'AUTRE'
}

/** Payload permettant le rattachement d'un établissement à un utilisateur */
export type PrivateCompanyInput = {
  /** SIRET de l'établissement */
  siret: Scalars['String'];
  /** Identifiant GEREP de l'établissement */
  gerepId: Maybe<Scalars['String']>;
  /** Profil de l'établissement */
  companyTypes: Maybe<Array<Maybe<CompanyType>>>;
  /** Code NAF */
  codeNaf: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  companyName: Maybe<Scalars['String']>;
  /**
   * Liste de documents permettant de démontrer l'appartenance
   * de l'utilisateur à l'établissement
   */
  documentKeys: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Récipissé transporteur (le cas échéant, pour les profils transporteur) */
  transporterReceiptId: Maybe<Scalars['String']>;
  /** Récipissé négociant (le cas échéant, pour les profils négociant) */
  traderReceiptId: Maybe<Scalars['String']>;
};

/** Payload de traitement d'un BSD */
export type ProcessedFormInput = {
  /** Traitement réalisé (code D/R) */
  processingOperationDone: Scalars['String'];
  /** Description de l'opération de traitement (case 11) */
  processingOperationDescription: Maybe<Scalars['String']>;
  /** Personne en charge du traitement */
  processedBy: Scalars['String'];
  /** Date à laquelle le déchet a été traité */
  processedAt: Scalars['DateTime'];
  /** Destination ultérieure prévue (case 12) */
  nextDestination: Maybe<NextDestinationInput>;
  /** Si oui ou non il y a eu perte de traçabalité */
  noTraceability: Maybe<Scalars['Boolean']>;
};

/** Type de quantité lors de l'émission */
export enum QuantityType {
  /** Quntité réelle */
  Real = 'REAL',
  /** Quantité estimée */
  Estimated = 'ESTIMATED'
}

export type Query = {
   __typename?: 'Query';
  /**
   * USAGE INTERNE > Mon Compte > Générer un token
   * Renvoie un token permettant de s'authentifier à l'API Trackdéchets
   */
  apiKey: Scalars['String'];
  /** Renvoie des BSD candidats à un regroupement dans une annexe 2 */
  appendixForms: Array<Form>;
  /**
   * Renvoie des informations publiques sur un établissement
   * extrait de la base SIRENE et de la base des installations
   * classées pour la protection de l'environnement (ICPE)
   */
  companyInfos: CompanyPublic;
  /**
   * USAGE INTERNE
   * Renvoie la liste des éco-organismes
   */
  ecoOrganismes: Array<EcoOrganisme>;
  /**
   * Renvoie les établissements favoris de l'utilisateur. C'est à dire les
   * établissements qui font souvent partis des BSD édités
   */
  favorites: Array<CompanyFavorite>;
  /** Renvoie un BSD, sélectionné par ID */
  form: Form;
  /**
   * Renvoie un token pour télécharger un pdf de BSD
   * Ce token doit être transmis à la route /download pour obtenir le fichier.
   * Il est valable 10 secondes
   */
  formPdf: FileDownload;
  /**
   * Renvoie les BSDs de l'établissement sélectionné (le premier par défaut)
   * Par défaut, renvoie les BSDs dont on est producteur ou destinataire.
   * On peut également demander les bordereaux pour lesquels on est transporteur
   */
  forms: Array<Form>;
  /**
   * Renvoie les changements de statut des bordereaux de l'entreprise sélectionnée.
   * La liste est paginée par pages de 100 items, ordonnée par date décroissante (champ `loggedAt`)
   * Seuls les changements de statuts disposant d'un champ `loggedAt` non nul sont retournés
   */
  formsLifeCycle: FormsLifeCycleData;
  /**
   * Renvoie un token pour télécharger un csv du regsitre
   * Ce token doit être transmis à la route /download pour obtenir le fichier.
   * Il est valable 10 secondes
   */
  formsRegister: FileDownload;
  /** Renvoie les informations sur l'utilisateur authentifié */
  me: User;
  /**
   * Effectue une recherche floue sur la base SIRENE et enrichit
   * les résultats avec des informations provenant de Trackdéchets
   */
  searchCompanies: Array<CompanySearchResult>;
  /** Renvoie des statistiques sur le volume de déchets entrant et sortant */
  stats: Array<CompanyStat>;
};


export type QueryAppendixFormsArgs = {
  siret: Scalars['String'];
  wasteCode: Maybe<Scalars['String']>;
};


export type QueryCompanyInfosArgs = {
  siret: Scalars['String'];
};


export type QueryFavoritesArgs = {
  type: FavoriteType;
};


export type QueryFormArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryFormPdfArgs = {
  id: Maybe<Scalars['ID']>;
};


export type QueryFormsArgs = {
  siret: Maybe<Scalars['String']>;
  first: Maybe<Scalars['Int']>;
  skip: Maybe<Scalars['Int']>;
  status: Maybe<Array<FormStatus>>;
  roles: Maybe<Array<FormRole>>;
  hasNextStep: Maybe<Scalars['Boolean']>;
  type?: Maybe<FormType>;
};


export type QueryFormsLifeCycleArgs = {
  siret: Maybe<Scalars['String']>;
  loggedBefore: Maybe<Scalars['String']>;
  loggedAfter: Maybe<Scalars['String']>;
  cursorAfter: Maybe<Scalars['String']>;
  cursorBefore: Maybe<Scalars['String']>;
  formId: Maybe<Scalars['ID']>;
};


export type QueryFormsRegisterArgs = {
  sirets: Maybe<Array<Maybe<Scalars['String']>>>;
  exportType: Maybe<FormsRegisterExportType>;
};


export type QuerySearchCompaniesArgs = {
  clue: Scalars['String'];
  department: Maybe<Scalars['String']>;
};

/** Payload de réception d'un BSD */
export type ReceivedFormInput = {
  /** Statut d'acceptation du déchet (case 10) */
  wasteAcceptationStatus: WasteAcceptationStatusInput;
  /** Raison du refus (case 10) */
  wasteRefusalReason: Maybe<Scalars['String']>;
  /** Nom de la personne en charge de la réception du déchet (case 10) */
  receivedBy: Scalars['String'];
  /** Date à laquelle le déchet a été reçu (case 10) */
  receivedAt: Scalars['DateTime'];
  /** Quantité réelle présentée (case 10) */
  quantityReceived: Scalars['Float'];
};

/**
 * Installation de destination ou d'entreprosage
 * ou de reconditionnement prévue (case 2)
 */
export type Recipient = {
   __typename?: 'Recipient';
  /** N° de CAP (le cas échéant) */
  cap: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation: Maybe<Scalars['String']>;
  /** Établissement de destination */
  company: Maybe<FormCompany>;
  /** Indique si c'est un établissement d'entreposage temporaire ou de reocnditionnement */
  isTempStorage: Maybe<Scalars['Boolean']>;
};

/**
 * Payload lié à l'installation de destination ou d'entreprosage
 * ou de reconditionnement prévue (case 2)
 */
export type RecipientInput = {
  /** N° de CAP (le cas échéant) */
  cap: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation: Maybe<Scalars['String']>;
  /** Établissement de destination */
  company: Maybe<CompanyInput>;
  /** Si c'est un entreprosage provisoire ou reconditionnement */
  isTempStorage: Maybe<Scalars['Boolean']>;
};

/** Payload lié au détails du déchet du BSD suite (case 14 à 19) */
export type ResealedFormInput = {
  /** Destination finale du déchet (case 14) */
  destination: Maybe<DestinationInput>;
  /** Détail du déchet en cas de reconditionnement (case 15 à 19) */
  wasteDetails: Maybe<WasteDetailsInput>;
  /** Transporteur du déchet reconditionné */
  transporter: Maybe<TransporterInput>;
};

/** Payload lié au détails du déchet du BSD suite et à la signature de l'envoi (case 14 à 20) */
export type ResentFormInput = {
  /** Destination finale du déchet (case 14) */
  destination: Maybe<DestinationInput>;
  /** Détail du déchet en cas de reconditionnement (case 15 à 19) */
  wasteDetails: Maybe<WasteDetailsInput>;
  /** Transporteur du déchet reconditionné */
  transporter: Maybe<TransporterInput>;
  /** Nom du signataire du BSD suite  (case 19) */
  signedBy: Maybe<Scalars['String']>;
  /** Date de signature du BSD suite (case 19) */
  signedAt: Maybe<Scalars['DateTime']>;
};

/**
 * Rubrique ICPE d'un établissement avec les autorisations associées
 * Pour plus de détails, se référer à la
 * [nomenclature des ICPE](https://www.georisques.gouv.fr/dossiers/installations/nomenclature-ic)
 */
export type Rubrique = {
   __typename?: 'Rubrique';
  /**
   * Numéro de rubrique tel que défini dans la nomenclature des ICPE
   * Ex: 2710
   */
  rubrique: Scalars['String'];
  /** Alinéa pour la rubrique concerné */
  alinea: Maybe<Scalars['String']>;
  /** État de l'activité, ex: 'En fonct', 'À l'arrêt' */
  etatActivite: Maybe<Scalars['String']>;
  /** Régime autorisé pour la rubrique: déclaratif, autorisation, seveso, etc */
  regimeAutorise: Maybe<Scalars['String']>;
  /**
   * Description de l'activité:
   * Ex: traitement thermique de déchets dangereux
   */
  activite: Maybe<Scalars['String']>;
  /** Catégorie d'établissement associé: TTR, VHU, Traitement */
  category: Scalars['String'];
  /** Volume autorisé */
  volume: Maybe<Scalars['String']>;
  /** Unité utilisé pour le volume autorisé */
  unite: Maybe<Scalars['String']>;
  /** Type de déchets autorisé */
  wasteType: Maybe<WasteType>;
};

/** Payload de signature d'un BSD */
export type SentFormInput = {
  /** Date de l'envoi du déchet par l'émetteur (case 9) */
  sentAt: Maybe<Scalars['DateTime']>;
  /** Nom de la personne responsable de l'envoi du déchet (case 9) */
  sentBy: Maybe<Scalars['String']>;
};

export type SignupInput = {
  /** Email de l'utilisateur */
  email: Scalars['String'];
  /** Mot de passe de l'utilisateur */
  password: Scalars['String'];
  /** Nom de l'utilisateur */
  name: Scalars['String'];
  /** Numéro de téléphone de l'utilisateur */
  phone: Maybe<Scalars['String']>;
};

/** Statistiques */
export type Stat = {
   __typename?: 'Stat';
  /** Code déchet */
  wasteCode: Scalars['String'];
  /** Quantité entrante */
  incoming: Scalars['Float'];
  /** Qantité sortante */
  outgoing: Scalars['Float'];
};

/**
 * En fonction du statut du bordereau, différentes informations sont à lire pour connaitre vraiment l'étast du bordereau:
 * - la quantité peut changer entre émission, réception, entreposage provisoire...
 * - le bordereau peut naviguer entre plusieurs entreprises.
 * - quand le bordereau a-t-il été modifié pour la dernière fois ? (création, signature, traitement... ?)
 * - si c'est un bordereau avec conditionnement et qu'on attend un transporteur, quel est-il ?
 * 
 * Cet objet `StateSummary` vise à simplifier ces questions. Il renverra toujours la valeur pour un instant T donné.
 */
export type StateSummary = {
   __typename?: 'StateSummary';
  /** Quantité la plus à jour */
  quantity: Maybe<Scalars['Float']>;
  /** Packaging le plus à jour */
  packagings: Array<Packagings>;
  /** Code ONU le plus à jour */
  onuCode: Maybe<Scalars['String']>;
  /** Prochaine entreprise à transporter le déchet (entreprise en case 8 ou 18) */
  transporter: Maybe<FormCompany>;
  /** Numéro de plaque d'immatriculation */
  transporterNumberPlate: Maybe<Scalars['String']>;
  /** Information libre, destinée aux transporteurs */
  transporterCustomInfo: Maybe<Scalars['String']>;
  /** Prochaine entreprise à recevoir le déchet (entreprise en case 2 ou 14) */
  recipient: Maybe<FormCompany>;
  /** Prochaine entreprise à émettre le déchet (entreprise en case 1 ou 13) */
  emitter: Maybe<FormCompany>;
  /** Date de la dernière action sur le bordereau */
  lastActionOn: Maybe<Scalars['DateTime']>;
};

/** Changement de statut d'un bordereau */
export type StatusLog = {
   __typename?: 'StatusLog';
  /** Identifiant du log */
  id: Maybe<Scalars['ID']>;
  /** Statut du bordereau après le changement de statut */
  status: Maybe<FormStatus>;
  /** Date à laquelle le changement de statut a été effectué */
  loggedAt: Maybe<Scalars['DateTime']>;
  /** Valeur des champs transmis lors du changement de statut (eg. receivedBY, processingOperationDescription) */
  updatedFields: Maybe<Scalars['JSON']>;
  /** BSD concerné */
  form: Maybe<StatusLogForm>;
  /** Utilisateur à l'origine de la modification */
  user: Maybe<StatusLogUser>;
};

/** Information sur un BSD dans les logs de modifications de statuts */
export type StatusLogForm = {
   __typename?: 'StatusLogForm';
  /** Identifiant du BSD */
  id: Maybe<Scalars['ID']>;
  /** N° du bordereau */
  readableId: Maybe<Scalars['String']>;
};

/** Utilisateur ayant modifié le BSD */
export type StatusLogUser = {
   __typename?: 'StatusLogUser';
  id: Maybe<Scalars['ID']>;
  email: Maybe<Scalars['String']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  /**
   * DEPRECATED - Privilégier l'utilisation d'un polling régulier sur la query `formsLifeCycle`
   * 
   * Permet de s'abonner aux changements de statuts d'un BSD
   */
  forms: Maybe<FormSubscription>;
};


export type SubscriptionFormsArgs = {
  token: Scalars['String'];
};

/** Données du BSD suite sur la partie entreposage provisoire ou reconditionnement, rattachées à un BSD existant */
export type TemporaryStorageDetail = {
   __typename?: 'TemporaryStorageDetail';
  /** Établissement qui sotcke temporairement le déchet (case 13) */
  temporaryStorer: Maybe<TemporaryStorer>;
  /**
   * Installation de destination prévue (case 14) à remplir par le producteur ou
   * le site d'entreposage provisoire
   */
  destination: Maybe<Destination>;
  /** Détails du déchet (cases 15, 16 et 17) */
  wasteDetails: Maybe<WasteDetails>;
  /** Transporteur du déchet (case 18) */
  transporter: Maybe<Transporter>;
  /** Nom du signataire du BSD suite  (case 19) */
  signedBy: Maybe<Scalars['String']>;
  /** Date de signature du BSD suite (case 19) */
  signedAt: Maybe<Scalars['DateTime']>;
};

export type TemporaryStorageDetailInput = {
  destination: Maybe<DestinationInput>;
};

export type TemporaryStorer = {
   __typename?: 'TemporaryStorer';
  quantityType: Maybe<QuantityType>;
  quantityReceived: Maybe<Scalars['Float']>;
  wasteAcceptationStatus: Maybe<Scalars['String']>;
  wasteRefusalReason: Maybe<Scalars['String']>;
  receivedAt: Maybe<Scalars['DateTime']>;
  receivedBy: Maybe<Scalars['String']>;
};

export type TempStoredFormInput = {
  /** Statut d'acceptation du déchet (case 10) */
  wasteAcceptationStatus: WasteAcceptationStatusInput;
  /** Raison du refus (case 10) */
  wasteRefusalReason: Maybe<Scalars['String']>;
  /** Nom de la personne en charge de la réception du déchet (case 10) */
  receivedBy: Scalars['String'];
  /** Date à laquelle le déchet a été reçu (case 10) */
  receivedAt: Scalars['DateTime'];
  /** Quantité réelle présentée (case 10) */
  quantityReceived: Scalars['Float'];
  /** Réelle ou estimée */
  quantityType: QuantityType;
};

/** Négociant (case 7) */
export type Trader = {
   __typename?: 'Trader';
  /** Établissement négociant */
  company: Maybe<FormCompany>;
  /** N° de récipissé */
  receipt: Maybe<Scalars['String']>;
  /** Département */
  department: Maybe<Scalars['String']>;
  /** Limite de validité */
  validityLimit: Maybe<Scalars['DateTime']>;
};

/** Payload lié au négociant */
export type TraderInput = {
  /** N° de récipissé */
  receipt: Maybe<Scalars['String']>;
  /** Département */
  department: Maybe<Scalars['String']>;
  /** Limite de validité */
  validityLimit: Maybe<Scalars['DateTime']>;
  /** Établissement négociant */
  company: Maybe<CompanyInput>;
};

/** Récépissé négociant */
export type TraderReceipt = {
   __typename?: 'TraderReceipt';
  id: Scalars['ID'];
  /** Numéro de récépissé négociant */
  receiptNumber: Scalars['String'];
  /** Limite de validatié du récépissé */
  validityLimit: Scalars['DateTime'];
  /** Département ayant enregistré la déclaration */
  department: Scalars['String'];
};

/** Collecteur - transporteur (case 8) */
export type Transporter = {
   __typename?: 'Transporter';
  /** Établissement collecteur - transporteur */
  company: Maybe<FormCompany>;
  /** Exemption de récipissé */
  isExemptedOfReceipt: Maybe<Scalars['Boolean']>;
  /** N° de récipissé */
  receipt: Maybe<Scalars['String']>;
  /** Département */
  department: Maybe<Scalars['String']>;
  /** Limite de validité du récipissé */
  validityLimit: Maybe<Scalars['DateTime']>;
  /** Numéro de plaque d'immatriculation */
  numberPlate: Maybe<Scalars['String']>;
  /** Information libre, destinée aux transporteurs */
  customInfo: Maybe<Scalars['String']>;
};

/** Collecteur - transporteur (case 8) */
export type TransporterInput = {
  /** Exemption de récipissé */
  isExemptedOfReceipt: Maybe<Scalars['Boolean']>;
  /** N° de récipissé */
  receipt: Maybe<Scalars['String']>;
  /** Département */
  department: Maybe<Scalars['String']>;
  /** Limite de validité du récipissé */
  validityLimit: Maybe<Scalars['DateTime']>;
  /** Numéro de plaque d'immatriculation */
  numberPlate: Maybe<Scalars['String']>;
  /** Établissement collecteur - transporteur */
  company: Maybe<CompanyInput>;
};

/** Récépissé transporteur */
export type TransporterReceipt = {
   __typename?: 'TransporterReceipt';
  id: Scalars['ID'];
  /** Numéro de récépissé transporteur */
  receiptNumber: Scalars['String'];
  /** Limite de validatié du récépissé */
  validityLimit: Scalars['DateTime'];
  /** Département ayant enregistré la déclaration */
  department: Scalars['String'];
};

/** Payload de signature d'un BSD par un transporteur */
export type TransporterSignatureFormInput = {
  /** Date de l'envoi du déchet par l'émetteur (case 9) */
  sentAt: Scalars['DateTime'];
  /** Si oui ou non le BSD a été signé par un transporteur */
  signedByTransporter: Scalars['Boolean'];
  /** Code de sécurité permettant d'authentifier l'émetteur */
  securityCode: Maybe<Scalars['Int']>;
  /** Nom de la personne responsable de l'envoi du déchet (case 9) */
  sentBy: Maybe<Scalars['String']>;
  /** Si oui on non le BSD a été signé par l'émetteur */
  signedByProducer: Scalars['Boolean'];
  /** Conditionnement */
  packagings: Array<Maybe<Packagings>>;
  /** Quantité en tonnes */
  quantity: Scalars['Float'];
  /** Code ONU */
  onuCode: Maybe<Scalars['String']>;
};

/** Payload d'édition d'un récépissé transporteur */
export type UpdateTraderReceiptInput = {
  /** The id of the trader receipt to modify */
  id: Scalars['ID'];
  /** Numéro de récépissé transporteur */
  receiptNumber: Maybe<Scalars['String']>;
  /** Limite de validatié du récépissé */
  validityLimit: Maybe<Scalars['DateTime']>;
  /** Département ayant enregistré la déclaration */
  department: Maybe<Scalars['String']>;
};

/** Payload d'édition d'un récépissé transporteur */
export type UpdateTransporterReceiptInput = {
  /** The id of the transporter receipt to modify */
  id: Scalars['ID'];
  /** Numéro de récépissé transporteur */
  receiptNumber: Maybe<Scalars['String']>;
  /** Limite de validatié du récépissé */
  validityLimit: Maybe<Scalars['DateTime']>;
  /** Département ayant enregistré la déclaration */
  department: Maybe<Scalars['String']>;
};

/** Lien d'upload */
export type UploadLink = {
   __typename?: 'UploadLink';
  /** URL signé permettant d'uploader un fichier */
  signedUrl: Maybe<Scalars['String']>;
  /** Clé permettant l'upload du fichier */
  key: Maybe<Scalars['String']>;
};

/** Représente un utilisateur sur la plateforme Trackdéchets */
export type User = {
   __typename?: 'User';
  /** Identifiant opaque */
  id: Scalars['ID'];
  /** Email de l'utiliateur */
  email: Scalars['String'];
  /** Nom de l'utilisateur */
  name: Maybe<Scalars['String']>;
  /** Numéro de téléphone de l'utilisateur */
  phone: Maybe<Scalars['String']>;
  /** Liste des établissements dont l'utilisateur est membre */
  companies: Maybe<Array<CompanyPrivate>>;
};

/**
 * Liste les différents rôles d'un utilisateur au sein
 * d'un établissement.
 * 
 * Les admins peuvent:
 * * consulter/éditer les bordereaux
 * * gérer les utilisateurs de l'établissement
 * * éditer les informations de la fiche entreprise
 * * demander le renouvellement du code de sécurité
 * * Éditer les informations de la fiche entreprise
 * 
 * Les membres peuvent:
 * * consulter/éditer les bordereaux
 * * consulter le reste des informations
 */
export enum UserRole {
  Member = 'MEMBER',
  Admin = 'ADMIN'
}

/** Statut d'acceptation d'un déchet */
export enum WasteAcceptationStatusInput {
  /** Accepté en totalité */
  Accepted = 'ACCEPTED',
  /** Refusé */
  Refused = 'REFUSED',
  /** Refus partiel */
  PartiallyRefused = 'PARTIALLY_REFUSED'
}

/** Détails du déchet (case 3, 4, 5, 6) */
export type WasteDetails = {
   __typename?: 'WasteDetails';
  /** Rubrique déchet au format |_|_| |_|_| |_|_| (*) */
  code: Maybe<Scalars['String']>;
  /** Dénomination usuelle */
  name: Maybe<Scalars['String']>;
  /** Code ONU */
  onuCode: Maybe<Scalars['String']>;
  /** Conditionnement */
  packagings: Array<Packagings>;
  /** Autre packaging (préciser) */
  otherPackaging: Maybe<Scalars['String']>;
  /** Nombre de colis */
  numberOfPackages: Maybe<Scalars['Int']>;
  /** Quantité en tonnes */
  quantity: Maybe<Scalars['Float']>;
  /** Réelle ou estimée */
  quantityType: Maybe<QuantityType>;
  /** Consistance */
  consistence: Maybe<Consistence>;
};

/** Payload lié au détails du déchet (case 3, 4, 5, 6) */
export type WasteDetailsInput = {
  /** Rubrique déchet au format |_|_| |_|_| |_|_| (*) */
  code: Maybe<Scalars['String']>;
  /** Dénomination usuelle */
  name: Maybe<Scalars['String']>;
  /** Code ONU */
  onuCode: Maybe<Scalars['String']>;
  /** Conditionnement */
  packagings: Maybe<Array<Maybe<Packagings>>>;
  /** Autre packaging (préciser) */
  otherPackaging: Maybe<Scalars['String']>;
  /** Nombre de colis */
  numberOfPackages: Maybe<Scalars['Int']>;
  /** Quantité en tonnes */
  quantity: Maybe<Scalars['Float']>;
  /** Réelle ou estimée */
  quantityType: Maybe<QuantityType>;
  /** Consistance */
  consistence: Maybe<Consistence>;
};

/** Type de déchets autorisé pour une rubrique */
export enum WasteType {
  /** Déchet inerte */
  Inerte = 'INERTE',
  /** Déchet non dangereux */
  NotDangerous = 'NOT_DANGEROUS',
  /** Déchet dangereux */
  Dangerous = 'DANGEROUS'
}

/** Informations sur une adresse chantier */
export type WorkSite = {
   __typename?: 'WorkSite';
  name: Maybe<Scalars['String']>;
  address: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  infos: Maybe<Scalars['String']>;
};

/** Payload d'une adresse chantier */
export type WorkSiteInput = {
  name: Maybe<Scalars['String']>;
  address: Maybe<Scalars['String']>;
  city: Maybe<Scalars['String']>;
  postalCode: Maybe<Scalars['String']>;
  infos: Maybe<Scalars['String']>;
};

