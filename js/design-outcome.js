export const designOutcomeData={
 hotelspick:{title:'정보는 명확하게, 탐색은 자연스럽게.',summary:'검색 중심의 화면 구조를 설계하고, 사용자가 필요한 정보를 쉽게 탐색할 수 있도록 개선했습니다.',items:[
 {title:'정보 인지 개선',outcome:'핵심 콘텐츠의 위계를 정리해 정보 파악을 돕는 구조',impact:'필요한 정보를 더 쉽게 파악할 수 있도록 돕는 것을 기대합니다.'},
 {title:'탐색 동선 단순화',outcome:'검색을 주요 행동으로 배치해 탐색 진입을 명확히 구성',impact:'사용자가 검색과 비교를 자연스럽게 시작할 수 있도록 돕는 것을 기대합니다.'},
 {title:'브랜드 경험 강화',outcome:'일관된 블루 톤과 컴포넌트로 시각적 통일성 확보',impact:'서비스의 시각적 인상을 일관되게 인지할 수 있도록 돕는 것을 기대합니다.'}
 ]}
};
const make=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
export function designOutcome(data){const section=make('section','design-outcome'),inner=make('div','ed-inner'),heading=make('h3','',data.title);heading.id='design-outcome-heading';section.setAttribute('aria-labelledby',heading.id);inner.append(make('p','do-label','07 / DESIGN OUTCOME'),heading,make('p','do-summary',data.summary));const grid=make('div','do-grid');data.items.forEach((item,i)=>{const block=make('article','do-item');block.append(make('span','do-number',String(i+1).padStart(2,'0')),make('h4','',item.title),make('p','do-sub-label','DESIGN OUTCOME'),make('p','do-copy',item.outcome),make('p','do-sub-label','EXPECTED IMPACT'),make('p','do-copy',item.impact));grid.append(block);});inner.append(grid,make('p','do-note','기대효과는 디자인 의도이며, 실제 사용자 검증이나 정량 측정 결과가 아닙니다.'));const cta=make('a','do-next','다음 프로젝트 보기 →');cta.setAttribute('aria-disabled','true');inner.append(cta);section.append(inner);return section;}
// Use only an actual rendered project target or an existing field-list URL.
export function connectOutcomeCTA(section,{currentId,projects,listUrl}){const link=section.querySelector('.do-next'),index=projects.findIndex(p=>p.id===currentId),next=projects[index+1];const target=next?document.getElementById('project-'+next.id):null;if(target){link.href='#'+target.id;link.removeAttribute('aria-disabled');}else if(index===projects.length-1&&listUrl){link.href=listUrl;link.removeAttribute('aria-disabled');}else{link.title='다음 프로젝트 화면 연결 후 활성화됩니다.';link.setAttribute('aria-disabled','true');}}
