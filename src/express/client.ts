import { HttpClient } from "../core/http.js";
import { QueryParams } from "../core/types.js";
import {
  expressAnyObjectSchema,
  expressBulkInfoSchema,
  expressClaimAcceptSchema,
  expressClaimCancelSchema,
  expressClaimInfoSchema,
  expressCreateClaimSchema,
} from "./schemas.js";
import {
  ExpressBulkInfoRequest,
  ExpressCheckPriceRequest,
  ExpressClaimAcceptRequest,
  ExpressClaimCancelInfoRequest,
  ExpressClaimCancelRequest,
  ExpressClaimInfoRequest,
  ExpressClaimResponse,
  ExpressClaimSearchRequest,
  ExpressCreateClaimRequest,
  ExpressDeliveryMethodsRequest,
  ExpressGenericResponse,
  ExpressOfferCalculateRequest,
  ExpressOfferCalculateResponse,
  ExpressPerformerPositionRequest,
  ExpressPointsEtaRequest,
  ExpressTariffsRequest,
  ExpressTrackingLinksRequest,
} from "./types.js";

const BASE_PATH = "/b2b/cargo/integration/v2";

export class ExpressClient {
  readonly offers: ExpressOffersClient;
  readonly claims: ExpressClaimsClient;
  readonly tariffs: ExpressTariffsClient;
  readonly deliveryMethods: ExpressDeliveryMethodsClient;
  readonly rover: ExpressRoverClient;
  readonly robot: ExpressRobotClient;

  constructor(private readonly http: HttpClient) {
    this.offers = new ExpressOffersClient(http);
    this.claims = new ExpressClaimsClient(http);
    this.tariffs = new ExpressTariffsClient(http);
    this.deliveryMethods = new ExpressDeliveryMethodsClient(http);
    this.rover = new ExpressRoverClient(http);
    this.robot = new ExpressRobotClient(http);
  }
}

export class ExpressOffersClient {
  constructor(private readonly http: HttpClient) {}

  calculate(request: ExpressOfferCalculateRequest): Promise<ExpressOfferCalculateResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/offers/calculate`,
      schema: expressCreateClaimSchema,
      request,
    });
  }
}

export class ExpressClaimsClient {
  constructor(private readonly http: HttpClient) {}

  create(request: ExpressCreateClaimRequest): Promise<ExpressClaimResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/create`,
      schema: expressCreateClaimSchema,
      request,
    });
  }

  info(request: ExpressClaimInfoRequest): Promise<ExpressClaimResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/info`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  accept(request: ExpressClaimAcceptRequest): Promise<ExpressClaimResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/accept`,
      schema: expressClaimAcceptSchema,
      request,
    });
  }

  cancelInfo(request: ExpressClaimCancelInfoRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/cancel-info`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  cancel(request: ExpressClaimCancelRequest): Promise<ExpressClaimResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/cancel`,
      schema: expressClaimCancelSchema,
      request,
    });
  }

  getCourierPhone(request: ExpressClaimInfoRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/driver-voiceforwarding`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  getPerformerPosition(
    request: ExpressPerformerPositionRequest,
  ): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "GET",
      path: `${BASE_PATH}/claims/performer-position`,
      query: request as QueryParams,
    });
  }

  pointsEta(request: ExpressPointsEtaRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/points-eta`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  trackingLinks(request: ExpressTrackingLinksRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "GET",
      path: `${BASE_PATH}/claims/tracking-links`,
      query: request as QueryParams,
    });
  }

  confirmationCode(request: ExpressClaimInfoRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/confirmation_code`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  proofOfDeliveryInfo(request: ExpressClaimInfoRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/proof-of-delivery/info`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  edit(request: ExpressCreateClaimRequest): Promise<ExpressClaimResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/edit`,
      schema: expressCreateClaimSchema,
      request,
    });
  }

  applyChangesRequest(request: Record<string, unknown>): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/apply-changes/request`,
      schema: expressAnyObjectSchema,
      request,
    });
  }

  applyChangesResult(request: ExpressClaimInfoRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/apply-changes/result`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  return(request: Record<string, unknown>): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/return`,
      schema: expressAnyObjectSchema,
      request,
    });
  }

  search(request: ExpressClaimSearchRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/search`,
      schema: expressAnyObjectSchema,
      request,
    });
  }

  bulkInfo(request: ExpressBulkInfoRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/bulk_info`,
      schema: expressBulkInfoSchema,
      request,
    });
  }

  journal(request: ExpressClaimInfoRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/journal`,
      schema: expressClaimInfoSchema,
      request,
    });
  }

  checkPrice(request: ExpressCheckPriceRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/check-price`,
      schema: expressCreateClaimSchema,
      request,
    });
  }
}

export class ExpressTariffsClient {
  constructor(private readonly http: HttpClient) {}

  list(request: ExpressTariffsRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/tariffs`,
      schema: expressAnyObjectSchema,
      request,
    });
  }
}

export class ExpressDeliveryMethodsClient {
  constructor(private readonly http: HttpClient) {}

  list(request: ExpressDeliveryMethodsRequest): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/delivery-methods`,
      schema: expressAnyObjectSchema,
      request,
    });
  }
}

export class ExpressRoverClient {
  constructor(private readonly http: HttpClient) {}

  checkDeliveryPossibility(request: Record<string, unknown>): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/rover/check-delivery-possibility`,
      schema: expressAnyObjectSchema,
      request,
    });
  }

  openCover(request: Record<string, unknown>): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/rover/open-cover`,
      schema: expressAnyObjectSchema,
      request,
    });
  }
}

export class ExpressRobotClient {
  constructor(private readonly http: HttpClient) {}

  startExchange(request: Record<string, unknown>): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/robot-exchange/start`,
      schema: expressAnyObjectSchema,
      request,
    });
  }

  getExchangeStates(request: Record<string, unknown>): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/robot-exchange/states`,
      schema: expressAnyObjectSchema,
      request,
    });
  }

  confirmExchangeFinish(request: Record<string, unknown>): Promise<ExpressGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/claims/robot-exchange/finish`,
      schema: expressAnyObjectSchema,
      request,
    });
  }
}
