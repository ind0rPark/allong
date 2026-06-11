# 얼렁뚱땅! 웹사이트 🎸

포스터 블루 × 종이만화 콘셉트의 밴드 공연 팸플릿 웹사이트.

## 실행하기

1. VS Code에서 이 폴더 열기
2. 확장 프로그램 **Live Server** 설치
3. `index.html` 우클릭 → **Open with Live Server**

## 내 파일 끼우는 법

### 로고
- PNG를 `assets/images/logo.png` 로 넣기 → 자동 적용

### 멤버 카드 (PDF 카드 디자인 그대로!)
PDF에 있던 카드 디자인을 통짜 PNG로 추출해서 `assets/images/` 에 넣기.
카드 전체에 꽉 차게 표시되고, 호버하면 이미지만 부드럽게 바뀜.

| 파일명 | 내용 |
|---|---|
| guitar_cool.png / guitar_silly.png | 기타: Picking Harmonics 카드 / 헛 피킹질 카드 |
| vocal_cool.png / vocal_silly.png | 보컬: 멀티의 대가 카드 / 가끔의 버퍼링 카드 |
| bass_cool.png / bass_silly.png | 베이스: BACKBONE 카드 / Small JohnjaeGam 카드 |
| drum_cool.png / drum_silly.png | 드럼: FILL-IN 카드 / 엇 틀렸어 카드 |

카드 비율은 2:3. PDF 카드 비율과 거의 같아서 그대로 넣으면 됨.
클릭하면 카드 아래에 만화 정보창이 열려요 — 내용 수정은
`js/script.js` 맨 위 `MEMBERS` 배열에서!

### 보드게임 판
- 지금 들어있는 `assets/images/board.png` 는 임시(저해상도)!
  피그마에서 **같은 비율로 크게**(가로 1000px 이상 추천) 다시 내보내서
  같은 이름으로 덮어쓰면 선명해져요.
- 말(🏃)이 칸에 안 맞으면 `js/script.js`의 `BOARD` 배열에서
  각 칸의 `x, y` 퍼센트 값만 조절하면 됨.
- 말 이모지를 바꾸고 싶으면 index.html에서 🏃 부분 수정.

### 폰트
1. 폰트 파일(.otf/.ttf)을 `assets/fonts/` 에 넣기
2. `css/style.css` 맨 위 `@font-face` 주석 풀고 파일명 수정
3. `--font-display`, `--font-hand`, `--font-body` 변수에서 교체

⚠️ 웹사이트에 올리는 건 '배포'라서 무료 폰트여도
웹폰트 허용 여부 확인! (눈누 noonnu.cc 에서 라이선스 확인 가능)

### 셋리스트 음원 연결
`js/script.js`의 `BOARD` 배열에서 각 노래의 `youtubeId`에
유튜브 주소의 `v=` 뒷부분만 넣으면 끝.
예: `youtube.com/watch?v=abc123` → `youtubeId:'abc123'`

## 방명록 참고
- 로컬에서는 localStorage 저장이라 **내 브라우저에만** 보여요.
- 모두가 공유하는 진짜 방명록은 배포할 때 무료 백엔드
  (Firebase/Supabase)를 붙이면 됨.

## 폴더 구조
```
eolleong/
├── index.html        ← 페이지 구조
├── css/style.css     ← 디자인 (폰트/색은 맨 위에서)
├── js/script.js      ← MEMBERS(카드 정보), BOARD(보드 좌표/음원) 수정은 여기
└── assets/
    ├── images/       ← logo.png, board.png, 멤버 카드 PNG
    └── fonts/        ← 폰트 파일
```
