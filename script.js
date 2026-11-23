(() => {
  'use strict';

  /* =========================================================
   * Constants, Giant Curved Stadiums, Styles, Skills & Presets
   * ========================================================= */
  const STORAGE_KEY = 'neon_derby_state_v4';

  const WORLD_W = 2400;
  const WORLD_H = 1480;

  const NEON_PALETTE = [
    '#00f5ff', // Cyber Cyan
    '#ff2a85', // Hot Magenta
    '#39ff14', // Neon Lime
    '#ffe600', // Cyber Yellow
    '#b026ff', // Electric Purple
    '#ff6b00', // Laser Orange
    '#2979ff', // Plasma Blue
    '#ff3864', // Neon Coral
    '#00ffa3', // Mint Volt
    '#c6ff00', // Acid Chartreuse
    '#ff70d9', // Bubblegum Neon
    '#4deeea', // Aqua Pulse
  ];

  const STADIUM_KEYS = ['TURF', 'DIRT', 'ICE', 'VOLCANO'];

  const STADIUMS = {
    TURF: {
      key: 'TURF',
      name: '🌿 네온 잔디 오벌',
      shortShape: '클래식 G1 오벌',
      badge: 'G1 CYBER OVAL // DRAW',
      bgOuter: ['#050816', '#0a1029'],
      infield: ['#071e1a', '#0a2b24'],
      trackFill: '#0e3c30',
      trackAlt: 'rgba(57, 255, 20, 0.085)',
      railAccent: '#00f5ff',
      railInner: '#39ff14',
      dustColor: '#8aff9e',
      ambient: 'NONE',
      minimapBg: 'linear-gradient(90deg, rgba(16, 46, 36, 0.9), rgba(14, 70, 52, 0.9))',
      minimapBorder: 'rgba(57, 255, 20, 0.32)',
      cornerLabels: ['1·2코너', '백스트레치', '3·4코너'],
    },
    DIRT: {
      key: 'DIRT',
      name: '🏜️ 사막 굴절 서킷',
      shortShape: 'S자 굴절 캐니언',
      badge: 'G1 CANYON CHICANE // DRAW',
      bgOuter: ['#16070d', '#2b1016'],
      infield: ['#28130d', '#3a1b12'],
      trackFill: '#542f1c',
      trackAlt: 'rgba(255, 178, 88, 0.115)',
      railAccent: '#ff9f43',
      railInner: '#ffe600',
      dustColor: '#ffd28a',
      ambient: 'SAND',
      minimapBg: 'linear-gradient(90deg, rgba(78, 42, 22, 0.92), rgba(112, 58, 28, 0.92))',
      minimapBorder: 'rgba(255, 159, 67, 0.45)',
      cornerLabels: ['캐니언 1코너', 'S자 굴절 구간', '사막 4코너'],
    },
    ICE: {
      key: 'ICE',
      name: '❄️ 빙하 굴절 서킷',
      shortShape: '비대칭 빙하 헤어핀',
      badge: 'G1 GLACIER CIRCUIT // DRAW',
      bgOuter: ['#040b1d', '#081b36'],
      infield: ['#0a2138', '#103454'],
      trackFill: '#15446b',
      trackAlt: 'rgba(180, 244, 255, 0.12)',
      railAccent: '#7ce8ff',
      railInner: '#00f5ff',
      dustColor: '#c9f6ff',
      ambient: 'SNOW',
      minimapBg: 'linear-gradient(90deg, rgba(18, 56, 86, 0.92), rgba(32, 92, 134, 0.92))',
      minimapBorder: 'rgba(124, 232, 255, 0.48)',
      cornerLabels: ['빙벽 드래프트', '빙하 굴절 헤어핀', '오로라 4코너'],
    },
    VOLCANO: {
      key: 'VOLCANO',
      name: '🌋 볼케이노 링',
      shortShape: '더블 굴절 용암 링',
      badge: 'G1 VOLCANO RING // DRAW',
      bgOuter: ['#130408', '#29090f'],
      infield: ['#260a0c', '#3d100c'],
      trackFill: '#2f191f',
      trackAlt: 'rgba(255, 92, 34, 0.125)',
      railAccent: '#ff521c',
      railInner: '#ffe600',
      dustColor: '#ff7b3b',
      ambient: 'EMBERS',
      minimapBg: 'linear-gradient(90deg, rgba(58, 18, 20, 0.94), rgba(108, 28, 18, 0.94))',
      minimapBorder: 'rgba(255, 82, 28, 0.5)',
      cornerLabels: ['용암 1코너', '화구 굴절 코스', '지옥의 좌굴절'],
    },
  };

  const STYLE_ORDER = ['AUTO', 'FRONT', 'PACE', 'LATE', 'END'];

  const STYLE_META = {
    AUTO:  { label: '랜덤', short: '랜덤', color: '#8b9bc4' },
    FRONT: { label: '도주', short: '도주', color: '#ff2a85' },
    PACE:  { label: '선행', short: '선행', color: '#00f5ff' },
    LATE:  { label: '선입', short: '선입', color: '#39ff14' },
    END:   { label: '추입', short: '추입', color: '#b026ff' },
  };

  const SKILLS_BY_STYLE = {
    FRONT: [
      '⚡ 선두 프라이드!',
      '🚀 터보 엔진 전개!',
      '💨 도망자의 각오',
      '✨ 코너링 네온 섬광',
      '🔥 대도주 기어 업!',
    ],
    PACE: [
      '⚡ 호선의 프로페서!',
      '🔥 완벽한 코너 가속!',
      '🌟 흔들리지 않는 페이스',
      '💥 직선 돌파!',
      '✨ 황금의 인코스 공략',
    ],
    LATE: [
      '🔥 승리의 고동!',
      '⚡ 외곽 추월 스퍼트!',
      '💨 맹렬한 추격!',
      '✨ 기적의 역전극',
      '🚀 파이널 기어 체인지!',
    ],
    END: [
      '🚀 직선 일기! 초폭주!',
      '🔥 고유기: 네온 오버드라이브!',
      '⚡ 전광석화 대역전!',
      '🌟 끝에서 날아오르는 혜성!',
      '💥 한계 돌파 라스트 로켓!',
    ],
  };

  const PRESETS = [
    {
      title: '🏇 G1 레전드 더비 (우마무스메 느낌)',
      items: [
        { label: '스페셜 위크', style: 'LATE', weight: 1 },
        { label: '사일런스 스즈카', style: 'FRONT', weight: 1 },
        { label: '토카이 테이오', style: 'PACE', weight: 1 },
        { label: '골드 쉽', style: 'END', weight: 1 },
        { label: '오구리 캡', style: 'LATE', weight: 1 },
        { label: '다이와 스칼렛', style: 'FRONT', weight: 1 },
        { label: '보드카', style: 'LATE', weight: 1 },
        { label: '메지로 맥퀸', style: 'PACE', weight: 1 },
      ],
    },
    {
      title: '🍜 점심 메뉴 그랑프리',
      items: ['김치찌개', '돈까스', '라멘', '제육볶음', '치킨', '파스타', '국밥', '햄버거'],
    },
    {
      title: '🎯 파티 벌칙 / 미션 더비',
      items: ['커피 쏘기', '노래 한 소절', '1회 면제권', '간식 사오기', '칭찬 3가지', '춤추기', '설거지 당첨', '한 번 더!'],
    },
    {
      title: '💣 복불복 꽝 포함 (비중 차등)',
      items: [
        { label: '🎉 대박 당첨!', style: 'END', weight: 1 },
        { label: '💀 꽝 A', style: 'FRONT', weight: 2 },
        { label: '🎁 보너스', style: 'LATE', weight: 1 },
        { label: '💀 꽝 B', style: 'PACE', weight: 2 },
        { label: '🔥 한 번 더', style: 'PACE', weight: 1 },
        { label: '💀 꽝 C', style: 'FRONT', weight: 2 },
      ],
    },
    {
      title: '👥 팀원 발표 순서 (A~F)',
      items: ['팀원 A', '팀원 B', '팀원 C', '팀원 D', '팀원 E', '팀원 F'],
    },
  ];

  /* =========================================================
   * Giant World-Scale Circular & Curved Stadium Engine
   * ========================================================= */
  class CircuitTrack {
    constructor() {
      this.samples = [];
      this.cumLen = [];
      this.totalLen = 1;
      this.outerPts = [];
      this.innerPts = [];
      this.cx = WORLD_W / 2;
      this.cy = WORLD_H / 2;
      this.rx = 940;
      this.ry = 510;
      this.trackW = 166;
      this.halfW = 83;
      this.stadiumKey = 'DIRT';
    }

    build(stadiumKey) {
      this.stadiumKey = stadiumKey;
      this.cx = WORLD_W * 0.5;
      this.cy = WORLD_H * 0.5;
      this.rx = 930;
      this.ry = 505;
      this.trackW = 168;
      this.halfW = this.trackW / 2;

      const N = 480;
      const raw = [];
      for (let i = 0; i < N; i++) {
        raw.push(this._evalRaw(stadiumKey, i / N));
      }

      this.cumLen = new Array(N + 1);
      this.cumLen[0] = 0;
      for (let i = 0; i < N; i++) {
        const a = raw[i];
        const b = raw[(i + 1) % N];
        this.cumLen[i + 1] = this.cumLen[i] + Math.hypot(b.x - a.x, b.y - a.y);
      }
      this.totalLen = Math.max(1, this.cumLen[N]);

      this.samples = new Array(N);
      this.outerPts = new Array(N);
      this.innerPts = new Array(N);

      for (let i = 0; i < N; i++) {
        const prev = raw[(i - 1 + N) % N];
        const next = raw[(i + 1) % N];
        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const len = Math.hypot(dx, dy) || 1;
        const tx = dx / len;
        const ty = dy / len;
        const nx = -ty;
        const ny = tx;

        this.samples[i] = { x: raw[i].x, y: raw[i].y, tx, ty, nx, ny };
        this.outerPts[i] = { x: raw[i].x + nx * this.halfW, y: raw[i].y + ny * this.halfW };
        this.innerPts[i] = { x: raw[i].x - nx * this.halfW, y: raw[i].y - ny * this.halfW };
      }
    }

    _evalRaw(key, u) {
      const theta = Math.PI / 2 - u * Math.PI * 2;
      const c = Math.cos(theta);
      const s = Math.sin(theta);
      const sgnC = c < 0 ? -1 : 1;
      const sgnS = s < 0 ? -1 : 1;
      const absC = Math.abs(c);
      const absS = Math.abs(s);

      if (key === 'DIRT') {
        const x0 = sgnC * Math.pow(absC, 0.78) * this.rx;
        const y0 = sgnS * Math.pow(absS, 0.84) * this.ry;
        const chicane = Math.exp(-Math.pow((u - 0.5) / 0.115, 2));
        const sWave = Math.sin((u - 0.5) * Math.PI * 8) * Math.exp(-Math.pow((u - 0.5) / 0.13, 2));
        return {
          x: this.cx + x0,
          y: this.cy + y0 + this.ry * (0.44 * chicane + 0.11 * sWave),
        };
      }

      if (key === 'ICE') {
        const x0 = sgnC * Math.pow(absC, 0.82) * this.rx;
        const y0 = sgnS * Math.pow(absS, 0.86) * this.ry;
        const dip = Math.exp(-Math.pow((u - 0.56) / 0.11, 2));
        const kick = Math.exp(-Math.pow((u - 0.32) / 0.105, 2));
        return {
          x: this.cx + x0 + this.rx * 0.08 * kick,
          y: this.cy + y0 + this.ry * (0.48 * dip - 0.12 * kick),
        };
      }

      if (key === 'VOLCANO') {
        const x0 = sgnC * Math.pow(absC, 0.84) * this.rx;
        const y0 = sgnS * Math.pow(absS, 0.86) * this.ry;
        const bendTop = Math.exp(-Math.pow((u - 0.44) / 0.105, 2));
        const bendLeft = Math.exp(-Math.pow((u - 0.74) / 0.095, 2));
        const kickRight = Math.exp(-Math.pow((u - 0.21) / 0.09, 2));
        return {
          x: this.cx + x0 + this.rx * (0.27 * bendLeft + 0.09 * kickRight),
          y: this.cy + y0 + this.ry * (0.42 * bendTop),
        };
      }

      // TURF: Classic Sweeping G1 Oval
      return {
        x: this.cx + sgnC * Math.pow(absC, 0.72) * this.rx,
        y: this.cy + sgnS * Math.pow(absS, 0.78) * this.ry,
      };
    }

    sample(lapU, laneNorm = 0) {
      const N = this.samples.length;
      if (N === 0) return { x: this.cx, y: this.cy, cx: this.cx, cy: this.cy, tx: 1, ty: 0, nx: 0, ny: 1 };

      const uWrap = ((lapU % 1) + 1) % 1;
      const targetS = uWrap * this.totalLen;

      let lo = 0;
      let hi = N;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (this.cumLen[mid] < targetS) lo = mid + 1;
        else hi = mid;
      }
      const idx1 = Math.max(1, Math.min(N, lo));
      const idx0 = idx1 - 1;
      const s0 = this.cumLen[idx0];
      const s1 = this.cumLen[idx1];
      const t = s1 > s0 ? (targetS - s0) / (s1 - s0) : 0;

      const p0 = this.samples[idx0 % N];
      const p1 = this.samples[idx1 % N];

      const x = p0.x + (p1.x - p0.x) * t;
      const y = p0.y + (p1.y - p0.y) * t;
      const txRaw = p0.tx + (p1.tx - p0.tx) * t;
      const tyRaw = p0.ty + (p1.ty - p0.ty) * t;
      const tLen = Math.hypot(txRaw, tyRaw) || 1;
      const tx = txRaw / tLen;
      const ty = tyRaw / tLen;
      const nx = -ty;
      const ny = tx;

      const offsetPx = laneNorm * (this.halfW - 14);
      return {
        x: x + nx * offsetPx,
        y: y + ny * offsetPx,
        cx: x,
        cy: y,
        tx,
        ty,
        nx,
        ny,
      };
    }
  }

  /* =========================================================
   * Web Audio API Derby, Clash & Encounter Synthesizer
   * ========================================================= */
  class DerbySound {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.lastHoofTime = 0;
      this.lastClashTime = 0;
    }

    ensure() {
      if (!this.enabled) return null;
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    playCountdownBeep(high = false) {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(high ? 880 : 520, t);
      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + (high ? 0.28 : 0.14));
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + (high ? 0.3 : 0.16));
    }

    playGateOpen() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      [660, 990, 1320].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.96, t + 0.35);
        gain.gain.setValueAtTime(idx === 0 ? 0.08 : 0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
      });
    }

    playHoofPulse(spurt = false) {
      const ctx = this.ensure();
      if (!ctx) return;
      const nowMs = performance.now();
      const interval = spurt ? 110 : 150;
      if (nowMs - this.lastHoofTime < interval) return;
      this.lastHoofTime = nowMs;

      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(spurt ? 148 : 115, t);
      osc.frequency.exponentialRampToValueAtTime(48, t + 0.055);
      gain.gain.setValueAtTime(spurt ? 0.068 : 0.045, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.065);
    }

    playClash(isDuel = false) {
      const ctx = this.ensure();
      if (!ctx) return;
      const nowMs = performance.now();
      if (nowMs - this.lastClashTime < 140) return;
      this.lastClashTime = nowMs;

      const t = ctx.currentTime;
      // Percussive shoulder-bump thud + metallic spark ping
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = 'triangle';
      thud.frequency.setValueAtTime(isDuel ? 240 : 185, t);
      thud.frequency.exponentialRampToValueAtTime(55, t + 0.09);
      thudGain.gain.setValueAtTime(0.14, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.start(t);
      thud.stop(t + 0.11);

      if (isDuel) {
        const spark = ctx.createOscillator();
        const sGain = ctx.createGain();
        spark.type = 'sine';
        spark.frequency.setValueAtTime(1180, t);
        spark.frequency.exponentialRampToValueAtTime(1760, t + 0.08);
        sGain.gain.setValueAtTime(0.06, t);
        sGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
        spark.connect(sGain);
        sGain.connect(ctx.destination);
        spark.start(t);
        spark.stop(t + 0.1);
      }
    }

    playSkillProc() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      [783.99, 1046.5, 1318.5, 1567.98].forEach((f, i) => {
        const start = t + i * 0.045;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start);
        gain.gain.setValueAtTime(0.085, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.2);
      });
    }

    playWarningAlarm() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      for (let i = 0; i < 2; i++) {
        const start = t + i * 0.15;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(740, start);
        osc.frequency.linearRampToValueAtTime(480, start + 0.12);
        gain.gain.setValueAtTime(0.11, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.13);
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1900, start);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.14);
      }
    }

    playSecurityWhistle() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      // Sharp referee / security guard whistle trill (삐이익-!)
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2650, t);
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(34, t);
      lfoGain.gain.setValueAtTime(140, t);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.11, t + 0.03);
      gain.gain.setValueAtTime(0.11, t + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.36);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      lfo.start(t);
      osc.stop(t + 0.38);
      lfo.stop(t + 0.38);
    }

    playDebuffHit() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(88, t + 0.18);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.21);
    }

    playJump() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(340, t);
      osc.frequency.exponentialRampToValueAtTime(760, t + 0.11);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.13);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.14);
    }

    playBoostPad() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, t);
      osc.frequency.exponentialRampToValueAtTime(1280, t + 0.18);
      gain.gain.setValueAtTime(0.11, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.21);
    }

    playLastSpurtAlarm() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(980, t + 0.34);
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2200, t);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.4);
    }

    playPhotoShutter() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.22, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      noise.connect(gain);
      gain.connect(ctx.destination);
      noise.start(t);
    }

    playG1Fanfare() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
      const melody = [
        { f: 523.25, d: 0.12, at: 0.0 },
        { f: 659.25, d: 0.12, at: 0.11 },
        { f: 783.99, d: 0.12, at: 0.22 },
        { f: 1046.5, d: 0.22, at: 0.34 },
        { f: 880.0,  d: 0.12, at: 0.54 },
        { f: 1046.5, d: 0.56, at: 0.66 },
      ];
      melody.forEach(({ f, d, at }) => {
        const start = t + at;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'triangle';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(f, start);
        osc2.frequency.setValueAtTime(f * 1.002, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + d);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2600, start);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(start);
        osc2.start(start);
        osc1.stop(start + d + 0.03);
        osc2.stop(start + d + 0.03);
      });
    }
  }

  /* =========================================================
   * Fullscreen Celebration Confetti FX
   * ========================================================= */
  class ConfettiFX {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.w = window.innerWidth;
      this.h = window.innerHeight;
      this.canvas.width = Math.floor(this.w * dpr);
      this.canvas.height = Math.floor(this.h * dpr);
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    burst(x, y, accent = '#00f5ff') {
      const colors = [accent, '#00f5ff', '#ff2a85', '#ffe600', '#39ff14', '#ffffff'];
      for (let i = 0; i < 135; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 4 + Math.random() * 14;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (3 + Math.random() * 6),
          size: 4 + Math.random() * 6,
          color: colors[i % colors.length],
          life: 0,
          maxLife: 75 + Math.random() * 55,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.25,
        });
      }
    }

    updateAndDraw(dt60) {
      if (this.particles.length === 0) return;
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.w, this.h);
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life += dt60;
        if (p.life >= p.maxLife) {
          this.particles.splice(i, 1);
          continue;
        }
        p.vy += 0.24 * dt60;
        p.vx *= Math.pow(0.985, dt60);
        p.x += p.vx * dt60;
        p.y += p.vy * dt60;
        p.rot += p.vRot * dt60;

        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 9;
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
        ctx.restore();
      }
      if (this.particles.length === 0) ctx.clearRect(0, 0, this.w, this.h);
    }
  }

  /* =========================================================
   * Application & Race State
   * ========================================================= */
  let nextId = 1;
  const makeEntry = (label, weight = 1, colorIdx = 0, style = 'AUTO') => ({
    id: `r_${Date.now()}_${nextId++}`,
    label: String(label).trim(),
    weight: Math.max(1, Math.min(20, Number(weight) || 1)),
    color: NEON_PALETTE[colorIdx % NEON_PALETTE.length],
    style: STYLE_ORDER.includes(style) ? style : 'AUTO',
    excluded: false,
  });

  const state = {
    entries: [],
    history: [],
    soundEnabled: true,
    autoExclude: false,
    obstaclesEnabled: true,
    encountersEnabled: true,
    selectedStadium: 'DIRT',
    activeStadiumKey: 'DIRT',
    courseDistance: 1200, // 1200 | 1600 | 2400 | 3200
    speedMultiplier: 1.0, // 1.0 | 1.5 | 2.0
    cameraMode: 'FOLLOW', // Default to exciting close-up chase camera!

    // Smooth camera state in World coordinates
    camX: WORLD_W / 2,
    camY: WORLD_H / 2 + 480,
    camZoom: 1.05,

    // Live race state
    phase: 'IDLE',
    countdownTimer: 0,
    lastCountdownInt: 4,
    raceClock: 0,
    realRaceElapsed: 0,
    gateOpenAnim: 0,
    spurtTriggered: false,
    photoFlashAlpha: 0,
    photoSlowMoActive: false,
    finishHoldTimer: 0,
    lastLeaderId: null,
    lastCommentTime: 0,
    lastSectionAnnounced: -1,
    screenShake: 0,

    runners: [],
    obstacles: [],
    clashCooldowns: new Map(),
    clashSparks: [],
    encounterTriggers: [],
    nextEncounterIdx: 0,
    activeEncounterFX: [],
    floatingTexts: [],
    dustParticles: [],
    ambientParticles: [],

    skillCutinTimer: 0,
    encounterCutinTimer: 0,
  };

  /* =========================================================
   * DOM References
   * ========================================================= */
  const raceCanvas = document.getElementById('raceCanvas');
  const raceCtx = raceCanvas.getContext('2d');
  const fxCanvas = document.getElementById('fxCanvas');
  const trackViewport = document.getElementById('trackViewport');

  const stadiumHeaderBadge = document.getElementById('stadiumHeaderBadge');
  const stadiumNameChip = document.getElementById('stadiumNameChip');
  const minimapTrack = document.getElementById('minimapTrack');

  const phaseBadge = document.getElementById('phaseBadge');
  const commentaryText = document.getElementById('commentaryText');
  const distanceRemaining = document.getElementById('distanceRemaining');
  const minimapPins = document.getElementById('minimapPins');
  const leaderboardList = document.getElementById('leaderboardList');

  const skillCutin = document.getElementById('skillCutin');
  const skillCutinRunner = document.getElementById('skillCutinRunner');
  const skillCutinName = document.getElementById('skillCutinName');

  const encounterCutin = document.getElementById('encounterCutin');
  const encounterCutinTag = document.getElementById('encounterCutinTag');
  const encounterCutinTitle = document.getElementById('encounterCutinTitle');
  const encounterCutinDesc = document.getElementById('encounterCutinDesc');

  const centerBanner = document.getElementById('centerBanner');
  const centerBannerText = document.getElementById('centerBannerText');

  const startRaceBtn = document.getElementById('startRaceBtn');
  const shuffleGateBtn = document.getElementById('shuffleGateBtn');
  const stadiumGroup = document.getElementById('stadiumGroup');
  const distanceGroup = document.getElementById('distanceGroup');
  const cameraToggleBtn = document.getElementById('cameraToggleBtn');
  const speedToggleBtn = document.getElementById('speedToggleBtn');

  const obstaclesToggle = document.getElementById('obstaclesToggle');
  const encountersToggle = document.getElementById('encountersToggle');
  const eliminationToggle = document.getElementById('eliminationToggle');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');

  const activeCountBadge = document.getElementById('activeCountBadge');
  const historyCountBadge = document.getElementById('historyCountBadge');

  const addEntryForm = document.getElementById('addEntryForm');
  const entryInput = document.getElementById('entryInput');
  const entryList = document.getElementById('entryList');
  const restoreAllBtn = document.getElementById('restoreAllBtn');
  const excludedCountText = document.getElementById('excludedCountText');
  const clearEntriesBtn = document.getElementById('clearEntriesBtn');

  const bulkToggleBtn = document.getElementById('bulkToggleBtn');
  const bulkPanel = document.getElementById('bulkPanel');
  const bulkTextarea = document.getElementById('bulkTextarea');
  const bulkReplaceBtn = document.getElementById('bulkReplaceBtn');
  const bulkAppendBtn = document.getElementById('bulkAppendBtn');
  const bulkCancelBtn = document.getElementById('bulkCancelBtn');

  const presetGrid = document.getElementById('presetGrid');
  const numStart = document.getElementById('numStart');
  const numEnd = document.getElementById('numEnd');
  const generateNumbersBtn = document.getElementById('generateNumbersBtn');

  const historyList = document.getElementById('historyList');
  const clearHistoryBtn = document.getElementById('clearHistoryBtn');

  const resultModal = document.getElementById('resultModal');
  const modalGlowBar = document.getElementById('modalGlowBar');
  const winnerBadge = document.getElementById('winnerBadge');
  const winnerStylePill = document.getElementById('winnerStylePill');
  const winnerTimePill = document.getElementById('winnerTimePill');
  const winnerTitle = document.getElementById('winnerTitle');
  const winnerSubtext = document.getElementById('winnerSubtext');
  const standingsList = document.getElementById('standingsList');
  const modalExcludeBtn = document.getElementById('modalExcludeBtn');
  const modalRaceAgainBtn = document.getElementById('modalRaceAgainBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  const track = new CircuitTrack();
  const sound = new DerbySound();
  const confetti = new ConfettiFX(fxCanvas);

  /* =========================================================
   * Course, Lap & World Position Helpers
   * ========================================================= */
  let canvasW = 960;
  let canvasH = 560;

  function getTotalLaps() {
    if (state.courseDistance <= 1200) return 1;
    if (state.courseDistance <= 1600) return 2;
    if (state.courseDistance <= 2400) return 3;
    return 4; // 장거리 3200m (4랩!)
  }

  function getLapMeters() {
    return state.courseDistance / getTotalLaps();
  }

  function distToLapU(distMeters) {
    return distMeters / getLapMeters();
  }

  function laneIdxToNorm(laneIdx, count) {
    if (count <= 1) return 0;
    return -0.78 + (laneIdx / (count - 1)) * 1.56;
  }

  function getRunnerWorldPos(r) {
    return track.sample(distToLapU(r.dist), r.laneNorm);
  }

  /* =========================================================
   * Stadium Theme Helpers
   * ========================================================= */
  function getActiveStadium() {
    return STADIUMS[state.activeStadiumKey] || STADIUMS.TURF;
  }

  function applyStadiumTheme(stadiumKey) {
    state.activeStadiumKey = STADIUMS[stadiumKey] ? stadiumKey : 'TURF';
    const st = getActiveStadium();
    stadiumHeaderBadge.textContent = st.badge;
    stadiumNameChip.textContent = st.name;
    minimapTrack.style.background = st.minimapBg;
    minimapTrack.style.borderColor = st.minimapBorder;
    track.build(state.activeStadiumKey);
    initAmbientParticles();
    snapCameraToStart();
  }

  function snapCameraToStart() {
    if (state.cameraMode === 'OVERVIEW') {
      state.camX = WORLD_W / 2;
      state.camY = WORLD_H / 2;
      state.camZoom = getOverviewZoom();
    } else {
      const startPt = track.sample(0.015, 0);
      state.camX = startPt.cx + 90;
      state.camY = startPt.cy - 20;
      state.camZoom = getFollowZoom();
    }
  }

  function getOverviewZoom() {
    return Math.min((canvasW - 28) / (WORLD_W * 0.94), (canvasH - 28) / (WORLD_H * 0.94));
  }

  function getFollowZoom() {
    // Crisp magnified view of the giant 2400x1480 stadium so horses & corners feel intense!
    return Math.max(0.82, Math.min(1.18, canvasW / 840));
  }

  function initAmbientParticles() {
    const st = getActiveStadium();
    state.ambientParticles = [];
    if (st.ambient === 'NONE') return;
    const count = st.ambient === 'SNOW' ? 58 : st.ambient === 'EMBERS' ? 46 : 36;
    for (let i = 0; i < count; i++) {
      state.ambientParticles.push({
        x: Math.random() * canvasW,
        y: Math.random() * canvasH,
        size: 1.5 + Math.random() * 2.5,
        vx: st.ambient === 'SAND' ? -(110 + Math.random() * 140) : st.ambient === 'SNOW' ? -(20 + Math.random() * 35) : (Math.random() - 0.5) * 35,
        vy: st.ambient === 'EMBERS' ? -(26 + Math.random() * 56) : st.ambient === 'SNOW' ? 28 + Math.random() * 44 : (Math.random() - 0.5) * 20,
        alpha: 0.32 + Math.random() * 0.54,
      });
    }
  }

  /* =========================================================
   * Persistence
   * ========================================================= */
  function saveState() {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          entries: state.entries,
          history: state.history.slice(0, 80),
          soundEnabled: state.soundEnabled,
          autoExclude: state.autoExclude,
          obstaclesEnabled: state.obstaclesEnabled,
          encountersEnabled: state.encountersEnabled,
          selectedStadium: state.selectedStadium,
          courseDistance: state.courseDistance,
          cameraMode: state.cameraMode,
        })
      );
    } catch (_) {}
  }

  function loadState() {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('neon_derby_state_v3') ||
        localStorage.getItem('neon_derby_state_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.entries) && parsed.entries.length > 0) {
          state.entries = parsed.entries.map((e, i) => ({
            id: e.id || `r_${Date.now()}_${nextId++}`,
            label: String(e.label || '').trim() || `주자 ${i + 1}`,
            weight: Math.max(1, Math.min(20, Number(e.weight) || 1)),
            color: e.color || NEON_PALETTE[i % NEON_PALETTE.length],
            style: STYLE_ORDER.includes(e.style) ? e.style : 'AUTO',
            excluded: Boolean(e.excluded),
          }));
        }
        if (Array.isArray(parsed.history)) state.history = parsed.history;
        if (typeof parsed.soundEnabled === 'boolean') state.soundEnabled = parsed.soundEnabled;
        if (typeof parsed.autoExclude === 'boolean') state.autoExclude = parsed.autoExclude;
        if (typeof parsed.obstaclesEnabled === 'boolean') state.obstaclesEnabled = parsed.obstaclesEnabled;
        else if (typeof parsed.chaosEnabled === 'boolean') state.obstaclesEnabled = parsed.chaosEnabled;
        if (typeof parsed.encountersEnabled === 'boolean') state.encountersEnabled = parsed.encountersEnabled;
        else if (typeof parsed.chaosEnabled === 'boolean') state.encountersEnabled = parsed.chaosEnabled;
        if (parsed.selectedStadium && (STADIUMS[parsed.selectedStadium] || parsed.selectedStadium === 'RANDOM')) {
          state.selectedStadium = parsed.selectedStadium;
        }
        if ([1200, 1600, 2400, 3200].includes(parsed.courseDistance)) state.courseDistance = parsed.courseDistance;
        // Only adopt cameraMode if saved in v4 (so upgrading users immediately experience the new close-up chase camera!)
        if (localStorage.getItem(STORAGE_KEY) && (parsed.cameraMode === 'OVERVIEW' || parsed.cameraMode === 'FOLLOW')) {
          state.cameraMode = parsed.cameraMode;
        }
      }
    } catch (_) {}

    if (state.entries.length === 0) {
      applyPreset(PRESETS[0], false);
    }

    sound.enabled = state.soundEnabled;
    eliminationToggle.checked = state.autoExclude;
    obstaclesToggle.checked = state.obstaclesEnabled;
    encountersToggle.checked = state.encountersEnabled;
    syncSoundButton();
    syncStadiumButtons();
    syncDistanceButtons();
    syncCameraButton();

    const initialKey = state.selectedStadium === 'RANDOM' ? 'DIRT' : state.selectedStadium;
    applyStadiumTheme(initialKey);
  }

  /* =========================================================
   * Rebalanced Running Styles (도주 Nerf, 추입 Buff!)
   * ========================================================= */
  function getActiveEntries() {
    return state.entries.filter((e) => !e.excluded);
  }

  function resolveStyle(styleKey) {
    if (styleKey && styleKey !== 'AUTO' && SKILLS_BY_STYLE[styleKey]) return styleKey;
    const pool = ['FRONT', 'PACE', 'LATE', 'END'];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  const JOSTLE_POWER_BY_STYLE = {
    FRONT: 0.0,  // 도주 (몸싸움 가장 불리)
    END:   0.45, // 추입 (보통)
    PACE:  0.90, // 선행 (가장 유리)
    LATE:  0.90, // 선입 (가장 유리, 선행과 동급)
  };

  /**
   * Style Pace Curves:
   * - FRONT (도주): Fast gate burst, noticeably drains stamina in the final stretch
   * - PACE  (선행): Steady balanced runner (strong in jostling!)
   * - LATE  (선입): Strong mid-to-late surge (strong in jostling!)
   * - END   (추입): Original balanced End-Closer curve (patient early, strong late kick)
   */
  function getStylePaceMultiplier(style, p) {
    switch (style) {
      case 'FRONT':
        if (p < 0.35) return 1.114;
        if (p < 0.72) return 1.044;
        return 0.944;
      case 'PACE':
        if (p < 0.35) return 1.034;
        if (p < 0.72) return 1.030;
        return 0.992;
      case 'LATE':
        if (p < 0.44) return 0.957;
        if (p < 0.70) return 1.027;
        return 1.117;
      case 'END':
        if (p < 0.48) return 0.905;
        if (p < 0.72) return 1.008;
        return 1.160;
      default:
        return 1.0;
    }
  }

  /* =========================================================
   * Obstacles & Random Encounter Planner
   * ========================================================= */
  function spawnObstacles(runnerCount) {
    state.obstacles = [];
    if (!state.obstaclesEnabled || runnerCount <= 0) return;

    const types = ['HURDLE', 'HURDLE', 'SLIP', 'MUD', 'BOOST'];
    const totalZones =
      state.courseDistance <= 1200 ? 8 : state.courseDistance <= 1600 ? 12 : state.courseDistance <= 2400 ? 16 : 22;
    const step = (state.courseDistance - 260) / totalZones;

    for (let z = 0; z < totalZones; z++) {
      const baseDist = 140 + z * step;
      const countInZone = runnerCount >= 4 && Math.random() < 0.7 ? 2 : 1;
      for (let k = 0; k < countInZone; k++) {
        const laneNorm = -0.74 + Math.random() * 1.48;
        const type = types[Math.floor(Math.random() * types.length)];
        state.obstacles.push({
          id: `obs_${z}_${k}`,
          dist: baseDist + (Math.random() - 0.5) * Math.min(44, step * 0.4),
          laneNorm,
          type,
          triggered: false,
        });
      }
    }
  }

  function scheduleRandomEncounters() {
    state.encounterTriggers = [];
    state.nextEncounterIdx = 0;
    if (!state.encountersEnabled) return;

    const count =
      state.courseDistance <= 1200 ? 2 : state.courseDistance <= 1600 ? 3 : state.courseDistance <= 2400 ? 4 : 5;
    for (let i = 0; i < count; i++) {
      const minP = 0.14 + i * (0.7 / count);
      const maxP = minP + 0.1;
      state.encounterTriggers.push(minP + Math.random() * (maxP - minP));
    }
    state.encounterTriggers.sort((a, b) => a - b);
  }

  function buildGateRunners(randomizeRaceForm = false) {
    const active = getActiveEntries().slice(0, 24);
    const rawScores = active.map((entry) => {
      const u = Math.max(1e-6, Math.min(1 - 1e-6, Math.random()));
      const gumbel = -Math.log(-Math.log(u));
      return Math.log(Math.max(1, entry.weight)) + gumbel;
    });
    const maxScore = rawScores.length ? Math.max(...rawScores) : 0;
    const minScore = rawScores.length ? Math.min(...rawScores) : 0;
    const scoreSpan = Math.max(0.5, maxScore - minScore);

    state.runners = active.map((entry, idx) => {
      const activeStyle = resolveStyle(entry.style);
      const normForm = randomizeRaceForm ? ((rawScores[idx] - minScore) / scoreSpan) * 2 - 1 : 0;

      const skillTriggers = [];
      if (activeStyle === 'FRONT') {
        if (Math.random() < 0.60) skillTriggers.push({ at: 0.18 + Math.random() * 0.2, boost: 0.12, duration: 2.0 });
        if (Math.random() < 0.40) skillTriggers.push({ at: 0.66 + Math.random() * 0.16, boost: 0.095, duration: 1.7 });
      } else if (activeStyle === 'PACE') {
        if (Math.random() < 0.70) skillTriggers.push({ at: 0.32 + Math.random() * 0.22, boost: 0.11, duration: 2.0 });
        if (Math.random() < 0.47) skillTriggers.push({ at: 0.68 + Math.random() * 0.14, boost: 0.095, duration: 1.7 });
      } else if (activeStyle === 'LATE') {
        if (Math.random() < 0.70) skillTriggers.push({ at: 0.48 + Math.random() * 0.16, boost: 0.095, duration: 1.7 });
        if (Math.random() < 0.48) skillTriggers.push({ at: 0.73 + Math.random() * 0.13, boost: 0.085, duration: 1.5 });
      } else {
        if (Math.random() < 0.60) skillTriggers.push({ at: 0.58 + Math.random() * 0.12, boost: 0.095, duration: 1.75 });
        if (Math.random() < 0.70) skillTriggers.push({ at: 0.75 + Math.random() * 0.11, boost: 0.29, encounterBoost: 0.33, duration: 2.2, jostleBonus: 0.95 });
      }

      const startLane = laneIdxToNorm(idx, Math.max(1, active.length));
      return {
        entryId: entry.id,
        gate: idx + 1,
        laneIdx: idx,
        laneNorm: startLane,
        targetLaneNorm: startLane,
        laneVel: 0,
        label: entry.label,
        color: entry.color,
        weight: entry.weight,
        style: activeStyle,
        dist: 0,
        speed: 0,
        stridePhase: Math.random() * Math.PI * 2,
        formFactor: normForm,
        waveFreq: 1.6 + Math.random() * 1.4,
        wavePhase: Math.random() * Math.PI * 2,
        skillTriggers: skillTriggers.sort((a, b) => a.at - b.at),
        nextSkillIdx: 0,
        skillTimer: 0,
        activeSkillBoost: 0.095,
        activeSkillJostleBonus: 0,
        activeSkillName: '',
        buffTimer: 0,
        duelTimer: 0,   // 경합 (追い比べ) boost!
        stumbleTimer: 0, // 몸싸움 밀림 brief penalty!
        jumpTimer: 0,
        debuff: null,
        finished: false,
        finishTime: null,
        finishOrder: null,
        afterimages: [],
      };
    });

    state.gateOpenAnim = 0;
    state.spurtTriggered = false;
    state.photoSlowMoActive = false;
    state.photoFlashAlpha = 0;
    state.screenShake = 0;
    state.lastSectionAnnounced = -1;
    state.clashCooldowns.clear();
    state.clashSparks = [];
    state.dustParticles = [];
    state.floatingTexts = [];
    state.activeEncounterFX = [];

    if (randomizeRaceForm) {
      spawnObstacles(state.runners.length);
      scheduleRandomEncounters();
    } else {
      state.obstacles = [];
      state.encounterTriggers = [];
    }

    snapCameraToStart();
    rebuildMinimapPins();
    updateLeaderboardUI();
    distanceRemaining.textContent = `${state.courseDistance}m`;
  }

  /* =========================================================
   * Horse-to-Horse Jostling / Body-Check / Duel Physics! (몸싸움!)
   * ========================================================= */
  function spawnClashSparks(x, y, isDuel) {
    const colors = isDuel ? ['#ffe600', '#ff2a85', '#ffffff'] : ['#ff9f43', '#ffffff', '#00f5ff'];
    const count = isDuel ? 14 : 9;
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 45 + Math.random() * 120;
      state.clashSparks.push({
        x,
        y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        size: isDuel ? 3.5 : 2.6,
        color: colors[i % colors.length],
        life: 0,
        maxLife: 0.28 + Math.random() * 0.2,
      });
    }
  }

  function updateLaneSteeringAndJostling(dt) {
    const alive = state.runners.filter((r) => !r.finished);
    if (alive.length < 2) return;

    // 1. Tactical racing line steering (horses fight for inner rail & swing out to overtake!)
    alive.forEach((r) => {
      const progress = r.dist / state.courseDistance;
      // Front/Pace aim closer to the inner rail; Late/End swing slightly outer to pass in final stretch!
      let preferred =
        r.style === 'FRONT'
          ? -0.58
          : r.style === 'PACE'
            ? -0.25
            : r.style === 'LATE'
              ? progress > 0.65
                ? 0.22
                : -0.05
              : progress > 0.6
                ? 0.42
                : 0.1;

      // Add subtle organic weaving
      preferred += Math.sin(state.raceClock * 0.9 + r.gate * 1.7) * 0.24;

      // If another slower horse is directly ahead in the same lane, steer around them!
      for (const other of alive) {
        if (other === r) continue;
        const ahead = other.dist - r.dist;
        if (ahead > 2 && ahead < 26 && Math.abs(other.laneNorm - r.laneNorm) < 0.28) {
          if (r.speed > other.speed - 4) {
            preferred = other.laneNorm < 0.25 ? other.laneNorm + 0.42 : other.laneNorm - 0.42;
            break;
          }
        }
      }

      r.targetLaneNorm = Math.max(-0.82, Math.min(0.82, preferred));
      const steerForce = (r.targetLaneNorm - r.laneNorm) * 2.4;
      r.laneVel = (r.laneVel + steerForce * dt) * Math.pow(0.88, dt * 60);
      r.laneNorm += r.laneVel * dt;

      // Bounce softly off inner/outer rails
      if (r.laneNorm < -0.84) {
        r.laneNorm = -0.84;
        r.laneVel = Math.abs(r.laneVel) * 0.4;
      } else if (r.laneNorm > 0.84) {
        r.laneNorm = 0.84;
        r.laneVel = -Math.abs(r.laneVel) * 0.4;
      }
    });

    // 2. Pairwise Horse-to-Horse Shoulder Bumping & Duels!
    for (let i = 0; i < alive.length; i++) {
      for (let j = i + 1; j < alive.length; j++) {
        const a = alive[i];
        const b = alive[j];
        const distDiff = Math.abs(a.dist - b.dist);
        const laneDiff = Math.abs(a.laneNorm - b.laneNorm);

        if (distDiff < 16 && laneDiff < 0.24) {
          const pairKey = a.entryId < b.entryId ? `${a.entryId}|${b.entryId}` : `${b.entryId}|${a.entryId}`;
          const lastHit = state.clashCooldowns.get(pairKey) || -99;
          if (state.raceClock - lastHit < 0.95) continue;
          state.clashCooldowns.set(pairKey, state.raceClock);

          // Physical lateral push apart!
          const pushDir = a.laneNorm <= b.laneNorm ? -1 : 1;
          a.laneVel += pushDir * 1.45;
          b.laneVel -= pushDir * 1.45;

          const posA = getRunnerWorldPos(a);
          const posB = getRunnerWorldPos(b);
          const midX = (posA.x + posB.x) / 2;
          const midY = (posA.y + posB.y) / 2;

          const progress = Math.max(a.dist, b.dist) / state.courseDistance;
          const isFinalDuel = progress > 0.65 && distDiff < 9;

          if (isFinalDuel) {
            // 🔥 우마무스메 경합 (追い比べ) — Both horses ignite with competitive fire!!
            a.duelTimer = 1.25;
            b.duelTimer = 1.25;
            sound.playClash(true);
            spawnClashSparks(midX, midY, true);
            state.screenShake = Math.max(state.screenShake, 3.2);
            addFloatingText(a, '🔥 경합!', '#ffe600');
            addFloatingText(b, '🔥 경합!', '#ff2a85');

            if (state.realRaceElapsed - state.lastCommentTime > 1.8) {
              setCommentary(
                `🔥 격렬한 몸싸움 경합!! [${a.label}]와 [${b.label}] 불꽃 튀는 어깨 싸움!!`,
                'DUEL!!',
                'spurt'
              );
              state.lastCommentTime = state.realRaceElapsed;
            }
          } else {
            // 💥 일반 몸싸움 (Shoulder Body-Check!) — 기본 각질 유리도: 도주 < 추입 < 선행 = 선입
            // (선행은 초반 40% 구간 추가 우위 +0.55 / 추입 2차 스킬 발동 중 강행 돌파 +1.15)
            const stylePowerA = JOSTLE_POWER_BY_STYLE[a.style] ?? 0.45;
            const stylePowerB = JOSTLE_POWER_BY_STYLE[b.style] ?? 0.45;
            const earlyPaceA = progress < 0.40 && a.style === 'PACE' ? 0.55 : 0;
            const earlyPaceB = progress < 0.40 && b.style === 'PACE' ? 0.55 : 0;
            const bonusA = (a.skillTimer > 0 ? 0.55 + a.activeSkillJostleBonus : 0) + earlyPaceA;
            const bonusB = (b.skillTimer > 0 ? 0.55 + b.activeSkillJostleBonus : 0) + earlyPaceB;
            const powerA = stylePowerA + a.speed * 0.01 + Math.log(a.weight + 1) * 0.35 + bonusA + Math.random() * 0.65;
            const powerB = stylePowerB + b.speed * 0.01 + Math.log(b.weight + 1) * 0.35 + bonusB + Math.random() * 0.65;
            const winner = powerA >= powerB ? a : b;
            const loser = winner === a ? b : a;
            const isPowerBreakthrough = winner.skillTimer > 0 && winner.activeSkillJostleBonus > 0;

            loser.stumbleTimer = isPowerBreakthrough ? 0.7 : 0.55;
            loser.laneVel += (loser === a ? pushDir : -pushDir) * (isPowerBreakthrough ? 1.35 : 0.9);
            sound.playClash(isPowerBreakthrough);
            spawnClashSparks(midX, midY, isPowerBreakthrough);
            if (isPowerBreakthrough) {
              addFloatingText(winner, '💥 강행 돌파!', '#b026ff');
            }
            addFloatingText(loser, '💢 몸싸움 밀림!', '#ff9f43');

            if (state.realRaceElapsed - state.lastCommentTime > 2.1) {
              setCommentary(
                isPowerBreakthrough
                  ? `💥 압도적 강행 돌파!! [${winner.label}] 주자가 마군을 뚫고 [${loser.label}] 주자를 밀쳐냅니다!!`
                  : `💥 몸싸움 충돌!! [${winner.label}] 주자가 [${loser.label}] 주자를 어깨로 밀어냅니다!`,
                isPowerBreakthrough ? 'BREAKTHROUGH!' : 'CLASH!'
              );
              state.lastCommentTime = state.realRaceElapsed;
            }
          }
        }
      }
    }
  }

  /* =========================================================
   * Debuffs, Floating Popups & Random Encounters
   * ========================================================= */
  function addFloatingText(runner, text, color = '#ffe600') {
    const pos = getRunnerWorldPos(runner);
    state.floatingTexts.push({
      x: pos.x,
      y: pos.y - 24,
      text,
      color,
      life: 0,
      maxLife: 1.3,
    });
  }

  function applyDebuff(runner, { type, icon, label, mult, duration, color = '#ff3864', liftY = 0 }) {
    if (runner.finished) return;
    runner.debuff = {
      type,
      icon,
      label,
      mult,
      timer: duration,
      maxTimer: duration,
      color,
      liftY,
    };
    addFloatingText(runner, `${icon} ${label}`, color);
  }

  function pickRandomRunners(maxCount, preferLeaders = false) {
    const alive = state.runners.filter((r) => !r.finished);
    if (alive.length === 0) return [];
    const count = Math.min(alive.length, Math.max(1, maxCount));

    if (preferLeaders) {
      return [...alive].sort((a, b) => b.dist - a.dist).slice(0, count);
    }

    const pool = [...alive];
    const picked = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * pool.length);
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }

  function triggerRandomEncounter() {
    const alive = state.runners.filter((r) => !r.finished);
    if (alive.length === 0) return;

    const st = getActiveStadium();
    const pool = ['DRUNK_STREAKER', 'THROWN_OBJECT', 'ANKLE_SPRAIN', 'STRAY_PIGEONS', 'SHOE_LOOSE', 'RUSHED', 'HEADWIND'];
    if (st.key === 'VOLCANO') pool.push('HEATWAVE', 'THROWN_OBJECT', 'SHOE_LOOSE');
    else if (st.key === 'ICE') pool.push('BLIZZARD', 'ANKLE_SPRAIN');
    else if (st.key === 'DIRT') pool.push('SANDSTORM', 'DRUNK_STREAKER');
    else pool.push('DRUNK_STREAKER', 'THROWN_OBJECT', 'STRAY_PIGEONS');

    const kind = pool[Math.floor(Math.random() * pool.length)];
    const targetCount = alive.length >= 6 ? 2 : 1;

    switch (kind) {
      case 'DRUNK_STREAKER': {
        const targets = pickRandomRunners(Math.min(2, Math.max(1, targetCount)), false);
        const names = targets.map((r) => r.label).join(', ');
        sound.playSecurityWhistle();
        state.screenShake = 6;
        trackViewport.classList.add('boss-active');
        setTimeout(() => trackViewport.classList.remove('boss-active'), 2100);

        targets.forEach((r) => {
          applyDebuff(r, {
            type: 'STREAKER',
            icon: '🍺',
            label: '취객 회피 급제동!',
            mult: 0.52,
            duration: 2.0,
            color: '#ff3864',
          });
        });

        state.activeEncounterFX.push({
          type: 'DRUNK_STREAKER',
          timer: 2.4,
          maxTimer: 2.4,
          targetIds: targets.map((r) => r.entryId),
        });

        showEncounterCutin('⚠ SECURITY ALERT // 돌발 난입!', '🍺 관중석 취객 트랙 난입!!', `[${names}] 급제동 회피! 경비원이 긴급 출동합니다!`);
        setCommentary(`🍺 비상!! 관중석에서 취객이 트랙으로 뛰어들었습니다!! [${names}] 주자 급제동 회피!!`, 'INTRUDER!', 'warning');
        break;
      }

      case 'THROWN_OBJECT': {
        const targets = pickRandomRunners(targetCount, false);
        const names = targets.map((r) => r.label).join(', ');
        const thrownItems = [
          { icon: '🥤', name: '음료수 컵' },
          { icon: '🍾', name: '물병' },
          { icon: '📣', name: '응원봉' },
          { icon: '🧢', name: '모자' },
        ];
        const pickedItem = thrownItems[Math.floor(Math.random() * thrownItems.length)];
        sound.playDebuffHit();
        state.screenShake = 5;

        targets.forEach((r) => {
          applyDebuff(r, {
            type: 'THROWN',
            icon: pickedItem.icon,
            label: `${pickedItem.name} 피격!`,
            mult: 0.54,
            duration: 1.85,
            color: '#ffe600',
          });
        });

        state.activeEncounterFX.push({
          type: 'THROWN_OBJECT',
          timer: 1.5,
          maxTimer: 1.5,
          icon: pickedItem.icon,
          targetIds: targets.map((r) => r.entryId),
        });

        showEncounterCutin('⚠ FOUL CROWD // 관중 투척물', `${pickedItem.icon} 관중석에서 ${pickedItem.name} 투척!!`, `[${names}] 정통으로 맞고 비틀거립니다!`);
        setCommentary(`${pickedItem.icon} 앗!! 관중석에서 날아온 ${pickedItem.name}에 [${names}] 주자가 맞고 말았습니다!!`, 'FOUL HIT!', 'warning');
        break;
      }

      case 'ANKLE_SPRAIN': {
        const targets = pickRandomRunners(1, false);
        const r = targets[0];
        sound.playDebuffHit();
        applyDebuff(r, {
          type: 'SPRAIN',
          icon: '🩹',
          label: '발목 삠!',
          mult: 0.56,
          duration: 2.5,
          color: '#ff9f43',
        });
        showEncounterCutin('⚠ ACCIDENT // 코너 돌발 부상', `🩹 [${r.label}] 발목을 삐끗했습니다!`, '착지 실수로 절뚝거리며 속도가 급감합니다!');
        setCommentary(`🩹 앗!! [${r.label}] 주자가 발목을 삐었습니다!! 절뚝이며 페이스 급락!!`, 'INJURY!', 'warning');
        break;
      }

      case 'STRAY_PIGEONS': {
        const targets = pickRandomRunners(targetCount, false);
        const names = targets.map((r) => r.label).join(', ');
        sound.playWarningAlarm();

        targets.forEach((r) => {
          applyDebuff(r, {
            type: 'PIGEONS',
            icon: '🕊️',
            label: '비둘기 떼 회피!',
            mult: 0.60,
            duration: 1.9,
            color: '#e0f2fe',
          });
        });

        state.activeEncounterFX.push({
          type: 'STRAY_PIGEONS',
          timer: 2.0,
          maxTimer: 2.0,
          targetIds: targets.map((r) => r.entryId),
        });

        showEncounterCutin('⚠ TRACK WILDLIFE // 야생 조류', '🕊️ 트랙 위 비둘기 떼 급강하!!', `[${names}] 깜짝 놀라 진로를 피하며 감속!`);
        setCommentary(`🕊️ 경기장 비둘기 떼가 트랙에 내려앉았습니다!! [${names}] 주자 회피로 속도 저하!!`, 'PIGEONS!', 'warning');
        break;
      }

      case 'SHOE_LOOSE': {
        const targets = pickRandomRunners(1, false);
        const r = targets[0];
        sound.playDebuffHit();

        applyDebuff(r, {
          type: 'SHOE',
          icon: '👟',
          label: '편자 탈락!',
          mult: 0.58,
          duration: 2.2,
          color: '#ff70d9',
        });

        state.activeEncounterFX.push({
          type: 'SHOE_LOOSE',
          timer: 1.4,
          maxTimer: 1.4,
          targetIds: [r.entryId],
        });

        showEncounterCutin('⚠ EQUIPMENT // 장비 트러블', `👟 [${r.label}] 편자(신발)가 벗겨졌습니다!`, '접지력을 잃어 추진력이 크게 떨어집니다!');
        setCommentary(`👟 아이고!! 질주 도중 [${r.label}] 주자의 편자가 벗겨지고 말았습니다!!`, 'TROUBLE!', 'warning');
        break;
      }

      case 'HEADWIND':
      case 'BLIZZARD':
      case 'SANDSTORM':
      case 'HEATWAVE': {
        const targets = pickRandomRunners(Math.min(2, alive.length), true);
        const names = targets.map((r) => r.label).join(', ');
        sound.playWarningAlarm();
        const title =
          kind === 'BLIZZARD'
            ? '❄️ 극한 눈보라 강타!'
            : kind === 'SANDSTORM'
              ? '🏜️ 사막 모래바람 엄습!'
              : kind === 'HEATWAVE'
                ? '🥵 경기장 열풍 탈진!'
                : '🌪️ 경기장 강풍 돌풍!';
        const icon = kind === 'BLIZZARD' ? '🥶' : kind === 'HEATWAVE' ? '🥵' : '🌪️';
        const debuffLabel =
          kind === 'BLIZZARD' ? '빙결 둔화!' : kind === 'SANDSTORM' ? '모래 시야 방해!' : kind === 'HEATWAVE' ? '열기 탈진!' : '맞바람 저항!';

        targets.forEach((r) => {
          applyDebuff(r, {
            type: 'WIND',
            icon,
            label: debuffLabel,
            mult: 0.63,
            duration: 2.2,
            color: kind === 'HEATWAVE' ? '#ff6b00' : '#7ce8ff',
          });
        });
        state.activeEncounterFX.push({
          type: 'WIND',
          timer: 2.2,
          maxTimer: 2.2,
          color: kind === 'SANDSTORM' ? '#ffae52' : kind === 'HEATWAVE' ? '#ff6b00' : '#7ce8ff',
        });
        showEncounterCutin('⚠ WEATHER // 경기장 기상 변수', title, `선두 [${names}] 정면 직격! 추격 찬스!`);
        setCommentary(`${icon} ${title} 선두권 [${names}] 주자가 거센 저항을 받습니다! 후발주자 대역전 기회!!`, 'WEATHER!', 'warning');
        break;
      }

      case 'RUSHED': {
        const targets = pickRandomRunners(1, false);
        const r = targets[0];
        sound.playDebuffHit();
        applyDebuff(r, {
          type: 'RUSHED',
          icon: '💢',
          label: '흥분 탈진!',
          mult: 0.62,
          duration: 2.2,
          color: '#ff2a85',
        });
        showEncounterCutin('⚠ CONDITION // 흥분(掛かり)', `💢 [${r.label}] 흥분 상태 돌입!`, '페이스 조절 실패로 체력이 급격히 소모됩니다!');
        setCommentary(`💢 앗! [${r.label}] 주자 흥분 상태!! 무리한 주행으로 페이스가 무너집니다!`, 'RUSHED!', 'warning');
        break;
      }
    }

    state.lastCommentTime = state.realRaceElapsed;
  }

  /* =========================================================
   * Minimap, Leaderboard & Banner UI
   * ========================================================= */
  function rebuildMinimapPins() {
    minimapPins.innerHTML = '';
    state.runners.forEach((r) => {
      const pin = document.createElement('div');
      pin.className = 'minimap-pin';
      pin.dataset.id = r.entryId;
      pin.style.backgroundColor = r.color;
      pin.style.color = '#050611';
      pin.style.left = '0%';
      pin.textContent = String(r.gate);
      minimapPins.appendChild(pin);
    });
  }

  function updateMinimapPins() {
    const pins = minimapPins.children;
    for (let i = 0; i < state.runners.length && i < pins.length; i++) {
      const r = state.runners[i];
      const pct = Math.max(0, Math.min(100, (r.dist / state.courseDistance) * 100));
      pins[i].style.left = `${pct}%`;
    }
  }

  function getSortedStandings() {
    return [...state.runners].sort((a, b) => {
      if (a.finished && b.finished) return a.finishTime - b.finishTime;
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.dist - a.dist;
    });
  }

  function updateLeaderboardUI() {
    const sorted = getSortedStandings();
    const topN = sorted.slice(0, 6);
    leaderboardList.innerHTML = '';
    topN.forEach((r, idx) => {
      const li = document.createElement('li');
      li.className = 'lb-row';
      const posClass = idx === 0 ? 'p1' : idx === 1 ? 'p2' : idx === 2 ? 'p3' : '';
      const statusHtml = r.debuff
        ? `<span class="lb-debuff" title="${r.debuff.label}">${r.debuff.icon}</span>`
        : r.duelTimer > 0
          ? `<span class="lb-debuff" title="경합 중!">🔥</span>`
          : '';
      li.innerHTML = `
        <span class="lb-pos ${posClass}">${idx + 1}</span>
        <span class="lb-dot" style="background:${r.color};box-shadow:0 0 6px ${r.color}"></span>
        <span class="lb-name"></span>
        ${statusHtml}
        <span class="lb-style">${STYLE_META[r.style].short}</span>
      `;
      li.querySelector('.lb-name').textContent = r.label;
      leaderboardList.appendChild(li);
    });
  }

  function setCommentary(text, badgeText = null, badgeClass = '') {
    commentaryText.textContent = text;
    if (badgeText !== null) {
      phaseBadge.textContent = badgeText;
      phaseBadge.className = `live-pill${badgeClass ? ' ' + badgeClass : ''}`;
    }
  }

  function showSkillCutin(runnerName, skillName, accentColor) {
    skillCutinRunner.textContent = runnerName;
    skillCutinRunner.style.color = accentColor;
    skillCutinName.textContent = skillName;
    skillCutin.style.borderColor = accentColor;
    skillCutin.classList.remove('hidden');
    skillCutin.style.animation = 'none';
    void skillCutin.offsetWidth;
    skillCutin.style.animation = '';
    state.skillCutinTimer = 1.9;
  }

  function showEncounterCutin(tag, title, desc) {
    encounterCutinTag.textContent = tag;
    encounterCutinTitle.textContent = title;
    encounterCutinDesc.textContent = desc;
    encounterCutin.classList.remove('hidden');
    encounterCutin.style.animation = 'none';
    void encounterCutin.offsetWidth;
    encounterCutin.style.animation = '';
    state.encounterCutinTimer = 2.6;
  }

  function showCenterBanner(text) {
    centerBannerText.textContent = text;
    centerBanner.classList.remove('hidden');
    centerBannerText.style.animation = 'none';
    void centerBannerText.offsetWidth;
    centerBannerText.style.animation = '';
  }

  function hideCenterBanner() {
    centerBanner.classList.add('hidden');
  }

  /* =========================================================
   * Race Flow: Start -> Countdown -> Racing -> Photo Finish
   * ========================================================= */
  let finishCounter = 0;

  function startRace() {
    if (state.phase === 'COUNTDOWN' || state.phase === 'RACING') return;
    if (getActiveEntries().length === 0) {
      setCommentary('출전 주자가 없습니다! 오른쪽 패널에서 주자를 추가하거나 복구해 주세요.', 'EMPTY');
      return;
    }

    sound.ensure();
    closeModal();
    trackViewport.classList.remove('spurt-active', 'boss-active');
    skillCutin.classList.add('hidden');
    encounterCutin.classList.add('hidden');

    const chosenStadium =
      state.selectedStadium === 'RANDOM'
        ? STADIUM_KEYS[Math.floor(Math.random() * STADIUM_KEYS.length)]
        : state.selectedStadium;
    applyStadiumTheme(chosenStadium);

    buildGateRunners(true);
    state.phase = 'COUNTDOWN';
    state.countdownTimer = 1.65;
    state.lastCountdownInt = 4;
    state.raceClock = 0;
    state.realRaceElapsed = 0;
    state.finishHoldTimer = 0;
    state.lastLeaderId = null;
    state.lastCommentTime = 0;

    const distTag = state.courseDistance === 3200 ? '장거리 3200m (4랩)' : `${state.courseDistance}m (${getTotalLaps()}랩)`;
    setCommentary(`[${getActiveStadium().name} · ${distTag}] 전 주자 게이트 인 완료!`, 'GATE IN');
    syncControlsLock();
  }

  function triggerGateOpen() {
    state.phase = 'RACING';
    state.gateOpenAnim = 0.01;
    sound.playGateOpen();
    showCenterBanner('GATE OPEN!!');
    setTimeout(() => {
      if (state.phase === 'RACING') hideCenterBanner();
    }, 680);

    setCommentary('🔔 게이트 오픈!! 치열한 자리 싸움과 함께 1코너를 향해 질주합니다!!', 'START');
  }

  function formatRaceTime(sec) {
    const scale =
      state.courseDistance === 1200 ? 6.8 : state.courseDistance === 1600 ? 7.2 : state.courseDistance === 2400 ? 8.1 : 8.6;
    const totalSec = sec * scale;
    const mins = Math.floor(totalSec / 60);
    const rem = totalSec - mins * 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem.toFixed(2)}`;
  }

  function formatMargin(distGapMeters) {
    if (distGapMeters <= 0.01) return '1착';
    if (distGapMeters < 0.5) return '코차';
    if (distGapMeters < 1.1) return '머리차';
    if (distGapMeters < 1.8) return '목차';
    if (distGapMeters < 2.6) return '½마신';
    if (distGapMeters < 3.5) return '¾마신';
    const lengths = Math.round(distGapMeters / 2.6);
    if (lengths >= 10) return '대차';
    return `${lengths}마신`;
  }

  function finalizeRace() {
    state.phase = 'FINISHED';
    trackViewport.classList.remove('spurt-active', 'boss-active');
    hideCenterBanner();
    skillCutin.classList.add('hidden');
    encounterCutin.classList.add('hidden');
    syncControlsLock();

    const standings = getSortedStandings();
    const winner = standings[0];
    if (!winner) return;

    const finishTimeStr = formatRaceTime(winner.finishTime || state.raceClock);
    const st = getActiveStadium();
    setCommentary(
      `🏆 1착 [${winner.label}] (${STYLE_META[winner.style].label})!! ${st.name} ${state.courseDistance}m를 ${finishTimeStr}로 제패!`,
      'FINISH'
    );
    distanceRemaining.textContent = 'GOAL!';

    const now = new Date();
    const clockStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    state.history.unshift({
      id: `h_${Date.now()}`,
      entryId: winner.entryId,
      label: winner.label,
      color: winner.color,
      style: winner.style,
      stadium: st.name,
      distance: state.courseDistance,
      record: finishTimeStr,
      time: clockStr,
    });

    sound.playG1Fanfare();
    const rect = raceCanvas.getBoundingClientRect();
    confetti.burst(rect.left + rect.width * 0.52, rect.top + rect.height * 0.5, winner.color);
    confetti.burst(rect.left + rect.width * 0.4, rect.top + rect.height * 0.42, '#ffe600');

    let autoExcludedNow = false;
    if (state.autoExclude) {
      const target = state.entries.find((e) => e.id === winner.entryId);
      if (target) {
        target.excluded = true;
        autoExcludedNow = true;
      }
    }

    saveState();
    renderEntries(false);
    renderHistory();
    openResultModal(standings, finishTimeStr, autoExcludedNow);
  }

  /* =========================================================
   * Physics Update Loop
   * ========================================================= */
  function getCourseBaseSpeed() {
    if (state.courseDistance <= 1200) return 118;
    if (state.courseDistance <= 1600) return 126;
    if (state.courseDistance <= 2400) return 138;
    return 146; // 장거리 3200m (~22s at 1.0x, ~11s at 2.0x)
  }

  function updateRacePhysics(dtReal) {
    const st = getActiveStadium();
    state.ambientParticles.forEach((p) => {
      p.x += p.vx * dtReal * (state.phase === 'RACING' ? 1.9 : 0.7);
      p.y += p.vy * dtReal;
      if (p.x < -10) p.x = canvasW + 10;
      if (p.x > canvasW + 10) p.x = -10;
      if (p.y < -10) p.y = canvasH + 10;
      if (p.y > canvasH + 10) p.y = -10;
    });

    if (state.screenShake > 0) {
      state.screenShake = Math.max(0, state.screenShake - dtReal * 24);
    }

    updateCamera(dtReal);

    if (state.phase === 'COUNTDOWN') {
      state.countdownTimer -= dtReal;
      const secLeft = Math.ceil(state.countdownTimer * 1.8);
      if (secLeft !== state.lastCountdownInt && secLeft > 0) {
        state.lastCountdownInt = secLeft;
        sound.playCountdownBeep(false);
        showCenterBanner(secLeft === 1 ? 'READY!' : `${secLeft}`);
      }
      if (state.countdownTimer <= 0) {
        finishCounter = 0;
        triggerGateOpen();
      }
      return;
    }

    if (state.phase !== 'RACING') return;

    if (state.gateOpenAnim < 1) {
      state.gateOpenAnim = Math.min(1, state.gateOpenAnim + dtReal * 5.5);
    }

    let leaderDist = 0;
    let firstFinisher = null;
    for (const r of state.runners) {
      if (r.dist > leaderDist) leaderDist = r.dist;
      if (r.finished && (!firstFinisher || r.finishTime < firstFinisher.finishTime)) {
        firstFinisher = r;
      }
    }

    const leaderProgress = leaderDist / state.courseDistance;
    const remainMeters = Math.max(0, state.courseDistance - leaderDist);
    distanceRemaining.textContent = remainMeters <= 0 ? 'GOAL!' : `${Math.ceil(remainMeters)}m`;

    // Random Mid-Race Encounters
    if (
      state.encountersEnabled &&
      !firstFinisher &&
      state.nextEncounterIdx < state.encounterTriggers.length &&
      leaderProgress >= state.encounterTriggers[state.nextEncounterIdx]
    ) {
      state.nextEncounterIdx++;
      triggerRandomEncounter();
    }

    // Corner & Final Lap Commentary
    const lapU = distToLapU(leaderDist) % 1;
    const currLap = Math.min(getTotalLaps(), Math.floor(leaderDist / getLapMeters()) + 1);
    const sectionKey = currLap * 10 + (lapU < 0.16 ? 0 : lapU < 0.38 ? 1 : lapU < 0.64 ? 2 : lapU < 0.86 ? 3 : 4);
    if (
      !firstFinisher &&
      !state.spurtTriggered &&
      sectionKey !== state.lastSectionAnnounced &&
      state.realRaceElapsed - state.lastCommentTime > 2.3
    ) {
      state.lastSectionAnnounced = sectionKey;
      const leader = getSortedStandings()[0];
      const sec = sectionKey % 10;
      if (leader) {
        if (sec === 0 && currLap > 1) {
          const lapBanner = currLap === getTotalLaps() ? '🔥 파이널 랩 진입!!' : `🔔 ${currLap}번째 바퀴 진입!`;
          setCommentary(`${lapBanner} [${leader.label}] 주자가 선두로 결승선 앞을 통과합니다!`, `LAP ${currLap}/${getTotalLaps()}`);
          state.lastCommentTime = state.realRaceElapsed;
        } else if (sec === 1) {
          setCommentary(`🌀 ${st.cornerLabels[0]} 진입! [${leader.label}] 선두 질주 중!`, 'CORNER 1·2');
          state.lastCommentTime = state.realRaceElapsed;
        } else if (sec === 2) {
          setCommentary(`🔀 ${st.cornerLabels[1]} 돌파! 굴절 코너에서 거센 몸싸움!`, 'CHICANE');
          state.lastCommentTime = state.realRaceElapsed;
        } else if (sec === 3) {
          setCommentary(`🌀 ${st.cornerLabels[2]} 선회! 추입 주자들이 외곽에서 올라옵니다!`, 'CORNER 3·4');
          state.lastCommentTime = state.realRaceElapsed;
        }
      }
    }

    // Last Spurt drama (final 400m on long courses, 360m on short)
    const spurtThreshold = state.courseDistance >= 2400 ? 480 : 360;
    if (!state.spurtTriggered && remainMeters <= spurtThreshold && state.courseDistance > spurtThreshold) {
      state.spurtTriggered = true;
      trackViewport.classList.add('spurt-active');
      sound.playLastSpurtAlarm();
      setCommentary('🔥 최종 코너 돌파!! 라스트 스퍼트!! 추입 주자들이 무섭게 치고 올라옵니다!!', 'LAST SPURT!', 'spurt');
    }

    // Photo Finish Slow-Mo right before 1st place crosses GOAL
    const nearGoal = !firstFinisher && remainMeters <= 42 && remainMeters > 0;
    let timeScale = state.speedMultiplier;
    if (nearGoal) {
      timeScale = 0.34;
      if (!state.photoSlowMoActive) {
        state.photoSlowMoActive = true;
        setCommentary('📸 포토 피니시!! 결승선 직전 숨 막히는 초접전!!', 'PHOTO FINISH', 'photo');
      }
    } else {
      state.photoSlowMoActive = false;
    }

    const dt = dtReal * timeScale;
    state.raceClock += dt;
    state.realRaceElapsed += dtReal;

    const baseSpeed = getCourseBaseSpeed();
    const sortedBefore = getSortedStandings();
    const packLeaderDist = sortedBefore[0] ? sortedBefore[0].dist : 0;

    // Horse-to-horse steering & jostling physics!
    updateLaneSteeringAndJostling(dt);

    state.runners.forEach((r) => {
      const progress = Math.max(0, Math.min(1.08, r.dist / state.courseDistance));

      if (!r.finished) {
        const styleMult = getStylePaceMultiplier(r.style, progress);
        const wave = Math.sin(state.raceClock * r.waveFreq + r.wavePhase) * 0.032;
        const formRamp = progress < 0.35 ? 0.015 : 0.015 + ((progress - 0.35) / 0.65) * 0.072;
        const formBonus = r.formFactor * formRamp;

        // Pack tension keeps field tight without erasing early pace tradeoffs
        let draftBonus = 0;
        if (progress < 0.65) {
          const gapBehind = packLeaderDist - r.dist;
          const threshold = state.courseDistance >= 2400 ? 60 : 42;
          if (gapBehind > threshold) {
            draftBonus = Math.min(0.055, (gapBehind - threshold) * 0.0012);
          }
        }

        // Skill activation
        if (r.nextSkillIdx < r.skillTriggers.length && progress >= r.skillTriggers[r.nextSkillIdx].at) {
          const trigger = r.skillTriggers[r.nextSkillIdx];
          r.nextSkillIdx++;
          r.skillTimer = trigger.duration + Math.min(0.45, Math.log(r.weight) * 0.14);
          r.activeSkillBoost =
            state.encountersEnabled && typeof trigger.encounterBoost === 'number'
              ? trigger.encounterBoost
              : trigger.boost;
          r.activeSkillJostleBonus = trigger.jostleBonus || 0;
          const pool = SKILLS_BY_STYLE[r.style] || SKILLS_BY_STYLE.PACE;
          r.activeSkillName = pool[Math.floor(Math.random() * pool.length)];
          sound.playSkillProc();
          showSkillCutin(r.label, r.activeSkillName, r.color);
          if (state.realRaceElapsed - state.lastCommentTime > 1.2) {
            setCommentary(
              `✨ [${r.label}] 스킬 발동 — ${r.activeSkillName}`,
              state.spurtTriggered ? 'LAST SPURT!' : 'SKILL!',
              state.spurtTriggered ? 'spurt' : ''
            );
            state.lastCommentTime = state.realRaceElapsed;
          }
        }

        let skillBoost = 0;
        if (r.skillTimer > 0) {
          r.skillTimer = Math.max(0, r.skillTimer - dt);
          skillBoost = r.activeSkillBoost;
          if (r.skillTimer <= 0) r.activeSkillJostleBonus = 0;
        }

        let padBoost = 0;
        if (r.buffTimer > 0) {
          r.buffTimer = Math.max(0, r.buffTimer - dt);
          padBoost = 0.28;
        }

        let duelBoost = 0;
        if (r.duelTimer > 0) {
          r.duelTimer = Math.max(0, r.duelTimer - dt);
          // 경합(몸싸움) 투지 보정: 기본 도주 < 추입 < 선행 = 선입 (추입 2차 스킬 발동 중 추가 돌파 보정!)
          const stylePower = JOSTLE_POWER_BY_STYLE[r.style] ?? 0.45;
          const endSkillDuelBonus = r.skillTimer > 0 && r.activeSkillJostleBonus > 0 ? 0.045 : 0;
          duelBoost = 0.045 + stylePower * 0.045 + endSkillDuelBonus;
        }

        let stumbleMult = 1.0;
        if (r.stumbleTimer > 0) {
          r.stumbleTimer = Math.max(0, r.stumbleTimer - dt);
          stumbleMult = 0.85;
        }

        if (r.jumpTimer > 0) r.jumpTimer = Math.max(0, r.jumpTimer - dt);

        let debuffMult = 1.0;
        if (r.debuff) {
          r.debuff.timer -= dt;
          debuffMult = r.debuff.mult;
          if (r.debuff.timer <= 0) r.debuff = null;
        }

        const gateAccel = Math.min(1, 0.35 + state.raceClock * 1.15);
        const targetSpeed =
          baseSpeed *
          gateAccel *
          (styleMult + wave + formBonus + draftBonus + skillBoost + padBoost + duelBoost) *
          debuffMult *
          stumbleMult;

        r.speed += (targetSpeed - r.speed) * Math.min(1, dt * 6.5);
        const prevDist = r.dist;
        r.dist += r.speed * dt;

        // Track Obstacle Collisions (using live dynamic laneNorm!)
        if (state.obstaclesEnabled) {
          for (const obs of state.obstacles) {
            if (obs.triggered) continue;
            if (prevDist < obs.dist && r.dist >= obs.dist && Math.abs(r.laneNorm - obs.laneNorm) < 0.26) {
              obs.triggered = true;
              if (obs.type === 'BOOST') {
                r.buffTimer = 1.15;
                sound.playBoostPad();
                addFloatingText(r, '⚡ 터보 패드!', '#39ff14');
              } else if (obs.type === 'HURDLE') {
                const dodgeChance = r.skillTimer > 0 ? 0.68 : 0.34;
                if (Math.random() < dodgeChance) {
                  r.jumpTimer = 0.45;
                  sound.playJump();
                  addFloatingText(r, 'JUMP! 회피', '#00f5ff');
                } else {
                  sound.playDebuffHit();
                  state.screenShake = Math.max(state.screenShake, 4.5);
                  applyDebuff(r, {
                    type: 'STUMBLE',
                    icon: '🚧',
                    label: '장애물 충돌!',
                    mult: 0.56,
                    duration: 1.35,
                    color: '#ff6b00',
                  });
                }
              } else if (obs.type === 'SLIP') {
                sound.playDebuffHit();
                applyDebuff(r, {
                  type: 'SLIP',
                  icon: '💫',
                  label: '미끄러짐!',
                  mult: 0.52,
                  duration: 1.45,
                  color: '#ffe600',
                });
              } else if (obs.type === 'MUD') {
                sound.playDebuffHit();
                applyDebuff(r, {
                  type: 'MUD',
                  icon: '🐌',
                  label: '늪지 감속!',
                  mult: 0.6,
                  duration: 1.75,
                  color: '#b089ff',
                });
              }
            }
          }
        }

        // Finish check
        if (r.dist >= state.courseDistance) {
          const overshoot = r.dist - state.courseDistance;
          const exactTime = state.raceClock - overshoot / Math.max(1, r.speed);
          r.finished = true;
          r.finishTime = exactTime;
          r.finishOrder = ++finishCounter;
          r.debuff = null;

          if (r.finishOrder === 1) {
            state.photoFlashAlpha = 0.92;
            sound.playPhotoShutter();
            showCenterBanner('GOAL!!');
          }
        }
      } else {
        r.speed *= Math.pow(0.95, dt * 60);
        r.dist += r.speed * dt;
      }

      // Stride & afterimage world positions
      r.stridePhase += dt * (r.speed * 0.165);
      const pos = getRunnerWorldPos(r);
      const isEndRocket = r.style === 'END' && progress > 0.68 && !r.finished;
      if ((r.skillTimer > 0 || r.buffTimer > 0 || r.duelTimer > 0 || isEndRocket) && Math.random() < 0.6) {
        r.afterimages.push({ x: pos.x, y: pos.y, tx: pos.tx, alpha: 0.62 });
        if (r.afterimages.length > 7) r.afterimages.shift();
      }
      for (let i = r.afterimages.length - 1; i >= 0; i--) {
        r.afterimages[i].alpha -= dt * 2.2;
        if (r.afterimages[i].alpha <= 0) r.afterimages.splice(i, 1);
      }

      // Dust / sparks kicking back along tangent
      if (r.speed > 30 && Math.random() < (r.skillTimer > 0 || r.buffTimer > 0 || isEndRocket ? 0.72 : 0.3)) {
        state.dustParticles.push({
          x: pos.x - pos.tx * 12,
          y: pos.y - pos.ty * 12 + 12,
          vx: -pos.tx * (26 + Math.random() * 34) + (Math.random() - 0.5) * 18,
          vy: -pos.ty * (26 + Math.random() * 34) - 8 - Math.random() * 14,
          life: 0,
          maxLife: 0.36 + Math.random() * 0.24,
          color: r.debuff ? r.debuff.color : isEndRocket ? '#b026ff' : r.skillTimer > 0 ? r.color : st.dustColor,
          size: r.skillTimer > 0 || isEndRocket ? 4.4 : 2.8,
        });
      }
    });

    // Update dust particles
    for (let i = state.dustParticles.length - 1; i >= 0; i--) {
      const p = state.dustParticles[i];
      p.life += dt;
      if (p.life >= p.maxLife) {
        state.dustParticles.splice(i, 1);
        continue;
      }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
    }

    // Update clash sparks
    for (let i = state.clashSparks.length - 1; i >= 0; i--) {
      const s = state.clashSparks[i];
      s.life += dtReal;
      if (s.life >= s.maxLife) {
        state.clashSparks.splice(i, 1);
        continue;
      }
      s.x += s.vx * dtReal;
      s.y += s.vy * dtReal;
      s.vx *= 0.92;
      s.vy *= 0.92;
    }

    // Update floating texts
    for (let i = state.floatingTexts.length - 1; i >= 0; i--) {
      const ft = state.floatingTexts[i];
      ft.life += dtReal;
      ft.y -= dtReal * 32;
      if (ft.life >= ft.maxLife) state.floatingTexts.splice(i, 1);
    }

    // Update active encounter FX timers
    for (let i = state.activeEncounterFX.length - 1; i >= 0; i--) {
      const fx = state.activeEncounterFX[i];
      fx.timer -= dtReal;
      if (fx.timer <= 0) state.activeEncounterFX.splice(i, 1);
    }

    sound.playHoofPulse(state.spurtTriggered);

    // Lead change commentary
    const sortedNow = getSortedStandings();
    const currLeader = sortedNow[0];
    if (currLeader && !firstFinisher && state.realRaceElapsed > 1.2) {
      if (state.lastLeaderId && state.lastLeaderId !== currLeader.entryId && state.realRaceElapsed - state.lastCommentTime > 1.5) {
        const verb = currLeader.style === 'END' ? '무서운 추입으로 단숨에' : '치고 나오며';
        setCommentary(
          `🔥 선두 교체!! [${currLeader.label}] 주자가 ${verb} 1위로 올라섭니다!!`,
          state.spurtTriggered ? 'LAST SPURT!' : 'LEAD CHANGE',
          state.spurtTriggered ? 'spurt' : ''
        );
        state.lastCommentTime = state.realRaceElapsed;
      }
      state.lastLeaderId = currLeader.entryId;
    }

    if (state.photoFlashAlpha > 0) state.photoFlashAlpha = Math.max(0, state.photoFlashAlpha - dtReal * 2.4);
    if (state.skillCutinTimer > 0) {
      state.skillCutinTimer -= dtReal;
      if (state.skillCutinTimer <= 0) skillCutin.classList.add('hidden');
    }
    if (state.encounterCutinTimer > 0) {
      state.encounterCutinTimer -= dtReal;
      if (state.encounterCutinTimer <= 0) encounterCutin.classList.add('hidden');
    }

    updateMinimapPins();
    updateLeaderboardUI();

    if (firstFinisher) {
      state.finishHoldTimer += dtReal;
      const allFinished = state.runners.every((r) => r.finished);
      if (allFinished || state.finishHoldTimer >= 1.25) {
        state.runners.forEach((r) => {
          if (!r.finished) {
            const rem = Math.max(0.1, state.courseDistance - r.dist);
            r.finishTime = state.raceClock + rem / Math.max(40, r.speed || baseSpeed);
            r.finished = true;
          }
        });
        finalizeRace();
      }
    }
  }

  function updateCamera(dtReal) {
    let targetX = WORLD_W / 2;
    let targetY = WORLD_H / 2;
    let targetZoom = getOverviewZoom();

    if (state.cameraMode === 'FOLLOW') {
      const sorted = getSortedStandings();
      if (sorted.length > 0) {
        // Focus on the exciting front pack (weighted average of top 3, strongly biased toward 1st!)
        const top = sorted.slice(0, Math.min(3, sorted.length));
        let sumX = 0;
        let sumY = 0;
        let sumW = 0;
        let leadTx = 1;
        let leadTy = 0;

        top.forEach((r, idx) => {
          const p = getRunnerWorldPos(r);
          const w = idx === 0 ? 0.62 : idx === 1 ? 0.25 : 0.13;
          sumX += p.x * w;
          sumY += p.y * w;
          sumW += w;
          if (idx === 0) {
            leadTx = p.tx;
            leadTy = p.ty;
          }
        });

        // Look slightly ahead along the track curve so corners & obstacles rush into view!
        const lookAhead = state.phase === 'RACING' ? 95 : 70;
        targetX = sumX / sumW + leadTx * lookAhead;
        targetY = sumY / sumW + leadTy * lookAhead * 0.7;

        const baseFollow = getFollowZoom();
        if (state.photoSlowMoActive) {
          targetZoom = baseFollow * 1.32;
        } else if (state.spurtTriggered) {
          targetZoom = baseFollow * 1.12;
        } else {
          targetZoom = baseFollow;
        }
      } else {
        const g0 = track.sample(0, 0);
        targetX = g0.cx;
        targetY = g0.cy;
        targetZoom = getFollowZoom();
      }
    } else if (state.photoSlowMoActive) {
      // Subtle zoom toward finish wire even in Overview mode
      const g0 = track.sample(0, 0);
      targetX = WORLD_W * 0.5 + (g0.cx - WORLD_W * 0.5) * 0.55;
      targetY = WORLD_H * 0.5 + (g0.cy - WORLD_H * 0.5) * 0.55;
      targetZoom = getOverviewZoom() * 1.65;
    }

    const lerp = Math.min(1, dtReal * 6.5);
    state.camX += (targetX - state.camX) * lerp;
    state.camY += (targetY - state.camY) * lerp;
    state.camZoom += (targetZoom - state.camZoom) * lerp;
  }

  /* =========================================================
   * Giant World-Space Circular Stadium & Close-Up Renderer
   * ========================================================= */
  function resizeRaceCanvas() {
    const rect = raceCanvas.getBoundingClientRect();
    const w = Math.max(320, Math.floor(rect.width || 900));
    const h = Math.max(280, Math.floor(rect.height || 540));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasW = w;
    canvasH = h;
    raceCanvas.width = Math.floor(w * dpr);
    raceCanvas.height = Math.floor(h * dpr);
    raceCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (state.ambientParticles.length === 0) initAmbientParticles();
  }

  function traceClosedPath(ctx, pts) {
    if (!pts || pts.length === 0) return;
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
    }
    ctx.closePath();
  }

  function drawWorldStadium(ctx, st) {
    const N = track.samples.length;
    if (N === 0) return;

    // 1. Giant Outer Cyber Arena Floor
    const outerBg = ctx.createRadialGradient(track.cx, track.cy, 200, track.cx, track.cy, WORLD_W * 0.65);
    outerBg.addColorStop(0, st.bgOuter[1]);
    outerBg.addColorStop(1, st.bgOuter[0]);
    ctx.fillStyle = outerBg;
    ctx.fillRect(-500, -500, WORLD_W + 1000, WORLD_H + 1000);

    // World cyber grid (adds huge sense of speed as camera whips past!)
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x <= WORLD_W; x += 80) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, WORLD_H);
      ctx.stroke();
    }
    for (let y = 0; y <= WORLD_H; y += 80) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WORLD_W, y);
      ctx.stroke();
    }
    ctx.restore();

    // 2. Outer Stadium Grandstand Ring & Twinkling Spectator Crowd
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const s = track.samples[i];
      const gx = s.x + s.nx * (track.halfW + 62);
      const gy = s.y + s.ny * (track.halfW + 62);
      if (i === 0) ctx.moveTo(gx, gy);
      else ctx.lineTo(gx, gy);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(9, 13, 32, 0.9)';
    ctx.fill();
    ctx.strokeStyle = st.railAccent;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    const blinkT = Math.floor(performance.now() / 200);
    for (let i = 0; i < N; i += 4) {
      const s = track.samples[i];
      for (let tier = 0; tier < 3; tier++) {
        const distOut = track.halfW + 18 + tier * 16;
        const px = s.x + s.nx * distOut;
        const py = s.y + s.ny * distOut;
        const seed = (i + tier * 19 + blinkT) % 9;
        ctx.fillStyle =
          seed === 0 ? st.railAccent : seed === 3 ? '#ff2a85' : seed === 6 ? '#ffe600' : 'rgba(255,255,255,0.22)';
        ctx.beginPath();
        ctx.arc(px, py, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 3. Wide Track Surface Ribbon
    ctx.save();
    ctx.beginPath();
    traceClosedPath(ctx, track.outerPts);
    ctx.moveTo(track.innerPts[0].x, track.innerPts[0].y);
    for (let i = N - 1; i >= 0; i--) {
      ctx.lineTo(track.innerPts[i].x, track.innerPts[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = st.trackFill;
    ctx.fill('evenodd');
    ctx.restore();

    // High-Speed Mowed Track Bands around the entire giant loop!
    ctx.save();
    ctx.fillStyle = st.trackAlt;
    const bandStep = 4;
    for (let i = 0; i < N; i += bandStep * 2) {
      ctx.beginPath();
      for (let k = 0; k <= bandStep; k++) {
        const p = track.outerPts[(i + k) % N];
        if (k === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      for (let k = bandStep; k >= 0; k--) {
        const p = track.innerPts[(i + k) % N];
        ctx.lineTo(p.x, p.y);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Dashed Curved Lane Dividers
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 2;
    ctx.setLineDash([14, 14]);
    [-0.5, 0, 0.5].forEach((ln) => {
      ctx.beginPath();
      for (let i = 0; i <= N; i += 3) {
        const s = track.samples[i % N];
        const off = ln * (track.halfW - 6);
        const lx = s.x + s.nx * off;
        const ly = s.y + s.ny * off;
        if (i === 0) ctx.moveTo(lx, ly);
        else ctx.lineTo(lx, ly);
      }
      ctx.closePath();
      ctx.stroke();
    });
    ctx.restore();

    // Final Straight Last Spurt Neon Highlight
    if (state.spurtTriggered) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 42, 133, 0.35)';
      ctx.lineWidth = track.trackW * 0.78;
      ctx.beginPath();
      const startIdx = Math.floor(N * 0.76);
      for (let i = startIdx; i <= N; i += 2) {
        const s = track.samples[i % N];
        if (i === startIdx) ctx.moveTo(s.x, s.y);
        else ctx.lineTo(s.x, s.y);
      }
      ctx.stroke();
      ctx.restore();
    }

    // 4. Giant Infield Arena & Decor
    ctx.save();
    ctx.beginPath();
    traceClosedPath(ctx, track.innerPts);
    const inGrad = ctx.createRadialGradient(track.cx, track.cy, 40, track.cx, track.cy, track.rx * 0.85);
    inGrad.addColorStop(0, st.infield[1]);
    inGrad.addColorStop(1, st.infield[0]);
    ctx.fillStyle = inGrad;
    ctx.fill();

    if (st.key === 'VOLCANO') {
      const magma = ctx.createRadialGradient(track.cx, track.cy + 20, 18, track.cx, track.cy + 20, 210);
      magma.addColorStop(0, 'rgba(255, 210, 60, 0.65)');
      magma.addColorStop(0.45, 'rgba(255, 72, 20, 0.4)');
      magma.addColorStop(1, 'rgba(255, 40, 10, 0)');
      ctx.fillStyle = magma;
      ctx.beginPath();
      ctx.arc(track.cx, track.cy + 20, 210, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.14)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(track.cx, track.cy + 20, 260, 130, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // 5. Glowing Outer & Inner Neon Rails + Fence Posts
    ctx.save();
    ctx.beginPath();
    traceClosedPath(ctx, track.outerPts);
    ctx.strokeStyle = state.spurtTriggered ? '#ff2a85' : st.railAccent;
    ctx.shadowColor = state.spurtTriggered ? '#ff2a85' : st.railAccent;
    ctx.shadowBlur = 16;
    ctx.lineWidth = 5.5;
    ctx.stroke();

    ctx.beginPath();
    traceClosedPath(ctx, track.innerPts);
    ctx.strokeStyle = st.railInner;
    ctx.shadowColor = st.railInner;
    ctx.shadowBlur = 14;
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.restore();

    // Glowing Distance Furlong Posts every 1/12th of the lap!
    const lapM = getLapMeters();
    for (let k = 1; k < 12; k++) {
      const u = k / 12;
      const pt = track.sample(u, 0);
      const px = pt.cx + pt.nx * (track.halfW + 18);
      const py = pt.cy + pt.ny * (track.halfW + 18);
      const remLap = Math.round(lapM * (1 - u));

      ctx.save();
      ctx.fillStyle = '#0c1330';
      ctx.strokeStyle = k >= 10 ? '#ff2a85' : st.railAccent;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(px - 24, py - 11, 48, 22, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 11px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${remLap}m`, px, py);
      ctx.restore();
    }

    // Track Surface Direction Chevrons
    for (let k = 0; k < 16; k++) {
      const pt = track.sample((k + 0.5) / 16, 0);
      ctx.save();
      ctx.translate(pt.cx, pt.cy);
      ctx.rotate(Math.atan2(pt.ty, pt.tx));
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(-12, -14);
      ctx.lineTo(8, 0);
      ctx.lineTo(-12, 14);
      ctx.stroke();
      ctx.restore();
    }

    // 6. Giant Checkered START / GOAL Line across track at u = 0
    const g0 = track.sample(0, 0);
    ctx.save();
    ctx.translate(g0.cx, g0.cy);
    ctx.rotate(Math.atan2(g0.ty, g0.tx));
    const sq = 12;
    for (let y = -track.halfW + 4; y < track.halfW - 4; y += sq) {
      const even = Math.floor((y + track.halfW) / sq) % 2 === 0;
      ctx.fillStyle = even ? '#ffffff' : '#080c1f';
      ctx.fillRect(-10, y, 10, Math.min(sq, track.halfW - 4 - y));
      ctx.fillStyle = even ? '#080c1f' : '#ffffff';
      ctx.fillRect(0, y, 10, Math.min(sq, track.halfW - 4 - y));
    }
    ctx.strokeStyle = '#ffe600';
    ctx.shadowColor = '#ffe600';
    ctx.shadowBlur = 18;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, -track.halfW);
    ctx.lineTo(0, track.halfW);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ff2a85';
    ctx.strokeStyle = '#ffe600';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(-62, track.halfW + 10, 124, 30, 8);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 14px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('START / GOAL', 0, track.halfW + 25);
    ctx.restore();

    // 7. Giant Central Stadium Jumbotron (Visible in Overview & when rounding inner curves!)
    drawInfieldJumbotron(ctx, st);
  }

  function drawInfieldJumbotron(ctx, st) {
    const jx = track.cx;
    const jy = st.key === 'TURF' ? track.cy : track.cy + 85;
    const jw = 340;
    const jh = 140;

    const sorted = getSortedStandings();
    const leader = sorted[0];
    const totalLaps = getTotalLaps();
    const currLap = leader ? Math.min(totalLaps, Math.floor(leader.dist / getLapMeters()) + 1) : 1;

    ctx.save();
    ctx.translate(jx, jy);
    ctx.fillStyle = 'rgba(6, 10, 28, 0.86)';
    ctx.strokeStyle = state.spurtTriggered ? '#ff2a85' : st.railAccent;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.roundRect(-jw / 2, -jh / 2, jw, jh, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = st.railAccent;
    ctx.font = '800 18px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lapText =
      state.phase === 'RACING'
        ? currLap === totalLaps && totalLaps > 1
          ? `FINAL LAP (${currLap}/${totalLaps})`
          : `LAP ${currLap} / ${totalLaps}`
        : `${state.courseDistance}M · ${totalLaps} LAP`;
    ctx.fillText(lapText, 0, -40);

    if (state.phase === 'RACING' && leader) {
      ctx.fillStyle = '#ffe600';
      ctx.font = '900 28px "Noto Sans KR", sans-serif';
      ctx.fillText(`1위 ${leader.label}`, 0, 4);
      const rem = Math.max(0, Math.ceil(state.courseDistance - leader.dist));
      ctx.fillStyle = state.spurtTriggered ? '#ff6ba9' : '#8b9bc4';
      ctx.font = '800 19px Orbitron, sans-serif';
      ctx.fillText(state.spurtTriggered ? `🔥 LAST SPURT ${rem}m` : `REMAIN ${rem}m`, 0, 42);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 26px "Noto Sans KR", sans-serif';
      ctx.fillText(st.shortShape, 0, 4);
      ctx.fillStyle = '#8b9bc4';
      ctx.font = '700 18px "Noto Sans KR", sans-serif';
      const modeLabel =
        state.obstaclesEnabled && state.encountersEnabled
          ? '🚧 장애물 · ⚠️ 돌발 ON'
          : state.obstaclesEnabled
            ? '🚧 장애물 ON'
            : state.encountersEnabled
              ? '⚠️ 돌발 인카운터 ON'
              : '🏁 클린 레이스';
      ctx.fillText(modeLabel, 0, 42);
    }
    ctx.restore();
  }

  function drawObstacleOnCircuit(ctx, obs, st) {
    const pt = track.sample(distToLapU(obs.dist), obs.laneNorm);
    const sc = 1.25;

    ctx.save();
    ctx.globalAlpha = obs.triggered ? 0.22 : 0.96;
    ctx.translate(pt.x, pt.y);

    if (obs.type === 'BOOST') {
      ctx.rotate(Math.atan2(pt.ty, pt.tx));
      ctx.fillStyle = 'rgba(57, 255, 20, 0.3)';
      ctx.strokeStyle = '#39ff14';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(-16 * sc, -9 * sc, 32 * sc, 18 * sc, 5);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      for (let c = -5; c <= 5; c += 8) {
        ctx.beginPath();
        ctx.moveTo((c - 3) * sc, -4.5 * sc);
        ctx.lineTo((c + 3) * sc, 0);
        ctx.lineTo((c - 3) * sc, 4.5 * sc);
        ctx.stroke();
      }
    } else if (obs.type === 'HURDLE') {
      const mainCol =
        st.key === 'DIRT' ? '#39ff14' : st.key === 'ICE' ? '#7ce8ff' : st.key === 'VOLCANO' ? '#ff521c' : '#ff6b00';
      ctx.fillStyle = mainCol;
      ctx.shadowColor = mainCol;
      ctx.shadowBlur = 12;
      ctx.fillRect(-5 * sc, -16 * sc, 10 * sc, 22 * sc);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-5 * sc, -12 * sc, 10 * sc, 4 * sc);
      ctx.fillRect(-5 * sc, -2 * sc, 10 * sc, 4 * sc);
      ctx.shadowBlur = 0;
    } else if (obs.type === 'SLIP') {
      const col = st.key === 'ICE' ? '#a6f4ff' : '#ffe600';
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.ellipse(0, 3, 13 * sc, 6.5 * sc, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = `${Math.round(14 * sc)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(st.key === 'ICE' ? '❄️' : '🍌', 0, -5 * sc);
    } else if (obs.type === 'MUD') {
      const col =
        st.key === 'VOLCANO' ? '#ff4500' : st.key === 'ICE' ? '#4fa8ff' : st.key === 'DIRT' ? '#c98838' : '#8b5cf6';
      ctx.fillStyle = col;
      ctx.globalAlpha *= 0.8;
      ctx.beginPath();
      ctx.ellipse(0, 2, 18 * sc, 8.5 * sc, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.4;
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawEncounterVisualFX(ctx) {
    state.activeEncounterFX.forEach((fx) => {
      const ratio = fx.timer / fx.maxTimer;
      const progress = 1 - ratio;

      if (fx.type === 'DRUNK_STREAKER') {
        // Stumbling drunk spectator running across the track + security guard chasing!
        fx.targetIds.forEach((id) => {
          const r = state.runners.find((u) => u.entryId === id);
          if (!r) return;
          const pos = getRunnerWorldPos(r);
          const vis = Math.min(1, progress * 5, ratio * 3);
          const wobble = Math.sin(performance.now() * 0.022) * 0.35;
          const sx = pos.x + pos.tx * 42 + Math.sin(progress * Math.PI * 3) * 14;
          const sy = pos.y + pos.ty * 42 + (progress - 0.5) * 30;

          ctx.save();
          ctx.globalAlpha = vis;

          // Drunk Spectator Sprite
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(wobble);
          // Body (casual shirt)
          ctx.fillStyle = '#ff5c5c';
          ctx.beginPath();
          ctx.roundRect(-8, -10, 16, 18, 5);
          ctx.fill();
          // Rosy drunk head
          ctx.fillStyle = '#ff9e9e';
          ctx.beginPath();
          ctx.arc(0, -17, 8, 0, Math.PI * 2);
          ctx.fill();
          // Waving beer mug!
          ctx.font = '16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('🍺', 14, -14);
          ctx.font = '900 11px "Noto Sans KR", sans-serif';
          ctx.fillStyle = '#ffe600';
          ctx.fillText('취객!', 0, -30);
          ctx.restore();

          // Security Guard chasing closely behind!
          const gx = sx - pos.nx * 36 - 18;
          const gy = sy - pos.ny * 36 + 6;
          ctx.save();
          ctx.translate(gx, gy);
          ctx.fillStyle = '#1e3a8a';
          ctx.beginPath();
          ctx.roundRect(-8, -10, 16, 18, 4);
          ctx.fill();
          ctx.fillStyle = '#ffe8d6';
          ctx.beginPath();
          ctx.arc(0, -17, 7.5, 0, Math.PI * 2);
          ctx.fill();
          // Security cap
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(-8, -24, 16, 5);
          // Flashing baton / whistle
          ctx.fillStyle = '#00f5ff';
          ctx.font = '900 10px "Noto Sans KR", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('👮 경비원', 0, -30);
          ctx.restore();

          ctx.restore();
        });
      } else if (fx.type === 'THROWN_OBJECT') {
        // Thrown bottle/cup arcing from the outer grandstand right onto the runner!
        fx.targetIds.forEach((id) => {
          const r = state.runners.find((u) => u.entryId === id);
          if (!r) return;
          const pos = getRunnerWorldPos(r);

          ctx.save();
          if (progress < 0.42) {
            const p = progress / 0.42;
            const startX = pos.x + pos.nx * 145;
            const startY = pos.y + pos.ny * 145 - 50;
            const curX = startX + (pos.x - startX) * p;
            const curY = startY + (pos.y - startY) * p - Math.sin(p * Math.PI) * 75;

            ctx.translate(curX, curY);
            ctx.rotate(p * Math.PI * 5);
            ctx.font = '24px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(fx.icon || '🥤', 0, 0);
          } else {
            // Splash / comic bonk impact ring
            const hitP = (progress - 0.42) / 0.58;
            ctx.globalAlpha = Math.max(0, 1 - hitP);
            ctx.strokeStyle = '#ffe600';
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y - 6, 12 + hitP * 38, 0, Math.PI * 2);
            ctx.stroke();

            ctx.font = '20px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(fx.icon || '🥤', pos.x - hitP * 28, pos.y + hitP * 18);
          }
          ctx.restore();
        });
      } else if (fx.type === 'STRAY_PIGEONS') {
        // Flock of flapping pigeons swooping across the runner's path!
        fx.targetIds.forEach((id) => {
          const r = state.runners.find((u) => u.entryId === id);
          if (!r) return;
          const pos = getRunnerWorldPos(r);
          const vis = Math.min(1, progress * 5, ratio * 3);

          ctx.save();
          ctx.globalAlpha = vis;
          for (let b = 0; b < 5; b++) {
            const angle = b * 1.3 + performance.now() * 0.008;
            const bx = pos.x + Math.cos(angle) * (24 + b * 7) + (progress - 0.5) * 45;
            const by = pos.y - 18 + Math.sin(angle * 1.4) * 18 - b * 5;
            const flap = Math.sin(performance.now() * 0.04 + b) * 7;

            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.moveTo(bx - 10, by - flap);
            ctx.quadraticCurveTo(bx - 3, by - 5, bx, by);
            ctx.quadraticCurveTo(bx + 3, by - 5, bx + 10, by - flap);
            ctx.stroke();
          }
          ctx.restore();
        });
      } else if (fx.type === 'SHOE_LOOSE') {
        // Spinning shoe / horseshoe flying backward off the runner's foot!
        fx.targetIds.forEach((id) => {
          const r = state.runners.find((u) => u.entryId === id);
          if (!r) return;
          const pos = getRunnerWorldPos(r);

          ctx.save();
          ctx.globalAlpha = Math.max(0, ratio * 1.3);
          const sx = pos.x - pos.tx * (20 + progress * 75);
          const sy = pos.y - pos.ty * (20 + progress * 75) - Math.sin(progress * Math.PI) * 42;
          ctx.translate(sx, sy);
          ctx.rotate(progress * Math.PI * 6);
          ctx.font = '20px sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('👟', 0, 0);
          ctx.restore();
        });
      }
    });
  }

  /**
   * Corner Mini Circuit Radar (Bottom-Left) so in close-up FOLLOW mode
   * you can ALWAYS see the full circular/curved stadium layout & all horses!
   */
  function drawCornerCircuitRadar(ctx, st) {
    if (state.cameraMode !== 'FOLLOW') return;
    const rw = 154;
    const rh = 96;
    const rx = 12;
    const ry = canvasH - rh - 12;

    ctx.save();
    ctx.fillStyle = 'rgba(5, 9, 24, 0.82)';
    ctx.strokeStyle = st.railAccent;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.roundRect(rx, ry, rw, rh, 10);
    ctx.fill();
    ctx.stroke();

    // Scale world track into radar box
    const pad = 12;
    const scale = Math.min((rw - pad * 2) / WORLD_W, (rh - pad * 2) / WORLD_H);
    const ox = rx + (rw - WORLD_W * scale) / 2;
    const oy = ry + (rh - WORLD_H * scale) / 2;

    // Draw circuit centerline loop
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i < track.samples.length; i += 4) {
      const s = track.samples[i];
      const px = ox + s.x * scale;
      const py = oy + s.y * scale;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = st.railAccent;
    ctx.lineWidth = 1.3;
    ctx.stroke();

    // Gold GOAL tick on radar
    const g0 = track.sample(0, 0);
    ctx.fillStyle = '#ffe600';
    ctx.beginPath();
    ctx.arc(ox + g0.cx * scale, oy + g0.cy * scale, 3.4, 0, Math.PI * 2);
    ctx.fill();

    // Plot every runner on radar!
    const sorted = getSortedStandings();
    const leaderId = sorted[0]?.entryId;
    state.runners.forEach((r) => {
      const pos = getRunnerWorldPos(r);
      const px = ox + pos.x * scale;
      const py = oy + pos.y * scale;
      const isLeader = r.entryId === leaderId;
      ctx.fillStyle = r.color;
      ctx.beginPath();
      ctx.arc(px, py, isLeader ? 4.2 : 2.8, 0, Math.PI * 2);
      ctx.fill();
      if (isLeader) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    });

    // Lap indicator in radar corner
    const leader = sorted[0];
    const totalLaps = getTotalLaps();
    const currLap = leader ? Math.min(totalLaps, Math.floor(leader.dist / getLapMeters()) + 1) : 1;
    ctx.fillStyle = '#8b9bc4';
    ctx.font = '800 8px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`LAP ${currLap}/${totalLaps}`, rx + rw / 2, ry + rh / 2 + 2);

    ctx.restore();
  }

  function drawRaceScene() {
    const ctx = raceCtx;
    const W = canvasW;
    const H = canvasH;
    const st = getActiveStadium();

    ctx.clearRect(0, 0, W, H);
    ctx.save();

    if (state.screenShake > 0.2) {
      ctx.translate((Math.random() - 0.5) * state.screenShake, (Math.random() - 0.5) * state.screenShake);
    }

    // Apply World-to-Screen Camera Transform!
    ctx.translate(W / 2, H / 2);
    ctx.scale(state.camZoom, state.camZoom);
    ctx.translate(-state.camX, -state.camY);

    // 1. Giant Circular / Curved Stadium
    drawWorldStadium(ctx, st);

    // 2. Visible Obstacles near current lap window
    const leaderDist = state.runners.reduce((m, r) => Math.max(m, r.dist), 0);
    const lapM = getLapMeters();
    state.obstacles.forEach((obs) => {
      if (obs.dist >= leaderDist - 150 && obs.dist <= leaderDist + lapM * 0.85) {
        drawObstacleOnCircuit(ctx, obs, st);
      }
    });

    // 3. Dust & Neon Spark Particles
    state.dustParticles.forEach((p) => {
      const alpha = Math.max(0, 1 - p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha * 0.88;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 4. Depth-Sorted Cyber Runners (Big & Detailed up close!)
    const spriteScale = state.cameraMode === 'FOLLOW' ? 1.24 : 1.75;
    const drawList = state.runners.map((r) => ({ r, pos: getRunnerWorldPos(r) }));
    drawList.sort((a, b) => a.pos.y - b.pos.y);

    drawList.forEach(({ r, pos }) => {
      r.afterimages.forEach((img) => {
        drawCyberRunner(ctx, img.x, img.y, img.tx, r, spriteScale, img.alpha * 0.45, true);
      });
      drawCyberRunner(ctx, pos.x, pos.y, pos.tx, r, spriteScale, 1, false);
    });

    // 5. Jostle / Body-Check Clash Sparks!
    state.clashSparks.forEach((s) => {
      const alpha = Math.max(0, 1 - s.life / s.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // 6. Encounter Visual FX (Boss, UFO, Lightning, Meteors)
    drawEncounterVisualFX(ctx);

    // 7. Floating Combat / Clash / Status Popups
    state.floatingTexts.forEach((ft) => {
      const alpha = Math.max(0, 1 - ft.life / ft.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      const fs = state.cameraMode === 'FOLLOW' ? 15 : 24;
      ctx.font = `900 ${fs}px "Noto Sans KR", sans-serif`;
      ctx.textAlign = 'center';
      ctx.strokeStyle = 'rgba(5, 6, 17, 0.94)';
      ctx.lineWidth = 4;
      ctx.strokeText(ft.text, ft.x, ft.y);
      ctx.fillStyle = ft.color;
      ctx.fillText(ft.text, ft.x, ft.y);
      ctx.restore();
    });

    ctx.restore(); // back to Screen Space

    // 8. Screen-Space Wind Storm Streaks (for HEADWIND / BLIZZARD / SANDSTORM)
    state.activeEncounterFX.forEach((fx) => {
      if (fx.type !== 'WIND') return;
      const ratio = fx.timer / fx.maxTimer;
      ctx.save();
      ctx.globalAlpha = Math.min(0.65, ratio * 1.4);
      ctx.strokeStyle = fx.color || '#7ce8ff';
      ctx.lineWidth = 2.4;
      const t = performance.now() * 1.1;
      for (let i = 0; i < 18; i++) {
        const y = (i * 35) % H;
        const x = W - ((t + i * 130) % (W + 180));
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 95, y);
        ctx.stroke();
      }
      ctx.restore();
    });

    // 9. Ambient Weather Particles
    if (state.ambientParticles.length > 0) {
      ctx.save();
      state.ambientParticles.forEach((p) => {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = st.ambient === 'SNOW' ? '#e8faff' : st.ambient === 'EMBERS' ? '#ff7b29' : '#ffd28a';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    // 10. High-Speed Anime Action Lines during Last Spurt!
    if (state.phase === 'RACING' && state.spurtTriggered) {
      ctx.save();
      const t = performance.now() * 0.025;
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.24)';
      ctx.lineWidth = 2.2;
      for (let i = 0; i < 14; i++) {
        const y = i < 7 ? 5 + i * 8 : H - 5 - (i - 7) * 8;
        const x = W - ((t * (20 + (i % 4) * 8) + i * 180) % (W + 220));
        const len = 70 + (i % 3) * 50;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + len, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 11. Bottom-Left Mini Circuit Radar (in Close-Up Follow Mode)
    drawCornerCircuitRadar(ctx, st);

    // 12. Photo Finish Camera Flash
    if (state.photoFlashAlpha > 0) {
      ctx.fillStyle = `rgba(255, 255, 255, ${state.photoFlashAlpha})`;
      ctx.fillRect(0, 0, W, H);
    }
  }

  function drawCyberRunner(ctx, x, y, tx, r, scale, alpha, isGhost) {
    const isRunning = state.phase === 'RACING' || r.speed > 5;
    const progress = r.dist / state.courseDistance;
    const isEndRocket = r.style === 'END' && progress > 0.68 && !r.finished && state.phase === 'RACING';
    const stride = isRunning ? r.stridePhase : 0;
    const jumpArc = r.jumpTimer > 0 ? Math.sin((r.jumpTimer / 0.45) * Math.PI) * -24 * scale : 0;
    const debuffLift = r.debuff && r.debuff.liftY ? r.debuff.liftY * scale : 0;
    const wobble = r.debuff || r.stumbleTimer > 0 ? Math.sin(performance.now() * 0.032) * 0.15 : 0;
    const bob =
      (isRunning ? Math.abs(Math.sin(stride)) * -5.5 * scale : Math.sin(performance.now() * 0.005 + r.gate) * 1.1 * scale) +
      jumpArc +
      debuffLift;
    const facing = tx < -0.05 ? -1 : 1;
    const lean =
      (isRunning ? (r.skillTimer > 0 || r.buffTimer > 0 || r.duelTimer > 0 || isEndRocket ? 0.27 : 0.15) : 0.02) + wobble;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y + bob);

    // Ground shadow
    if (!isGhost) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.46)';
      ctx.beginPath();
      ctx.ellipse(0, 12.5 * scale - bob, 13.5 * scale, 4.4 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Skill / Turbo / Duel / End-Closer Overdrive Aura!
    if ((r.skillTimer > 0 || r.buffTimer > 0 || r.duelTimer > 0 || isEndRocket) && !isGhost) {
      ctx.save();
      const auraColor =
        r.duelTimer > 0 ? '#ffe600' : r.buffTimer > 0 ? '#39ff14' : isEndRocket ? '#b026ff' : r.color;
      const auraGrad = ctx.createRadialGradient(0, 0, 3 * scale, 0, 0, 30 * scale);
      auraGrad.addColorStop(0, '#ffffff');
      auraGrad.addColorStop(0.35, auraColor);
      auraGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.globalAlpha = 0.58 + Math.sin(performance.now() * 0.028) * 0.2;
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(0, -2 * scale, 30 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Debuff Danger Halo
    if (r.debuff && !isGhost) {
      ctx.save();
      ctx.strokeStyle = r.debuff.color;
      ctx.lineWidth = 2.4;
      ctx.setLineDash([5, 3]);
      ctx.beginPath();
      ctx.arc(0, -2 * scale, 22 * scale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    ctx.scale(facing, 1);
    ctx.rotate(lean);

    // Flowing Ponytail / Racing Ribbon
    const tailWave = Math.sin(stride * 1.4) * 5 * scale;
    ctx.strokeStyle = isEndRocket ? '#ffe600' : r.color;
    ctx.lineWidth = 4.2 * scale;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-6 * scale, -7 * scale);
    ctx.quadraticCurveTo(-18 * scale, -9 * scale + tailWave, -26 * scale, -2 * scale - tailWave * 0.7);
    ctx.stroke();

    // Animated Striding Legs
    const legA = Math.sin(stride) * 11 * scale;
    const legB = Math.sin(stride + Math.PI) * 11 * scale;

    ctx.lineWidth = 3.6 * scale;
    ctx.strokeStyle = '#d8e4ff';
    ctx.beginPath();
    ctx.moveTo(-1 * scale, 4 * scale);
    ctx.lineTo(-1 * scale + legB * 0.65, 13 * scale);
    ctx.stroke();

    ctx.strokeStyle = r.debuff && r.debuff.type === 'SPRAIN' ? '#ff9f43' : '#ffffff';
    ctx.beginPath();
    ctx.moveTo(1 * scale, 4 * scale);
    ctx.lineTo(1 * scale + legA * 0.75, 13 * scale);
    ctx.stroke();

    // Racing Jersey
    ctx.fillStyle = r.color;
    ctx.shadowColor = r.color;
    ctx.shadowBlur = isGhost ? 0 : 10;
    ctx.beginPath();
    ctx.roundRect(-6.5 * scale, -7 * scale, 13 * scale, 12 * scale, 4 * scale);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.6 * scale;
    ctx.beginPath();
    ctx.moveTo(-4 * scale, -6 * scale);
    ctx.lineTo(4 * scale, 4 * scale);
    ctx.stroke();

    // Pumping Arm
    const armSwing = Math.sin(stride + Math.PI) * 7 * scale;
    ctx.strokeStyle = '#ffe5d4';
    ctx.lineWidth = 2.5 * scale;
    ctx.beginPath();
    ctx.moveTo(1 * scale, -3 * scale);
    ctx.lineTo(4 * scale + armSwing * 0.6, 2 * scale);
    ctx.stroke();

    // Head
    ctx.fillStyle = '#ffe8d6';
    ctx.beginPath();
    ctx.arc(2 * scale, -12 * scale, 6.1 * scale, 0, Math.PI * 2);
    ctx.fill();

    // Hair & Uma Musume Horse Ears
    ctx.fillStyle = '#141c3d';
    ctx.beginPath();
    ctx.arc(1 * scale, -13.5 * scale, 6.1 * scale, Math.PI * 0.85, Math.PI * 2.1);
    ctx.fill();

    ctx.fillStyle = '#1a244f';
    ctx.strokeStyle = r.color;
    ctx.lineWidth = 1.35 * scale;
    ctx.beginPath();
    ctx.moveTo(-2 * scale, -17 * scale);
    ctx.lineTo(-5 * scale, -25 * scale);
    ctx.lineTo(1 * scale, -19 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(2 * scale, -17.5 * scale);
    ctx.lineTo(3 * scale, -26 * scale);
    ctx.lineTo(6.5 * scale, -18.5 * scale);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cyber Visor
    ctx.fillStyle = r.debuff ? '#ff3864' : r.duelTimer > 0 ? '#ffe600' : r.color;
    ctx.fillRect(4 * scale, -13.5 * scale, 4.4 * scale, 2.3 * scale);

    ctx.restore(); // undo flip & lean

    // Upright Crisp Nameplate Centered Above Runner!
    if (!isGhost) {
      const fontSize = state.cameraMode === 'FOLLOW' ? 11.5 : 18;
      ctx.font = `800 ${fontSize}px "Noto Sans KR", sans-serif`;
      const shortName = r.label.length > 8 ? r.label.slice(0, 7) + '…' : r.label;
      const prefix = r.debuff ? `${r.debuff.icon} ` : r.duelTimer > 0 ? '🔥 ' : '';
      const displayStr = `${prefix}${shortName}`;
      const textW = ctx.measureText(displayStr).width;
      const badgeW = state.cameraMode === 'FOLLOW' ? 17 : 26;
      const pillW = badgeW + textW + 12;
      const pillH = state.cameraMode === 'FOLLOW' ? 19 : 28;
      const tagX = -pillW / 2;
      const tagY = -29 * scale - pillH;

      ctx.fillStyle = r.debuff ? 'rgba(48, 8, 20, 0.92)' : 'rgba(6, 10, 26, 0.86)';
      ctx.strokeStyle = r.debuff ? r.debuff.color : r.duelTimer > 0 || r.skillTimer > 0 ? '#ffe600' : r.color;
      ctx.lineWidth = r.debuff || r.duelTimer > 0 || r.skillTimer > 0 ? 2 : 1.3;
      ctx.beginPath();
      ctx.roundRect(tagX, tagY, pillW, pillH, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = r.color;
      ctx.beginPath();
      ctx.roundRect(tagX + 2, tagY + 2, badgeW - 2, pillH - 4, 4);
      ctx.fill();

      ctx.fillStyle = '#050611';
      ctx.font = `900 ${Math.round(fontSize * 0.82)}px Orbitron, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(r.gate), tagX + 2 + (badgeW - 2) / 2, tagY + pillH / 2);

      ctx.fillStyle = '#ffffff';
      ctx.font = `700 ${fontSize}px "Noto Sans KR", sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(displayStr, tagX + badgeW + 4, tagY + pillH / 2 + 0.5);
    }

    ctx.restore();
  }

  /* =========================================================
   * Main RAF Loop
   * ========================================================= */
  let lastNow = performance.now();

  function frame(now) {
    const dtReal = Math.min(0.05, (now - lastNow) / 1000);
    lastNow = now;

    updateRacePhysics(dtReal);
    drawRaceScene();
    confetti.updateAndDraw(dtReal * 60);

    requestAnimationFrame(frame);
  }

  /* =========================================================
   * Paddock & Control Deck UI Rendering
   * ========================================================= */
  function isBusy() {
    return state.phase === 'COUNTDOWN' || state.phase === 'RACING';
  }

  function syncControlsLock() {
    const busy = isBusy();
    const hasActive = getActiveEntries().length > 0;
    startRaceBtn.disabled = busy || !hasActive;
    shuffleGateBtn.disabled = busy || getActiveEntries().length < 2;
    distanceGroup.querySelectorAll('.seg-btn').forEach((b) => {
      b.disabled = busy;
    });
    stadiumGroup.querySelectorAll('.seg-btn').forEach((b) => {
      b.disabled = busy;
    });
  }

  function syncSoundButton() {
    soundToggleBtn.classList.toggle('active', state.soundEnabled);
    soundToggleBtn.setAttribute('aria-pressed', String(state.soundEnabled));
    soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
    soundToggleBtn.querySelector('.btn-text').textContent = state.soundEnabled ? 'SFX ON' : 'SFX OFF';
  }

  function syncStadiumButtons() {
    stadiumGroup.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.stadium === state.selectedStadium);
    });
  }

  function syncDistanceButtons() {
    distanceGroup.querySelectorAll('.seg-btn').forEach((btn) => {
      btn.classList.toggle('active', Number(btn.dataset.dist) === state.courseDistance);
    });
    if (!isBusy()) {
      distanceRemaining.textContent = `${state.courseDistance}m`;
    }
  }

  function syncCameraButton() {
    const isFollow = state.cameraMode === 'FOLLOW';
    cameraToggleBtn.textContent = isFollow ? '🎥 밀착 추적' : '🗺️ 전체 조감도';
    cameraToggleBtn.classList.toggle('fast', isFollow);
  }

  function renderEntries(syncTrack = true) {
    const active = getActiveEntries();
    const excludedCount = state.entries.length - active.length;

    activeCountBadge.textContent = String(active.length);
    excludedCountText.textContent = String(excludedCount);
    restoreAllBtn.classList.toggle('hidden', excludedCount === 0);
    syncControlsLock();

    entryList.innerHTML = '';

    if (state.entries.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-state';
      empty.innerHTML = '출전 주자가 없습니다.<br />위 입력창이나 <strong>프리셋</strong> 탭에서 주자를 등록해 보세요!';
      entryList.appendChild(empty);
      if (syncTrack && !isBusy()) buildGateRunners(false);
      return;
    }

    let gateNum = 0;
    state.entries.forEach((entry) => {
      if (!entry.excluded) gateNum++;
      const li = document.createElement('li');
      li.className = `entry-item${entry.excluded ? ' excluded' : ''}`;

      const gate = document.createElement('span');
      gate.className = 'gate-badge';
      gate.style.backgroundColor = entry.excluded ? '#404b69' : entry.color;
      gate.style.color = entry.excluded ? '#9aa6c4' : '#050611';
      gate.textContent = entry.excluded ? '—' : String(gateNum);

      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.className = 'entry-name-input';
      nameInput.value = entry.label;
      nameInput.maxLength = 32;
      nameInput.addEventListener('change', () => {
        if (isBusy()) {
          nameInput.value = entry.label;
          return;
        }
        const trimmed = nameInput.value.trim();
        if (trimmed) {
          entry.label = trimmed;
          saveState();
          buildGateRunners(false);
        } else {
          nameInput.value = entry.label;
        }
      });

      const styleBtn = document.createElement('button');
      styleBtn.type = 'button';
      styleBtn.className = `style-cycle-btn style-${entry.style}`;
      styleBtn.title = '클릭해서 각질 변경 (랜덤 / 도주 / 선행 / 선입 / 추입)';
      styleBtn.textContent = STYLE_META[entry.style].label;
      styleBtn.addEventListener('click', () => {
        if (isBusy()) return;
        const nextIdx = (STYLE_ORDER.indexOf(entry.style) + 1) % STYLE_ORDER.length;
        entry.style = STYLE_ORDER[nextIdx];
        saveState();
        renderEntries();
      });

      const weightWrap = document.createElement('div');
      weightWrap.className = 'weight-control';
      weightWrap.title = '우승 확률 비중 조절';

      const minusBtn = document.createElement('button');
      minusBtn.type = 'button';
      minusBtn.className = 'weight-btn';
      minusBtn.textContent = '−';
      minusBtn.addEventListener('click', () => {
        if (isBusy()) return;
        entry.weight = Math.max(1, entry.weight - 1);
        saveState();
        renderEntries();
      });

      const weightVal = document.createElement('span');
      weightVal.className = 'weight-val';
      weightVal.textContent = `×${entry.weight}`;

      const plusBtn = document.createElement('button');
      plusBtn.type = 'button';
      plusBtn.className = 'weight-btn';
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', () => {
        if (isBusy()) return;
        entry.weight = Math.min(20, entry.weight + 1);
        saveState();
        renderEntries();
      });

      weightWrap.append(minusBtn, weightVal, plusBtn);

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'entry-action-btn';
      toggleBtn.title = entry.excluded ? '다시 출전시키기' : '이번 레이스 제외';
      toggleBtn.textContent = entry.excluded ? '↺' : '👁';
      toggleBtn.addEventListener('click', () => {
        if (isBusy()) return;
        entry.excluded = !entry.excluded;
        saveState();
        renderEntries();
      });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'entry-action-btn delete';
      delBtn.title = '삭제';
      delBtn.textContent = '✕';
      delBtn.addEventListener('click', () => {
        if (isBusy()) return;
        state.entries = state.entries.filter((e) => e.id !== entry.id);
        saveState();
        renderEntries();
      });

      li.append(gate, nameInput, styleBtn, weightWrap, toggleBtn, delBtn);
      entryList.appendChild(li);
    });

    if (syncTrack && !isBusy()) {
      buildGateRunners(false);
    }
  }

  function renderPresets() {
    presetGrid.innerHTML = '';
    PRESETS.forEach((preset) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-card';

      const preview = preset.items
        .map((it) => (typeof it === 'string' ? it : `${it.label}${it.weight > 1 ? `(×${it.weight})` : ''}`))
        .join(' · ');

      btn.innerHTML = `
        <span class="preset-card-title">${preset.title}</span>
        <span class="preset-card-items">${preview}</span>
      `;
      btn.addEventListener('click', () => {
        if (isBusy()) return;
        applyPreset(preset, true);
        switchTab('entries');
      });
      presetGrid.appendChild(btn);
    });
  }

  function applyPreset(preset, shouldSave = true) {
    state.entries = preset.items.map((item, idx) => {
      if (typeof item === 'string') return makeEntry(item, 1, idx, 'AUTO');
      return makeEntry(item.label, item.weight || 1, idx, item.style || 'AUTO');
    });
    if (shouldSave) {
      saveState();
      renderEntries();
      setCommentary('새 프리셋 출전 명단이 게이트에 배치되었습니다!', 'READY');
    }
  }

  function renderHistory() {
    historyCountBadge.textContent = String(state.history.length);
    historyList.innerHTML = '';

    if (state.history.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-state';
      empty.innerHTML = '아직 우승 기록이 없습니다.<br />첫 번째 G1 레이스를 시작해 보세요!';
      historyList.appendChild(empty);
      return;
    }

    state.history.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'history-item';

      const left = document.createElement('div');
      left.className = 'history-left';

      const rank = document.createElement('span');
      rank.className = 'history-rank';
      rank.textContent = `G1 #${state.history.length - idx}`;

      const dot = document.createElement('span');
      dot.className = 'lb-dot';
      dot.style.backgroundColor = item.color || '#00f5ff';
      dot.style.boxShadow = `0 0 6px ${item.color || '#00f5ff'}`;

      const name = document.createElement('span');
      name.className = 'history-name';
      name.textContent = item.label;

      left.append(rank, dot, name);

      const meta = document.createElement('span');
      meta.className = 'history-meta';
      const styleLabel = item.style && STYLE_META[item.style] ? STYLE_META[item.style].short : '';
      const stadiumShort = item.stadium ? item.stadium.split(' ')[0] : '';
      meta.textContent = `${stadiumShort} ${item.distance || 1200}m · ${styleLabel} · ${item.record || item.time}`;

      li.append(left, meta);
      historyList.appendChild(li);
    });
  }

  /* =========================================================
   * Result Modal
   * ========================================================= */
  let modalWinnerId = null;

  function openResultModal(standings, recordStr, autoExcludedNow) {
    const winner = standings[0];
    modalWinnerId = winner.entryId;

    modalGlowBar.style.background = winner.color;
    modalGlowBar.style.boxShadow = `0 0 24px ${winner.color}`;

    winnerBadge.textContent = `🏆 ${winner.gate}번 게이트 · 1착`;
    winnerStylePill.textContent = STYLE_META[winner.style].label;
    winnerTimePill.textContent = `${getActiveStadium().name} · ${state.courseDistance}m · ${recordStr}`;

    winnerTitle.textContent = winner.label;
    winnerTitle.style.textShadow = `0 0 18px ${winner.color}, 0 0 38px rgba(255, 42, 133, 0.45)`;

    const remaining = getActiveEntries().length;
    if (autoExcludedNow) {
      winnerSubtext.textContent =
        remaining > 0
          ? `우승 자동 제외가 켜져 있어 다음 레이스에서 제외됩니다. (남은 주자 ${remaining}명)`
          : '모든 주자가 우승했습니다! 제외 복구 버튼으로 다시 시작할 수 있어요.';
      modalExcludeBtn.classList.add('hidden');
    } else {
      winnerSubtext.textContent = '격렬한 몸싸움과 돌발 변수를 뚫고 영광의 1착으로 결승선을 통과했습니다!';
      modalExcludeBtn.classList.remove('hidden');
    }

    standingsList.innerHTML = '';
    const winTime = winner.finishTime || state.raceClock;
    const baseSpeed = getCourseBaseSpeed();

    standings.forEach((r, idx) => {
      const li = document.createElement('li');
      li.className = `standing-row${idx === 0 ? ' first' : ''}`;

      const timeDiff = Math.max(0, (r.finishTime || winTime) - winTime);
      const distGap = timeDiff * baseSpeed;
      const marginText = idx === 0 ? recordStr : `${formatMargin(distGap)} (+${(timeDiff * 6.8).toFixed(2)}s)`;

      li.innerHTML = `
        <span class="standing-rank">${idx === 0 ? '🥇 1착' : idx === 1 ? '🥈 2착' : idx === 2 ? '🥉 3착' : `${idx + 1}착`}</span>
        <span class="standing-runner">
          <span class="lb-dot" style="background:${r.color}"></span>
          <span class="standing-runner-name"></span>
          <span class="lb-style">${STYLE_META[r.style].short}</span>
        </span>
        <span class="standing-margin">${marginText}</span>
      `;
      li.querySelector('.standing-runner-name').textContent = r.label;
      standingsList.appendChild(li);
    });

    modalRaceAgainBtn.disabled = remaining === 0;
    modalRaceAgainBtn.textContent = remaining === 0 ? '남은 주자 없음' : '🏁 다시 레이스';

    resultModal.classList.remove('hidden');
  }

  function closeModal() {
    resultModal.classList.add('hidden');
  }

  /* =========================================================
   * Events & Interactions
   * ========================================================= */
  function switchTab(tabName) {
    document.querySelectorAll('.deck-tab').forEach((btn) => {
      const active = btn.dataset.tab === tabName;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.tab-panel').forEach((panel) => {
      panel.classList.toggle('active', panel.id === `tab-${tabName}`);
    });
  }

  document.querySelectorAll('.deck-tab').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  startRaceBtn.addEventListener('click', startRace);

  shuffleGateBtn.addEventListener('click', () => {
    if (isBusy()) return;
    for (let i = state.entries.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.entries[i], state.entries[j]] = [state.entries[j], state.entries[i]];
    }
    sound.playCountdownBeep(false);
    saveState();
    renderEntries();
    setCommentary('🔀 게이트 번호가 무작위로 재배정되었습니다!', 'SHUFFLED');
  });

  stadiumGroup.querySelectorAll('.seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isBusy()) return;
      state.selectedStadium = btn.dataset.stadium || 'TURF';
      syncStadiumButtons();
      if (state.selectedStadium !== 'RANDOM') {
        applyStadiumTheme(state.selectedStadium);
        setCommentary(`[${getActiveStadium().name}] (${getActiveStadium().shortShape}) 선택 완료!`, 'STADIUM');
      } else {
        setCommentary('🎲 레이스 시작 시 4개의 원형·굴절 경기장 중 하나가 무작위로 선택됩니다!', 'RANDOM');
      }
      saveState();
    });
  });

  distanceGroup.querySelectorAll('.seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isBusy()) return;
      state.courseDistance = Number(btn.dataset.dist) || 1200;
      syncDistanceButtons();
      saveState();
      buildGateRunners(false);
    });
  });

  cameraToggleBtn.addEventListener('click', () => {
    state.cameraMode = state.cameraMode === 'FOLLOW' ? 'OVERVIEW' : 'FOLLOW';
    syncCameraButton();
    if (!isBusy()) snapCameraToStart();
    saveState();
  });

  speedToggleBtn.addEventListener('click', () => {
    if (state.speedMultiplier === 1.0) state.speedMultiplier = 1.5;
    else if (state.speedMultiplier === 1.5) state.speedMultiplier = 2.0;
    else state.speedMultiplier = 1.0;

    speedToggleBtn.textContent = state.speedMultiplier === 1.0 ? '1.0x' : `${state.speedMultiplier.toFixed(1)}x ⚡`;
    speedToggleBtn.classList.toggle('fast', state.speedMultiplier > 1.0);
  });

  window.addEventListener('keydown', (e) => {
    const tag = document.activeElement?.tagName;
    const isTyping = tag === 'INPUT' || tag === 'TEXTAREA';

    if (e.key === 'Escape' && !resultModal.classList.contains('hidden')) {
      closeModal();
      return;
    }

    if (e.code === 'Space' && !isTyping && resultModal.classList.contains('hidden')) {
      e.preventDefault();
      if (!e.repeat && !isBusy()) startRace();
    }
  });

  obstaclesToggle.addEventListener('change', () => {
    state.obstaclesEnabled = obstaclesToggle.checked;
    saveState();
    setCommentary(
      state.obstaclesEnabled
        ? '🚧 트랙 물리 장애물(허들·빙판·늪지·터보 패드)이 활성화되었습니다!'
        : '🚧 트랙 물리 장애물이 비활성화되었습니다.',
      state.obstaclesEnabled ? 'OBSTACLE ON' : 'OBSTACLE OFF'
    );
  });

  encountersToggle.addEventListener('change', () => {
    state.encountersEnabled = encountersToggle.checked;
    saveState();
    setCommentary(
      state.encountersEnabled
        ? '⚠️ 랜덤 돌발 인카운터(취객 난입·관중 투척물·발목 삠·비둘기 떼 등)가 활성화되었습니다!'
        : '⚠️ 랜덤 돌발 인카운터가 비활성화되었습니다.',
      state.encountersEnabled ? 'EVENT ON' : 'EVENT OFF'
    );
  });

  eliminationToggle.addEventListener('change', () => {
    state.autoExclude = eliminationToggle.checked;
    saveState();
  });

  soundToggleBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    sound.enabled = state.soundEnabled;
    syncSoundButton();
    if (state.soundEnabled) sound.playCountdownBeep(false);
    saveState();
  });

  addEntryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isBusy()) return;
    const val = entryInput.value.trim();
    if (!val) return;
    state.entries.push(makeEntry(val, 1, state.entries.length, 'AUTO'));
    entryInput.value = '';
    saveState();
    renderEntries();
    entryInput.focus();
  });

  restoreAllBtn.addEventListener('click', () => {
    if (isBusy()) return;
    state.entries.forEach((e) => {
      e.excluded = false;
    });
    saveState();
    renderEntries();
    setCommentary('↺ 제외되었던 모든 주자가 게이트로 복귀했습니다!', 'RESTORED');
  });

  clearEntriesBtn.addEventListener('click', () => {
    if (isBusy() || state.entries.length === 0) return;
    state.entries = [];
    saveState();
    renderEntries();
  });

  bulkToggleBtn.addEventListener('click', () => {
    bulkPanel.classList.toggle('hidden');
    if (!bulkPanel.classList.contains('hidden')) {
      bulkTextarea.value = state.entries.map((e) => e.label).join('\n');
      bulkTextarea.focus();
    }
  });

  bulkCancelBtn.addEventListener('click', () => bulkPanel.classList.add('hidden'));

  function parseBulkLines() {
    return bulkTextarea.value
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .slice(0, 24);
  }

  bulkReplaceBtn.addEventListener('click', () => {
    if (isBusy()) return;
    const lines = parseBulkLines();
    if (lines.length === 0) return;
    state.entries = lines.map((label, idx) => makeEntry(label, 1, idx, 'AUTO'));
    bulkPanel.classList.add('hidden');
    saveState();
    renderEntries();
  });

  bulkAppendBtn.addEventListener('click', () => {
    if (isBusy()) return;
    const lines = parseBulkLines();
    if (lines.length === 0) return;
    const baseIdx = state.entries.length;
    lines.forEach((label, i) => {
      if (state.entries.length < 24) {
        state.entries.push(makeEntry(label, 1, baseIdx + i, 'AUTO'));
      }
    });
    bulkPanel.classList.add('hidden');
    saveState();
    renderEntries();
  });

  generateNumbersBtn.addEventListener('click', () => {
    if (isBusy()) return;
    let start = parseInt(numStart.value, 10);
    let end = parseInt(numEnd.value, 10);
    if (Number.isNaN(start)) start = 1;
    if (Number.isNaN(end)) end = 8;
    if (start > end) [start, end] = [end, start];

    const count = Math.min(24, end - start + 1);
    const items = [];
    for (let i = 0; i < count; i++) {
      items.push(makeEntry(`${start + i}번`, 1, i, 'AUTO'));
    }
    state.entries = items;
    saveState();
    renderEntries();
    switchTab('entries');
    setCommentary(`🔢 ${start}번 ~ ${start + count - 1}번 주자들이 게이트에 입장했습니다!`, 'READY');
  });

  clearHistoryBtn.addEventListener('click', () => {
    state.history = [];
    saveState();
    renderHistory();
  });

  modalCloseBtn.addEventListener('click', closeModal);
  resultModal.addEventListener('click', (e) => {
    if (e.target === resultModal) closeModal();
  });

  modalExcludeBtn.addEventListener('click', () => {
    if (modalWinnerId) {
      const target = state.entries.find((e) => e.id === modalWinnerId);
      if (target) target.excluded = true;
      saveState();
      renderEntries();
    }
    closeModal();
  });

  modalRaceAgainBtn.addEventListener('click', () => {
    closeModal();
    if (getActiveEntries().length > 0) startRace();
  });

  /* =========================================================
   * Mobile Audio Unlock & Orientation Resize
   * ========================================================= */
  const unlockMobileAudio = () => {
    const ctx = sound.ensure();
    if (ctx) {
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    }
    window.removeEventListener('touchstart', unlockMobileAudio);
    window.removeEventListener('pointerdown', unlockMobileAudio);
  };
  window.addEventListener('touchstart', unlockMobileAudio, { passive: true });
  window.addEventListener('pointerdown', unlockMobileAudio, { passive: true });

  /* =========================================================
   * Bootstrap
   * ========================================================= */
  window.addEventListener('resize', () => {
    resizeRaceCanvas();
    if (!isBusy()) snapCameraToStart();
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      resizeRaceCanvas();
      if (!isBusy()) snapCameraToStart();
    }, 180);
  });
  resizeRaceCanvas();
  loadState();
  renderPresets();
  renderEntries();
  renderHistory();
  requestAnimationFrame(frame);
})();
