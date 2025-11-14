import axios, { AxiosInstance } from 'axios';

export interface BayarcashConfig {
  apiToken: string;
  apiSecretKey: string;
  useSandbox?: boolean;
  apiVersion?: 'v2' | 'v3';
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

export interface PaymentIntent {
  order_number: string;
  amount: number;
  payer_email: string;
  payer_name: string;
  description: string;
  portal_key: string;
  payment_channel?: number;
  payer_telephone_number?: number;
}

export interface Transaction {
  id: string;
  order_number: string;
  amount: number;
  status: string;
  payer_email: string;
  payer_name: string;
  payment_channel: string;
  reference_number?: string;
  created_at: string;
}

export class BayarcashClient {
  private apiToken: string;
  private apiSecretKey: string;
  private baseUrl: string;
  private apiVersion: 'v2' | 'v3';
  private axiosInstance: AxiosInstance;

  constructor(config: BayarcashConfig) {
    this.apiToken = config.apiToken;
    this.apiSecretKey = config.apiSecretKey;
    this.apiVersion = config.apiVersion || 'v3';

    // Set base URL based on sandbox mode and API version
    const sandbox = config.useSandbox !== false; // Default to sandbox

    if (sandbox) {
      // Sandbox URLs
      this.baseUrl = this.apiVersion === 'v3'
        ? 'https://api.console.bayarcash-sandbox.com/v3'
        : 'https://console.bayarcash-sandbox.com/api/v2';
    } else {
      // Production URLs
      this.baseUrl = this.apiVersion === 'v3'
        ? 'https://api.console.bayar.cash/v3'
        : 'https://console.bayar.cash/api/v2';
    }

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
   * Get available portals
   */
  async getPortals(): Promise<Portal[]> {
    const response = await this.axiosInstance.get('/portals');
    return response.data.data || response.data;
  }

  /**
   * Get payment channels
   */
  async getChannels(portalKey?: string): Promise<PaymentChannel[]> {
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
    const response = await this.axiosInstance.get('/fpx/banks');
    return response.data.data || response.data;
  }

  /**
   * Create payment intent
   */
  async createPaymentIntent(intent: PaymentIntent): Promise<any> {
    const response = await this.axiosInstance.post('/payment-intents', intent);
    return response.data;
  }

  /**
   * Get payment intent by payment intent ID (API v3 only)
   * The ID is returned when creating a payment intent (e.g., pi_pGwAaq or trx_z88ymJ)
   */
  async getPaymentIntent(paymentIntentId: string): Promise<any> {
    const response = await this.axiosInstance.get(`/payment-intents/${paymentIntentId}`);
    return response.data;
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<Transaction> {
    const response = await this.axiosInstance.get(`/transactions/${transactionId}`);
    return response.data.data || response.data;
  }

  /**
   * Get all transactions with optional filters and pagination
   * Returns paginated response with transaction data
   */
  async getAllTransactions(filters?: {
    status?: string;
    payment_channel?: string;
    payer_email?: string;
    order_number?: string;
    exchange_reference_number?: string;
    page?: number;
    per_page?: number;
  }): Promise<any> {
    const response = await this.axiosInstance.get('/transactions', { params: filters });
    return response.data;
  }

  /**
   * Get transaction by order number
   */
  async getTransactionByOrderNumber(orderNumber: string): Promise<Transaction> {
    const response = await this.axiosInstance.get(`/transactions/order/${orderNumber}`);
    return response.data.data || response.data;
  }

  /**
   * Get transactions by payer email
   */
  async getTransactionsByPayerEmail(email: string): Promise<Transaction[]> {
    return this.getAllTransactions({ payer_email: email });
  }

  /**
   * Get transactions by status
   */
  async getTransactionsByStatus(status: string): Promise<Transaction[]> {
    return this.getAllTransactions({ status });
  }

  /**
   * Get transactions by payment channel
   */
  async getTransactionsByPaymentChannel(channel: string): Promise<Transaction[]> {
    return this.getAllTransactions({ payment_channel: channel });
  }

  /**
   * Get transaction by reference number
   */
  async getTransactionByReferenceNumber(referenceNumber: string): Promise<Transaction> {
    const response = await this.axiosInstance.get(`/transactions/reference/${referenceNumber}`);
    return response.data.data || response.data;
  }
}
