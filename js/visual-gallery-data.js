// Visual Design 전용 독립 데이터. 다른 분야의 작업을 임의로 배정하지 않았습니다.
// 프로젝트명(title), 이미지(image), 작품 유형(type), 설명(description), 상세 이미지(detailImages)를 입력하세요.
// 빈 슬롯은 명확한 플레이스홀더로 표시되며 실제 작품/성과가 아닙니다. 항목 추가/삭제로 갤러리 수를 조정합니다.
export const visualWorks=[
 {id:'slot-01',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-02',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'1 / 1'},
 {id:'slot-03',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'3 / 4'},
 {id:'slot-04',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'5 / 4'},
 {id:'slot-05',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'2 / 3'},
 {id:'slot-06',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 3'},
 {id:'slot-07',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-08',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-09',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-10',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-11',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-12',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-13',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-14',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-15',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-16',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-17',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-18',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-19',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-20',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-21',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-22',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-23',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
 {id:'slot-24',title:'',image:'',type:'',description:'',detailImages:[],placeholderRatio:'4 / 5'},
];
// 24개는 화면 배치를 확인하기 위한 빈 슬롯입니다. 실제 작품 수에 맞춰 항목을 추가하거나 제거하세요.

// 원본24개는 보존하고 화면에 표시할5개만 별도로 지정합니다.
export const visibleVisualFiles=[
 {id:'slot-01',kind:'design',label:'디자인 파일 01'},
 {id:'slot-02',kind:'design',label:'디자인 파일 02'},
 {id:'slot-03',kind:'design',label:'디자인 파일 03'},
 {id:'slot-04',kind:'video',label:'영상 파일 01'},
 {id:'slot-05',kind:'video',label:'영상 파일 02'}
];

// 갤러리 실제 작품 정보. 도구는 각 프로젝트의 js/projects.js에서 개별 확인했습니다.
const media='./assets/images/visual-projects/';
Object.assign(visualWorks[0],{title:'Business Card Design',type:'Client Work',tools:['Illustrator','Photoshop'],description:'의뢰 내용을 반영해 정보 배치와 시각적 인상을 정리한 명함 디자인',result:'최종 디자인 전달 후 의뢰인 측에서 실제 인쇄 진행',image:media+'editorial-business-card-list.jpg',detailImages:[{src:media+'editorial-business-card-final-front.jpg',label:'앞면 · 최종 시안'},{src:media+'editorial-business-card-final-back.jpg',label:'뒷면 · 최종 시안'}],sourceId:'editorial-business-card'});
Object.assign(visualWorks[1],{title:'OGQ 스티커 콘텐츠',type:'Personal Project',tools:['Illustrator','Photoshop'],description:'일상에서 자주 사용하는 감정과 상황을 캐릭터의 표정과 동작으로 표현한 OGQ 네이버 스티커 콘텐츠입니다.',image:media+'ogq-stickers-main.jpg',detailImages:[{src:media+'ogq-stickers-main.jpg',label:'OGQ 네이버 스티커'}],sourceId:'asset-ogq-sticker'});
Object.assign(visualWorks[2],{title:'게임 아이템 일러스트',type:'Client Work',tools:['Illustrator','Photoshop'],description:'게임 모임에서 사용할 다양한 아이템 이미지를 의뢰받아 게임의 분위기와 설정에 맞춰 형태와 색상 및 질감을 정리했습니다.',image:media+'game-items-main.jpg',detailImages:[{src:media+'game-items-main.jpg',label:'게임 아이템 일러스트'}],sourceId:'asset-item-illustration'});
// 영화 포스터는 원본 갤러리에서 확인되지 않아 등록하지 않았습니다. 영상 슬롯과 원본 24개 슬롯은 유지합니다.
export const visualToolAssets={Photoshop:'./search-main/assets/icons/tools/photoshop.svg',Illustrator:'./search-main/assets/icons/tools/illustrator.svg',Figma:'./search-main/assets/icons/tools/figma.svg'};
