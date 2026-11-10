import React, { useMemo, useState, useEffect } from "react";
import {
  LayoutDashboard, BookOpen, Users, ArrowLeftRight, ChartNoAxesCombined,
  Settings, Search, Bell, Plus, ChevronDown, MoreHorizontal, Clock3,
  BookMarked, CircleCheck, TrendingUp, Menu, X, Filter, CalendarDays,
  ArrowUpRight, ArrowLeft, Sparkles, LibraryBig, RotateCcw, Trash2, Check, Sun, Moon,
  Bookmark, UserRound, LogOut, ShieldCheck, QrCode, UserPlus, Save, RefreshCw
} from "lucide-react";

const initialBooks = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', category: 'Self Growth', isbn: '9780735211292', copies: 8, available: 5, color: 'peach', cover: 'A', status: 'Popular' },
  { id: 2, title: 'The Psychology of Money', author: 'Morgan Housel', category: 'Finance', isbn: '9780857197689', copies: 6, available: 2, color: 'mint', cover: 'P', status: 'Trending' },
  { id: 3, title: 'Deep Work', author: 'Cal Newport', category: 'Productivity', isbn: '9781455586691', copies: 5, available: 4, color: 'lavender', cover: 'D', status: 'Recommended' },
  { id: 4, title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', isbn: '9780061122415', copies: 7, available: 0, color: 'blue', cover: 'A', status: 'Bestseller' },
  { id: 5, title: 'Clean Code', author: 'Robert C. Martin', category: 'Technology', isbn: '9780132350884', copies: 4, available: 3, color: 'yellow', cover: 'C', status: 'Staff pick' },
  { id: 6, title: 'Ikigai', author: 'Héctor García', category: 'Self Growth', isbn: '9780143130727', copies: 9, available: 6, color: 'rose', cover: 'I', status: 'Popular' },
  { id: 7, title: 'The Lean Startup', author: 'Eric Ries', category: 'Business', isbn: '9780307887894', copies: 5, available: 3, color: 'mint', cover: 'L', status: 'Popular' },
  { id: 8, title: 'Sapiens', author: 'Yuval Noah Harari', category: 'History', isbn: '9780062316097', copies: 6, available: 4, color: 'blue', cover: 'S', status: 'Trending' },
  { id: 9, title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '9780553380163', copies: 4, available: 2, color: 'lavender', cover: 'B', status: 'Recommended' },
  { id: 10, title: 'Steve Jobs', author: 'Walter Isaacson', category: 'Biography', isbn: '9781451648539', copies: 3, available: 1, color: 'peach', cover: 'S', status: 'Popular' },
  { id: 11, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', category: 'Finance', isbn: '9781612680194', copies: 8, available: 5, color: 'yellow', cover: 'R', status: 'Bestseller' },
  { id: 12, title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'Finance', isbn: '9781585424337', copies: 5, available: 2, color: 'rose', cover: 'T', status: 'Popular' },
  { id: 13, title: '1984', author: 'George Orwell', category: 'Fiction', isbn: '9780451524935', copies: 6, available: 3, color: 'blue', cover: '1', status: 'Classic' },
  { id: 14, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', isbn: '9780060935467', copies: 4, available: 2, color: 'peach', cover: 'T', status: 'Classic' },
  { id: 15, title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fiction', isbn: '9780547928227', copies: 5, available: 4, color: 'mint', cover: 'H', status: 'Popular' },
  { id: 16, title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Technology', isbn: '9780262046305', copies: 3, available: 1, color: 'lavender', cover: 'I', status: 'Staff pick' },
  { id: 17, title: 'Python Crash Course', author: 'Eric Matthes', category: 'Technology', isbn: '9781718502703', copies: 6, available: 4, color: 'blue', cover: 'P', status: 'Recommended' },
  { id: 18, title: 'Design of Everyday Things', author: 'Don Norman', category: 'Technology', isbn: '9780465050659', copies: 4, available: 2, color: 'yellow', cover: 'D', status: 'Popular' },
  { id: 19, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', category: 'Science', isbn: '9780374533557', copies: 5, available: 3, color: 'rose', cover: 'T', status: 'Trending' },
  { id: 20, title: 'The Gene', author: 'Siddhartha Mukherjee', category: 'Science', isbn: '9781476733500', copies: 3, available: 2, color: 'mint', cover: 'G', status: 'Recommended' },
  { id: 21, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', isbn: '9788173711466', copies: 7, available: 5, color: 'peach', cover: 'W', status: 'Popular' },
  { id: 22, title: 'India After Gandhi', author: 'Ramachandra Guha', category: 'History', isbn: '9780141003707', copies: 4, available: 2, color: 'yellow', cover: 'I', status: 'Staff pick' },
  { id: 23, title: 'Good to Great', author: 'Jim Collins', category: 'Business', isbn: '9780066620992', copies: 5, available: 3, color: 'lavender', cover: 'G', status: 'Popular' },
  { id: 24, title: 'Zero to One', author: 'Peter Thiel', category: 'Business', isbn: '9780804139298', copies: 4, available: 1, color: 'blue', cover: 'Z', status: 'Trending' },
  { id: 25, title: 'The Intelligent Investor', author: 'Benjamin Graham', category: 'Finance', isbn: '9780060555665', copies: 3, available: 1, color: 'rose', cover: 'I', status: 'Classic' },
  { id: 26, title: 'Educated', author: 'Tara Westover', category: 'Biography', isbn: '9780399590504', copies: 4, available: 2, color: 'mint', cover: 'E', status: 'Bestseller' },
  { id: 27, title: 'The Silk Roads', author: 'Peter Frankopan', category: 'History', isbn: '9781408839997', copies: 3, available: 2, color: 'peach', cover: 'S', status: 'Recommended' },
  { id: 28, title: 'Cosmos', author: 'Carl Sagan', category: 'Science', isbn: '9780345539434', copies: 4, available: 3, color: 'blue', cover: 'C', status: 'Popular' },
  { id: 29, title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey', category: 'Self Growth', isbn: '9781982137274', copies: 6, available: 4, color: 'yellow', cover: '7', status: 'Popular' },
  { id: 30, title: 'Start with Why', author: 'Simon Sinek', category: 'Business', isbn: '9781591846444', copies: 5, available: 3, color: 'lavender', cover: 'S', status: 'Trending' }
];
const initialLoans = [
  { id: 101, name: "Aarav Sharma", book: "Atomic Habits", date: "Nov 02, 2026", due: "Nov 16, 2026", state: "Active" },
  { id: 102, name: "Diya Patel", book: "The Alchemist", date: "Oct 28, 2026", due: "Nov 04, 2026", state: "Overdue" },
  { id: 103, name: "Rohan Mehta", book: "Deep Work", date: "Nov 03, 2026", due: "Nov 17, 2026", state: "Active" },
  { id: 104, name: "Ananya Rao", book: "Clean Code", date: "Oct 30, 2026", due: "Nov 13, 2026", state: "Active" }
];
const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Book catalog", icon: BookOpen },
  { label: "Members", icon: Users },
  { label: "QR Registration", icon: QrCode },
  { label: "Issue & return", icon: ArrowLeftRight },
  { label: "Reports", icon: ChartNoAxesCombined }
];

function App() {
  const [authUser, setAuthUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lf-auth-user") || "null"); } catch { return null; }
  });
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");
  const [page, setPageRaw] = useState("Overview");
  const [pageHistory, setPageHistory] = useState([]);
  const [ratings, setRatings] = useState(() => { try { return JSON.parse(localStorage.getItem("lf-ratings") || "{}"); } catch { return {}; } });
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem("lf-books") || "null") || initialBooks);
  const [loans, setLoans] = useState(() => JSON.parse(localStorage.getItem("lf-loans") || "null") || initialLoans);
  const [reservations, setReservations] = useState(() => JSON.parse(localStorage.getItem("lf-reservations") || "null") || []);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [showAdd, setShowAdd] = useState(false);
  const [showMemberAdd, setShowMemberAdd] = useState(false);
  const [registeredMembers, setRegisteredMembers] = useState(() => JSON.parse(localStorage.getItem("lf-members") || "null") || []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("lf-dark") === "true");
  const [toast, setToast] = useState("");
  const [showGuide, setShowGuide] = useState(false);
  const [readingBook, setReadingBook] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [form, setForm] = useState({ title: "", author: "", category: "Technology", copies: 1, isbn: "" });
  const [memberForm, setMemberForm] = useState({ name: "", email: "", phone: "", membership: "Student" });
  const isAdmin = !authUser?.role || authUser.role === "admin";
  const homePage = isAdmin ? "Overview" : "My Dashboard";
  const setPage = (next) => { if (next === page) return; setPageHistory(h => [...h, page]); setPageRaw(next); };
  const goBack = () => { const prev = pageHistory[pageHistory.length - 1] || homePage; setPageHistory(h => h.slice(0, -1)); setPageRaw(prev); };
  const rateBook = (book, value) => {
    if (!authUser?.email) return;
    const next = { ...ratings, [book.id]: { ...(ratings[book.id] || {}), [authUser.email]: value } };
    setRatings(next); localStorage.setItem("lf-ratings", JSON.stringify(next));
    notify(`You rated “${book.title}” ${value} out of 5.`);
  };

  useEffect(() => { localStorage.setItem("lf-dark", String(dark)); }, [dark]);

  const saveBooks = (next) => { setBooks(next); localStorage.setItem("lf-books", JSON.stringify(next)); };
  const saveLoans = (next) => { setLoans(next); localStorage.setItem("lf-loans", JSON.stringify(next)); };
  const saveReservations = (next) => { setReservations(next); localStorage.setItem("lf-reservations", JSON.stringify(next)); };
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const openBookPreview = (book) => {
    if (!isAdmin) {
      const hasActiveLoan = loans.some(l => l.bookId === book.id && l.email === authUser?.email && l.state === "Active");
      if (!hasActiveLoan) {
        notify("You can read this book after it has been borrowed and issued to your account.");
        return;
      }
    }
    setReadingBook(book);
  };
  const filteredBooks = useMemo(() => books.filter(b =>
    (b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()) || String(b.isbn || "").includes(query)) &&
    (category === "All categories" || b.category === category)
  ), [books, query, category]);

  const addBook = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;
    const count = Math.max(1, Number(form.copies) || 1);
    saveBooks([{ ...form, id: Date.now(), copies: count, available: count, cover: form.title[0].toUpperCase(), color: ["peach","mint","lavender","blue","yellow","rose"][books.length % 6], status: "New arrival" }, ...books]);
    setForm({ title: "", author: "", category: "Technology", copies: 1, isbn: "" });
    setShowAdd(false); notify("Book added to your catalog.");
  };
  const issueBook = (book, borrower = { name: "New Member", email: "" }) => {
    if (!book.available) { notify("No copies currently available. You can reserve this book."); return false; }
    const nextBooks = books.map(b => b.id === book.id ? { ...b, available: b.available - 1 } : b);
    saveBooks(nextBooks);
    saveLoans([{ id: Date.now(), bookId: book.id, name: borrower.name, email: borrower.email, book: book.title, date: new Date().toLocaleDateString("en-US", {month:"short", day:"2-digit", year:"numeric"}), due: new Date(Date.now()+14*86400000).toLocaleDateString("en-US", {month:"short", day:"2-digit", year:"numeric"}), state: "Active" }, ...loans]);
    if (borrower.email) {
      const matchingReservation = reservations.find(r => r.bookId === book.id && r.email === borrower.email && r.state === "Waiting");
      if (matchingReservation) saveReservations(reservations.map(r => r.id === matchingReservation.id ? { ...r, state: "Issued" } : r));
    }
    notify(`“${book.title}” borrowed successfully. You can now read it from your account.`);
    return true;
  };
  const returnBook = (loan) => {
    saveLoans(loans.filter(l => l.id !== loan.id));
    saveBooks(books.map(b => b.title === loan.book ? { ...b, available: Math.min(b.copies, b.available + 1) } : b));
    notify("Book marked as returned.");
  };
  const reserveBook = (book) => {
    const email = authUser?.email || "";
    if (reservations.some(r => r.bookId === book.id && r.email === email && r.state === "Waiting")) { notify("You already reserved this book."); return; }
    saveReservations([{ id: Date.now(), bookId: book.id, book: book.title, email, name: authUser?.name || "Library User", date: new Date().toLocaleDateString("en-US", {month:"short", day:"2-digit", year:"numeric"}), state: "Waiting" }, ...reservations]);
    notify(`Reservation placed for “${book.title}”.`);
  };
  const cancelReservation = (reservation) => { saveReservations(reservations.filter(r => r.id !== reservation.id)); notify("Reservation cancelled."); };
  const addMember = (e) => {
    e.preventDefault();
    if (!memberForm.name.trim() || !memberForm.email.trim()) return;
    const next = [{ ...memberForm, id: Date.now(), joined: new Date().toLocaleDateString() }, ...registeredMembers];
    setRegisteredMembers(next); localStorage.setItem("lf-members", JSON.stringify(next));
    setMemberForm({ name: "", email: "", phone: "", membership: "Student" }); setShowMemberAdd(false); notify("Member added to the directory.");
  };
  const logout = () => { localStorage.removeItem("lf-auth-user"); setAuthUser(null); setAuthMode("login"); setPageHistory([]); setPageRaw("Overview"); };

  if (!authUser) return <AuthScreen mode={authMode} setMode={setAuthMode} error={authError} setError={setAuthError} onAuth={(user)=>{localStorage.setItem("lf-auth-user",JSON.stringify(user));setAuthUser(user);setPageHistory([]);setPageRaw(user.role === "user" ? "My Dashboard" : "Overview");}} />;

  const adminNav = [
    { label: "Overview", icon: LayoutDashboard }, { label: "Book catalog", icon: BookOpen },
    { label: "Members", icon: Users }, { label: "QR Registration", icon: QrCode },
    { label: "Issue & return", icon: ArrowLeftRight }, { label: "Reports", icon: ChartNoAxesCombined }, { label: "Profile", icon: UserRound }, { label: "Settings", icon: Settings }
  ];
  const userNav = [
    { label: "My Dashboard", icon: LayoutDashboard }, { label: "Browse books", icon: BookOpen },
    { label: "My loans", icon: BookMarked }, { label: "My reservations", icon: Bookmark }, { label: "Profile", icon: UserRound }, { label: "Settings", icon: Settings }
  ];
  const navItems = isAdmin ? adminNav : userNav;

  return (
    <div className={dark ? "app dark" : "app"}>
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand"><div className="brand-mark"><LibraryBig size={21}/></div><span>library<span className="brand-accent">flow</span></span><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={19}/></button></div>
        <div className="workspace"><div className="workspace-icon"><LibraryBig size={19}/></div><div><b>LibraryFlow</b><small>{isAdmin ? "Administrator workspace" : "Reader workspace"}</small></div></div>
        <div className="nav-caption">{isAdmin ? "ADMIN WORKSPACE" : "READER WORKSPACE"}</div>
        <nav>{navItems.map(item => <button key={item.label} className={`nav-item ${page === item.label ? "active" : ""}`} onClick={() => {setPage(item.label);setMobileOpen(false);}}><item.icon size={18}/><span>{item.label}</span>{item.label === "Issue & return" && <i className="nav-count">{loans.length}</i>}{item.label === "My reservations" && <i className="nav-count">{reservations.filter(r=>r.email===authUser.email&&r.state==="Waiting").length}</i>}</button>)}</nav>
        <div className="sidebar-bottom">
          <div className="help-card"><div className="help-spark"><Sparkles size={17}/></div><b>{isAdmin ? "Admin guide" : "Reader help"}</b><p>{isAdmin ? "Manage books, members, loans and reports." : "Search, borrow and reserve books from your account."}</p><button onClick={() => setShowGuide(true)}>Quick guide <ArrowUpRight size={14}/></button></div>
          <button className="profile profile-button" onClick={() => {setPage("Profile");setMobileOpen(false);}}><div className="avatar">{(authUser.name||"U").split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}</div><div><b>{authUser.name}</b><small>{isAdmin ? "Administrator" : "Library member"}</small></div><ShieldCheck size={16}/></button>
          <button className="logout-side" onClick={logout}><LogOut size={15}/> Logout</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar"><button className="hamburger" onClick={() => setMobileOpen(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <b>{page}</b></div><div className="top-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><div className="notification-wrap"><button className="icon-button notification" onClick={() => setShowNotifications(v=>!v)} aria-label="Open notifications"><Bell size={18}/><i/></button>{showNotifications && <NotificationPanel isAdmin={isAdmin} onClose={()=>setShowNotifications(false)} setPage={setPage}/>}</div><button className="top-avatar" onClick={()=>setPage("Profile")} aria-label="Open profile">{(authUser.name||"U").split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()}</button></div></header>
        <div className="content">
          {page !== homePage && <button className="back-button" onClick={goBack}><ArrowLeft size={16}/> Back</button>}
          {isAdmin && page === "Overview" && <Overview books={books} loans={loans} setPage={setPage} returnBook={returnBook} ratings={ratings}/>} 
          {isAdmin && page === "Book catalog" && <Catalog books={filteredBooks} query={query} setQuery={setQuery} category={category} setCategory={setCategory} onAdd={() => setShowAdd(true)} onIssue={issueBook} onReserve={reserveBook} onRead={openBookPreview} ratings={ratings} userMode={false}/>} 
          {isAdmin && page === "Members" && <Members loans={loans} members={registeredMembers} onAdd={() => setShowMemberAdd(true)} query={query} setQuery={setQuery}/>} 
          {isAdmin && page === "QR Registration" && <QRRegistration members={registeredMembers} onRegister={(member)=>{const next=[{...member,id:Date.now(),joined:new Date().toLocaleDateString()},...registeredMembers];setRegisteredMembers(next);localStorage.setItem("lf-members",JSON.stringify(next));notify("Member registered successfully.");}}/>}
          {isAdmin && page === "Issue & return" && <Loans loans={loans} onReturn={returnBook}/>} 
          {isAdmin && page === "Reports" && <Reports books={books} loans={loans}/>}
          {isAdmin && page === "Profile" && <ProfilePage user={authUser} role="Administrator" notify={notify}/>}
          {isAdmin && page === "Settings" && <SettingsPage dark={dark} setDark={setDark} notify={notify} role="Administrator"/>}
          {!isAdmin && page === "My Dashboard" && <UserDashboard user={authUser} books={books} loans={loans} reservations={reservations} setPage={setPage}/>} 
          {!isAdmin && page === "Browse books" && <Catalog books={filteredBooks} query={query} setQuery={setQuery} category={category} setCategory={setCategory} onAdd={()=>{}} onIssue={(book)=>issueBook(book,authUser)} onReserve={reserveBook} onRead={openBookPreview} ratings={ratings} onRate={rateBook} userEmail={authUser.email} loans={loans} userMode/>}
          {!isAdmin && page === "My loans" && <UserLoans user={authUser} loans={loans} onReturn={returnBook}/>} 
          {!isAdmin && page === "My reservations" && <UserReservations user={authUser} reservations={reservations} onCancel={cancelReservation}/>}
          {!isAdmin && page === "Profile" && <ProfilePage user={authUser} role="Student" notify={notify}/>}
          {!isAdmin && page === "Settings" && <SettingsPage dark={dark} setDark={setDark} notify={notify} role="Library member"/>}
        </div>
      </main>

      {showAdd && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setShowAdd(false)}><form className="modal" onSubmit={addBook}><div className="modal-head"><div><span className="eyebrow">CATALOG MANAGEMENT</span><h2>Add a new book</h2><p>Enter the details to add a title to your library.</p></div><button type="button" className="icon-button" onClick={() => setShowAdd(false)}><X size={18}/></button></div><label>Book title<input required placeholder="e.g. The Design of Everyday Things" value={form.title} onChange={e => setForm({...form,title:e.target.value})}/></label><label>Author<input required placeholder="Author name" value={form.author} onChange={e => setForm({...form,author:e.target.value})}/></label><div className="form-row"><label>Category<select value={form.category} onChange={e => setForm({...form,category:e.target.value})}>{["Technology","Fiction","Finance","Self Growth","Productivity","Science","Biography","History","Business"].map(x => <option key={x}>{x}</option>)}</select></label><label>Copies<input type="number" min="1" value={form.copies} onChange={e => setForm({...form,copies:e.target.value})}/></label></div><label>ISBN <span className="optional">(optional)</span><input placeholder="ISBN number" value={form.isbn} onChange={e => setForm({...form,isbn:e.target.value})}/></label><div className="modal-actions"><button type="button" className="button ghost" onClick={() => setShowAdd(false)}>Cancel</button><button className="button primary"><Plus size={16}/> Add book</button></div></form></div>}
      {showMemberAdd && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setShowMemberAdd(false)}><form className="modal" onSubmit={addMember}><div className="modal-head"><div><span className="eyebrow">MEMBER MANAGEMENT</span><h2>Add library member</h2><p>Create a member record for borrowing and registration.</p></div><button type="button" className="icon-button" onClick={() => setShowMemberAdd(false)}><X size={18}/></button></div><label>Full name<input required value={memberForm.name} onChange={e=>setMemberForm({...memberForm,name:e.target.value})} placeholder="Member name"/></label><label>Email<input required type="email" value={memberForm.email} onChange={e=>setMemberForm({...memberForm,email:e.target.value})} placeholder="name@example.com"/></label><div className="form-row"><label>Phone<input value={memberForm.phone} onChange={e=>setMemberForm({...memberForm,phone:e.target.value})} placeholder="Phone number"/></label><label>Membership<select value={memberForm.membership} onChange={e=>setMemberForm({...memberForm,membership:e.target.value})}><option>Student</option><option>Faculty</option><option>Staff</option></select></label></div><div className="modal-actions"><button type="button" className="button ghost" onClick={() => setShowMemberAdd(false)}>Cancel</button><button className="button primary"><Plus size={16}/> Add member</button></div></form></div>}
      {readingBook && <BookReaderModal book={readingBook} onClose={() => setReadingBook(null)} />}
      {showGuide && <QuickGuide isAdmin={isAdmin} onClose={()=>setShowGuide(false)} setPage={setPage}/>}
      {toast && <div className="toast"><CircleCheck size={18}/>{toast}</div>}
    </div>
  );
}


function BookReaderModal({book,onClose}) {
  const bookUrl = book.isbn ? `https://books.google.com/books?vid=ISBN:${encodeURIComponent(book.isbn)}` : `https://books.google.com/books?q=${encodeURIComponent(`${book.title} ${book.author}`)}`;
  const embedUrl = book.isbn ? `https://books.google.com/books?vid=ISBN:${encodeURIComponent(book.isbn)}&output=embed` : `https://books.google.com/books?q=${encodeURIComponent(`${book.title} ${book.author}`)}&output=embed`;
  return <div className="modal-backdrop reader-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="reader-modal"><div className="modal-head"><div><span className="eyebrow">LIBRARYFLOW READER</span><h2>{book.title}</h2><p>{book.author} · Digital preview availability depends on the publisher.</p></div><button className="icon-button" onClick={onClose} aria-label="Close reader"><X size={18}/></button></div><iframe className="book-reader-frame" src={embedUrl} title={`Reading ${book.title}`} allow="autoplay"/><div className="reader-footer"><span>Some titles may only offer a limited preview.</span><a className="button outline" href={bookUrl} target="_blank" rel="noreferrer">Open in Google Books</a></div></section></div>;
}

function PageHeading({ eyebrow, title, subtitle, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}
function Overview({ books, loans, setPage, returnBook, ratings }) {
  const available = books.reduce((n,b) => n+b.available,0);
  const total = books.reduce((n,b) => n+b.copies,0);
  return <>
    <PageHeading eyebrow="THURSDAY, NOVEMBER 5, 2026" title={<>Good morning, Nithish <span className="wave">✦</span></>} subtitle="Here's what's happening in your library today." action={<button className="button primary" onClick={() => setPage("Book catalog")}><Plus size={17}/> Add new book</button>}/>
    <div className="welcome-banner"><div className="banner-copy"><div className="banner-label"><Sparkles size={14}/> YOUR LIBRARY AT A GLANCE</div><h2>A little reading goes<br/>a long way.</h2><p>Keep your collection organized and your readers inspired.</p><button onClick={() => setPage("Book catalog")}>Explore catalog <ArrowUpRight size={15}/></button></div><div className="banner-art"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="book-stack"><div className="book book-one"/><div className="book book-two"/><div className="book book-three"/></div><div className="art-star star-one">✳</div><div className="art-star star-two">✦</div></div></div>
    <div className="stats-grid">
      <Stat icon={BookOpen} label="Total book copies" value={total.toLocaleString()} change="+12.8%" note="vs. last month" tone="purple"/>
      <Stat icon={BookMarked} label="Available to borrow" value={available.toLocaleString()} change={`${Math.round(available/Math.max(total,1)*100)}%`} note="of total collection" tone="green"/>
      <Stat icon={ArrowLeftRight} label="Currently borrowed" value={loans.length.toString().padStart(2,"0")} change="+4.2%" note="vs. last month" tone="orange"/>
      <Stat icon={Users} label="Active members" value="248" change="+8.6%" note="vs. last month" tone="blue"/>
    </div>
    <div className="dashboard-grid"><section className="panel activity-panel"><div className="panel-head"><div><h3>Recent activity</h3><p>Latest borrowing activity across your library.</p></div><button className="text-button" onClick={() => setPage("Issue & return")}>View all <ArrowUpRight size={14}/></button></div><div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>BOOK TITLE</th><th>DUE DATE</th><th>STATUS</th><th/></tr></thead><tbody>{loans.slice(0,4).map((l,i)=><tr key={l.id}><td><div className="member-cell"><div className={`mini-avatar av${i%4}`}>{l.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><b>{l.name}</b></div></td><td>{l.book}</td><td>{l.due}</td><td><span className={`status ${l.state.toLowerCase()}`}><i/>{l.state}</span></td><td><button className="row-action" title="Mark returned" onClick={()=>returnBook(l)}><RotateCcw size={15}/></button></td></tr>)}</tbody></table></div></section>
      <section className="panel collection-panel"><div className="panel-head"><div><h3>Collection overview</h3><p>Books by category</p></div><button className="icon-button small" onClick={() => setPage("Book catalog")}><ArrowUpRight size={16}/></button></div><div className="donut-wrap"><div className="donut"><div><b>{books.length}</b><small>Titles</small></div></div><div className="donut-legend"><Legend color="purple" label="Self growth" value="32%"/><Legend color="orange" label="Fiction" value="24%"/><Legend color="blue" label="Technology" value="18%"/><Legend color="green" label="Other" value="26%"/></div></div><div className="collection-foot"><span><TrendingUp size={15}/> Collection growing</span><b>+18.4%</b></div></section></div>
    <div className="insight-grid">
      <section className="thought-card"><div className="insight-icon"><Sparkles size={18}/></div><span className="eyebrow">THOUGHT OF THE DAY</span><h3>“A room without books is like a body without a soul.”</h3><p>Keep your library active, welcoming and full of ideas.</p></section>
      <section className="useful-card"><div className="panel-head compact-head"><div><h3>Quick tools</h3><p>Common actions for today's work.</p></div></div><div className="tool-grid"><button onClick={()=>setPage("QR Registration")}><span><QrCode size={16}/></span><b>QR registration</b><small>Scan to join the library</small></button><button onClick={()=>setPage("QR Registration")}><span><UserPlus size={16}/></span><b>Quick registration</b><small>Add a member instantly</small></button><button onClick={()=>setPage("Issue & return")}><span><ArrowLeftRight size={16}/></span><b>Issue & return</b><small>Manage circulation</small></button><button onClick={()=>setPage("Reports")}><span><ChartNoAxesCombined size={16}/></span><b>View reports</b><small>See library insights</small></button></div></section>
    </div>
    <div className="section-heading"><div><h3>Popular titles</h3><p>Reader favorites from your collection.</p></div><button className="text-button" onClick={() => setPage("Book catalog")}>Browse catalog <ArrowUpRight size={14}/></button></div><div className="book-grid">{books.slice(0,4).map(b=><BookCard key={b.id} book={b} ratings={ratings}/>)}</div>
  </>;
}
function Stat({icon:Icon,label,value,change,note,tone}) { return <div className="stat-card"><div className="stat-top"><div className={`stat-icon ${tone}`}><Icon size={18}/></div><span className="stat-change"><TrendingUp size={12}/>{change}</span></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-note">{note}</div></div>; }
function Legend({color,label,value}) { return <div className="legend-row"><i className={color}/><span>{label}</span><b>{value}</b></div>; }
// Sample ratings so the demo catalog looks lively. Only the built-in demo books (small ids) get them;
// books added later start with "No ratings yet". Real member ratings are added on top of these.
function seedRating(bookId) {
  if (!(bookId > 0 && bookId < 1000)) return { count: 0, avg: 0 };
  return { avg: 4.0 + ((bookId * 37) % 10) * 0.09, count: 8 + ((bookId * 13) % 33) };
}
function ratingInfo(bookRatings, bookId) {
  const values = Object.values(bookRatings || {});
  const seed = seedRating(bookId);
  const count = seed.count + values.length;
  const total = seed.avg * seed.count + values.reduce((a,b)=>a+b,0);
  return { count, avg: count ? total / count : 0 };
}
function BookRating({book, ratings, onRate, userEmail}) {
  const [hover,setHover] = useState(0);
  const bookRatings = (ratings || {})[book.id];
  const { count, avg } = ratingInfo(bookRatings, book.id);
  const mine = userEmail && bookRatings ? bookRatings[userEmail] || 0 : 0;
  const shown = onRate ? (hover || mine) : Math.round(avg);
  return <div className="rating-box">
    <div className="rating-line">
      <span className="stars" onMouseLeave={()=>setHover(0)}>{[1,2,3,4,5].map(n=>onRate
        ? <button type="button" key={n} className={`star-btn ${n<=shown?"on":""}`} aria-label={`Rate ${n} out of 5`} onMouseEnter={()=>setHover(n)} onClick={()=>onRate(book,n)}>★</button>
        : <span key={n} className={`star-btn static ${n<=shown?"on":""}`}>★</span>)}</span>
      <span className="rating-text">{count ? <><b>{avg.toFixed(1)}</b> ({count})</> : "No ratings yet"}</span>
    </div>
    {onRate && <small className="rating-hint">{mine ? `Your rating: ${mine}/5 (tap to change)` : "Tap a star to rate this book"}</small>}
  </div>;
}
function BookCard({book, ratings, onRate, userEmail}) { return <div className="book-card"><div className={`book-cover ${book.color}`} aria-label={`Cover image for ${book.title}`}>
  <img className="real-book-cover" src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={`${book.title} book cover`} loading="lazy" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextElementSibling.style.display="flex";}} />
  <div className="cover-fallback" style={{display:"none"}}><span className="cover-ornament"><i/><i/><i/></span><span className="cover-rule"/><span className="cover-title">{book.title}</span><span className="cover-author">{book.author}</span><span className="cover-bottom-ornament">✦</span></div>
</div><div className="book-card-info"><span className="book-category">{book.category}</span><h4>{book.title}</h4><p>{book.author}</p><div className="book-card-foot"><BookRating book={book} ratings={ratings} onRate={onRate} userEmail={userEmail}/><span className={book.available ? "available-text" : "unavailable-text"}>{book.available} available</span></div></div></div>; }
function Catalog({books,query,setQuery,category,setCategory,onAdd,onIssue,onReserve,onRead,ratings={},onRate,userEmail,loans=[],userMode=false}) { return <>
  <PageHeading eyebrow={userMode ? "LIBRARY COLLECTION" : "COLLECTION MANAGEMENT"} title={userMode ? "Browse books" : "Book catalog"} subtitle={userMode ? "Search the collection, check availability, borrow or reserve a book." : "Search, filter and manage every title in your library."} action={!userMode && <button className="button primary" onClick={onAdd}><Plus size={17}/> Add new book</button>}/>
  <div className="catalog-toolbar"><div className="search-box"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by title, author or ISBN..."/></div><select className="category-select" value={category} onChange={e=>setCategory(e.target.value)}>{["All categories","Technology","Fiction","Finance","Self Growth","Productivity","Science","Biography","History","Business"].map(x=><option key={x}>{x}</option>)}</select></div>
  <div className="catalog-grid">{books.map(b=>{const hasLoan=userMode && loans.some(l=>l.bookId===b.id && l.email===userEmail && l.state==="Active");return <div className="catalog-item" key={b.id}><BookCard book={b} ratings={ratings} onRate={onRate} userEmail={userEmail}/><div className="book-actions">{userMode ? <button className="button read-button full" disabled={!hasLoan} onClick={()=>onRead(b)}><BookOpen size={15}/>{hasLoan ? "Read Book" : "Borrow to unlock reading"}</button> : <button className="button read-button full" onClick={()=>onRead(b)}><BookOpen size={15}/> Preview book</button>}<button className="button outline full" disabled={!b.available || hasLoan} onClick={()=>onIssue(b)}>{hasLoan ? "Already borrowed" : b.available ? (userMode ? "Borrow this book" : "Issue this book") : "Currently unavailable"}</button>{userMode && !hasLoan && <button className="button ghost full" onClick={()=>onReserve(b)}><Bookmark size={15}/> Reserve book</button>}</div></div>})}{books.length===0&&<div className="empty-state">No books match your search.</div>}</div>
</>; }

function Loans({loans,onReturn}) { const [search,setSearch]=useState(""); const visible=loans.filter(l=>(l.name+" "+l.book).toLowerCase().includes(search.toLowerCase())); return <>
  <PageHeading eyebrow="CIRCULATION DESK" title="Issue & return" subtitle="Track active loans, due dates, and returned books." action={<div className="date-pill"><CalendarDays size={16}/> Live circulation</div>}/>
  <div className="loan-summary"><div><span>Active loans</span><b>{loans.length}</b></div><div><span>Overdue books</span><b className="danger-number">{loans.filter(l=>l.state==="Overdue").length}</b></div><div><span>Due this week</span><b>{Math.min(8,loans.length)}</b></div></div>
  <div className="panel loans-panel"><div className="panel-head"><div><h3>Borrowing records</h3><p>Manage checkouts and process returns.</p></div><div className="search-box compact"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search records..."/></div></div><div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>BOOK TITLE</th><th>ISSUE DATE</th><th>DUE DATE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{visible.map((l,i)=><tr key={l.id}><td><div className="member-cell"><div className={`mini-avatar av${i%4}`}>{l.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><b>{l.name}</b></div></td><td>{l.book}</td><td>{l.date}</td><td>{l.due}</td><td><span className={`status ${l.state.toLowerCase()}`}><i/>{l.state}</span></td><td><button className="button tiny" onClick={()=>onReturn(l)}><Check size={13}/> Return</button></td></tr>)}</tbody></table></div>{visible.length===0&&<div className="empty-state">No matching borrowing records.</div>}</div>
</>; }

function Members({loans,members,onAdd,query,setQuery}) { const seed=[["Aarav Sharma","aarav@example.com","Student","AS"],["Diya Patel","diya@example.com","Student","DP"],["Rohan Mehta","rohan@example.com","Faculty","RM"],["Ananya Rao","ananya@example.com","Student","AR"],["Ishaan Gupta","ishaan@example.com","Student","IG"],["Meera Nair","meera@example.com","Faculty","MN"]]; const all=[...members.map(m=>[m.name,m.email,m.membership||"Student",m.name.split(" ").map(x=>x[0]).join("").slice(0,2)]),...seed]; const visible=all.filter(n=>(n[0]+" "+n[1]).toLowerCase().includes(query.toLowerCase())); return <>
  <PageHeading eyebrow="COMMUNITY" title="Library members" subtitle="Manage members who can borrow and reserve books." action={<button className="button primary" onClick={onAdd}><Plus size={17}/> Add member</button>}/>
  <div className="stats-grid member-stats"><Stat icon={Users} label="Registered members" value={all.length} change="Live" note="library directory" tone="purple"/><Stat icon={BookMarked} label="Borrowing members" value={new Set(loans.map(l=>l.email||l.name)).size} change="Active" note="currently borrowing" tone="green"/><Stat icon={Clock3} label="Pending returns" value={loans.length} change="Live" note="across all members" tone="orange"/></div>
  <div className="panel"><div className="panel-head"><div><h3>Member directory</h3><p>Search and manage your library community.</p></div><div className="search-box compact"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search members..."/></div></div><div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>EMAIL</th><th>MEMBERSHIP</th><th>BOOKS BORROWED</th><th>STATUS</th></tr></thead><tbody>{visible.map((n,i)=><tr key={n[1]+i}><td><div className="member-cell"><div className={`mini-avatar av${i%4}`}>{n[3]}</div><b>{n[0]}</b></div></td><td>{n[1]}</td><td>{n[2]}</td><td>{loans.filter(l=>(l.email&&l.email===n[1])||l.name===n[0]).length}</td><td><span className="status active"><i/>Active</span></td></tr>)}</tbody></table></div></div>
</>; }


function AuthScreen({mode,setMode,error,setError,onAuth}) {
  const [loginRole,setLoginRole]=useState(null);
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const reset=()=>{setError("");setName("");setEmail("");setPassword("");setLoginRole(null);setMode("login");};
  const submit=e=>{ e.preventDefault(); setError("");
    if(mode==="register" && !name.trim()){setError("Please enter your full name.");return;}
    if(password.length<6){setError("Password must contain at least 6 characters.");return;}
    const users=JSON.parse(localStorage.getItem("lf-users")||"[]");
    if(mode==="register"){
      if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())){setError("An account with this email already exists.");return;}
      const user={name,email,password,role:"user"}; users.push(user); localStorage.setItem("lf-users",JSON.stringify(users));
      onAuth({name,email,role:"user"});
    } else {
      if(loginRole==="admin"){
        const admins=JSON.parse(localStorage.getItem("lf-admin-users")||"[]");
        const demo={name:"Library Administrator",email:"admin@libraryflow.com",password:"admin123",role:"admin"};
        const allAdmins=[demo,...admins];
        const user=allAdmins.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===password);
        if(!user){setError("Invalid admin credentials. Demo: admin@libraryflow.com / admin123");return;}
        onAuth({name:user.name,email:user.email,role:"admin"});
      } else {
        const user=users.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===password&&u.role==="user");
        if(!user){setError("Invalid student email or password. Please create a Student account first.");return;}
        onAuth({name:user.name,email:user.email,role:"user"});
      }
    }
  };

  if(!loginRole && mode!=="register") return <main className="auth-screen"><section className="auth-card role-card"><div className="auth-brand"><span>▥</span> library<span>flow</span></div><p className="eyebrow">ONLINE LIBRARY MANAGEMENT</p><h1>Choose your login</h1><p className="auth-sub">Select your account type to continue.</p><div className="role-options"><button className="role-option" onClick={()=>{setLoginRole("admin");setError("")}}><span className="role-icon">🛡️</span><span><b>Admin Login</b><small>Manage books, members, loans and reports.</small></span><span>→</span></button><button className="role-option" onClick={()=>{setLoginRole("user");setError("")}}><span className="role-icon">🎓</span><span><b>Student Login</b><small>Browse, borrow and reserve library books.</small></span><span>→</span></button></div><p className="auth-switch">New student? <button onClick={()=>{setError("");setMode("register")}}>Create student account</button></p><small className="auth-demo">Admin demo: admin@libraryflow.com / admin123</small></section></main>;

  return <main className="auth-screen"><section className="auth-card"><div className="auth-brand"><span>▥</span> library<span>flow</span></div><p className="eyebrow">{mode==="register"?"STUDENT REGISTRATION":loginRole==="admin"?"ADMIN LOGIN":"STUDENT LOGIN"}</p><h1>{mode==="register"?"Create student account":loginRole==="admin"?"Admin Login":"Student Login"}</h1><p className="auth-sub">{mode==="register"?"Create an account to access the student library portal.":loginRole==="admin"?"Sign in to manage your library.":"Sign in to browse, borrow and reserve books."}</p>
  <form onSubmit={submit}>{mode==="register"&&<label>Full name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label>}<label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder={loginRole==="admin"?"admin@libraryflow.com":"you@example.com"}/></label><label>Password<input required type="password" minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/></label>{error&&<p className="auth-error">{error}</p>}<button className="button primary auth-submit">{mode==="register"?"Create student account":"Sign in"}</button></form>
  <p className="auth-switch"><button onClick={reset}>← Back to login choices</button></p>{mode==="register"&&<p className="auth-switch">Already have a student account? <button onClick={()=>{setMode("login");setLoginRole("user");setError("")}}>Student Login</button></p>}<small className="auth-demo">Academic demo authentication uses browser Local Storage. Admin account is protected separately from student accounts.</small></section></main>;
}
function QRRegistration({members,onRegister}) {
  const [member,setMember]=useState({name:"",email:"",phone:""});
  const [registered,setRegistered]=useState(false);
  const registrationUrl=typeof window!=="undefined"?`${window.location.origin}${window.location.pathname}?page=register`:"";
  const qrUrl=`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(registrationUrl)}`;
  const submit=e=>{e.preventDefault();onRegister(member);setMember({name:"",email:"",phone:""});setRegistered(true);};
  return <>
    <PageHeading eyebrow="MEMBER ONBOARDING" title="QR registration" subtitle="Let readers register instantly by scanning your library's QR code."/>
    <div className="qr-layout">
      <section className="panel qr-panel"><div className="panel-head"><div><h3>Registration QR code</h3><p>Scan with any phone camera to open registration.</p></div></div>
        <div className="qr-content"><img src={qrUrl} alt="Library member registration QR code"/><b>LibraryFlow · Join the library</b><p>Scan to register as a member</p>
        <div className="qr-actions"><button className="button primary" onClick={()=>window.print()}>Print poster</button><button className="button outline" onClick={()=>{navigator.clipboard?.writeText(registrationUrl);}}>Copy registration link</button></div><small className="qr-link">{registrationUrl}</small></div>
      </section>
      <section className="panel qr-panel"><div className="panel-head"><div><h3>Quick registration</h3><p>Register a member directly from this screen.</p></div></div>
        <form className="qr-form" onSubmit={submit}><label>Full name<input required value={member.name} onChange={e=>setMember({...member,name:e.target.value})} placeholder="Member name"/></label><label>Email address<input required type="email" value={member.email} onChange={e=>setMember({...member,email:e.target.value})} placeholder="name@example.com"/></label><label>Phone number<input value={member.phone} onChange={e=>setMember({...member,phone:e.target.value})} placeholder="Optional"/></label><button className="button primary">Register member</button>{registered&&<p className="success-note">Member added to your directory ✓</p>}</form>
      </section>
    </div>
    <section className="panel registered-panel"><div className="panel-head"><div><h3>Recently registered</h3><p>{members.length} members registered through this page.</p></div></div>{members.length?<div className="table-wrap"><table><thead><tr><th>NAME</th><th>EMAIL</th><th>PHONE</th><th>JOINED</th></tr></thead><tbody>{members.slice(0,8).map(m=><tr key={m.id}><td><b>{m.name}</b></td><td>{m.email}</td><td>{m.phone||"—"}</td><td>{m.joined}</td></tr>)}</tbody></table></div>:<div className="empty-state">No new registrations yet.</div>}</section>
  </>;
}

function UserDashboard({user,books,loans,reservations,setPage}) { const mine=loans.filter(l=>l.email===user.email); const mineRes=reservations.filter(r=>r.email===user.email&&r.state==="Waiting"); const available=books.filter(b=>b.available).length; return <>
  <PageHeading eyebrow="READER DASHBOARD" title={<>Welcome, {user.name.split(" ")[0]} <span className="wave">✦</span></>} subtitle="Find your next book, manage your loans and track reservations." action={<button className="button primary" onClick={()=>setPage("Browse books")}><Search size={16}/> Browse books</button>}/>
  <div className="stats-grid"><Stat icon={BookOpen} label="Available titles" value={available} change="Live" note="ready to borrow" tone="purple"/><Stat icon={BookMarked} label="My active loans" value={mine.length} change="Current" note="books with you" tone="green"/><Stat icon={Bookmark} label="My reservations" value={mineRes.length} change="Waiting" note="reservation queue" tone="orange"/></div>
  <div className="dashboard-grid"><section className="panel"><div className="panel-head"><div><h3>My current loans</h3><p>Keep an eye on your due dates.</p></div><button className="text-button" onClick={()=>setPage("My loans")}>View all <ArrowUpRight size={14}/></button></div>{mine.length?<div className="table-wrap"><table><thead><tr><th>BOOK</th><th>ISSUED</th><th>DUE</th><th>STATUS</th></tr></thead><tbody>{mine.slice(0,5).map(l=><tr key={l.id}><td><b>{l.book}</b></td><td>{l.date}</td><td>{l.due}</td><td><span className={`status ${l.state.toLowerCase()}`}><i/>{l.state}</span></td></tr>)}</tbody></table></div>:<div className="empty-state">You have no active loans. Browse the catalog to borrow a book.</div>}</section><section className="panel"><div className="panel-head"><div><h3>Quick actions</h3><p>Everything you need as a reader.</p></div></div><div className="quick-actions"><button className="button outline" onClick={()=>setPage("Browse books")}><Search size={16}/> Search books</button><button className="button outline" onClick={()=>setPage("My reservations")}><Bookmark size={16}/> Reservations</button><button className="button outline" onClick={()=>setPage("My loans")}><BookMarked size={16}/> My loans</button><button className="button outline" onClick={()=>setPage("Profile")}><UserRound size={16}/> My profile</button></div></section></div>
  <div className="insight-grid user-insights"><section className="thought-card"><div className="insight-icon"><Sparkles size={18}/></div><span className="eyebrow">READING THOUGHT</span><h3>“Today a reader, tomorrow a leader.”</h3><p>Explore one new idea every day and make your reading time count.</p></section><section className="useful-card"><div className="panel-head compact-head"><div><h3>Library uses</h3><p>Simple ways to get more from your account.</p></div></div><div className="mini-benefits"><div><BookOpen size={17}/><span><b>Discover</b><small>Find books by title, author or category.</small></span></div><div><Bookmark size={17}/><span><b>Reserve</b><small>Save unavailable titles for later.</small></span></div><div><Clock3 size={17}/><span><b>Stay on time</b><small>Check due dates from My Loans.</small></span></div></div></section></div>
</>; }

function UserLoans({user,loans,onReturn}) { const mine=loans.filter(l=>l.email===user.email); return <><PageHeading eyebrow="MY LIBRARY" title="My loans" subtitle="View the books you currently have borrowed."/><div className="panel"><div className="table-wrap"><table><thead><tr><th>BOOK</th><th>ISSUED</th><th>DUE DATE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{mine.map(l=><tr key={l.id}><td><b>{l.book}</b></td><td>{l.date}</td><td>{l.due}</td><td><span className={`status ${l.state.toLowerCase()}`}><i/>{l.state}</span></td><td><button className="button tiny" onClick={()=>onReturn(l)}><Check size={13}/> Return</button></td></tr>)}</tbody></table></div>{!mine.length&&<div className="empty-state">No active loans.</div>}</div></>; }

function UserReservations({user,reservations,onCancel}) { const mine=reservations.filter(r=>r.email===user.email); return <><PageHeading eyebrow="MY LIBRARY" title="My reservations" subtitle="Track books you are waiting to borrow."/><div className="panel"><div className="table-wrap"><table><thead><tr><th>BOOK</th><th>RESERVED</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{mine.map(r=><tr key={r.id}><td><b>{r.book}</b></td><td>{r.date}</td><td><span className="status active"><i/>{r.state}</span></td><td><button className="button tiny" onClick={()=>onCancel(r)}>Cancel</button></td></tr>)}</tbody></table></div>{!mine.length&&<div className="empty-state">You have no reservations.</div>}</div></>; }

function NotificationPanel({isAdmin,onClose,setPage}) {
  const items = isAdmin ? [
    ["New activity", "Review recent book circulation in Reports.", "Reports"],
    ["Quick registration", "Register a new member from QR Registration.", "QR Registration"],
    ["Catalog reminder", "Keep book availability and copies up to date.", "Book catalog"]
  ] : [
    ["Reading update", "Explore a new title from the catalog today.", "Browse books"],
    ["Loan reminder", "Check your due dates in My Loans.", "My loans"],
    ["Reservation update", "Review your reserved books anytime.", "My reservations"]
  ];
  return <div className="notification-panel"><div className="notification-head"><div><b>Notifications</b><small>Useful updates for your workspace</small></div><button className="icon-button" onClick={onClose}><X size={15}/></button></div><div className="notification-list">{items.map(([title,text,page])=><button key={title} onClick={()=>{setPage(page);onClose()}}><span className="notification-dot"><Bell size={13}/></span><span><b>{title}</b><small>{text}</small></span><ArrowUpRight size={14}/></button>)}</div><div className="notification-footer"><Sparkles size={14}/> You're all set — no urgent alerts.</div></div>;
}

function ProfilePage({user,role,notify}) {
  const initials=(user.name||"U").split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase();
  const [name,setName]=useState(user.name||""); const [email,setEmail]=useState(user.email||"");
  const save=()=>{const key=role==="Administrator"?"lf-admin-users":"lf-users"; let users=JSON.parse(localStorage.getItem(key)||"[]"); if(role==="Administrator" && !users.some(u=>u.email===user.email)){users=[{...user,password:"admin123"},...users];} const next=users.map(u=>u.email===user.email?{...u,name}:u); localStorage.setItem(key,JSON.stringify(next)); const session={...user,name}; localStorage.setItem("lf-auth-user",JSON.stringify(session)); notify("Profile updated successfully.");};
  return <><PageHeading eyebrow="ACCOUNT" title="My profile" subtitle="Manage your LibraryFlow account details."/><div className="profile-layout"><section className="panel profile-hero"><div className="profile-big-avatar">{initials}</div><div><span className="eyebrow">{role.toUpperCase()}</span><h2>{name||"Library member"}</h2><p>{email}</p></div><span className="status active"><i/>Active</span></section><section className="panel profile-form"><div className="panel-head"><div><h3>Profile details</h3><p>Update the information shown in your workspace.</p></div></div><div className="profile-fields"><label>Full name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Email address<input value={email} readOnly/></label><label>Account type<input value={role} readOnly/></label><button className="button primary" onClick={save}>Save changes</button></div></section></div></>;
}

function QuickGuide({isAdmin,onClose,setPage}) { const steps=isAdmin?[['01','Dashboard','See collection, activity and useful tools.','Overview'],['02','Book catalog','Add, search and manage your books.','Book catalog'],['03','Members + QR','Register members quickly using the QR page.','QR Registration'],['04','Issue & return','Process borrowing and returns.','Issue & return'],['05','Reports','Review circulation and collection insights.','Reports']]:[['01','Dashboard','See loans, reservations and reading tips.','My Dashboard'],['02','Browse books','Search by title, author or category.','Browse books'],['03','Borrow or reserve','Borrow available books or reserve a title.','Browse books'],['04','My loans','Track due dates and return books.','My loans'],['05','Profile','Keep your account details up to date.','Profile']]; return <div className="guide-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><section className="guide-modal"><div className="guide-head"><div><span className="eyebrow">LIBRARYFLOW</span><h2>Quick guide</h2><p>A simple walkthrough for your {isAdmin?'administrator':'student'} workspace.</p></div><button className="icon-button" onClick={onClose}><X size={18}/></button></div><div className="guide-list">{steps.map(([n,t,d,page])=><button key={n} onClick={()=>{setPage(page);onClose()}}><span>{n}</span><div><b>{t}</b><small>{d}</small></div><ArrowUpRight size={16}/></button>)}</div><div className="guide-tip"><Sparkles size={16}/><span><b>Tip:</b> Use the sidebar to move between modules without losing your saved Local Storage data.</span></div></section></div>; }

function SettingsPage({dark,setDark,notify,role}) {
  const [notifications,setNotifications]=useState(()=>localStorage.getItem("lf-notifications")!=="false");
  const [autoSave,setAutoSave]=useState(()=>localStorage.getItem("lf-autosave")!=="false");
  const [language,setLanguage]=useState(()=>localStorage.getItem("lf-language")||"English");
  const [density,setDensity]=useState(()=>localStorage.getItem("lf-density")||"Comfortable");
  const [saved,setSaved]=useState(false);
  const savePreferences=()=>{localStorage.setItem("lf-notifications",String(notifications));localStorage.setItem("lf-autosave",String(autoSave));localStorage.setItem("lf-language",language);localStorage.setItem("lf-density",density);setSaved(true);notify("Settings saved successfully.");setTimeout(()=>setSaved(false),1800);};
  const clearSearch=()=>{localStorage.removeItem("lf-last-search");notify("Search preferences cleared.");};
  const resetAppearance=()=>{setDark(false);setDensity("Comfortable");localStorage.setItem("lf-density","Comfortable");notify("Appearance restored to default.");};
  return <><PageHeading eyebrow="PREFERENCES & CONTROL" title="Settings" subtitle="Personalize your LibraryFlow workspace and manage your academic demo preferences." action={<button className="button primary" onClick={savePreferences}><Save size={16}/> {saved?"Saved":"Save settings"}</button>}/>
    <div className="settings-grid">
      <section className="panel settings-panel"><div className="panel-head"><div><h3>Appearance</h3><p>Make the workspace comfortable for long study sessions.</p></div></div>
        <div className="setting-row"><div><b>Theme</b><p>Switch between light and dark mode.</p></div><button className="button outline" onClick={()=>setDark(!dark)}>{dark ? "Use light mode" : "Use dark mode"}</button></div>
        <div className="setting-row"><div><b>Display density</b><p>Choose how much information appears on each screen.</p></div><select className="category-select setting-select" value={density} onChange={e=>setDensity(e.target.value)}><option>Comfortable</option><option>Compact</option><option>Spacious</option></select></div>
        <div className="setting-row"><div><b>Reset appearance</b><p>Return theme and spacing to the default view.</p></div><button className="button ghost" onClick={resetAppearance}><RefreshCw size={15}/> Reset</button></div>
      </section>
      <section className="panel settings-panel"><div className="panel-head"><div><h3>Notifications & preferences</h3><p>Control how LibraryFlow keeps you informed.</p></div></div>
        <div className="setting-row"><div><b>Workspace notifications</b><p>Show useful updates in the top-right notification panel.</p></div><button className={`toggle ${notifications?"on":""}`} onClick={()=>setNotifications(!notifications)} aria-label="Toggle notifications"><span/></button></div>
        <div className="setting-row"><div><b>Auto-save</b><p>Keep books, loans, reservations and settings in Local Storage.</p></div><button className={`toggle ${autoSave?"on":""}`} onClick={()=>setAutoSave(!autoSave)} aria-label="Toggle auto save"><span/></button></div>
        <div className="setting-row"><div><b>Language</b><p>Choose the interface language for this academic demo.</p></div><select className="category-select setting-select" value={language} onChange={e=>setLanguage(e.target.value)}><option>English</option><option>Telugu</option><option>Hindi</option></select></div>
      </section>
      <section className="panel settings-panel"><div className="panel-head"><div><h3>Account & security</h3><p>Information about your current access.</p></div></div>
        <div className="setting-row"><div><b>Account type</b><p>Your current access level is <strong>{role}</strong>.</p></div><span className="status active"><i/>Active</span></div>
        <div className="setting-row"><div><b>Session security</b><p>Your session is kept in this browser using Local Storage for the project demo.</p></div><span className="security-badge"><ShieldCheck size={15}/> Protected</span></div>
      </section>
      <section className="panel settings-panel"><div className="panel-head"><div><h3>Library data</h3><p>Useful maintenance actions for your project demo.</p></div></div>
        <div className="setting-row"><div><b>Local Storage status</b><p>Books, accounts, members, loans and reservations are stored locally.</p></div><button className="button outline" onClick={()=>notify("Local Storage is available and working.")}>Check status</button></div>
        <div className="setting-row"><div><b>Clear search preferences</b><p>Remove saved search-related preferences without deleting library records.</p></div><button className="button ghost" onClick={clearSearch}>Clear</button></div>
      </section>
    </div>
  </>; }

function Reports({books,loans}) { return <>
  <PageHeading eyebrow="INSIGHTS & ANALYTICS" title="Library reports" subtitle="Understand how your collection is performing." action={<button className="button outline" onClick={()=>window.print()}>Export report <ArrowUpRight size={15}/></button>}/>
  <div className="stats-grid"><Stat icon={BookOpen} label="Total titles" value={books.length} change="+3 new" note="recently added" tone="purple"/><Stat icon={ArrowLeftRight} label="Total active loans" value={loans.length} change="Live" note="current circulation" tone="orange"/><Stat icon={Users} label="Member engagement" value="84%" change="+6.2%" note="vs. last month" tone="green"/><Stat icon={TrendingUp} label="Monthly growth" value="18.4%" change="+2.1%" note="collection growth" tone="blue"/></div>
  <div className="dashboard-grid"><div className="panel chart-panel"><div className="panel-head"><div><h3>Borrowing activity</h3><p>Books issued over the last 6 months.</p></div><span className="chart-tag">2026</span></div><div className="bar-chart">{[42,58,48,76,62,92].map((v,i)=><div className="bar-col"><div className="bar-value">{v}</div><div className="bar-track"><i style={{height:`${v}%`}}/></div><span>{["Jun","Jul","Aug","Sep","Oct","Nov"][i]}</span></div>)}</div></div><div className="panel"><div className="panel-head"><div><h3>Top categories</h3><p>Share of your collection.</p></div></div><div className="category-bars">{[["Self growth",82,"purple"],["Fiction",67,"orange"],["Technology",53,"blue"],["Finance",39,"green"]].map(([n,v,c])=><div className="category-bar"><div><span>{n}</span><b>{v}%</b></div><div className="progress"><i className={c} style={{width:`${v}%`}}/></div></div>)}</div></div></div>
</>; }
export default App;
