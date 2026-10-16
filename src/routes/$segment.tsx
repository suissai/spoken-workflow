import { createFileRoute, notFound } from '@tanstack/react-router';
import { ChappieSite, type Segment } from '@/components/chappie/site';
import segments from '@/lib/chappie/segments.json';
const list = segments as Segment[];
export const Route = createFileRoute('/$segment')({
 loader: ({ params }) => { const s = list.find(x => x.page === params.segment); if (!s) throw notFound(); return s; },
 head: ({ loaderData: s }) => {
  if (!s) return { meta: [{ title: 'Página não encontrada — My.Chappie.Digital' }, { name: 'robots', content: 'noindex' }] };
  const desc = `${s.title}: você fala, agentes inteligentes organizam financeiro, estoque e clientes do seu negócio.`;
  const img = s.image.replace('w=1920', 'w=1200&h=630');
  return { meta: [{ title: `${s.title} — Seu negócio funciona com um áudio` }, { name: 'description', content: desc }, { property: 'og:title', content: s.title }, { property: 'og:description', content: desc }, { property: 'og:type', content: 'website' }, { property: 'og:image', content: img }, { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:image', content: img }] };
 },
 component: SegmentPage,
});
function SegmentPage(){ const s = Route.useLoaderData(); return <ChappieSite lang="pt" segment={s}/>; }
