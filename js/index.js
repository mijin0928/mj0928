function mainShow(){ //메인 페이지 보여주기
	const header = document.getElementById('header');
	const main = document.getElementById('main');
	const gnb = document.getElementById('gnb');

	setTimeout(()=>{
		main.style.display = 'block';
		gnb.style.display = 'block';
		header.style.display = 'none';

		if(main.style.display = 'block'){
			slide();
		}
	},4500)
}
mainShow();

if(window.innerWidth > 1200){
	observerPc();
}else if(window.innerWidth < 1200 && window.innerWidth > 768){
	observertablet();
}else{
	observerMo();
}

window.addEventListener('resize',()=>{
	if(window.innerWidth > 1200){
		observerPc();
	}else if(window.innerWidth < 1200 && window.innerWidth > 768){
		observertablet();
	}else{
		observerMo();
	}
})

function observertablet(){ //tablet버전 api
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.5,
	}
	
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			entry.isIntersecting ? entry.target.classList.add('active') : entry.target.classList.remove('active');
		});
	}, options);
	
	const section = document.querySelectorAll('.inner-wrap');
	section.forEach(el => observer.observe(el));
}

function observerPc(){ // pc버전 api
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.5,
	}
	
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			entry.isIntersecting ? entry.target.classList.add('active') : entry.target.classList.remove('active');
		});
	}, options);
	
	const section = document.querySelectorAll('section > .wrap');
	section.forEach(el => observer.observe(el));
}

function observerMo(){ //mobile버전 api
	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0.3,
	}
	
	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			entry.isIntersecting ? entry.target.classList.add('active') : entry.target.classList.remove('active');
		});
	}, options);
	
	const section = document.querySelectorAll('.inner-wrap');
	section.forEach(el => observer.observe(el));
}

const txt_01 = document.querySelector('#project .slide-container .slide .txt');
const txt_02 = document.querySelector('#project-my .slide-container .slide .txt');

function message(txt){ //이미지 안내사항
	setTimeout(()=>{
		txt.classList.add('on');

		setTimeout(()=>{
			txt.classList.remove('on');
		},3000)
	},500)
}

function projectScroll(){ //스크롤시 안내사항 보여주기
	const active_01 = document.querySelector('#project .wrap');
	const active_02 = document.querySelector('#project-my .wrap');

	window.addEventListener('scroll',()=>{
		if(active_01.classList.contains('active')){
			message(txt_01);
		}

		if(active_02.classList.contains('active')){
			message(txt_02);
		}
	})
}
projectScroll();

function bg(){ //배경 만들기
    const body = document.querySelector('body');

    for(let i = 0; i < 50; i++){ //1개
        const span = document.createElement('span');
        const x = Math.floor(Math.random() * screen.width);
        const y = Math.floor(Math.random() * screen.height);
        const time = Math.floor(Math.random() * 5) + 1 + 's';
        
        span.setAttribute('class','light single');
        body.appendChild(span);

        span.style.left = x + 'px';
        span.style.top = y + 'px';
        span.style.animation = `light ${time} linear alternate infinite`;
    }

    for(let k = 0; k < 20; k++){ //4개
        const div = document.createElement('div');
        const x = Math.floor(Math.random() * screen.width);
        const y = Math.floor(Math.random() * screen.height);
        const time = Math.floor(Math.random() * 5) + 1 + 's';

        div.setAttribute('class','bg-light');
        div.style.left = x + 'px';
        div.style.top = y + 'px';
        div.style.animation = `light ${time} linear alternate infinite`;
        
        for(let j = 0; j < 4; j++){
            const span = document.createElement('span');
            span.setAttribute('class','light');
						div.appendChild(span)
						body.appendChild(div);
        }
    }
}
bg();

function dot(){ //점 출력
    const dots = document.querySelector('.dot');
    const dotArr = dots.textContent.split('');
    let count = 0;

    dots.textContent = '';

    setTimeout(function txt(){
        if(count < dotArr.length){
            dots.textContent += dotArr[count++];
        }else{
            dots.textContent = '';
            count = 0;
        }
        setTimeout(txt,400)
    })
}
dot();

function introduce(){ //자기소개 툴팁
	const listInfo = document.querySelector('#introduce .list-info');
	const btnTit = document.querySelectorAll('#introduce .list-info li .btn-tit');
	const btnClose = document.querySelectorAll('#introduce .list-info .cont .btn-close');
	const cont = document.querySelectorAll('#introduce .list-info .cont');
	
	for(let i = 0; i < btnTit.length; i++){
		btnTit[i].addEventListener('click',(e)=>{
			e.preventDefault();

			listInfo.style.visibility = 'hidden';
			e.target.nextElementSibling.classList.add('on');
		})

		btnClose[i].addEventListener('click',(e)=>{
			e.preventDefault();

			listInfo.style.visibility = 'visible';
			cont[i].classList.remove('on');
		})
	}
}
introduce();

function gnbEffect(){ //메뉴 효과
	const menu = document.querySelectorAll('#gnb li');
	const project = document.querySelector('#gnb li:nth-child(3)');
	const projectMy = document.querySelector('#gnb li:nth-child(4)');

	project.addEventListener('click',()=>{
		message(txt_01);
	})

	projectMy.addEventListener('click',()=>{
		message(txt_02);
	})

	menu.forEach((menu)=>{
		menu.addEventListener('mouseover',(e)=>{
			e.currentTarget.children[0].children[1].classList.add('on');

			function imgChange(txt,img){
				const name = e.currentTarget.children[0].children[1].textContent;

				if(name == txt){
					e.currentTarget.children[0].children[0].style.backgroundImage = `url('./images/${img}-on.png')`; 
				}
			}
			imgChange('자기소개','introduce');
			imgChange('기술','skill');
			imgChange('프로젝트','project');
			imgChange('개인프로젝트','project-my');
			imgChange('버전','version');
		})

		menu.addEventListener('mouseout',(e)=>{
			e.currentTarget.children[0].children[1].classList.remove('on');

			function imgChange(txt,img){
				const name = e.currentTarget.children[0].children[1].textContent;
			
				if(name == txt){
					e.currentTarget.children[0].children[0].style.backgroundImage = `url('./images/${img}.png')`;
				}
			}
			imgChange('자기소개','introduce');
			imgChange('기술','skill');
			imgChange('프로젝트','project');
			imgChange('개인프로젝트','project-my');
			imgChange('버전','version');
		})
	})
}
gnbEffect();

function graph(){ //그래프
	function graphPercent(deg, name){
		const bar = document.querySelectorAll('#project .slide-container .cont .graph .bar');

		bar.forEach((bar)=>{
			let barCount = 0;

			const donutBar = (()=>{
				barCount += 3;
				
				if(bar.className.includes(name)){
					if(barCount <= deg){
						bar.style.background = `conic-gradient(#a28ed8 ${barCount}deg, #f8f6f4 ${barCount}deg)`;
					}
				}
				requestAnimationFrame(donutBar);
			})
			requestAnimationFrame(donutBar);
		})
	}
	graphPercent(220,'sixty');
	graphPercent(240,'seven');
	graphPercent(240,'seven');
	graphPercent(240,'seven');
	graphPercent(240,'seven');
	graphPercent(220,'sixty');
	graphPercent(240,'seven');

	function txtPercent(name, per){
		const num = document.querySelectorAll('#project .slide-container .cont .graph .num');
		
		num.forEach((num)=>{
			let numCount = 0;
			
			const count = (()=>{
				numCount++;
				
				if(num.className.includes(name)){
					if(numCount <= per){
						num.textContent = numCount + '%';
					}
				}
				requestAnimationFrame(count)
			})
			requestAnimationFrame(count)
		})
	}
	txtPercent('sixty',60);
	txtPercent('seven',70);
	txtPercent('seven',70);
	txtPercent('seven',70);
	txtPercent('seven',70);
	txtPercent('sixty',60);
	txtPercent('seven',70);
}

function slide(){ //슬라이드
	const total = document.querySelectorAll('.control .page-num .total');
	const slide_01 = document.querySelector('#project .slide-container');
	const nextBtn_01 = document.querySelector('#project .control .btn-next');
	const prevBtn_01 = document.querySelector('#project .control .btn-prev');
	const pageNum_01 = document.querySelector('#project .control .page-num .current');
	const slideWidth_01 = slide_01.children[0].clientWidth;
	const current_01 = slide_01.children[0];
	const slide_02 = document.querySelector('#project-my .slide-container');
	const nextBtn_02 = document.querySelector('#project-my .control .btn-next');
	const prevBtn_02 = document.querySelector('#project-my .control .btn-prev');
	const pageNum_02 = document.querySelector('#project-my .control .page-num .current');
	const slideWidth_02 = slide_02.children[0].clientWidth;
	const current_02 = slide_02.children[0];

	function control(nextBtn,prevBtn,pageNum,slideWidth,current){ //슬라이드 제어
		const currentName = current.closest('section');
		let count = 0;

		for(let i=0; i < total.length; i++){
			total[0].textContent = slide_01.children[0].children.length; 
			total[1].textContent = slide_02.children[0].children.length; 
		}

		if(window.innerWidth < 1200 && window.innerWidth > 768){
			for(let i=0; i < total.length; i++){
				total[0].textContent = slide_01.children[0].children.length - 3; 
			}
		}else{
			for(let i=0; i < total.length; i++){
				total[0].textContent = slide_01.children[0].children.length; 
			}
		}

		nextBtn.addEventListener('click',next);
		prevBtn.addEventListener('click',prev);

		function next(e){ //다음
			e.preventDefault();
			count++;	

			if(count < current.children.length){
				move();
				pageNum.textContent = count + 1;

				if(count == 5){
					const info = document.querySelector('.slide-container > .slide > li:nth-child(6) .info');
					info.classList.add('on');
					
					setTimeout(()=>{
						info.classList.remove('on');
					},3000)
				}

				if(currentName.className == 'project'){
					graph();
					columnGraph();
				}
			}
		
			if(count >= current.children.length - 1){
				btnDisabled(nextBtn);
			}
			btnActive(prevBtn);

			if(window.innerWidth < 1200 && window.innerWidth > 768){
				if(count >= 3){
					btnDisabled(nextBtn);
				}
			}
		}
		
		function prev(e){ //이전
			e.preventDefault();
			count--; 

			if(count >= 0){
				move();
				pageNum.textContent = count + 1;

				if(currentName.className == 'project'){
					graph();
					columnGraph();
				}
			}

			if(count <= 0){
				btnDisabled(prevBtn);
			}
			btnActive(nextBtn);
		}					

		function move(){ //슬라이드 움직이기
			current.style.transform = `translateX(${-slideWidth * count}px)`;
			current.style.transition = 'transform 0.5s';
		}

		function btnActive(active){ //버튼 활성화
			active.removeAttribute('disabled');
		}
		
		function btnDisabled(disabled){ //버튼 비활성화
			disabled.setAttribute('disabled','disabled');
		}
	}
	control(nextBtn_01,prevBtn_01,pageNum_01,slideWidth_01,current_01);
	control(nextBtn_02,prevBtn_02,pageNum_02,slideWidth_02,current_02);
}
slide();

function columnGraph(){ //막대 그래프
	function bar(col,per){
		const columnBar = document.querySelectorAll('.slide-container .cont .column-bar');

		columnBar.forEach((bar)=>{
			let barCount = 0;
			
			const column = (()=>{
				barCount++;
				
				if(bar.className.includes(col)){
					if(barCount <= per){
						bar.style.width = `${barCount + '%'}`;
					}
				}
				requestAnimationFrame(column);
			})
			requestAnimationFrame(column);
		})
	}
	bar('sixty',60);
	bar('seven',70);
	bar('seven',70);
	bar('seven',70);
	bar('seven',70);
	bar('sixty',60);
	bar('seven',70);

	function num(col,per){
		const columnNum = document.querySelectorAll('.slide-container .cont .column-num');

		columnNum.forEach((bar)=>{
			let barCount = 0;
			
			const column = (()=>{
				barCount++;
				
				if(bar.className.includes(col)){
					if(barCount <= per){
						bar.textContent = barCount + '%';
					}
				}
				requestAnimationFrame(column);
			})
			requestAnimationFrame(column);
		})
	}
	num('sixty',60);
	num('seven',70);
	num('seven',70);
	num('seven',70);
	num('seven',70);
	num('sixty',60);
	num('seven',70);
}

function deviceShow(){ //이미지 클릭시 해당 디바이스 화면 띄우기
	const imgtablet = document.querySelector('.device-type .tablet');
	const imgMobile = document.querySelector('.device-type .mobile');
	const tablet = document.querySelector('.device .tablet');
	const mobile = document.querySelector('.device .mobile');
	const body = document.querySelector('body');
	const div = document.createElement('div');
	div.setAttribute('class','dimed');
	body.appendChild(div);
	
	imgtablet.addEventListener('click',(e)=>{
		e.preventDefault();
		tablet.classList.add('on');
		div.classList.add('on');
	})

	imgMobile.addEventListener('click',(e)=>{
		e.preventDefault();
		mobile.classList.add('on');
		div.classList.add('on');
	})

	div.addEventListener('click',(e)=>{
		e.preventDefault();
		tablet.classList.remove('on');
		mobile.classList.remove('on');
		div.classList.remove('on');
	})
}
deviceShow();

function deviceTxt(){ //디바이스 설명
	const pc_01 = document.querySelectorAll('#project .slide-container .img-pc');
	const mo_01 = document.querySelectorAll('#project .slide-container .img-mo');
	const pcTxt_01 = document.querySelector('#project .device-txt.pc');
	const moTxt_01 = document.querySelector('#project .device-txt.mo');
	const pc_02 = document.querySelectorAll('#project-my .slide-container .img-pc img');
	const mo_02 = document.querySelectorAll('#project-my .slide-container .img-mo img');
	const pcTxt_02 = document.querySelector('#project-my .device-txt.pc');
	const moTxt_02 = document.querySelector('#project-my .device-txt.mo');
	
	function device(type,txt){
		for(let i = 0; i < type.length; i++){
			function move(e){
				txt.style.left = e.clientX + 30 + 'px';
				txt.style.top = e.clientY - 35 + 'px';
			}
			
			if(type[i].closest('li').classList.contains('device-info')){
				type[i].addEventListener('mouseover',()=>{
					txt.classList.add('on');	
					document.addEventListener('mousemove',move);
				})
		
				type[i].addEventListener('mouseout',()=>{
					txt.classList.remove('on');
					document.removeEventListener('mousemove',move);
				})		
			}
		}
	}
	device(pc_01,pcTxt_01);
	device(mo_01,moTxt_01);
	device(pc_02,pcTxt_02);
	device(mo_02,moTxt_02);
}
deviceTxt();