# LibraryFlow - Online Library Management System

React + Vite academic project for Front End Development Frameworks.

## Requirements implemented

- React + Vite project structure with production build script.
- Admin and Library Member modules.
- Login and signup using browser Local Storage.
- Role selection during signup: Administrator or Library Member.
- Admin dashboard, book catalog, member directory, QR registration, issue/return, reports and settings.
- User dashboard, searchable book catalog, availability checking, borrowing, reservations, My Loans and My Reservations.
- Book, loan, reservation, member and account data persist in Local Storage.
- Search and category filtering for books.
- Search for members and borrowing records.
- Add-book and add-member forms with validation.
- Responsive UI and light/dark mode.
- Vercel SPA rewrite configuration included in `vercel.json`.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Demo flow for review

### Administrator
1. Create an account and choose **Administrator**.
2. Open Overview.
3. Add a book from Book Catalog.
4. Add a member from Members.
5. Search/filter books.
6. Issue and return a book.
7. Open QR Registration.
8. Open Reports and Settings.

### Library Member
1. Log out and create another account as **Library Member**.
2. Open Browse Books.
3. Search for a title and check availability.
4. Borrow an available book.
5. Reserve a book.
6. Open My Loans and My Reservations.
7. Return a borrowed book.

## Deployment

Import the project into Vercel. The included `vercel.json` provides the SPA rewrite so client-side navigation works after deployment.

## Important academic note

Local Storage is used for demonstration and coursework only. It is not a secure production authentication/database solution.

## Review 02 UI Updates
- Separate Admin and Student login flows
- Working Profile page with editable name and saved Local Storage session
- Quick Guide modal for Admin and Student workspaces
- Dashboard thought-of-the-day / reading-thought cards
- Admin dashboard Quick Tools: QR Registration, Quick Registration, Issue & Return, Reports
- Student dashboard Library Uses cards and My Profile shortcut
- QR Registration page includes QR code, print poster, copy link, and quick member registration

## Online book preview update
- Added a **Read / Preview** action to every book in both the Admin catalog and Student browse-books pages.
- The action opens the matching Google Books record/preview using the ISBN (or a title-and-author search when no ISBN is supplied). Full-text access depends on the publisher's permissions and Google Books preview availability; this frontend does not include copyrighted book files.
- Changed the primary action color from violet to a teal/green palette and added a matching style for the reading action.
- No backend is required for this preview-link feature. An internet connection is required to open Google Books.

## Borrow-to-read access
- Student accounts can open the **Read Book** viewer only when an active loan for that exact book is linked to their account.
- A reservation in `Waiting` status does not grant reading access. The student must borrow/receive the book first.
- Returning a book removes the active loan, so the student loses reading access.
- The reader opens the matching Google Books page/preview using the book ISBN. Full-text reading depends on Google Books/publisher preview rights; this frontend does not include copyrighted full-book PDF files.
- This demo uses browser Local Storage. It is suitable for a single-browser demonstration, not secure multi-user authorization; production access control requires a backend.
# FrentEndFinalProject
# frentendproject
