import { Inter, Manrope } from "next/font/google";

/**
 * Shared web-font setup. Imported by every root layout (public `[locale]` and
 * `admin`) so the `--font-inter` / `--font-manrope` CSS variables that
 * `globals.css` / Tailwind reference are always defined.
 */

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

/** `className` for the `<html>` element — wires both font variables. */
export const fontVariables = `${inter.variable} ${manrope.variable}`;
