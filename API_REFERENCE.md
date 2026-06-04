# API ENDPOINTS REFERENCE

## 🔗 Base URL
- Local: `http://localhost:5000`
- Production: `https://your-app-name.herokuapp.com` or `https://zaki.com`

---

## 📋 PROPOSALS API

### 1. Submit Brand Proposal
**Endpoint:** `POST /api/proposals/submit`

**Description:** Submit a new brand proposal request

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@company.com",
  "company": "Acme Corporation",
  "budget": "50k+",
  "goals": "Increase brand awareness among Gen Z"
}
```

**Budget Options:**
- `10k-25k` - $10,000 - $25,000
- `25k-50k` - $25,000 - $50,000
- `50k+` - $50,000+

**Response (Success):**
```json
{
  "success": true,
  "message": "Proposal submitted successfully!",
  "proposalId": "507f1f77bcf86cd799439011"
}
```

**Response (Error):**
```json
{
  "error": "All fields are required",
  "success": false
}
```

**HTTP Status:**
- 201 - Created (success)
- 400 - Bad Request (validation error)
- 500 - Server Error

**Example with cURL:**
```bash
curl -X POST http://localhost:5000/api/proposals/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@company.com",
    "company":"Acme Inc",
    "budget":"50k+",
    "goals":"Reach Gen Z"
  }'
```

**Example with JavaScript:**
```javascript
const response = await fetch('/api/proposals/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@company.com',
    company: 'Acme Inc',
    budget: '50k+',
    goals: 'Increase brand awareness'
  })
});
const data = await response.json();
```

---

### 2. Get All Proposals (Admin)
**Endpoint:** `GET /api/proposals`

**Description:** Retrieve all proposals (admin only)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@company.com",
      "company": "Acme Inc",
      "budget": "50k+",
      "goals": "Increase brand awareness",
      "status": "pending",
      "notes": "",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

**HTTP Status:**
- 200 - Success
- 500 - Server Error

---

### 3. Get Single Proposal
**Endpoint:** `GET /api/proposals/:id`

**Description:** Get details of a specific proposal

**Parameters:**
- `id` (string, required) - Proposal ID

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@company.com",
    "company": "Acme Inc",
    "budget": "50k+",
    "goals": "Increase brand awareness",
    "status": "pending",
    "notes": "",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Example:**
```bash
curl http://localhost:5000/api/proposals/507f1f77bcf86cd799439011
```

---

### 4. Update Proposal Status
**Endpoint:** `PUT /api/proposals/:id`

**Description:** Update proposal status and notes

**Parameters:**
- `id` (string, required) - Proposal ID

**Request Body:**
```json
{
  "status": "contacted",
  "notes": "Scheduled call for next Tuesday"
}
```

**Status Options:**
- `pending` - Initial submission
- `contacted` - Team has reached out
- `in-progress` - Actively negotiating
- `completed` - Deal closed

**Response:**
```json
{
  "success": true,
  "message": "Proposal updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "status": "contacted",
    "notes": "Scheduled call for next Tuesday",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

**Example:**
```bash
curl -X PUT http://localhost:5000/api/proposals/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contacted",
    "notes": "Scheduled call"
  }'
```

---

### 5. Get Proposals Statistics
**Endpoint:** `GET /api/proposals/statistics`

**Description:** Get summary statistics of all proposals

**Response:**
```json
{
  "success": true,
  "statistics": {
    "totalProposals": 10,
    "pendingProposals": 3,
    "contactedProposals": 5,
    "completedProposals": 2
  }
}
```

**Example:**
```bash
curl http://localhost:5000/api/proposals/statistics
```

---

### 6. Submit Contact Form
**Endpoint:** `POST /api/proposals/contact`

**Description:** Submit general contact/inquiry form

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Partnership Inquiry",
  "message": "I'm interested in collaborating with your platform"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us. We will get back to you soon!",
  "contactId": "507f1f77bcf86cd799439012"
}
```

---

## 👥 AUTHENTICATION API (Ready for Implementation)

### Register New User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "userType": "brand"
}
```

**User Types:**
- `brand` - Brand/Company account
- `influencer` - Creator/Influencer account
- `admin` - Administrator account

---

### Login User
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

---

### Logout User
**Endpoint:** `POST /api/auth/logout`

---

## 🎯 CAMPAIGNS API

### Get All Campaigns
**Endpoint:** `GET /api/campaigns`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Summer Fashion Campaign",
      "description": "Multi-platform campaign",
      "brand": "507f1f77bcf86cd799439014",
      "influencers": ["507f1f77bcf86cd799439015"],
      "budget": 50000,
      "status": "active",
      "roi": 245,
      "impressions": 2400000,
      "engagementRate": 5.2
    }
  ]
}
```

---

### Get Campaign Details
**Endpoint:** `GET /api/campaigns/:id`

---

### Create Campaign
**Endpoint:** `POST /api/campaigns`

**Request Body:**
```json
{
  "title": "Summer Fashion Campaign",
  "description": "Multi-platform campaign",
  "budget": 50000,
  "category": "fashion",
  "duration": {
    "startDate": "2024-06-01",
    "endDate": "2024-08-31"
  }
}
```

---

### Update Campaign
**Endpoint:** `PUT /api/campaigns/:id`

---

## 📧 EMAIL API

### Get Email Templates
**Endpoint:** `GET /api/email/templates`

**Response:**
```json
{
  "success": true,
  "templates": [
    "proposal",
    "contact",
    "campaign_update"
  ]
}
```

---

## 🏥 HEALTH CHECK API

### System Health Check
**Endpoint:** `GET /api/health`

**Response:**
```json
{
  "status": "ok",
  "message": "Influencer Elite API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## 🔐 AUTHENTICATION

### JWT Token
Include in header for protected routes:
```
Authorization: Bearer your-jwt-token-here
```

### Example Protected Request:
```bash
curl http://localhost:5000/api/protected-endpoint \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## ❌ ERROR RESPONSES

### 400 - Bad Request
```json
{
  "error": "All fields are required",
  "success": false
}
```

### 404 - Not Found
```json
{
  "error": "Proposal not found",
  "success": false
}
```

### 500 - Server Error
```json
{
  "error": "Internal Server Error",
  "success": false,
  "details": "Error message here"
}
```

---

## 📝 REQUEST/RESPONSE EXAMPLES

### cURL Examples

**Submit Proposal:**
```bash
curl -X POST http://localhost:5000/api/proposals/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName":"John",
    "lastName":"Doe",
    "email":"john@company.com",
    "company":"Acme",
    "budget":"50k+",
    "goals":"Increase reach"
  }'
```

**Get All Proposals:**
```bash
curl http://localhost:5000/api/proposals
```

**Update Proposal:**
```bash
curl -X PUT http://localhost:5000/api/proposals/ID \
  -H "Content-Type: application/json" \
  -d '{"status":"contacted","notes":"Called client"}'
```

---

### JavaScript/Fetch Examples

**Submit Proposal:**
```javascript
async function submitProposal(data) {
  const response = await fetch('/api/proposals/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

// Usage
const result = await submitProposal({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@company.com',
  company: 'Acme',
  budget: '50k+',
  goals: 'Increase brand awareness'
});
```

**Get Proposals:**
```javascript
async function getProposals() {
  const response = await fetch('/api/proposals');
  return await response.json();
}
```

**Update Proposal:**
```javascript
async function updateProposal(id, data) {
  const response = await fetch(`/api/proposals/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}
```

---

## 🧪 TESTING THE API

### Test Locally
```bash
# Terminal 1: Start server
npm start

# Terminal 2: Test endpoint
curl http://localhost:5000/api/health
```

### Postman Collection
Import this into Postman for easy testing:

```json
{
  "info": {
    "name": "Influencer Elite API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Submit Proposal",
      "request": {
        "method": "POST",
        "url": "{{base_url}}/api/proposals/submit",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@company.com\",\"company\":\"Acme\",\"budget\":\"50k+\",\"goals\":\"Increase reach\"}"
        }
      }
    }
  ]
}
```

---

## 📞 SUPPORT

For API questions or issues:
- Email: aalimuhammad236@gmail.com
- Check: README.md and DEPLOYMENT.md
- Test with: `curl http://localhost:5000/api/health`

---

**API Version:** 1.0.0
**Last Updated:** 2024
**Status:** Production Ready
