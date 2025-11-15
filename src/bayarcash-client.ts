import axios, { AxiosInstance, AxiosError } from 'axios';

export interface BayarcashConfig {
  apiToken: string;
  apiSecretKey: string;
  useSandbox?: boolean;
}

export interface Portal {
  id: string;
  name: string;
  channels: PaymentChannel[];
}

export interface PaymentChannel {
  id: string;
  name: string;
  code: string;
}

export interface FpxBank {
  code: string;
  name: string;
  active: boolean;
}

export interface PaymentIntentRequest {
  order_number: string;
  amount: number;
  payer_email: string;
  payer_name: string;
  description: string;
  portal_key: string;
  payment_channel?: number;
  payer_telephone_number?: number;
}

// API v3 Response Types
export interface PaymentIntentResponse {
  type: string;
  id: string;
  payer_name: string;
  payer_email: string;
  payer_telephone_number?: string;
  order_number: string;
  amount: string;
  url: string;
}

export interface TransactionAttempt {
  transaction_id: string;
  created_at: string;
  payer_name: string;
  payer_email: string;
  payer_telephone_number?: string;
  order_number: string;
  currency: string;
  amount: string;
  exchange_reference_number?: string;
  exchange_transaction_id?: string;
  payer_bank_name?: string;
  status: number;
  status_description: string;
  payment_gateway?: {
    id: number;
    name: string;
    code: string;
  };
}

export interface PaymentIntentDetailResponse {
  type: string;
  id: string;
  status: string;
  last_attempt?: string;
  paid_at?: string;
  order_number: string;
  amount: string;
  currency: string;
  payer_name: string;
  payer_email: string;
  payer_telephone_number?: string;
  attempts: TransactionAttempt[];
}

export interface Transaction {
  id: string;
  updated_at: string;
  datetime: string;
  order_number: string;
  payer_name: string;
  payer_email: string;
  payer_telephone_number?: string;
  currency: string;
  amount: number;
  exchange_reference_number?: string;
  exchange_transaction_id?: string;
  payer_bank_name?: string;
  status: number; // Status code: 0=New, 1=Pending, 2=Failed, 3=Success, 4=Cancelled
  status_description: string;
  return_url?: string;
  metadata?: any;
  payout?: {
    reference_number: string;
  };
  payment_gateway?: {
    id?: number;
    name: string;
    code: string;
  };
  portal?: string;
  merchant?: {
    name: string;
    email: string;
  };
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}

export interface TransactionsResponse {
  data: Transaction[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

export class BayarcashError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public responseData?: any
  ) {
    super(message);
    this.name = 'BayarcashError';
  }
}

export class BayarcashClient {
  private apiToken: string;
  private apiSecretKey: string;
  private baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(config: BayarcashConfig) {
    this.apiToken = config.apiToken;
    this.apiSecretKey = config.apiSecretKey;

    // Always use API v3
    const sandbox = config.useSandbox !== false; // Default to sandbox
    this.baseUrl = sandbox
      ? 'https://api.console.bayarcash-sandbox.com/v3'
      : 'https://api.console.bayar.cash/v3';

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  /**
   * Handle axios errors and convert to BayarcashError
   */
  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status;
      const responseData = axiosError.response?.data;

      let message = 'Bayarcash API error';

      if (statusCode === 401) {
        message = 'Authentication failed. Check your API token and secret key.';
      } else if (statusCode === 404) {
        message = 'Resource not found.';
      } else if (statusCode === 422) {
        message = 'Validation error. Check your request parameters.';
      } else if (statusCode === 500) {
        message = 'Bayarcash server error. Please try again later.';
      } else if (axiosError.message) {
        message = axiosError.message;
      }

      throw new BayarcashError(message, statusCode, responseData);
    }

    if (error instanceof Error) {
      throw new BayarcashError(error.message);
    }

    throw new BayarcashError('Unknown error occurred');
  }

  /**
   * Get available portals
   */
  async getPortals(): Promise<Portal[]> {
    try {
      const response = await this.axiosInstance.get('/portals');
      return response.data.data || response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get payment channels (hardcoded list)
   * These channels are maintained as constants as per requirements
   */
  async getChannels(portalKey?: string): Promise<PaymentChannel[]> {
    // Return hardcoded payment channels
    return [
      { id: '1', name: 'FPX', code: 'fpx' },
      { id: '2', name: 'DuitNow', code: 'duitnow' },
      { id: '3', name: 'Boost', code: 'boost' },
      { id: '4', name: 'GrabPay', code: 'grabpay' },
      { id: '5', name: 'Touch n Go', code: 'tng' },
      { id: '6', name: 'ShopeePay', code: 'shopeepay' },
      { id: '7', name: 'SPayLater', code: 'spaylater' },
      { id: '8', name: 'Boost PayFlex', code: 'boostpayflex' },
      { id: '9', name: 'QRIS', code: 'qris' },
      { id: '10', name: 'NETS', code: 'nets' }
    ];
  }

  /**
   * Get FPX banks list
   */
  async getFpxBanksList(): Promise<FpxBank[]> {
    try {
      const response = await this.axiosInstance.get('/fpx/banks');
      return response.data.data || response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Create payment intent
   * Returns payment intent ID and URL for customer redirection
   */
  async createPaymentIntent(intent: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    try {
      const response = await this.axiosInstance.post('/payment-intents', intent);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get payment intent by payment intent ID
   * Returns detailed payment intent with all transaction attempts
   * @param paymentIntentId The ID returned when creating a payment intent (e.g., pi_pGwAaq)
   */
  async getPaymentIntent(paymentIntentId: string): Promise<PaymentIntentDetailResponse> {
    try {
      const response = await this.axiosInstance.get(`/payment-intents/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<Transaction> {
    try {
      const response = await this.axiosInstance.get(`/transactions/${transactionId}`);
      return response.data.data || response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get all transactions with optional filters and pagination
   * Returns paginated response with transaction data, links, and meta
   */
  async getAllTransactions(filters?: {
    status?: number;
    payment_channel?: number;
    payer_email?: string;
    order_number?: string;
    exchange_reference_number?: string;
    page?: number;
    per_page?: number;
  }): Promise<TransactionsResponse> {
    try {
      const response = await this.axiosInstance.get('/transactions', { params: filters });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get transaction by order number
   */
  async getTransactionByOrderNumber(orderNumber: string): Promise<Transaction> {
    try {
      const response = await this.axiosInstance.get(`/transactions/order/${orderNumber}`);
      return response.data.data || response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Get transactions by payer email
   */
  async getTransactionsByPayerEmail(email: string): Promise<TransactionsResponse> {
    return this.getAllTransactions({ payer_email: email });
  }

  /**
   * Get transactions by status
   * @param status Status code: 0=New, 1=Pending, 2=Failed, 3=Success, 4=Cancelled
   */
  async getTransactionsByStatus(status: number): Promise<TransactionsResponse> {
    return this.getAllTransactions({ status });
  }

  /**
   * Get transactions by payment channel
   */
  async getTransactionsByPaymentChannel(channel: number): Promise<TransactionsResponse> {
    return this.getAllTransactions({ payment_channel: channel });
  }

  /**
   * Get transaction by reference number
   */
  async getTransactionByReferenceNumber(referenceNumber: string): Promise<Transaction> {
    try {
      const response = await this.axiosInstance.get(`/transactions/reference/${referenceNumber}`);
      return response.data.data || response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}
