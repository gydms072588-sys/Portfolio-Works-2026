(() => {
 globalThis.ProfileComparison={mount(root){
  if(!root)return()=>{};
  const tabs=root.querySelector('.qa-comparison-tabs'),panel=root.querySelector('.qa-comparison-panel'),cta=root.querySelector('.qa-compare-cta');
  let animation=null;
  const buttons=[];
  const action=root.querySelector('.qa-compare-action');
  action.querySelector('p')?.remove();
  root.querySelector('.qa-comparison-header').append(action);
  let viewer=null;
  function closeViewer(){if(!viewer)return;viewer.close();viewer.remove();viewer=null;}
  function openViewer(button){
   closeViewer();const source=button.querySelector('img');
   viewer=document.createElement('dialog');viewer.className='qa-image-viewer';viewer.setAttribute('aria-label',button.getAttribute('aria-label'));
   const close=document.createElement('button');close.type='button';close.className='qa-image-viewer-close';close.textContent='닫기';close.setAttribute('aria-label','확대 보기 닫기');
   const image=document.createElement('img');image.src=source.dataset.fullImage||source.src;image.alt=source.alt;image.width=source.width;image.height=source.height;
   viewer.append(close,image);document.body.append(viewer);
   close.addEventListener('click',closeViewer);viewer.addEventListener('cancel',event=>{event.preventDefault();closeViewer();});
   viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeViewer();}});
   viewer.showModal();viewer.scrollTop=0;close.focus();
  }
  panel.addEventListener('click',event=>{const preview=event.target.closest('.qa-detail-preview');if(preview&&panel.contains(preview))openViewer(preview);});
  function select(index,animate=true){
   closeViewer();const data=ProfileComparisons[index];animation?.cancel();
   panel.replaceChildren();
   const template=data.templateId&&document.getElementById(data.templateId);
   if(template){
    const content=template.content.cloneNode(true);
    content.querySelectorAll('.qa-compare-item').forEach((figure,index)=>{
     const entry=data[index===0?'before':'after'];if(!entry)return;
     figure.querySelector('p').textContent=entry.description;
     const image=figure.querySelector('img,svg');
     if(image.tagName.toLowerCase()==='svg')image.querySelector('image').setAttribute('href',entry.image);else image.src=entry.image;
    });
    content.querySelectorAll('.qa-compare-item p').forEach(p=>{
     const paragraphs=p.textContent.trim().split(/\n\s*\n/);p.replaceChildren();
     paragraphs.forEach(text=>{const span=document.createElement('span');span.className='qa-compare-paragraph';span.textContent=text;p.append(span);});
    });
    content.querySelectorAll('.qa-compare-item').forEach((figure,index)=>{
     const points=data[index===0?'before':'after']?.points;if(!points?.length)return;
     figure.querySelector('p').remove();
     const list=document.createElement('ol');list.className='qa-compare-points';
     points.forEach((point,i)=>{
      const item=document.createElement('li'),title=document.createElement('h5'),description=document.createElement('p');
      title.textContent=String(i+1).padStart(2,'0')+' #'+point.tag;description.textContent=point.description;
      item.append(title,description);list.append(item);
     });
     figure.querySelector('figcaption').append(list);
    });
    panel.append(content);

   }
   else {const pending=document.createElement('p');pending.className='qa-comparison-pending';pending.textContent=data.label+' Before / After 비교 자료를 준비 중입니다.';panel.append(pending);}
   panel.id='qa-comparison-panel';panel.setAttribute('aria-labelledby','qa-comparison-tab-'+data.id);
   buttons.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===index));b.tabIndex=i===index?0:-1;});
   const label=document.createElement('span');label.textContent=data.cta.replace(/\s*→$/, '');
   cta.replaceChildren(label);cta.dataset.categoryId=data.categoryId;cta.setAttribute('href',data.ctaHref);
   if(animate&&!matchMedia('(prefers-reduced-motion: reduce)').matches)animation=panel.animate([{opacity:0},{opacity:1}],{duration:240,easing:'ease-out'});
  }
  ProfileComparisons.forEach((data,index)=>{
   const button=document.createElement('button');button.type='button';button.setAttribute('role','tab');button.id='qa-comparison-tab-'+data.id;button.setAttribute('aria-controls','qa-comparison-panel');button.textContent=data.label;
   button.addEventListener('click',()=>select(index));
   button.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%buttons.length;else if(event.key==='ArrowLeft')next=(index+buttons.length-1)%buttons.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;event.preventDefault();select(next);buttons[next].focus();});
   buttons.push(button);tabs.append(button);
  });
  select(0,false);
  return()=>{closeViewer();animation?.cancel();};
 }};
})();
