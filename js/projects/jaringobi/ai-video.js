// 자린고비 07 캐릭터 디자인: 기존 Works 등장 규칙을 재사용하며 ABLY 데이터는 연결하지 않습니다.
const sns=document.querySelector('.jaringobi-character');
if(sns&&!matchMedia('(prefers-reduced-motion:reduce)').matches){sns.classList.add('is-animated');const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){sns.classList.add('is-revealed');observer.disconnect();}},{threshold:.12});observer.observe(sns);}
