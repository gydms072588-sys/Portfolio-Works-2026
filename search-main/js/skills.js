/* Workflow is the primary Skills content; no duplicated capability card shell. */
(() => {
 const page=document.getElementById('skillsPage'),detail=page.querySelector('.skills-detail');
 let disposeWorkflow=()=>{};
 function render(){disposeWorkflow();disposeWorkflow=()=>{};detail.replaceChildren();if(page.hidden)return;const host=document.createElement('div');host.className='skills-workflow';detail.append(host);disposeWorkflow=PortfolioWorkflow.mount(host);}
 page.querySelector('.skills-return').addEventListener('click',()=>{location.hash='main';});
 const visibility=new MutationObserver(()=>{if(page.hidden){disposeWorkflow();disposeWorkflow=()=>{};}});visibility.observe(page,{attributes:true,attributeFilter:['hidden']});
 globalThis.PortfolioSkills={show(){render();page.classList.remove('is-entering');void page.offsetWidth;page.classList.add('is-entering');}};
})();
