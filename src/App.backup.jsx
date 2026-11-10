import React, { useMemo, useState } from "react";
import {
  LayoutDashboard, BookOpen, Users, ArrowLeftRight, ChartNoAxesCombined,
  Settings, Search, Bell, Plus, ChevronDown, MoreHorizontal, Clock3,
  BookMarked, CircleCheck, TrendingUp, Menu, X, Filter, CalendarDays,
  ArrowUpRight, Sparkles, LibraryBig, RotateCcw, Trash2, Check, Sun, Moon
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
  { label: "QR Registration", icon: Check },
  { label: "Issue & return", icon: ArrowLeftRight },
  { label: "Reports", icon: ChartNoAxesCombined }
];

function App() {
  const [authUser, setAuthUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("lf-auth-user") || "null"); } catch { return null; }
  });
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");

  const [page, setPage] = useState(new URLSearchParams(window.location.search).get("page")==="register" ? "QR Registration" : "Overview");
  const [books, setBooks] = useState(() => JSON.parse(localStorage.getItem("lf-books") || "null") || initialBooks);
  const [loans, setLoans] = useState(() => JSON.parse(localStorage.getItem("lf-loans") || "null") || initialLoans);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All categories");
  const [showAdd, setShowAdd] = useState(false);
  const [registeredMembers, setRegisteredMembers] = useState(() => JSON.parse(localStorage.getItem("lf-members") || "null") || []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({ title: "", author: "", category: "Technology", copies: 1, isbn: "" });

  const saveBooks = (next) => { setBooks(next); localStorage.setItem("lf-books", JSON.stringify(next)); };
  const saveLoans = (next) => { setLoans(next); localStorage.setItem("lf-loans", JSON.stringify(next)); };
  const notify = (message) => { setToast(message); window.setTimeout(() => setToast(""), 2600); };
  const filteredBooks = useMemo(() => books.filter(b =>
    (b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase()) || b.isbn.includes(query)) &&
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
  const issueBook = (book) => {
    if (!book.available) { notify("No copies currently available."); return; }
    const nextBooks = books.map(b => b.id === book.id ? { ...b, available: b.available - 1 } : b);
    saveBooks(nextBooks);
    saveLoans([{ id: Date.now(), name: "New Member", book: book.title, date: "Nov 05, 2026", due: "Nov 19, 2026", state: "Active" }, ...loans]);
    notify(`“${book.title}” issued successfully.`);
  };
  const returnBook = (loan) => {
    saveLoans(loans.filter(l => l.id !== loan.id));
    saveBooks(books.map(b => b.title === loan.book ? { ...b, available: Math.min(b.copies, b.available + 1) } : b));
    notify("Book marked as returned.");
  };

  if (!authUser) return <AuthScreen mode={authMode} setMode={setAuthMode} error={authError} setError={setAuthError} onAuth={(user)=>{localStorage.setItem("lf-auth-user",JSON.stringify(user));setAuthUser(user);}} />;
  return (
    <div className={dark ? "app dark" : "app"}>
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand"><div className="brand-mark"><LibraryBig size={21}/></div><span>library<span className="brand-accent">flow</span></span><button className="mobile-close" onClick={() => setMobileOpen(false)}><X size={19}/></button></div>
        <div className="workspace"><div className="workspace-icon"><LibraryBig size={19}/></div><div><b>LibraryFlow</b><small>Administrator workspace</small></div></div>
        <div className="nav-caption">WORKSPACE</div>
        <nav>{nav.map(item => <button key={item.label} className={`nav-item ${page === item.label ? "active" : ""}`} onClick={() => {setPage(item.label);setMobileOpen(false);}}><item.icon size={18}/><span>{item.label}</span>{item.label === "Issue & return" && <i className="nav-count">{loans.length}</i>}</button>)}</nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-spark"><Sparkles size={17}/></div><b>Need a hand?</b><p>Explore the quick guide to get the most out of LibraryFlow.</p><button onClick={() => notify("Quick guide is coming soon.")}>Open guide <ArrowUpRight size={14}/></button></div><button className="nav-item"><Settings size={18}/><span>Settings</span></button><div className="profile"><div className="avatar">NS</div><div><b>Nithish S.</b><small>Administrator</small></div><MoreHorizontal size={18}/></div><button className="logout-side" onClick={()=>{localStorage.removeItem("lf-auth-user");setAuthUser(null);setAuthMode("login");}}>↪ Logout</button>
      </div>
      </aside>

      <main className="main">
        <header className="topbar"><button className="hamburger" onClick={() => setMobileOpen(true)}><Menu/></button><div className="breadcrumb">Workspace <span>/</span> <b>{page}</b></div><div className="top-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><button className="icon-button notification" onClick={() => notify("You're all caught up!") }><Bell size={18}/><i/></button><div className="top-avatar">NS</div></div></header>
        <div className="content">
          {page === "Overview" && <Overview books={books} loans={loans} setPage={setPage} returnBook={returnBook}/>}
          {page === "Book catalog" && <Catalog books={filteredBooks} query={query} setQuery={setQuery} category={category} setCategory={setCategory} onAdd={() => setShowAdd(true)} onIssue={issueBook}/>}
          {page === "Members" && <Members loans={loans}/>}
          {page === "QR Registration" && <QRRegistration members={registeredMembers} onRegister={(member)=>{const next=[{...member,id:Date.now(),joined:new Date().toLocaleDateString()},...registeredMembers];setRegisteredMembers(next);localStorage.setItem("lf-members",JSON.stringify(next));notify("Member registered successfully.");}}/>}
          {page === "Issue & return" && <Loans loans={loans} onReturn={returnBook}/>}
          {page === "Reports" && <Reports books={books} loans={loans}/>}
        </div>
      </main>

      {showAdd && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setShowAdd(false)}><form className="modal" onSubmit={addBook}><div className="modal-head"><div><span className="eyebrow">CATALOG MANAGEMENT</span><h2>Add a new book</h2><p>Enter the details to add a title to your library.</p></div><button type="button" className="icon-button" onClick={() => setShowAdd(false)}><X size={18}/></button></div><label>Book title<input required placeholder="e.g. The Design of Everyday Things" value={form.title} onChange={e => setForm({...form,title:e.target.value})}/></label><label>Author<input required placeholder="Author name" value={form.author} onChange={e => setForm({...form,author:e.target.value})}/></label><div className="form-row"><label>Category<select value={form.category} onChange={e => setForm({...form,category:e.target.value})}>{["Technology","Fiction","Finance","Self Growth","Productivity","Science","Biography","History","Business"].map(x => <option key={x}>{x}</option>)}</select></label><label>Copies<input type="number" min="1" value={form.copies} onChange={e => setForm({...form,copies:e.target.value})}/></label></div><label>ISBN <span className="optional">(optional)</span><input placeholder="ISBN number" value={form.isbn} onChange={e => setForm({...form,isbn:e.target.value})}/></label><div className="modal-actions"><button type="button" className="button ghost" onClick={() => setShowAdd(false)}>Cancel</button><button className="button primary"><Plus size={16}/> Add book</button></div></form></div>}
      {toast && <div className="toast"><CircleCheck size={18}/>{toast}</div>}
    </div>
  );
}

function PageHeading({ eyebrow, title, subtitle, action }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}
function Overview({ books, loans, setPage, returnBook }) {
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
    <div className="section-heading"><div><h3>Popular titles</h3><p>Reader favorites from your collection.</p></div><button className="text-button" onClick={() => setPage("Book catalog")}>Browse catalog <ArrowUpRight size={14}/></button></div><div className="book-grid">{books.slice(0,4).map(b=><BookCard key={b.id} book={b}/>)}</div>
  </>;
}
function Stat({icon:Icon,label,value,change,note,tone}) { return <div className="stat-card"><div className="stat-top"><div className={`stat-icon ${tone}`}><Icon size={18}/></div><span className="stat-change"><TrendingUp size={12}/>{change}</span></div><div className="stat-value">{value}</div><div className="stat-label">{label}</div><div className="stat-note">{note}</div></div>; }
function Legend({color,label,value}) { return <div className="legend-row"><i className={color}/><span>{label}</span><b>{value}</b></div>; }
function BookCard({book}) { return <div className="book-card"><div className={`book-cover ${book.color}`} aria-label={`Cover image for ${book.title}`}>
  <img className="real-book-cover" src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={`${book.title} book cover`} loading="lazy" onError={e=>{e.currentTarget.style.display="none";e.currentTarget.nextElementSibling.style.display="flex";}} />
  <div className="cover-fallback" style={{display:"none"}}><span className="cover-ornament"><i/><i/><i/></span><span className="cover-rule"/><span className="cover-title">{book.title}</span><span className="cover-author">{book.author}</span><span className="cover-bottom-ornament">✦</span></div>
</div><div className="book-card-info"><span className="book-category">{book.category}</span><h4>{book.title}</h4><p>{book.author}</p><div className="book-card-foot"><span className="rating">✦ <b>4.8</b></span><span className={book.available ? "available-text" : "unavailable-text"}>{book.available} available</span></div></div></div>; }
function Catalog({books,query,setQuery,category,setCategory,onAdd,onIssue}) { return <>
  <PageHeading eyebrow="LIBRARY COLLECTION" title="Book catalog" subtitle="Discover, organize, and manage every title in your collection." action={<button className="button primary" onClick={onAdd}><Plus size={17}/> Add new book</button>}/>
  <div className="catalog-toolbar"><div className="search-box"><Search size={17}/><input placeholder="Search by title, author or ISBN..." value={query} onChange={e=>setQuery(e.target.value)}/>{query && <button onClick={()=>setQuery("")}><X size={14}/></button>}</div><div className="select-wrap"><Filter size={16}/><select value={category} onChange={e=>setCategory(e.target.value)}>{["All categories",...new Set(books.map(b=>b.category))].map(c=><option key={c}>{c}</option>)}</select><ChevronDown size={14}/></div><span className="result-count">{books.length} titles found</span></div>
  <div className="catalog-grid">{books.map(b=><div className="catalog-item" key={b.id}><BookCard book={b}/><button className="button outline full" disabled={!b.available} onClick={()=>onIssue(b)}>{b.available ? "Issue this book" : "Currently unavailable"}</button></div>)}</div>
  {books.length===0 && <div className="empty-state"><BookOpen size={30}/><h3>No books found</h3><p>Try a different search or category filter.</p></div>}
</>; }
function Loans({loans,onReturn}) { return <>
  <PageHeading eyebrow="CIRCULATION DESK" title="Issue & return" subtitle="Track active loans, due dates, and returned books." action={<div className="date-pill"><CalendarDays size={16}/> November 5, 2026</div>}/>
  <div className="loan-summary"><div><span>Active loans</span><b>{loans.length}</b></div><div><span>Overdue books</span><b className="danger-number">{loans.filter(l=>l.state==="Overdue").length}</b></div><div><span>Due this week</span><b>08</b></div></div>
  <div className="panel loans-panel"><div className="panel-head"><div><h3>Borrowing records</h3><p>Manage checkouts and process returns.</p></div><div className="search-box compact"><Search size={16}/><input placeholder="Search records..."/></div></div><div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>BOOK TITLE</th><th>ISSUE DATE</th><th>DUE DATE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{loans.map((l,i)=><tr key={l.id}><td><div className="member-cell"><div className={`mini-avatar av${i%4}`}>{l.name.split(" ").map(x=>x[0]).join("").slice(0,2)}</div><b>{l.name}</b></div></td><td>{l.book}</td><td>{l.date}</td><td>{l.due}</td><td><span className={`status ${l.state.toLowerCase()}`}><i/>{l.state}</span></td><td><button className="button tiny" onClick={()=>onReturn(l)}><Check size={13}/> Return</button></td></tr>)}</tbody></table></div>{loans.length===0&&<div className="empty-state">No active borrowing records.</div>}</div>
</>; }
function Members({loans}) { const names=[["Aarav Sharma","aarav@example.com","Student","AS"],["Diya Patel","diya@example.com","Student","DP"],["Rohan Mehta","rohan@example.com","Faculty","RM"],["Ananya Rao","ananya@example.com","Student","AR"],["Ishaan Gupta","ishaan@example.com","Student","IG"],["Meera Nair","meera@example.com","Faculty","MN"]];return <>
  <PageHeading eyebrow="COMMUNITY" title="Library members" subtitle="A quick look at the people who make your library thrive." action={<button className="button primary"><Plus size={17}/> Add member</button>}/>
  <div className="stats-grid member-stats"><Stat icon={Users} label="Registered members" value="248" change="+8.6%" note="vs. last month" tone="purple"/><Stat icon={BookMarked} label="Borrowing members" value="86" change="+5.1%" note="currently active" tone="green"/><Stat icon={Clock3} label="Pending returns" value={loans.length.toString().padStart(2,"0")} change="This week" note="across all members" tone="orange"/></div>
  <div className="panel"><div className="panel-head"><div><h3>Member directory</h3><p>Recently active library members.</p></div><div className="search-box compact"><Search size={16}/><input placeholder="Search members..."/></div></div><div className="table-wrap"><table><thead><tr><th>MEMBER</th><th>EMAIL</th><th>MEMBERSHIP</th><th>BOOKS BORROWED</th><th>STATUS</th></tr></thead><tbody>{names.map((n,i)=><tr><td><div className="member-cell"><div className={`mini-avatar av${i%4}`}>{n[3]}</div><b>{n[0]}</b></div></td><td>{n[1]}</td><td>{n[2]}</td><td>{i%3+1}</td><td><span className="status active"><i/>Active</span></td></tr>)}</tbody></table></div></div>
</>; }


function AuthScreen({mode,setMode,error,setError,onAuth}) {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const submit=e=>{
    e.preventDefault();setError("");
    if(password.length<6){setError("Password must contain at least 6 characters.");return;}
    const users=JSON.parse(localStorage.getItem("lf-admin-users")||"[]");
    if(mode==="register"){
      if(users.some(u=>u.email.toLowerCase()===email.toLowerCase())){setError("An account with this email already exists.");return;}
      const user={name,email,password};users.push(user);localStorage.setItem("lf-admin-users",JSON.stringify(users));onAuth({name,email});
    } else {
      const user=users.find(u=>u.email.toLowerCase()===email.toLowerCase()&&u.password===password);
      if(!user){setError("Invalid email or password. Register an admin account first.");return;}
      onAuth({name:user.name,email:user.email});
    }
  };
  return <main className="auth-screen"><section className="auth-card"><div className="auth-brand"><span>▥</span> library<span>flow</span></div><p className="eyebrow">ADMIN WORKSPACE</p><h1>{mode==="login"?"Welcome back":"Create administrator account"}</h1><p className="auth-sub">{mode==="login"?"Sign in to manage your library.":"Register to get started with LibraryFlow."}</p>
  <form onSubmit={submit}>{mode==="register"&&<label>Full name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/></label>}<label>Email address<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com"/></label><label>Password<input required type="password" minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="At least 6 characters"/></label>{error&&<p className="auth-error">{error}</p>}<button className="button primary auth-submit">{mode==="login"?"Sign in":"Create account"}</button></form>
  <p className="auth-switch">{mode==="login"?"New to LibraryFlow?":"Already have an account?"} <button onClick={()=>{setError("");setMode(mode==="login"?"register":"login");}}>{mode==="login"?"Create account":"Sign in"}</button></p><small className="auth-demo">Demo authentication uses browser local storage (not a secure production backend).</small></section></main>;
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

function Reports({books,loans}) { return <>
  <PageHeading eyebrow="INSIGHTS & ANALYTICS" title="Library reports" subtitle="Understand how your collection is performing." action={<button className="button outline" onClick={()=>window.print()}>Export report <ArrowUpRight size={15}/></button>}/>
  <div className="stats-grid"><Stat icon={BookOpen} label="Total titles" value={books.length} change="+3 new" note="recently added" tone="purple"/><Stat icon={ArrowLeftRight} label="Total active loans" value={loans.length} change="Live" note="current circulation" tone="orange"/><Stat icon={Users} label="Member engagement" value="84%" change="+6.2%" note="vs. last month" tone="green"/><Stat icon={TrendingUp} label="Monthly growth" value="18.4%" change="+2.1%" note="collection growth" tone="blue"/></div>
  <div className="dashboard-grid"><div className="panel chart-panel"><div className="panel-head"><div><h3>Borrowing activity</h3><p>Books issued over the last 6 months.</p></div><span className="chart-tag">2026</span></div><div className="bar-chart">{[42,58,48,76,62,92].map((v,i)=><div className="bar-col"><div className="bar-value">{v}</div><div className="bar-track"><i style={{height:`${v}%`}}/></div><span>{["Jun","Jul","Aug","Sep","Oct","Nov"][i]}</span></div>)}</div></div><div className="panel"><div className="panel-head"><div><h3>Top categories</h3><p>Share of your collection.</p></div></div><div className="category-bars">{[["Self growth",82,"purple"],["Fiction",67,"orange"],["Technology",53,"blue"],["Finance",39,"green"]].map(([n,v,c])=><div className="category-bar"><div><span>{n}</span><b>{v}%</b></div><div className="progress"><i className={c} style={{width:`${v}%`}}/></div></div>)}</div></div></div>
</>; }
export default App;
