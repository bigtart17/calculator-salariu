import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Calculator salariu net din brut 2026 România",
    short_name: "Net din Brut",
    description:
      "Calculator salariu net ↔ brut România 2026 cu cost angajator și deduceri personale.",
    start_url: "/",
    display: "standalone",
    background_color: "#fbf6eb",
    theme_color: "#0b1324"
  };
}
