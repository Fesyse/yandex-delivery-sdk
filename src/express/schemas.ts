import { z } from "zod";

const routePointSchema = z
  .object({
    type: z.string(),
    address: z.string().min(1),
  })
  .passthrough();

export const expressClaimDraftSchema = z
  .object({
    route_points: z.array(routePointSchema).min(2),
  })
  .passthrough();

export const expressCreateClaimSchema = expressClaimDraftSchema.extend({
  request_id: z.string().optional(),
});

export const expressClaimInfoSchema = z
  .object({
    claim_id: z.string().min(1),
  })
  .passthrough();

export const expressClaimAcceptSchema = expressClaimInfoSchema.extend({
  version: z.number().int().optional(),
});

export const expressClaimCancelSchema = expressClaimInfoSchema.extend({
  cancel_state: z.string().optional(),
  version: z.number().int().optional(),
});

export const expressBulkInfoSchema = z
  .object({
    claim_ids: z.array(z.string().min(1)).min(1),
  })
  .passthrough();

export const expressAnyObjectSchema = z.object({}).passthrough();
