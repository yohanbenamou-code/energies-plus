import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Energie+ : le dispositif des Certificats d'Économies d'Énergie, transformé en travaux financés";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0F1317";
const ORANGE = "#FB8011";

/**
 * Image Open Graph générée à la volée (couleurs du logo Energie+).
 * Aucune donnée client n'y figure. Pour la remplacer par un visuel fourni,
 * déposer `app/opengraph-image.png` (1200×630) et supprimer ce fichier.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: INK,
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              fontSize: "76px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Energie
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              width: "40px",
              height: "40px",
              marginLeft: "6px",
              marginTop: "-8px",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "14px",
                top: "0px",
                width: "12px",
                height: "40px",
                borderRadius: "6px",
                background: ORANGE,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "0px",
                top: "14px",
                width: "40px",
                height: "12px",
                borderRadius: "6px",
                background: ORANGE,
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "980px",
              marginBottom: "28px",
            }}
          >
            Les Certificats d'Économies d'Énergie, transformés en travaux
            financés.
          </div>
          <div style={{ display: "flex", fontSize: "28px", color: ORANGE }}>
            Éligibilité, dossier avant devis, suivi jusqu'aux travaux
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "24px", opacity: 0.6 }}>
          Professionnel privé du dispositif public des CEE, France
        </div>
      </div>
    ),
    { ...size },
  );
}
