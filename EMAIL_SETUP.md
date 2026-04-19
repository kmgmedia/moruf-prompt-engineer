# Email Notification Setup Guide

This guide walks you through setting up email notifications for the "Book a Call" form using Resend.

## Step 1: Get Your Resend API Key

1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys in your dashboard
4. Create a new API key
5. Copy the key (starts with `re_`)

## Step 2: Create Environment File

1. Copy `.env.example` to `.env` in the project root
2. Replace `re_xxxxxxxxxxxxxxxxxxxx` with your actual Resend API key
3. Example:
   ```
   RESEND_API_KEY=re_abc123def456...
   PORT=3001
   ```

## Step 3: Update Your Email

In `server.ts`, update this line with your actual email:

```typescript
const YOUR_EMAIL = "your-email@example.com";
```

## Step 4: Run Both Servers

You can run the development and API servers together:

```bash
npm run dev:all
```

Or run them separately in different terminals:

```bash
# Terminal 1: Vite dev server
npm run dev

# Terminal 2: API server
npm run dev:server
```

## What Happens When Someone Submits

1. **Email to You**: You receive the form submission with their details
2. **Confirmation to Them**: They get a confirmation email
3. **Loads**: The form shows a loading state while submitting
4. **Errors**: If something fails, users see an error message

## API Endpoint

- **URL**: `http://localhost:3001/api/book-call`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "projectType": "chatbot",
    "description": "I need an AI chatbot..."
  }
  ```

## Troubleshooting

**"Failed to submit" error**:

- Make sure the API server is running (`npm run dev:server`)
- Check that your Resend API key is valid in `.env`

**Not receiving emails**:

- Verify your email is correct in `server.ts`
- Check Resend's spam folder
- Check Resend dashboard for delivery status

**"Missing RESEND_API_KEY"**:

- Create `.env` file (copy from `.env.example`)
- Add your actual Resend API key
- Restart the server

## Email Templates

The current setup sends:

1. **To You**: Full form details with timestamp
2. **To Customer**: Friendly confirmation with next steps

You can customize these in `server.ts` by editing the HTML in the `resend.emails.send()` calls.

## Notes

- Resend's free tier includes 100 emails/day
- The form is disabled while submitting to prevent double submissions
- All required fields are validated before sending
- Email sending happens server-side for security
