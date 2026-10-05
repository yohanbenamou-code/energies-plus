import { describe, expect, it } from "vitest";
import { calculateSolarCumac, SOLAR_TH_168 } from "@/lib/solar-calculator";
import { isModestHousehold, mprCategory, mprCeilings } from "@/lib/mpr";

describe("calculateSolarCumac (BAR-TH-168)", () => {
  it("respecte le barème officiel par m² de capteur", () => {
    expect(SOLAR_TH_168.coefficients.ecs).toEqual({ H1: 6000, H2: 7200, H3: 9600 });
    expect(SOLAR_TH_168.coefficients["ecs-chauffage"]).toEqual({
      H1: 14000,
      H2: 12700,
      H3: 10300,
    });
  });

  it("H2 / chauffage + ECS / 12 m² sans bonification = 152 400 kWh cumac", () => {
    expect(
      calculateSolarCumac({ zone: "H2", usage: "ecs-chauffage", surfaceM2: 12, household: null }),
    ).toBe(152400);
  });

  it("applique la bonification x5 (ménages modestes) et x4 (autres)", () => {
    const base = { zone: "H1" as const, usage: "ecs-chauffage" as const, surfaceM2: 10 };
    expect(calculateSolarCumac({ ...base, household: "modeste" })).toBe(700000);
    expect(calculateSolarCumac({ ...base, household: "autres" })).toBe(560000);
  });

  it("retourne 0 pour une surface nulle, négative ou non finie", () => {
    const base = { zone: "H3" as const, usage: "ecs" as const, household: null };
    expect(calculateSolarCumac({ ...base, surfaceM2: 0 })).toBe(0);
    expect(calculateSolarCumac({ ...base, surfaceM2: -4 })).toBe(0);
    expect(calculateSolarCumac({ ...base, surfaceM2: Number.NaN })).toBe(0);
  });
});

describe("mprCategory (plafonds 2026)", () => {
  it("lit les plafonds du barème", () => {
    expect(mprCeilings("idf", 1)).toEqual([24031, 29253, 40851]);
    expect(mprCeilings("hors-idf", 4)).toEqual([35676, 45735, 64550]);
  });

  it("applique la majoration au-delà de 5 personnes", () => {
    expect(mprCeilings("hors-idf", 6)).toEqual([40835 + 5151, 52348 + 6598, 73907 + 9357]);
    expect(mprCeilings("idf", 7)).toEqual([56580 + 2 * 7116, 68877 + 2 * 8663, 96817 + 2 * 12257]);
  });

  it("classe un revenu (plafond inclusif)", () => {
    expect(mprCategory("hors-idf", 2, 25393)).toBe("tres-modeste");
    expect(mprCategory("hors-idf", 2, 25394)).toBe("modeste");
    expect(mprCategory("hors-idf", 2, 45842)).toBe("intermediaire");
    expect(mprCategory("hors-idf", 2, 45843)).toBe("superieur");
  });

  it("considère très modestes et modestes comme « ménages modestes »", () => {
    expect(isModestHousehold("tres-modeste")).toBe(true);
    expect(isModestHousehold("modeste")).toBe(true);
    expect(isModestHousehold("intermediaire")).toBe(false);
    expect(isModestHousehold("superieur")).toBe(false);
  });
});
