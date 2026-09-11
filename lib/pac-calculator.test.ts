import { describe, expect, it } from "vitest";
import { calculatePacCumac, PAC_TH_163 } from "@/lib/pac-calculator";

describe("calculatePacCumac (BAT-TH-163)", () => {
  it("H1 / bureaux / PAC performante / 500 m² = 720 000 kWh cumac", () => {
    // 1200 (H1, etas 126-175) x 500 m² x 1.2 (bureaux) = 720 000
    expect(
      calculatePacCumac({
        zone: "H1",
        performanceClass: "etas-126-175",
        sector: "bureaux",
        surfaceM2: 500,
        coupDePouce: false,
      }),
    ).toBe(720000);
  });

  it("applique le bonus Coup de pouce (x3)", () => {
    // 900 (H2, etas 111-126) x 1000 m² x 1.1 (santé) x 3
    expect(
      calculatePacCumac({
        zone: "H2",
        performanceClass: "etas-111-126",
        sector: "sante",
        surfaceM2: 1000,
        coupDePouce: true,
      }),
    ).toBeCloseTo(2970000);
  });

  it("respecte l'ensemble du barème officiel (PAC <= 400 kW, par Etas)", () => {
    expect(PAC_TH_163.coefficients["etas-111-126"]).toEqual({
      H1: 1100,
      H2: 900,
      H3: 600,
    });
    expect(PAC_TH_163.coefficients["etas-126-175"]).toEqual({
      H1: 1200,
      H2: 1000,
      H3: 700,
    });
    expect(PAC_TH_163.coefficients["etas-175-plus"]).toEqual({
      H1: 1300,
      H2: 1000,
      H3: 700,
    });
  });

  it("respecte l'ensemble du barème officiel (PAC > 400 kW, par COP)", () => {
    expect(PAC_TH_163.coefficients["cop-34-45"]).toEqual({
      H1: 1100,
      H2: 900,
      H3: 600,
    });
    expect(PAC_TH_163.coefficients["cop-45-plus"]).toEqual({
      H1: 1200,
      H2: 1000,
      H3: 700,
    });
  });

  it("respecte les facteurs sectoriels officiels", () => {
    expect(PAC_TH_163.sectorFactors).toEqual({
      bureaux: 1.2,
      enseignement: 0.8,
      "hotellerie-restauration": 0.7,
      sante: 1.1,
      commerces: 0.9,
      autres: 0.7,
    });
  });

  it("retourne 0 pour une surface nulle, négative ou non finie", () => {
    const base = {
      zone: "H1" as const,
      performanceClass: "etas-126-175" as const,
      sector: "bureaux" as const,
      coupDePouce: false,
    };
    expect(calculatePacCumac({ ...base, surfaceM2: 0 })).toBe(0);
    expect(calculatePacCumac({ ...base, surfaceM2: -100 })).toBe(0);
    expect(calculatePacCumac({ ...base, surfaceM2: Number.NaN })).toBe(0);
  });
});
