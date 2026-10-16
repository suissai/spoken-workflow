import { Link } from '@tanstack/react-router';
import { Check, AlertTriangle, ArrowUpRight, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { money, type Language } from '@/lib/chappie/logic';
import segments from '@/lib/chappie/segments.json';
import type { Segment } from './site';

const list = segments as Segment[];

export function whatsappLink(segment: Segment, url?: string) {
  const text = `Olá! Quero me cadastrar no Chappie. Vim da página ${segment.title}${url ? ` (${url})` : ''}.`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function SolutionsDialog({ open, onOpenChange, lang }: { open: boolean; onOpenChange: (v: boolean) => void; lang: Language }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="solutions-dialog max-w-3xl">
        <DialogTitle>{lang === 'pt' ? 'Soluções' : 'Solutions'}</DialogTitle>
        <DialogDescription>{lang === 'pt' ? 'Escolha o seu tipo de negócio.' : 'Choose your type of business.'}</DialogDescription>
        <div className="solutions-grid">
          {list.map((s) => (
            <Link key={s.page} to="/$segment" params={{ segment: s.page }} className="solution-button" onClick={() => onOpenChange(false)}>
              <span className="solution-emoji" aria-hidden>{s.emoji}</span>
              <span>{s.name}</span>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function SegmentSections({ segment }: { segment: Segment }) {
  const p = segment.pricing;
  return (
    <>
      <section id="funcionalidades" className="section container">
        <div className="section-heading reveal"><p className="eyebrow">FUNCIONALIDADES</p><h2>O que o {segment.title} faz por você</h2></div>
        <div className="segment-grid">
          {segment.features.map((f) => <article className="segment-card reveal" key={f}><Check size={18} className="text-success" /><h3>{f}</h3></article>)}
        </div>
      </section>
      <section id="problemas" className="section container">
        <div className="section-heading reveal"><p className="eyebrow">PROBLEMAS QUE ELE RESOLVE</p><h2>Chega de perder tempo com isso</h2></div>
        <div className="segment-grid">
          {segment.problems.map((f) => <article className="segment-card reveal" key={f}><AlertTriangle size={18} className="text-warning" /><h3>{f}</h3></article>)}
        </div>
      </section>
      <section id="precos" className="section container">
        <div className="section-heading reveal"><p className="eyebrow">PREÇOS</p><h2>Plano {p.plan}</h2></div>
        <article className="segment-price reveal">
          <p className="price-value">{money(p.price)}<small>/{p.period}</small></p>
          <ul>{p.items.map((i) => <li key={i}><Check size={15} />{i}</li>)}</ul>
          <p className="text-xs text-muted-foreground">{p.trial}</p>
        </article>
      </section>
      <section className="section container segment-cta reveal">
        <h2>{segment.cta.text}</h2>
        <a className="segment-cta-button" href={whatsappLink(segment)} target="_blank" rel="noopener noreferrer">{segment.cta.button}<ArrowUpRight size={16} /></a>
      </section>
    </>
  );
}

export function WhatsAppButton({ segment }: { segment: Segment }) {
  return (
    <a className="whatsapp-fixed" target="_blank" rel="noopener noreferrer"
      href={whatsappLink(segment)}
      onClick={(e) => { e.currentTarget.href = whatsappLink(segment, window.location.href); }}>
      <MessageCircle size={18} />Cadastrar
    </a>
  );
}
