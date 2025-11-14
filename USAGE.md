# Usage Guide

This guide provides examples of how to use the Bayarcash MCP Server with AI assistants.

## Available Tools

### 1. create_payment_intent

Create a new payment intent for processing payments.

**Example prompt:**
```
Create a payment intent with these details:
- Order number: ORD-2025-001
- Amount: RM 150.00
- Payer email: customer@example.com
- Payer name: Ahmad Ibrahim
- Description: Product purchase - Premium Package
- Portal key: my_portal_key
```

### 2. get_payment_intent

Retrieve details of a payment intent.

**Example prompt:**
```
Get the payment intent for order number ORD-2025-001
```

### 3. get_transaction

Get transaction details by transaction ID.

**Example prompt:**
```
Get transaction details for transaction ID: txn_abc123
```

### 4. get_transaction_by_order

Get transaction by order number.

**Example prompt:**
```
Show me the transaction for order ORD-2025-001
```

### 5. list_transactions

List transactions with various filters.

**Example prompts:**
```
List all successful transactions

Show me all pending transactions

Get transactions for customer@example.com

List transactions paid via FPX

Show me transactions from order ORD-2025-001
```

### 6. get_portals

Get available payment portals.

**Example prompt:**
```
Show me all available payment portals
```

### 7. get_payment_channels

Get available payment channels.

**Example prompts:**
```
List all payment channels

Show payment channels for portal key: my_portal_key
```

### 8. get_fpx_banks

Get list of FPX banks.

**Example prompt:**
```
Show me all available FPX banks for online banking
```

### 9. verify_callback

Verify webhook callback data.

**Example prompt:**
```
Verify this callback:
Data: {"order_number": "ORD-001", "status": "success", "amount": 100}
Checksum: abc123def456
```

### 10. create_fpx_direct_debit_enrollment

Create FPX Direct Debit enrollment.

**Example prompt:**
```
Create FPX Direct Debit enrollment:
- Order: DD-2025-001
- Email: customer@example.com
- Name: Siti Aminah
- Bank code: MBBEMYKL
- Frequency: monthly
- Max amount: RM 500
```

## Resources

The server also provides three resources that can be accessed:

### bayarcash://portals
Returns all available payment portals and their configurations.

### bayarcash://channels
Returns all available payment channels across portals.

### bayarcash://fpx-banks
Returns the list of FPX banks for online banking.

## Common Workflows

### Complete Payment Flow

1. **Get available portals and channels:**
   ```
   Show me available payment portals and channels
   ```

2. **Create payment intent:**
   ```
   Create a payment for RM 250 for order PAY-001,
   customer: john@example.com, name: John Tan,
   description: Monthly subscription, portal: my_portal_key
   ```

3. **Check payment status:**
   ```
   Get the transaction status for order PAY-001
   ```

### FPX Banking Flow

1. **Get FPX banks:**
   ```
   List all FPX banks
   ```

2. **Create payment with FPX:**
   ```
   Create payment intent for RM 100, order FPX-001,
   email: user@example.com, name: Lee Wei,
   description: Online purchase
   ```

### Transaction Monitoring

**Get successful transactions:**
```
List all successful transactions from today
```

**Filter by email:**
```
Show all transactions for customer@example.com
```

**Filter by payment channel:**
```
List all FPX transactions
```

## Tips

1. **Always use unique order numbers** - Order numbers should be unique for each transaction
2. **Amounts in MYR** - All amounts are in Malaysian Ringgit (e.g., 100.50 for RM 100.50)
3. **Sandbox mode** - Use sandbox mode for testing before going live
4. **Verify callbacks** - Always verify webhook callbacks using the verify_callback tool
5. **Check transaction status** - After creating a payment, check the transaction status to confirm payment

## Error Handling

If you encounter errors:

1. **API credentials** - Verify your API token and secret key are correct
2. **Portal key** - Ensure the portal key exists and is active
3. **Amount format** - Use numeric values (e.g., 100.50, not "RM 100.50")
4. **Email format** - Ensure email addresses are valid
5. **Order numbers** - Check for duplicate order numbers

## Support

For more information about the Bayarcash API, visit the [Bayarcash Documentation](https://bayar.cash).
