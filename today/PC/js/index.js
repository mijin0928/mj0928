function weatherInfo(){//날씨 정보
	const getJSON = function(url,callback){ 
	const xhr = new XMLHttpRequest();
	
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function(){ 
		const stauts = xhr.status;
		if(stauts === 200){ 
			callback(null, xhr.response);
		}else{ 
			callback(stauts, xhr.response);
		}
	};
	xhr.send();

	weatherInfo = function(){};
}

navigator.geolocation.getCurrentPosition(function(pos) {
	const latitude = pos.coords.latitude;
	const longitude = pos.coords.longitude;
	
	getJSON(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=323f64ab84d6fe3f4e2cce7ed99120f0&units=metric`, function(err, data){ 
		if(err == null){ 
			cityName(data);
		}else{ 
			return;
		}
	});
});

function cityName(data){ //현재 위치
	const name = document.querySelector('.name');
	name.textContent = `${data[0].name}`;

	getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${data[0].name}&appid=323f64ab84d6fe3f4e2cce7ed99120f0&units=metric`, function(err, data){ 
		if(err == null){ 
			weather(data);
		}else{ 
			return;
		}
	});

	function clone(){ //데이터 복사
		const txt = document.querySelector('.txt');
		const cloneN = name.cloneNode(true);
		cloneN.setAttribute('class','clone name');
		txt.appendChild(cloneN);
	}
	clone();
}

function weather(data){ //현재 위치에 따른 날씨 정보
	const icon = document.querySelector('.icon');
	const temperature = document.querySelector('.temperature');
	const description = document.querySelector('.description');
	const humidity = document.querySelector('.humidity');
	const tempMin = document.querySelector('.temp-min');
	const tempMax = document.querySelector('.temp-max');
	const clouds = document.querySelector('.clouds');
	const wind = document.querySelector('.wind');
	const img = document.createElement('img');
	const txt = document.querySelector('.txt');
	
	temperature.textContent = `${data.main.temp}`;
	description.textContent = `${data.weather[0].description}`;
	humidity.textContent = `${data.main.humidity}`;
	tempMin.textContent = `${data.main.temp_min}`;
	tempMax.textContent = `${data.main.temp_max}`;
	clouds.textContent = `${data.clouds.all}`;
	wind.textContent = `${data.wind.speed}`;
	
	img.setAttribute('src',`./images/icons/${data.weather[0].icon}.gif`);
	img.setAttribute('alt','weather');
	icon.appendChild(img);

	function clone(){ //데이터 복사
		const cloneT = temperature.cloneNode(true);
		cloneT.setAttribute('class','clone temperature');
		txt.appendChild(cloneT);
	}
	clone();

	function weatherDescKo(id){ //날씨 정보 한국어 번역
			const wInfo = {
					201: '가벼운 비와 천둥구름' ,
					200: '비와 천둥구름',
					202: '폭우와 천둥구름',
					210: '약한 천둥구름',
					211: '천둥구름',
					212: '강한 천둥구름',
					221: '불규칙적 천둥구름',
					230: '약한 비와 천둥구름',
					231: '가벼운 비와 천둥구름',
					232: '강한 안개비와 천둥구름',
					300: '가벼운 안개비',
					301: '안개비',
					302: '강한 안개비',
					310: '가벼운 적은 비',
					311: '적은비',
					312: '강한 적은 비',
					313: '소나기와 안개비',
					314: '강한 소나기와 안개비',
					321: '소나기',
					500: '약한 비',
					501: '중간 비',
					502: '강한 비',
					503: '매우 강한 비',
					504: '폭우',
					511: '우박',
					520: '약한 소나기',
					521: '소나기',
					522: '강한 소나기',
					531: '불규칙적 소나기',
					600: '가벼운 눈',
					601: '눈',
					602: '강한 눈',
					611: '진눈깨비',
					612: '소나기 진눈깨비',
					615: '약한 비와 눈',
					616: '비와 눈',
					620: '약한 소나기와 눈',
					621: '소나기와 눈',
					622: '강한 소나기와 눈',
					701: '옅은 안개',
					711: '연기',
					721: '옅은 안개',
					731: '모래 먼지',
					741: '안개',
					751: '모래',
					761: '먼지',
					762: '화산재',
					771: '돌풍',
					781: '토네이도',
					800: '맑음',
					801: '구름 조금',
					802: '구름 조금 많음',
					803: '구름 많음',
					804: '흐림',
					900: '토네이도',
					901: '태풍',
					902: '허리케인',
					903: '한랭',
					904: '고온',
					905: '바람부는',
					906: '우박',
					951: '바람이 거의 없음',
					952: '약한 바람',
					953: '부드러운 바람',
					954: '중간 세기 바람',
					955: '맑은 바람',
					956: '센 바람',
					957: '돌풍에 가까운 센 바람',
					958: '돌풍',
					959: '심각한 돌풍',
					960: '폭풍',
					961: '강한 폭풍',
					962: '허리케인',
			}

			const number = Object.keys(wInfo);
			const txt =  Object.values(wInfo);

			for(let i=0; i < number.length; i++){ 
				if(number[i] == id){ 
					description.textContent = txt[i];
				}
			}
		}
		weatherDescKo(data.weather[0].id);
	}	
}

function mainTitle(){ //제목
	const title = document.querySelector('.title');
	const titleArr = title.textContent.split('');
	let count = 0;

	title.textContent = '';

	setTimeout(function txt(){ 
		if(count < titleArr.length){
			title.textContent += titleArr[count++];
		}
		setTimeout(txt,300);
	})

	setTimeout(()=>{
		const scroll = document.querySelector('#header .img');
		scroll.classList.add('on');
		scrollSection();
	},3700)
}
mainTitle();

function calender(){ //달력
	const year = document.querySelector('.calender .wrap-title .year');
	const month = document.querySelector('.calender .wrap-title .month');
	const monthArr = [
		'December',
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
	]
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();

	month.textContent = monthArr[currentMonth + 1];
	year.textContent = currentYear;

	function day(){ //날짜 출력
		const txt = document.querySelectorAll('.calender-table td');
		const firstDate = new Date(currentYear,currentMonth,1).getDay();
		const lastDate = new Date(currentYear,currentMonth+1,0).getDate();
		const date = currentDate.getDate();
		
		for(let i = 1; i <= lastDate; i++){
			txt[i + (firstDate - 1)].textContent += i;

			if(txt[i].textContent == date){ 
				txt[i].className == 'sun' ? txt[i].setAttribute('class','sun today') : txt[i].setAttribute('class','today');
			}
		}
	}
	day();
}
calender();

function dots(){ //점
	const dot = document.querySelectorAll('.dot');
	const dotTxt = '.';

	for(let i = 0; i < dot.length; i++){
		for(let k = 0; k < dotTxt.length; k++){ 
			setTimeout(function txt(){ 
				dot[i].textContent += dotTxt[k];
				setTimeout(txt,300);

				if(dot[i].textContent.length == 4){
					dot[i].textContent = '';
				}
			})
		}
	}
}
dots();

function fortune(){ //오늘의 운세
	const hand = document.querySelector('.box-hand .img');
	const handMove = document.querySelector('.img-move');
	const ball = document.querySelector('.ball img');
	const boxHand = document.querySelector('.box-hand');
	const img = document.querySelector('.fortune-telling .cont > .img');
	const loading = document.querySelector('.loading');
	const result = document.querySelector('.result');
	const reset = document.querySelector('.reset');

	function handChange(e){ //손 이미지 변경
		e.preventDefault();
		hand.classList.add('off');
		handMove.classList.add('on');
		document.body.style.cursor = 'none';

		handMove.addEventListener('mousemove',()=>{ 
			document.addEventListener('mousemove', cont);
		})
	}
	hand.addEventListener('click', handChange);

	function cont(e){ //내용 보여주기
		handMove.style.left = e.clientX + 'px';
		handMove.style.top = e.clientY + 'px';
			
		ball.addEventListener('mouseover',()=>{ 
			if(document.body.style.cursor !== 'default'){ 
				setTimeout(()=>{ 
					boxHand.classList.add('off');
					img.classList.add('off');
					handMove.classList.remove('on');
					loading.classList.add('on');
			
					setTimeout(()=>{ 
						loading.classList.remove('on');
						result.classList.add('on');
						reset.classList.add('on');
						document.body.style.cursor = 'default';
					},2000)
				},2500)
			}
		})  
	}
	
	function resetMove(){ //처음으로
		reset.addEventListener('click',(e)=>{ 
			e.preventDefault();

			reset.classList.remove('on');
			result.classList.remove('on');
			boxHand.classList.remove('off');
			img.classList.remove('off');
			hand.classList.remove('off');
			randomCont();
		})
	}
	resetMove(); 
}
fortune();

function randomCont(){ //랜덤 내용 출력
	const fortuneCont = [
		'얽히고 꼬였던 갈등의 실타래가 해결되는 날입니다. 미묘한 긴장 관계가 완화되고, 나를 껄끄럽게 했던 사건이 마무리지어집니다. 당신의 머리를 복잡하게 하고 스트레스로 작용하였던 많은 악재들이 일시에 해소될 수 있습니다.',
		'우연히 신청했던 경품을 타거나 행운권 추첨에도 운이 있는 날입니다. 간밤에 기분좋은 꿈을 꿨다면 살짝 복권을 사보는 것도 좋겠습니다. 큰 액수는 아니여도 기분좋을만큼의 당첨수가 있습니다.',
		'시작과 끝에서 각각에 따르는 운이 조금 다른 모습을 보이는 날입니다. 초반에는 일의 해결이 어렵고 운이 없다고 생각할 정도의 상황도 벌어질 수 있지만 꾸준히, 침착하게 임하다 보면 결과는 나쁘지 않은 날이 될 것입니다.',
		'오늘은 과정이 힘들더라도 결과가 좋은 날입니다. 문제가 있을 수는 있지만 해결 할 수 없는 문제는 없습니다. 자신을 당혹스럽게 하는 문제가 생기더라도 쉽게 포기하거나 실망해서는 안됩니다.',
		'자신감을 가져도 좋은 하루입니다. 입지와 지위가 분명해지는 흐름이니 과정과 결과가 나쁠리 없는 날입니다. 대인관계가 우호적인 하루이니 주변으로부터 인정을 받거나 칭찬을 받을만한 일이 있을 것입니다.',
		'본의 아니게 상대방에게 상처를 줄 수 있는 하루입니다. 나 자신은 상대를 위해 한 일이지만 받아들이는 입장은 달리 받아들일 수 있습니다. 내 위주로 생각하기 보다는 현재 상대방이 처한 상황을 고려하는 배려가 필요합니다.',
		'마음이 초조하고 괜시리 분주한 하루입니다. 특별한 원인이 없더라도 쫓기는 듯한 초조함을 느낄 수 있습니다. 다급한 마음에 괜한 실수들이 발생할 수 있으니 그것을 줄이는 것을 목표로 삼는 하루를 만들어가야 합니다.',
		'새로운 일을 벌이는 것은 좋지 않은 날입니다. 변화가 좋지 않게 작용하는 날이네요. 하던 일에 충실하는 것이 낫습니다. 새로운 변화를 꿈꾸는 것은 좋지만 시기를 잘 가려서 해야 좋습니다.',
		'상황을 분석하고 파악하는 능력이 필요한 날입니다. 당신에게 유리한 순간이 많이 오지만 막상 본인이 이를 제대로 알아보지 못하고 그냥 흘려버릴 수 있습니다. 무턱대고 기다리는 태도는 버리는 것이 좋으며 먼저 행동하는 것도 좋습니다.',
		'주변의 도움을 얻기는 좋으나 도움을 줄 이와 방해를 미칠 이를 구별해야 합니다. 자신의 주변에 있는 사람들 중에서 당신을 진심으로 생각해 주는 사람이 누구인지 한번쯤 생각해보아야 하는 날입니다.',
		'앓던 이가 빠지는 것 같은 날입니다. 오래 속을 썩혔던 사건이 드디어 해결됩니다. 오래 묵었던 일이 해결되니 한결 가벼워진 마음으로 새 일을 모색해 볼 수 있습니다. 즐거운 마음으로 하루를 보낼 수 있겠군요.',
		'예상치 못했던 곳에서 방해 세력이 미치는 날입니다. 자신의 의견에 반대하는 무리가 생기니 마음이 그리 편치 못합니다. 또한 자신이 생각했던 대로 일이 풀리지 않기 때문에 심신이 피로하기 쉽습니다.',
		'큰 어려움 없이 무난하게 지낼 수 있는 하루가 될 것입니다. 생각지 못한 곳에서 장애를 받거나 방해를 받는 일이 특별히 발생하지는 않을 것입니다. 또한 일상과 비슷한 일들이 벌어지기 때문에 새로운 느낌을 얻는 것 조차 힘들 수 있습니다.',
		'휴식과 컨디션 관리가 필요한 하루입니다. 인간관계에서 역시 피곤한 일이 발생할 조짐이 보이므로 감정을 너무 날카롭게 세울 것 없이 약간은 느슨하고 여유 있게 하루를 보내도록 하세요.',
		'정에 얽매인 실수로 공적인 일에 문제가 생길 수 있으니 공과사의 구분을 명확히 해야하는 하루입니다. 겉으로 드러내면 엎친 데 덮친 격, 문제를 더 확대시킬 수 있으니 오늘 당신은 포커페이스를 유지하는 것이 좋습니다.'
	];
	const questionCont = [
		'만원을 가장 알차게 쓸 수 있는 방법은 무엇일까요?',
		'생일선물로 절대 받고 싶지 않은 것이 있다면 무엇인가요?',
		'하루 동안 초능력을 가질 수 있다면 어떤 것을 원하나요?',
		'좋은 친구란 무엇일까요?',
		'자서전을 쓴다면 첫 문장을 어떻게 쓰고 싶나요?',
		'재산이 얼마나 있으면 행복할까요?',
		'나를 감성에 젖게 만드는 것은 무엇인가요?',
		'내 인생을 영화로 만든다면 주인공 역은 어떤 사람으로 하고 싶은가요?',
		'두 번 이상 본 영화는 어떤 것인가요? 그 이유는?',
		'요즘 가장 자주 사용하는 앱(App)은 어떤 것인가요? 일주일에 얼마나 사용하나요?',
		'당신에게 호의적이지 않은 사람에게도 좋은 점을 찾을 수 있을까요?',
		'연주할 수 있는 악기가 있나요? 혹시 없다면 어떤 악기를 배우고 싶은가요?',
		'여행지에서 생겼던 가장 재미있었던 일은 무엇인가요?',
		'구입한 뒤 한 번도 안 쓴 물건은 어떤 것인가요?',
		'법을 만들 수 있다면 어떤 법을 만들고 싶은가요?',
		'사람을 사귈 때 가장 중요하게 생각하는 가치는 무엇인가요?',
		'미래를 미리 볼 수 있다면 몇 살 때의 당신을 확인해보고 싶은가요?',
		'애니메이션, 영화, 드라마, 소설 주인공 등 좋아하는 캐릭터가 있나요?',
		'지금 나이가 되어서 좋은 점은 무엇이 있을까요?',
		'오늘 가장 듣고 싶은말은 무엇인가요?'
	];
    
	function cont(arr){ //내용 출력
		const resultTxt = document.querySelector('.result > .txt');
		const questionTxt = document.querySelector('.question .tit');
		const random = Math.floor(Math.random() * arr.length);
		
		for(let i = 0; i<arr.length; i++){  
			arr[i] == fortuneCont[i] ? resultTxt.textContent = arr[random] : questionTxt.textContent = arr[random];
		}
	}
	cont(fortuneCont);
	cont(questionCont);
}
randomCont();

function toDoList(){ //내용 입력
	const txt = document.querySelector('.to-do-list input[type="text"]');
	const enterBtn = document.querySelector('.enter-btn');
	const cont = document.querySelector('.to-do-list .cont');
	let num = 0;

	function list(){ //할일 목록
		const div = document.createElement('div');
		const input = document.createElement('input');
		const button = document.createElement('button');
		const img = document.createElement('img');
		const label = document.createElement('label');
		const remove = document.createElement('div');

		num++;
		
		div.setAttribute('class','list');
		input.setAttribute('type','checkbox');
		input.setAttribute('id',`checkbox${'_0' + num}`);
		input.setAttribute('name',`checkbox${'_0' + num}`);
		button.setAttribute('type','button');
		button.setAttribute('class','remove-btn');
		img.setAttribute('src','./images/remove-before.png');
		img.setAttribute('alt','삭제');
		label.setAttribute('for',`checkbox${'_0' + num}`);
		remove.setAttribute('class','remove');
		label.textContent = txt.value;

		button.appendChild(img);
		div.appendChild(input);
		div.appendChild(label);
		remove.appendChild(button);
		div.appendChild(remove);
		cont.appendChild(div);

		function removeBtn(){ //삭제 버튼
			button.addEventListener('click',(e)=> { 
				e.preventDefault();
				cont.removeChild(div);
			})
			button.addEventListener('mouseover',()=> { 
				img.setAttribute('src','./images/remove-after.png');
			})
			button.addEventListener('mouseout',()=> { 
				img.setAttribute('src','./images/remove-before.png');
			})
		}
		removeBtn();
	}

	enterBtn.addEventListener('click',(e)=>{
		e.preventDefault(); 
		if(txt.value){ 
			list();
			txt.value = '';
		}else{ 
			alert('내용을 입력해주세요');
			return;
		}
	})
}
toDoList();

function selectBox(){ //선택박스
	const selectBtn = document.querySelector('.box-select .select-btn');
	const select = document.querySelector('.box-select .select');
	const arrow = document.querySelector('.box-select .arrow');
	let num = 0;

	function arrowChange(){ //화살표 이미지 변경
		selectBtn.addEventListener('mouseover',()=>{ 
			arrow.style.backgroundImage = 'url("./images/arrow-after.png")';
		})

		selectBtn.addEventListener('mouseout',()=>{ 
			arrow.style.backgroundImage = 'url("./images/arrow-before.png")';
		})
	}
	arrowChange();

	function toggle(){ //선택박스 토글
		selectBtn.addEventListener('click',(e)=>{ 
			e.preventDefault();
			select.classList.toggle('on');
		})
	}
	toggle();

	function createEl(e){ //내용 만들기
		e.preventDefault();
		
		const divWrap = document.createElement('div');
		const p = document.createElement('p');
		const amount = document.createElement('input');
		const kcal = document.createElement('input');
		const label = document.createElement('label');
		const div = document.createElement('div');
		const button = document.createElement('button');
		const img = document.createElement('img');
		const inputTxt = document.querySelector('.menu-planner input[type="text"]');
		const contWrap = document.querySelectorAll('.box-menu .cont-wrap');
		
		num++;
		
		divWrap.setAttribute('class','cont');
		p.setAttribute('class','txt');
		amount.setAttribute('type','number');
		amount.setAttribute('value','1');
		amount.setAttribute('title','수량 입력');
		kcal.setAttribute('type','text');
		kcal.setAttribute('id',`kcal${'_0' + num}`);
		kcal.setAttribute('name',`kcal${'_0' + num}`);
		kcal.setAttribute('title','칼로리 입력');
		label.setAttribute('for',`kcal${'_0' + num}`);
		div.setAttribute('class','kcal');
		label.textContent = 'kcal';

		button.appendChild(img);
		button.setAttribute('type','button');
		button.setAttribute('class','remove-btn');
		img.setAttribute('src','./images/remove.png');
		img.setAttribute('alt','삭제');

		div.appendChild(kcal);
		div.appendChild(label);
		divWrap.appendChild(p);
		divWrap.appendChild(amount);
		divWrap.appendChild(div);
		divWrap.appendChild(button);

		function time(){ //시간대
			selectBtn.textContent = e.target.textContent;
			select.classList.remove('on');

			function arrow(){ // 화살표 이미지 변경
				const span = document.createElement('span');
				span.setAttribute('class','arrow');
				selectBtn.appendChild(span);

				selectBtn.addEventListener('mouseover',()=>{ 
					span.style.backgroundImage = 'url("./images/arrow-after.png")';
				})
		
				selectBtn.addEventListener('mouseout',()=>{ 
					span.style.backgroundImage = 'url("./images/arrow-before.png")';
				})
			}
			
			if(inputTxt.value){ 
				arrow();

				if(selectBtn.textContent == '아침'){
					contWrap[0].appendChild(divWrap);
				}else if(selectBtn.textContent == '점심'){ 
					contWrap[1].appendChild(divWrap);
				}else{
					contWrap[2].appendChild(divWrap);
				}
				p.textContent = inputTxt.value;
				inputTxt.value = '';
			}else{ 
				selectBtn.textContent = '선택';
				arrow();
				alert('내용을 입력해주세요');
				return;
			}
		}
		time();

		function removeCont(){ //내용 지우기
			button.addEventListener('click',(e)=>{ 
				e.preventDefault();
				const name = e.currentTarget.parentNode.parentNode;
				
				if(name.className.includes('breakfast')){ 
					contWrap[0].removeChild(divWrap);
				}else if(name.className.includes('lunch')){ 
					contWrap[1].removeChild(divWrap);
				}else{
					contWrap[2].removeChild(divWrap);
				}
			})
		}
		removeCont();
	}

	for(let i = 0; i < select.children.length; i++){ 
			select.children[i].addEventListener('click',createEl);
	}
}
selectBox();

function disabled(){ //입력 수정 버튼
	const textarea = document.querySelector('.question textarea');
	const btn = document.querySelectorAll('.question .btn-group button');
	let num = 0;

	function btnClick(e){ 
			e.preventDefault();

			if(textarea.value){ 
				if(e.target.className == 'enter'){ 
					textarea.setAttribute('disabled','disabled');

					if(num == 0){ 
						alert('입력되었습니다');
						return;
					}else{
						alert('수정되었습니다');
						return;
					}
				}else{   
					num++;
					textarea.removeAttribute('disabled','disabled'); 
				}
		}else{
			alert('내용을 입력해주세요');
			return;
		}
	}

	for(let i=0; i<btn.length; i++){ 
		btn[i].addEventListener('click',btnClick);
	}
}
disabled();

function scrollSection(){ //마우스 휠 이벤트
	const section = document.querySelectorAll('.section');
	const gnb = document.querySelector('.gnb-nav');
	const nav = document.querySelectorAll('.gnb-nav li');
	let count = 0;
	let timer;
	
	function scrollEvent(e){ 
		e.preventDefault();	

		clearTimeout(timer);
		timer = setTimeout(() => {
			if(e.deltaY > 0){ 
				if(count == section.length + 1){ 
					return;
				}
				count++;
			}else{ 
				if(count == 0){ 
					return;
				}
				count--;
			}

			if(count >= 2){
				gnb.classList.add('on');
				
				for(let i=0; i<nav.length; i++){ 
					nav[i].classList.remove('active');
				}
				nav[count - 2].classList.add('active');
			}else{ 
				gnb.classList.remove('on');
			}

			if(count == 1){
				weatherInfo();
			}
			window.scrollTo({top:count * window.innerHeight, left:0, behavior: 'smooth'});
		}, 200);
	}
	window.addEventListener('wheel',scrollEvent,{passive:false});

	function gnbEffect(e){ //메뉴 클릭시 효과
		for(let k=0; k<nav.length; k++){ 
			nav[k].classList.remove('active');
		}
		e.currentTarget.classList.add('active');
	}

	function gnbClickMove(e){ //메뉴 클릭시 해당 섹션으로 이동
		const name = e.target.className;
		switch(name){ 
			case 'weather' : count = 2; 
			break;
			case 'fortune-telling' : count = 3;
			break;
			case 'to-do-list' : count = 4;
			break;
			case 'menu-planner' : count = 5;
			break;
			case 'question' : count = 6;
			break;
		} 
		window.scrollTo({top:count * window.innerHeight, left:0, behavior: 'smooth'});
	}

	for(let i=0; i<nav.length; i++){ 
			nav[i].addEventListener('click',(e)=>{ 
			e.preventDefault();
			gnbEffect(e);
			gnbClickMove(e);	
		})
	}
}

