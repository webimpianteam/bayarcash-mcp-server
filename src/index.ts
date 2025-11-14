#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ErrorCode,
  McpError
} from '@modelcontextprotocol/sdk/types.js';
import { BayarcashClient, BayarcashConfig } from './bayarcash-client.js';

// Get configuration from environment variables
const API_TOKEN = process.env.BAYARCASH_API_TOKEN;
const API_SECRET_KEY = process.env.BAYARCASH_API_SECRET_KEY;
const USE_SANDBOX = process.env.BAYARCASH_SANDBOX !== 'false';
const API_VERSION = (process.env.BAYARCASH_API_VERSION as 'v2' | 'v3') || 'v3';

if (!API_TOKEN || !API_SECRET_KEY) {
  console.error('Error: BAYARCASH_API_TOKEN and BAYARCASH_API_SECRET_KEY environment variables are required');
  process.exit(1);
}

const bayarcashConfig: BayarcashConfig = {
  apiToken: API_TOKEN,
  apiSecretKey: API_SECRET_KEY,
  useSandbox: USE_SANDBOX,
  apiVersion: API_VERSION
};

const bayarcash = new BayarcashClient(bayarcashConfig);

// Create MCP server
const server = new Server(
  {
    name: 'bayarcash-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
      resources: {}
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'create_payment_intent',
        description: 'Create a new payment intent for processing payments through Bayarcash. Returns payment intent ID in response. WORKFLOW: 1) If user did not provide payer_email, call list_transactions (per_page=1) to get latest email and ask: "Use email from last payment: {email}?" 2) If user did not provide portal_key, call get_portals and ask user to select. 3) If user did not specify payment channel, call get_payment_channels and ask user to select. 4) Ask if they want to provide phone number (optional). IMPORTANT: Store the returned "id" field (e.g., pi_pGwAaq) to check payment status later.',
        inputSchema: {
          type: 'object',
          properties: {
            order_number: {
              type: 'string',
              description: 'Unique order number for this payment'
            },
            amount: {
              type: 'number',
              description: 'Payment amount in MYR (e.g., 100.50)'
            },
            payer_email: {
              type: 'string',
              description: 'Email address of the payer. If not provided, get latest transaction email and ask user if they want to use it.'
            },
            payer_name: {
              type: 'string',
              description: 'Name of the payer'
            },
            description: {
              type: 'string',
              description: 'Description of the payment'
            },
            portal_key: {
              type: 'string',
              description: 'Portal key selected by user from get_portals list'
            },
            payment_channel: {
              type: 'number',
              description: 'Payment channel ID selected by user from get_payment_channels list. Examples: 1=FPX, 2=DuitNow, 3=Boost, 4=GrabPay.'
            },
            payer_telephone_number: {
              type: 'number',
              description: 'Payer phone number (integer, Malaysia numbers only). Ask user: "Would you like to provide a phone number?" Format: 60123456789'
            }
          },
          required: ['order_number', 'amount', 'payer_email', 'payer_name', 'description', 'portal_key']
        }
      },
      {
        name: 'get_payment_intent',
        description: 'Get payment intent details and status by payment intent ID. Returns comprehensive payment history including all attempts.',
        inputSchema: {
          type: 'object',
          properties: {
            payment_intent_id: {
              type: 'string',
              description: 'Payment intent ID from create_payment_intent response (e.g., pi_pGwAaq, trx_z88ymJ). This is the "id" field.'
            }
          },
          required: ['payment_intent_id']
        }
      },
      {
        name: 'get_transaction',
        description: 'Get transaction details by transaction ID',
        inputSchema: {
          type: 'object',
          properties: {
            transaction_id: {
              type: 'string',
              description: 'Transaction ID to retrieve'
            }
          },
          required: ['transaction_id']
        }
      },
      {
        name: 'get_transaction_by_order',
        description: 'Get transaction details by order number',
        inputSchema: {
          type: 'object',
          properties: {
            order_number: {
              type: 'string',
              description: 'Order number to retrieve'
            }
          },
          required: ['order_number']
        }
      },
      {
        name: 'list_transactions',
        description: 'List all transactions with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Filter by transaction status (e.g., success, pending, failed)'
            },
            payment_channel: {
              type: 'string',
              description: 'Filter by payment channel'
            },
            payer_email: {
              type: 'string',
              description: 'Filter by payer email'
            },
            order_number: {
              type: 'string',
              description: 'Filter by order number'
            },
            reference_number: {
              type: 'string',
              description: 'Filter by reference number'
            },
            page: {
              type: 'number',
              description: 'Page number for pagination'
            },
            per_page: {
              type: 'number',
              description: 'Number of items per page'
            }
          }
        }
      },
      {
        name: 'get_portals',
        description: 'Get list of available payment portals',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      },
      {
        name: 'get_payment_channels',
        description: 'Get list of available payment channels',
        inputSchema: {
          type: 'object',
          properties: {
            portal_key: {
              type: 'string',
              description: 'Optional portal key to filter channels'
            }
          }
        }
      },
      {
        name: 'get_fpx_banks',
        description: 'Get list of FPX banks for online banking payments',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    if (!args) {
      throw new McpError(ErrorCode.InvalidParams, 'Missing arguments');
    }

    switch (name) {
      case 'create_payment_intent': {
        const result = await bayarcash.createPaymentIntent({
          order_number: args.order_number as string,
          amount: args.amount as number,
          payer_email: args.payer_email as string,
          payer_name: args.payer_name as string,
          description: args.description as string,
          portal_key: args.portal_key as string,
          payment_channel: args.payment_channel as number | undefined,
          payer_telephone_number: args.payer_telephone_number as number | undefined
        });
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'get_payment_intent': {
        const result = await bayarcash.getPaymentIntent(args.payment_intent_id as string);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'get_transaction': {
        const result = await bayarcash.getTransaction(args.transaction_id as string);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'get_transaction_by_order': {
        const result = await bayarcash.getTransactionByOrderNumber(args.order_number as string);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'list_transactions': {
        const result = await bayarcash.getAllTransactions(args as any);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'get_portals': {
        const result = await bayarcash.getPortals();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'get_payment_channels': {
        const result = await bayarcash.getChannels(args.portal_key as string | undefined);
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      case 'get_fpx_banks': {
        const result = await bayarcash.getFpxBanksList();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${name}`
        );
    }
  } catch (error: any) {
    throw new McpError(
      ErrorCode.InternalError,
      `Error executing tool: ${error.message}`
    );
  }
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'bayarcash://portals',
        mimeType: 'application/json',
        name: 'Available Payment Portals',
        description: 'List of all available payment portals and their configurations'
      },
      {
        uri: 'bayarcash://channels',
        mimeType: 'application/json',
        name: 'Payment Channels',
        description: 'List of all available payment channels across all portals'
      },
      {
        uri: 'bayarcash://fpx-banks',
        mimeType: 'application/json',
        name: 'FPX Banks',
        description: 'List of FPX banks available for online banking payments'
      }
    ]
  };
});

// Handle resource reads
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    switch (uri) {
      case 'bayarcash://portals': {
        const portals = await bayarcash.getPortals();
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(portals, null, 2)
            }
          ]
        };
      }

      case 'bayarcash://channels': {
        const channels = await bayarcash.getChannels();
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(channels, null, 2)
            }
          ]
        };
      }

      case 'bayarcash://fpx-banks': {
        const banks = await bayarcash.getFpxBanksList();
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(banks, null, 2)
            }
          ]
        };
      }

      default:
        throw new McpError(
          ErrorCode.InvalidRequest,
          `Unknown resource: ${uri}`
        );
    }
  } catch (error: any) {
    throw new McpError(
      ErrorCode.InternalError,
      `Error reading resource: ${error.message}`
    );
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Bayarcash MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
