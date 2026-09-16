import type { Passport } from "../types";
import { seedPassport } from "../mockData";

/** BACKEND INTEGRATION POINT — replace with passport/ledger service. */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getPassport(id: string): Promise<Passport> {
  await delay(600);
  return { ...seedPassport, id };
}
