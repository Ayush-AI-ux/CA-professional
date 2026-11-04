import { useState } from "react";
import { FileText, ExternalLink, Download } from "lucide-react";

export default function ResearchView({ docs }) {
  const [index, setIndex] = useState(0);
  const doc = docs[index];

  if (!doc) {
    return <div className="placeholder">No research papers uploaded yet.</div>;
  }

  const downloadUrl = `${doc.url}?download=${encodeURIComponent(doc.fileName)}`;

  return (
    <div className="research">
      <aside className="paper-list">
        <div className="paper-list-head">
          Papers <span>{String(docs.length).padStart(2, "0")}</span>
        </div>
        {docs.map((d, i) => (
          <button
            key={d.path}
            className={`paper-item ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          >
            <FileText size={18} />
            <div>
              <div className="paper-name">{d.name}</div>
            </div>
          </button>
        ))}
      </aside>

      <section className="reader">
        <div className="reader-bar">
          <div className="reader-title">{doc.name}</div>
          <div className="reader-actions">
            <a className="frame-btn" href={doc.url} target="_blank" rel="noreferrer">
              <ExternalLink size={15} /> Open
            </a>
            <a className="frame-btn" href={downloadUrl}>
              <Download size={15} /> Download
            </a>
          </div>
        </div>
        <iframe
          key={doc.path}
          title={doc.name}
          src={`${doc.url}#view=FitH`}
          className="pdf-frame"
        />
        <p className="reader-note">
          If the paper doesn't display on your device, use <b>Open</b> or <b>Download</b> above.
        </p>
      </section>
    </div>
  );
}