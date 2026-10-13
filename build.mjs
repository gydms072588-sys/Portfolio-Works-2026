// 독립 Works 정적 빌드. 원본 및 메인 프로젝트는 변경하지 않습니다.
import {cpSync,mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
const source=dirname(fileURLToPath(import.meta.url)),target=resolve(source,'dist');mkdirSync(target,{recursive:true});
for(const name of ['index.html','team-projects.html','individual-works.html','uxui.html','ux-ui.html','content-design.html','visual-design.html','motion-video.html','search-entry.html','search-main','css','js','assets'])cpSync(resolve(source,name),resolve(target,name),{recursive:true});
console.log('Works static build:',target);
