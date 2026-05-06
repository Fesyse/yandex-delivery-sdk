import { z } from "zod";

const sourceSchema = z.object({}).passthrough();
const destinationSchema = z.object({}).passthrough();

export const otherDayRequestDraftSchema = z
  .object({
    info: z
      .object({
        operator_request_id: z.string().min(1),
      })
      .passthrough(),
    source: sourceSchema,
    destination: destinationSchema,
  })
  .passthrough();

export const otherDayPricingSchema = z
  .object({
    source: sourceSchema,
    destination: destinationSchema,
  })
  .passthrough();

export const otherDayOfferConfirmSchema = z
  .object({
    offer_id: z.string().min(1),
  })
  .passthrough();

export const otherDayLocationDetectSchema = z
  .object({
    address: z.string().min(1),
  })
  .passthrough();

export const otherDayAnyObjectSchema = z.object({}).passthrough();
