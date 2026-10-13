// Reusable seven-section assembly. Each field supplies its own existing components/data.
export const WORKS_SECTION_ORDER=['cover','showcase','why-direction','main-works','key-screens','before-after','design-outcome'];
export function finalizeWorksTemplate(main,cover,showcase,project){
 const sections=[cover,showcase,...project.children];
 if(sections.length!==WORKS_SECTION_ORDER.length)throw new Error('Works template requires seven sections');
 sections.forEach((section,i)=>{section.dataset.worksSection=WORKS_SECTION_ORDER[i];section.classList.add('works-template-section');});
 main.replaceChildren(...sections);
}
