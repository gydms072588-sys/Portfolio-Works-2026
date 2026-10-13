import {beforeAfter} from './before-after.js?v=20261012-fields-1';
import {keyScreens} from './key-screens.js?v=20261012-fields-1';
import {mainWorks} from './main-works.js?v=20261012-fields-1';
const create=(tag,cls,text)=>{const node=document.createElement(tag);if(cls)node.className=cls;if(text)node.textContent=text;return node;};
const sectionTitle=(label,title)=>{const head=create('header','ed-section-heading');head.append(create('p','ed-label',label),create('h3','',title));return head;};
export function editorialProject(project,index,media,config=null){
 const article=create('article','portfolio-project ed-project ed-project--'+project.id);article.id='project-'+project.id;
 const strategy=create('section','ed-strategy'),inside=create('div','ed-inner'),why=create('div','ed-strategy-why');
 why.append(sectionTitle('01 / WHY','무엇을 바꿀 것인가'));
 const copy=create('p','ed-strategy-copy');const lines=config?.why.split('\n')||['검색과 추천 정보가 분산되어 핵심 정보의 우선순위가 모호했습니다.','서비스의 개성과 주요 행동이 한눈에 드러나지 않았습니다.'];lines.forEach((line,i)=>{if(i)copy.append(create('br'));copy.append(document.createTextNode(line));});why.append(copy);inside.append(why);
 const direction=create('div','ed-strategy-direction');direction.append(sectionTitle('02 / DESIGN DIRECTION','디자인 판단 기준'));
 const cards=create('ol','ed-strategy-cards');(config?.criteria||[['정보 구조 재정리','핵심 정보와 콘텐츠의 위계를 구분'],['검색 동선 개선','검색을 상단 핵심 액션으로 배치'],['브랜드 톤 통일','블루 중심의 일관된 비주얼 구성']]).forEach(([title,text],i)=>{const card=create('li','ed-strategy-card');card.style.setProperty('--reveal-delay',i*120+'ms');card.append(create('span','ed-strategy-number',String(i+1).padStart(2,'0')),create('h4','',title),create('p','',text));cards.append(card);});direction.append(cards);inside.append(direction);strategy.append(inside);article.append(strategy);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}},{threshold:.12});[why,direction.querySelector('header'),...cards.children].forEach(item=>{item.classList.add('has-fade');observer.observe(item);});}
 article.append(mainWorks(config),keyScreens(media,config?.screens));
 if(project.comparison)article.append(beforeAfter(project.comparison,config?.comparison));
 return article;
}
