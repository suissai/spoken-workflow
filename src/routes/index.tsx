import { createFileRoute } from '@tanstack/react-router';
import { ChappieSite } from '@/components/chappie/site';
export const Route = createFileRoute('/')({
 head: () => ({meta:[{title:'My.Chappie.Digital — Seu negócio funciona com apenas um áudio'},{name:'description',content:'Você fala. Agentes inteligentes organizam financeiro, estoque e clientes. Conheça o My.Chappie.Digital e solicite acesso antecipado.'},{property:'og:title',content:'My.Chappie.Digital — Um áudio. Seu negócio em movimento.'},{property:'og:description',content:'Inteligência empresarial para pequenos negócios. Menos operação, mais tempo para viver.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: Home,
});
function Home(){return <ChappieSite lang="pt"/>;}
