# Usage Guide

This guide provides examples of how to use the Bayarcash MCP Server with AI assistants.

## Available Tools

### 1. create_payment_intent

Create a payment intent with intelligent guided workflow. The AI will automatically:
1. Ask if you want to reuse email from last payment
2. Show portals and ask which one to use
3. Show payment channels and ask which one to use
4. Ask if you want to include phone number

**Simple prompt:**
```
"Create a payment for RM 150"
```

**Advanced prompt (skip guidance):**
```
Create a payment:
- Order number: ORD-2025-001
- Amount: RM 150.00
- Payer email: customer@example.com
- Payer name: Ahmad Ibrahim
- Description: Product purchase
- Portal key: abc123xyz
- Payment channel: 1 (FPX)
- Phone: 60123456789
```

**Response includes:**
- Payment intent ID (e.g., `pi_pGwAaq`)
- Payment URL
- Order details
- AI stores the ID for later status checks

### 2. get_payment_intent

Get payment intent status by payment intent ID (not order number).

**Example prompt:**
```
"Check status of that payment"
"Get payment intent pi_pGwAaq"
```

**Returns:**
- Payment status (paid/pending/failed)
- All payment attempts (successful and unsuccessful)
- Payer details, timestamps
- Transaction IDs

### 3. get_transaction

Get transaction details by transaction ID.

**Example prompt:**
```
"Get transaction details for txn_abc123"
```

**Returns:**
- Transaction status and details
- Payment information
- Timestamps

### 4. get_transaction_by_order

Get transaction by order number.

**Example prompt:**
```
"Show me the transaction for order ORD-2025-001"
```

**Returns:**
- Transaction matching the order number
- Payment status and details

### 5. list_transactions

List transactions with optional filters. The AI will suggest filtering by email from your last payment.

**Example prompts:**
```
"List all successful transactions"
"Show me all pending transactions"
"Get transactions for customer@example.com"
"List all FPX payments"
"Show transactions paid via channel 1"
```

**Smart filtering:**
When you use list_transactions after creating a payment, the AI will ask:
```
"Would you like to filter by the email from your last payment: customer@example.com?"
```

**Filter by status code:**
Use status code (integer) not status string:
- 0 = New
- 1 = Pending
- 2 = Failed
- 3 = Success
- 4 = Cancelled

Example: Use `status: 3` for successful transactions (not "success")

**Filter by payment channel:**
Use channel ID (number) not channel code (string):
- Filter by FPX: use `payment_channel: 1` (not "fpx")
- Filter by DuitNow: use `payment_channel: 2` (not "duitnow")
- See all 10 channel IDs in get_payment_channels section

**Returns:**
- Paginated list of transactions
- Pagination metadata (first, last, previous, next page links)
- Transaction details for each entry

### 6. get_portals

Get list of available payment portals. Used during payment creation workflow.

**Example prompt:**
```
"Show me all available payment portals"
```

**Returns:**
- List of your payment portals
- Portal keys and configurations

### 7. get_payment_channels

Get list of available payment channels. Used during payment creation workflow.

**Example prompts:**
```
"List all payment channels"
"Show payment channels"
```

**Returns 10 channels:**
1. FPX - Online Banking (20+ banks)
2. DuitNow - QR payments
3. Boost - E-wallet
4. GrabPay - E-wallet
5. Touch 'n Go - E-wallet
6. ShopeePay - E-wallet
7. SPayLater - BNPL
8. Boost PayFlex - BNPL
9. QRIS - QR payments
10. NETS - Card payments

### 8. get_fpx_banks

Get list of FPX banks for online banking payments.

**Example prompt:**
```
"Show me all available FPX banks for online banking"
```

**Returns:**
- List of 20+ FPX banks
- Bank codes and names
- Active status

## Resources

The server also provides three resources that can be accessed:

### bayarcash://portals
Returns all available payment portals and their configurations.

### bayarcash://channels
Returns all available payment channels across portals.

### bayarcash://fpx-banks
Returns the list of FPX banks for online banking.

## Common Workflows

### Smart Payment Creation Flow

The AI guides you through the entire process:

1. **Simple request:**
   ```
   "Create a payment for RM 100"
   ```

2. **AI automatically:**
   - Asks: "Would you like to use the email from your last payment: test@example.com?"
   - Shows portals and asks you to select one
   - Shows payment channels (1-10) and asks you to select
   - Asks: "Would you like to provide a phone number?"
   - Creates payment and stores the payment intent ID

3. **Check status quickly:**
   ```
   "Check status of that payment"
   ```
   The AI uses the stored payment intent ID automatically.

### Advanced Payment Flow (Skip Guidance)

If you provide all details, the AI creates payment immediately:

```
"Create a payment for RM 250, order PAY-001,
email: john@example.com, name: John Tan,
description: Monthly subscription,
portal: my_portal_key, channel: 1"
```

### Transaction Monitoring

**View all transactions with smart filtering:**
```
"Show all transactions"
```
AI asks: "Filter by email from last payment: customer@example.com?"

**Filter by status (uses status codes):**
```
"List all successful transactions" (AI uses status: 3)
"Show pending payments" (AI uses status: 1)
"Show failed transactions" (AI uses status: 2)
```

Status codes: 0=New, 1=Pending, 2=Failed, 3=Success, 4=Cancelled

**Filter by payment channel (uses channel IDs):**
```
"List all FPX transactions" (AI uses payment_channel: 1)
"Show all e-wallet payments" (AI filters by channels 3-6)
```

**Filter by customer:**
```
"Show transactions for customer@example.com"
```

## Tips

1. **Use simple prompts** - Let the AI guide you through the workflow with "Create a payment for RM 100"
2. **Payment intent ID is stored** - After creating payment, just say "Check status of that payment"
3. **Status codes** - Remember: 0=New, 1=Pending, 2=Failed, 3=Success, 4=Cancelled (AI handles conversion)
4. **Payment channels by ID** - Remember: 1=FPX, 2=DuitNow, 3=Boost, 4=GrabPay, 5=TNG, 6=ShopeePay, etc.
5. **Always use unique order numbers** - Order numbers must be unique for each transaction
6. **Amounts in MYR** - All amounts are in Malaysian Ringgit (e.g., 100.50 for RM 100.50)
7. **Sandbox mode** - Use sandbox mode for testing before going live
8. **Smart filtering** - The AI remembers your last payment email for easy filtering

## Input Validation

The server automatically validates all inputs before sending to the API:

**Email Validation:**
- Must be valid email format
- Example: `customer@example.com` ✅
- Example: `invalid-email` ❌

**Phone Number Validation:**
- Must be Malaysian format: starts with 60
- Length: 11-12 digits
- Example: `60123456789` ✅
- Example: `0123456789` ❌ (must start with 60)
- Example: `123456789` ❌ (too short)

**Amount Validation:**
- Must be positive number
- Maximum 2 decimal places
- Example: `100.50` ✅
- Example: `100.555` ❌ (too many decimals)
- Example: `-50` ❌ (negative)

**Payment Channel Validation:**
- Must be integer between 1-10
- Example: `1` (FPX) ✅
- Example: `15` ❌ (out of range)

**Status Code Validation:**
- Must be integer between 0-4
- 0=New, 1=Pending, 2=Failed, 3=Success, 4=Cancelled
- Example: `3` (Success) ✅
- Example: `5` ❌ (invalid)

## Error Handling

The server provides clear error messages for validation and API errors:

**Validation Errors:**
```
Validation error: payer_email: Invalid email format
Validation error: payer_telephone_number: Invalid Malaysian phone number. Format: 60123456789
Validation error: amount: Amount can have maximum 2 decimal places
```

**API Errors:**
```
Bayarcash API Error (401): Authentication failed. Check your API token and secret key.
Bayarcash API Error (404): Resource not found.
Bayarcash API Error (422): Validation error. Check your request parameters.
Bayarcash API Error (500): Bayarcash server error. Please try again later.
```

**Common Issues:**

1. **API credentials** - Verify your API token and secret key are correct
2. **Portal key** - Ensure the portal key exists and is active
3. **Amount format** - Use numeric values (e.g., 100.50, not "RM 100.50")
4. **Email format** - Ensure email addresses are valid
5. **Phone format** - Must start with 60 for Malaysian numbers
6. **Order numbers** - Check for duplicate order numbers

## Support

For more information about the Bayarcash API, visit the [Bayarcash Documentation](https://bayar.cash).
