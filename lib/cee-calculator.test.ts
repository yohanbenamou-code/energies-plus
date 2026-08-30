import { describe, expect, it } from "vitest";
import { calculateCumac, getCoefficient } from "@/lib/cee-calculator";
import { operations } from "@/data/operations";

const agriEq110 = operations.find((o) => o.code === "AGRI-EQ-110")!;
const variants = agriEq110.variants ?? [];
const systemeComplet = variants.find((v) => v.key === "systeme-complet-neuf")!;
const toitureCouplee = variants.find((v) => v.key === "toiture-couplee")!;

describe("calculateCumac (AGRI-EQ-110)", () => {
  it("H2 / agricole / système complet neuf = 48 500 kWh cumac par kW", () => {
    expect(calculateCumac(systemeComplet, "H2", "agricole", 1)).toBe(48500);
    expect(calculateCumac(systemeComplet, "H2", "agricole", 10)).toBe(485000);
    expect(calculateCumac(systemeComplet, "H2", "agricole", 2.5)).toBe(121250);
  });

  it("respecte l'ensemble du barème officiel système complet neuf", () => {
    expect(getCoefficient(systemeComplet, "H1", "agricole")).toBe(42700);
    expect(getCoefficient(systemeComplet, "H1", "forestier")).toBe(102600);
    expect(getCoefficient(systemeComplet, "H2", "forestier")).toBe(116600);
    expect(getCoefficient(systemeComplet, "H3", "agricole")).toBe(55700);
    expect(getCoefficient(systemeComplet, "H3", "forestier")).toBe(134100);
  });

  it("respecte l'ensemble du barème officiel toiture couplée", () => {
    expect(getCoefficient(toitureCouplee, "H1", "agricole")).toBe(12200);
    expect(getCoefficient(toitureCouplee, "H1", "forestier")).toBe(16900);
    expect(getCoefficient(toitureCouplee, "H2", "agricole")).toBe(13900);
    expect(getCoefficient(toitureCouplee, "H2", "forestier")).toBe(19300);
    expect(getCoefficient(toitureCouplee, "H3", "agricole")).toBe(17400);
    expect(getCoefficient(toitureCouplee, "H3", "forestier")).toBe(24100);
  });

  it("retourne 0 pour une puissance nulle, négative ou non finie", () => {
    expect(calculateCumac(systemeComplet, "H2", "agricole", 0)).toBe(0);
    expect(calculateCumac(systemeComplet, "H2", "agricole", -5)).toBe(0);
    expect(calculateCumac(systemeComplet, "H2", "agricole", Number.NaN)).toBe(0);
  });
});
