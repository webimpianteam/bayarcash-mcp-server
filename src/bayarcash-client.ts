import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';

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
  payment_channel?: string;
  payment_optional?: boolean;
  checksum?: string;
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
   * Generate checksum for payment intent
   */
  private generateChecksum(data: string): string {
    return crypto
      .createHmac('sha256', this.apiSecretKey)
      .update(data)
      .digest('hex');
  }

  /**
   * Get available portals
   */
  async getPortals(): Promise<Portal[]> {
    const response = await this.axiosInstance.get('/portals');
    return response.data.data || response.data;
  }

  /**
   * Get payment channels for a portal
   */
  async getChannels(portalKey?: string): Promise<PaymentChannel[]> {
    const url = portalKey ? `/portals/${portalKey}/channels` : '/channels';
    const response = await this.axiosInstance.get(url);
    return response.data.data || response.data;
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
    // Generate checksum if secret key is available
    if (this.apiSecretKey && !intent.checksum) {
      const checksumData = `${intent.order_number}|${intent.amount}|${intent.payer_email}`;
      intent.checksum = this.generateChecksum(checksumData);
    }

    const response = await this.axiosInstance.post('/payment-intents', intent);
    return response.data;
  }

  /**
   * Get payment intent by order number
   */
  async getPaymentIntent(orderNumber: string): Promise<any> {
    const response = await this.axiosInstance.get(`/payment-intents/${orderNumber}`);
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
   * Get all transactions with optional filters
   */
  async getAllTransactions(filters?: {
    status?: string;
    payment_channel?: string;
    payer_email?: string;
    order_number?: string;
    reference_number?: string;
    page?: number;
    per_page?: number;
  }): Promise<Transaction[]> {
    const response = await this.axiosInstance.get('/transactions', { params: filters });
    return response.data.data || response.data;
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

  /**
   * Verify callback data
   */
  verifyCallbackData(data: Record<string, any>, receivedChecksum: string): boolean {
    // Sort keys and create verification string
    const sortedKeys = Object.keys(data).sort();
    const verificationString = sortedKeys
      .map(key => `${key}=${data[key]}`)
      .join('|');

    const calculatedChecksum = this.generateChecksum(verificationString);
    return calculatedChecksum === receivedChecksum;
  }

  /**
   * Create FPX Direct Debit Enrollment Intent
   */
  async createFpxDirectDebitEnrollmentIntent(data: {
    order_number: string;
    payer_email: string;
    payer_name: string;
    bank_code: string;
    frequency: string;
    max_amount: number;
  }): Promise<any> {
    const response = await this.axiosInstance.post('/fpx/direct-debit/enrollment', data);
    return response.data;
  }

  /**
   * Create FPX Direct Debit Maintenance Intent
   */
  async createFpxDirectDebitMaintenanceIntent(data: {
    mandate_reference: string;
    action: 'suspend' | 'resume' | 'update';
  }): Promise<any> {
    const response = await this.axiosInstance.post('/fpx/direct-debit/maintenance', data);
    return response.data;
  }

  /**
   * Create FPX Direct Debit Termination Intent
   */
  async createFpxDirectDebitTerminationIntent(data: {
    mandate_reference: string;
    reason?: string;
  }): Promise<any> {
    const response = await this.axiosInstance.post('/fpx/direct-debit/termination', data);
    return response.data;
  }
}
