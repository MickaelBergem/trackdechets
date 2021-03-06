import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLContext } from '../../types';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  readableId?: Maybe<Scalars['ID']>;
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
  name?: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret?: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address?: Maybe<Scalars['String']>;
  /** Nom du contact */
  contact?: Maybe<Scalars['String']>;
  /** Numéro de téléphone */
  phone?: Maybe<Scalars['String']>;
  /** Email de contact */
  mail?: Maybe<Scalars['String']>;
  /** Récépissé transporteur associé à cet établissement (le cas échéant) */
  transporterReceipt?: Maybe<TransporterReceipt>;
  /** Récépissé négociant associé à cet établissement (le cas échant) */
  traderReceipt?: Maybe<TraderReceipt>;
};

/** Payload d'un établissement */
export type CompanyInput = {
  /** SIRET de l'établissement */
  siret?: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name?: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address?: Maybe<Scalars['String']>;
  /** Nom du contact dans l'établissement */
  contact?: Maybe<Scalars['String']>;
  /** Email du contact dans l'établissement */
  mail?: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact dans l'établissement */
  phone?: Maybe<Scalars['String']>;
};

/** Information sur utilisateur au sein d'un établissement */
export type CompanyMember = {
   __typename?: 'CompanyMember';
  /** Identifiant opaque */
  id: Scalars['ID'];
  /** Email */
  email: Scalars['String'];
  /** Nom de l'utilisateur */
  name?: Maybe<Scalars['String']>;
  /** Rôle de l'utilisateur dans l'établissement (admin ou membre) */
  role?: Maybe<UserRole>;
  /** Si oui ou non l'email de l'utilisateur a été confirmé */
  isActive?: Maybe<Scalars['Boolean']>;
  /** Si oui ou non une une invitation à joindre l'établissement est en attente */
  isPendingInvitation?: Maybe<Scalars['Boolean']>;
  /** Si oui ou non cet utilisateur correspond à l'utilisateur authentifié */
  isMe?: Maybe<Scalars['Boolean']>;
};

/** Information sur un établissement accessible par un utilisateur membre */
export type CompanyPrivate = {
   __typename?: 'CompanyPrivate';
  /** Identifiant opaque */
  id: Scalars['ID'];
  /** Profil de l'établissement */
  companyTypes: Array<CompanyType>;
  /** Identifiant GEREP */
  gerepId?: Maybe<Scalars['String']>;
  /** Code de sécurité permettant de signer les BSD */
  securityCode: Scalars['Int'];
  /** Email de contact (visible sur la fiche entreprise) */
  contactEmail?: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact (visible sur la fiche entreprise) */
  contactPhone?: Maybe<Scalars['String']>;
  /** Site web (visible sur la fiche entreprise) */
  website?: Maybe<Scalars['String']>;
  /** Liste des utilisateurs appartenant à cet établissement */
  users?: Maybe<Array<CompanyMember>>;
  /** Rôle de l'utilisateur authentifié cau sein de cet établissement */
  userRole?: Maybe<UserRole>;
  /**
   * Nom d'usage de l'entreprise qui permet de différencier
   * différents établissements ayant le même nom
   */
  givenName?: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret: Scalars['String'];
  /** Adresse de l'établissement */
  address?: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name?: Maybe<Scalars['String']>;
  /** Code NAF de l'établissement */
  naf?: Maybe<Scalars['String']>;
  /** Libellé NAF de l'établissement */
  libelleNaf?: Maybe<Scalars['String']>;
  /** Longitude de l'établissement (info géographique) */
  longitude?: Maybe<Scalars['Float']>;
  /** Latitude de l'établissement (info géographique) */
  latitude?: Maybe<Scalars['Float']>;
  /**
   * Installation classée pour la protection de l'environnement (ICPE)
   * associé à cet établissement (le cas échéant)
   */
  installation?: Maybe<Installation>;
  /** Récépissé transporteur (le cas échéant, pour les profils transporteur) */
  transporterReceipt?: Maybe<TransporterReceipt>;
  /** Récépissé négociant (le cas échéant, pour les profils transporteur) */
  traderReceipt?: Maybe<TraderReceipt>;
};

/** Information sur un établissement accessible publiquement */
export type CompanyPublic = {
   __typename?: 'CompanyPublic';
  /** Email de contact */
  contactEmail?: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact */
  contactPhone?: Maybe<Scalars['String']>;
  /** Site web */
  website?: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret?: Maybe<Scalars['String']>;
  /** État administratif de l'établissement. A = Actif, F = Fermé */
  etatAdministratif?: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address?: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name?: Maybe<Scalars['String']>;
  /** Code NAF */
  naf?: Maybe<Scalars['String']>;
  /** Libellé NAF */
  libelleNaf?: Maybe<Scalars['String']>;
  /** Longitude de l'établissement (info géographique) */
  longitude?: Maybe<Scalars['Float']>;
  /** Latitude de l'établissement (info géographique) */
  latitude?: Maybe<Scalars['Float']>;
  /**
   * Installation classée pour la protection de l'environnement (ICPE)
   * associé à cet établissement
   */
  installation?: Maybe<Installation>;
  /** Si oui on non cet établissement est inscrit sur la plateforme Trackdéchets */
  isRegistered?: Maybe<Scalars['Boolean']>;
  /** Récépissé transporteur associé à cet établissement (le cas échéant) */
  transporterReceipt?: Maybe<TransporterReceipt>;
  /** Récépissé négociant associé à cet établissement (le cas échant) */
  traderReceipt?: Maybe<TraderReceipt>;
};

/** Information sur un établissement accessible publiquement en recherche */
export type CompanySearchResult = {
   __typename?: 'CompanySearchResult';
  /** SIRET de l'établissement */
  siret?: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address?: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  name?: Maybe<Scalars['String']>;
  /** Profil de l'établissement */
  companyTypes?: Maybe<Array<Maybe<CompanyType>>>;
  /** Code NAF */
  naf?: Maybe<Scalars['String']>;
  /** Libellé NAF */
  libelleNaf?: Maybe<Scalars['String']>;
  /** Longitude de l'établissement (info géographique) */
  longitude?: Maybe<Scalars['Float']>;
  /** Latitude de l'établissement (info géographique) */
  latitude?: Maybe<Scalars['Float']>;
  /**
   * Installation classée pour la protection de l'environnement (ICPE)
   * associé à cet établissement
   */
  installation?: Maybe<Installation>;
  /** Récépissé transporteur associé à cet établissement (le cas échéant) */
  transporterReceipt?: Maybe<TransporterReceipt>;
  /** Récépissé négociant associé à cet établissement (le cas échant) */
  traderReceipt?: Maybe<TraderReceipt>;
};

/** Statistiques d'un établissement */
export type CompanyStat = {
   __typename?: 'CompanyStat';
  /** Établissement */
  company?: Maybe<FormCompany>;
  /** Liste des statistiques */
  stats: Array<Stat>;
};

/** Profil entreprise */
export type CompanyType = 
  /** Producteur de déchet */
  'PRODUCER' |
  /** Installation de Transit, regroupement ou tri de déchets */
  'COLLECTOR' |
  /** Installation de traitement */
  'WASTEPROCESSOR' |
  /** Transporteur */
  'TRANSPORTER' |
  /** Installation d'entreposage, dépollution, démontage, découpage de VHU */
  'WASTE_VEHICLES' |
  /** Installation de collecte de déchets apportés par le producteur initial */
  'WASTE_CENTER' |
  /** Négociant */
  'TRADER';

/** Consistance du déchet */
export type Consistence = 
  /** Solide */
  'SOLID' |
  /** Liquide */
  'LIQUID' |
  /** Gazeux */
  'GASEOUS';

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
  annee?: Maybe<Scalars['String']>;
  /** Code du déchet */
  codeDechet?: Maybe<Scalars['String']>;
  /** Description du déchet */
  libDechet?: Maybe<Scalars['String']>;
  /** Type de déclaration GEREP: producteur ou traiteur */
  gerepType?: Maybe<GerepType>;
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
  cap?: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation?: Maybe<Scalars['String']>;
  /** Établissement de destination */
  company?: Maybe<FormCompany>;
  /** Indique si l'information a été saisie par l'émetteur du bordereau ou l'installation d'entreposage */
  isFilledByEmitter?: Maybe<Scalars['Boolean']>;
};

export type DestinationInput = {
  /** Installation de destination prévue */
  company?: Maybe<CompanyInput>;
  /** N° de CAP prévu (le cas échéant) */
  cap?: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation?: Maybe<Scalars['String']>;
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
  id?: Maybe<Scalars['ID']>;
};

/** Émetteur du BSD (case 1) */
export type Emitter = {
   __typename?: 'Emitter';
  /** Type d'émetteur */
  type?: Maybe<EmitterType>;
  /** Adresse du chantier */
  workSite?: Maybe<WorkSite>;
  /**
   * DEPRECATED - Ancienne adresse chantier
   * @deprecated Migration vers `workSite` obligatoire
   */
  pickupSite?: Maybe<Scalars['String']>;
  /** Établissement émetteur */
  company?: Maybe<FormCompany>;
};

/** Payload lié à un l'émetteur du BSD (case 1) */
export type EmitterInput = {
  /** Type d'émetteur */
  type?: Maybe<EmitterType>;
  /** Adresse du chantier */
  workSite?: Maybe<WorkSiteInput>;
  /** DEPRECATED - Ancienne adresse chantier */
  pickupSite?: Maybe<Scalars['String']>;
  /** Établissement émetteur */
  company?: Maybe<CompanyInput>;
};

/** Types d'émetteur de déchet (choix multiple de la case 1) */
export type EmitterType = 
  /** Producetur de déchet */
  'PRODUCER' |
  /** Autre détenteur */
  'OTHER' |
  /** Collecteur de petites quantités de déchets relevant de la même rubrique */
  'APPENDIX1' |
  /** Personne ayant transformé ou réalisé un traitement dont la provenance des déchets reste identifiable */
  'APPENDIX2';

/** Type d'établissement favoris */
export type FavoriteType = 
  'EMITTER' |
  'TRANSPORTER' |
  'RECIPIENT' |
  'TRADER' |
  'NEXT_DESTINATION' |
  'TEMPORARY_STORAGE_DETAIL' |
  'DESTINATION';

/**
 * URL de téléchargement accompagné d'un token
 * permettant de valider le téléchargement.
 */
export type FileDownload = {
   __typename?: 'FileDownload';
  /** Token ayant une durée de validité de 10s */
  token?: Maybe<Scalars['String']>;
  /** Lien de téléchargement */
  downloadLink?: Maybe<Scalars['String']>;
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
  customId?: Maybe<Scalars['String']>;
  /** Établissement émetteur/producteur du déchet (case 1) */
  emitter?: Maybe<Emitter>;
  /** Établissement qui reçoit le déchet (case 2) */
  recipient?: Maybe<Recipient>;
  /** Transporteur du déchet (case 8) */
  transporter?: Maybe<Transporter>;
  /** Détails du déchet (case 3) */
  wasteDetails?: Maybe<WasteDetails>;
  /** Négociant (case 7) */
  trader?: Maybe<Trader>;
  /** Date de création du BSD */
  createdAt?: Maybe<Scalars['DateTime']>;
  /** Date de la dernière modification du BSD */
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** ID de l'utilisateur ayant crée le BSD */
  ownerId?: Maybe<Scalars['Int']>;
  /** Statut du BSD (brouillon, envoyé, reçu, traité, etc) */
  status: FormStatus;
  /** Si oui ou non le BSD a été signé par un transporteur */
  signedByTransporter?: Maybe<Scalars['Boolean']>;
  /** Date de l'envoi du déchet par l'émetteur (case 9) */
  sentAt?: Maybe<Scalars['DateTime']>;
  /** Nom de la personne responsable de l'envoi du déchet (case 9) */
  sentBy?: Maybe<Scalars['String']>;
  /** Statut d'acceptation du déchet (case 10) */
  wasteAcceptationStatus?: Maybe<Scalars['String']>;
  /** Raison du refus (case 10) */
  wasteRefusalReason?: Maybe<Scalars['String']>;
  /** Nom de la personne en charge de la réception du déchet (case 10) */
  receivedBy?: Maybe<Scalars['String']>;
  /** Date à laquelle le déchet a été reçu (case 10) */
  receivedAt?: Maybe<Scalars['DateTime']>;
  /** Quantité réelle présentée (case 10) */
  quantityReceived?: Maybe<Scalars['Float']>;
  /**
   * Quantité actuellement connue en tonnes.
   * Elle est calculée en fonction des autres champs pour renvoyer la dernière quantité connue.
   * Elle renvoi ainsi soit la quantité envoyée estimée, soit la quantitée recue
   * sur le site d'entreposage, soit la quantitée réelle recue.
   */
  actualQuantity?: Maybe<Scalars['Float']>;
  /** Traitement réalisé (code D/R) */
  processingOperationDone?: Maybe<Scalars['String']>;
  /** Description de l'opération de traitement (case 11) */
  processingOperationDescription?: Maybe<Scalars['String']>;
  /** Personne en charge du traitement */
  processedBy?: Maybe<Scalars['String']>;
  /** Date à laquelle le déchet a été traité */
  processedAt?: Maybe<Scalars['DateTime']>;
  /** Si oui ou non il y a eu perte de traçabalité */
  noTraceability?: Maybe<Scalars['Boolean']>;
  /** Destination ultérieure prévue (case 12) */
  nextDestination?: Maybe<NextDestination>;
  /** Annexe 2 */
  appendix2Forms?: Maybe<Array<Form>>;
  ecoOrganisme?: Maybe<EcoOrganisme>;
  /** BSD suite - détail des champs de la partie entreposage provisoire ou reconditionnement */
  temporaryStorageDetail?: Maybe<TemporaryStorageDetail>;
  /** Résumé des valeurs clés du bordereau à l'instant T */
  stateSummary?: Maybe<StateSummary>;
};

/** Information sur un établissement dans un BSD */
export type FormCompany = {
   __typename?: 'FormCompany';
  /** Nom de l'établissement */
  name?: Maybe<Scalars['String']>;
  /** SIRET de l'établissement */
  siret?: Maybe<Scalars['String']>;
  /** Adresse de l'établissement */
  address?: Maybe<Scalars['String']>;
  /** Nom du contact dans l'établissement */
  contact?: Maybe<Scalars['String']>;
  /** Numéro de téléphone de contact dans l'établissement */
  phone?: Maybe<Scalars['String']>;
  /** Email du contact dans l'établissement */
  mail?: Maybe<Scalars['String']>;
};

/** Payload de création d'un BSD */
export type FormInput = {
  /** Identifiant opaque */
  id?: Maybe<Scalars['ID']>;
  /**
   * Identifiant personnalisé permettant de faire le lien avec un
   * objet un système d'information tierce
   */
  customId?: Maybe<Scalars['String']>;
  /** Établissement émetteur/producteur du déchet (case 1) */
  emitter?: Maybe<EmitterInput>;
  /** Établissement qui reçoit le déchet (case 2) */
  recipient?: Maybe<RecipientInput>;
  /** Transporteur du déchet (case 8) */
  transporter?: Maybe<TransporterInput>;
  /** Détails du déchet (case 3) */
  wasteDetails?: Maybe<WasteDetailsInput>;
  /** Négociant (case 7) */
  trader?: Maybe<TraderInput>;
  /** Annexe 2 */
  appendix2Forms?: Maybe<Array<Maybe<AppendixFormInput>>>;
  ecoOrganisme?: Maybe<EcoOrganismeInput>;
  temporaryStorageDetail?: Maybe<TemporaryStorageDetailInput>;
};

export type FormRole = 
  /** Les BSD's dont je suis transporteur */
  'TRANSPORTER' |
  /** Les BSD's dont je suis la destination de traitement */
  'RECIPIENT' |
  /** Les BSD's dont je suis l'émetteur */
  'EMITTER' |
  /** Les BSD's dont je suis le négociant */
  'TRADER' |
  /** Les BSD's dont je suis éco-organisme */
  'ECO_ORGANISME';

/** Informations du cycle de vie des bordereaux */
export type FormsLifeCycleData = {
   __typename?: 'formsLifeCycleData';
  /** Liste des changements de statuts */
  statusLogs: Array<StatusLog>;
  /** pagination, indique si d'autres pages existent après */
  hasNextPage?: Maybe<Scalars['Boolean']>;
  /** pagination, indique si d'autres pages existent avant */
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  /** Premier id de la page, à passer dans cursorAfter ou cursorBefore de la query formsLifeCycle */
  startCursor?: Maybe<Scalars['ID']>;
  /** Dernier ID de la page, à passer dans cursorAfter ou cursorBefore de la query formsLifeCycle */
  endCursor?: Maybe<Scalars['ID']>;
  /** Nombre de changements de statuts renvoyés */
  count?: Maybe<Scalars['Int']>;
};

/** Type pour l'export du registre */
export type FormsRegisterExportType = 
  /** Déchets entrants */
  'INCOMING' |
  /** Déchets sortants */
  'OUTGOING';

/** Différents statuts d'un BSD au cours de son cycle de vie */
export type FormStatus = 
  /**
   * BSD à l'état de brouillon
   * Des champs obligatoires peuvent manquer
   */
  'DRAFT' |
  /**
   * BSD finalisé
   * Les champs sont validés pour détecter des valeurs manquantes ou erronnées
   */
  'SEALED' |
  /** BSD envoyé vers l'établissement de destination */
  'SENT' |
  /** BSD reçu par l'établissement de destination */
  'RECEIVED' |
  /** BSD dont les déchets ont été traités */
  'PROCESSED' |
  /** BSD en attente de regroupement */
  'AWAITING_GROUP' |
  /** Regroupement effectué */
  'GROUPED' |
  /** Perte de traçabalité */
  'NO_TRACEABILITY' |
  /** Déchet refusé */
  'REFUSED' |
  /** Déchet arrivé sur le site d'entreposage ou reconditionnement */
  'TEMP_STORED' |
  /** Déchet avec les cadres 14-19 complétées (si besoin), prêt à partir du site d'entreposage ou reconditionnement */
  'RESEALED' |
  /** Déchet envoyé du site d'entreposage ou reconditionnement vers sa destination de traitement */
  'RESENT';

/**
 * DEPRECATED - Privilégier l'utilisation d'un polling régulier sur la query `formsLifeCycle`
 * 
 * Mise à jour d'un BSD
 */
export type FormSubscription = {
   __typename?: 'FormSubscription';
  /** Type de mutation */
  mutation?: Maybe<Scalars['String']>;
  /** BSD concerné */
  node?: Maybe<Form>;
  /** Liste des champs mis à jour */
  updatedFields?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Ancienne valeurs */
  previousValues?: Maybe<Form>;
};

/** Valeur possibles pour le filtre de la query `forms` */
export type FormType = 
  /** DEPRECATED - Uniquement les BSD's dont je suis émetteur ou destinataire (cas par défaut) */
  'ACTOR' |
  /** Uniquement les BSD's dont je suis transporteur */
  'TRANSPORTER';

/** Type d'une déclaration GEREP */
export type GerepType = 
  'Producteur' |
  'Traiteur';

/** Installation pour la protection de l'environnement (ICPE) */
export type Installation = {
   __typename?: 'Installation';
  /** Identifiant S3IC */
  codeS3ic?: Maybe<Scalars['String']>;
  /** URL de la fiche ICPE sur Géorisques */
  urlFiche?: Maybe<Scalars['String']>;
  /** Liste des rubriques associées */
  rubriques?: Maybe<Array<Rubrique>>;
  /** Liste des déclarations GEREP */
  declarations?: Maybe<Array<Declaration>>;
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
  createTraderReceipt?: Maybe<TraderReceipt>;
  /**
   * USAGE INTERNE
   * Crée un récépissé transporteur
   */
  createTransporterReceipt?: Maybe<TransporterReceipt>;
  /**
   * USAGE INTERNE
   * Récupère une URL signé pour l'upload d'un fichier
   */
  createUploadLink: UploadLink;
  /** Supprime un BSD */
  deleteForm?: Maybe<Form>;
  /**
   * USAGE INTERNE
   * Supprime une invitation à un établissement
   */
  deleteInvitation: CompanyPrivate;
  /**
   * USAGE INTERNE
   * Supprime un récépissé négociant
   */
  deleteTraderReceipt?: Maybe<TransporterReceipt>;
  /**
   * USAGE INTERNE
   * Supprime un récépissé transporteur
   */
  deleteTransporterReceipt?: Maybe<TransporterReceipt>;
  /** Duplique un BSD */
  duplicateForm?: Maybe<Form>;
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
  markAsProcessed?: Maybe<Form>;
  /** Valide la réception d'un BSD */
  markAsReceived?: Maybe<Form>;
  /** Valide la complétion des cadres 14 à 19 lors d'un entreposage provisoire ou reconditionnement */
  markAsResealed?: Maybe<Form>;
  /** Valide l'envoi du BSD après un entreposage provisoire ou reconditionnement */
  markAsResent?: Maybe<Form>;
  /** Scelle un BSD */
  markAsSealed?: Maybe<Form>;
  /** Valide l'envoi d'un BSD */
  markAsSent?: Maybe<Form>;
  /** Valide la réception d'un BSD d'un entreposage provisoire ou reconditionnement */
  markAsTempStored?: Maybe<Form>;
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
  saveForm?: Maybe<Form>;
  /** Valide la prise en charge par le transporteur, et peut valider l'envoi */
  signedByTransporter?: Maybe<Form>;
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
  updateTraderReceipt?: Maybe<TraderReceipt>;
  /** Met à jour la plaque d'immatriculation ou le champ libre du transporteur */
  updateTransporterFields?: Maybe<Form>;
  /**
   * USAGE INTERNE
   * Édite les informations d'un récépissé transporteur
   */
  updateTransporterReceipt?: Maybe<TransporterReceipt>;
};


export type MutationChangePasswordArgs = {
  oldPassword: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateCompanyArgs = {
  companyInput: PrivateCompanyInput;
};


export type MutationCreateTraderReceiptArgs = {
  input?: Maybe<CreateTraderReceiptInput>;
};


export type MutationCreateTransporterReceiptArgs = {
  input?: Maybe<CreateTransporterReceiptInput>;
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
  input?: Maybe<DeleteTraderReceiptInput>;
};


export type MutationDeleteTransporterReceiptArgs = {
  input?: Maybe<DeleteTransporterReceiptInput>;
};


export type MutationDuplicateFormArgs = {
  id: Scalars['ID'];
};


export type MutationEditProfileArgs = {
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
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
  id?: Maybe<Scalars['ID']>;
  processedInfo: ProcessedFormInput;
};


export type MutationMarkAsReceivedArgs = {
  id?: Maybe<Scalars['ID']>;
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
  id?: Maybe<Scalars['ID']>;
};


export type MutationMarkAsSentArgs = {
  id?: Maybe<Scalars['ID']>;
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
  gerepId?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  contactPhone?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
  companyTypes?: Maybe<Array<Maybe<CompanyType>>>;
  givenName?: Maybe<Scalars['String']>;
  transporterReceiptId?: Maybe<Scalars['String']>;
  traderReceiptId?: Maybe<Scalars['String']>;
};


export type MutationUpdateTraderReceiptArgs = {
  input?: Maybe<UpdateTraderReceiptInput>;
};


export type MutationUpdateTransporterFieldsArgs = {
  id: Scalars['ID'];
  transporterNumberPlate?: Maybe<Scalars['String']>;
  transporterCustomInfo?: Maybe<Scalars['String']>;
};


export type MutationUpdateTransporterReceiptArgs = {
  input?: Maybe<UpdateTransporterReceiptInput>;
};

/** Destination ultérieure prévue (case 12) */
export type NextDestination = {
   __typename?: 'NextDestination';
  /** Traitement prévue (code D/R) */
  processingOperation?: Maybe<Scalars['String']>;
  /** Établissement ultérieure */
  company?: Maybe<FormCompany>;
};

export type NextDestinationInput = {
  /** Traitement prévue (code D/R) */
  processingOperation?: Maybe<Scalars['String']>;
  /** Établissement de destination ultérieur */
  company?: Maybe<CompanyInput>;
};

/** Type de packaging du déchet */
export type Packagings = 
  /** Fut */
  'FUT' |
  /** GRV */
  'GRV' |
  /** Citerne */
  'CITERNE' |
  /** Benne */
  'BENNE' |
  /** Autre */
  'AUTRE';

/** Payload permettant le rattachement d'un établissement à un utilisateur */
export type PrivateCompanyInput = {
  /** SIRET de l'établissement */
  siret: Scalars['String'];
  /** Identifiant GEREP de l'établissement */
  gerepId?: Maybe<Scalars['String']>;
  /** Profil de l'établissement */
  companyTypes?: Maybe<Array<Maybe<CompanyType>>>;
  /** Code NAF */
  codeNaf?: Maybe<Scalars['String']>;
  /** Nom de l'établissement */
  companyName?: Maybe<Scalars['String']>;
  /**
   * Liste de documents permettant de démontrer l'appartenance
   * de l'utilisateur à l'établissement
   */
  documentKeys?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Récipissé transporteur (le cas échéant, pour les profils transporteur) */
  transporterReceiptId?: Maybe<Scalars['String']>;
  /** Récipissé négociant (le cas échéant, pour les profils négociant) */
  traderReceiptId?: Maybe<Scalars['String']>;
};

/** Payload de traitement d'un BSD */
export type ProcessedFormInput = {
  /** Traitement réalisé (code D/R) */
  processingOperationDone: Scalars['String'];
  /** Description de l'opération de traitement (case 11) */
  processingOperationDescription?: Maybe<Scalars['String']>;
  /** Personne en charge du traitement */
  processedBy: Scalars['String'];
  /** Date à laquelle le déchet a été traité */
  processedAt: Scalars['DateTime'];
  /** Destination ultérieure prévue (case 12) */
  nextDestination?: Maybe<NextDestinationInput>;
  /** Si oui ou non il y a eu perte de traçabalité */
  noTraceability?: Maybe<Scalars['Boolean']>;
};

/** Type de quantité lors de l'émission */
export type QuantityType = 
  /** Quntité réelle */
  'REAL' |
  /** Quantité estimée */
  'ESTIMATED';

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
  wasteCode?: Maybe<Scalars['String']>;
};


export type QueryCompanyInfosArgs = {
  siret: Scalars['String'];
};


export type QueryFavoritesArgs = {
  type: FavoriteType;
};


export type QueryFormArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryFormPdfArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryFormsArgs = {
  siret?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  status?: Maybe<Array<FormStatus>>;
  roles?: Maybe<Array<FormRole>>;
  hasNextStep?: Maybe<Scalars['Boolean']>;
  type?: Maybe<FormType>;
};


export type QueryFormsLifeCycleArgs = {
  siret?: Maybe<Scalars['String']>;
  loggedBefore?: Maybe<Scalars['String']>;
  loggedAfter?: Maybe<Scalars['String']>;
  cursorAfter?: Maybe<Scalars['String']>;
  cursorBefore?: Maybe<Scalars['String']>;
  formId?: Maybe<Scalars['ID']>;
};


export type QueryFormsRegisterArgs = {
  sirets?: Maybe<Array<Maybe<Scalars['String']>>>;
  exportType?: Maybe<FormsRegisterExportType>;
};


export type QuerySearchCompaniesArgs = {
  clue: Scalars['String'];
  department?: Maybe<Scalars['String']>;
};

/** Payload de réception d'un BSD */
export type ReceivedFormInput = {
  /** Statut d'acceptation du déchet (case 10) */
  wasteAcceptationStatus: WasteAcceptationStatusInput;
  /** Raison du refus (case 10) */
  wasteRefusalReason?: Maybe<Scalars['String']>;
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
  cap?: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation?: Maybe<Scalars['String']>;
  /** Établissement de destination */
  company?: Maybe<FormCompany>;
  /** Indique si c'est un établissement d'entreposage temporaire ou de reocnditionnement */
  isTempStorage?: Maybe<Scalars['Boolean']>;
};

/**
 * Payload lié à l'installation de destination ou d'entreprosage
 * ou de reconditionnement prévue (case 2)
 */
export type RecipientInput = {
  /** N° de CAP (le cas échéant) */
  cap?: Maybe<Scalars['String']>;
  /** Opération d'élimination / valorisation prévue (code D/R) */
  processingOperation?: Maybe<Scalars['String']>;
  /** Établissement de destination */
  company?: Maybe<CompanyInput>;
  /** Si c'est un entreprosage provisoire ou reconditionnement */
  isTempStorage?: Maybe<Scalars['Boolean']>;
};

/** Payload lié au détails du déchet du BSD suite (case 14 à 19) */
export type ResealedFormInput = {
  /** Destination finale du déchet (case 14) */
  destination?: Maybe<DestinationInput>;
  /** Détail du déchet en cas de reconditionnement (case 15 à 19) */
  wasteDetails?: Maybe<WasteDetailsInput>;
  /** Transporteur du déchet reconditionné */
  transporter?: Maybe<TransporterInput>;
};

/** Payload lié au détails du déchet du BSD suite et à la signature de l'envoi (case 14 à 20) */
export type ResentFormInput = {
  /** Destination finale du déchet (case 14) */
  destination?: Maybe<DestinationInput>;
  /** Détail du déchet en cas de reconditionnement (case 15 à 19) */
  wasteDetails?: Maybe<WasteDetailsInput>;
  /** Transporteur du déchet reconditionné */
  transporter?: Maybe<TransporterInput>;
  /** Nom du signataire du BSD suite  (case 19) */
  signedBy?: Maybe<Scalars['String']>;
  /** Date de signature du BSD suite (case 19) */
  signedAt?: Maybe<Scalars['DateTime']>;
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
  alinea?: Maybe<Scalars['String']>;
  /** État de l'activité, ex: 'En fonct', 'À l'arrêt' */
  etatActivite?: Maybe<Scalars['String']>;
  /** Régime autorisé pour la rubrique: déclaratif, autorisation, seveso, etc */
  regimeAutorise?: Maybe<Scalars['String']>;
  /**
   * Description de l'activité:
   * Ex: traitement thermique de déchets dangereux
   */
  activite?: Maybe<Scalars['String']>;
  /** Catégorie d'établissement associé: TTR, VHU, Traitement */
  category: Scalars['String'];
  /** Volume autorisé */
  volume?: Maybe<Scalars['String']>;
  /** Unité utilisé pour le volume autorisé */
  unite?: Maybe<Scalars['String']>;
  /** Type de déchets autorisé */
  wasteType?: Maybe<WasteType>;
};

/** Payload de signature d'un BSD */
export type SentFormInput = {
  /** Date de l'envoi du déchet par l'émetteur (case 9) */
  sentAt?: Maybe<Scalars['DateTime']>;
  /** Nom de la personne responsable de l'envoi du déchet (case 9) */
  sentBy?: Maybe<Scalars['String']>;
};

export type SignupInput = {
  /** Email de l'utilisateur */
  email: Scalars['String'];
  /** Mot de passe de l'utilisateur */
  password: Scalars['String'];
  /** Nom de l'utilisateur */
  name: Scalars['String'];
  /** Numéro de téléphone de l'utilisateur */
  phone?: Maybe<Scalars['String']>;
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
  quantity?: Maybe<Scalars['Float']>;
  /** Packaging le plus à jour */
  packagings: Array<Packagings>;
  /** Code ONU le plus à jour */
  onuCode?: Maybe<Scalars['String']>;
  /** Prochaine entreprise à transporter le déchet (entreprise en case 8 ou 18) */
  transporter?: Maybe<FormCompany>;
  /** Numéro de plaque d'immatriculation */
  transporterNumberPlate?: Maybe<Scalars['String']>;
  /** Information libre, destinée aux transporteurs */
  transporterCustomInfo?: Maybe<Scalars['String']>;
  /** Prochaine entreprise à recevoir le déchet (entreprise en case 2 ou 14) */
  recipient?: Maybe<FormCompany>;
  /** Prochaine entreprise à émettre le déchet (entreprise en case 1 ou 13) */
  emitter?: Maybe<FormCompany>;
  /** Date de la dernière action sur le bordereau */
  lastActionOn?: Maybe<Scalars['DateTime']>;
};

/** Changement de statut d'un bordereau */
export type StatusLog = {
   __typename?: 'StatusLog';
  /** Identifiant du log */
  id?: Maybe<Scalars['ID']>;
  /** Statut du bordereau après le changement de statut */
  status?: Maybe<FormStatus>;
  /** Date à laquelle le changement de statut a été effectué */
  loggedAt?: Maybe<Scalars['DateTime']>;
  /** Valeur des champs transmis lors du changement de statut (eg. receivedBY, processingOperationDescription) */
  updatedFields?: Maybe<Scalars['JSON']>;
  /** BSD concerné */
  form?: Maybe<StatusLogForm>;
  /** Utilisateur à l'origine de la modification */
  user?: Maybe<StatusLogUser>;
};

/** Information sur un BSD dans les logs de modifications de statuts */
export type StatusLogForm = {
   __typename?: 'StatusLogForm';
  /** Identifiant du BSD */
  id?: Maybe<Scalars['ID']>;
  /** N° du bordereau */
  readableId?: Maybe<Scalars['String']>;
};

/** Utilisateur ayant modifié le BSD */
export type StatusLogUser = {
   __typename?: 'StatusLogUser';
  id?: Maybe<Scalars['ID']>;
  email?: Maybe<Scalars['String']>;
};

export type Subscription = {
   __typename?: 'Subscription';
  /**
   * DEPRECATED - Privilégier l'utilisation d'un polling régulier sur la query `formsLifeCycle`
   * 
   * Permet de s'abonner aux changements de statuts d'un BSD
   */
  forms?: Maybe<FormSubscription>;
};


export type SubscriptionFormsArgs = {
  token: Scalars['String'];
};

/** Données du BSD suite sur la partie entreposage provisoire ou reconditionnement, rattachées à un BSD existant */
export type TemporaryStorageDetail = {
   __typename?: 'TemporaryStorageDetail';
  /** Établissement qui sotcke temporairement le déchet (case 13) */
  temporaryStorer?: Maybe<TemporaryStorer>;
  /**
   * Installation de destination prévue (case 14) à remplir par le producteur ou
   * le site d'entreposage provisoire
   */
  destination?: Maybe<Destination>;
  /** Détails du déchet (cases 15, 16 et 17) */
  wasteDetails?: Maybe<WasteDetails>;
  /** Transporteur du déchet (case 18) */
  transporter?: Maybe<Transporter>;
  /** Nom du signataire du BSD suite  (case 19) */
  signedBy?: Maybe<Scalars['String']>;
  /** Date de signature du BSD suite (case 19) */
  signedAt?: Maybe<Scalars['DateTime']>;
};

export type TemporaryStorageDetailInput = {
  destination?: Maybe<DestinationInput>;
};

export type TemporaryStorer = {
   __typename?: 'TemporaryStorer';
  quantityType?: Maybe<QuantityType>;
  quantityReceived?: Maybe<Scalars['Float']>;
  wasteAcceptationStatus?: Maybe<Scalars['String']>;
  wasteRefusalReason?: Maybe<Scalars['String']>;
  receivedAt?: Maybe<Scalars['DateTime']>;
  receivedBy?: Maybe<Scalars['String']>;
};

export type TempStoredFormInput = {
  /** Statut d'acceptation du déchet (case 10) */
  wasteAcceptationStatus: WasteAcceptationStatusInput;
  /** Raison du refus (case 10) */
  wasteRefusalReason?: Maybe<Scalars['String']>;
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
  company?: Maybe<FormCompany>;
  /** N° de récipissé */
  receipt?: Maybe<Scalars['String']>;
  /** Département */
  department?: Maybe<Scalars['String']>;
  /** Limite de validité */
  validityLimit?: Maybe<Scalars['DateTime']>;
};

/** Payload lié au négociant */
export type TraderInput = {
  /** N° de récipissé */
  receipt?: Maybe<Scalars['String']>;
  /** Département */
  department?: Maybe<Scalars['String']>;
  /** Limite de validité */
  validityLimit?: Maybe<Scalars['DateTime']>;
  /** Établissement négociant */
  company?: Maybe<CompanyInput>;
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
  company?: Maybe<FormCompany>;
  /** Exemption de récipissé */
  isExemptedOfReceipt?: Maybe<Scalars['Boolean']>;
  /** N° de récipissé */
  receipt?: Maybe<Scalars['String']>;
  /** Département */
  department?: Maybe<Scalars['String']>;
  /** Limite de validité du récipissé */
  validityLimit?: Maybe<Scalars['DateTime']>;
  /** Numéro de plaque d'immatriculation */
  numberPlate?: Maybe<Scalars['String']>;
  /** Information libre, destinée aux transporteurs */
  customInfo?: Maybe<Scalars['String']>;
};

/** Collecteur - transporteur (case 8) */
export type TransporterInput = {
  /** Exemption de récipissé */
  isExemptedOfReceipt?: Maybe<Scalars['Boolean']>;
  /** N° de récipissé */
  receipt?: Maybe<Scalars['String']>;
  /** Département */
  department?: Maybe<Scalars['String']>;
  /** Limite de validité du récipissé */
  validityLimit?: Maybe<Scalars['DateTime']>;
  /** Numéro de plaque d'immatriculation */
  numberPlate?: Maybe<Scalars['String']>;
  /** Établissement collecteur - transporteur */
  company?: Maybe<CompanyInput>;
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
  securityCode?: Maybe<Scalars['Int']>;
  /** Nom de la personne responsable de l'envoi du déchet (case 9) */
  sentBy?: Maybe<Scalars['String']>;
  /** Si oui on non le BSD a été signé par l'émetteur */
  signedByProducer: Scalars['Boolean'];
  /** Conditionnement */
  packagings: Array<Maybe<Packagings>>;
  /** Quantité en tonnes */
  quantity: Scalars['Float'];
  /** Code ONU */
  onuCode?: Maybe<Scalars['String']>;
};

/** Payload d'édition d'un récépissé transporteur */
export type UpdateTraderReceiptInput = {
  /** The id of the trader receipt to modify */
  id: Scalars['ID'];
  /** Numéro de récépissé transporteur */
  receiptNumber?: Maybe<Scalars['String']>;
  /** Limite de validatié du récépissé */
  validityLimit?: Maybe<Scalars['DateTime']>;
  /** Département ayant enregistré la déclaration */
  department?: Maybe<Scalars['String']>;
};

/** Payload d'édition d'un récépissé transporteur */
export type UpdateTransporterReceiptInput = {
  /** The id of the transporter receipt to modify */
  id: Scalars['ID'];
  /** Numéro de récépissé transporteur */
  receiptNumber?: Maybe<Scalars['String']>;
  /** Limite de validatié du récépissé */
  validityLimit?: Maybe<Scalars['DateTime']>;
  /** Département ayant enregistré la déclaration */
  department?: Maybe<Scalars['String']>;
};

/** Lien d'upload */
export type UploadLink = {
   __typename?: 'UploadLink';
  /** URL signé permettant d'uploader un fichier */
  signedUrl?: Maybe<Scalars['String']>;
  /** Clé permettant l'upload du fichier */
  key?: Maybe<Scalars['String']>;
};

/** Représente un utilisateur sur la plateforme Trackdéchets */
export type User = {
   __typename?: 'User';
  /** Identifiant opaque */
  id: Scalars['ID'];
  /** Email de l'utiliateur */
  email: Scalars['String'];
  /** Nom de l'utilisateur */
  name?: Maybe<Scalars['String']>;
  /** Numéro de téléphone de l'utilisateur */
  phone?: Maybe<Scalars['String']>;
  /** Liste des établissements dont l'utilisateur est membre */
  companies?: Maybe<Array<CompanyPrivate>>;
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
export type UserRole = 
  'MEMBER' |
  'ADMIN';

/** Statut d'acceptation d'un déchet */
export type WasteAcceptationStatusInput = 
  /** Accepté en totalité */
  'ACCEPTED' |
  /** Refusé */
  'REFUSED' |
  /** Refus partiel */
  'PARTIALLY_REFUSED';

/** Détails du déchet (case 3, 4, 5, 6) */
export type WasteDetails = {
   __typename?: 'WasteDetails';
  /** Rubrique déchet au format |_|_| |_|_| |_|_| (*) */
  code?: Maybe<Scalars['String']>;
  /** Dénomination usuelle */
  name?: Maybe<Scalars['String']>;
  /** Code ONU */
  onuCode?: Maybe<Scalars['String']>;
  /** Conditionnement */
  packagings: Array<Packagings>;
  /** Autre packaging (préciser) */
  otherPackaging?: Maybe<Scalars['String']>;
  /** Nombre de colis */
  numberOfPackages?: Maybe<Scalars['Int']>;
  /** Quantité en tonnes */
  quantity?: Maybe<Scalars['Float']>;
  /** Réelle ou estimée */
  quantityType?: Maybe<QuantityType>;
  /** Consistance */
  consistence?: Maybe<Consistence>;
};

/** Payload lié au détails du déchet (case 3, 4, 5, 6) */
export type WasteDetailsInput = {
  /** Rubrique déchet au format |_|_| |_|_| |_|_| (*) */
  code?: Maybe<Scalars['String']>;
  /** Dénomination usuelle */
  name?: Maybe<Scalars['String']>;
  /** Code ONU */
  onuCode?: Maybe<Scalars['String']>;
  /** Conditionnement */
  packagings?: Maybe<Array<Maybe<Packagings>>>;
  /** Autre packaging (préciser) */
  otherPackaging?: Maybe<Scalars['String']>;
  /** Nombre de colis */
  numberOfPackages?: Maybe<Scalars['Int']>;
  /** Quantité en tonnes */
  quantity?: Maybe<Scalars['Float']>;
  /** Réelle ou estimée */
  quantityType?: Maybe<QuantityType>;
  /** Consistance */
  consistence?: Maybe<Consistence>;
};

/** Type de déchets autorisé pour une rubrique */
export type WasteType = 
  /** Déchet inerte */
  'INERTE' |
  /** Déchet non dangereux */
  'NOT_DANGEROUS' |
  /** Déchet dangereux */
  'DANGEROUS';

/** Informations sur une adresse chantier */
export type WorkSite = {
   __typename?: 'WorkSite';
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  infos?: Maybe<Scalars['String']>;
};

/** Payload d'une adresse chantier */
export type WorkSiteInput = {
  name?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  infos?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Form: ResolverTypeWrapper<Form>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Emitter: ResolverTypeWrapper<Emitter>;
  EmitterType: EmitterType;
  WorkSite: ResolverTypeWrapper<WorkSite>;
  FormCompany: ResolverTypeWrapper<FormCompany>;
  Recipient: ResolverTypeWrapper<Recipient>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Transporter: ResolverTypeWrapper<Transporter>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  WasteDetails: ResolverTypeWrapper<WasteDetails>;
  Packagings: Packagings;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  QuantityType: QuantityType;
  Consistence: Consistence;
  Trader: ResolverTypeWrapper<Trader>;
  FormStatus: FormStatus;
  NextDestination: ResolverTypeWrapper<NextDestination>;
  EcoOrganisme: ResolverTypeWrapper<EcoOrganisme>;
  TemporaryStorageDetail: ResolverTypeWrapper<TemporaryStorageDetail>;
  TemporaryStorer: ResolverTypeWrapper<TemporaryStorer>;
  Destination: ResolverTypeWrapper<Destination>;
  StateSummary: ResolverTypeWrapper<StateSummary>;
  CompanyPublic: ResolverTypeWrapper<CompanyPublic>;
  Installation: ResolverTypeWrapper<Installation>;
  Rubrique: ResolverTypeWrapper<Rubrique>;
  WasteType: WasteType;
  Declaration: ResolverTypeWrapper<Declaration>;
  GerepType: GerepType;
  TransporterReceipt: ResolverTypeWrapper<TransporterReceipt>;
  TraderReceipt: ResolverTypeWrapper<TraderReceipt>;
  FavoriteType: FavoriteType;
  CompanyFavorite: ResolverTypeWrapper<CompanyFavorite>;
  FileDownload: ResolverTypeWrapper<FileDownload>;
  FormRole: FormRole;
  FormType: FormType;
  formsLifeCycleData: ResolverTypeWrapper<FormsLifeCycleData>;
  StatusLog: ResolverTypeWrapper<StatusLog>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  StatusLogForm: ResolverTypeWrapper<StatusLogForm>;
  StatusLogUser: ResolverTypeWrapper<StatusLogUser>;
  FormsRegisterExportType: FormsRegisterExportType;
  User: ResolverTypeWrapper<User>;
  CompanyPrivate: ResolverTypeWrapper<CompanyPrivate>;
  CompanyType: CompanyType;
  CompanyMember: ResolverTypeWrapper<CompanyMember>;
  UserRole: UserRole;
  CompanySearchResult: ResolverTypeWrapper<CompanySearchResult>;
  CompanyStat: ResolverTypeWrapper<CompanyStat>;
  Stat: ResolverTypeWrapper<Stat>;
  Mutation: ResolverTypeWrapper<{}>;
  PrivateCompanyInput: PrivateCompanyInput;
  CreateTraderReceiptInput: CreateTraderReceiptInput;
  CreateTransporterReceiptInput: CreateTransporterReceiptInput;
  UploadLink: ResolverTypeWrapper<UploadLink>;
  DeleteTraderReceiptInput: DeleteTraderReceiptInput;
  DeleteTransporterReceiptInput: DeleteTransporterReceiptInput;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  ProcessedFormInput: ProcessedFormInput;
  NextDestinationInput: NextDestinationInput;
  CompanyInput: CompanyInput;
  ReceivedFormInput: ReceivedFormInput;
  WasteAcceptationStatusInput: WasteAcceptationStatusInput;
  ResealedFormInput: ResealedFormInput;
  DestinationInput: DestinationInput;
  WasteDetailsInput: WasteDetailsInput;
  TransporterInput: TransporterInput;
  ResentFormInput: ResentFormInput;
  SentFormInput: SentFormInput;
  TempStoredFormInput: TempStoredFormInput;
  FormInput: FormInput;
  EmitterInput: EmitterInput;
  WorkSiteInput: WorkSiteInput;
  RecipientInput: RecipientInput;
  TraderInput: TraderInput;
  AppendixFormInput: AppendixFormInput;
  EcoOrganismeInput: EcoOrganismeInput;
  TemporaryStorageDetailInput: TemporaryStorageDetailInput;
  TransporterSignatureFormInput: TransporterSignatureFormInput;
  SignupInput: SignupInput;
  UpdateTraderReceiptInput: UpdateTraderReceiptInput;
  UpdateTransporterReceiptInput: UpdateTransporterReceiptInput;
  Subscription: ResolverTypeWrapper<{}>;
  FormSubscription: ResolverTypeWrapper<FormSubscription>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars['String'];
  Form: Form;
  ID: Scalars['ID'];
  Emitter: Emitter;
  EmitterType: EmitterType;
  WorkSite: WorkSite;
  FormCompany: FormCompany;
  Recipient: Recipient;
  Boolean: Scalars['Boolean'];
  Transporter: Transporter;
  DateTime: Scalars['DateTime'];
  WasteDetails: WasteDetails;
  Packagings: Packagings;
  Int: Scalars['Int'];
  Float: Scalars['Float'];
  QuantityType: QuantityType;
  Consistence: Consistence;
  Trader: Trader;
  FormStatus: FormStatus;
  NextDestination: NextDestination;
  EcoOrganisme: EcoOrganisme;
  TemporaryStorageDetail: TemporaryStorageDetail;
  TemporaryStorer: TemporaryStorer;
  Destination: Destination;
  StateSummary: StateSummary;
  CompanyPublic: CompanyPublic;
  Installation: Installation;
  Rubrique: Rubrique;
  WasteType: WasteType;
  Declaration: Declaration;
  GerepType: GerepType;
  TransporterReceipt: TransporterReceipt;
  TraderReceipt: TraderReceipt;
  FavoriteType: FavoriteType;
  CompanyFavorite: CompanyFavorite;
  FileDownload: FileDownload;
  FormRole: FormRole;
  FormType: FormType;
  formsLifeCycleData: FormsLifeCycleData;
  StatusLog: StatusLog;
  JSON: Scalars['JSON'];
  StatusLogForm: StatusLogForm;
  StatusLogUser: StatusLogUser;
  FormsRegisterExportType: FormsRegisterExportType;
  User: User;
  CompanyPrivate: CompanyPrivate;
  CompanyType: CompanyType;
  CompanyMember: CompanyMember;
  UserRole: UserRole;
  CompanySearchResult: CompanySearchResult;
  CompanyStat: CompanyStat;
  Stat: Stat;
  Mutation: {};
  PrivateCompanyInput: PrivateCompanyInput;
  CreateTraderReceiptInput: CreateTraderReceiptInput;
  CreateTransporterReceiptInput: CreateTransporterReceiptInput;
  UploadLink: UploadLink;
  DeleteTraderReceiptInput: DeleteTraderReceiptInput;
  DeleteTransporterReceiptInput: DeleteTransporterReceiptInput;
  AuthPayload: AuthPayload;
  ProcessedFormInput: ProcessedFormInput;
  NextDestinationInput: NextDestinationInput;
  CompanyInput: CompanyInput;
  ReceivedFormInput: ReceivedFormInput;
  WasteAcceptationStatusInput: WasteAcceptationStatusInput;
  ResealedFormInput: ResealedFormInput;
  DestinationInput: DestinationInput;
  WasteDetailsInput: WasteDetailsInput;
  TransporterInput: TransporterInput;
  ResentFormInput: ResentFormInput;
  SentFormInput: SentFormInput;
  TempStoredFormInput: TempStoredFormInput;
  FormInput: FormInput;
  EmitterInput: EmitterInput;
  WorkSiteInput: WorkSiteInput;
  RecipientInput: RecipientInput;
  TraderInput: TraderInput;
  AppendixFormInput: AppendixFormInput;
  EcoOrganismeInput: EcoOrganismeInput;
  TemporaryStorageDetailInput: TemporaryStorageDetailInput;
  TransporterSignatureFormInput: TransporterSignatureFormInput;
  SignupInput: SignupInput;
  UpdateTraderReceiptInput: UpdateTraderReceiptInput;
  UpdateTransporterReceiptInput: UpdateTransporterReceiptInput;
  Subscription: {};
  FormSubscription: FormSubscription;
};

export type AuthPayloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CompanyFavoriteResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CompanyFavorite'] = ResolversParentTypes['CompanyFavorite']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transporterReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType>;
  traderReceipt?: Resolver<Maybe<ResolversTypes['TraderReceipt']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CompanyMemberResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CompanyMember'] = ResolversParentTypes['CompanyMember']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isPendingInvitation?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  isMe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CompanyPrivateResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CompanyPrivate'] = ResolversParentTypes['CompanyPrivate']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  companyTypes?: Resolver<Array<ResolversTypes['CompanyType']>, ParentType, ContextType>;
  gerepId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  securityCode?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contactEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['CompanyMember']>>, ParentType, ContextType>;
  userRole?: Resolver<Maybe<ResolversTypes['UserRole']>, ParentType, ContextType>;
  givenName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  naf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelleNaf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation?: Resolver<Maybe<ResolversTypes['Installation']>, ParentType, ContextType>;
  transporterReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType>;
  traderReceipt?: Resolver<Maybe<ResolversTypes['TraderReceipt']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CompanyPublicResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CompanyPublic'] = ResolversParentTypes['CompanyPublic']> = {
  contactEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contactPhone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  etatAdministratif?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  naf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelleNaf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation?: Resolver<Maybe<ResolversTypes['Installation']>, ParentType, ContextType>;
  isRegistered?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  transporterReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType>;
  traderReceipt?: Resolver<Maybe<ResolversTypes['TraderReceipt']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CompanySearchResultResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CompanySearchResult'] = ResolversParentTypes['CompanySearchResult']> = {
  siret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companyTypes?: Resolver<Maybe<Array<Maybe<ResolversTypes['CompanyType']>>>, ParentType, ContextType>;
  naf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libelleNaf?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  installation?: Resolver<Maybe<ResolversTypes['Installation']>, ParentType, ContextType>;
  transporterReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType>;
  traderReceipt?: Resolver<Maybe<ResolversTypes['TraderReceipt']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type CompanyStatResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['CompanyStat'] = ResolversParentTypes['CompanyStat']> = {
  company?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  stats?: Resolver<Array<ResolversTypes['Stat']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DeclarationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Declaration'] = ResolversParentTypes['Declaration']> = {
  annee?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  codeDechet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  libDechet?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gerepType?: Resolver<Maybe<ResolversTypes['GerepType']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type DestinationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Destination'] = ResolversParentTypes['Destination']> = {
  cap?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processingOperation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  isFilledByEmitter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type EcoOrganismeResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['EcoOrganisme'] = ResolversParentTypes['EcoOrganisme']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  siret?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type EmitterResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Emitter'] = ResolversParentTypes['Emitter']> = {
  type?: Resolver<Maybe<ResolversTypes['EmitterType']>, ParentType, ContextType>;
  workSite?: Resolver<Maybe<ResolversTypes['WorkSite']>, ParentType, ContextType>;
  pickupSite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FileDownloadResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['FileDownload'] = ResolversParentTypes['FileDownload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  downloadLink?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FormResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Form'] = ResolversParentTypes['Form']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  readableId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  emitter?: Resolver<Maybe<ResolversTypes['Emitter']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['Recipient']>, ParentType, ContextType>;
  transporter?: Resolver<Maybe<ResolversTypes['Transporter']>, ParentType, ContextType>;
  wasteDetails?: Resolver<Maybe<ResolversTypes['WasteDetails']>, ParentType, ContextType>;
  trader?: Resolver<Maybe<ResolversTypes['Trader']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  ownerId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['FormStatus'], ParentType, ContextType>;
  signedByTransporter?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  sentAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  sentBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wasteAcceptationStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wasteRefusalReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receivedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receivedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  quantityReceived?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  actualQuantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  processingOperationDone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processingOperationDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  noTraceability?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  nextDestination?: Resolver<Maybe<ResolversTypes['NextDestination']>, ParentType, ContextType>;
  appendix2Forms?: Resolver<Maybe<Array<ResolversTypes['Form']>>, ParentType, ContextType>;
  ecoOrganisme?: Resolver<Maybe<ResolversTypes['EcoOrganisme']>, ParentType, ContextType>;
  temporaryStorageDetail?: Resolver<Maybe<ResolversTypes['TemporaryStorageDetail']>, ParentType, ContextType>;
  stateSummary?: Resolver<Maybe<ResolversTypes['StateSummary']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FormCompanyResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['FormCompany'] = ResolversParentTypes['FormCompany']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  siret?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  mail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FormsLifeCycleDataResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['formsLifeCycleData'] = ResolversParentTypes['formsLifeCycleData']> = {
  statusLogs?: Resolver<Array<ResolversTypes['StatusLog']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type FormSubscriptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['FormSubscription'] = ResolversParentTypes['FormSubscription']> = {
  mutation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  node?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType>;
  updatedFields?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  previousValues?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type InstallationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Installation'] = ResolversParentTypes['Installation']> = {
  codeS3ic?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  urlFiche?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rubriques?: Resolver<Maybe<Array<ResolversTypes['Rubrique']>>, ParentType, ContextType>;
  declarations?: Resolver<Maybe<Array<ResolversTypes['Declaration']>>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changePassword?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationChangePasswordArgs, 'oldPassword' | 'newPassword'>>;
  createCompany?: Resolver<ResolversTypes['CompanyPrivate'], ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'companyInput'>>;
  createTraderReceipt?: Resolver<Maybe<ResolversTypes['TraderReceipt']>, ParentType, ContextType, RequireFields<MutationCreateTraderReceiptArgs, never>>;
  createTransporterReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType, RequireFields<MutationCreateTransporterReceiptArgs, never>>;
  createUploadLink?: Resolver<ResolversTypes['UploadLink'], ParentType, ContextType, RequireFields<MutationCreateUploadLinkArgs, 'fileName' | 'fileType'>>;
  deleteForm?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationDeleteFormArgs, 'id'>>;
  deleteInvitation?: Resolver<ResolversTypes['CompanyPrivate'], ParentType, ContextType, RequireFields<MutationDeleteInvitationArgs, 'email' | 'siret'>>;
  deleteTraderReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType, RequireFields<MutationDeleteTraderReceiptArgs, never>>;
  deleteTransporterReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType, RequireFields<MutationDeleteTransporterReceiptArgs, never>>;
  duplicateForm?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationDuplicateFormArgs, 'id'>>;
  editProfile?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationEditProfileArgs, never>>;
  inviteUserToCompany?: Resolver<ResolversTypes['CompanyPrivate'], ParentType, ContextType, RequireFields<MutationInviteUserToCompanyArgs, 'email' | 'siret' | 'role'>>;
  joinWithInvite?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationJoinWithInviteArgs, 'inviteHash' | 'name' | 'password'>>;
  login?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  markAsProcessed?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationMarkAsProcessedArgs, 'processedInfo'>>;
  markAsReceived?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationMarkAsReceivedArgs, 'receivedInfo'>>;
  markAsResealed?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationMarkAsResealedArgs, 'id' | 'resealedInfos'>>;
  markAsResent?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationMarkAsResentArgs, 'id' | 'resentInfos'>>;
  markAsSealed?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationMarkAsSealedArgs, never>>;
  markAsSent?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationMarkAsSentArgs, 'sentInfo'>>;
  markAsTempStored?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationMarkAsTempStoredArgs, 'id' | 'tempStoredInfos'>>;
  removeUserFromCompany?: Resolver<ResolversTypes['CompanyPrivate'], ParentType, ContextType, RequireFields<MutationRemoveUserFromCompanyArgs, 'userId' | 'siret'>>;
  renewSecurityCode?: Resolver<ResolversTypes['CompanyPrivate'], ParentType, ContextType, RequireFields<MutationRenewSecurityCodeArgs, 'siret'>>;
  resendInvitation?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResendInvitationArgs, 'email' | 'siret'>>;
  resetPassword?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'email'>>;
  saveForm?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationSaveFormArgs, 'formInput'>>;
  signedByTransporter?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationSignedByTransporterArgs, 'id' | 'signingInfo'>>;
  signup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'userInfos'>>;
  updateCompany?: Resolver<ResolversTypes['CompanyPrivate'], ParentType, ContextType, RequireFields<MutationUpdateCompanyArgs, 'siret'>>;
  updateTraderReceipt?: Resolver<Maybe<ResolversTypes['TraderReceipt']>, ParentType, ContextType, RequireFields<MutationUpdateTraderReceiptArgs, never>>;
  updateTransporterFields?: Resolver<Maybe<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<MutationUpdateTransporterFieldsArgs, 'id'>>;
  updateTransporterReceipt?: Resolver<Maybe<ResolversTypes['TransporterReceipt']>, ParentType, ContextType, RequireFields<MutationUpdateTransporterReceiptArgs, never>>;
};

export type NextDestinationResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['NextDestination'] = ResolversParentTypes['NextDestination']> = {
  processingOperation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  apiKey?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  appendixForms?: Resolver<Array<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<QueryAppendixFormsArgs, 'siret'>>;
  companyInfos?: Resolver<ResolversTypes['CompanyPublic'], ParentType, ContextType, RequireFields<QueryCompanyInfosArgs, 'siret'>>;
  ecoOrganismes?: Resolver<Array<ResolversTypes['EcoOrganisme']>, ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['CompanyFavorite']>, ParentType, ContextType, RequireFields<QueryFavoritesArgs, 'type'>>;
  form?: Resolver<ResolversTypes['Form'], ParentType, ContextType, RequireFields<QueryFormArgs, never>>;
  formPdf?: Resolver<ResolversTypes['FileDownload'], ParentType, ContextType, RequireFields<QueryFormPdfArgs, never>>;
  forms?: Resolver<Array<ResolversTypes['Form']>, ParentType, ContextType, RequireFields<QueryFormsArgs, 'type'>>;
  formsLifeCycle?: Resolver<ResolversTypes['formsLifeCycleData'], ParentType, ContextType, RequireFields<QueryFormsLifeCycleArgs, never>>;
  formsRegister?: Resolver<ResolversTypes['FileDownload'], ParentType, ContextType, RequireFields<QueryFormsRegisterArgs, never>>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  searchCompanies?: Resolver<Array<ResolversTypes['CompanySearchResult']>, ParentType, ContextType, RequireFields<QuerySearchCompaniesArgs, 'clue'>>;
  stats?: Resolver<Array<ResolversTypes['CompanyStat']>, ParentType, ContextType>;
};

export type RecipientResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Recipient'] = ResolversParentTypes['Recipient']> = {
  cap?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  processingOperation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  isTempStorage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type RubriqueResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Rubrique'] = ResolversParentTypes['Rubrique']> = {
  rubrique?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alinea?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  etatActivite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  regimeAutorise?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  activite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  volume?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  unite?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wasteType?: Resolver<Maybe<ResolversTypes['WasteType']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type StatResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Stat'] = ResolversParentTypes['Stat']> = {
  wasteCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  incoming?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  outgoing?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type StateSummaryResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StateSummary'] = ResolversParentTypes['StateSummary']> = {
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  packagings?: Resolver<Array<ResolversTypes['Packagings']>, ParentType, ContextType>;
  onuCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transporter?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  transporterNumberPlate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  transporterCustomInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  recipient?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  emitter?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  lastActionOn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type StatusLogResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StatusLog'] = ResolversParentTypes['StatusLog']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['FormStatus']>, ParentType, ContextType>;
  loggedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedFields?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  form?: Resolver<Maybe<ResolversTypes['StatusLogForm']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['StatusLogUser']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type StatusLogFormResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StatusLogForm'] = ResolversParentTypes['StatusLogForm']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  readableId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type StatusLogUserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['StatusLogUser'] = ResolversParentTypes['StatusLogUser']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type SubscriptionResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  forms?: SubscriptionResolver<Maybe<ResolversTypes['FormSubscription']>, "forms", ParentType, ContextType, RequireFields<SubscriptionFormsArgs, 'token'>>;
};

export type TemporaryStorageDetailResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TemporaryStorageDetail'] = ResolversParentTypes['TemporaryStorageDetail']> = {
  temporaryStorer?: Resolver<Maybe<ResolversTypes['TemporaryStorer']>, ParentType, ContextType>;
  destination?: Resolver<Maybe<ResolversTypes['Destination']>, ParentType, ContextType>;
  wasteDetails?: Resolver<Maybe<ResolversTypes['WasteDetails']>, ParentType, ContextType>;
  transporter?: Resolver<Maybe<ResolversTypes['Transporter']>, ParentType, ContextType>;
  signedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  signedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TemporaryStorerResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TemporaryStorer'] = ResolversParentTypes['TemporaryStorer']> = {
  quantityType?: Resolver<Maybe<ResolversTypes['QuantityType']>, ParentType, ContextType>;
  quantityReceived?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  wasteAcceptationStatus?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  wasteRefusalReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  receivedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  receivedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TraderResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Trader'] = ResolversParentTypes['Trader']> = {
  company?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  receipt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validityLimit?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TraderReceiptResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TraderReceipt'] = ResolversParentTypes['TraderReceipt']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  receiptNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validityLimit?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TransporterResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['Transporter'] = ResolversParentTypes['Transporter']> = {
  company?: Resolver<Maybe<ResolversTypes['FormCompany']>, ParentType, ContextType>;
  isExemptedOfReceipt?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  receipt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  department?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  validityLimit?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  numberPlate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  customInfo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type TransporterReceiptResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['TransporterReceipt'] = ResolversParentTypes['TransporterReceipt']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  receiptNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validityLimit?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  department?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UploadLinkResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['UploadLink'] = ResolversParentTypes['UploadLink']> = {
  signedUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  companies?: Resolver<Maybe<Array<ResolversTypes['CompanyPrivate']>>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type WasteDetailsResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WasteDetails'] = ResolversParentTypes['WasteDetails']> = {
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  onuCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  packagings?: Resolver<Array<ResolversTypes['Packagings']>, ParentType, ContextType>;
  otherPackaging?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  numberOfPackages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  quantityType?: Resolver<Maybe<ResolversTypes['QuantityType']>, ParentType, ContextType>;
  consistence?: Resolver<Maybe<ResolversTypes['Consistence']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type WorkSiteResolvers<ContextType = GraphQLContext, ParentType extends ResolversParentTypes['WorkSite'] = ResolversParentTypes['WorkSite']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  infos?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: isTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  CompanyFavorite?: CompanyFavoriteResolvers<ContextType>;
  CompanyMember?: CompanyMemberResolvers<ContextType>;
  CompanyPrivate?: CompanyPrivateResolvers<ContextType>;
  CompanyPublic?: CompanyPublicResolvers<ContextType>;
  CompanySearchResult?: CompanySearchResultResolvers<ContextType>;
  CompanyStat?: CompanyStatResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Declaration?: DeclarationResolvers<ContextType>;
  Destination?: DestinationResolvers<ContextType>;
  EcoOrganisme?: EcoOrganismeResolvers<ContextType>;
  Emitter?: EmitterResolvers<ContextType>;
  FileDownload?: FileDownloadResolvers<ContextType>;
  Form?: FormResolvers<ContextType>;
  FormCompany?: FormCompanyResolvers<ContextType>;
  formsLifeCycleData?: FormsLifeCycleDataResolvers<ContextType>;
  FormSubscription?: FormSubscriptionResolvers<ContextType>;
  Installation?: InstallationResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NextDestination?: NextDestinationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Recipient?: RecipientResolvers<ContextType>;
  Rubrique?: RubriqueResolvers<ContextType>;
  Stat?: StatResolvers<ContextType>;
  StateSummary?: StateSummaryResolvers<ContextType>;
  StatusLog?: StatusLogResolvers<ContextType>;
  StatusLogForm?: StatusLogFormResolvers<ContextType>;
  StatusLogUser?: StatusLogUserResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TemporaryStorageDetail?: TemporaryStorageDetailResolvers<ContextType>;
  TemporaryStorer?: TemporaryStorerResolvers<ContextType>;
  Trader?: TraderResolvers<ContextType>;
  TraderReceipt?: TraderReceiptResolvers<ContextType>;
  Transporter?: TransporterResolvers<ContextType>;
  TransporterReceipt?: TransporterReceiptResolvers<ContextType>;
  UploadLink?: UploadLinkResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  WasteDetails?: WasteDetailsResolvers<ContextType>;
  WorkSite?: WorkSiteResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = GraphQLContext> = Resolvers<ContextType>;
