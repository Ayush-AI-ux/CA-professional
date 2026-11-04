import { supabase, BUCKET } from "./supabaseClient";

export const SECTIONS = {
  research: { folder: "research", type: "pdf" },
  dashboard: { folder: "dashboard", type: "html" },
  workbooks: { folder: "workbooks", type: "xlsx" },
};

const prettyName = (file) =>
  file.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export async function listAll() {
  const groups = await Promise.all(
    Object.entries(SECTIONS).map(async ([section, cfg]) => {
      const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(cfg.folder, {
          limit: 100,
          sortBy: { column: "created_at", order: "desc" },
        });
      if (error) throw error;

      return (data ?? [])
        .filter((f) => f.id && f.name !== ".emptyFolderPlaceholder")
        .map((f) => {
          const path = `${cfg.folder}/${f.name}`;
          return {
            section,
            type: cfg.type,
            path,
            fileName: f.name,
            name: prettyName(f.name),
            date: f.created_at,
            size: f.metadata?.size,
            url: supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl,
          };
        });
    })
  );

  return groups.flat().sort((a, b) => new Date(b.date) - new Date(a.date));
}