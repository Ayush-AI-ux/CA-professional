// import { ArrowRight, Mail, Phone, ExternalLink, Download } from "lucide-react";
// import { profile } from "../data/profile";
// import { formatDate } from "../lib/documents";

// const CATEGORY = {
//   research: "Technical research",
//   dashboard: "Analytical review",
//   workbooks: "Working paper (Excel)",
// };
// const PREFIX = { research: "R", dashboard: "D", workbooks: "W" };

// export default function Overview({ docs, onNavigate }) {
//   // Give every document an audit-style reference number: R-01, D-01, W-01...
//   const indexed = Object.keys(PREFIX).flatMap((section) =>
//     docs
//       .filter((d) => d.section === section)
//       .map((d, i) => ({
//         ...d,
//         ref: `${PREFIX[section]}-${String(i + 1).padStart(2, "0")}`,
//       }))
//   );

//   const particulars = [
//     ["Qualification", profile.qualification],
//     ["Seeking", profile.openTo],
//     ["Availability", profile.availability],
//     ["Location", profile.location],
//   ].filter(([, v]) => v);

//   const { email, phone, linkedin, cvUrl } = profile.contact;

//   return (
//     <>
//       <div className="page-head">
//         <h2>Candidate Profile</h2>
//         <p>Work samples prepared for review, indexed like working papers.</p>
//       </div>

//       <section className="profile-card">
//         <div className="pc-main">
//           <h3 className="pc-name">{profile.name}</h3>
//           <div className="pc-title">{profile.title}</div>
//           <p className="pc-tag">{profile.tagline}</p>
//           <div className="skills">
//             {profile.tools.map((t) => (
//               <span className="skill" key={t}>{t}</span>
//             ))}
//           </div>
//         </div>
//         <dl className="particulars">
//           {particulars.map(([k, v]) => (
//             <div key={k}>
//               <dt>{k}</dt>
//               <dd>{v}</dd>
//             </div>
//           ))}
//         </dl>
//       </section>

//       <h3 className="sec-title">What I bring</h3>
//       <div className="strengths">
//         {profile.strengths.map((s) => (
//           <button key={s.title} className="strength" onClick={() => onNavigate(s.to)}>
//             <div className="strength-title">{s.title}</div>
//             <p>{s.text}</p>
//             <span className="strength-link">
//               {s.evidence} <ArrowRight size={14} />
//             </span>
//           </button>
//         ))}
//       </div>

//       <section className="ledger">
//         <h3>Working Papers Index</h3>
//         <div className="table-wrap">
//           <table>
//             <thead>
//               <tr>
//                 <th>Ref</th>
//                 <th>Particulars</th>
//                 <th>Nature of work</th>
//                 <th>Added</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {indexed.length === 0 ? (
//                 <tr><td colSpan={5} className="mono">No documents yet.</td></tr>
//               ) : (
//                 indexed.map((d) => (
//                   <tr key={d.path}>
//                     <td className="mono ref">{d.ref}</td>
//                     <td>{d.name}</td>
//                     <td>{CATEGORY[d.section]}</td>
//                     <td className="mono">{formatDate(d.date)}</td>
//                     <td style={{ textAlign: "right" }}>
//                       <button className="view-link" onClick={() => onNavigate(d.section)}>
//                         View <ArrowRight size={14} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       <section className="contact-strip">
//         <div>
//           <div className="cs-title">Open to CA Industrial Training</div>
//           <div className="cs-sub">Happy to share more detail on any of the work above.</div>
//         </div>
//         <div className="cs-actions">
//           {email && (
//             <a href={`mailto:${email}`}><Mail size={15} /> {email}</a>
//           )}
//           {phone && (
//             <a href={`tel:${phone.replace(/\s/g, "")}`}><Phone size={15} /> {phone}</a>
//           )}
//           {linkedin && (
//             <a href={linkedin} target="_blank" rel="noreferrer">
//               <ExternalLink size={15} /> LinkedIn
//             </a>
//           )}
//           {cvUrl && (
//             <a href={cvUrl} download><Download size={15} /> Download CV</a>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

import { ArrowRight, Mail, Phone, ExternalLink, Download } from "lucide-react";
import { profile } from "../data/profile";

const CATEGORY = {
  research: "Technical research",
  dashboard: "Analytical review",
  workbooks: "Working paper (Excel)",
};
const PREFIX = { research: "R", dashboard: "D", workbooks: "W" };

export default function Overview({ docs, onNavigate }) {
  // Give every document an audit-style reference number: R-01, D-01, W-01...
  const indexed = Object.keys(PREFIX).flatMap((section) =>
    docs
      .filter((d) => d.section === section)
      .map((d, i) => ({
        ...d,
        ref: `${PREFIX[section]}-${String(i + 1).padStart(2, "0")}`,
      }))
  );

  const particulars = [
    ["Qualification", profile.qualification],
    ["Seeking", profile.openTo],
    ["Availability", profile.availability],
    ["Location", profile.location],
  ].filter(([, v]) => v);

  const { email, phone, linkedin, cvUrl } = profile.contact;

  return (
    <>
      <div className="page-head">
        <h2>Candidate Profile</h2>
        <p>Work samples prepared for review, indexed like working papers.</p>
      </div>

      <section className="profile-card">
        <div className="pc-main">
          <h3 className="pc-name">{profile.name}</h3>
          <div className="pc-title">{profile.title}</div>
          <p className="pc-tag">{profile.tagline}</p>
          <div className="skills">
            {profile.tools.map((t) => (
              <span className="skill" key={t}>{t}</span>
            ))}
          </div>
        </div>
        <dl className="particulars">
          {particulars.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <h3 className="sec-title">What I bring</h3>
      <div className="strengths">
        {profile.strengths.map((s) => (
          <button key={s.title} className="strength" onClick={() => onNavigate(s.to)}>
            <div className="strength-title">{s.title}</div>
            <p>{s.text}</p>
            <span className="strength-link">
              {s.evidence} <ArrowRight size={14} />
            </span>
          </button>
        ))}
      </div>

      <section className="ledger">
        <h3>Working Papers Index</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ref</th>
                <th>Particulars</th>
                <th>Nature of work</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {indexed.length === 0 ? (
                <tr><td colSpan={4} className="mono">No documents yet.</td></tr>
              ) : (
                indexed.map((d) => (
                  <tr key={d.path}>
                    <td className="mono ref">{d.ref}</td>
                    <td>{d.name}</td>
                    <td>{CATEGORY[d.section]}</td>
                    <td style={{ textAlign: "right" }}>
                      <button className="view-link" onClick={() => onNavigate(d.section)}>
                        View <ArrowRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="contact-strip">
        <div>
          <div className="cs-title">Open to CA Industrial Training</div>
          <div className="cs-sub">Happy to share more detail on any of the work above.</div>
        </div>
        <div className="cs-actions">
          {email && (
            <a href={`mailto:${email}`}><Mail size={15} /> {email}</a>
          )}
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`}><Phone size={15} /> {phone}</a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer">
              <ExternalLink size={15} /> LinkedIn
            </a>
          )}
          {cvUrl && (
            <a href={cvUrl} download><Download size={15} /> Download CV</a>
          )}
        </div>
      </section>
    </>
  );
}