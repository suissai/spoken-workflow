import { describe, expect, it } from 'vitest';
import { plans, parsePurchase, purchasePhrase, calculateRoi, leadSchema } from '@/lib/chappie/logic';
describe('Commercial rules', () => {
 it('prices Commerce at R$100/month', () => expect(plans.commerce).toBe(100));
 it('prices Independent Professional at R$50/month', () => expect(plans.professional).toBe(50));
 it('offers three trial months', () => expect(plans.trialMonths).toBe(3));
});
describe('Illustrative purchase extraction', () => {
 it('uses the visitor’s actual purchase data', () => {
  const result = parsePurchase('10 unidades de café, R$ 18,90 cada, fornecedor Café do Vale.');
  expect(result.purchase).toEqual({ quantity: 10, product: 'café', price: 18.9, supplier: 'Café do Vale' });
  if (!result.purchase) throw new Error('Missing purchase');
  expect(purchasePhrase(result.purchase, 'pt')).toContain('10 unidades de café');
 });
 it('extracts English purchase data', () => {
  expect(parsePurchase('20 units of tea, BRL 12.50 each, supplier Green Farm.').purchase).toEqual({ quantity: 20, product: 'tea', price: 12.5, supplier: 'Green Farm' });
 });
 it('requests missing price and supplier instead of inventing them', () => {
  const result = parsePurchase('10 unidades de café');
  expect(result.purchase).toBeUndefined();
  expect(result.missing).toEqual(['price', 'supplier']);
 });
});
describe('ROI and registration', () => {
 it('calculates explicitly disclosed illustrative assumptions', () => expect(calculateRoi(10,15000,1)).toEqual({savedHours:26,annualSavings:29228,potentialRevenue:609}));
 it('requires consent for registration', () => {
  expect(leadSchema.safeParse({name:'Maria',email:'maria@example.com',business:'Loja Maria',segment:'commerce',language:'pt',consent:false,request_type:'early_access'}).success).toBe(false);
 });
 it('rejects invalid email addresses', () => {
  expect(leadSchema.safeParse({name:'Maria',email:'invalid',business:'Loja Maria',segment:'commerce',language:'pt',consent:true,request_type:'demo'}).success).toBe(false);
 });
});