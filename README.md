# 한국사 스토리텔링 학습 플랫폼

한국사 능력검정시험을 위한 스토리텔링 기반 학습 플랫폼입니다. 역사를 쉽고 재미있게 배울 수 있도록 설계되었습니다.

## 🚀 주요 기능

- **역사 흐름 학습**: 시대별로 구성된 한국사 학습 콘텐츠
- **인터랙티브 퀴즈**: 키워드별 문제풀이 시스템
- **실시간 카운트다운**: 시험일까지 남은 시간 표시
- **반응형 디자인**: 모든 디바이스에서 최적화된 사용자 경험

## 🛠️ 기술 스택

### Frontend

- **HTML5**: 시맨틱 마크업과 접근성 고려
- **CSS3**: 모던 CSS와 반응형 디자인
- **JavaScript (ES6+)**: 모듈화된 클래스 기반 구조
- **jQuery**: DOM 조작 및 이벤트 처리

### 라이브러리

- **Bootstrap**: 반응형 UI 프레임워크
- **FontAwesome**: 아이콘 라이브러리
- **Google Fonts**: 웹 폰트 최적화

## 📁 프로젝트 구조

```
한능검 스토리텔링 프로젝트/
├── index.html              # 메인 페이지
├── app.js                  # 메인 애플리케이션 로직
├── assets/                 # 정적 자원
│   ├── css/               # 스타일시트
│   ├── js/                # JavaScript 라이브러리
│   ├── images/            # 이미지 파일
│   └── fonts/             # 폰트 파일
├── src/
│   ├── history/           # 역사 학습 콘텐츠
│   └── keyword/           # 키워드 퀴즈 시스템
└── README.md              # 프로젝트 문서
```

## ✨ 주요 개선사항

### 1. 보안 강화

- **HTTPS 강제**: 모든 외부 리소스를 HTTPS로 변경
- **CSP 헤더**: Content Security Policy 적용
- **SRI (Subresource Integrity)**: 외부 스크립트 무결성 검증

### 2. 성능 최적화

- **Critical CSS**: 첫 화면 렌더링 최적화
- **Preconnect**: 외부 도메인 사전 연결
- **이미지 최적화**: 적절한 크기와 포맷 사용
- **코드 분할**: 모듈화된 JavaScript 구조

### 3. 접근성 개선

- **ARIA 속성**: 스크린 리더 지원
- **키보드 네비게이션**: 마우스 없이도 사용 가능
- **시맨틱 마크업**: 의미있는 HTML 구조
- **색상 대비**: WCAG 가이드라인 준수

### 4. SEO 최적화

- **메타 태그**: 완전한 메타 정보 제공
- **구조화된 데이터**: Schema.org 마크업
- **Open Graph**: 소셜 미디어 공유 최적화
- **사이트맵**: 검색 엔진 크롤링 지원

### 5. 코드 품질

- **ES6+ 문법**: 모던 JavaScript 사용
- **클래스 기반 구조**: 객체지향적 설계
- **에러 핸들링**: 견고한 예외 처리
- **주석 및 문서화**: 유지보수성 향상

## 🎯 핵심 클래스 구조

### CountdownTimer

```javascript
class CountdownTimer {
  constructor(targetDate, displayElement)
  calculateTimeRemaining()
  updateDisplay()
  start() / stop() / restart()
}
```

### QuizApp

```javascript
class QuizApp {
  constructor()
  bindEvents()
  handleNext() / handlePrev() / handleStart()
  createQuestionElement()
  displayScore()
}
```

### KoreanHistoryApp

```javascript
class KoreanHistoryApp {
  constructor()
  setup()
  initPerformanceMonitoring()
}
```

## 📱 반응형 디자인

- **모바일 우선**: 모바일 디바이스 최적화
- **Flexbox/Grid**: 현대적인 레이아웃 시스템
- **미디어 쿼리**: 다양한 화면 크기 대응
- **터치 친화적**: 터치 인터페이스 최적화

## 🔧 개발 환경 설정

1. **저장소 클론**

   ```bash
   git clone [repository-url]
   cd 한능검-스토리텔링-프로젝트
   ```

2. **로컬 서버 실행**

   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve .

   # PHP
   php -S localhost:8000
   ```

3. **브라우저에서 확인**
   ```
   http://localhost:8000
   ```

## 📊 성능 지표

- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🌐 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 👨‍💻 개발자

**Mr.Kim** - 웹개발 공부 중

- 이메일: victory.jun01@gmail.com
- 포트폴리오: [viewfitweb1.netlify.app](whimsical-douhua-01dfc4.netlify.app)

## 🔄 업데이트 로그

### v2.0.0 (2024)

- ✅ 포트폴리오용 코드 리팩토링
- ✅ 보안 및 성능 최적화
- ✅ 접근성 개선
- ✅ SEO 최적화
- ✅ 모던 JavaScript 적용

### v1.0.0 (2022)

- ✅ 초기 버전 릴리즈
- ✅ 기본 학습 콘텐츠 구현
- ✅ 퀴즈 시스템 구현

---

**"역사를 잊은 민족에게 미래는 없다"** - 이 프로젝트는 한국사를 쉽고 재미있게 배울 수 있는 플랫폼을 목표로 합니다.
