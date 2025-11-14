import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { BayarcashClient, BayarcashConfig } from './bayarcash-client.js';

// Configuration schema for Smithery
export const configSchema = z.object({
  apiToken: z.string().describe('Your Bayarcash API Token from console.bayar.cash'),
  apiSecretKey: z.string().describe('Your Bayarcash API Secret Key'),
  useSandbox: z.boolean().default(true).describe('Enable sandbox mode for testing'),
  apiVersion: z.enum(['v2', 'v3']).default('v3').describe('Bayarcash API version')
});

export default function createServer({ config }: { config: z.infer<typeof configSchema> }) {
  // Initialize Bayarcash client
  const bayarcashConfig: BayarcashConfig = {
    apiToken: config.apiToken,
    apiSecretKey: config.apiSecretKey,
    useSandbox: config.useSandbox,
    apiVersion: config.apiVersion
  };

  const bayarcash = new BayarcashClient(bayarcashConfig);

  // Create MCP server
  const server = new McpServer({
    name: 'bayarcash-mcp-server',
    version: '1.0.0',
  });

  // Tool: Create payment intent
  server.tool(
    'create_payment_intent',
    'Create a new payment intent for processing payments through Bayarcash',
    {
      order_number: z.string().describe('Unique order number for this payment'),
      amount: z.number().describe('Payment amount in MYR'),
      payer_email: z.string().describe('Email address of the payer'),
      payer_name: z.string().describe('Name of the payer'),
      description: z.string().describe('Description of the payment'),
      portal_key: z.string().describe('Portal key for the payment gateway'),
      payment_optional: z.boolean().optional().describe('Whether payment is optional')
    },
    async ({ order_number, amount, payer_email, payer_name, description, portal_key, payment_optional }) => {
      const result = await bayarcash.createPaymentIntent({
        order_number,
        amount,
        payer_email,
        payer_name,
        description,
        portal_key,
        payment_optional
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: Get payment intent
  server.tool(
    'get_payment_intent',
    'Get payment intent details by order number',
    {
      order_number: z.string().describe('Order number to retrieve')
    },
    async ({ order_number }) => {
      const result = await bayarcash.getPaymentIntent(order_number);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: Get transaction
  server.tool(
    'get_transaction',
    'Get transaction details by transaction ID',
    {
      transaction_id: z.string().describe('Transaction ID to retrieve')
    },
    async ({ transaction_id }) => {
      const result = await bayarcash.getTransaction(transaction_id);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: Get transaction by order
  server.tool(
    'get_transaction_by_order',
    'Get transaction details by order number',
    {
      order_number: z.string().describe('Order number to retrieve')
    },
    async ({ order_number }) => {
      const result = await bayarcash.getTransactionByOrderNumber(order_number);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: List transactions
  server.tool(
    'list_transactions',
    'List all transactions with optional filters',
    {
      status: z.string().optional().describe('Filter by transaction status'),
      payment_channel: z.string().optional().describe('Filter by payment channel'),
      payer_email: z.string().optional().describe('Filter by payer email'),
      order_number: z.string().optional().describe('Filter by order number'),
      page: z.number().optional().describe('Page number for pagination'),
      per_page: z.number().optional().describe('Number of items per page')
    },
    async (filters) => {
      const result = await bayarcash.getAllTransactions(filters);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: Get portals
  server.tool(
    'get_portals',
    'Get list of available payment portals',
    {},
    async () => {
      const result = await bayarcash.getPortals();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: Get payment channels
  server.tool(
    'get_payment_channels',
    'Get list of available payment channels',
    {
      portal_key: z.string().optional().describe('Optional portal key to filter channels')
    },
    async ({ portal_key }) => {
      const result = await bayarcash.getChannels(portal_key);
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: Get FPX banks
  server.tool(
    'get_fpx_banks',
    'Get list of FPX banks for online banking payments',
    {},
    async () => {
      const result = await bayarcash.getFpxBanksList();
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Tool: Verify callback
  server.tool(
    'verify_callback',
    'Verify callback data from Bayarcash webhook',
    {
      callback_data: z.record(z.any()).describe('Callback data received from Bayarcash'),
      checksum: z.string().describe('Checksum received with the callback')
    },
    async ({ callback_data, checksum }) => {
      const isValid = bayarcash.verifyCallbackData(callback_data, checksum);
      return {
        content: [{ type: 'text', text: JSON.stringify({ valid: isValid }, null, 2) }]
      };
    }
  );

  // Tool: Create FPX Direct Debit Enrollment
  server.tool(
    'create_fpx_direct_debit_enrollment',
    'Create FPX Direct Debit enrollment intent',
    {
      order_number: z.string().describe('Unique order number'),
      payer_email: z.string().describe('Payer email address'),
      payer_name: z.string().describe('Payer name'),
      bank_code: z.string().describe('FPX bank code'),
      frequency: z.string().describe('Payment frequency (e.g., monthly, weekly)'),
      max_amount: z.number().describe('Maximum amount per transaction')
    },
    async ({ order_number, payer_email, payer_name, bank_code, frequency, max_amount }) => {
      const result = await bayarcash.createFpxDirectDebitEnrollmentIntent({
        order_number,
        payer_email,
        payer_name,
        bank_code,
        frequency,
        max_amount
      });
      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
      };
    }
  );

  // Resource: Portals
  server.resource(
    'portals',
    'bayarcash://portals',
    async () => {
      const portals = await bayarcash.getPortals();
      return {
        contents: [{
          uri: 'bayarcash://portals',
          text: JSON.stringify(portals, null, 2),
          mimeType: 'application/json'
        }]
      };
    }
  );

  // Resource: Channels
  server.resource(
    'channels',
    'bayarcash://channels',
    async () => {
      const channels = await bayarcash.getChannels();
      return {
        contents: [{
          uri: 'bayarcash://channels',
          text: JSON.stringify(channels, null, 2),
          mimeType: 'application/json'
        }]
      };
    }
  );

  // Resource: FPX Banks
  server.resource(
    'fpx-banks',
    'bayarcash://fpx-banks',
    async () => {
      const banks = await bayarcash.getFpxBanksList();
      return {
        contents: [{
          uri: 'bayarcash://fpx-banks',
          text: JSON.stringify(banks, null, 2),
          mimeType: 'application/json'
        }]
      };
    }
  );

  return server.server;
}
