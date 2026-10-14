import { z } from 'zod';
export type Language = 'pt' | 'en';
export const plans = { commerce: 100, professional: 50, trialMonths: 3 } as const;
export const leadSchema = z.object({
  name: z.string().trim().min(2).max(100), email: z.string().trim().email().max(254),
  business: z.string().trim().min(2).max(120), segment: z.enum(['commerce','professional','services','health']),
  language: z.enum(['pt','en']), consent: z.literal(true), request_type: z.enum(['early_access','demo']),
});
export function calculateRoi(hours: number, revenue: number, people: number) {
  const savedHours = hours * people * 4.33 * 0.6;
  const hourlyValue = revenue / (people * 160);
  return { savedHours: Math.round(savedHours), annualSavings: Math.round(savedHours * hourlyValue * 12), potentialRevenue: Math.round(savedHours * hourlyValue * 0.25) };
}
export type Purchase = { quantity: number; product: string; price: number; supplier: string; category?: string };
export function parsePurchase(text: string): { purchase?: Purchase; missing: string[] } {
  const quantityMatch = text.match(/(?:comprei\s+|bought\s+)?(\d+)\s+(?:unidades?\s+(?:de\s+)?|units?\s+(?:of\s+)?|peças?\s+(?:de\s+)?)?([^,;.]+?)(?=,|;|\s+(?:por|for|a|at)\s+(?:R\$|\$|\d)|$)/i);
  const priceMatch = text.match(/(?:R\$|\$|BRL|por|at|preço\s*:?|price\s*:?)\s*(\d+(?:[.,]\d{1,2})?)/i);
  const supplierMatch = text.match(/(?:fornecedor|supplier|from)\s*:?\s*(.+?)[.!]?$/i);
  const quantity = quantityMatch ? Number(quantityMatch[1]) : 0;
  const product = quantityMatch?.[2]?.trim().replace(/^(?:de|of)\s+/i, '') || '';
  const price = priceMatch ? Number(priceMatch[1].replace(',', '.')) : 0;
  const supplier = supplierMatch?.[1]?.trim().replace(/[.!]$/, '') || '';
  const missing = [!quantity && 'quantity', !product && 'product', !price && 'price', !supplier && 'supplier'].filter((v): v is string => Boolean(v));
  return missing.length ? { missing } : { missing, purchase: { quantity, product, price, supplier } };
}
export function money(value: number, lang: Language = 'pt') { return new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(value); }
export function purchasePhrase(p: Purchase, lang: Language) {
  const price = new Intl.NumberFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { style: 'currency', currency: 'BRL' }).format(p.price);
  return lang === 'pt' ? `Comprei ${p.quantity} unidades de ${p.product}, por ${price} cada, do fornecedor ${p.supplier}.` : `I bought ${p.quantity} units of ${p.product}, at ${price} each, from supplier ${p.supplier}.`;
}
