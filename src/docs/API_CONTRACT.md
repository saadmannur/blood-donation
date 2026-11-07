# API contract the frontend pages expect

All responses are JSON. Errors: `{ "message": "..." }` with a proper HTTP status (the UI shows `message` in a toast).
Lists are returned as plain arrays. Related data is **flattened** (e.g. donor rows include `name`, `email`, `phone` from the user).
Every endpoint must check the session and role on the server. The dashboard layouts only protect the pages.

## Public

| Method | Endpoint | Returns |
|---|---|---|
| GET | `/api/donors?bloodGroup=&city=&area=` | `[{ _id, bloodGroup, city, area, availability }]` approved donors only, **no phone or email** |
| GET | `/api/requests?public=1` | `[{ _id, bloodGroup, urgency, bagsRequired, hospitalName, city, requiredDate }]` open requests, no contact info |
| POST | `/api/contact` | body `{ name, email, subject, message }`, send via Nodemailer |

## Donor

| Method | Endpoint | Notes |
|---|---|---|
| POST | `/api/donors` | body `{ bloodGroup, city, area, lastDonationDate, availability }`, creates profile with `verificationStatus: "pending"` |
| GET | `/api/donors/me` | `{ name, email, phone, bloodGroup, city, area, lastDonationDate, availability, verificationStatus }`, **404 if no profile** |
| PATCH | `/api/donors/me` | same fields plus `name`, `phone` |
| PATCH | `/api/donors/availability` | body `{ availability: "available" \| "unavailable" }` |
| GET | `/api/requests?matching=1` | requests that match this donor (compatible group, same city, open) |
| GET | `/api/requests/:id` | request fields plus `statusHistory`, and `myResponse` (`"interested" \| "not_available" \| null`) for donors. `contactNumber` only after the donor responded `interested` |
| POST | `/api/responses` | body `{ requestId, response }`, upsert on `(donorId, requestId)` |
| GET | `/api/responses/my` | `[{ _id, requestId, response, respondedAt, patientName, bloodGroup, hospitalName, city, requestStatus }]` |
| GET | `/api/donations/my` | `[{ _id, donationDate, status, patientName, bloodGroup, hospitalName, city }]` |

## Patient

| Method | Endpoint | Notes |
|---|---|---|
| POST | `/api/requests` | body per FR-04. Returns the created request (`_id`). 409 with a message on duplicate request. Trigger matching and emails after responding |
| GET | `/api/requests/my` | own requests with `statusHistory: [{ status, at, note? }]` |
| GET | `/api/requests/:id` | own request (or admin) with `statusHistory` |
| PATCH | `/api/requests/:id/cancel` | owner only, not allowed on `fulfilled` or `cancelled` |
| GET | `/api/matching/:requestId` | `[{ donorId, name, bloodGroup, city, area, response, phone?, email? }]`. `phone` and `email` only when `response === "interested"` |
| POST | `/api/donations` | body `{ requestId, donorId }`, requester confirms. Creates a donation, sets request to `fulfilled`, updates donor `lastDonationDate` |

## Admin

| Method | Endpoint | Returns |
|---|---|---|
| GET | `/api/admin/dashboard` | `{ totalUsers, verifiedDonors, pendingDonors, totalRequests, pendingRequests, completedRequests, cancelledRequests, recentActivities: [{ _id, message, createdAt }] }` |
| GET | `/api/admin/reports` | `{ totalDonations, donorsByBloodGroup, donorsByCity, requestsByStatus, requestsByUrgency }`, each list is `[{ label, count }]` |
| GET | `/api/admin/users` | `[{ _id, name, email, phone, role, accountStatus, createdAt }]` |
| PATCH | `/api/admin/users/:id` | body `{ accountStatus: "active" \| "suspended" }` |
| GET | `/api/admin/donors?status=pending` | `[{ _id, name, email, phone, bloodGroup, city, area, availability, verificationStatus, lastDonationDate, createdAt }]`, `status` is optional |
| PATCH | `/api/admin/donors/:id/verify` | body `{ status: "approved" \| "rejected" }` |
| GET | `/api/admin/requests` | `[{ _id, patientName, requesterName, bloodGroup, hospitalName, city, requiredDate, urgency, status, createdAt }]` |
| PATCH | `/api/admin/requests/:id/status` | body `{ status }`, append to `statusHistory` |
| DELETE | `/api/admin/requests/:id` | remove fake or inappropriate request |
| GET | `/api/admin/donations` | `[{ _id, donationDate, status, donorName, patientName, bloodGroup, hospitalName }]` |

## Better Auth

`user.additionalFields`: `role` (`donor` or `patient` on signup, never `admin`), `phone`, `accountStatus` (default `active`).
Pages read `user.role` and `user.accountStatus` from the session.
