import { createFileRoute } from '@tanstack/react-router';
import { ChappieSite } from '@/components/chappie/site';
export const Route = createFileRoute('/en')({
 head: () => ({meta:[{title:'My.Chappie.Digital — Your business runs with one voice note'},{name:'description',content:'You speak. Intelligent agents organize finance, inventory and customers. Explore My.Chappie.Digital and request early access.'},{property:'og:title',content:'My.Chappie.Digital — One voice note. Your business moving forward.'},{property:'og:description',content:'Business intelligence for small teams. Less operating, more time for life.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),
 component: EnglishHome,
});
function EnglishHome(){return <ChappieSite lang="en"/>;}
