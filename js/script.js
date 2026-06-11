/* ==========================================================
   얼렁뚱땅! 웹사이트 스크립트
   ========================================================== */

/* ---------- 인트로 ---------- */
window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('intro').classList.add('hide'), 1700);
});

const introText = document.getElementById('introText');
const dotSteps = ['', ' .', ' . .', ' . . .'];
let dotIdx = 0;
const dotTimer = setInterval(() => {
  dotIdx = (dotIdx + 1) % dotSteps.length;
  introText.textContent = '로딩 중' + dotSteps[dotIdx];
}, 450);
setTimeout(() => clearInterval(dotTimer), 2200);

/* ==========================================================
   멤버 카드
   - 이미지: assets/images/{id}_cool.png / {id}_silly.png
     (PDF에 있던 카드 디자인 그대로 통짜 PNG로 넣으면 꽉 차게 표시돼요)
   - 호버: 이미지만 크로스페이드 (카드는 안 움직임)
   - 클릭: 카드 아래에 만화 정보창이 펼쳐짐
   ========================================================== */
const MEMBERS = [
  {
    id:'guitar', role:'GUITAR', name:'기타',
    fallbackCool:'#3a342c', fallbackSilly:'#E8332A',
    info:[
      '실수 많은 I',
      '연습량 ∝ 애정도',
      '피크를 자주 잃어버려요',
      '필살기: 피킹하모닉스',
      '🎧: Tik Tak Tok - 실리카겔',
    ],
  },
  {
    id:'vocal', role:'VOCAL', name:'보컬',
    fallbackCool:'#5BA8A0', fallbackSilly:'#F5C13A',
    info:[
      '주도적인 I',
      '기타를 치며 노래를 부름 (멀티의 대가)',
      '합주보다 회식이 더 좋아요!',
      '필살기: 기세로 노래하기',
      '🎧: calla - w2e',
    ],
  },
  {
    id:'bass', role:'BASS', name:'베이스',
    fallbackCool:'#5E9E7E', fallbackSilly:'#A8CDB8',
    info:[
      '낙관적인 I',
      '흔들리지 않는 편안함, 든든한 베이스랍니다',
      '주목을 덜 받는 편.. (Small JohnjaeGam)',
      '필살기: 그냥 든든함',
      '🎧: Starlight - Muse',
    ],
  },
  {
    id:'drum', role:'DRUM', name:'드럼',
    fallbackCool:'#1E63D6', fallbackSilly:'#E08A3C',
    info:[
      '잘 놀라는 I',
      '놀람에 악의는 없어요!',
      '그러나 빠르게 진정하는 편',
      '필살기: 기막힌 필인',
      '🎧: 이상비행 - 한로로',
    ],
  },
];

const memberGrid = document.getElementById('memberGrid');
MEMBERS.forEach(m => {
  const col = document.createElement('div');
  col.className = 'member-col';
  col.innerHTML = `
    <div class="member-card" tabindex="0" role="button"
         aria-label="${m.role} 멤버 카드 - 클릭하면 정보가 열려요">
      <img class="card-img cool"  src="assets/images/${m.id}_cool.png"  alt="${m.role} 멋짐 버전"
           onerror="cardFallback(this,'${m.role}','멋짐.ver','${m.fallbackCool}','cool')">
      <img class="card-img silly" src="assets/images/${m.id}_silly.png" alt="${m.role} 얼렁뚱땅 버전"
           onerror="cardFallback(this,'${m.role}','얼렁뚱땅.ver','${m.fallbackSilly}','silly')">
    </div>
    <div class="member-info">
      <div class="info-box">
        <h4><span class="badge">${m.role}</span>${m.name}</h4>
        <ul>${m.info.map(line => `<li>${line}</li>`).join('')}</ul>
      </div>
    </div>`;
  const card = col.querySelector('.member-card');
  const toggle = () => col.classList.toggle('open');
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
  });
  memberGrid.appendChild(col);
});

/* 이미지가 없을 때 색깔 카드로 대체 */
function cardFallback(img, role, label, color, kind) {
  const d = document.createElement('div');
  d.className = `card-fallback ${kind}`;
  d.style.backgroundColor = color;
  d.style.backgroundImage = 'radial-gradient(circle, rgba(0,0,0,.15) 1.2px, transparent 1.3px)';
  d.innerHTML = `${role}<small>${label}<br>(assets/images/ 에 PNG 넣기)</small>`;
  img.replaceWith(d);
}
window.cardFallback = cardFallback;

/* ==========================================================
   셋리스트 보드게임 (혜원이 만든 보드판 이미지 위에서!)
   - x, y 는 보드 이미지에서의 위치(%) — 칸이 안 맞으면 숫자만 조절하면 돼요
   - youtubeId 에 유튜브 영상 ID(주소의 v= 뒷부분)를 넣으면 자동 재생 준비
   ========================================================== */
const BOARD = [
  { type:'start', label:'START!',                                              x:25, y:7  },
  { type:'song',  song:'blue',    artist:'yung kai',      tape:1, x:53, y:11, youtubeId:'mnsOuuDfOek' },
  { type:'event', label:'고양이가 지나간다..🐈',                                x:65, y:17 },
  { type:'song',  song:'알루미늄', artist:'브로큰 발렌타인', tape:2, x:66, y:27, youtubeId:'LxXI3ypn1zE' },
  { type:'song',  song:'yours',   artist:'데이먼스 이어',   tape:3, x:48, y:35, youtubeId:'VLaxthR_OBk' },
  { type:'song',  song:'ride',    artist:'wave to earth',  tape:4, x:19, y:47, youtubeId:'e7MKDhubCWk' },
  { type:'event', label:'피크 분실! 한 턴 쉬는 척',                            x:30, y:57 },
  { type:'song',  song:'you!',    artist:'LANY',           tape:5, x:67, y:59, youtubeId:'WjVG_1umWxo' },
  { type:'event', label:'으아니?!',                                            x:75, y:70 },
  { type:'song',  song:'love.',   artist:'wave to earth',  tape:6, x:56, y:79, youtubeId:'FxuFjo2P4-o' },
  { type:'end',   label:'THE END',                                             x:21, y:90 },
];

const boardInner = document.getElementById('boardInner');
const piece = document.getElementById('gamePiece');
const cassetteSlot = document.getElementById('cassetteSlot');
const tapeImg = document.getElementById('tapeImg');
const tapePlaceholder = document.getElementById('tapePlaceholder');
const eq = document.getElementById('eq');
const playerEmbed = document.getElementById('playerEmbed');
const playerNote = document.getElementById('playerNote');
const songLabel = document.getElementById('songLabel');
const ctrlNote = document.getElementById('ctrlNote');

let pos = 0;
let moving = false;

/* 칸마다 투명한 클릭 핫스팟 만들기 */
BOARD.forEach((t, i) => {
  const h = document.createElement('button');
  h.className = 'hotspot';
  h.style.left = t.x + '%';
  h.style.top = t.y + '%';
  h.setAttribute('aria-label',
    t.type === 'song' ? `${t.song} 칸으로 이동` : `${t.label} 칸으로 이동`);
  h.addEventListener('click', () => moveTo(i));
  boardInner.appendChild(h);
});

function placePiece(i) {
  piece.style.left = BOARD[i].x + '%';
  piece.style.top = BOARD[i].y + '%';
}

function arrive(i) {
  const t = BOARD[i];
  if (t.type === 'song') {
    insertTape(t);
    ctrlNote.textContent = `♪ ${t.song} 칸 도착!`;
  } else if (t.type === 'event') {
    ejectTape();
    ctrlNote.textContent = t.label;
  } else if (t.type === 'end') {
    ejectTape();
    ctrlNote.textContent = '완주!! 완벽보다 완주 🎉';
  } else {
    ejectTape();
    ctrlNote.textContent = 'START에서 출발!';
  }
}

function step(dir) {
  const next = pos + dir;
  if (next < 0 || next >= BOARD.length || moving) return;
  pos = next;
  placePiece(pos);
  arrive(pos);
}

/* 한 칸씩 통통 튀며 이동 (주사위/핫스팟 클릭용) */
function moveTo(target) {
  if (moving || target === pos) return;
  moving = true;
  const dir = target > pos ? 1 : -1;
  const timer = setInterval(() => {
    pos += dir;
    placePiece(pos);
    if (pos === target) {
      clearInterval(timer);
      moving = false;
      arrive(pos);
    }
  }, 300);
}

/* ---------- 테이프 넣기/빼기 ---------- */
function insertTape(t) {
  tapeImg.classList.remove('in');
  setTimeout(() => {
    tapeImg.src = `assets/images/tape${t.tape}.png`;
    tapeImg.classList.add('in');
    tapePlaceholder.style.display = 'none';
    eq.classList.add('playing');
    songLabel.innerHTML = `<b>${t.song}</b> — ${t.artist}`;
    if (t.youtubeId) {
      playerEmbed.src = `https://www.youtube.com/embed/${t.youtubeId}`;
      playerEmbed.classList.add('show');
      playerNote.style.display = 'none';
    } else {
      playerEmbed.classList.remove('show');
      playerEmbed.src = '';
      playerNote.style.display = 'block';
      playerNote.innerHTML = `철컥! <b>${t.song}</b> 삽입 완료.<br>(youtubeId 넣으면 여기서 재생돼요)`;
    }
  }, 250);
}
function ejectTape() {
  tapeImg.classList.remove('in');
  eq.classList.remove('playing');
  tapePlaceholder.style.display = 'block';
  songLabel.textContent = '';
  playerEmbed.classList.remove('show');
  playerEmbed.src = '';
  playerNote.style.display = 'block';
  playerNote.textContent = '말을 움직여 노래 칸으로 가보세요!';
}

/* ---------- 컨트롤러 ---------- */
const diceFace = document.getElementById('diceFace');
const DICE_FACES = ['⚀','⚁','⚂','⚃','⚄','⚅'];

document.getElementById('btnFwd').addEventListener('click', () => step(1));
document.getElementById('btnBack').addEventListener('click', () => step(-1));
document.getElementById('btnReset').addEventListener('click', () => {
  if (moving) return;
  pos = 0;
  placePiece(0);
  arrive(0);
  diceFace.textContent = '';
  ctrlNote.textContent = 'START로 돌아왔어요!';
});
document.getElementById('btnDice').addEventListener('click', () => {
  if (moving) return;
  const roll = Math.floor(Math.random() * 3) + 1; // 1~3
  const btn = document.getElementById('btnDice');
  btn.disabled = true;
  diceFace.classList.remove('landed');
  diceFace.classList.add('rolling');
  diceFace.textContent = DICE_FACES[0];

  let tick = 0;
  const interval = setInterval(() => {
    diceFace.textContent = DICE_FACES[tick % DICE_FACES.length];
    tick++;
  }, 70);

  setTimeout(() => {
    clearInterval(interval);
    diceFace.classList.remove('rolling');
    diceFace.textContent = DICE_FACES[roll - 1];
    diceFace.classList.add('landed');
    ctrlNote.textContent = `🎲 ${roll} 나옴!`;
    moveTo(Math.min(pos + roll, BOARD.length - 1));
    btn.disabled = false;
  }, 850);
});
document.addEventListener('keydown', e => {
  if (e.target.closest('input, textarea')) return;
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
});
window.addEventListener('load', () => placePiece(pos));

/* ==========================================================
   방명록
   - Claude 미리보기: window.storage(공유 저장)
   - 로컬/실배포: localStorage 로 자동 전환
   ========================================================== */
const GB_KEY = 'guestbook-entries';
let gbMemory = [];

const store = {
  async load() {
    if (window.storage) {
      try {
        const res = await window.storage.get(GB_KEY, true);
        if (res && res.value) return JSON.parse(res.value);
      } catch (e) { /* 아직 데이터 없음 */ }
      return [];
    }
    try { return JSON.parse(localStorage.getItem(GB_KEY)) || []; }
    catch (e) { return []; }
  },
  async save(data) {
    if (window.storage) {
      try { await window.storage.set(GB_KEY, JSON.stringify(data), true); return; }
      catch (e) { console.warn('저장 실패', e); return; }
    }
    try { localStorage.setItem(GB_KEY, JSON.stringify(data)); }
    catch (e) { console.warn('저장 실패', e); }
  }
};

function sanitize(s) {
  return s.replace(/[<>&"]/g, c => ({ '<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;' }[c]));
}
function renderGuestbook() {
  const box = document.getElementById('gbEntries');
  if (!gbMemory.length) {
    box.innerHTML = '<p class="gb-empty">아직 낙서가 없어요. 첫 번째 낙서의 주인공이 되어보세요!</p>';
    return;
  }
  box.innerHTML = gbMemory.slice().reverse().map(e =>
    `<div class="gb-entry"><div class="who">${e.name}</div><div class="msg">${e.msg}</div></div>`
  ).join('');
}

document.getElementById('gbSubmit').addEventListener('click', async () => {
  const name = sanitize(document.getElementById('gbName').value.trim()) || '익명의 관객';
  const msg = sanitize(document.getElementById('gbMsg').value.trim());
  if (!msg) { document.getElementById('gbMsg').placeholder = '한 글자라도 적어주세요..!'; return; }
  gbMemory.push({ name, msg, t: Date.now() });
  if (gbMemory.length > 200) gbMemory = gbMemory.slice(-200);
  await store.save(gbMemory);
  document.getElementById('gbMsg').value = '';
  renderGuestbook();
});
store.load().then(d => { gbMemory = d; renderGuestbook(); });

/* ==========================================================
   행운의 피크 (새로고침마다 위치 랜덤)
   ========================================================== */
const LUCKY_SPOTS = [
  { bottom:'26px', left:'24px' },
  { bottom:'26px', right:'24px' },
  { top:'80px', right:'22px' },
  { bottom:'40%', left:'20px' },
];
const LUCKY_MSGS = [
  '넘어져도 괜찮다!',
  '피드백은 부드럽게, 칭찬은 시끄럽게',
  '실수는 숨기지 말고 웃어 넘기기~',
  '완벽보다 완주',
  '모르면 물어보기~!',
  '재미있으면 됐다.',
  '웃으면 복이온다.',
  '망해도 씩씩하게 살기',
  '하다보면 실력이 쌓인다!',
];
const pick = document.getElementById('lucky-pick');
Object.assign(pick.style, LUCKY_SPOTS[Math.floor(Math.random() * LUCKY_SPOTS.length)]);
function foundLucky() {
  document.getElementById('luckyMsg').textContent =
    LUCKY_MSGS[Math.floor(Math.random() * LUCKY_MSGS.length)];
  document.getElementById('lucky-modal').classList.add('show');
}
pick.addEventListener('click', foundLucky);
pick.addEventListener('keydown', e => { if (e.key === 'Enter') foundLucky(); });
/* ---------- 픽 카운터 ---------- */
let pickCount = parseInt(localStorage.getItem('pickCount') || '0');
const pickCountEl = document.getElementById('pickCount');
pickCountEl.textContent = pickCount;

document.getElementById('luckyClose').addEventListener('click', () => {
  document.getElementById('lucky-modal').classList.remove('show');
  pickCount++;
  localStorage.setItem('pickCount', pickCount);
  pickCountEl.textContent = pickCount;
  pickCountEl.classList.remove('bump');
  void pickCountEl.offsetWidth; // reflow to restart animation
  pickCountEl.classList.add('bump');
});

/* ==========================================================
   띵! 클릭 이펙트
   ========================================================== */
const DINGS = ['띵!', '땅!', '뚱!', '!?'];
document.addEventListener('click', e => {
  if (e.target.closest('input, textarea, iframe')) return;
  const d = document.createElement('span');
  d.className = 'ding';
  d.textContent = DINGS[Math.floor(Math.random() * DINGS.length)];
  d.style.left = e.clientX + 'px';
  d.style.top = e.clientY + 'px';
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 750);
});
