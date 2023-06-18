function snow() { //눈 만들기
  const body = document.querySelector('body');
  const div = document.createElement('div');
  const img = document.createElement('img');
  const size = Math.floor(Math.random() * 51) + 10;

  div.setAttribute('class', 'bg-snow');
  img.setAttribute('src', './images/snow.png');
  img.setAttribute('alt', '눈');
  img.style.width = size + 'px';

  div.appendChild(img);
	body.appendChild(div);
}

for (let i = 0; i < 300; i++) {
  snow();
  function snowMoving() {//눈 움직이기
    const snow = document.querySelectorAll('.bg-snow');
    const snowStyle = snow[i].style;
    const x = Math.floor(Math.random() * screen.width);
    const y = Math.floor(Math.random() * screen.height);
    const time = Math.floor(Math.random() * 35) + 5 + 's';

    snowStyle.position = 'fixed';
    snowStyle.left = x + 'px';
    snowStyle.top = y + 'px';
		snowStyle.zIndex = '-1';
    snowStyle.animation = `snow ${time} linear infinite`;
  }
  snowMoving();
}

function contents() {//메인페이지 보여주기
  const header = document.getElementById('header');
  const main = document.getElementById('contents');
  const body = document.querySelector('body');

  setTimeout(() => {
    header.classList.add('off');
    main.style.opacity = '1';
		body.style.overflow = 'visible';
    body.style.height = 'auto';
  }, 3900)
}
contents();

function music() { //뮤직 플레이어
  const nextBtn = document.querySelector('.music .box-music .control .next-btn');
  const prevBtn = document.querySelector('.music .box-music .control .prev-btn');
  const playBtn = document.querySelector('.music .box-music .control .play-btn');
  const pauseBtn = document.querySelector('.music .box-music .control .pause-btn');
  const musicList = document.querySelectorAll('.music .box-music li');
  const audioList = `
  ./music/santa-tell-me_ariana-grande.mp3,
  ./music/my-only-wish_britney-spears.mp3,
  ./music/wish-tree_red-velvet.mp3,
  ./music/snow-man_sia.mp3,
  ./music/last-christmas_ariana-grande.mp3,
  ./music/this-christmas_taeyeon.mp3,
  ./music/christmas-without-you_ava-max.mp3,
  ./music/all-i-want-for-christmas-is-you_mariah-carey.mp3,
  `;
  const audioPlay = audioList.split(',');
  const audio = new Audio(audioPlay[0]);
  let count = 0;

  function play(){ //재생
		playBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.currentTarget.classList.add('off');
			pauseBtn.classList.add('on');

			musicPlay();
			stop();
			pause();
			autoPlay();

			nextBtn.addEventListener('click', next);
			prevBtn.addEventListener('click', prev);
		})
  }
  play();

  function pause(){ //멈춤
		pauseBtn.addEventListener('click', (e) => {
			e.preventDefault();
			e.currentTarget.classList.remove('on');
			playBtn.classList.remove('off');

			audio.pause();

			nextBtn.removeEventListener('click', next);
			prevBtn.removeEventListener('click', prev);
    })
  }

  function musicPlay() { //음악 재생
    audio.play();
  }

  function stop() { //비디오 실행 중 음악 정지
    const movieList = document.querySelectorAll('.movie .list-movie > ul > li');
    const preview = document.querySelectorAll('.movie .list-movie ul li .preview-btn');
    const close = document.querySelector('.movie .video-area .close-btn');
    const video = document.querySelectorAll('.movie .video-area .video video');

    for (let i = 0; i < movieList.length; i++) {
      const clone = movieList[i].cloneNode(true);

      preview[i].addEventListener('click', (e) => {
				e.preventDefault();
        audio.pause();
      })

      clone.children[1].addEventListener('click', (e) => {
				e.preventDefault();
        audio.pause();
      })

      close.addEventListener('click', (e) => {
				e.preventDefault();
        musicPlay();
      })
			
      for (let k = 0; k < video.length; k++) {
        video[k].addEventListener('ended', () => {
          musicPlay();
        })
      }
    }
  }

  function autoPlay() { //다음곡 자동재생
    audio.addEventListener("ended", () => {
      count++;

      count < audioList.length ? audio.src = audioPlay[count] : "";
      count >= musicList.length ? count = 0 : "";

      if (count < musicList.length) {
        for (let i = 0; i < musicList.length; i++) {
          musicList[i].classList.remove("on");
          musicList[count].classList.add("on");
        }
        audio.src = audioPlay[count];
      }
      musicPlay();
    })
  }

  function next() {//다음곡 재생
    count++;

    count >= musicList.length ? count = 0 : "";

    if (count < musicList.length) {
      for (let i = 0; i < musicList.length; i++) {
        musicList[i].classList.remove("on");
        musicList[count].classList.add("on");
      }
      audio.src = audioPlay[count];
      musicPlay();
    }
  }

  function prev() { //이전곡 재생
    count--;

    count <= -1 ? count = musicList.length - 1 : "";

    if (count >= 0) {
      for (let i = 0; i < musicList.length; i++) {
        musicList[i].classList.remove("on");
        musicList[count].classList.add("on");
      }
      audio.src = audioPlay[count];
      musicPlay();
    }
  }
}
music();

function movieInfo() {//영화 정보
  const movieList = document.querySelectorAll('.list-movie > ul > li');
  const site = document.querySelectorAll('.list-movie .site li');

  for (let i = 0; i < movieList.length; i++) {
    movieList[i].addEventListener('mouseenter', (e) => {
      if (e.target.children[1] && e.target.children[2]) {
        e.target.children[1].classList.add('on');
        e.target.children[2].classList.add('on');
      }
      site[i].classList.remove('on');
    })

    movieList[i].addEventListener('mouseleave', (e) => {
      e.target.children[1].classList.remove('on');
      e.target.children[2].classList.remove('on');
    })
  }
}
movieInfo();

function slide() {//슬라이드
  const movie = document.querySelector('.list-movie > ul');
  const movieList = document.querySelectorAll('.list-movie > ul > li');
  const previewBtn = document.querySelectorAll('.movie .list-movie ul li .preview-btn');
  const movieStyle = movie.style;

  for (let i = 0; i < movieList.length; i++) {
    const clone = movieList[i].cloneNode(true);
    movie.appendChild(clone);

    movieList[i].addEventListener('mouseover', () => {
      movieStyle.animationPlayState = 'paused';
    })

    movieList[i].addEventListener('mouseout', () => {
      movieStyle.animationPlayState = 'running';
    })

    clone.addEventListener('mouseover', () => {
      movieStyle.animationPlayState = 'paused';
      movieInfo();
    })

    clone.addEventListener('mouseout', () => {
      movieStyle.animationPlayState = 'running';
    })

    function video() { //예고편
			previewBtn[i].addEventListener('click', (e) => {
				e.preventDefault();
        control();
        movieStyle.animationPlayState = 'paused';
      })

      clone.children[1].addEventListener('click', (e) => {
				e.preventDefault();
        control();
        movieStyle.animationPlayState = 'paused';
      })

      function control() {//예고편 제어
        const video = document.querySelectorAll('.video-area video');
        const close = document.querySelector('.movie .video-area .close-btn');
				
        video[i].classList.add('on');
        video[i].play();

        close.classList.add('on');

        close.addEventListener('click', (e) => {
          video[i].classList.remove('on');
          video[i].pause();
          e.target.classList.remove('on');
        })

        video[i].addEventListener('ended', () => {
          video[i].classList.remove('on');
          close.classList.remove('on');
        })
      }
    }
    video();
  }
}
slide();

function drag(){ //슬라이드 드래그
	const movieList = document.querySelector('.list-movie');
	const body = document.querySelector('body');
	let drag = false;
	let start;
	let end;
	let x;
	
	movieList.addEventListener('mousedown',(e)=>{
		start = e.pageX;
		body.style.userSelect = 'none';
	})

	movieList.addEventListener('mouseup',(e)=>{
		drag; 
		end = e.pageX;
		x = end - start;
	
		movieList.style.transform = `translateX(${x}px)`;
		movieList.style.transition = '2s';
	})
}
drag();

function mapOpacity() {//지도효과
  const map = document.querySelectorAll('.map div');

  for (let i = 0; i < map.length; i++) {
    map[i].addEventListener('mouseover', (e) => {
      for (let k = 0; k < map.length; k++) {
        map[k].style.opacity = '0.1';
      }
      e.currentTarget.style.opacity = '1';
    })

    map[i].addEventListener('mouseout', () => {
      for (let k = 0; k < map.length; k++) {
        map[k].style.opacity = '1';
      }
    })
  }
}
mapOpacity();

function mapCont(){ //지역별 내용 보여주기
	const mapBtn = document.querySelectorAll('.place .map .map-btn');
	const cont = document.querySelector('.place .cont');
	const img = document.querySelectorAll('.place .cont .img div:not(.slide-container)');
	const boxTxt = document.querySelectorAll('.place .cont .box-txt li');

	mapBtn.forEach((map) => {
		map.addEventListener('click',(e)=>{
			e.preventDefault();

			window.scrollTo({left:0, top:cont.offsetTop * 2.1, behavior:'smooth'});

      boxTxt.forEach((target)=>{
        const currentName = e.target.parentNode.className;
        target.classList.remove('on');

        if(currentName == target.className){
          target.classList.add('on');
        }
      })

			img.forEach((target)=>{
				const currentName = e.target.parentNode.className;
				target.style.visibility = 'hidden';
				target.style.width = 0;
				target.style.height = 0;

				if(currentName == target.className){
					target.style.visibility = 'visible';
					target.style.width = 100 + '%';
					target.style.height = 100 + '%';
				}
			})
		})
	});
}
mapCont();

function cardGame() { //카드게임
  const startBtn = document.querySelector('.card-game .play .button-group .start-btn');
  const overBtn = document.querySelector('.card-game .play .button-group .over-btn');
  const success = document.querySelector('.card-game .result .success');
  const fail = document.querySelector('.card-game .result .fail');
  const txt = document.querySelector('.card-game .play .tit');
  const overSound = new Audio('./music/over.wav');
  let playing = true;

  function start(e) { //시작
    e.target.style.animation = 'start 1s linear forwards';
    shuffleCard();
    timer();
  }
  startBtn.addEventListener('click', start);

  function restart() { //다시시작
    const card = document.querySelectorAll('.card-game .list-card .card');

    for (let i = 0; i < card.length; i++) {
      card[i].classList.remove('flip');
    }

    success.classList.remove('on');
    fail.classList.remove('on');
    shuffleCard();
  }

  function over() { //종료
    playing = false;
    startBtn.classList.add('off');
    overBtn.classList.add('on');
    txt.textContent = '! over';

    overBtn.addEventListener('click', (e) => {
      e.target.style.animation = 'over 1s linear forwards';

      setTimeout(() => {
        startBtn.classList.remove('off');
        startBtn.style.animationPlayState = 'paused';
        overBtn.classList.remove('on');
        txt.textContent = 'start !';
        playing = true;

        restart();
      }, 1000)

      timer();
    })
    overSound.play();
    overBtn.style.animationPlayState = 'paused';
  }

  function shuffleCard() { //카드 섞기
    const cardList = document.querySelectorAll('.card-game .list-card .card .back');
    const arr = ['rudolph', 'gift', 'santa', 'socks', 'tree', 'wreath', 'ball', 'cane', 'leaf', 'rudolph', 'gift', 'santa', 'socks', 'tree', 'wreath', 'ball', 'cane', 'leaf'];

    function shuffle(array) {
      for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        cardList[i].style.backgroundImage = `url('./images/card_game/${arr[i]}.png')`;
      }
    }
    shuffle(arr);
  }

  function timer() { //타이머
    const miniute = document.querySelector('.card-game .play .timer .miniutes');
    const seconds = document.querySelector('.card-game .play .timer .seconds');
    let time = 120;

    const timerCount = setInterval(() => {
      let min = Math.floor(time / 60);
      let sec = time % 60;

      miniute.textContent = '0' + min;
      seconds.textContent = sec;
      sec < 10 ? seconds.textContent = '0' + sec : seconds;
      time--;

      if (time < 0) {
        timerStop();
        over();
        setTimeout(() => {
          fail.classList.add('on');
        }, 500)
      }
    }, 950);
    startBtn.removeEventListener('click', start);

    function timerStop() { //타이머 중지
      clearInterval(timerCount);
    }

    function cardFlip() { //카드 뒤집기
      const card = document.querySelectorAll('.list-card .card');
      let select = [];
      let finish = [];
      let num = 0;

      function matching(e) {//짝맞추기
        const target = e.currentTarget;

        if (playing && !finish.includes(target)) {
          target.classList.add('flip');
          select.push(target);

          if (select.length == 2) {
            if (select[0].children[1].style.backgroundImage !== select[1].children[1].style.backgroundImage) {
              setTimeout(() => {
                select[0].classList.remove('flip');
                select[1].classList.remove('flip');
                select = [];
              }, 500)
            } else {
              finish.push(select[0]);
              finish.push(select[1]);
              select = [];
              num++;
            
              if (num == card.length / 2) {
                setTimeout(() => {
                  success.classList.add('on');
                }, 500)
                over();
                timerStop();
              }
            }
          } else if (select.length > 2) {
            target.classList.remove('flip');
          }
        }
      }
      for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', matching);
      }
    }
    cardFlip();
  }
}
cardGame();


