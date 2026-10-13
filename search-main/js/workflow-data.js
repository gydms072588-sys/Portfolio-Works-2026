/* Shared presentation examples. Null assets remain replaceable placeholders. */
const workflowNode=(id,step,title,description,tools,placeholder,caption,extra={})=>({id,step,title,description,tools,caption,inputAssets:[],outputAssets:[{label:placeholder,src:null}],connections:[],...extra});
globalThis.SkillWorkflow=[
 workflowNode('planning',1,'Planning & Prompt','콘텐츠 목적과 콘셉트를 정리하고 제작 방향을 설계합니다.',['Gemini','GPT','Claude','Notion','Figma'],'프롬프트 기획','브랜드 방향, 키워드, 톤앤매너를 먼저 정리합니다.',{prompt:'포트폴리오 브랜드 로고를 만들 거야.\n키워드는 신뢰, 소통이고\n파란색 테마로 정리해줘.',connections:['image']}),
 workflowNode('image',2,'Image Production','브랜드 로고와 캐릭터 제작을 위해 시안을 탐색하고, 작업 목적에 따라 AI 생성 또는 직접 편집 방식을 선택합니다.',['Photoshop','Illustrator','Figma','GPT','Gemini'],'생성된 이미지','여러 시안을 탐색하고 결과물을 정리합니다.',{connections:['video']}),
 workflowNode('video',3,'Video Production','로고 인트로 영상을 제작하기 위해 AI 생성과 직접 편집 방식을 목적에 따라 구분합니다.',['Higgsfield','Gemini','Google','CapCut','Premiere Pro'],'생성 영상','작업 목적에 따라 AI 생성 또는 직접 편집을 선택합니다.',{connections:['review']}),
 workflowNode('review',4,'UX/UI & Web Design','브랜드 흐름과 정보 구조를 반영해 와이어프레임을 설계하고 반응형 웹으로 구현합니다.',['Figma','VS Code','HTML/CSS','JavaScript','GSAP'],'웹 작업물','와이어프레임 설계와 웹 화면 구현')
];
SkillWorkflow[1].methods=[
 workflowNode('image-ai','02-1','AI 이미지 생성','여러 가지 이미지 시안과 레퍼런스를 탐색하고 브랜드 무드에 맞는 방향을 비교합니다.',['GPT','Gemini'],'AI 이미지 생성 과정 및 결과물','키워드 기반 시안 제작, 레퍼런스 조사, 방향 비교',{parentId:'image'}),
 workflowNode('image-edit','02-2','이미지 편집·보정','선정한 시안을 바탕으로 색상 보정과 디테일 수정 등 최종 결과물을 직접 마무리합니다.',['Photoshop','Illustrator','Figma'],'이미지 제작·합성·보정 과정','색상 보정, 디테일 수정, 최종 마감',{parentId:'image'})
];
SkillWorkflow[2].methods=[
 workflowNode('video-ai','03-1','AI 영상 생성','로고가 등장하는 인트로 영상을 AI로 생성하고 구도와 움직임 방향을 테스트합니다.',['Higgsfield','Gemini','Google'],'영상 프롬프트 및 생성 결과','인트로 연출, 모션 테스트, 생성 결과 비교',{parentId:'video',prompt:'로고가 3D로 중앙에서 등장하듯 연출해줘.'}),
 workflowNode('video-edit','03-2','영상 편집','생성한 소스를 바탕으로 컷 편집, 자막, 속도감, 전체 흐름을 정리해 최종 영상으로 마무리합니다.',['CapCut','Premiere Pro'],'컷 편집·자막·보정 과정','컷 편집, 속도 조절, 자막, 최종 정리',{parentId:'video'})
];

const brandPrompt=SkillWorkflow.find(node=>node.id==='planning');
brandPrompt.promptTitle='BRAND IDENTITY · PROMPT';
brandPrompt.promptFields=[['Objective','디자이너의 역량과 작업 철학을 표현하는 포트폴리오 브랜드 로고 개발'],['Keywords','신뢰 · 소통 · 연결'],['Visual Direction','블루 기반의 간결한 기하학적 형태와 디지털 친화적 스타일'],['Deliverables','로고 콘셉트 및 시각화 방향 3안']];
const motionPrompt=SkillWorkflow.find(node=>node.id==='video').methods.find(node=>node.id==='video-ai');
motionPrompt.promptTitle='LOGO INTRO · MOTION PROMPT';
motionPrompt.promptFields=[['Subject','기존 브랜드 로고의 형태와 색상 유지'],['Motion','로고가 중앙에서 3D 깊이감을 가지며 등장'],['Camera','정면 고정, 미세한 줌인'],['Style','미니멀, 블루 톤, 부드러운 라이팅'],['Constraint','로고 왜곡·임의 텍스트 생성·프레임 잘림 방지']];
[brandPrompt,motionPrompt].forEach(node=>node.prompt=node.promptFields.map(item=>item[1]).join(''));

brandPrompt.promptTitle='BRAND IDENTITY';
brandPrompt.promptFields=[['목적','포트폴리오 브랜드 로고 기획'],['핵심 키워드','신뢰 · 소통 · 연결'],['디자인 방향','블루 톤 · 미니멀 · 기하학적 형태'],['결과물','로고 콘셉트 3안']];
brandPrompt.promptHighlights=['핵심 키워드','디자인 방향'];
motionPrompt.promptTitle='LOGO INTRO';
motionPrompt.promptFields=[['대상','브랜드 로고'],['모션','중앙 3D 등장'],['카메라','정면 고정 · 미세한 줌인'],['제약','로고 형태 유지 · 왜곡 방지']];
motionPrompt.promptHighlights=['모션','제약'];
[brandPrompt,motionPrompt].forEach(node=>node.prompt=node.promptFields.map(item=>item[1]).join(''));

// Summary precedes the working content on every desktop/mobile card.
SkillWorkflow.find(node=>node.id==='planning').caption='브랜드 방향과 핵심 키워드를 정리하고, 제작 콘셉트를 설계합니다.';
SkillWorkflow.find(node=>node.id==='video').caption='작업 목적에 따라 AI 영상 생성과 직접 편집을 선택합니다.';
SkillWorkflow.find(node=>node.id==='review').caption='와이어프레임을 설계하고 웹 화면을 구현합니다.';

// 설명을 보조하는 개념 도식. 실제 작업물·성과 이미지로 표시하지 않습니다.
for(const node of SkillWorkflow){if(node.id==='planning')continue;const key=node.id==='review'?'review':node.id==='video'?'video':'image';node.outputAssets=[{src:'./search-main/assets/images/workflow/'+key+'.svg',alt:node.id==='review'?'와이어프레임과 반응형 웹 구현 도식':node.id==='video'?'영상 재생과 컷 편집 타임라인 도식':'여러 이미지 시안의 비교 도식'}];for(const method of node.methods||[]){const key=method.id==='image-ai'?'image-ai':method.id.startsWith('video')?'video':'image';method.outputAssets=[{src:'./search-main/assets/images/workflow/'+key+'.svg',alt:method.title+' 설명용 도식'}];}}
