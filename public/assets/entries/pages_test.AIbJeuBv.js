import{j as s,A as o,R as t,a as p,b as e,i as l,P as w,c as m,d as h}from"../chunks/chunk-zpQD271B.js";/* empty css                      */import"../chunks/chunk-ckwbz45p.js";const d="mesoamerica",v=[{id:"722eweMxFKQV2RKHk5Zvd"},{id:"vbf-sdiwvle-b_NLRhEUM",maxWidth:1920},{id:"8KcXYxV-4GsDZDfNc2CjP",maxWidth:991},{id:"_F4J_uRCCm3J98iEO7vzz",maxWidth:767},{id:"3iM2aZuYpP3TBDi7We9gO",maxWidth:479}],u="LogoTest_ULR2LENFW1uu6krJGVj2C.png",g=[],f=[],y=i=>s.jsxs("body",{className:"w-element",children:[s.jsx(o,{code:`<style>

    .cms-header {
    background: linear-gradient(115deg,
      rgba(9, 255, 248, 1) 0%,
      rgba(21, 217, 230, 1) 45%,
      rgba(0, 171, 171, 1) 100%);
    height: 5%;
  }

  .cms-header-inner {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .cms-logo-link {
  display: block;
  height: 100%;
  }

  .cms-logo {
    display: block;
    max-width: auto;      /* tweak to change image width */
    height: 100%;
    flex-shrink: 0;

  }

  .ws-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 0;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    position: relative;
    z-index: 10;
  }

  .ws-nav-item {
    position: relative;
    flex: 0 0 calc(20% - 1rem); /* 5 per row */
    box-sizing: border-box;
    display: flex;              /* NEW: make the cell a flex container */
    justify-content: center;    /* center button horizontally */
  }

  @media (max-width: 1700px) {
    .ws-nav {
      gap: 0.75rem;                /* slightly smaller gap */
    }
    
    .ws-nav-item {
    flex: 1 1 calc(20% - 0.75rem);  /* can shrink but still aims for 5 per row */
  }

  .ws-nav-link {
    padding: 0.3rem 1rem;        /* slimmer buttons on smaller screens */
    font-size: 0.9rem;
  }
}

  .ws-nav-link {
    display: inline-flex;
    width: 60%; /* make the button fill its grid cell */
    align-items: center;
    justify-content: center;
    padding: 0.75rem 2rem;
    border-radius: 13px;

    background: rgba(255, 255, 255, 0.12);
    color: #012b3a;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    letter-spacing: 0.02em;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(12px);
    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      background 160ms ease;
    white-space: nowrap;
  }

  .ws-nav-link span.caret {
    margin-left: 0.35rem;
    font-size: 0.8rem;
  }

  .ws-nav-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
    background: rgba(255, 255, 255, 0.2);
  }

  /* dropdown stays the same */
  .ws-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1.25rem 1.75rem;
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 150ms ease,
      transform 150ms ease;
    transform-origin: top center;
    z-index: 50;
    min-width: 230px;
    max-width: 340px;
  }

  .ws-dropdown::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 0;
    right: 0;
    height: 12px;
  }

  .ws-nav-link:hover + .ws-dropdown,
  .ws-nav-link:focus + .ws-dropdown,
  .ws-dropdown:hover {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(4px);
  }

  .ws-dropdown-title {
    font-weight: 600;
    font-size: 0.98rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .ws-dropdown-underline {
    width: 60%;
    height: 2px;
    margin: 0 auto 0.75rem;
    background: #012b3a;
  }

  .ws-dropdown-list {
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0;
  }

  .ws-dropdown-list li + li {
    margin-top: 0.4rem;
  }

  .ws-dropdown-link {
    display: block;
    text-decoration: none;
    color: #222;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
    transition:
      color 140ms ease,
      transform 140ms ease;
  }

  .ws-dropdown-link:hover {
    color: #00b3e6;
    transform: translateX(3px);
  }
</style>

<header class="cms-header">
  <div class="cms-header-inner">
    <a href="/" class="cms-logo-link">
      <img src="https://mesoamerica.eu/pdfs/cmslogo.png" alt="Center for Mesoamerican Studies" class="cms-logo">
    </a>
    <nav class="ws-nav">
  <div class="ws-nav-item">
    <a href="/" class="ws-nav-link">Home</a>
  </div>


  <div class="ws-nav-item">
    <a href="#Conferences" class="ws-nav-link">
      Conferences <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <div class="ws-dropdown-title">Bratislava Maya Meeting</div>
      <div class="ws-dropdown-underline"></div>
      <ul class="ws-dropdown-list">
        <li><a href="#Gallery" class="ws-dropdown-link">Gallery</a></li>
        <li><a href="#News" class="ws-dropdown-link">News</a></li>
        <li><a href="#History" class="ws-dropdown-link">History</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="/Exhibitions" class="ws-nav-link">Exhibitions</a>
  </div>

  <div class="ws-nav-item">
    <a href="#Collections" class="ws-nav-link">
      Collections <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#History" class="ws-dropdown-link">History</a></li>
        <li><a href="#Exhibitions" class="ws-dropdown-link">Exhibitions</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Ethnographical Collection</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Archeological Collection</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      PARU Uxactun <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#history" class="ws-dropdown-link">History</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Recent Investigations</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Archeological Reports</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Maps</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Archeological Artefacts</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Papers</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Gallery</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      About Us <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#catalogue" class="ws-dropdown-link">Contacts</a></li>
        <li><a href="#history" class="ws-dropdown-link">Members</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">History</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      Library <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <div class="ws-dropdown-title">Ferdinand Ander's Library</div>
      <div class="ws-dropdown-underline"></div>
      <ul class="ws-dropdown-list">
        <li><a href="#catalogue" class="ws-dropdown-link">Catalogue</a></li>
        <li><a href="#history" class="ws-dropdown-link">History</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Gallery</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      Investigations <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <div class="ws-dropdown-title">Grants &amp; Investigations</div>
      <div class="ws-dropdown-underline"></div>
      <ul class="ws-dropdown-list">
        <li><a href="#catalogue" class="ws-dropdown-link">Project Reports</a></li>
        <li><a href="#history" class="ws-dropdown-link">Grants</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Investigation Notes</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Gallery</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="/Exhibitions" class="ws-nav-link">Publications</a>
  </div>


  <div class="ws-nav-item">
    <a href="#education" class="ws-nav-link">
      Education <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#programs" class="ws-dropdown-link">Gallery</a></li>
        <li><a href="#workshops" class="ws-dropdown-link">Published Thesis</a></li>
        <li><a href="#resources" class="ws-dropdown-link">Work in Progress</a></li>
        <li><a href="#resources" class="ws-dropdown-link">PhD Program</a></li>
      </ul>
    </div>
  </div>
</nav>
</div>
</header>
`,className:"w-html-embed"}),s.jsxs("div",{className:"w-element",children:[s.jsx(t,{action:{type:"view",animations:[{name:"Heading - Text",description:"Create a new animation.",keyframes:[{offset:0,styles:{opacity:{type:"unit",unit:"%",value:20},translate:{type:"tuple",value:[{type:"unit",unit:"px",value:0},{type:"unit",unit:"%",value:150}]}}},{styles:{translate:{type:"tuple",value:[{type:"unit",unit:"px",value:0},{type:"unit",unit:"%",value:0}]}}}],timing:{easing:"ease-in",fill:"both",duration:{type:"unit",value:.35,unit:"s"},rangeStart:["cover",{type:"unit",value:0,unit:"%"}],rangeEnd:["cover",{type:"unit",value:100,unit:"%"}]}}]},children:s.jsx("h1",{className:"w-element c1dhr34 cgfzzyc c1u4u624 catr8hd",children:"Publications"})}),s.jsx(t,{action:{type:"view",axis:"x",animations:[{name:"Heading - Breaker",description:"Create a new animation.",keyframes:[{offset:0,styles:{translate:{type:"tuple",value:[{type:"unit",unit:"%",value:-50},{type:"unit",unit:"px",value:0}]},opacity:{type:"unit",unit:"%",value:0}}},{styles:{}}],timing:{easing:"ease-in",fill:"both",duration:{type:"unit",value:.28,unit:"s"},rangeStart:["cover",{type:"unit",value:0,unit:"%"}],rangeEnd:["cover",{type:"unit",value:100,unit:"%"}]}}]},children:s.jsx("hr",{className:"w-element c1dp943g c1wzds7l c4kkshd c18ivmrh cokq6x1 cwf5pxm cikk0zp c1fo36yk cqkxiro ck7gmap cztpeze cj1gzec cah44g7 ctc5m6i c1o1prdx"})})]}),s.jsx(o,{code:`<style>.cms-header {
    background: linear-gradient(115deg,
      rgba(9, 255, 248, 1) 0%,
      rgba(21, 217, 230, 1) 45%,
      rgba(0, 171, 171, 1) 100%);
    height: 3%;
  }

  .cms-header-inner {
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .cms-logo-link {
  display: block;
  height: 100%;
  }

  .cms-logo {
    display: block;
    max-width: auto;      /* tweak to change image width */
    height: 100%;
    flex-shrink: 0;

  }

  .ws-nav {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 0;
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    position: relative;
    z-index: 10;
  }

  .ws-nav-item {
    position: relative;
    flex: 0 0 calc(20% - 1rem); /* 5 per row */
    box-sizing: border-box;
    display: flex;              /* NEW: make the cell a flex container */
    justify-content: center;    /* center button horizontally */
  }

  @media (max-width: 1700px) {
    .ws-nav {
      gap: 0.75rem;                /* slightly smaller gap */
    }
    
    .ws-nav-item {
    flex: 1 1 calc(20% - 0.75rem);  /* can shrink but still aims for 5 per row */
  }

  .ws-nav-link {
    padding: 0.3rem 1rem;        /* slimmer buttons on smaller screens */
    font-size: 0.9rem;
  }
}

  .ws-nav-link {
    display: inline-flex;
    width: 60%; /* make the button fill its grid cell */
    align-items: center;
    justify-content: center;
    padding: 0.75rem 2rem;
    border-radius: 13px;

    background: rgba(255, 255, 255, 0.12);
    color: #012b3a;
    font-size: 1rem;
    font-weight: 500;
    text-decoration: none;
    letter-spacing: 0.02em;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(12px);
    transition:
      transform 160ms ease,
      box-shadow 160ms ease,
      background 160ms ease;
    white-space: nowrap;
  }

  .ws-nav-link span.caret {
    margin-left: 0.35rem;
    font-size: 0.8rem;
  }

  .ws-nav-link:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
    background: rgba(255, 255, 255, 0.2);
  }

  /* dropdown stays the same */
  .ws-dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 1.25rem 1.75rem;
    border-radius: 18px;
    background: #ffffff;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 150ms ease,
      transform 150ms ease;
    transform-origin: top center;
    z-index: 50;
    min-width: 230px;
    max-width: 340px;
  }

  .ws-dropdown::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 0;
    right: 0;
    height: 12px;
  }

  .ws-nav-link:hover + .ws-dropdown,
  .ws-nav-link:focus + .ws-dropdown,
  .ws-dropdown:hover {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translateX(-50%) translateY(4px);
  }

  .ws-dropdown-title {
    font-weight: 600;
    font-size: 0.98rem;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .ws-dropdown-underline {
    width: 60%;
    height: 2px;
    margin: 0 auto 0.75rem;
    background: #012b3a;
  }

  .ws-dropdown-list {
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0;
  }

  .ws-dropdown-list li + li {
    margin-top: 0.4rem;
  }

  .ws-dropdown-link {
    display: block;
    text-decoration: none;
    color: #222;
    font-size: 0.95rem;
    letter-spacing: 0.01em;
    transition:
      color 140ms ease,
      transform 140ms ease;
  }

  .ws-dropdown-link:hover {
    color: #00b3e6;
    transform: translateX(3px);
  }
</style>

<header class="cms-header">
  <div class="cms-header-inner">
    <a href="/" class="cms-logo-link">
      <img src="https://mesoamerica.eu/pdfs/cmslogo.png" alt="Center for Mesoamerican Studies" class="cms-logo">
    </a>
    <nav class="ws-nav">
  <div class="ws-nav-item">
    <a href="/" class="ws-nav-link">Home</a>
  </div>


  <div class="ws-nav-item">
    <a href="#Conferences" class="ws-nav-link">
      Conferences <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <div class="ws-dropdown-title">Bratislava Maya Meeting</div>
      <div class="ws-dropdown-underline"></div>
      <ul class="ws-dropdown-list">
        <li><a href="#Gallery" class="ws-dropdown-link">Gallery</a></li>
        <li><a href="#News" class="ws-dropdown-link">News</a></li>
        <li><a href="#History" class="ws-dropdown-link">History</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="/Exhibitions" class="ws-nav-link">Exhibitions</a>
  </div>

  <div class="ws-nav-item">
    <a href="#Collections" class="ws-nav-link">
      Collections <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#History" class="ws-dropdown-link">History</a></li>
        <li><a href="#Exhibitions" class="ws-dropdown-link">Exhibitions</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Ethnographical Collection</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Archeological Collection</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      PARU Uxactun <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#history" class="ws-dropdown-link">History</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Recent Investigations</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Archeological Reports</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Maps</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Archeological Artefacts</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Papers</a></li>
        <li><a href="#catalogue" class="ws-dropdown-link">Gallery</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      About Us <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#catalogue" class="ws-dropdown-link">Contacts</a></li>
        <li><a href="#history" class="ws-dropdown-link">Members</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">History</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      Library <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <div class="ws-dropdown-title">Ferdinand Ander's Library</div>
      <div class="ws-dropdown-underline"></div>
      <ul class="ws-dropdown-list">
        <li><a href="#catalogue" class="ws-dropdown-link">Catalogue</a></li>
        <li><a href="#history" class="ws-dropdown-link">History</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Gallery</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="#library" class="ws-nav-link">
      Investigations <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <div class="ws-dropdown-title">Grants &amp; Investigations</div>
      <div class="ws-dropdown-underline"></div>
      <ul class="ws-dropdown-list">
        <li><a href="#catalogue" class="ws-dropdown-link">Project Reports</a></li>
        <li><a href="#history" class="ws-dropdown-link">Grants</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Investigation Notes</a></li>
        <li><a href="#gallery" class="ws-dropdown-link">Gallery</a></li>
      </ul>
    </div>
  </div>

  <div class="ws-nav-item">
    <a href="/Exhibitions" class="ws-nav-link">Publications</a>
  </div>


  <div class="ws-nav-item">
    <a href="#education" class="ws-nav-link">
      Education <span class="caret">▾</span>
    </a>
    <div class="ws-dropdown">
      <ul class="ws-dropdown-list">
        <li><a href="#programs" class="ws-dropdown-link">Gallery</a></li>
        <li><a href="#workshops" class="ws-dropdown-link">Published Thesis</a></li>
        <li><a href="#resources" class="ws-dropdown-link">Work in Progress</a></li>
        <li><a href="#resources" class="ws-dropdown-link">PhD Program</a></li>
      </ul>
    </div>
  </div>
</nav>
</div>
</header>
`,className:"w-html-embed"})]}),k=({data:i})=>{const{system:a,resources:c,url:n,pageMeta:r}=i;return s.jsxs(p.Provider,{value:{imageLoader:l,assetBaseUrl:e,resources:c,breakpoints:v,onError:console.error},children:[s.jsx(y,{system:a},n),s.jsx(w,{url:n,pageMeta:r,siteName:d,imageLoader:l,assetBaseUrl:e}),s.jsx(m,{children:r.title})]})},x=Object.freeze(Object.defineProperty({__proto__:null,default:k},Symbol.toStringTag,{value:"Module"})),b=({})=>{const i={"@context":"https://schema.org","@type":"WebSite",name:d};return s.jsxs(s.Fragment,{children:[s.jsx("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(i,null,2)}}),s.jsx("link",{rel:"icon",href:l({src:`${e}${u}`})}),g.map(a=>s.jsx("link",{rel:"preload",href:`${e}${a}`,as:"font",crossOrigin:"anonymous"},a)),f.map(a=>s.jsx("link",{rel:"preload",href:`${e}${a}`,as:"image"},a))]})},z=Object.freeze(Object.defineProperty({__proto__:null,Head:b},Symbol.toStringTag,{value:"Module"})),C={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:{server:!0}}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+onRenderClient.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:h}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/test/+Page.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:x}},Head:{type:"standard",definedAtData:{filePathToShowToUser:"/pages/test/+Head.tsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:z}}};export{C as configValuesSerialized};
