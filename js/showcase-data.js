// Temporary layout content only. Set preview.desktop/mobile later to add screen images.
export const showcaseProjects = [1,2,3].map((n)=>({
 id:'showcase-'+n,number:String(n).padStart(2,'0'),category:'placeholder',color:'#6ed9cf',
 title:n===1?'Project Title':'Project Title '+n,
 summary:'프로젝트를 소개하는 간단한 문장',intent:'디자인 목적에 대한 임시 설명',
 detailType:'Web Design',focus:'UX/UI · Responsive Web',tools:'Figma · VS Code · HTML/CSS',
 programs:[{name:'Figma',icon:'/assets/icons/tools/figma.svg'},{name:'VS Code',icon:'/assets/icons/tools/vscode.svg'},{name:'HTML/CSS',icon:'/assets/icons/tools/html5.svg'}],
 background:'/assets/images/projects/ably-hero-new.png',images:[{src:'/assets/images/projects/ably-hero-new.png'},{src:''},{src:''}],sections:[],
}));
