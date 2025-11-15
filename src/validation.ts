import { z } from 'zod';

/**
 * Validation schemas for Bayarcash MCP server
 */

// Email validation
export const emailSchema = z.string().email('Invalid email format');

// Malaysian phone number validation (starts with 60, followed by 9-10 digits)
export const phoneSchema = z
  .number()
  .int('Phone number must be an integer')
  .positive('Phone number must be positive')
  .refine(
    (val) => {
      const str = val.toString();
      return str.startsWith('60') && str.length >= 11 && str.length <= 12;
    },
    { message: 'Invalid Malaysian phone number. Format: 60123456789' }
  );

// Amount validation (positive number, max 2 decimal places)
export const amountSchema = z
  .number()
  .positive('Amount must be positive')
  .refine(
    (val) => {
      const decimalPlaces = (val.toString().split('.')[1] || '').length;
      return decimalPlaces <= 2;
    },
    { message: 'Amount can have maximum 2 decimal places' }
  );

// Payment channel validation (1-10)
export const paymentChannelSchema = z
  .number()
  .int('Payment channel must be an integer')
  .min(1, 'Payment channel must be between 1 and 10')
  .max(10, 'Payment channel must be between 1 and 10');

// Status code validation (0-4)
export const statusCodeSchema = z
  .number()
  .int('Status must be an integer')
  .min(0, 'Status must be between 0 and 4')
  .max(4, 'Status must be between 0 and 4');

// Payment intent creation schema
export const createPaymentIntentSchema = z.object({
  order_number: z.string().min(1, 'Order number is required'),
  amount: amountSchema,
  payer_email: emailSchema,
  payer_name: z.string().min(1, 'Payer name is required'),
  description: z.string().min(1, 'Description is required'),
  portal_key: z.string().min(1, 'Portal key is required'),
  payment_channel: paymentChannelSchema.optional(),
  payer_telephone_number: phoneSchema.optional()
});

// List transactions filter schema
export const listTransactionsSchema = z.object({
  status: statusCodeSchema.optional(),
  payment_channel: paymentChannelSchema.optional(),
  payer_email: emailSchema.optional(),
  order_number: z.string().optional(),
  reference_number: z.string().optional(),
  page: z.number().int().positive().optional(),
  per_page: z.number().int().positive().max(100).optional()
});

// Payment intent ID schema
export const paymentIntentIdSchema = z.object({
  payment_intent_id: z
    .string()
    .min(1, 'Payment intent ID is required')
    .regex(/^(pi_|trx_)/, 'Payment intent ID must start with pi_ or trx_')
});

// Transaction ID schema
export const transactionIdSchema = z.object({
  transaction_id: z.string().min(1, 'Transaction ID is required')
});

// Order number schema
export const orderNumberSchema = z.object({
  order_number: z.string().min(1, 'Order number is required')
});

// Portal key schema
export const portalKeySchema = z.object({
  portal_key: z.string().optional()
});

/**
 * Validate data against a schema and return formatted error message
 */
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; error: string } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Format Zod errors into readable message
  const errors = result.error.errors.map(err => {
    const path = err.path.join('.');
    return `${path}: ${err.message}`;
  }).join(', ');

  return { success: false, error: errors };
}
