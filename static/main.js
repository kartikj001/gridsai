window.onbeforeunload=function(e){return confirm("Confirm refresh")},window.onload=function(){let e=document.getElementById("canvas"),t=e.getContext("2d"),l=e.width=window.innerWidth-20,n=e.height=window.innerHeight-60,i,s;alert("Welcome to Grids-Ai. This software is operational only from computer or laptop at the moment."),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)&&(getElementById("body").style.display="none");let g="black",a=g,r=g,o="black",c="black",d=new Vector(0,0),h=new Vector(0,0),_=[],$,p,u,f=!1,v=[],w=[],m,L=!1,y=!1,C=!1,X=!1,Y=!1,k=!1,E=!1,T,b=.5,M,S,x=!0,H=!0,A=[],I=[],B=[],D=[],q=[],W,F=!1,P=[],R=[],j=[],N=[],O=[],z=[],G=[],Q=[],K=!1,U=[],V=!1,J=[],Z=()=>{let e=document.getElementById("currentCellArea").value;"0.0625"==e?b=.0625:"0.09"==e?b=.09:"0.0225"==e?b=.0225:"0.25"==e?b=.25:"0.36"==e?b=.36:"0.0929"==e?b=.0929:"0.371"==e?b=.371:"0.836"==e?b=.836:"2.32"==e?b=2.32:"9.29"==e?b=9.29:"1"==e?b=1:"2.25"==e?b=2.25:"4"==e?b=4:"6.25"==e?b=6.25:"9"==e?b=9:"12.25"==e?b=12.25:"16"==e?b=16:"25"==e?b=25:"36"==e?b=36:"49"==e?b=49:"64"==e?b=64:"81"==e?b=81:"100"==e?b=100:"121"==e?b=121:"144"==e?b=144:"169"==e?b=169:"196"==e?b=196:"225"==e?b=225:"400"==e?b=400:"625"==e?b=625:"2500"==e&&(b=2500)},ee=(e,t)=>(e=Math.ceil(e),Math.floor(Math.random()*((t=Math.floor(t))-e)+e)),et=ee(80,200),el=ee(80,200),en=ee(80,200);currentCol="rgb("+et+","+el+","+en+")";let ei=()=>{let t=e.toDataURL("static/Img/download/image.png");var l=document.createElement("a");l.download="my-image.png",l.href=t,l.click()},es=(e,t)=>{let l=0;for(let n=0;n<e.length;n++){if(e[n]===t){l++;continue}Array.isArray(e[n])&&(l+=es(e[n],t))}return l},eg=document.querySelector(".areaTable"),ea=()=>{P.splice(0,P.length),R.splice(0,R.length),eg.innerHTML="",j.splice(0,j.length),N.splice(0,N.length),O.splice(0,O.length),z.splice(0,z.length);let e=document.createElement("tr"),t=document.createElement("th");t.innerHTML="Item",e.appendChild(t);let l=document.createElement("th");l.innerHTML="Space Name",e.appendChild(l);let n=document.createElement("th");n.innerHTML="Area",e.appendChild(n);let i=document.createElement("th");i.innerHTML="Space Type",e.appendChild(i),eg.appendChild(e);for(let s=0;s<w.length;s++)!1==P.includes(w[s])&&P.push(w[s]);for(let g=0;g<P.length;g++){let a=es(w,P[g]);R.push(a)}for(let r=0;r<P.length;r++){let o=document.createElement("tr"),c=document.createElement("td"),d=document.createElement("td"),h=document.createElement("td"),_=document.createElement("td"),$=document.createElement("input"),p=document.createElement("select"),u=document.createElement("option");u.innerHTML="Enclosed",p.appendChild(u);let f=document.createElement("option");f.innerHTML="Balcony",p.appendChild(f);let v=document.createElement("option");v.innerHTML="Corridor",p.appendChild(v);let m=document.createElement("option");m.innerHTML="Empty",p.appendChild(m);let L=document.createElement("option");L.innerHTML="Design",p.appendChild(L);let y="spacetypename"+r;p.setAttribute("class",y),_.appendChild(p),$.setAttribute("type","text");let C="colorName"+r;$.setAttribute("class",C),$.setAttribute("value","Room"),d.appendChild($),c.style.backgroundColor=P[r];let X="colorPair"+r;c.setAttribute("class",X),o.appendChild(c),o.appendChild(d);let Y=(R[r]*b).toFixed(2);h.innerHTML=Y+" SQM";let k="areaClass"+r;h.setAttribute("class",k),o.appendChild(h),o.appendChild(_),eg.appendChild(o)}},er=(e,t,l)=>{for(let n=t.length;n>e;n--)t[n]=t[n-1];t[e]=l},eo=()=>{rect=e.getBoundingClientRect(),i=event.clientX-rect.left,s=event.clientY-rect.top,d.setX(i),d.setY(s)},ec=()=>{let e=d.getX()%20,t=d.getY()%20;return new Vector(d.getX()-e,d.getY()-t)},ed=()=>{let e=d.getX()%20,t=d.getY()%20,l=new Vector(d.getX()-e,d.getY()-t),n=new Vector(d.getX()-e+20,d.getY()-t),i=new Vector(d.getX()-e+20,d.getY()-t+20),s=new Vector(d.getX()-e,d.getY()-t+20),g=utils.distance(d,l),a=utils.distance(d,n),r=utils.distance(d,i),o=utils.distance(d,s);return o<g&&o<a&&o<r?s:r<g&&r<a&&r<o?i:a<g&&a<r&&a<o?n:l};class eh{constructor(e,t){this.v1=e,this.col="black",this.size=t,this.strokeStyle="black"}draw(){t.beginPath(),t.arc(this.v1.getX(),this.v1.getY(),this.size,0,2*Math.PI,!1),t.fillStyle=this.col,t.fill()}changeCol(e){this.col=e}onStroke(){t.stroke()}}class e_{constructor(e,t){this.v1=e,this.v2=t,this.lW=1,this.col="black",this.pattern=[],this.cap="square"}draw(){t.beginPath(),t.moveTo(this.v1.getX(),this.v1.getY()),t.lineTo(this.v2.getX(),this.v2.getY()),t.lineCap=this.cap,t.setLineDash(this.pattern),t.lineWidth=this.lW,t.strokeStyle=this.col,t.stroke()}changeCol(e){this.col=e}changeWidth(e){this.lW=e}setDashPattern(e,t){this.pattern=[e,t]}getLength(){return new Vector(this.v2.getX()-this.v1.getX(),this.v2.getY()-this.v1.getY()).getLength()}setV1(e){this.v1=e}setV2(e){this.v2=e}}class e${constructor(e,t){this.v1=e,this.v2=new Vector(this.v1.getX()+20,this.v1.getY()),this.v3=new Vector(this.v1.getX()+20,this.v1.getY()+20),this.v4=new Vector(this.v1.getX(),this.v1.getY()+20),this.lineWidth=.5,this.col=t,this.l1=new e_(this.v1,this.v2),this.l2=new e_(this.v2,this.v3),this.l3=new e_(this.v3,this.v4),this.l4=new e_(this.v4,this.v1)}draw(){t.beginPath(),t.rect(this.v1.getX()+.5,this.v1.getY()+.5,19,19),t.fillStyle=this.col,t.fill(),e2&&(this.l1.changeWidth(.2),this.l2.changeWidth(.2),this.l3.changeWidth(.2),this.l4.changeWidth(.2),this.l1.draw(),this.l2.draw(),this.l3.draw(),this.l4.draw())}changeCol(e){this.col=e}getSide(e){return"l1"==e||1==e?this.l1:"l2"==e||2==e?this.l2:"l3"==e||3==e?this.l3:"l4"==e||4==e?this.l4:void 0}changeSideWidth(e,t){this.getSide(e).changeWidth(t)}changeSideCol(e,t){this.getSide(e).changeCol(t)}}let ep=e=>{for(let t=0;t<_.length;t++)_[t].getX()==e.getX()&&_[t].getY()==e.getY()&&(_.splice(t,1),w.splice(t,1))},e0=()=>{for(let e=0;e<v.length;e++)v[e].setDashPattern(20,20),v[e].changeWidth(3),v[e].changeCol(r),v[e].draw()},eu=()=>{for(let e=0;e<A.length;e++)A[e].setDashPattern(3,0,3),A[e].changeWidth(3),A[e].changeCol(c),A[e].draw()},ef=()=>{for(let e=0;e<I.length;e++)if(B[e]){let t=new e_(I[e],B[e]);t.changeCol(D[e]),t.changeWidth(q[e]),t.draw()}},ev=(e,t)=>{let l;for(let n=0;n<t.length;n++){if(e.getX()==t[n].getX()&&e.getY()==t[n].getY()){l=!0;break}l=!1}return l},ew=(e,t)=>{let l;for(let n=0;n<t.length;n++)if(e.getX()==t[n].getX()&&e.getY()==t[n].getY()){l=n;break}return l},em=(e,t)=>{for(let l=0;l<t.length;l++)if(e.getX()==t[l].getX()&&e.getY()==t[l].getY())return l},eL=e=>{void 0==_[0]||!1==ev(e,_)?(_.push(e),w.push(currentCol)):w[em(e,_)]=currentCol},ey=()=>{for(let e=0;e<I.length;e++)if(utils.distance(d,I[e])+utils.distance(d,B[e])-utils.distance(I[e],B[e])<5){I.splice(e,1),B.splice(e,1),D.splice(e,1),q.splice(e,1),(I.length!=B.length||q.length!=I.length)&&(alert("rougue nation"),eH());break}},eC=()=>{for(let e=0;e<J.length;e++)J[e].setDashPattern(100,50),J[e].changeWidth(2),J[e].changeCol("red"),J[e].draw()},eX=e=>{if(eo(),$=h=ec(),L){f=!1;let t=em($,_);void 0!=w[t]&&(T=w[t]),L=!1,currentCol=T}else if(C&&!1==X&&!1==E&&!1==V)$=h=ed(),f=!0,H=!0,I.push($);else if(!1==X&&!1==k&&!1==E&&!1==V)f=!0;else if(!1==X&&!0==k&&!1==E&&!1==V){if(f=!0,ev(h,_)){m=w[ew(h,_)];for(let l=0;l<_.length;l++)w[l]==m&&G.push(_[l])}else k=!1}else if(!1==X&&!1==k&&!0==E&&!1==V){f=!0;for(let n=0;n<_.length;n++)U.push(_[n])}else!1==X&&!1==k&&!1==E&&!0==V&&(J.splice(0,J.length),f=!0,$=h=ed())},eY=e=>{if(new Vector(d.getX(),d.getY()),!0==f&&!1==C&&!1==k&&!1==E){eo(),h=ec(),v.splice(0,v.length);let t=h.getX()-$.getX(),l=h.getY()-$.getY();if(t>=0&&l>=0){u=new Vector(h.getX()+20,h.getY()+20);let n=new e_($,u),i=new Vector(n.v1.getX(),n.v1.getY()),s=new Vector(n.v1.getX()+(n.v2.getX()-i.getX()),i.getY()),g=new Vector(n.v2.getX(),n.v2.getY()),a=new Vector(n.v1.getX(),n.v1.getY()+(n.v2.getY()-i.getY())),r=new e_(i,s),o=new e_(s,g),c=new e_(g,a),p=new e_(a,i);M=r.getLength()/20,S=o.getLength()/20,v.push(r),v.push(o),v.push(c),v.push(p)}else if(t<0&&l>=0){u=new Vector(h.getX(),h.getY()+20);let L=new Vector($.getX()+20,$.getY()),y=new e_(L,u),Y=new Vector(y.v1.getX(),y.v1.getY()),T=new Vector(y.v1.getX()+(y.v2.getX()-Y.getX()),Y.getY()),b=new Vector(y.v2.getX(),y.v2.getY()),H=new Vector(y.v1.getX(),y.v1.getY()+(y.v2.getY()-Y.getY())),I=new e_(Y,T),B=new e_(T,b),D=new e_(b,H),q=new e_(H,Y);M=I.getLength()/20,S=B.getLength()/20,v.push(I),v.push(B),v.push(D),v.push(q)}else if(t>=0&&l<0){u=new Vector(h.getX()+20,h.getY());let F=new Vector($.getX(),$.getY()+20),P=new e_(F,u),R=new Vector(P.v1.getX(),P.v1.getY()),j=new Vector(P.v1.getX()+(P.v2.getX()-R.getX()),R.getY()),N=new Vector(P.v2.getX(),P.v2.getY()),O=new Vector(P.v1.getX(),P.v1.getY()+(P.v2.getY()-R.getY())),z=new e_(R,j),J=new e_(j,N),Z=new e_(N,O),ee=new e_(O,R);M=z.getLength()/20,S=J.getLength()/20,v.push(z),v.push(J),v.push(Z),v.push(ee)}else if(t<0&&l<0){u=new Vector(h.getX(),h.getY());let et=new Vector($.getX()+20,$.getY()+20),el=new e_(et,u),en=new Vector(el.v1.getX(),el.v1.getY()),ei=new Vector(el.v1.getX()+(el.v2.getX()-en.getX()),en.getY()),es=new Vector(el.v2.getX(),el.v2.getY()),eg=new Vector(el.v1.getX(),el.v1.getY()+(el.v2.getY()-en.getY())),ea=new e_(en,ei),er=new e_(ei,es),eh=new e_(es,eg),e$=new e_(eg,en);M=ea.getLength()/20,S=er.getLength()/20,v.push(ea),v.push(er),v.push(eh),v.push(e$)}}else if(!0==f&&!0==C&&!1==X&&!1==k&&!1==E&&!1==V){eo(),h=ed(),A.splice(0,A.length);let ep=new e_($,h);A.push(ep),W=ep.getLength()/20}else if(!0==f&&!1==C&&!0==k&&!1==X&&!1==E&&!1==V){eo(),Q.splice(0,Q.length),v.splice(0,v.length),dragTE=h=ed();let e0=new Vector(dragTE.getX()-$.getX(),dragTE.getY()-$.getY());if(!0==K)for(let eu=0;eu<G.length;eu++)w[ew(G[eu],_)]=m;else for(let ef=0;ef<G.length;ef++){let ev=ew(G[ef],_);utils.distance(dragTE,$)>20?w[ev]="red":w[ev]=m}for(let em=0;em<G.length;em++){let eL=ew(G[em],_),ey=new Vector(_[eL].getX()+e0.getX(),_[eL].getY()+e0.getY());Q.push(ey)}let eC=new e_($,dragTE);v.push(eC)}else if(!0==f&&!1==C&&!1==k&&!1==X&&!0==E&&!1==V){eo(),Q.splice(0,Q.length),v.splice(0,v.length),dragTE=h=ed();let eX=new Vector(dragTE.getX()-$.getX(),dragTE.getY()-$.getY());for(let eY=0;eY<U.length;eY++){let ek=new Vector(U[eY].getX()+eX.getX(),U[eY].getY()+eX.getY());Q.push(ek)}let eE=new e_($,dragTE);v.push(eE)}else V&&f&&(x=!1)},ek=e=>{if(!0==f&&!1==C&&!1==k&&!1==E&&!1==y&&!1==V){eo();let t=(p=h=ec()).getX()-$.getX(),l=p.getY()-$.getY();for(let n=0;n<=Math.abs(t);n+=20)for(let i=0;i<=Math.abs(l);i+=20)if(t>1&&l>1){let s=new Vector($.getX()+n,$.getY()+i);Y?ep(s):eL(s)}else if(t<1&&l>1){let g=new Vector($.getX()-n,$.getY()+i);Y?ep(g):eL(g)}else if(t>1&&l<1){let a=new Vector($.getX()+n,$.getY()-i);Y?ep(a):eL(a)}else if(t<1&&l<1){let r=new Vector($.getX()-n,$.getY()-i);Y?ep(r):eL(r)}}else if(!0==f&&!0==C&&!1==X&&!1==k&&!1==E&&!1==y&&!1==V)eo(),p=h=ed(),B.push(p),D.push(c),q.push(4);else if(!0==f&&!1==C&&!1==X&&!0==k&&!1==E&&!1==y&&!1==V){if(eo(),p=h=ed(),utils.distance($,p)>20){K&&(m="rgb("+(Math.floor(200*Math.random())+80)+","+(Math.floor(200*Math.random())+80)+","+(Math.floor(200*Math.random())+80)+")");let o=new Vector(p.getX()-$.getX(),p.getY()-$.getY());for(let d=0;d<G.length;d++){let u=ew(G[d],_),L=new Vector(_[u].getX()+o.getX(),_[u].getY()+o.getY());if(ev(L,_)){let T=ew(L,_);m!=w[T]?(_.splice(T,1),w.splice(T,1),er(T,_,L),er(T,w,m)):m==w[T]&&(er(u,_,L),er(u,w,m))}else er(u,_,L),er(u,w,m)}if(!1==K)for(let b=0;b<G.length;b++){let M=ew(G[b],_);w[M]!=m&&(_.splice(M,1),w.splice(M,1))}}}else if(!0==f&&!1==C&&!1==X&&!1==k&&!0==E&&!1==y&&!1==V){eo(),p=h=ed();let S=new Vector(p.getX()-$.getX(),p.getY()-$.getY());for(let H=0;H<_.length;H++){let I=new Vector(_[H].getX()+S.getX(),_[H].getY()+S.getY());_[H]=new Vector(I.getX(),I.getY())}}if(V){if(eo(),p=h=ec(),utils.distance($,p)>20){for(let W=0;W<v.length;W++)J.push(v[W]);x=!1}else x=!0,J.splice(0,J.length)}X&&ey(),f=!1,v.splice(0,v.length),A.splice(0,A.length),G.splice(0,G.length),Q.splice(0,Q.length),U.splice(0,U.length)};e.addEventListener("pointerdown",eX,!1),e.addEventListener("pointermove",eY,!1),e.addEventListener("pointerup",ek,!1);let eE=()=>{0!=_.length&&(L=!0,y=!1,C=!1,X=!1,Y=!1,k=!1,E=!1,V=!1)},eT=()=>{L=!1,y=!1,C=!1,X=!1,k=!1,Y=!0,E=!1,V=!1},eb=()=>{L=!1,y=!1,C=!0,X=!1,k=!1,Y=!1,E=!1,V=!1},eM=()=>{L=!1,y=!1,C=!1,X=!1,k=!0,Y=!1,K=!1,E=!1,V=!1},eS=()=>{L=!1,y=!1,C=!1,X=!1,k=!1,Y=!1,K=!1,E=!0,V=!1},e3=()=>{L=!1,y=!1,C=!1,X=!1,k=!0,Y=!1,K=!0,E=!1,V=!1},ex=()=>{L=!1,y=!1,C=!1,X=!1,k=!1,Y=!1,E=!1,V=!1;let e=ee(80,200),t=ee(80,200),l=ee(80,200);currentCol="rgb("+e+","+t+","+l+")"},eH=()=>{y=!1,C=!1,X=!1,Y=!1,k=!1,E=!1,V=!1,confirm("Are you sure you want to delete everything?")&&(_.splice(0,_.length),w.splice(0,w.length),B.splice(0,B.length),I.splice(0,I.length),D.splice(0,D.length),q.splice(0,q.length),j.splice(0,j.length),N.splice(0,N.length),O.splice(0,O.length),z.splice(0,z.length),J.splice(0,J.length),x=!0)},eA=()=>{y=!1,C=!1,k=!1,Y=!1,X=!0,E=!1,V=!1},eI=()=>{y=!0,X=!1,k=!1,Y=!1,E=!1,V=!1,C=!1},e1=()=>{V=!0,y=!1,X=!1,k=!1,Y=!1,E=!1,C=!1},eB=()=>{k=!1,y=!1,C=!1,X=!1,Y=!1,E=!1,V=!1;let e=document.getElementById("lineStyle").value;"Wall"==e?c="black":"Door"==e?c="yellow":"Opening"==e?c="meganta":"Window"==e&&(c="cyan"),eb()},eD=document.getElementById("active-command");eD.innerHTML="Please setup grid before getting started.",document.getElementById("addremove").addEventListener("click",function(){eT(),eD.innerHTML="Remove Cell -> Click and Drag"}),document.getElementById("lineToggle").addEventListener("click",function(){eb(),eD.innerHTML="Add Line -> Click and Drag"}),document.getElementById("lineEraser").addEventListener("click",function(){eA(),eD.innerHTML="Remove Line -> single click per line"}),document.getElementById("newspace").addEventListener("click",function(){ex(),eD.innerHTML="Add Cell with Random Color -> Click and Drag"}),document.getElementById("selSimilar").addEventListener("click",function(){eM(),eD.innerHTML="Move Cells with same color together -> Click and Drag"}),document.getElementById("copySpace").addEventListener("click",function(){e3(),eD.innerHTML="Copy Cells with same color together -> Click and Drag"}),document.getElementById("deleteall").addEventListener("click",function(){eH(),eD.innerHTML="Deleted All !"}),document.getElementById("moveAll").addEventListener("click",function(){eS(),eD.innerHTML="Move Cells -> Click and Drag"}),document.getElementById("measure").addEventListener("click",function(){eI(),eD.innerHTML="Measure Cell Dimensions -> Click and Drag"}),document.getElementById("match").addEventListener("click",function(){eE(),eD.innerHTML="Match Cell Color. Click on a cell to pick a color, then click and drag to draw."}),document.getElementById("addsite").addEventListener("click",function(){e1(),eD.innerHTML="Drag diagonally/cross to create site. Kindly pay attention to live measurement feedback."});let e2=!1;document.getElementById("downloadSn").addEventListener("click",function(){e2=!0,eD.innerHTML="Snapshot Taken!"}),document.addEventListener("keydown",function(e){!1==F&&(90==e.keyCode?(ex(),eD.innerHTML="Add Cell with Random Color -> Click and Drag"):88==e.keyCode?(eT(),eD.innerHTML="Remove Cell -> Click and Drag"):65==e.keyCode?(eE(),eD.innerHTML="Match Cell Color. Click on a cell to pick a color, then click and drag to draw."):83==e.keyCode?(eI(),eD.innerHTML="Measure Cell Dimensions -> Click and Drag"):81==e.keyCode?(eb(),eD.innerHTML="Add Line -> Click and Drag"):87==e.keyCode?(eA(),eD.innerHTML="Remove Line -> single click per line"):79==e.keyCode?shuffleBg.classList.add("bgShuffle-active"):70==e.keyCode?(eM(),eD.innerHTML="Move Cells with same color together -> Click and Drag"):68==e.keyCode?(e3(),eD.innerHTML="Copy Cells with same color together -> Click and Drag"):71==e.keyCode&&(eS(),eD.innerHTML="Move All Cells -> Click and Drag"))});let e6=document.querySelector(".modalProj-bg");document.getElementById("projSetup").addEventListener("click",function(){confirm("Once you change the grid size, then all areas will get scaled accordingly.")&&(e6.classList.add("bgProj-active"),eD.innerHTML="Click on any button to initiate command.")}),document.getElementById("save-proj-setup").addEventListener("click",function(){Z(),e6.classList.remove("bgProj-active")});let e4=document.querySelector(".modalDoc-bg");document.getElementById("docs").addEventListener("click",function(){eD.innerHTML="Click on any button to initiate command.",confirm("This command will write the Space Names and Areas as per latest update. Are you sure you want to continue?")&&(F=!0,ea(),e4.classList.add("bgDoc-active"))}),document.getElementById("save-doc-setup").addEventListener("click",function(){for(let e=0;e<P.length;e++){let t=document.querySelector(".colorName"+e).value,l=document.querySelector(".colorPair"+e).style.backgroundColor,n=document.querySelector(".areaClass"+e).innerHTML,i=document.querySelector(".spacetypename"+e).selectedOptions[0].value;!1==N.includes(l)&&(j.push(t),N.push(l),O.push(n),z.push(i))}F=!1,e4.classList.remove("bgDoc-active")});let eq=document.querySelector(".modalLine-bg");document.getElementById("lineToggle").addEventListener("click",function(){eq.classList.add("bgLine-active")}),document.getElementById("save-line-setup").addEventListener("click",function(){eq.classList.remove("bgLine-active"),eB()});let eW=document.querySelector(".modalHelp-bg");document.getElementById("help").addEventListener("click",function(){eW.classList.add("bgHelp-active"),eD.innerHTML=""}),document.getElementById("save-help-setup").addEventListener("click",function(){eW.classList.remove("bgHelp-active")});let e7=document.querySelector(".modalCaution-bg");document.getElementById("caution").addEventListener("click",function(){e7.classList.add("bgCaution-active")}),document.getElementById("cautionCancel").addEventListener("click",function(){e7.classList.remove("bgCaution-active")});let eF=document.querySelector(".modalAbout-bg");document.getElementById("about").addEventListener("click",function(){eF.classList.add("bgAbout-active"),eD.innerHTML=""}),document.getElementById("save-About-setup").addEventListener("click",function(){eF.classList.remove("bgAbout-active")});let eP=()=>{t.clearRect(0,0,l,n),Z();for(let e=0;e<_.length;e++)new e$(_[e],w[e]).draw();if(!0==k||!0==E){for(let i=0;i<Q.length;i++)new e$(Q[i],"darkgreen").draw();e0()}if(ef(),eC(),x&&(t.font="12px Arial",t.fillStyle=o,t.fillText("Welcome to Grids-AI:",10,n/2-40),t.fillText("1. Adjust grid/cell size from Project Setup menu (First button from Right)",10,n/2-20),t.fillText("2. Create a Site/Plot boundry (First button from Left) to get started.",10,n/2),t.fillText("3. Start creating a Space (Second button from Left).",10,n/2+20),t.fillText("4. This software is operational only from workstations/laptops/desktops.",10,n/2+40),t.fillText("2022 Copyrights @ Kartik Jadhav. All Rights Reserved.",10,n/2+60),t.fillText("Note - This is free version. Few functions are disabled.",10,n/2+80)),!0==f&&!1==C&&!1==k&&!1==E?(e0(),t.font="12px Arial",t.fillStyle=o,t.fillText((M*Math.sqrt(b)).toFixed(2)+" x "+(S*Math.sqrt(b)).toFixed(2)+" m",d.getX()+20,d.getY()+20),t.fillText(Math.ceil(M*Math.sqrt(b)*3.28).toFixed(2)+" x "+Math.ceil(S*Math.sqrt(b)*3.28).toFixed(2)+" ft",d.getX()+20,d.getY()+40)):!0==f&&!0==C&&!1==k&&!1==E&&(eu(),t.font="12px Arial",t.fillStyle=o,t.fillText((W*Math.sqrt(b)).toFixed(2)+" m",d.getX()+20,d.getY()+20),t.fillText(Math.ceil(W*Math.sqrt(b)*3.28).toFixed(1)+" ft",d.getX()+20,d.getY()+40)),t.font="12px Arial",t.fillStyle=a,N.length>0){t.fillText("--- Area Statement ---",5,140);for(let s=0;s<N.length;s++){let g=new Vector(10,155+18*s),r=new eh(g,7);r.changeCol(N[s]),r.draw(),t.font="12px Arial",t.fillStyle=a,t.fillText("=> "+j[s]+" ("+O[s]+") - "+z[s],20,160+18*s)}}e2&&(ei(),e2=!1);let c=document.querySelector("#target").value,h=(w.length*b).toFixed(2),$=new Vector(5,5),p=new Vector(l,5),u=new e_($,p);u.changeWidth(20),u.changeCol("silver"),u.draw();let v=new Vector(7.5,7.5),m=new Vector(7.5+l*(h/c),7.5),L=new e_(v,m);L.changeWidth(10),L.changeCol(currentCol),L.draw(),t.fillText("Target = "+c+" SQM - "+(10.763*c).toFixed(0)+" SqFt",5,35),t.fillText("Consumed = "+h+" SQM - "+(10.763*h).toFixed(0)+" SqFt",5,55),t.fillText("Grid = "+Math.sqrt(b).toFixed(2)+" x "+Math.sqrt(b).toFixed(2)+" M",5,75),t.fillText("Grid = "+(3.2808*Math.sqrt(b)).toFixed(2)+" x "+(3.28*Math.sqrt(b)).toFixed(2)+" ft",5,95),t.fillText("Used Cells = "+_.length,5,115),requestAnimationFrame(eP)};eP()};