import { ExpressClaimId, ExpressOfferId } from "../core/types.js";

export type KnownExpressClaimStatus =
  | "new"
  | "estimating"
  | "estimating_failed"
  | "ready_for_approval"
  | "accepted"
  | "performer_lookup"
  | "performer_draft"
  | "performer_found"
  | "performer_not_found"
  | "pickup_arrived"
  | "ready_for_pickup_confirmation"
  | "pickuped"
  | "delivery_arrived"
  | "ready_for_delivery_confirmation"
  | "pay_waiting"
  | "delivered"
  | "delivered_finish"
  | "returning"
  | "return_arrived"
  | "ready_for_return_confirmation"
  | "returned"
  | "returned_finish"
  | "failed"
  | "cancelled"
  | "cancelled_with_payment"
  | "cancelled_by_taxi"
  | "cancelled_with_items_on_hands";

export type ExpressClaimStatus = KnownExpressClaimStatus | (string & {});

export type Money = {
  value?: string;
  currency?: string;
  currency_sign?: string;
};

export type Coordinates = [number, number] | { lat: number; lon: number };

export type ExpressRoutePoint = {
  point_id?: number;
  type: "source" | "destination" | "return" | (string & {});
  address: string;
  coordinates?: Coordinates;
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  visit_order?: number;
  skip_confirmation?: boolean;
  external_order_id?: string;
  external_order_cost?: Money;
  payment_on_delivery?: Record<string, unknown>;
  expected_visit_interval?: {
    from: string;
    to: string;
  };
  [key: string]: unknown;
};

export type ExpressItem = {
  title?: string;
  size?: {
    length: number;
    width: number;
    height: number;
  };
  weight?: number;
  cost_currency?: string;
  cost_value?: string;
  quantity?: number;
  pickup_point?: number;
  droppof_point?: number;
  [key: string]: unknown;
};

export type ExpressClientRequirements = {
  taxi_class?: string;
  cargo_type?: string;
  cargo_loaders?: number;
  cargo_options?: string[];
  pro_courier?: boolean;
  assign_robot?: boolean;
  [key: string]: unknown;
};

export type ExpressSameDayData = {
  delivery_interval?: {
    from: string;
    to: string;
  };
  [key: string]: unknown;
};

export type ExpressClaimDraft = {
  route_points: ExpressRoutePoint[];
  items?: ExpressItem[];
  client_requirements?: ExpressClientRequirements;
  same_day_data?: ExpressSameDayData;
  callback_properties?: {
    callback_url?: string;
  };
  comment?: string;
  optional_return?: boolean;
  skip_client_notify?: boolean;
  skip_door_to_door?: boolean;
  due?: string;
  emergency_contact?: {
    name?: string;
    phone?: string;
  };
  [key: string]: unknown;
};

export type ExpressCreateClaimRequest = ExpressClaimDraft & {
  request_id?: string;
};

export type ExpressClaimInfoRequest = {
  claim_id: ExpressClaimId | string;
};

export type ExpressClaimAcceptRequest = {
  claim_id: ExpressClaimId | string;
  version?: number;
};

export type ExpressClaimCancelInfoRequest = ExpressClaimInfoRequest;

export type ExpressClaimCancelRequest = ExpressClaimInfoRequest & {
  cancel_state?: "free" | "paid" | (string & {});
  version?: number;
};

export type ExpressCheckPriceRequest = ExpressClaimDraft;

export type ExpressTariffsRequest = {
  start_point: Coordinates;
  [key: string]: unknown;
};

export type ExpressClaimSearchRequest = {
  limit?: number;
  offset?: number;
  filters?: Record<string, unknown>;
  [key: string]: unknown;
};

export type ExpressBulkInfoRequest = {
  claim_ids: Array<ExpressClaimId | string>;
};

export type ExpressClaimResponse = {
  id?: ExpressClaimId | string;
  claim_id?: ExpressClaimId | string;
  status?: ExpressClaimStatus;
  version?: number;
  pricing?: Record<string, unknown>;
  route_points?: ExpressRoutePoint[];
  error_messages?: Array<{ code?: string; message?: string }>;
  [key: string]: unknown;
};

export type ExpressOfferCalculateRequest = ExpressClaimDraft;

export type ExpressOfferCalculateResponse = {
  offers?: Array<{
    offer_id: ExpressOfferId | string;
    price?: Money | string;
    price_with_vat?: Money | string;
    eta?: number;
    expires_at?: string;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
};

export type ExpressTrackingLinksRequest = {
  claim_id: ExpressClaimId | string;
};

export type ExpressPerformerPositionRequest = {
  claim_id: ExpressClaimId | string;
};

export type ExpressPointsEtaRequest = {
  claim_id: ExpressClaimId | string;
};

export type ExpressDeliveryMethodsRequest = {
  start_point: Coordinates;
  end_point?: Coordinates;
  [key: string]: unknown;
};

export type ExpressGenericResponse = Record<string, unknown>;
