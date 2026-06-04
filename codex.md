# Ideal Bilar Project Context

## Overview

Ideal Bilar is a car selling, rental, service, and inquiry platform with a Node.js backend and React frontend. The backend supports web/mobile clients, an admin dashboard, inquiry workflows, bookings, chat, notifications, and dynamic showroom locations.

Live backend URL:

```text
https://idealbilar.track2gram.com
```

Third-party vehicle source:

```text
https://idealbilar.accesspaket.bytbilcms.com/wp-json/accesspackage/v1/cars
```

Important design decision: third-party Bytbil cars should not be used directly as the only source of truth for app state. For local availability, rental/sold/booked state, and dashboard control, the backend should keep local shadow data/statuses in MongoDB.

## Runtime

- Backend stack: Node.js, Express, MongoDB/Mongoose, Socket.IO.
- Module system: ESM imports/exports.
- Main server entry: `server.js`.
- Express app: `src/app.js`.
- Database connection: `src/database/db.js`.
- Static uploads are served from:
  - `/uploads`
  - `/api/v1/uploads`

Environment variables are loaded from `.env`. Do not commit real secrets. Rotate any MongoDB, Gmail, or JWT secrets if they were shared publicly.

## Auth

JWT auth middleware:

```text
src/shared/middlewares/auth.middleware.js
```

Current auth behavior:

- Supports `Authorization: Bearer <token>`.
- Also supports legacy `token` header.
- Sets `req.userId`.
- Admin-only middleware fetches the user, checks `role === "admin"`, and sets `req.user`.

Admin middleware path:

```text
src/shared/middlewares/adminOnlyAuth.moddleware.js
```

Business rule: login is required for all inquiry and booking creation routes except contact-us.

## Main Backend Modules

### User

Path:

```text
src/modules/user
```

Responsibilities:

- Registration.
- Email OTP verification.
- Login.
- Forgot-password OTP flow.
- Reset password using reset token after OTP verification.
- Profile API.

Forgot-password flow:

```text
request-otp -> verify-otp -> backend returns resetToken -> reset-password with resetToken
```

### Rental Cars

Path:

```text
src/modules/rentalCar
```

Responsibilities:

- Admin-managed rental listings.
- Multiple image upload using multer.
- Images stored under `/uploads/rental-cars`.
- Rental car statuses include `available`, `rented`, `maintenance`, `booked`, and `sold`.

### Rent A Car Inquiry

Path:

```text
src/modules/rentACarInquiry
```

Responsibilities:

- Booking inquiry against a rental car.
- Requires logged-in user.
- Supports license image upload under `/uploads/licenses`.
- Prevents overlapping bookings for the same car.
- Returns clear conflict message if selected dates are unavailable.
- Creates/uses chat for the inquiry.

### Car Wash

Path:

```text
src/modules/carWash
```

Responsibilities:

- Car wash booking.
- Requires logged-in user.
- Prevents duplicate booking for the same date/time slot.
- Provides booked-time endpoint for frontend availability.
- Creates/uses chat for the booking.

Important endpoint:

```text
GET /api/v1/car-wash-booked-times?bookingDate=YYYY-MM-DD
```

Car wash bookings do not have car images, so history responses should return a safe fallback instead of requiring an image.

### Dovra

Path:

```text
src/modules/Dovra
```

Responsibilities:

- Dovra inquiry form.
- Requires logged-in user.
- Creates/uses chat for the inquiry.

### Buy A Car

Path:

```text
src/modules/buyACar
```

Responsibilities:

- Buy-a-car inquiry.
- Requires logged-in user.
- Creates/uses chat for the inquiry.

### Sale A Car

Path:

```text
src/modules/saleACar
```

Responsibilities:

- Sale-a-car valuation inquiry.
- Requires logged-in user.
- Multipart image upload under `/uploads/sale-a-car`.
- Frontend form expects vehicle info, condition, owner info, preferences, and at least 4 images.

### Contact Us

Path:

```text
src/modules/contactus
```

Responsibilities:

- Public contact form.
- Does not require login.

### Dashboard

Path:

```text
src/modules/dashboard
```

Responsibilities:

- Admin dashboard summary counts.
- Supports filters such as `today`, `lastWeek`, `last30Days`, `thisMonth`, `lastMonth`, `all`, and custom date range.

### Query History / Orders History

Path:

```text
src/modules/queryHistory
```

Current purpose: unified user order/history API, not only raw query logs.

Main endpoint:

```text
GET /api/v1/query-history
```

Expected response includes unified records for:

- Rental bookings.
- Car wash bookings.
- Dovra inquiries.
- Buy-a-car inquiries.

History behavior:

- Uses logged-in user id first.
- Can use email/chat ownership fallback for older records.
- Car wash records should return `carInfo.image: null`, `hasImage: false`, and a fallback label like `Car Wash`.
- Raw query logs are available at `/api/v1/query-history/logs`.

### Showroom Locations

Path:

```text
src/modules/showroomLocations
```

Location fields:

- `name`
- `address`
- `latitude`
- `longitude`
- `isActive`

Frontend contact page uses this API to render dynamic showroom addresses and maps.

## Chat System

Paths:

```text
src/modules/chats
src/modules/chats/routes/chat.route.js
src/modules/chats/sockets/chat.socket.js
src/modules/chats/sockets/events/chat.events.js
```

REST routes:

```text
GET /api/v1/chat/general
GET /api/v1/chat/inquiry/:inquiryId
GET /api/v1/admin/chats
GET /api/v1/my-chats
PATCH /api/v1/chat/:chatId/read
```

Socket events emitted by frontend:

```text
join_chat
join_specific_chat
send_message
get_chat_history
get_active_chats
```

Socket events listened to by frontend:

```text
receive_message
message_sent
chat_history
active_rooms
error
```

Current notes:

- General user-admin chat is supported with `inquiryType: general`.
- Each user has one deterministic general chat id: `general-{userId}`.
- A logged-in user creates/gets the general chat using `GET /api/v1/chat/general`.
- `chatId` is usually the inquiry id.
- Chat is auto-created for buy-a-car, rent-a-car inquiry, Dovra, and car wash.
- User inbox is available through `GET /api/v1/my-chats`.
- Socket auth middleware exists but socket auth enforcement may still be commented out in the socket setup.
- Chat is not yet confirmed for sale-a-car, contact-us, or workshop services.

## Frontend

Main frontend path:

```text
idealbilar website/ideal-bilar-site
```

Important files:

```text
idealbilar website/ideal-bilar-site/src/pages/Contact/Contact.jsx
idealbilar website/ideal-bilar-site/src/services/locationService.js
idealbilar website/ideal-bilar-site/.env
idealbilar website/ideal-bilar-site/api/proxy.js
```

Frontend API base should point to the live backend when testing deployed backend:

```text
http://31.97.77.215/api/v1
```

Contact page notes:

- Showroom locations are dynamic.
- Multiple locations can be selected.
- Selected location updates address and map.
- `locationService.js` calls the `/locations` endpoint from `VITE_API_URL`.

## Deployment Notes

Current VPS:

```text
31.97.77.215
```

Recommended deployment setup:

- Node app managed by PM2.
- Nginx reverse proxy to backend port.
- SSL should wait until a domain is connected.

## Known Gaps / Follow Ups

- Confirm all inquiry modules consistently attach the logged-in user id during creation.
- Confirm query history returns car wash records for the authenticated user.
- Confirm socket auth is either intentionally public during development or enabled before production.
- Add chat creation for sale-a-car if the admin/user should discuss valuation inquiries.
- Add safe validation messages everywhere instead of exposing raw Mongoose/internal errors.
- Keep Bytbil sync/local status strategy clear before relying on third-party car list for rental/sold state.

## Verification Checklist

Before considering backend changes complete:

- Run the backend and confirm no ESM import/export errors.
- Test protected routes with `Authorization: Bearer <token>`.
- Test public contact-us without token.
- Test duplicate rental date booking returns a clear conflict.
- Test duplicate car wash date/time returns a clear conflict.
- Test `/api/v1/query-history` for rent, car wash, Dovra, and buy-a-car records.
- Test frontend upload URLs resolve under `/api/v1/uploads/...` or `/uploads/...`.
