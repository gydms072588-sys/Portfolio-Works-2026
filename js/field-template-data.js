// Layout-only placeholders, not claims about actual projects or outcomes.
const fields={'content-design':['Content','Design'],'visual-design':['Visual','Design'],'motion-video':['Motion &','Video Editing']};
export const fieldTemplateData=Object.fromEntries(Object.entries(fields).map(([id,cover])=>[id,{
 cover,why:'프로젝트의 제작 목적과 기존 문제를 정리할 영역입니다.\n실제 작업 자료 확인 후 분야에 맞는 설명으로 교체합니다.',
 criteria:[['기준 01','첫 번째 디자인 판단 기준을 정리할 영역'],['기준 02','두 번째 디자인 판단 기준을 정리할 영역'],['기준 03','세 번째 디자인 판단 기준을 정리할 영역']],
 intro:'주요 작업과 제작 과정을 정리할 영역입니다.',
 works:Array.from({length:6},(_,i)=>({title:'Work '+String(i+1).padStart(2,'0'),description:'작업 항목과 핵심 내용을 정리할 영역입니다.',image:null})),
 screens:Array.from({length:5},(_,i)=>({title:'Screen '+String(i+1).padStart(2,'0'),description:'화면 또는 결과물의 제작 의도를 설명할 영역입니다.',asset:null})),
 comparison:[{state:'Before',title:'개선 전',description:'기존 작업의 문제와 개선이 필요한 부분을 정리할 영역입니다.'},{state:'After',title:'개선 후',description:'변경한 디자인과 제작 방향을 설명할 영역입니다.'}],
 outcome:{title:'디자인 결과와 기대효과',summary:'실제 작업 내용을 확인한 뒤 디자인 결과와 기대효과를 구분해 정리합니다.',items:Array.from({length:3},(_,i)=>({title:'핵심 항목 '+(i+1),outcome:'실제 변경한 디자인 내용을 정리할 영역',impact:'기대하는 경험을 정리할 영역'}))}
}]));
