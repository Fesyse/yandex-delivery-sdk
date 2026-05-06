import { MerchantId, OtherDayOfferId, OtherDayRequestId, PlatformStationId } from "../core/types.js";

export type KnownOtherDayRequestStatus =
  | "DRAFT"
  | "VALIDATING"
  | "VALIDATING_ERROR"
  | "CREATED"
  | "DELIVERY_PROCESSING_STARTED"
  | "DELIVERY_TRACK_RECIEVED"
  | "SORTING_CENTER_PROCESSING_STARTED"
  | "SORTING_CENTER_TRACK_RECEIVED"
  | "SORTING_CENTER_TRACK_LOADED"
  | "DELIVERY_LOADED"
  | "SORTING_CENTER_LOADED"
  | "SORTING_CENTER_AT_START"
  | "SORTING_CENTER_PREPARED"
  | "SORTING_CENTER_TRANSMITTED"
  | "DELIVERY_AT_START"
  | "DELIVERY_AT_START_SORT"
  | "DELIVERY_TRANSPORTATION"
  | "DELIVERY_TRANSPORTATION_RECIPIENT"
  | "DELIVERY_TRANSMITTED_TO_RECIPIENT"
  | "DELIVERY_ATTEMPT_FAILED"
  | "DELIVERY_DELIVERED"
  | "DELIVERY_ARRIVED_PICKUP_POINT"
  | "DELIVERY_STORAGE_PERIOD_EXPIRED"
  | "DELIVERY_STORAGE_PERIOD_EXTENDED"
  | "CONFIRMATION_CODE_RECEIVED"
  | "PARTICULARLY_DELIVERED"
  | "FINISHED"
  | "CANCELLED"
  | "SORTING_CENTER_RETURN_PREPARING"
  | "SORTING_CENTER_RETURN_PREPARING_SENDER"
  | "SORTING_CENTER_RETURN_ARRIVED"
  | "SORTING_CENTER_RETURN_RETURNED"
  | "RETURN_PREPARING"
  | "RETURN_TRANSPORTATION_STARTED"
  | "RETURN_ARRIVED_DELIVERY"
  | "RETURN_TRANSMITTED_FULFILMENT"
  | "RETURN_READY_FOR_PICKUP"
  | "RETURN_RETURNED"
  | "DELIVERY_UPDATED_BY_SHOP"
  | "DELIVERY_UPDATED_BY_RECIPIENT"
  | "DELIVERY_UPDATED_BY_DELIVERY"
  | "CANCELED_IN_PLATFORM";

export type OtherDayRequestStatus = KnownOtherDayRequestStatus | (string & {});

export type OtherDayTimestampUtc = string;
export type OtherDayTimestampUnix = number;

export type PlatformStation = {
  platform_id: PlatformStationId | string;
};

export type OtherDayContact = {
  first_name?: string;
  last_name?: string;
  patronymic?: string;
  phone: string;
  email?: string;
};

export type OtherDayLocation = {
  address?: string;
  geo_id?: number;
  latitude?: number;
  longitude?: number;
  details?: Record<string, unknown>;
  [key: string]: unknown;
};

export type OtherDayTimeInterval = {
  from: OtherDayTimestampUtc;
  to: OtherDayTimestampUtc;
};

export type OtherDaySourceNode = {
  platform_station?: PlatformStation;
  location?: OtherDayLocation;
  interval?: OtherDayTimeInterval;
  contact?: OtherDayContact;
  [key: string]: unknown;
};

export type OtherDayDestinationNode = {
  platform_station?: PlatformStation;
  location?: OtherDayLocation;
  interval?: OtherDayTimeInterval;
  contact?: OtherDayContact;
  [key: string]: unknown;
};

export type OtherDayItemBillingDetails = {
  unit_price: number;
  assessed_unit_price?: number;
  inn?: string;
  nds?: number;
};

export type OtherDayItemPhysicalDimensions = {
  dx?: number;
  dy?: number;
  dz?: number;
  predefined_volume?: number;
};

export type OtherDayRequestItem = {
  name: string;
  count: number;
  article?: string;
  billing_details?: OtherDayItemBillingDetails;
  physical_dims?: OtherDayItemPhysicalDimensions;
  place_barcode?: string;
  cargo_types?: string[];
  [key: string]: unknown;
};

export type OtherDayPlacePhysicalDimensions = {
  weight_gross: number;
  dx: number;
  dy: number;
  dz: number;
};

export type OtherDayResourcePlace = {
  barcode?: string;
  physical_dims: OtherDayPlacePhysicalDimensions;
};

export type OtherDayPaymentMethod = "already_paid" | "card_on_receipt" | "postpay" | (string & {});

export type OtherDayLastMilePolicy = "time_interval" | "self_pickup" | (string & {});

export type OtherDayBillingInfo = {
  payment_method?: OtherDayPaymentMethod;
  delivery_cost?: number;
  assessed_cost?: number;
  [key: string]: unknown;
};

export type OtherDayRequestInfo = {
  operator_request_id: string;
  merchant_id?: MerchantId | string;
  comment?: string;
};

export type OtherDayRequestDraft = {
  info: OtherDayRequestInfo;
  source: OtherDaySourceNode;
  destination: OtherDayDestinationNode;
  items?: OtherDayRequestItem[];
  places?: OtherDayResourcePlace[];
  billing_info?: OtherDayBillingInfo;
  last_mile_policy?: OtherDayLastMilePolicy;
  variable_delivery_cost_for_recipient?: Array<Record<string, unknown>>;
  [key: string]: unknown;
};

export type OtherDayPricingRequest = {
  source: OtherDaySourceNode;
  destination: OtherDayDestinationNode;
  places?: OtherDayResourcePlace[];
  [key: string]: unknown;
};

export type OtherDayPricingResponse = {
  pricing_total?: string;
  delivery_days?: number;
  [key: string]: unknown;
};

export type OtherDayOffersCreateRequest = OtherDayRequestDraft;

export type OtherDayOffer = {
  offer_id: OtherDayOfferId | string;
  request_id?: OtherDayRequestId | string;
  pricing?: Record<string, unknown>;
  pickup_interval?: OtherDayTimeInterval;
  delivery_interval?: OtherDayTimeInterval;
  [key: string]: unknown;
};

export type OtherDayOffersCreateResponse = {
  offers?: OtherDayOffer[];
  [key: string]: unknown;
};

export type OtherDayOfferConfirmRequest = {
  offer_id: OtherDayOfferId | string;
};

export type OtherDayRequestInfoQuery = {
  request_code?: string;
  request_id?: OtherDayRequestId | string;
  slim?: boolean;
};

export type OtherDayRequestState = {
  status: OtherDayRequestStatus;
  description?: string;
  timestamp?: OtherDayTimestampUnix;
  timestamp_utc?: OtherDayTimestampUtc;
  reason?: unknown;
};

export type OtherDayRequestResponse = {
  request_id?: OtherDayRequestId | string;
  request?: OtherDayRequestDraft;
  status?: OtherDayRequestStatus;
  state?: OtherDayRequestState;
  sharing_url?: string;
  available_actions?: Record<string, unknown>;
  [key: string]: unknown;
};

export type OtherDayRequestsInfoRequest = {
  from?: OtherDayTimestampUtc;
  to?: OtherDayTimestampUtc;
  [key: string]: unknown;
};

export type OtherDayLocationDetectRequest = {
  address: string;
};

export type OtherDayPickupPointsListRequest = {
  geo_id?: number;
  location?: OtherDayLocation;
  [key: string]: unknown;
};

export type OtherDayGenericResponse = Record<string, unknown>;
