import { useEffect, useRef, useState } from "react";
import { Maximize2 } from "lucide-react";

export default function DashboardView({ docs }) {
  const [index, setIndex] = useState(0);
  const [html, setHtml] = useState("");
  const [failed, setFailed] = useState(false);
  const frameRef = useRef(null);

  const doc = docs[index];
  const url = doc?.url;

  useEffect(() => {
    if (!url) return;
    const ctrl = new AbortController();
    setHtml("");
    setFailed(false);
    fetch(url, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(setHtml)
      .catch((e) => {
        if (e.name !== "AbortError") setFailed(true);
      });
    return () => ctrl.abort();
  }, [url]);

  if (!doc) {
    return <div className="placeholder">No dashboards uploaded yet.</div>;
  }

  return (
    <>
      <div className="frame-bar">
        <div className="frame-tabs">
          {docs.length > 1 &&
            docs.map((d, i) => (
              <button
                key={d.path}
                className={`frame-tab ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              >
                {d.name}
              </button>
            ))}
          {docs.length === 1 && <span className="frame-title">{doc.name}</span>}
        </div>
        <button
          className="frame-btn"
          onClick={() => frameRef.current?.requestFullscreen?.()}
        >
          <Maximize2 size={15} /> Full screen
        </button>
      </div>

      {failed ? (
        <div className="placeholder">Couldn't load this dashboard.</div>
      ) : !html ? (
        <div className="placeholder">Loading dashboard…</div>
      ) : (
        <iframe
          ref={frameRef}
          title={doc.name}
          srcDoc={html}
          sandbox="allow-scripts"
          className="dash-frame"
        />
      )}
    </>
  );
}