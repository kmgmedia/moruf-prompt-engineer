# n8n Free Workflow Setup (Exact Match for Current Payload)

This workflow is designed for your current backend events:

- `lead.created`
- `lead.booked`

Target behavior:

1. `lead.created` -> send immediate email
2. wait 24h -> check status
3. if not booked -> send reminder
4. `lead.booked` -> update status so reminder is skipped

## 1) Use n8n Community (Free)

Run n8n locally (free):

```bash
npx n8n
```

n8n UI:

- `http://localhost:5678`

## 2) Set Your Local App Env

In `.env.local`, set:

- `CRM_WEBHOOK_URL=http://localhost:5678/webhook/lead-events`
- keep `APP_BASE_URL` and `BOOK_CALL_URL` as already configured for local

Restart your local API server after editing env.

## 3) Create One Workflow In n8n

Workflow name: `Lead Funnel Automation`

### Node A: Webhook - Lead Events

Type: `Webhook`

- Method: `POST`
- Path: `lead-events`
- Response mode: `On Received` (or `Respond: Immediately` in newer UI)

Important:

- In many n8n versions, `On Received` already returns HTTP `200` automatically.
- If you do not see separate `Response code` and `Response body` fields, that is normal.
- You can continue with the workflow as-is.

Optional (only if your UI shows these settings):

- Response code: `200`
- Response body: `{"ok":true}`

Optional fallback (if you need a custom response in all versions):

- Set Webhook to `Using Respond to Webhook Node`.
- Add a `Respond to Webhook` node right after Node B.
- In that node, set status code to `200` and body to `{"ok":true}`.

### Node B: Code - Normalize Payload

Type: `Code`
Paste:

```javascript
const payload = $json.body?.event ? $json.body : $json;

if (!payload?.event || !payload?.lead) {
  throw new Error("Invalid payload: expected { event, lead }");
}

const lead = payload.lead;
const email = String(lead.email || "")
  .trim()
  .toLowerCase();
if (!email) {
  throw new Error("Missing lead.email");
}

const event = String(payload.event);

return [
  {
    json: {
      event,
      waitHours: Number(payload.automation?.followUpRule?.waitHours || 24),
      lead: {
        email,
        name: lead.name || "there",
        projectType: lead.projectType || "not_sure",
        projectTypeLabel:
          lead.projectTypeLabel || lead.projectType || "project",
        description: lead.description || "Not provided",
        source:
          lead.source ||
          (event === "lead.booked" ? "book_call_form" : "chatbot"),
        status:
          lead.status || (event === "lead.booked" ? "booked" : "new_lead"),
        createdAt: lead.createdAt || new Date().toISOString(),
        bookedAt: event === "lead.booked" ? new Date().toISOString() : null,
      },
    },
  },
];
```

### Node C: Switch - Route by Event

Type: `Switch`

- Value to check: `={{$json.event}}`
- Case 1: `lead.created`
- Case 2: `lead.booked`

## 4) Branch: lead.created

### Node D: Data Store - Upsert Lead State (Created)

Type: `Data Store`

- Operation: `Upsert`
- Data Store name: `lead_state`
- Key: `={{$json.lead.email}}`
- Value:
  - `email: ={{$json.lead.email}}`
  - `name: ={{$json.lead.name}}`
  - `projectType: ={{$json.lead.projectType}}`
  - `projectTypeLabel: ={{$json.lead.projectTypeLabel}}`
  - `description: ={{$json.lead.description}}`
  - `status: ={{$json.lead.status}}`
  - `source: ={{$json.lead.source}}`
  - `createdAt: ={{$json.lead.createdAt}}`

### Node E: HTTP Request - Immediate Email (Resend)

Type: `HTTP Request`

- Method: `POST`
- URL: `https://api.resend.com/emails`
- Authentication: `None`
- Headers:
  - `Authorization: Bearer YOUR_RESEND_API_KEY`
  - `Content-Type: application/json`
- Send body: `JSON`
- Body:

```json
{
  "from": "support@morufadebola.com",
  "to": "={{$json.lead.email}}",
  "subject": "Quick follow-up on your project",
  "html": "<h2>Hey {{$json.lead.name}}</h2><p>Got your request about <strong>{{$json.lead.projectTypeLabel}}</strong>.</p><p>Looking forward to our call.</p><p>If there is anything else you would like me to review beforehand, feel free to reply here.</p><p>- Moruf</p>"
}
```

### Node F: Wait - 24 Hours

Type: `Wait`

- Wait amount: `={{$json.waitHours}}`
- Unit: `hours`

### Node G: Data Store - Get Lead State

Type: `Data Store`

- Operation: `Get`
- Data Store name: `lead_state`
- Key: `={{$json.lead.email}}`

### Node H: Code - Decide Reminder

Type: `Code`
Paste:

```javascript
const status = $json.status || $json.value?.status || "new_lead";
return [{ json: { ...$json, shouldRemind: status !== "booked" } }];
```

### Node I: IF - Not Booked?

Type: `IF`

- Condition: `={{$json.shouldRemind}}`
- Equals: `true`

### Node J: HTTP Request - Reminder Email (24h)

Type: `HTTP Request`

- Method: `POST`
- URL: `https://api.resend.com/emails`
- Headers:
  - `Authorization: Bearer YOUR_RESEND_API_KEY`
  - `Content-Type: application/json`
- Body JSON:

```json
{
  "from": "support@morufadebola.com",
  "to": "={{$json.email || $json.value?.email}}",
  "subject": "Just checking in - want to move forward with this?",
  "html": "<p>Hey {{$json.name || $json.value?.name || 'there'}},</p><p>Just checking in on your project request. If you want to move forward, reply to this email and I will send next steps.</p><p>- Moruf</p>"
}
```

## Example: Test Immediate Email (Node E)

To test your setup, you can use this payload in Node E:

```json
{
  "from": "support@morufadebola.com",
  "to": "morufbadebola@gmail.com",
  "subject": "Quick follow-up on your project",
  "html": "<h2>Test email</h2><p>n8n + Resend is working.</p>"
}
```

## 5) Branch: lead.booked

### Node K: Data Store - Upsert Lead State (Booked)

Type: `Data Store`

- Operation: `Upsert`
- Data Store name: `lead_state`
- Key: `={{$json.lead.email}}`
- Value:
  - `email: ={{$json.lead.email}}`
  - `name: ={{$json.lead.name}}`
  - `projectType: ={{$json.lead.projectType}}`
  - `status: booked`
  - `source: ={{$json.lead.source}}`
  - `bookedAt: ={{$json.lead.bookedAt || new Date().toISOString()}}`

This is what stops reminders: after the 24h wait, the created flow checks Data Store status, sees `booked`, and skips Node J.

## 6) Connections (exact order)

- A -> B -> C
- C (`lead.created`) -> D -> E -> F -> G -> H -> I
- I (true) -> J
- C (`lead.booked`) -> K

## 7) Test Payloads

### Test: lead.created

```json
{
  "event": "lead.created",
  "lead": {
    "name": "John",
    "email": "john@example.com",
    "projectType": "automation",
    "projectTypeLabel": "Automation System",
    "description": "Need to automate support workflow",
    "source": "chatbot",
    "status": "new_lead"
  },
  "automation": {
    "followUpRule": {
      "waitHours": 24
    }
  }
}
```

### Test: lead.booked

```json
{
  "event": "lead.booked",
  "lead": {
    "name": "John",
    "email": "john@example.com",
    "projectType": "automation",
    "source": "book_call_form",
    "status": "booked"
  }
}
```

## 8) Important

Do not send immediate follow-up from two places at once.

- If n8n sends immediate email (Node E), consider disabling duplicate immediate mail in backend to avoid double sends.
- Reminder email should stay in n8n only.

## 9) If You Cannot Find Data Store Node

Some n8n versions/workspaces do not show the Data Store node.
If that happens, do not use MongoDB for this setup unless you already have MongoDB configured.

Use Code node replacements for D, G, and K instead:

### D replacement: Code - Upsert Lead State (Created)

```javascript
const store = $getWorkflowStaticData("global");
if (!store.leadState) store.leadState = {};

store.leadState[$json.lead.email] = {
  email: $json.lead.email,
  name: $json.lead.name,
  projectType: $json.lead.projectType,
  projectTypeLabel: $json.lead.projectTypeLabel,
  description: $json.lead.description,
  status: $json.lead.status || "new_lead",
  source: $json.lead.source || "chatbot",
  createdAt: $json.lead.createdAt || new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

return [{ json: $json }];
```

### G replacement: Code - Get Lead State

```javascript
const store = $getWorkflowStaticData("global");
const leadState = (store.leadState || {})[$json.lead.email];

return [
  {
    json: {
      ...$json,
      value: leadState || null,
      status: leadState?.status || "new_lead",
      email: leadState?.email || $json.lead.email,
      name: leadState?.name || $json.lead.name || "there",
    },
  },
];
```

### K replacement: Code - Upsert Lead State (Booked)

```javascript
const store = $getWorkflowStaticData("global");
if (!store.leadState) store.leadState = {};

const existing = store.leadState[$json.lead.email] || {};

store.leadState[$json.lead.email] = {
  ...existing,
  email: $json.lead.email,
  name: $json.lead.name || existing.name || "there",
  projectType: $json.lead.projectType || existing.projectType || "not_sure",
  status: "booked",
  source: $json.lead.source || "book_call_form",
  bookedAt: $json.lead.bookedAt || new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

return [{ json: $json }];
```

Connections stay the same, only node types for D, G, K change from Data Store to Code.

Notes:

- This fallback is fine for local/single-instance n8n use.
- For team/production usage, upgrade to a version with Data Store node or use a real DB (Postgres/MySQL/MongoDB).
