import { HttpClient } from "../core/http.js";
import { QueryParams } from "../core/types.js";
import {
  otherDayAnyObjectSchema,
  otherDayLocationDetectSchema,
  otherDayOfferConfirmSchema,
  otherDayPricingSchema,
  otherDayRequestDraftSchema,
} from "./schemas.js";
import {
  OtherDayGenericResponse,
  OtherDayLocationDetectRequest,
  OtherDayOfferConfirmRequest,
  OtherDayOffersCreateRequest,
  OtherDayOffersCreateResponse,
  OtherDayPickupPointsListRequest,
  OtherDayPricingRequest,
  OtherDayPricingResponse,
  OtherDayRequestInfoQuery,
  OtherDayRequestResponse,
  OtherDayRequestsInfoRequest,
} from "./types.js";

const BASE_PATH = "/api/b2b/platform";

export class OtherDayClient {
  readonly pricing: OtherDayPricingClient;
  readonly offers: OtherDayOffersClient;
  readonly locations: OtherDayLocationsClient;
  readonly pickupPoints: OtherDayPickupPointsClient;
  readonly requests: OtherDayRequestsClient;
  readonly documents: OtherDayDocumentsClient;
  readonly merchants: OtherDayMerchantsClient;
  readonly warehouses: OtherDayWarehousesClient;
  readonly pickups: OtherDayPickupsClient;

  constructor(private readonly http: HttpClient) {
    this.pricing = new OtherDayPricingClient(http);
    this.offers = new OtherDayOffersClient(http);
    this.locations = new OtherDayLocationsClient(http);
    this.pickupPoints = new OtherDayPickupPointsClient(http);
    this.requests = new OtherDayRequestsClient(http);
    this.documents = new OtherDayDocumentsClient(http);
    this.merchants = new OtherDayMerchantsClient(http);
    this.warehouses = new OtherDayWarehousesClient(http);
    this.pickups = new OtherDayPickupsClient(http);
  }
}

export class OtherDayPricingClient {
  constructor(private readonly http: HttpClient) {}

  calculate(request: OtherDayPricingRequest): Promise<OtherDayPricingResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/pricing-calculator`,
      schema: otherDayPricingSchema,
      request,
    });
  }
}

export class OtherDayOffersClient {
  constructor(private readonly http: HttpClient) {}

  infoGet(query?: QueryParams): Promise<OtherDayGenericResponse> {
    const options = {
      method: "GET" as const,
      path: `${BASE_PATH}/offers/info`,
    };

    return this.http.request({
      ...options,
      ...(query ? { query } : {}),
    });
  }

  infoPost(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/offers/info`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }

  create(request: OtherDayOffersCreateRequest): Promise<OtherDayOffersCreateResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/offers/create`,
      schema: otherDayRequestDraftSchema,
      request,
    });
  }

  confirm(request: OtherDayOfferConfirmRequest): Promise<OtherDayRequestResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/offers/confirm`,
      schema: otherDayOfferConfirmSchema,
      request,
    });
  }
}

export class OtherDayLocationsClient {
  constructor(private readonly http: HttpClient) {}

  detect(request: OtherDayLocationDetectRequest): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/location/detect`,
      schema: otherDayLocationDetectSchema,
      request,
    });
  }
}

export class OtherDayPickupPointsClient {
  constructor(private readonly http: HttpClient) {}

  list(request: OtherDayPickupPointsListRequest): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/pickup-points/list`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }
}

export class OtherDayRequestsClient {
  constructor(private readonly http: HttpClient) {}

  info(query: OtherDayRequestInfoQuery): Promise<OtherDayRequestResponse> {
    return this.http.request({
      method: "GET",
      path: `${BASE_PATH}/request/info`,
      query: query as QueryParams,
    });
  }

  listInfo(request: OtherDayRequestsInfoRequest): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/requests/info`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }

  actualInfo(query: OtherDayRequestInfoQuery): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "GET",
      path: `${BASE_PATH}/request/actual_info`,
      query: query as QueryParams,
    });
  }

  edit(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/edit`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }

  datetimeOptions(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/datetime_options`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }

  redeliveryOptions(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/redelivery_options`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }

  history(query: OtherDayRequestInfoQuery): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "GET",
      path: `${BASE_PATH}/request/history`,
      query: query as QueryParams,
    });
  }

  cancel(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/cancel`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }

  create(request: OtherDayOffersCreateRequest): Promise<OtherDayRequestResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/create`,
      schema: otherDayRequestDraftSchema,
      request,
    });
  }

  editPlace(query: QueryParams): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "GET",
      path: `${BASE_PATH}/request/place/edit`,
      query,
    });
  }

  editStatus(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/edit/status`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }

  editItemInstances(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/items-instances/edit`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }
}

export class OtherDayDocumentsClient {
  constructor(private readonly http: HttpClient) {}

  generateLabels(request: Record<string, unknown>): Promise<ArrayBuffer> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/generate-labels`,
      schema: otherDayAnyObjectSchema,
      request,
      responseType: "arrayBuffer",
    });
  }

  getHandoverAct(request: Record<string, unknown>): Promise<ArrayBuffer> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}/request/get-handover-act`,
      schema: otherDayAnyObjectSchema,
      request,
      responseType: "arrayBuffer",
    });
  }
}

export class OtherDayMerchantsClient {
  constructor(private readonly http: HttpClient) {}

  register(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/merchant/register", request);
  }

  getRegisterStatus(query: QueryParams): Promise<OtherDayGenericResponse> {
    return this.http.request({ method: "GET", path: `${BASE_PATH}/merchant/register`, query });
  }

  info(query: QueryParams): Promise<OtherDayGenericResponse> {
    return this.http.request({ method: "GET", path: `${BASE_PATH}/merchant/info`, query });
  }

  search(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/merchant/search", request);
  }

  delete(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/merchant/delete", request);
  }

  update(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/merchant/update", request);
  }

  private post(path: string, request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}${path}`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }
}

export class OtherDayWarehousesClient {
  constructor(private readonly http: HttpClient) {}

  create(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/warehouses/create", request);
  }

  list(request: Record<string, unknown> = {}): Promise<OtherDayGenericResponse> {
    return this.post("/warehouses/list", request);
  }

  retrieve(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/warehouses/retrieve", request);
  }

  private post(path: string, request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}${path}`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }
}

export class OtherDayPickupsClient {
  constructor(private readonly http: HttpClient) {}

  pickupOptions(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/pickups/pickup-options", request);
  }

  create(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/pickups/create", request);
  }

  cancel(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/pickups/cancel", request);
  }

  scheduledList(request: Record<string, unknown> = {}): Promise<OtherDayGenericResponse> {
    return this.post("/pickups/scheduled/list", request);
  }

  retrieve(request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.post("/pickups/retrieve", request);
  }

  private post(path: string, request: Record<string, unknown>): Promise<OtherDayGenericResponse> {
    return this.http.request({
      method: "POST",
      path: `${BASE_PATH}${path}`,
      schema: otherDayAnyObjectSchema,
      request,
    });
  }
}
