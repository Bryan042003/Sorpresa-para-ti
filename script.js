(() => {
  'use strict';
  const ns = 'http://www.w3.org/2000/svg';
  const make = (tag, attrs = {}, parent) => {
    const node = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    if (parent) parent.appendChild(node);
    return node;
  };
  const dedication = window.DEDICATORIA;
  document.getElementById('salutation').textContent = `${dedication.nombre},`;
  document.getElementById('signature').textContent = dedication.firma;
  document.getElementById('letter-ending').textContent = dedication.cierre;
  dedication.parrafos.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    document.getElementById('dedication').appendChild(p);
  });
  document.title = `Flores amarillas para ${dedication.nombre} 🌼`;

  const stems = document.getElementById('stems');
  const foliage = document.getElementById('foliage');
  const flowers = document.getElementById('flowers');
  // Each flower is drawn with individual petals and a sunflower seed spiral.
  const arrangement = [
    { x: 302, y: 132, r: 58, tilt: -13 },
    { x: 466, y: 151, r: 53, tilt: 15 },
    { x: 208, y: 246, r: 56, tilt: -24 },
    { x: 558, y: 270, r: 49, tilt: 25 },
    { x: 392, y: 256, r: 73, tilt: 0 },
    { x: 292, y: 365, r: 54, tilt: -17 },
    { x: 481, y: 375, r: 57, tilt: 16 },
    { x: 174, y: 350, r: 22, tilt: -25, daisy: true },
    { x: 559, y: 174, r: 23, tilt: 22, daisy: true },
    { x: 385, y: 91, r: 20, tilt: 5, daisy: true },
    { x: 242, y: 153, r: 18, tilt: -18, daisy: true },
    { x: 571, y: 376, r: 23, tilt: 23, daisy: true }
  ];
  arrangement.forEach((flower, index) => {
    const endX = 365 + index * 3;
    make('path', { d: `M${endX} ${603 + index % 3 * 8} Q${400 + (flower.x - 380) * .35} 425 ${flower.x} ${flower.y}`, fill: 'none', stroke: index % 2 ? '#71865a' : '#5d7850', 'stroke-width': flower.daisy ? 2.4 : 4.3, 'stroke-linecap': 'round', class: 'stem', style: `--delay:${index * .06}s` }, stems);
  });
  const branches = [
    [369,521,174,222,-1], [395,521,602,255,1], [376,502,257,93,-1],
    [399,508,509,103,1], [364,515,139,299,-1], [405,532,602,409,1]
  ];
  branches.forEach(([x,y,tx,ty,side],index) => {
    const g = make('g', {class:'leaf-cluster',style:`--delay:${.2 + index * .1}s`},foliage);
    make('path',{d:`M${x} ${y} Q${tx} ${y-140} ${tx} ${ty}`,fill:'none',stroke:'#7c9166','stroke-width':2},g);
    for(let j=0;j<5;j++){
      const t = .25 + j * .145;
      const px = x + (tx-x) * (2*t-t*t);
      const py = (1-t)*(1-t)*y + 2*(1-t)*t*(y-140)+t*t*ty;
      const direction = j%2 ? -side : side;
      const leaf = make('g',{transform:`translate(${px} ${py}) rotate(${direction * (37+j*5)})`},g);
      make('path',{d:'M0 0 C-28 -15 -28 -47 0 -68 C21 -43 20 -13 0 0',fill:'url(#leaf)',opacity:.88},leaf);
      make('path',{d:'M0 -2 Q-4 -28 0 -59',fill:'none',stroke:'#d4d6a0','stroke-width':.8,opacity:.6},leaf);
    }
  });
  arrangement.forEach((flower,index) => {
    const position = make('g',{transform:`translate(${flower.x} ${flower.y}) rotate(${flower.tilt})`},flowers);
    const sway = make('g',{class:'flower-sway',style:`--sway-delay:-${index * .63}s`},position);
    const bloom = make('g',{class:'flower-bloom',style:`--delay:${.65 + index * .13}s`},sway);
    const r = flower.r;
    const count = flower.daisy ? 11 : 17;
    for(let layer=0;layer<2;layer++){
      for(let k=0;k<count;k++){
        const angle = k*360/count + layer*10;
        const length = r*(layer ? .89 : 1)*(1+.045*Math.sin(k*8+index));
        const width = r*(flower.daisy ? .18 : .19);
        make('path',{d:`M0 ${-r*.15} C${-width} ${-r*.39} ${-width*.9} ${-length*.91} 0 ${-length} C${width*.95} ${-length*.91} ${width} ${-r*.39} 0 ${-r*.15}`,fill:layer?'url(#petal-light)':'url(#petal)',stroke:'#dbab3238','stroke-width':.65,transform:`rotate(${angle})`},bloom);
        if(!flower.daisy) make('path',{d:`M0 ${-r*.38} Q${width*.13} ${-r*.65} 0 ${-length*.9}`,fill:'none',stroke:'#b88b272c','stroke-width':.7,transform:`rotate(${angle})`},bloom);
      }
    }
    const heartR = r*(flower.daisy?.23:.33);
    make('circle',{r:heartR,fill:flower.daisy?'#c89429':'url(#flower-heart)'},bloom);
    const seeds=flower.daisy?24:170;
    for(let k=0;k<seeds;k++){
      const angle=k*2.39996;
      const radius=Math.sqrt((k+.5)/seeds)*heartR*.94;
      make('ellipse',{cx:Math.cos(angle)*radius,cy:Math.sin(angle)*radius,rx:flower.daisy?.7:1.15,ry:flower.daisy?.8:1.5,fill:k%3===0?'#dbb55b':k%3===1?'#b18a41':'#483b23',opacity:.85},bloom);
    }
  });
  const petalContainer = document.getElementById('floating-petals');
  for(let i=0;i<11;i++){
    const petal=document.createElement('i');
    petal.style.cssText=`--left:${8+i*8}%;--delay:${2+i*.73}s;--duration:${7+i%4}s`;
    petalContainer.appendChild(petal);
  }

  const invitation=document.getElementById('invitation');
  const reveal=document.getElementById('reveal');
  const openButton=document.getElementById('open-envelope');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let opening=false;
  openButton.addEventListener('click', () => {
    if(opening) return;
    opening=true;
    openButton.disabled=true;
    invitation.classList.add('opening');
    window.setTimeout(() => invitation.classList.add('leaving'),reducedMotion.matches?0:1250);
    window.setTimeout(() => {
      invitation.hidden=true;
      reveal.hidden=false;
      window.scrollTo({top:0,behavior:'instant'});
      document.getElementById('reveal-title').focus({preventScroll:true});
    },reducedMotion.matches?20:1800);
  });
  document.getElementById('replay').addEventListener('click', () => {
    reveal.hidden=true;
    invitation.hidden=false;
    invitation.classList.remove('opening','leaving');
    openButton.disabled=false;
    opening=false;
    window.scrollTo({top:0,behavior:'instant'});
    openButton.focus({preventScroll:true});
  });
})();
