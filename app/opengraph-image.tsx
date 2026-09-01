import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Énergies Plus — le dispositif des Certificats d'Économies d'Énergie, transformé en travaux financés";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Image Open Graph générée à la volée (bloc-marque Énergies Plus).
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
          backgroundImage:
            "linear-gradient(135deg, #14213f 0%, #1f477f 45%, #4f9d34 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.16)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "34px",
              fontWeight: 700,
              marginRight: "20px",
            }}
          >
            É
          </div>
          <div style={{ display: "flex", fontSize: "30px", letterSpacing: "0.14em" }}>
            ÉNERGIES PLUS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "60px",
              fontWeight: 600,
              lineHeight: 1.15,
              maxWidth: "980px",
              marginBottom: "24px",
            }}
          >
            Les Certificats d'Économies d'Énergie, transformés en travaux
            financés.
          </div>
          <div style={{ display: "flex", fontSize: "27px", opacity: 0.85 }}>
            Éligibilité, montage du dossier avant devis, suivi jusqu'aux travaux
          </div>
        </div>

        <div style={{ display: "flex", fontSize: "24px", opacity: 0.75 }}>
          Professionnel privé du dispositif public des CEE — France
        </div>
      </div>
    ),
    { ...size },
  );
}
