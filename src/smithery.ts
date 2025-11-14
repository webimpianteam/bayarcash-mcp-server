import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { BayarcashClient, BayarcashConfig } from './bayarcash-client.js';

// Configuration schema for Smithery
export const configSchema = z.object({
  apiToken: z.string().describe('Your Bayarcash API Token from console.bayar.cash. Required for authentication.'),
  apiSecretKey: z.string().describe('Your Bayarcash API Secret Key. Used for checksum generation and webhook verification.'),
  useSandbox: z.boolean().default(true).optional().describe('Enable sandbox mode for testing. Defaults to true. Set to false for production.'),
  apiVersion: z.enum(['v2', 'v3']).default('v3').optional().describe('Bayarcash API version. v3 is recommended for new integrations.')
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
    'Create a new payment intent for processing payments through Bayarcash. Returns payment URL and order details. WORKFLOW: 1) If user has NOT provided portal_key, call get_portals first to show list and ask user to select. 2) If user has NOT specified payment channel, call get_payment_channels to show list and ask user to select. 3) Ask user if they want to provide payer telephone number (optional, Malaysia numbers only). 4) If user already provided portal_key and/or payment_channel in their message, use those values directly without asking again.',
    {
      order_number: z.string().describe('Unique order number for this payment. Must be unique across all transactions. Example: ORD-001'),
      amount: z.number().positive().describe('Payment amount in Malaysian Ringgit (MYR). Must be positive. Example: 100.50 for RM100.50'),
      payer_email: z.string().email().describe('Valid email address of the payer. Used for payment notifications.'),
      payer_name: z.string().min(1).describe('Full name of the payer. Required for transaction records.'),
      description: z.string().min(1).describe('Description of what the payment is for. Shown to customer during payment.'),
      portal_key: z.string().describe('Portal key from the portal selected by user. Get this from get_portals API call.'),
      payment_channel: z.number().int().positive().default(1).optional().describe('Payment channel ID (integer). Get this from user selection after showing get_payment_channels list. Examples: 1=FPX, 2=DuitNow, 3=Boost, 4=GrabPay, 5=TNG, 6=ShopeePay.'),
      payer_telephone_number: z.number().int().positive().optional().describe('Payer phone number (integer, Malaysia numbers only). Ask user: "Would you like to provide a phone number?" If yes, collect the number in format 60123456789 (without spaces or dashes). If no, skip this field.')
    },
    async ({ order_number, amount, payer_email, payer_name, description, portal_key, payment_channel, payer_telephone_number }) => {
      const result = await bayarcash.createPaymentIntent({
        order_number,
        amount,
        payer_email,
        payer_name,
        description,
        portal_key,
        payment_channel,
        payer_telephone_number
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
    'List all transactions with optional filters. Returns paginated transaction data.',
    {
      status: z.string().optional().describe('Filter by transaction status. Common values: success, pending, failed'),
      payment_channel: z.string().optional().describe('Filter by payment channel code. Examples: fpx, duitnow, boost, grabpay'),
      payer_email: z.string().email().optional().describe('Filter by exact payer email address'),
      order_number: z.string().optional().describe('Filter by exact order number'),
      page: z.number().positive().optional().describe('Page number for pagination. Defaults to 1'),
      per_page: z.number().positive().max(100).optional().describe('Number of items per page. Maximum 100. Defaults to 20')
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

  // Add prompts for common workflows
  server.prompt(
    'create-test-payment',
    'Create a test payment in sandbox',
    async () => {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: 'First check my available payment portals and channels. Then create a test payment intent for RM 10.00 using payment channel ID "1" (FPX). Use order number TEST-001, email test@example.com, name Test User, and description "Test payment".'
          }
        }]
      };
    }
  );

  server.prompt(
    'check-portals',
    'View available payment portals and channels',
    async () => {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: 'Show me all available payment portals and their supported payment channels.'
          }
        }]
      };
    }
  );

  server.prompt(
    'list-fpx-banks',
    'View FPX banks for online banking',
    async () => {
      return {
        messages: [{
          role: 'user',
          content: {
            type: 'text',
            text: 'List all available FPX banks for online banking payments.'
          }
        }]
      };
    }
  );

  return server.server;
}
