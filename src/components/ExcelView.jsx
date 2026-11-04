// import { useEffect, useMemo, useState } from "react";
// import * as XLSX from "xlsx";
// import { Download } from "lucide-react";
// import { Download, Info } from "lucide-react";

// const MAX_ROWS = 500;

// // 0 -> A, 25 -> Z, 26 -> AA
// const colName = (n) => {
//   let s = "";
//   n += 1;
//   while (n > 0) {
//     const r = (n - 1) % 26;
//     s = String.fromCharCode(65 + r) + s;
//     n = Math.floor((n - 1) / 26);
//   }
//   return s;
// };

// const isNumeric = (v) => v !== "" && /^[\d,.\-+()%₹$\s]+$/.test(String(v));

// export default function ExcelView({ docs }) {
//   const [fileIndex, setFileIndex] = useState(0);
//   const [book, setBook] = useState(null);
//   const [sheetName, setSheetName] = useState("");
//   const [status, setStatus] = useState("loading");

//   const doc = docs[fileIndex];
//   const url = doc?.url;

//   useEffect(() => {
//     if (!url) return;
//     const ctrl = new AbortController();
//     setStatus("loading");
//     setBook(null);
//     fetch(url, { signal: ctrl.signal })
//       .then((r) => {
//         if (!r.ok) throw new Error(r.status);
//         return r.arrayBuffer();
//       })
//       .then((buf) => {
//         const wb = XLSX.read(buf, { type: "array" });
//         setBook(wb);
//         setSheetName(wb.SheetNames[0]);
//         setStatus("ready");
//       })
//       .catch((e) => {
//         if (e.name !== "AbortError") {
//           console.error(e);
//           setStatus("error");
//         }
//       });
//     return () => ctrl.abort();
//   }, [url]);

//   const { rows, cols, total } = useMemo(() => {
//     if (!book || !sheetName) return { rows: [], cols: 0, total: 0 };
//     const ws = book.Sheets[sheetName];
//     const data = XLSX.utils.sheet_to_json(ws, {
//       header: 1,
//       defval: "",
//       raw: false,
//       blankrows: true,
//     });
//     const width = data.reduce((m, r) => Math.max(m, r.length), 0);
//     return { rows: data.slice(0, MAX_ROWS), cols: width, total: data.length };
//   }, [book, sheetName]);

//   if (!doc) {
//     return <div className="placeholder">No workbooks uploaded yet.</div>;
//   }

//   const downloadUrl = `${doc.url}?download=${encodeURIComponent(doc.fileName)}`;

//   return (
//     <>
//       <div className="frame-bar">
//         <div className="frame-tabs">
//           {docs.length > 1 ? (
//             docs.map((d, i) => (
//               <button
//                 key={d.path}
//                 className={`frame-tab ${i === fileIndex ? "active" : ""}`}
//                 onClick={() => setFileIndex(i)}
//               >
//                 {d.name}
//               </button>
//             ))
//           ) : (
//             <span className="frame-title">{doc.name}</span>
//           )}
//         </div>
//         <a className="frame-btn xl-dl" href={downloadUrl}>
//           <Download size={15} /> Download .xlsx
//         </a>
//       </div>

//       {status === "error" ? (
//         <div className="placeholder">Couldn't load this workbook.</div>
//       ) : status === "loading" ? (
//         <div className="placeholder">Loading workbook…</div>
//       ) : (
//         <div className="xl-box">
//           <div className="xl-wrap">
//             <table className="xl">
//               <thead>
//                 <tr>
//                   <th className="xl-corner"></th>
//                   {Array.from({ length: cols }, (_, c) => (
//                     <th key={c}>{colName(c)}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {rows.map((row, r) => (
//                   <tr key={r}>
//                     <td className="xl-rn">{r + 1}</td>
//                     {Array.from({ length: cols }, (_, c) => {
//                       const v = row[c] ?? "";
//                       return (
//                         <td key={c} className={isNumeric(v) ? "num" : ""}>
//                           {v}
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="xl-tabs">
//             {book.SheetNames.map((n) => (
//               <button
//                 key={n}
//                 className={`xl-tab ${n === sheetName ? "active" : ""}`}
//                 onClick={() => setSheetName(n)}
//               >
//                 {n}
//               </button>
//             ))}
//             <span className="xl-meta">
//               {total > MAX_ROWS
//                 ? `Showing first ${MAX_ROWS} of ${total} rows`
//                 : `${total} rows`}
//             </span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { Download, Info } from "lucide-react";

const MAX_ROWS = 500;

// 0 -> A, 25 -> Z, 26 -> AA
const colName = (n) => {
  let s = "";
  n += 1;
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
};

const isNumeric = (v) => v !== "" && /^[\d,.\-+()%₹$\s]+$/.test(String(v));

export default function ExcelView({ docs }) {
  const [fileIndex, setFileIndex] = useState(0);
  const [book, setBook] = useState(null);
  const [sheetName, setSheetName] = useState("");
  const [status, setStatus] = useState("loading");

  const doc = docs[fileIndex];
  const url = doc?.url;

  useEffect(() => {
    if (!url) return;
    const ctrl = new AbortController();
    setStatus("loading");
    setBook(null);
    fetch(url, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.arrayBuffer();
      })
      .then((buf) => {
        const wb = XLSX.read(buf, { type: "array" });
        setBook(wb);
        setSheetName(wb.SheetNames[0]);
        setStatus("ready");
      })
      .catch((e) => {
        if (e.name !== "AbortError") {
          console.error(e);
          setStatus("error");
        }
      });
    return () => ctrl.abort();
  }, [url]);

  const { rows, cols, total } = useMemo(() => {
    if (!book || !sheetName) return { rows: [], cols: 0, total: 0 };
    const ws = book.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(ws, {
      header: 1,
      defval: "",
      raw: false,
      blankrows: true,
    });
    const width = data.reduce((m, r) => Math.max(m, r.length), 0);
    return { rows: data.slice(0, MAX_ROWS), cols: width, total: data.length };
  }, [book, sheetName]);

  if (!doc) {
    return <div className="placeholder">No workbooks uploaded yet.</div>;
  }

  const downloadUrl = `${doc.url}?download=${encodeURIComponent(doc.fileName)}`;

  return (
    <>
      <div className="frame-bar">
        <div className="frame-tabs">
          {docs.length > 1 ? (
            docs.map((d, i) => (
              <button
                key={d.path}
                className={`frame-tab ${i === fileIndex ? "active" : ""}`}
                onClick={() => setFileIndex(i)}
              >
                {d.name}
              </button>
            ))
          ) : (
            <span className="frame-title">{doc.name}</span>
          )}
        </div>
        <a className="frame-btn xl-dl primary" href={downloadUrl}>
          <Download size={15} /> Download .xlsx
        </a>
      </div>

      <div className="xl-note">
        <Info size={18} />
        <div>
          <b>Preview only.</b> This view shows cell values as plain tables. Charts,
          formulas, colours and formatting are not displayed here.{" "}
          <a href={downloadUrl}>Download the Excel file</a> to see the complete
          workbook as it was built.
        </div>
      </div>

      {status === "error" ? (
        <div className="placeholder">Couldn't load this workbook.</div>
      ) : status === "loading" ? (
        <div className="placeholder">Loading workbook…</div>
      ) : (
        <div className="xl-box">
          <div className="xl-wrap">
            <table className="xl">
              <thead>
                <tr>
                  <th className="xl-corner"></th>
                  {Array.from({ length: cols }, (_, c) => (
                    <th key={c}>{colName(c)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, r) => (
                  <tr key={r}>
                    <td className="xl-rn">{r + 1}</td>
                    {Array.from({ length: cols }, (_, c) => {
                      const v = row[c] ?? "";
                      return (
                        <td key={c} className={isNumeric(v) ? "num" : ""}>
                          {v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="xl-tabs">
            {book.SheetNames.map((n) => (
              <button
                key={n}
                className={`xl-tab ${n === sheetName ? "active" : ""}`}
                onClick={() => setSheetName(n)}
              >
                {n}
              </button>
            ))}
            <span className="xl-meta">
              {total > MAX_ROWS
                ? `Showing first ${MAX_ROWS} of ${total} rows`
                : `${total} rows`}
            </span>
          </div>
        </div>
      )}
    </>
  );
}