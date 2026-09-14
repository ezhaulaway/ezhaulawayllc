# Make the "Get a Free Quote" form actually send

Right now the form only shows a success message — nothing reaches you. This connects it end to end.

## What you'll get

- Every quote request is saved, so nothing is lost even if an email fails.
- Quote requests are saved in the database with any attached photos stored securely. The submission summary is queued to be emailed to **benezhaulaway@gmail.com** once email sending is connected; until then, requests are still saved and can be viewed.
- Photos customers pick are uploaded and saved with their request.
- The form gives real feedback: a spinner while sending, a clear confirmation with your text/call buttons, and a friendly error with your phone number if something goes wrong. The "this preview does not send your information yet" note is removed.
- Text-message alerts can be added later; email first.

## What I need from you

Emails must come from your own domain (like quotes@ezhaulawayllc.com) so they land in inboxes instead of spam. I'll walk you through connecting **ezhaulawayllc.com** for sending as part of this — it takes a couple of small settings changes at wherever your domain is registered. Until that's verified, requests are still saved and visible, and emails start flowing the moment it's done.

## Technical outline

1. Enable Lovable Cloud (database, storage, server functions).
2. Migration: `public.quote_requests` (id, created_at, name, phone, location, details, photo_paths text[], status). Grants: `INSERT` to `anon` + `authenticated`, `ALL` to `service_role`, no anon `SELECT`. RLS on, with an insert-only policy for the public and no public read path.
3. Storage: private `quote-photos` bucket, ~10MB file limit, `storage.objects` policies allowing anonymous insert into that bucket only; signed URLs generated server-side for the notification email.
4. Client: `QuoteForm` in both `src/components/site-chrome.tsx` and `src/components/home-page.tsx` gets shared submit logic (new `src/components/quote-form.tsx`, single source of truth for both) — zod validation (name ≤100, phone ≤30, location ≤100, details ≤2000), photo upload to storage, then a `createServerFn` POST call.
5. Server: `src/lib/quote.functions.ts` — public `submitQuoteRequest` server fn, revalidates input with zod, inserts the row via a server publishable client, then renders and sends the notification email through Lovable's managed email API using a `@react-email/components` template. Email failure never fails the submission.
6. The notification email template is prepared to send to **benezhaulaway@gmail.com** with the customer's details and photo links; sending starts once the email domain is connected later.
7. Verify with a real submission through the browser: row saved, photo stored, confirmation shown.
