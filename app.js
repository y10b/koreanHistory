/**
 * 한국사 능력검정시험 카운트다운 타이머
 * @author Mr.Kim
 * @version 2.0.0
 */

class CountdownTimer {
    constructor(targetDate, displayElement) {
        this.targetDate = new Date(targetDate);
        this.displayElement = displayElement;
        this.interval = null;
        this.isRunning = false;

        this.init();
    }

    /**
     * 타이머 초기화
     */
    init() {
        if (!this.displayElement) {
            console.error('Display element not found');
            return;
        }

        this.updateDisplay();
        this.start();
    }

    /**
     * 남은 시간 계산
     * @returns {Object} 남은 시간 객체
     */
    calculateTimeRemaining() {
        const now = new Date();
        const difference = this.targetDate - now;

        if (difference <= 0) {
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isExpired: true
            };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
            isExpired: false
        };
    }

    /**
     * 화면에 시간 표시 업데이트
     */
    updateDisplay() {
        const timeRemaining = this.calculateTimeRemaining();

        if (timeRemaining.isExpired) {
            this.displayElement.textContent = '시험일이 지났습니다';
            this.displayElement.setAttribute('aria-label', '시험일이 지났습니다');
            this.stop();
            return;
        }

        const timeString = `${timeRemaining.days}일 ${timeRemaining.hours}시간 ${timeRemaining.minutes}분 ${timeRemaining.seconds}초`;
        this.displayElement.textContent = timeString;
        this.displayElement.setAttribute('aria-label', `시험까지 남은 시간: ${timeString}`);
    }

    /**
     * 타이머 시작
     */
    start() {
        if (this.isRunning) return;

        this.isRunning = true;
        this.interval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    /**
     * 타이머 정지
     */
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
            this.isRunning = false;
        }
    }

    /**
     * 타이머 재시작
     */
    restart() {
        this.stop();
        this.start();
    }
}

/**
 * 페이지 로더 관리
 */
class PageLoader {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.init();
    }

    init() {
        if (!this.preloader) return;

        // 페이지 로드 완료 시 로더 숨기기
        window.addEventListener('load', () => {
            this.hide();
        });

        // 최대 5초 후 강제로 로더 숨기기 (안전장치)
        setTimeout(() => {
            this.hide();
        }, 5000);
    }

    hide() {
        if (this.preloader) {
            this.preloader.classList.add('hidden');
            // 접근성을 위해 완전히 제거
            setTimeout(() => {
                this.preloader.style.display = 'none';
            }, 500);
        }
    }
}

/**
 * 유틸리티 함수들
 */
const Utils = {
    /**
     * 현재 연도 업데이트
     */
    updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    },

    /**
     * 스크롤 이벤트 최적화 (throttling)
     */
    throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * 접근성 개선: 키보드 네비게이션
     */
    initKeyboardNavigation() {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }
};

/**
 * 메인 애플리케이션 클래스
 */
class KoreanHistoryApp {
    constructor() {
        this.countdownTimer = null;
        this.pageLoader = null;
        this.init();
    }

    init() {
        // DOM이 준비되면 초기화
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        try {
            // 페이지 로더 초기화
            this.pageLoader = new PageLoader();

            // 카운트다운 타이머 초기화
            const remainTimeElement = document.getElementById('remain-time');
            if (remainTimeElement) {
                this.countdownTimer = new CountdownTimer('2022-10-22', remainTimeElement);
            }

            // 유틸리티 함수들 초기화
            Utils.updateCurrentYear();
            Utils.initKeyboardNavigation();

            // 성능 모니터링 (개발 환경에서만)
            if (process.env.NODE_ENV === 'development') {
                this.initPerformanceMonitoring();
            }

        } catch (error) {
            console.error('애플리케이션 초기화 중 오류 발생:', error);
        }
    }

    /**
     * 성능 모니터링 (개발 환경용)
     */
    initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`페이지 로드 시간: ${loadTime}ms`);
            });
        }
    }
}

// 애플리케이션 시작
const app = new KoreanHistoryApp();

// 전역 객체에 노출 (디버깅용)
if (typeof window !== 'undefined') {
    window.KoreanHistoryApp = KoreanHistoryApp;
    window.CountdownTimer = CountdownTimer;
}
