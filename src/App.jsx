import { useCallback, useEffect, useState } from "react";
import { Home, FileText, BarChart3, Table2, Mail, Download } from "lucide-react";
import Overview from "./components/Overview";
import DashboardView from "./components/DashboardView";
import ResearchView from "./components/ResearchView";
import ExcelView from "./components/ExcelView";
import { profile } from "./data/profile";
import { listAll } from "./lib/documents";

const NAV = [
  { id: "overview", label: "Candidate Profile", icon: Home },
  { id: "research", label: "Research Papers", icon: FileText },
  { id: "dashboard", label: "Analytical Dashboards", icon: BarChart3 },
  { id: "workbooks", label: "Financial Model", icon: Table2 },
];

const initials =
  profile.initials ||
  profile.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function App() {
  const [page, setPage] = useState("overview");
  const [docs, setDocs] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    try {
      setDocs(await listAll());
      setStatus("ready");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const current = NAV.find((n) => n.id === page) ?? NAV[0];
  const sec = (s) => docs.filter((d) => d.section === s);
  const { email, cvUrl } = profile.contact;

  const renderPage = () => {
    if (status === "loading") return <div className="placeholder">Loading documents…</div>;
    if (status === "error")
      return (
        <div className="placeholder">
          Couldn't reach the document store. Check the .env keys and the storage read policy.
        </div>
      );

    if (page === "overview") return <Overview docs={docs} onNavigate={setPage} />;

    return (
      <>
        <div className="page-head">
          <h2>{current.label}</h2>
        </div>
        {page === "dashboard" ? (
          <DashboardView docs={sec("dashboard")} />
        ) : page === "research" ? (
          <ResearchView docs={sec("research")} />
        ) : (
          <ExcelView docs={sec("workbooks")} />
        )}
      </>
    );
  };

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">{initials}</div>
          <div>
            <div className="brand-name">{profile.name}</div>
            <div className="brand-sub">{profile.title}</div>
          </div>
        </div>

        <div className="top-right">
          <span className="open-pill">Open to {profile.openTo}</span>
          {cvUrl && (
            <a className="tb-btn" href={cvUrl} download>
              <Download size={14} /> CV
            </a>
          )}
          {email && (
            <a className="tb-btn solid" href={`mailto:${email}`}>
              <Mail size={14} /> Contact
            </a>
          )}
        </div>
      </header>

      <div className="shell">
        <nav className="sidebar">
          <div className="nav-label">Contents</div>
          {NAV.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`nav-btn ${page === id ? "active" : ""}`}
              onClick={() => setPage(id)}
            >
              <Icon size={18} /> {label}
            </button>
          ))}
        </nav>

        <main
          className={`content ${
            ["dashboard", "research", "workbooks"].includes(page) ? "wide" : ""
          }`}
        >
          {renderPage()}
        </main>
      </div>
    </>
  );
}