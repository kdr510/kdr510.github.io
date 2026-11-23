(() => {
  'use strict';

  /* =========================================================
   * Constants, 3D Curved Stadiums, Styles, Skills & Presets
   * ========================================================= */
  const STORAGE_KEY = 'neon_derby_state_v4';

  const NEON_PALETTE = [
    '#00f5ff', '#ff2a85', '#39ff14', '#ffe600',
    '#b026ff', '#ff6b00', '#2979ff', '#ff3864',
    '#00ffa3', '#c6ff00', '#ff70d9', '#4deeea',
  ];

  const STADIUM_KEYS = ['TURF', 'DIRT', 'ICE', 'VOLCANO'];

  const STADIUMS = {
    TURF: {
      key: 'TURF',
      name: '🌿 네온 잔디 오벌',
      shortShape: '3D 클래식 오벌',
      badge: '3D G1 CYBER OVAL',
      skyBg: 0x070d24,
      fogColor: 0x080f29,
      groundColor: 0x08231c,
      infieldColor: 0x0b3629,
      trackBaseHex: '#0f4c3a',
      trackStripeHex: '#155c46',
      railOuter: 0x00f5ff,
      railInner: 0x39ff14,
      railAccentCss: '#00f5ff',
      dustColor: 0x8aff9e,
      ambientLight: 0x99ccff,
      sunColor: 0xdff6ff,
      ambientWeather: 'NONE',
      minimapBg: 'linear-gradient(90deg, rgba(16, 46, 36, 0.9), rgba(14, 70, 52, 0.9))',
      minimapBorder: 'rgba(57, 255, 20, 0.32)',
      cornerLabels: ['1·2코너', '백스트레치', '3·4코너'],
    },
    DIRT: {
      key: 'DIRT',
      name: '🏜️ 사막 굴절 서킷',
      shortShape: '3D S자 굴절 캐니언',
      badge: '3D CANYON CHICANE',
      skyBg: 0x1b0b12,
      fogColor: 0x261015,
      groundColor: 0x331910,
      infieldColor: 0x452216,
      trackBaseHex: '#6e3d23',
      trackStripeHex: '#804a2b',
      railOuter: 0xff9f43,
      railInner: 0xffe600,
      railAccentCss: '#ff9f43',
      dustColor: 0xffd28a,
      ambientLight: 0xffb88c,
      sunColor: 0xffe0aa,
      ambientWeather: 'SAND',
      minimapBg: 'linear-gradient(90deg, rgba(78, 42, 22, 0.92), rgba(112, 58, 28, 0.92))',
      minimapBorder: 'rgba(255, 159, 67, 0.45)',
      cornerLabels: ['캐니언 1코너', 'S자 굴절 구간', '사막 4코너'],
    },
    ICE: {
      key: 'ICE',
      name: '❄️ 빙하 굴절 서킷',
      shortShape: '3D 빙하 헤어핀',
      badge: '3D GLACIER CIRCUIT',
      skyBg: 0x051026,
      fogColor: 0x081a38,
      groundColor: 0x0b223d,
      infieldColor: 0x113659,
      trackBaseHex: '#1c5685',
      trackStripeHex: '#256ba1',
      railOuter: 0x7ce8ff,
      railInner: 0x00f5ff,
      railAccentCss: '#7ce8ff',
      dustColor: 0xd0f7ff,
      ambientLight: 0xa8e0ff,
      sunColor: 0xe6fbff,
      ambientWeather: 'SNOW',
      minimapBg: 'linear-gradient(90deg, rgba(18, 56, 86, 0.92), rgba(32, 92, 134, 0.92))',
      minimapBorder: 'rgba(124, 232, 255, 0.48)',
      cornerLabels: ['빙벽 드래프트', '빙하 굴절 헤어핀', '오로라 4코너'],
    },
    VOLCANO: {
      key: 'VOLCANO',
      name: '🌋 볼케이노 링',
      shortShape: '3D 더블 굴절 용암 링',
      badge: '3D VOLCANO RING',
      skyBg: 0x170509,
      fogColor: 0x24090d,
      groundColor: 0x1c0d11,
      infieldColor: 0x2b1011,
      trackBaseHex: '#331b21',
      trackStripeHex: '#452226',
      railOuter: 0xff521c,
      railInner: 0xffe600,
      railAccentCss: '#ff521c',
      dustColor: 0xff7b3b,
      ambientLight: 0xff9470,
      sunColor: 0xffc699,
      ambientWeather: 'EMBERS',
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

  // Exact finely-tuned jostling hierarchy: 도주 < 추입 < 선행 = 선입
  const JOSTLE_POWER_BY_STYLE = {
    FRONT: 0.20,
    END:   0.45,
    PACE:  0.90,
    LATE:  0.90,
  };

  const SKILLS_BY_STYLE = {
    FRONT: ['⚡ 선두 프라이드!', '🚀 터보 엔진 전개!', '💨 도망자의 각오', '✨ 코너링 네온 섬광', '🔥 대도주 기어 업!'],
    PACE:  ['⚡ 호선의 프로페서!', '🔥 완벽한 코너 가속!', '🌟 흔들리지 않는 페이스', '💥 직선 돌파!', '✨ 황금의 인코스 공략'],
    LATE:  ['🔥 승리의 고동!', '⚡ 외곽 추월 스퍼트!', '💨 맹렬한 추격!', '✨ 기적의 역전극', '🚀 파이널 기어 체인지!'],
    END:   ['🚀 직선 일기! 초폭주!', '🔥 고유기: 네온 오버드라이브!', '⚡ 전광석화 대역전!', '🌟 끝에서 날아오르는 혜성!', '💥 한계 돌파 라스트 로켓!'],
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
   * 3D Arc-Length Parameterized Curved Circuit (X-Z Plane)
   * ========================================================= */
  class CircuitTrack3D {
    constructor() {
      this.samples = [];
      this.cumLen = [];
      this.totalLen = 1;
      this.rx = 185;
      this.rz = 104;
      this.trackW = 30;
      this.halfW = 15;
      this.stadiumKey = 'DIRT';
    }

    build(stadiumKey) {
      this.stadiumKey = stadiumKey;
      const N = 560;
      const raw = [];
      for (let i = 0; i < N; i++) {
        raw.push(this._evalRaw(stadiumKey, i / N));
      }

      this.cumLen = new Array(N + 1);
      this.cumLen[0] = 0;
      for (let i = 0; i < N; i++) {
        const a = raw[i];
        const b = raw[(i + 1) % N];
        this.cumLen[i + 1] = this.cumLen[i] + Math.hypot(b.x - a.x, b.z - a.z);
      }
      this.totalLen = Math.max(1, this.cumLen[N]);

      this.samples = new Array(N);
      for (let i = 0; i < N; i++) {
        const prev = raw[(i - 1 + N) % N];
        const next = raw[(i + 1) % N];
        const dx = next.x - prev.x;
        const dz = next.z - prev.z;
        const len = Math.hypot(dx, dz) || 1;
        const tx = dx / len;
        const tz = dz / len;
        // Outward normal on X-Z plane for CCW loop: (-tz, tx)
        const nx = -tz;
        const nz = tx;
        this.samples[i] = { x: raw[i].x, z: raw[i].z, tx, tz, nx, nz };
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
        const z0 = sgnS * Math.pow(absS, 0.84) * this.rz;
        const chicane = Math.exp(-Math.pow((u - 0.5) / 0.115, 2));
        const sWave = Math.sin((u - 0.5) * Math.PI * 8) * Math.exp(-Math.pow((u - 0.5) / 0.13, 2));
        return { x: x0, z: z0 + this.rz * (0.44 * chicane + 0.11 * sWave) };
      }
      if (key === 'ICE') {
        const x0 = sgnC * Math.pow(absC, 0.82) * this.rx;
        const z0 = sgnS * Math.pow(absS, 0.86) * this.rz;
        const dip = Math.exp(-Math.pow((u - 0.56) / 0.11, 2));
        const kick = Math.exp(-Math.pow((u - 0.32) / 0.105, 2));
        return { x: x0 + this.rx * 0.08 * kick, z: z0 + this.rz * (0.48 * dip - 0.12 * kick) };
      }
      if (key === 'VOLCANO') {
        const x0 = sgnC * Math.pow(absC, 0.84) * this.rx;
        const z0 = sgnS * Math.pow(absS, 0.86) * this.rz;
        const bendTop = Math.exp(-Math.pow((u - 0.44) / 0.105, 2));
        const bendLeft = Math.exp(-Math.pow((u - 0.74) / 0.095, 2));
        const kickRight = Math.exp(-Math.pow((u - 0.21) / 0.09, 2));
        return { x: x0 + this.rx * (0.27 * bendLeft + 0.09 * kickRight), z: z0 + this.rz * (0.42 * bendTop) };
      }
      // TURF
      return {
        x: sgnC * Math.pow(absC, 0.72) * this.rx,
        z: sgnS * Math.pow(absS, 0.78) * this.rz,
      };
    }

    sample(lapU, laneNorm = 0) {
      const N = this.samples.length;
      if (N === 0) return { x: 0, z: 0, cx: 0, cz: 0, tx: 1, tz: 0, nx: 0, nz: 1 };
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
      const cx = p0.x + (p1.x - p0.x) * t;
      const cz = p0.z + (p1.z - p0.z) * t;
      const txRaw = p0.tx + (p1.tx - p0.tx) * t;
      const tzRaw = p0.tz + (p1.tz - p0.tz) * t;
      const tLen = Math.hypot(txRaw, tzRaw) || 1;
      const tx = txRaw / tLen;
      const tz = tzRaw / tLen;
      const nx = -tz;
      const nz = tx;

      const offset = laneNorm * (this.halfW - 1.7);
      return {
        x: cx + nx * offset,
        z: cz + nz * offset,
        cx,
        cz,
        tx,
        tz,
        nx,
        nz,
      };
    }
  }

  /* =========================================================
   * Web Audio API Derby Sound Synthesizer
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
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
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
      if (nowMs - this.lastHoofTime < (spurt ? 110 : 150)) return;
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
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isDuel ? 240 : 185, t);
      osc.frequency.exponentialRampToValueAtTime(55, t + 0.09);
      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.11);
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
        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.13);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.14);
      }
    }

    playSecurityWhistle() {
      const ctx = this.ensure();
      if (!ctx) return;
      const t = ctx.currentTime;
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
      gain.gain.linearRampToValueAtTime(0.1, t + 0.03);
      gain.gain.setValueAtTime(0.1, t + 0.28);
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
      gain.gain.setValueAtTime(0.09, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
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
      osc.connect(gain);
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
      [
        { f: 523.25, d: 0.12, at: 0.0 },
        { f: 659.25, d: 0.12, at: 0.11 },
        { f: 783.99, d: 0.12, at: 0.22 },
        { f: 1046.5, d: 0.22, at: 0.34 },
        { f: 880.0,  d: 0.12, at: 0.54 },
        { f: 1046.5, d: 0.56, at: 0.66 },
      ].forEach(({ f, d, at }) => {
        const start = t + at;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'triangle';
        osc2.type = 'square';
        osc1.frequency.setValueAtTime(f, start);
        osc2.frequency.setValueAtTime(f * 1.002, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.11, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + d);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(start);
        osc2.start(start);
        osc1.stop(start + d + 0.03);
        osc2.stop(start + d + 0.03);
      });
    }
  }

  /* =========================================================
   * Fullscreen Celebration Confetti FX (2D Overlay)
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
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
        ctx.restore();
      }
      if (this.particles.length === 0) ctx.clearRect(0, 0, this.w, this.h);
    }
  }

  /* =========================================================
   * Three.js 3D Stadium, Runners, Obstacles & Encounters Engine
   * ========================================================= */
  class Derby3DRenderer {
    constructor(mountEl) {
      this.mountEl = mountEl;
      this.ready = typeof window.THREE !== 'undefined';
      if (!this.ready) return;

      this.isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth <= 768;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(54, 16 / 9.8, 0.5, 1450);
      this.renderer = new THREE.WebGLRenderer({
        antialias: !this.isMobile,
        powerPreference: 'high-performance',
      });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.isMobile ? 1.5 : 2));
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      mountEl.appendChild(this.renderer.domElement);

      // Lighting
      this.hemiLight = new THREE.HemisphereLight(0x99ccff, 0x0a1020, 0.95);
      this.scene.add(this.hemiLight);

      this.sunLight = new THREE.DirectionalLight(0xffffff, 1.05);
      this.sunLight.position.set(125, 185, 135);
      this.sunLight.castShadow = true;
      const shadowRes = this.isMobile ? 512 : 1024;
      this.sunLight.shadow.mapSize.width = shadowRes;
      this.sunLight.shadow.mapSize.height = shadowRes;
      this.sunLight.shadow.camera.near = 25;
      this.sunLight.shadow.camera.far = 560;
      const d = 245;
      this.sunLight.shadow.camera.left = -d;
      this.sunLight.shadow.camera.right = d;
      this.sunLight.shadow.camera.top = d;
      this.sunLight.shadow.camera.bottom = -d;
      this.scene.add(this.sunLight);

      // Dynamic Scene Groups
      this.stadiumGroup = new THREE.Group();
      this.runnersGroup = new THREE.Group();
      this.obstaclesGroup = new THREE.Group();
      this.fxGroup = new THREE.Group();
      this.scene.add(this.stadiumGroup, this.runnersGroup, this.obstaclesGroup, this.fxGroup);

      // Jumbotron live texture
      this.jumboCanvas = document.createElement('canvas');
      this.jumboCanvas.width = 512;
      this.jumboCanvas.height = 256;
      this.jumboCtx = this.jumboCanvas.getContext('2d');
      this.jumboTex = new THREE.CanvasTexture(this.jumboCanvas);
      this.lastJumboDraw = 0;

      // Gate doors list for open animation
      this.gateDoors = [];

      // Camera smooth targets
      this.camPos = new THREE.Vector3(-25, 16, 78);
      this.camLook = new THREE.Vector3(20, 2, 62);

      // Shared 3D Particle Pools (Dust + Sparks)
      this.particles = [];
      this.particleGeo = new THREE.BoxGeometry(0.42, 0.42, 0.42);
      this.weatherPoints = null;

      this.resize();
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('orientationchange', () => {
        setTimeout(() => this.resize(), 180);
      });
    }

    resize() {
      if (!this.ready) return;
      const rect = this.mountEl.getBoundingClientRect();
      const w = Math.max(260, Math.floor(rect.width || 900));
      const h = Math.max(220, Math.floor(rect.height || 520));
      const aspect = w / h;
      this.camera.aspect = aspect;
      // Widen FOV slightly on portrait phones so the full track width stays visible!
      this.camera.fov = aspect < 1.05 ? 66 : 54;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h, false);
    }

    clearGroup(group) {
      while (group.children.length > 0) {
        const obj = group.children[0];
        group.remove(obj);
      }
    }

    createTrackSurfaceTexture(st) {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      // Base surface with alternating mowed/graded horizontal bands along V (track forward)
      ctx.fillStyle = st.trackBaseHex;
      ctx.fillRect(0, 0, 512, 512);
      ctx.fillStyle = st.trackStripeHex;
      ctx.fillRect(0, 0, 512, 256);

      // Subtle texture grain
      for (let i = 0; i < 900; i++) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.045)' : 'rgba(0,0,0,0.06)';
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 6);
      }

      // Dashed lane dividers along track width (U = 0.25, 0.5, 0.75)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 4;
      ctx.setLineDash([28, 28]);
      [128, 256, 384].forEach((x) => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 512);
        ctx.stroke();
      });

      // Subtle glowing inner/outer shoulder lines
      ctx.setLineDash([]);
      ctx.fillStyle = st.railAccentCss;
      ctx.globalAlpha = 0.35;
      ctx.fillRect(0, 0, 10, 512);
      ctx.fillRect(502, 0, 10, 512);

      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(1, 80);
      tex.anisotropy = 4;
      return tex;
    }

    createCheckeredTexture() {
      const c = document.createElement('canvas');
      c.width = 256;
      c.height = 64;
      const ctx = c.getContext('2d');
      const sq = 16;
      for (let y = 0; y < 64; y += sq) {
        for (let x = 0; x < 256; x += sq) {
          ctx.fillStyle = ((x / sq + y / sq) % 2 === 0) ? '#ffffff' : '#0b1024';
          ctx.fillRect(x, y, sq, sq);
        }
      }
      const tex = new THREE.CanvasTexture(c);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      return tex;
    }

    buildStadium(st, track) {
      if (!this.ready) return;
      this.clearGroup(this.stadiumGroup);
      this.gateDoors = [];

      // Sky & Fog (wider visibility for expanded giant stadium!)
      this.scene.background = new THREE.Color(st.skyBg);
      this.scene.fog = new THREE.FogExp2(st.fogColor, 0.0017);
      this.hemiLight.color.setHex(st.ambientLight);
      this.sunLight.color.setHex(st.sunColor);

      // 1. Massive World Ground Plane
      const groundGeo = new THREE.PlaneGeometry(1600, 1600);
      const groundMat = new THREE.MeshStandardMaterial({
        color: st.groundColor,
        roughness: 0.92,
        metalness: 0.05,
      });
      const ground = new THREE.Mesh(groundGeo, groundMat);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.18;
      ground.receiveShadow = true;
      this.stadiumGroup.add(ground);

      // 2. 3D Curved Track Surface Ribbon Mesh (BufferGeometry with proper UVs!)
      const N = track.samples.length;
      const positions = [];
      const uvs = [];
      const indices = [];
      for (let i = 0; i <= N; i++) {
        const s = track.samples[i % N];
        const vCoord = i / N;
        const ix = s.x - s.nx * track.halfW;
        const iz = s.z - s.nz * track.halfW;
        const ox = s.x + s.nx * track.halfW;
        const oz = s.z + s.nz * track.halfW;

        positions.push(ix, 0.02, iz, ox, 0.02, oz);
        uvs.push(0, vCoord, 1, vCoord);

        if (i < N) {
          const base = i * 2;
          indices.push(base, base + 2, base + 1);
          indices.push(base + 1, base + 2, base + 3);
        }
      }
      const trackGeo = new THREE.BufferGeometry();
      trackGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      trackGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      trackGeo.setIndex(indices);
      trackGeo.computeVertexNormals();

      const trackMat = new THREE.MeshStandardMaterial({
        map: this.createTrackSurfaceTexture(st),
        roughness: st.key === 'ICE' ? 0.25 : 0.85,
        metalness: st.key === 'ICE' ? 0.22 : 0.05,
      });
      const trackMesh = new THREE.Mesh(trackGeo, trackMat);
      trackMesh.receiveShadow = true;
      this.stadiumGroup.add(trackMesh);

      // 3. 3D Neon Glowing Inner & Outer Rails (TubeGeometry) + White Fence Posts
      const innerVecs = [];
      const outerVecs = [];
      for (let i = 0; i < N; i += 3) {
        const s = track.samples[i];
        innerVecs.push(new THREE.Vector3(s.x - s.nx * (track.halfW + 0.5), 1.35, s.z - s.nz * (track.halfW + 0.5)));
        outerVecs.push(new THREE.Vector3(s.x + s.nx * (track.halfW + 0.5), 1.45, s.z + s.nz * (track.halfW + 0.5)));
      }
      const innerCurve = new THREE.CatmullRomCurve3(innerVecs, true);
      const outerCurve = new THREE.CatmullRomCurve3(outerVecs, true);

      const innerRail = new THREE.Mesh(
        new THREE.TubeGeometry(innerCurve, 300, 0.28, 6, true),
        new THREE.MeshBasicMaterial({ color: st.railInner })
      );
      const outerRail = new THREE.Mesh(
        new THREE.TubeGeometry(outerCurve, 300, 0.32, 6, true),
        new THREE.MeshBasicMaterial({ color: st.railOuter })
      );
      this.stadiumGroup.add(innerRail, outerRail);

      // Rail Posts & Outer Stadium Grandstand Ring
      const postGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.5, 6);
      const postMat = new THREE.MeshStandardMaterial({ color: 0xe6f2ff, roughness: 0.4 });
      const standMat = new THREE.MeshStandardMaterial({ color: 0x101733, roughness: 0.8 });
      const standGlowMat = new THREE.MeshBasicMaterial({ color: st.railOuter });

      for (let i = 0; i < N; i += 7) {
        const s = track.samples[i];
        const pIn = new THREE.Mesh(postGeo, postMat);
        pIn.position.set(s.x - s.nx * (track.halfW + 0.5), 0.75, s.z - s.nz * (track.halfW + 0.5));
        const pOut = new THREE.Mesh(postGeo, postMat);
        pOut.position.set(s.x + s.nx * (track.halfW + 0.5), 0.75, s.z + s.nz * (track.halfW + 0.5));
        this.stadiumGroup.add(pIn, pOut);
      }

      // Stepped 3D Grandstand Bleachers & Floodlight Towers ringing the outside!
      const crowdPositions = [];
      const crowdColors = [];
      const paletteCols = [new THREE.Color(st.railOuter), new THREE.Color(0xff2a85), new THREE.Color(0xffe600), new THREE.Color(0xffffff)];

      for (let i = 0; i < N; i += 14) {
        const s = track.samples[i];
        const yaw = Math.atan2(s.tx, s.tz);

        // 3D Grandstand block
        const stand = new THREE.Mesh(new THREE.BoxGeometry(10.5, 7.5, 16), standMat);
        stand.position.set(s.x + s.nx * (track.halfW + 13), 3.75, s.z + s.nz * (track.halfW + 13));
        stand.rotation.y = yaw;
        this.stadiumGroup.add(stand);

        // Glowing canopy trim
        const trim = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 16), standGlowMat);
        trim.position.set(s.x + s.nx * (track.halfW + 7.8), 7.6, s.z + s.nz * (track.halfW + 7.8));
        trim.rotation.y = yaw;
        this.stadiumGroup.add(trim);

        // Twinkling 3D spectator dots sitting on the bleachers
        for (let k = 0; k < 14; k++) {
          const tier = k % 3;
          const along = ((k / 14) - 0.5) * 14;
          const distOut = track.halfW + 8.5 + tier * 2.5;
          crowdPositions.push(
            s.x + s.nx * distOut + s.tx * along,
            2.2 + tier * 2.1,
            s.z + s.nz * distOut + s.tz * along
          );
          const col = paletteCols[(i + k) % paletteCols.length];
          crowdColors.push(col.r, col.g, col.b);
        }

        // Stadium Floodlight Pylons every ~42 samples
        if (i % 42 === 0) {
          const pylon = new THREE.Mesh(
            new THREE.CylinderGeometry(0.45, 0.75, 26, 6),
            new THREE.MeshStandardMaterial({ color: 0x1d2645, metalness: 0.5 })
          );
          const fx = s.x + s.nx * (track.halfW + 22);
          const fz = s.z + s.nz * (track.halfW + 22);
          pylon.position.set(fx, 13, fz);
          this.stadiumGroup.add(pylon);

          const lamp = new THREE.Mesh(
            new THREE.BoxGeometry(4.5, 2.2, 1.4),
            new THREE.MeshBasicMaterial({ color: st.key === 'VOLCANO' ? 0xffaa66 : 0xe8fbff })
          );
          lamp.position.set(fx, 26, fz);
          lamp.lookAt(s.x, 0, s.z);
          this.stadiumGroup.add(lamp);
        }
      }

      const crowdGeo = new THREE.BufferGeometry();
      crowdGeo.setAttribute('position', new THREE.Float32BufferAttribute(crowdPositions, 3));
      crowdGeo.setAttribute('color', new THREE.Float32BufferAttribute(crowdColors, 3));
      const crowdPoints = new THREE.Points(
        crowdGeo,
        new THREE.PointsMaterial({ size: 1.5, vertexColors: true })
      );
      this.stadiumGroup.add(crowdPoints);

      // 4. 3D Checkered START / GOAL Arch Gantry & Animated Starting Gate!
      const g0 = track.sample(0, 0);
      const goalGroup = new THREE.Group();
      goalGroup.position.set(g0.cx, 0, g0.cz);
      goalGroup.rotation.y = Math.atan2(g0.tx, g0.tz);

      // Checkered strip on ground
      const strip = new THREE.Mesh(
        new THREE.PlaneGeometry(track.trackW, 3.2),
        new THREE.MeshBasicMaterial({ map: this.createCheckeredTexture(), side: THREE.DoubleSide })
      );
      strip.rotation.x = -Math.PI / 2;
      strip.position.y = 0.08;
      goalGroup.add(strip);

      // Towering Arch Pillars + Overhead Neon Beam
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x131b38, metalness: 0.6, roughness: 0.3 });
      const leftPillar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 15, 1.6), pillarMat);
      leftPillar.position.set(-track.halfW - 1.2, 7.5, 0);
      const rightPillar = new THREE.Mesh(new THREE.BoxGeometry(1.6, 15, 1.6), pillarMat);
      rightPillar.position.set(track.halfW + 1.2, 7.5, 0);
      const topBeam = new THREE.Mesh(
        new THREE.BoxGeometry(track.trackW + 4.4, 2.4, 1.8),
        new THREE.MeshBasicMaterial({ color: 0xff2a85 })
      );
      topBeam.position.set(0, 14.5, 0);
      const goldTrim = new THREE.Mesh(
        new THREE.BoxGeometry(track.trackW + 4.8, 0.45, 2.0),
        new THREE.MeshBasicMaterial({ color: 0xffe600 })
      );
      goldTrim.position.set(0, 13.2, 0);
      goalGroup.add(leftPillar, rightPillar, topBeam, goldTrim);

      // Animated 3D Starting Gate Doors (swing open on GATE OPEN!)
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.72, emissive: 0x006688 });
      const doorCount = 6;
      const doorW = (track.trackW - 2) / doorCount;
      for (let dIdx = 0; dIdx < doorCount; dIdx++) {
        const pivot = new THREE.Group();
        pivot.position.set(-track.halfW + 1 + dIdx * doorW, 1.6, 1.2);
        const door = new THREE.Mesh(new THREE.BoxGeometry(doorW - 0.3, 2.8, 0.25), doorMat);
        door.position.set((doorW - 0.3) / 2, 0, 0);
        pivot.add(door);
        goalGroup.add(pivot);
        this.gateDoors.push(pivot);
      }

      this.stadiumGroup.add(goalGroup);

      // 5. Giant 3D Central Infield Jumbotron Tower!
      const jz = st.key === 'TURF' ? 0 : 18;
      const jumboGroup = new THREE.Group();
      jumboGroup.position.set(0, 0, jz);
      const jPole = new THREE.Mesh(
        new THREE.CylinderGeometry(1.8, 2.8, 22, 8),
        new THREE.MeshStandardMaterial({ color: 0x161f40, metalness: 0.5 })
      );
      jPole.position.y = 11;
      const jFrame = new THREE.Mesh(
        new THREE.BoxGeometry(44, 21, 2.8),
        new THREE.MeshStandardMaterial({ color: 0x0b1026, metalness: 0.6 })
      );
      jFrame.position.y = 26;
      const screenMat = new THREE.MeshBasicMaterial({ map: this.jumboTex });
      const frontScreen = new THREE.Mesh(new THREE.PlaneGeometry(41, 19), screenMat);
      frontScreen.position.set(0, 26, 1.5);
      const backScreen = new THREE.Mesh(new THREE.PlaneGeometry(41, 19), screenMat);
      backScreen.position.set(0, 26, -1.5);
      backScreen.rotation.y = Math.PI;
      jumboGroup.add(jPole, jFrame, frontScreen, backScreen);
      this.stadiumGroup.add(jumboGroup);

      // 6. Stadium-Specific 3D Infield & Outer Environment Scenery!
      this.buildStadiumScenery(st);
      this.build3DWeather(st);
    }

    buildStadiumScenery(st) {
      if (st.key === 'VOLCANO') {
        const lavaPool = new THREE.Mesh(
          new THREE.CircleGeometry(48, 36),
          new THREE.MeshBasicMaterial({ color: 0xff4500 })
        );
        lavaPool.rotation.x = -Math.PI / 2;
        lavaPool.position.set(0, 0.05, 14);
        this.stadiumGroup.add(lavaPool);

        const rockMat = new THREE.MeshStandardMaterial({ color: 0x1e0e12, roughness: 0.95 });
        for (let i = 0; i < 18; i++) {
          const ang = (i / 18) * Math.PI * 2;
          const dist = 265 + (i % 3) * 40;
          const h = 48 + (i % 4) * 22;
          const peak = new THREE.Mesh(new THREE.ConeGeometry(26 + (i % 3) * 8, h, 6), rockMat);
          peak.position.set(Math.cos(ang) * dist, h / 2 - 1, Math.sin(ang) * (dist * 0.7));
          this.stadiumGroup.add(peak);
        }
      } else if (st.key === 'ICE') {
        const iceMat = new THREE.MeshStandardMaterial({
          color: 0x7ce8ff,
          roughness: 0.15,
          metalness: 0.2,
          transparent: true,
          opacity: 0.78,
        });
        for (let i = 0; i < 20; i++) {
          const ang = (i / 20) * Math.PI * 2;
          const dist = 260 + (i % 3) * 38;
          const h = 38 + (i % 4) * 20;
          const shard = new THREE.Mesh(new THREE.ConeGeometry(14 + (i % 3) * 5, h, 5), iceMat);
          shard.position.set(Math.cos(ang) * dist, h / 2 - 1, Math.sin(ang) * (dist * 0.7));
          this.stadiumGroup.add(shard);
        }
      } else if (st.key === 'DIRT') {
        const mesaMat = new THREE.MeshStandardMaterial({ color: 0x7c341d, roughness: 0.92 });
        for (let i = 0; i < 16; i++) {
          const ang = (i / 16) * Math.PI * 2;
          const dist = 270 + (i % 3) * 44;
          const h = 34 + (i % 4) * 18;
          const mesa = new THREE.Mesh(new THREE.CylinderGeometry(20, 32, h, 7), mesaMat);
          mesa.position.set(Math.cos(ang) * dist, h / 2 - 1, Math.sin(ang) * (dist * 0.7));
          this.stadiumGroup.add(mesa);
        }
      } else {
        const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2f1d });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x168055, roughness: 0.7 });
        for (let i = 0; i < 20; i++) {
          const ang = (i / 20) * Math.PI * 2;
          const tx = Math.cos(ang) * 102;
          const tz = Math.sin(ang) * 46;
          const tree = new THREE.Group();
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.9, 4.2, 6), trunkMat);
          trunk.position.y = 2.1;
          const crown = new THREE.Mesh(new THREE.ConeGeometry(3.8, 10, 7), leafMat);
          crown.position.y = 8.2;
          tree.add(trunk, crown);
          tree.position.set(tx, 0, tz);
          this.stadiumGroup.add(tree);
        }
      }
    }

    build3DWeather(st) {
      if (this.weatherPoints) {
        this.scene.remove(this.weatherPoints);
        this.weatherPoints = null;
      }
      if (st.ambientWeather === 'NONE') return;

      const count = this.isMobile ? 280 : 600;
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 520;
        pos[i * 3 + 1] = Math.random() * 85;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 340;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      const col = st.ambientWeather === 'SNOW' ? 0xe8fbff : st.ambientWeather === 'EMBERS' ? 0xff7b29 : 0xffd28a;
      this.weatherPoints = new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color: col, size: st.ambientWeather === 'SNOW' ? 1.0 : 0.85, transparent: true, opacity: 0.75 })
      );
      this.scene.add(this.weatherPoints);
    }

    updateJumbotronTexture(st, lapText, mainLine, subLine) {
      const now = performance.now();
      if (now - this.lastJumboDraw < 140) return;
      this.lastJumboDraw = now;

      const ctx = this.jumboCtx;
      ctx.fillStyle = '#070b1f';
      ctx.fillRect(0, 0, 512, 256);

      ctx.strokeStyle = st.railAccentCss;
      ctx.lineWidth = 8;
      ctx.strokeRect(8, 8, 496, 240);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = st.railAccentCss;
      ctx.font = '800 30px Orbitron, sans-serif';
      ctx.fillText(lapText, 256, 56);

      ctx.fillStyle = '#ffe600';
      ctx.font = '900 50px "Noto Sans KR", sans-serif';
      ctx.fillText(mainLine, 256, 134);

      ctx.fillStyle = '#9db4e6';
      ctx.font = '700 28px Orbitron, "Noto Sans KR", sans-serif';
      ctx.fillText(subLine, 256, 204);

      this.jumboTex.needsUpdate = true;
    }

    /**
     * Builds an articulated 3D Uma-Derby Anime Cyber Racer!
     * Facing +Z locally; legs, arms, tail, ears, aura ring & billboard nameplate animate smoothly.
     */
    createRunner3DMesh(runner) {
      const root = new THREE.Group();
      const bodyPivot = new THREE.Group();
      root.add(bodyPivot);

      const silkColor = new THREE.Color(runner.color);
      const silkMat = new THREE.MeshStandardMaterial({ color: silkColor, roughness: 0.35, metalness: 0.25, emissive: silkColor, emissiveIntensity: 0.18 });
      const whiteMat = new THREE.MeshStandardMaterial({ color: 0xf4f8ff, roughness: 0.45 });
      const skinMat = new THREE.MeshStandardMaterial({ color: 0xffe4cf, roughness: 0.65 });
      const hairMat = new THREE.MeshStandardMaterial({ color: 0x161f42, roughness: 0.55 });
      const darkMat = new THREE.MeshStandardMaterial({ color: 0x0c1126, roughness: 0.5 });

      // Torso (Racing Jacket)
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.64, 1.35, 10), silkMat);
      torso.position.y = 2.05;
      torso.castShadow = true;
      bodyPivot.add(torso);

      // White Racing Sash
      const sash = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.25, 0.88), whiteMat);
      sash.position.set(0, 2.08, 0.08);
      sash.rotation.z = 0.45;
      bodyPivot.add(sash);

      // Skirt / Racing Shorts
      const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.82, 0.58, 10), darkMat);
      skirt.position.y = 1.25;
      bodyPivot.add(skirt);

      // Head + Hair + Glowing Visor + Iconic 3D Horse Ears!
      const headGroup = new THREE.Group();
      headGroup.position.set(0, 3.15, 0.08);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10), skinMat);
      head.castShadow = true;
      const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.58, 12, 10, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat);
      hairCap.position.set(0, 0.05, -0.04);
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.18, 0.28), new THREE.MeshBasicMaterial({ color: silkColor }));
      visor.position.set(0, 0.05, 0.44);

      // Left & Right 3D Horse Ears with neon inner ear!
      const earGeo = new THREE.ConeGeometry(0.16, 0.72, 5);
      const earL = new THREE.Mesh(earGeo, hairMat);
      earL.position.set(-0.28, 0.78, 0.0);
      earL.rotation.z = 0.18;
      const earR = new THREE.Mesh(earGeo, hairMat);
      earR.position.set(0.28, 0.78, 0.0);
      earR.rotation.z = -0.18;
      const earTipL = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.45, 4), new THREE.MeshBasicMaterial({ color: silkColor }));
      earTipL.position.set(-0.28, 0.78, 0.07);
      earTipL.rotation.z = 0.18;
      const earTipR = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.45, 4), new THREE.MeshBasicMaterial({ color: silkColor }));
      earTipR.position.set(0.28, 0.78, 0.07);
      earTipR.rotation.z = -0.18;

      headGroup.add(head, hairCap, visor, earL, earR, earTipL, earTipR);
      bodyPivot.add(headGroup);

      // Flowing 3D Ponytail / Racing Tail (animates backward!)
      const tailPivot = new THREE.Group();
      tailPivot.position.set(0, 2.0, -0.58);
      const tailMesh = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.85, 7), new THREE.MeshBasicMaterial({ color: silkColor }));
      tailMesh.rotation.x = -Math.PI / 2 - 0.35;
      tailMesh.position.set(0, -0.2, -0.78);
      tailPivot.add(tailMesh);
      bodyPivot.add(tailPivot);

      // Articulated Legs
      const legGeo = new THREE.CylinderGeometry(0.16, 0.13, 1.25, 7);
      const legL = new THREE.Group();
      legL.position.set(-0.28, 1.2, 0);
      const legLMesh = new THREE.Mesh(legGeo, whiteMat);
      legLMesh.position.y = -0.62;
      legL.add(legLMesh);

      const legR = new THREE.Group();
      legR.position.set(0.28, 1.2, 0);
      const legRMesh = new THREE.Mesh(legGeo, whiteMat);
      legRMesh.position.y = -0.62;
      legR.add(legRMesh);
      bodyPivot.add(legL, legR);

      // Articulated Arms
      const armGeo = new THREE.CylinderGeometry(0.12, 0.11, 0.95, 6);
      const armL = new THREE.Group();
      armL.position.set(-0.68, 2.45, 0);
      const armLMesh = new THREE.Mesh(armGeo, skinMat);
      armLMesh.position.y = -0.45;
      armL.add(armLMesh);

      const armR = new THREE.Group();
      armR.position.set(0.68, 2.45, 0);
      const armRMesh = new THREE.Mesh(armGeo, skinMat);
      armRMesh.position.y = -0.45;
      armR.add(armRMesh);
      bodyPivot.add(armL, armR);

      // Glowing 3D Skill Aura Ring & Debuff Warning Ring at ground
      const auraRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.45, 0.14, 8, 24),
        new THREE.MeshBasicMaterial({ color: silkColor, transparent: true, opacity: 0.85 })
      );
      auraRing.rotation.x = Math.PI / 2;
      auraRing.position.y = 0.45;
      auraRing.visible = false;
      root.add(auraRing);

      const debuffRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.55, 0.14, 8, 20),
        new THREE.MeshBasicMaterial({ color: 0xff3864, transparent: true, opacity: 0.9 })
      );
      debuffRing.rotation.x = Math.PI / 2;
      debuffRing.position.y = 0.9;
      debuffRing.visible = false;
      root.add(debuffRing);

      // Ground Contact Shadow Disc
      const shadowDisc = new THREE.Mesh(
        new THREE.CircleGeometry(1.05, 16),
        new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.42 })
      );
      shadowDisc.rotation.x = -Math.PI / 2;
      shadowDisc.position.y = 0.06;
      root.add(shadowDisc);

      // Crisp 3D Billboard Nameplate Sprite above Runner
      const tagCanvas = document.createElement('canvas');
      tagCanvas.width = 256;
      tagCanvas.height = 64;
      const tagTex = new THREE.CanvasTexture(tagCanvas);
      const tagSprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tagTex, transparent: true, depthTest: false }));
      tagSprite.position.set(0, 5.1, 0);
      tagSprite.scale.set(6.2, 1.55, 1);
      root.add(tagSprite);

      const rig = {
        root,
        bodyPivot,
        legL,
        legR,
        armL,
        armR,
        tailPivot,
        auraRing,
        debuffRing,
        tagCanvas,
        tagTex,
        lastTagKey: '',
      };
      this.updateRunnerNameplate(rig, runner);
      this.runnersGroup.add(root);
      return rig;
    }

    updateRunnerNameplate(rig, runner) {
      const icon = runner.debuff ? runner.debuff.icon : runner.duelTimer > 0 ? '🔥' : runner.skillTimer > 0 ? '⚡' : '';
      const key = `${runner.gate}|${runner.label}|${icon}|${Boolean(runner.debuff)}`;
      if (rig.lastTagKey === key) return;
      rig.lastTagKey = key;

      const ctx = rig.tagCanvas.getContext('2d');
      ctx.clearRect(0, 0, 256, 64);

      ctx.fillStyle = runner.debuff ? 'rgba(54, 8, 22, 0.92)' : 'rgba(6, 10, 28, 0.88)';
      ctx.strokeStyle = runner.debuff ? runner.debuff.color : runner.skillTimer > 0 || runner.duelTimer > 0 ? '#ffe600' : runner.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.roundRect(6, 8, 244, 48, 14);
      ctx.fill();
      ctx.stroke();

      // Gate number pill
      ctx.fillStyle = runner.color;
      ctx.beginPath();
      ctx.roundRect(14, 15, 36, 34, 8);
      ctx.fill();

      ctx.fillStyle = '#050611';
      ctx.font = '900 22px Orbitron, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(runner.gate), 32, 33);

      // Name + status icon
      const shortName = runner.label.length > 8 ? runner.label.slice(0, 7) + '…' : runner.label;
      ctx.fillStyle = '#ffffff';
      ctx.font = '800 23px "Noto Sans KR", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${icon ? icon + ' ' : ''}${shortName}`, 58, 33);

      rig.tagTex.needsUpdate = true;
    }

    buildObstacles3D(obstacles, st, track, lapMeters) {
      if (!this.ready) return;
      this.clearGroup(this.obstaclesGroup);

      obstacles.forEach((obs) => {
        const pt = track.sample(obs.dist / lapMeters, obs.laneNorm);
        const group = new THREE.Group();
        group.position.set(pt.x, 0, pt.z);
        group.rotation.y = Math.atan2(pt.tx, pt.tz);

        if (obs.type === 'BOOST') {
          const pad = new THREE.Mesh(
            new THREE.BoxGeometry(3.2, 0.14, 4.4),
            new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.85 })
          );
          pad.position.y = 0.09;
          group.add(pad);
        } else if (obs.type === 'HURDLE') {
          const col = st.key === 'DIRT' ? 0x39ff14 : st.key === 'ICE' ? 0x7ce8ff : st.key === 'VOLCANO' ? 0xff521c : 0xff6b00;
          const bar = new THREE.Mesh(
            new THREE.BoxGeometry(3.6, 1.5, 0.5),
            new THREE.MeshStandardMaterial({ color: col, emissive: col, emissiveIntensity: 0.35 })
          );
          bar.position.y = 1.05;
          bar.castShadow = true;
          const stripe = new THREE.Mesh(new THREE.BoxGeometry(3.66, 0.35, 0.56), new THREE.MeshBasicMaterial({ color: 0xffffff }));
          stripe.position.y = 1.25;
          group.add(bar, stripe);
        } else if (obs.type === 'SLIP') {
          const cone = new THREE.Mesh(
            new THREE.ConeGeometry(0.95, 1.5, 6),
            new THREE.MeshStandardMaterial({ color: st.key === 'ICE' ? 0x99f2ff : 0xffe600, emissive: 0x443300 })
          );
          cone.position.y = 0.75;
          group.add(cone);
        } else if (obs.type === 'MUD') {
          const col = st.key === 'VOLCANO' ? 0xff4500 : st.key === 'ICE' ? 0x4fa8ff : st.key === 'DIRT' ? 0xc98838 : 0x7b52ab;
          const pool = new THREE.Mesh(
            new THREE.CylinderGeometry(2.1, 2.2, 0.12, 12),
            new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.82 })
          );
          pool.position.y = 0.08;
          group.add(pool);
        }

        obs.mesh3D = group;
        this.obstaclesGroup.add(group);
      });
    }

    spawn3DParticle(x, y, z, vx, vy, vz, colorHex, maxLife = 0.42) {
      const cap = this.isMobile ? 90 : 180;
      if (!this.ready || this.particles.length > cap) return;
      const mat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(this.particleGeo, mat);
      mesh.position.set(x, y, z);
      this.fxGroup.add(mesh);
      this.particles.push({ mesh, vx, vy, vz, life: 0, maxLife });
    }

    spawn3DEncounterMesh(fx) {
      if (!this.ready) return null;
      const group = new THREE.Group();

      if (fx.type === 'DRUNK_STREAKER') {
        // 3D Drunk Spectator + 3D Chasing Security Guard!
        const drunk = new THREE.Group();
        const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 1.6, 8), new THREE.MeshStandardMaterial({ color: 0xff4d4d }));
        body.position.y = 1.4;
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), new THREE.MeshStandardMaterial({ color: 0xff9e9e }));
        head.position.y = 2.6;
        const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.22, 0.55, 8), new THREE.MeshBasicMaterial({ color: 0xffe600 }));
        mug.position.set(0.8, 2.1, 0.3);
        drunk.add(body, head, mug);

        const guard = new THREE.Group();
        const gBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 1.65, 8), new THREE.MeshStandardMaterial({ color: 0x1d4ed8 }));
        gBody.position.y = 1.4;
        const gHead = new THREE.Mesh(new THREE.SphereGeometry(0.48, 10, 8), new THREE.MeshStandardMaterial({ color: 0xffe4cf }));
        gHead.position.y = 2.6;
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.25, 8), new THREE.MeshStandardMaterial({ color: 0x0f172a }));
        cap.position.y = 3.05;
        guard.add(gBody, gHead, cap);
        guard.position.set(-2.5, 0, -2.5);

        group.add(drunk, guard);
        group.userData = { drunk, guard };
      } else if (fx.type === 'THROWN_OBJECT') {
        const bottle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.28, 0.36, 1.25, 8),
          new THREE.MeshBasicMaterial({ color: 0xffe600 })
        );
        group.add(bottle);
        group.userData = { bottle };
      } else if (fx.type === 'SHOE_LOOSE') {
        const shoe = new THREE.Mesh(
          new THREE.BoxGeometry(0.5, 0.32, 0.85),
          new THREE.MeshBasicMaterial({ color: 0xff70d9 })
        );
        group.add(shoe);
        group.userData = { shoe };
      }

      this.fxGroup.add(group);
      return group;
    }

    update3DFX(dtReal, st) {
      if (!this.ready) return;
      // Update 3D particles
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life += dtReal;
        if (p.life >= p.maxLife) {
          this.fxGroup.remove(p.mesh);
          p.mesh.material.dispose();
          this.particles.splice(i, 1);
          continue;
        }
        p.vy -= 14 * dtReal;
        p.mesh.position.x += p.vx * dtReal;
        p.mesh.position.y = Math.max(0.1, p.mesh.position.y + p.vy * dtReal);
        p.mesh.position.z += p.vz * dtReal;
        p.mesh.material.opacity = Math.max(0, 1 - p.life / p.maxLife);
      }

      // Update 3D ambient weather (snow / sand / embers)
      if (this.weatherPoints) {
        const pos = this.weatherPoints.geometry.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);
          if (st.ambientWeather === 'SNOW') {
            y -= 11 * dtReal;
            x -= 6 * dtReal;
            if (y < 0) y = 85;
          } else if (st.ambientWeather === 'EMBERS') {
            y += 14 * dtReal;
            if (y > 85) y = 0.5;
          } else {
            x -= 45 * dtReal;
            if (x < -260) x = 260;
          }
          pos.setXYZ(i, x, y, z);
        }
        pos.needsUpdate = true;
      }
    }

    render() {
      if (!this.ready) return;
      this.renderer.render(this.scene, this.camera);
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

  const CAMERA_MODES = ['CHASE', 'BROADCAST', 'HELI'];

  const state = {
    entries: [],
    history: [],
    soundEnabled: true,
    autoExclude: false,
    obstaclesEnabled: true,
    encountersEnabled: true,
    selectedStadium: 'DIRT',
    activeStadiumKey: 'DIRT',
    courseDistance: 1200,
    speedMultiplier: 1.0,
    cameraMode: 'CHASE', // 'CHASE' | 'BROADCAST' | 'HELI'
    camOrbitYaw: 0,      // Touch/mouse horizontal orbit angle around chase pack
    isDraggingCam: false,

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
    encounterTriggers: [],
    nextEncounterIdx: 0,
    activeEncounterFX: [],
    skillCutinTimer: 0,
    encounterCutinTimer: 0,
  };

  /* =========================================================
   * DOM References
   * ========================================================= */
  const threeMount = document.getElementById('threeMount');
  const radarCanvas = document.getElementById('radarCanvas');
  const radarCtx = radarCanvas.getContext('2d');
  const fxCanvas = document.getElementById('fxCanvas');
  const trackViewport = document.getElementById('trackViewport');
  const speedLinesOverlay = document.getElementById('speedLinesOverlay');
  const photoFlashOverlay = document.getElementById('photoFlashOverlay');
  const webglError = document.getElementById('webglError');

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

  const track = new CircuitTrack3D();
  const sound = new DerbySound();
  const confetti = new ConfettiFX(fxCanvas);
  const engine3D = new Derby3DRenderer(threeMount);

  if (!engine3D.ready) {
    webglError.classList.remove('hidden');
  }

  /* =========================================================
   * Course & Balance Helpers (100% Parity with Tuned 2D Version!)
   * ========================================================= */
  function getTotalLaps() {
    if (state.courseDistance <= 1200) return 1;
    if (state.courseDistance <= 1600) return 2;
    if (state.courseDistance <= 2400) return 3;
    return 4;
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

  function getActiveStadium() {
    return STADIUMS[state.activeStadiumKey] || STADIUMS.DIRT;
  }

  function applyStadiumTheme(stadiumKey) {
    state.activeStadiumKey = STADIUMS[stadiumKey] ? stadiumKey : 'DIRT';
    const st = getActiveStadium();
    stadiumHeaderBadge.textContent = st.badge;
    stadiumNameChip.textContent = st.name;
    minimapTrack.style.background = st.minimapBg;
    minimapTrack.style.borderColor = st.minimapBorder;
    track.build(state.activeStadiumKey);
    engine3D.buildStadium(st, track);
  }

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

  function getCourseBaseSpeed() {
    if (state.courseDistance <= 1200) return 118;
    if (state.courseDistance <= 1600) return 126;
    if (state.courseDistance <= 2400) return 138;
    return 146;
  }

  /* =========================================================
   * Persistence (Shared seamlessly with 2D version!)
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
        })
      );
    } catch (_) {}
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
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
        if (typeof parsed.encountersEnabled === 'boolean') state.encountersEnabled = parsed.encountersEnabled;
        if (parsed.selectedStadium && (STADIUMS[parsed.selectedStadium] || parsed.selectedStadium === 'RANDOM')) {
          state.selectedStadium = parsed.selectedStadium;
        }
        if ([1200, 1600, 2400, 3200].includes(parsed.courseDistance)) state.courseDistance = parsed.courseDistance;
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
   * Runner Builder, 3D Obstacles & Encounters Planner
   * ========================================================= */
  function getActiveEntries() {
    return state.entries.filter((e) => !e.excluded);
  }

  function resolveStyle(styleKey) {
    if (styleKey && styleKey !== 'AUTO' && SKILLS_BY_STYLE[styleKey]) return styleKey;
    const pool = ['FRONT', 'PACE', 'LATE', 'END'];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function spawnObstacles(runnerCount) {
    state.obstacles = [];
    if (!state.obstaclesEnabled || runnerCount <= 0) {
      engine3D.clearGroup(engine3D.obstaclesGroup);
      return;
    }

    const types = ['HURDLE', 'HURDLE', 'SLIP', 'MUD', 'BOOST'];
    const totalZones =
      state.courseDistance <= 1200 ? 8 : state.courseDistance <= 1600 ? 12 : state.courseDistance <= 2400 ? 16 : 22;
    const step = (state.courseDistance - 260) / totalZones;

    for (let z = 0; z < totalZones; z++) {
      const baseDist = 140 + z * step;
      const countInZone = runnerCount >= 4 && Math.random() < 0.7 ? 2 : 1;
      for (let k = 0; k < countInZone; k++) {
        state.obstacles.push({
          id: `obs_${z}_${k}`,
          dist: baseDist + (Math.random() - 0.5) * Math.min(44, step * 0.4),
          laneNorm: -0.74 + Math.random() * 1.48,
          type: types[Math.floor(Math.random() * types.length)],
          triggered: false,
          mesh3D: null,
        });
      }
    }

    engine3D.buildObstacles3D(state.obstacles, getActiveStadium(), track, getLapMeters());
  }

  function scheduleRandomEncounters() {
    state.encounterTriggers = [];
    state.nextEncounterIdx = 0;
    if (!state.encountersEnabled) return;
    const count =
      state.courseDistance <= 1200 ? 2 : state.courseDistance <= 1600 ? 3 : state.courseDistance <= 2400 ? 4 : 5;
    for (let i = 0; i < count; i++) {
      const minP = 0.14 + i * (0.7 / count);
      state.encounterTriggers.push(minP + Math.random() * 0.1);
    }
    state.encounterTriggers.sort((a, b) => a - b);
  }

  function buildGateRunners(randomizeRaceForm = false) {
    const active = getActiveEntries().slice(0, 24);
    const rawScores = active.map((entry) => {
      const u = Math.max(1e-6, Math.min(1 - 1e-6, Math.random()));
      return Math.log(Math.max(1, entry.weight)) - Math.log(-Math.log(u));
    });
    const maxScore = rawScores.length ? Math.max(...rawScores) : 0;
    const minScore = rawScores.length ? Math.min(...rawScores) : 0;
    const scoreSpan = Math.max(0.5, maxScore - minScore);

    engine3D.clearGroup(engine3D.runnersGroup);
    engine3D.clearGroup(engine3D.fxGroup);
    engine3D.particles = [];

    state.runners = active.map((entry, idx) => {
      const activeStyle = resolveStyle(entry.style);
      const normForm = randomizeRaceForm ? ((rawScores[idx] - minScore) / scoreSpan) * 2 - 1 : 0;

      // Exact finely-tuned skill table!
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
      const runner = {
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
        duelTimer: 0,
        stumbleTimer: 0,
        jumpTimer: 0,
        debuff: null,
        finished: false,
        finishTime: null,
        finishOrder: null,
        rig3D: null,
      };

      if (engine3D.ready) {
        runner.rig3D = engine3D.createRunner3DMesh(runner);
      }
      return runner;
    });

    state.gateOpenAnim = 0;
    state.spurtTriggered = false;
    state.photoSlowMoActive = false;
    state.photoFlashAlpha = 0;
    state.screenShake = 0;
    state.lastSectionAnnounced = -1;
    state.clashCooldowns.clear();
    state.activeEncounterFX = [];
    speedLinesOverlay.classList.add('hidden');
    photoFlashOverlay.style.opacity = '0';

    if (randomizeRaceForm) {
      spawnObstacles(state.runners.length);
      scheduleRandomEncounters();
    } else {
      state.obstacles = [];
      state.encounterTriggers = [];
      engine3D.clearGroup(engine3D.obstaclesGroup);
    }

    syncRunners3DTransform(0);
    rebuildMinimapPins();
    updateLeaderboardUI();
    distanceRemaining.textContent = `${state.courseDistance}m`;
  }

  /* =========================================================
   * Horse-to-Horse Jostling & Realistic Stadium Encounters
   * ========================================================= */
  function updateLaneSteeringAndJostling(dt) {
    const alive = state.runners.filter((r) => !r.finished);
    if (alive.length < 2) return;

    alive.forEach((r) => {
      const progress = r.dist / state.courseDistance;
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

      preferred += Math.sin(state.raceClock * 0.9 + r.gate * 1.7) * 0.24;

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

      if (r.laneNorm < -0.84) {
        r.laneNorm = -0.84;
        r.laneVel = Math.abs(r.laneVel) * 0.4;
      } else if (r.laneNorm > 0.84) {
        r.laneNorm = 0.84;
        r.laneVel = -Math.abs(r.laneVel) * 0.4;
      }
    });

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

          const pushDir = a.laneNorm <= b.laneNorm ? -1 : 1;
          a.laneVel += pushDir * 1.45;
          b.laneVel -= pushDir * 1.45;

          const posA = getRunnerWorldPos(a);
          const posB = getRunnerWorldPos(b);
          const midX = (posA.x + posB.x) / 2;
          const midZ = (posA.z + posB.z) / 2;

          const progress = Math.max(a.dist, b.dist) / state.courseDistance;
          const isFinalDuel = progress > 0.65 && distDiff < 9;

          if (isFinalDuel) {
            a.duelTimer = 1.25;
            b.duelTimer = 1.25;
            sound.playClash(true);
            state.screenShake = Math.max(state.screenShake, 0.7);
            for (let s = 0; s < 10; s++) {
              engine3D.spawn3DParticle(
                midX, 2.0, midZ,
                (Math.random() - 0.5) * 14, 4 + Math.random() * 8, (Math.random() - 0.5) * 14,
                s % 2 === 0 ? 0xffe600 : 0xff2a85, 0.45
              );
            }
            if (state.realRaceElapsed - state.lastCommentTime > 1.8) {
              setCommentary(`🔥 격렬한 몸싸움 경합!! [${a.label}]와 [${b.label}] 불꽃 튀는 어깨 싸움!!`, 'DUEL!!', 'spurt');
              state.lastCommentTime = state.realRaceElapsed;
            }
          } else {
            // Exact tuned jostling hierarchy: 도주 < 추입 < 선행 = 선입 + 선행 초반 우위 + 추입 2차 스킬 강행 돌파!
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
            const isBreakthrough = winner.skillTimer > 0 && winner.activeSkillJostleBonus > 0;

            loser.stumbleTimer = isBreakthrough ? 0.7 : 0.55;
            loser.laneVel += (loser === a ? pushDir : -pushDir) * (isBreakthrough ? 1.35 : 0.9);
            sound.playClash(isBreakthrough);
            for (let s = 0; s < 8; s++) {
              engine3D.spawn3DParticle(
                midX, 1.8, midZ,
                (Math.random() - 0.5) * 12, 3 + Math.random() * 6, (Math.random() - 0.5) * 12,
                isBreakthrough ? 0xb026ff : 0xff9f43, 0.38
              );
            }
            if (state.realRaceElapsed - state.lastCommentTime > 2.1) {
              setCommentary(
                isBreakthrough
                  ? `💥 압도적 강행 돌파!! [${winner.label}] 주자가 마군을 뚫고 [${loser.label}] 주자를 밀쳐냅니다!!`
                  : `💥 몸싸움 충돌!! [${winner.label}] 주자가 [${loser.label}] 주자를 어깨로 밀어냅니다!`,
                isBreakthrough ? 'BREAKTHROUGH!' : 'CLASH!'
              );
              state.lastCommentTime = state.realRaceElapsed;
            }
          }
        }
      }
    }
  }

  function applyDebuff(runner, { type, icon, label, mult, duration, color = '#ff3864' }) {
    if (runner.finished) return;
    runner.debuff = { type, icon, label, mult, timer: duration, maxTimer: duration, color };
  }

  function pickRandomRunners(maxCount, preferLeaders = false) {
    const alive = state.runners.filter((r) => !r.finished);
    if (alive.length === 0) return [];
    const count = Math.min(alive.length, Math.max(1, maxCount));
    if (preferLeaders) return [...alive].sort((a, b) => b.dist - a.dist).slice(0, count);
    const pool = [...alive];
    const picked = [];
    for (let i = 0; i < count; i++) {
      picked.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    return picked;
  }

  function pickWeightedEncounter(stadiumKey) {
    // Exact percentage weights summing to 100 (DRUNK_STREAKER = 5%, THROWN_OBJECT = 10% on ALL stadiums!)
    let table;
    if (stadiumKey === 'DIRT') {
      table = [
        { kind: 'DRUNK_STREAKER', w: 5 },
        { kind: 'THROWN_OBJECT', w: 10 },
        { kind: 'ANKLE_SPRAIN', w: 20 },
        { kind: 'SHOE_LOOSE', w: 20 },
        { kind: 'RUSHED', w: 15 },
        { kind: 'HEADWIND', w: 10 },
        { kind: 'SANDSTORM', w: 20 },
      ];
    } else if (stadiumKey === 'ICE') {
      table = [
        { kind: 'DRUNK_STREAKER', w: 5 },
        { kind: 'THROWN_OBJECT', w: 10 },
        { kind: 'ANKLE_SPRAIN', w: 30 },
        { kind: 'SHOE_LOOSE', w: 15 },
        { kind: 'RUSHED', w: 15 },
        { kind: 'HEADWIND', w: 10 },
        { kind: 'BLIZZARD', w: 15 },
      ];
    } else if (stadiumKey === 'VOLCANO') {
      table = [
        { kind: 'DRUNK_STREAKER', w: 5 },
        { kind: 'THROWN_OBJECT', w: 10 },
        { kind: 'ANKLE_SPRAIN', w: 15 },
        { kind: 'SHOE_LOOSE', w: 25 },
        { kind: 'RUSHED', w: 20 },
        { kind: 'HEADWIND', w: 10 },
        { kind: 'HEATWAVE', w: 15 },
      ];
    } else {
      // TURF
      table = [
        { kind: 'DRUNK_STREAKER', w: 5 },
        { kind: 'THROWN_OBJECT', w: 10 },
        { kind: 'ANKLE_SPRAIN', w: 25 },
        { kind: 'SHOE_LOOSE', w: 20 },
        { kind: 'RUSHED', w: 25 },
        { kind: 'HEADWIND', w: 15 },
      ];
    }

    let roll = Math.random() * 100;
    for (const item of table) {
      roll -= item.w;
      if (roll <= 0) return item.kind;
    }
    return table[table.length - 1].kind;
  }

  function triggerLateStartEncounter() {
    if (!state.encountersEnabled || state.runners.length === 0) return;
    // 40% chance at GATE OPEN for 1 random runner (2 if 10+ runners) to suffer 늦은 출발(出遅れ)!
    if (Math.random() >= 0.40) return;

    const count = state.runners.length >= 10 ? 2 : 1;
    const targets = pickRandomRunners(count, false);
    if (targets.length === 0) return;

    const names = targets.map((r) => r.label).join(', ');
    sound.playDebuffHit();
    targets.forEach((r) => {
      applyDebuff(r, {
        type: 'LATE_START',
        icon: '⏱️',
        label: '늦은 출발!',
        mult: 0.50,
        duration: 1.55,
        color: '#ff9f43',
      });
    });

    showEncounterCutin('⚠ GATE DELAY // 늦은 출발(出遅れ)', `⏱️ [${names}] 출발 지연!!`, '게이트 반응이 늦어 초반 가속에서 뒤처집니다!');
    setCommentary(`⏱️ 앗!! [${names}] 주자가 게이트에서 늦은 출발!! 출발이 크게 늦었습니다!!`, 'LATE START!', 'warning');
    state.lastCommentTime = state.realRaceElapsed;
  }

  function triggerRandomEncounter() {
    const alive = state.runners.filter((r) => !r.finished);
    if (alive.length === 0) return;

    const st = getActiveStadium();
    const kind = pickWeightedEncounter(st.key);
    const targetCount = alive.length >= 6 ? 2 : 1;

    switch (kind) {
      case 'DRUNK_STREAKER': {
        const targets = pickRandomRunners(Math.min(2, targetCount), false);
        const names = targets.map((r) => r.label).join(', ');
        sound.playSecurityWhistle();
        state.screenShake = 0.85;
        trackViewport.classList.add('boss-active');
        setTimeout(() => trackViewport.classList.remove('boss-active'), 2100);
        targets.forEach((r) => applyDebuff(r, { type: 'STREAKER', icon: '🍺', label: '취객 회피 급제동!', mult: 0.52, duration: 2.0, color: '#ff3864' }));
        const fx = { type: 'DRUNK_STREAKER', timer: 2.4, maxTimer: 2.4, targetId: targets[0].entryId, mesh3D: null };
        fx.mesh3D = engine3D.spawn3DEncounterMesh(fx);
        state.activeEncounterFX.push(fx);
        showEncounterCutin('⚠ SECURITY ALERT // 돌발 난입!', '🍺 관중석 취객 트랙 난입!!', `[${names}] 급제동 회피! 3D 경비원이 긴급 출동합니다!`);
        setCommentary(`🍺 비상!! 관중석에서 취객이 트랙으로 뛰어들었습니다!! [${names}] 급제동 회피!!`, 'INTRUDER!', 'warning');
        break;
      }
      case 'THROWN_OBJECT': {
        const targets = pickRandomRunners(targetCount, false);
        const names = targets.map((r) => r.label).join(', ');
        const items = [{ icon: '🥤', name: '음료수 컵' }, { icon: '🍾', name: '물병' }, { icon: '📣', name: '응원봉' }, { icon: '🧢', name: '모자' }];
        const item = items[Math.floor(Math.random() * items.length)];
        sound.playDebuffHit();
        state.screenShake = 0.7;
        targets.forEach((r) => applyDebuff(r, { type: 'THROWN', icon: item.icon, label: `${item.name} 피격!`, mult: 0.54, duration: 1.85, color: '#ffe600' }));
        const fx = { type: 'THROWN_OBJECT', timer: 1.5, maxTimer: 1.5, targetId: targets[0].entryId, mesh3D: null };
        fx.mesh3D = engine3D.spawn3DEncounterMesh(fx);
        state.activeEncounterFX.push(fx);
        showEncounterCutin('⚠ FOUL CROWD // 관중 투척물', `${item.icon} 관중석에서 ${item.name} 투척!!`, `[${names}] 정통으로 맞고 비틀거립니다!`);
        setCommentary(`${item.icon} 앗!! 관중석에서 날아온 ${item.name}에 [${names}] 주자가 맞았습니다!!`, 'FOUL HIT!', 'warning');
        break;
      }
      case 'ANKLE_SPRAIN': {
        const r = pickRandomRunners(1, false)[0];
        sound.playDebuffHit();
        applyDebuff(r, { type: 'SPRAIN', icon: '🩹', label: '발목 삠!', mult: 0.56, duration: 2.5, color: '#ff9f43' });
        showEncounterCutin('⚠ ACCIDENT // 코너 돌발 부상', `🩹 [${r.label}] 발목을 삐끗했습니다!`, '착지 실수로 절뚝거리며 속도가 급감합니다!');
        setCommentary(`🩹 앗!! [${r.label}] 주자가 발목을 삐었습니다!! 절뚝이며 페이스 급락!!`, 'INJURY!', 'warning');
        break;
      }
      case 'SHOE_LOOSE': {
        const r = pickRandomRunners(1, false)[0];
        sound.playDebuffHit();
        applyDebuff(r, { type: 'SHOE', icon: '👟', label: '편자 탈락!', mult: 0.58, duration: 2.2, color: '#ff70d9' });
        const fx = { type: 'SHOE_LOOSE', timer: 1.4, maxTimer: 1.4, targetId: r.entryId, mesh3D: null };
        fx.mesh3D = engine3D.spawn3DEncounterMesh(fx);
        state.activeEncounterFX.push(fx);
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
        const title = kind === 'BLIZZARD' ? '❄️ 극한 눈보라 강타!' : kind === 'SANDSTORM' ? '🏜️ 사막 모래바람 엄습!' : kind === 'HEATWAVE' ? '🥵 경기장 열풍 탈진!' : '🌪️ 경기장 강풍 돌풍!';
        const icon = kind === 'BLIZZARD' ? '🥶' : kind === 'HEATWAVE' ? '🥵' : '🌪️';
        const debuffLabel = kind === 'BLIZZARD' ? '빙결 둔화!' : kind === 'SANDSTORM' ? '모래 시야 방해!' : kind === 'HEATWAVE' ? '열기 탈진!' : '맞바람 저항!';
        targets.forEach((r) => applyDebuff(r, { type: 'WIND', icon, label: debuffLabel, mult: 0.63, duration: 2.2, color: '#7ce8ff' }));
        showEncounterCutin('⚠ WEATHER // 경기장 기상 변수', title, `선두 [${names}] 정면 직격! 추격 찬스!`);
        setCommentary(`${icon} ${title} 선두권 [${names}] 주자가 거센 저항을 받습니다!`, 'WEATHER!', 'warning');
        break;
      }
      case 'RUSHED': {
        const r = pickRandomRunners(1, false)[0];
        sound.playDebuffHit();
        applyDebuff(r, { type: 'RUSHED', icon: '💢', label: '흥분 탈진!', mult: 0.62, duration: 2.2, color: '#ff2a85' });
        showEncounterCutin('⚠ CONDITION // 흥분(掛かり)', `💢 [${r.label}] 흥분 상태 돌입!`, '페이스 조절 실패로 체력이 급격히 소모됩니다!');
        setCommentary(`💢 앗! [${r.label}] 주자 흥분 상태!! 페이스가 무너집니다!`, 'RUSHED!', 'warning');
        break;
      }
    }
    state.lastCommentTime = state.realRaceElapsed;
  }

  /* =========================================================
   * 3D Transforms, Camera & Corner 2D Circuit Radar
   * ========================================================= */
  function syncRunners3DTransform(dtReal) {
    if (!engine3D.ready) return;

    // Gate doors animation
    engine3D.gateDoors.forEach((pivot) => {
      pivot.rotation.y = state.gateOpenAnim * (Math.PI * 0.46);
    });

    // Obstacle visibility for current lap window
    const leaderDist = state.runners.reduce((m, r) => Math.max(m, r.dist), 0);
    const lapM = getLapMeters();
    state.obstacles.forEach((obs) => {
      if (!obs.mesh3D) return;
      const visible = !obs.triggered && obs.dist >= leaderDist - 60 && obs.dist <= leaderDist + lapM * 0.85;
      obs.mesh3D.visible = visible;
    });

    // Runners 3D animation
    const nowT = performance.now() * 0.005;
    state.runners.forEach((r) => {
      if (!r.rig3D) return;
      const rig = r.rig3D;
      const pos = getRunnerWorldPos(r);
      const isRunning = state.phase === 'RACING' || r.speed > 5;
      const progress = r.dist / state.courseDistance;
      const isEndRocket = r.style === 'END' && progress > 0.68 && !r.finished && state.phase === 'RACING';

      const stride = isRunning ? r.stridePhase : 0;
      const jumpY = r.jumpTimer > 0 ? Math.sin((r.jumpTimer / 0.45) * Math.PI) * 3.4 : 0;
      const bobY = isRunning ? Math.abs(Math.sin(stride)) * 0.55 : Math.sin(nowT + r.gate) * 0.08;

      rig.root.position.set(pos.x, jumpY, pos.z);
      rig.root.rotation.y = Math.atan2(pos.tx, pos.tz);

      rig.bodyPivot.position.y = bobY;
      // Forward sprint lean + lateral banking lean when steering!
      const sprintLean = isRunning ? (r.skillTimer > 0 || r.buffTimer > 0 || r.duelTimer > 0 || isEndRocket ? 0.34 : 0.2) : 0.02;
      const wobble = r.debuff || r.stumbleTimer > 0 ? Math.sin(performance.now() * 0.03) * 0.22 : 0;
      rig.bodyPivot.rotation.x = sprintLean;
      rig.bodyPivot.rotation.z = -r.laneVel * 0.14 + wobble;

      // Leg & Arm Gallop Swing
      const swing = isRunning ? Math.sin(stride) * 0.95 : 0;
      rig.legL.rotation.x = swing;
      rig.legR.rotation.x = -swing;
      rig.armL.rotation.x = -swing * 0.85;
      rig.armR.rotation.x = swing * 0.85;
      rig.tailPivot.rotation.y = Math.sin(stride * 1.4) * 0.35;

      // Aura & Debuff Rings
      const hasBoostAura = r.skillTimer > 0 || r.buffTimer > 0 || r.duelTimer > 0 || isEndRocket;
      rig.auraRing.visible = hasBoostAura;
      if (hasBoostAura) {
        rig.auraRing.rotation.z += dtReal * 5;
        const ringCol = r.duelTimer > 0 ? 0xffe600 : r.buffTimer > 0 ? 0x39ff14 : isEndRocket ? 0xb026ff : new THREE.Color(r.color).getHex();
        rig.auraRing.material.color.setHex(ringCol);
      }

      rig.debuffRing.visible = Boolean(r.debuff);
      if (r.debuff) {
        rig.debuffRing.rotation.z -= dtReal * 6;
        rig.debuffRing.material.color.set(r.debuff.color);
      }

      engine3D.updateRunnerNameplate(rig, r);
    });

    // Update 3D Encounter Meshes
    for (let i = state.activeEncounterFX.length - 1; i >= 0; i--) {
      const fx = state.activeEncounterFX[i];
      fx.timer -= dtReal;
      const r = state.runners.find((u) => u.entryId === fx.targetId);
      const progress = 1 - fx.timer / fx.maxTimer;

      if (fx.mesh3D && r) {
        const pos = getRunnerWorldPos(r);
        if (fx.type === 'DRUNK_STREAKER') {
          fx.mesh3D.position.set(pos.x + pos.tx * 7, 0, pos.z + pos.tz * 7);
          fx.mesh3D.rotation.y = Math.atan2(pos.tx, pos.tz);
          fx.mesh3D.userData.drunk.rotation.z = Math.sin(performance.now() * 0.025) * 0.35;
        } else if (fx.type === 'THROWN_OBJECT') {
          const sx = pos.x + pos.nx * 18;
          const sz = pos.z + pos.nz * 18;
          const p = Math.min(1, progress * 1.8);
          fx.mesh3D.position.set(sx + (pos.x - sx) * p, 2 + Math.sin(p * Math.PI) * 10, sz + (pos.z - sz) * p);
          fx.mesh3D.rotation.x += dtReal * 14;
          fx.mesh3D.rotation.z += dtReal * 10;
        } else if (fx.type === 'STRAY_PIGEONS') {
          fx.mesh3D.position.set(pos.x + pos.tx * 4, 2.5, pos.z + pos.tz * 4);
          fx.mesh3D.userData.birds.forEach((b, bIdx) => {
            const a = bIdx * 1.1 + performance.now() * 0.008;
            b.position.set(Math.cos(a) * 4.5, Math.sin(a * 2) * 1.4, Math.sin(a) * 4.5);
          });
        } else if (fx.type === 'SHOE_LOOSE') {
          fx.mesh3D.position.set(
            pos.x - pos.tx * (3 + progress * 14),
            0.6 + Math.sin(progress * Math.PI) * 4.5,
            pos.z - pos.tz * (3 + progress * 14)
          );
          fx.mesh3D.rotation.x += dtReal * 16;
        }
      }

      if (fx.timer <= 0) {
        if (fx.mesh3D) engine3D.fxGroup.remove(fx.mesh3D);
        state.activeEncounterFX.splice(i, 1);
      }
    }
  }

  function update3DCamera(dtReal) {
    if (!engine3D.ready) return;

    const sorted = getSortedStandings();
    const targetPos = new THREE.Vector3();
    const targetLook = new THREE.Vector3();

    if (state.cameraMode === 'HELI') {
      targetPos.set(0, 265, 195);
      targetLook.set(0, 0, 10);
    } else if (sorted.length > 0) {
      // Weighted front-pack focus
      const top = sorted.slice(0, Math.min(3, sorted.length));
      let sx = 0;
      let sz = 0;
      let sw = 0;
      let ltx = 1;
      let ltz = 0;
      let lnx = 0;
      let lnz = 1;
      top.forEach((r, idx) => {
        const p = getRunnerWorldPos(r);
        const w = idx === 0 ? 0.65 : idx === 1 ? 0.23 : 0.12;
        sx += p.x * w;
        sz += p.z * w;
        sw += w;
        if (idx === 0) {
          ltx = p.tx;
          ltz = p.tz;
          lnx = p.nx;
          lnz = p.nz;
        }
      });
      const px = sx / sw;
      const pz = sz / sw;

      if (state.photoSlowMoActive) {
        // Dramatic low side-angle 3D Photo Finish Camera right at the finish wire!
        const g0 = track.sample(0, 0);
        targetPos.set(g0.cx + g0.nx * 30 + g0.tx * 6, 7.2, g0.cz + g0.nz * 30 + g0.tz * 6);
        targetLook.set(g0.cx, 2.2, g0.cz);
      } else if (state.cameraMode === 'BROADCAST') {
        // Classic G1 TV Broadcast Camera perched on the infield Jumbotron panning 360°!
        targetPos.set(px * 0.36, 44, pz * 0.36 + 14);
        targetLook.set(px + ltx * 10, 2.2, pz + ltz * 10);
      } else {
        // Dynamic 3D Uma-Musume Chase Cam behind & slightly outside the front pack (+ touch/mouse drag orbit!)
        if (!state.isDraggingCam && Math.abs(state.camOrbitYaw) > 0.002) {
          state.camOrbitYaw *= Math.pow(0.95, dtReal * 60);
        }
        const backDist = state.spurtTriggered ? 19.5 : 23.5;
        const sideDist = state.spurtTriggered ? 9.5 : 11.5;
        const camH = state.spurtTriggered ? 9.8 : 12.6;
        const baseOx = -ltx * backDist + lnx * sideDist;
        const baseOz = -ltz * backDist + lnz * sideDist;
        const cosA = Math.cos(state.camOrbitYaw);
        const sinA = Math.sin(state.camOrbitYaw);
        const rotOx = baseOx * cosA - baseOz * sinA;
        const rotOz = baseOx * sinA + baseOz * cosA;
        targetPos.set(px + rotOx, camH, pz + rotOz);
        targetLook.set(px + ltx * 16, 2.4, pz + ltz * 16);
      }
    } else {
      const g0 = track.sample(0, 0);
      targetPos.set(g0.cx - 24, 13.5, g0.cz + 18);
      targetLook.set(g0.cx + 14, 2.5, g0.cz);
    }

    const lerp = Math.min(1, dtReal * 5.2);
    engine3D.camPos.lerp(targetPos, lerp);
    engine3D.camLook.lerp(targetLook, lerp);

    engine3D.camera.position.copy(engine3D.camPos);
    if (state.screenShake > 0.02) {
      engine3D.camera.position.x += (Math.random() - 0.5) * state.screenShake * 1.8;
      engine3D.camera.position.y += (Math.random() - 0.5) * state.screenShake * 1.4;
    }
    engine3D.camera.lookAt(engine3D.camLook);
  }

  function draw2DCornerRadar() {
    const ctx = radarCtx;
    const rw = radarCanvas.width;
    const rh = radarCanvas.height;
    const st = getActiveStadium();

    ctx.clearRect(0, 0, rw, rh);
    ctx.fillStyle = 'rgba(5, 9, 24, 0.84)';
    ctx.strokeStyle = st.railAccentCss;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(1, 1, rw - 2, rh - 2, 10);
    ctx.fill();
    ctx.stroke();

    const scale = Math.min((rw - 24) / 430, (rh - 22) / 265);
    const ox = rw / 2;
    const oy = rh / 2;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 5;
    ctx.beginPath();
    for (let i = 0; i < track.samples.length; i += 4) {
      const s = track.samples[i];
      const px = ox + s.x * scale;
      const py = oy + s.z * scale;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = st.railAccentCss;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const g0 = track.sample(0, 0);
    ctx.fillStyle = '#ffe600';
    ctx.beginPath();
    ctx.arc(ox + g0.cx * scale, oy + g0.cz * scale, 3.6, 0, Math.PI * 2);
    ctx.fill();

    const sorted = getSortedStandings();
    const leaderId = sorted[0]?.entryId;
    state.runners.forEach((r) => {
      const pos = getRunnerWorldPos(r);
      const px = ox + pos.x * scale;
      const py = oy + pos.z * scale;
      const isLeader = r.entryId === leaderId;
      ctx.fillStyle = r.color;
      ctx.beginPath();
      ctx.arc(px, py, isLeader ? 4.4 : 2.9, 0, Math.PI * 2);
      ctx.fill();
      if (isLeader) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    });

    const leader = sorted[0];
    const totalLaps = getTotalLaps();
    const currLap = leader ? Math.min(totalLaps, Math.floor(leader.dist / getLapMeters()) + 1) : 1;
    ctx.fillStyle = '#9db4e6';
    ctx.font = '800 9px Orbitron, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`LAP ${currLap}/${totalLaps}`, rw / 2, rh / 2 + 3);
  }

  /* =========================================================
   * Main Physics Loop & Race Flow
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

    const chosen =
      state.selectedStadium === 'RANDOM'
        ? STADIUM_KEYS[Math.floor(Math.random() * STADIUM_KEYS.length)]
        : state.selectedStadium;
    applyStadiumTheme(chosen);

    buildGateRunners(true);
    state.phase = 'COUNTDOWN';
    state.countdownTimer = 1.65;
    state.lastCountdownInt = 4;
    state.raceClock = 0;
    state.realRaceElapsed = 0;
    state.finishHoldTimer = 0;
    state.lastLeaderId = null;
    state.lastCommentTime = 0;

    setCommentary(`[${getActiveStadium().name} · ${state.courseDistance}m (${getTotalLaps()}랩)] 3D 게이트 인 완료!`, 'GATE IN');
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
    setCommentary('🔔 게이트 오픈!! 3D 트랙 위로 전 주자 힘차게 스타트합니다!!', 'START');
    setTimeout(() => {
      if (state.phase === 'RACING') triggerLateStartEncounter();
    }, 260);
  }

  function formatRaceTime(sec) {
    const scale = state.courseDistance === 1200 ? 6.8 : state.courseDistance === 1600 ? 7.2 : state.courseDistance === 2400 ? 8.1 : 8.6;
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
    return lengths >= 10 ? '대차' : `${lengths}마신`;
  }

  function finalizeRace() {
    state.phase = 'FINISHED';
    trackViewport.classList.remove('spurt-active', 'boss-active');
    speedLinesOverlay.classList.add('hidden');
    hideCenterBanner();
    skillCutin.classList.add('hidden');
    encounterCutin.classList.add('hidden');
    syncControlsLock();

    const standings = getSortedStandings();
    const winner = standings[0];
    if (!winner) return;

    const finishTimeStr = formatRaceTime(winner.finishTime || state.raceClock);
    const st = getActiveStadium();
    setCommentary(`🏆 1착 [${winner.label}] (${STYLE_META[winner.style].label})!! ${st.name} ${state.courseDistance}m 3D 제패!`, 'FINISH');
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
    const rect = trackViewport.getBoundingClientRect();
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

  function updateRacePhysics(dtReal) {
    const st = getActiveStadium();
    if (state.screenShake > 0) state.screenShake = Math.max(0, state.screenShake - dtReal * 2.2);
    if (state.photoFlashAlpha > 0) {
      state.photoFlashAlpha = Math.max(0, state.photoFlashAlpha - dtReal * 2.6);
      photoFlashOverlay.style.opacity = String(state.photoFlashAlpha);
    }

    // Update 3D Jumbotron display
    const sortedTop = getSortedStandings();
    const lead = sortedTop[0];
    const totalLaps = getTotalLaps();
    const currLap = lead ? Math.min(totalLaps, Math.floor(lead.dist / getLapMeters()) + 1) : 1;
    if (state.phase === 'RACING' && lead) {
      const rem = Math.max(0, Math.ceil(state.courseDistance - lead.dist));
      engine3D.updateJumbotronTexture(st, `LAP ${currLap} / ${totalLaps}`, `1위 ${lead.label}`, state.spurtTriggered ? `🔥 LAST SPURT ${rem}m` : `REMAIN ${rem}m`);
    } else {
      engine3D.updateJumbotronTexture(st, `${state.courseDistance}M · ${totalLaps} LAP`, st.shortShape, 'NEON DERBY 3D');
    }

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

    if (state.gateOpenAnim < 1) state.gateOpenAnim = Math.min(1, state.gateOpenAnim + dtReal * 5.5);

    let leaderDist = 0;
    let firstFinisher = null;
    for (const r of state.runners) {
      if (r.dist > leaderDist) leaderDist = r.dist;
      if (r.finished && (!firstFinisher || r.finishTime < firstFinisher.finishTime)) firstFinisher = r;
    }

    const leaderProgress = leaderDist / state.courseDistance;
    const remainMeters = Math.max(0, state.courseDistance - leaderDist);
    distanceRemaining.textContent = remainMeters <= 0 ? 'GOAL!' : `${Math.ceil(remainMeters)}m`;

    if (
      state.encountersEnabled &&
      !firstFinisher &&
      state.nextEncounterIdx < state.encounterTriggers.length &&
      leaderProgress >= state.encounterTriggers[state.nextEncounterIdx]
    ) {
      state.nextEncounterIdx++;
      triggerRandomEncounter();
    }

    // Corner & Lap commentary
    const lapU = distToLapU(leaderDist) % 1;
    const sectionKey = currLap * 10 + (lapU < 0.16 ? 0 : lapU < 0.38 ? 1 : lapU < 0.64 ? 2 : lapU < 0.86 ? 3 : 4);
    if (!firstFinisher && !state.spurtTriggered && sectionKey !== state.lastSectionAnnounced && state.realRaceElapsed - state.lastCommentTime > 2.3) {
      state.lastSectionAnnounced = sectionKey;
      const sec = sectionKey % 10;
      if (lead) {
        if (sec === 0 && currLap > 1) {
          setCommentary(`${currLap === totalLaps ? '🔥 파이널 랩 진입!!' : `🔔 ${currLap}번째 바퀴 진입!`} [${lead.label}] 선두 통과!`, `LAP ${currLap}/${totalLaps}`);
          state.lastCommentTime = state.realRaceElapsed;
        } else if (sec === 1) {
          setCommentary(`🌀 ${st.cornerLabels[0]} 진입! [${lead.label}] 선두 질주 중!`, 'CORNER 1·2');
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

    const spurtThreshold = state.courseDistance >= 2400 ? 480 : 360;
    if (!state.spurtTriggered && remainMeters <= spurtThreshold && state.courseDistance > spurtThreshold) {
      state.spurtTriggered = true;
      trackViewport.classList.add('spurt-active');
      speedLinesOverlay.classList.remove('hidden');
      sound.playLastSpurtAlarm();
      setCommentary('🔥 최종 코너 돌파!! 라스트 스퍼트!! 결승선을 향해 전력 질주합니다!!', 'LAST SPURT!', 'spurt');
    }

    const nearGoal = !firstFinisher && remainMeters <= 42 && remainMeters > 0;
    let timeScale = state.speedMultiplier;
    if (nearGoal) {
      timeScale = 0.34;
      if (!state.photoSlowMoActive) {
        state.photoSlowMoActive = true;
        setCommentary('📸 3D 포토 피니시!! 결승선 직전 숨 막히는 초접전!!', 'PHOTO FINISH', 'photo');
      }
    } else {
      state.photoSlowMoActive = false;
    }

    const dt = dtReal * timeScale;
    state.raceClock += dt;
    state.realRaceElapsed += dtReal;

    const baseSpeed = getCourseBaseSpeed();
    const packLeaderDist = sortedTop[0] ? sortedTop[0].dist : 0;

    updateLaneSteeringAndJostling(dt);

    state.runners.forEach((r) => {
      const progress = Math.max(0, Math.min(1.08, r.dist / state.courseDistance));

      if (!r.finished) {
        const styleMult = getStylePaceMultiplier(r.style, progress);
        const wave = Math.sin(state.raceClock * r.waveFreq + r.wavePhase) * 0.032;
        const formRamp = progress < 0.35 ? 0.015 : 0.015 + ((progress - 0.35) / 0.65) * 0.072;
        const formBonus = r.formFactor * formRamp;

        let draftBonus = 0;
        if (progress < 0.65) {
          const gapBehind = packLeaderDist - r.dist;
          const threshold = state.courseDistance >= 2400 ? 60 : 42;
          if (gapBehind > threshold) draftBonus = Math.min(0.055, (gapBehind - threshold) * 0.0012);
        }

        if (r.nextSkillIdx < r.skillTriggers.length && progress >= r.skillTriggers[r.nextSkillIdx].at) {
          const trigger = r.skillTriggers[r.nextSkillIdx];
          r.nextSkillIdx++;
          r.skillTimer = trigger.duration + Math.min(0.45, Math.log(r.weight) * 0.14);
          r.activeSkillBoost = state.encountersEnabled && typeof trigger.encounterBoost === 'number' ? trigger.encounterBoost : trigger.boost;
          r.activeSkillJostleBonus = trigger.jostleBonus || 0;
          const pool = SKILLS_BY_STYLE[r.style] || SKILLS_BY_STYLE.PACE;
          r.activeSkillName = pool[Math.floor(Math.random() * pool.length)];
          sound.playSkillProc();
          showSkillCutin(r.label, r.activeSkillName, r.color);
          if (state.realRaceElapsed - state.lastCommentTime > 1.2) {
            setCommentary(`✨ [${r.label}] 스킬 발동 — ${r.activeSkillName}`, state.spurtTriggered ? 'LAST SPURT!' : 'SKILL!', state.spurtTriggered ? 'spurt' : '');
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
        const targetSpeed = baseSpeed * gateAccel * (styleMult + wave + formBonus + draftBonus + skillBoost + padBoost + duelBoost) * debuffMult * stumbleMult;
        r.speed += (targetSpeed - r.speed) * Math.min(1, dt * 6.5);
        const prevDist = r.dist;
        r.dist += r.speed * dt;

        // 3D Obstacle collisions
        if (state.obstaclesEnabled) {
          for (const obs of state.obstacles) {
            if (obs.triggered) continue;
            if (prevDist < obs.dist && r.dist >= obs.dist && Math.abs(r.laneNorm - obs.laneNorm) < 0.26) {
              obs.triggered = true;
              if (obs.type === 'BOOST') {
                r.buffTimer = 1.15;
                sound.playBoostPad();
              } else if (obs.type === 'HURDLE') {
                if (Math.random() < (r.skillTimer > 0 ? 0.68 : 0.34)) {
                  r.jumpTimer = 0.45;
                  sound.playJump();
                } else {
                  sound.playDebuffHit();
                  state.screenShake = Math.max(state.screenShake, 0.6);
                  applyDebuff(r, { type: 'STUMBLE', icon: '🚧', label: '장애물 충돌!', mult: 0.56, duration: 1.35, color: '#ff6b00' });
                }
              } else if (obs.type === 'SLIP') {
                sound.playDebuffHit();
                applyDebuff(r, { type: 'SLIP', icon: '💫', label: '미끄러짐!', mult: 0.52, duration: 1.45, color: '#ffe600' });
              } else if (obs.type === 'MUD') {
                sound.playDebuffHit();
                applyDebuff(r, { type: 'MUD', icon: '🐌', label: '늪지 감속!', mult: 0.6, duration: 1.75, color: '#b089ff' });
              }
            }
          }
        }

        if (r.dist >= state.courseDistance) {
          const overshoot = r.dist - state.courseDistance;
          r.finished = true;
          r.finishTime = state.raceClock - overshoot / Math.max(1, r.speed);
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

      r.stridePhase += dt * (r.speed * 0.165);

      // 3D Hoof Dust & Overdrive Spark Trail!
      const isEndRocket = r.style === 'END' && progress > 0.68 && !r.finished;
      if (r.speed > 30 && Math.random() < (r.skillTimer > 0 || isEndRocket ? 0.55 : 0.22)) {
        const pos = getRunnerWorldPos(r);
        const colHex = r.debuff ? new THREE.Color(r.debuff.color).getHex() : isEndRocket ? 0xb026ff : r.skillTimer > 0 ? new THREE.Color(r.color).getHex() : st.dustColor;
        engine3D.spawn3DParticle(
          pos.x - pos.tx * 1.2, 0.35, pos.z - pos.tz * 1.2,
          -pos.tx * 5 + (Math.random() - 0.5) * 3, 2.5 + Math.random() * 3, -pos.tz * 5 + (Math.random() - 0.5) * 3,
          colHex, 0.38
        );
      }
    });

    sound.playHoofPulse(state.spurtTriggered);

    const sortedNow = getSortedStandings();
    const currLeader = sortedNow[0];
    if (currLeader && !firstFinisher && state.realRaceElapsed > 1.2) {
      if (state.lastLeaderId && state.lastLeaderId !== currLeader.entryId && state.realRaceElapsed - state.lastCommentTime > 1.5) {
        setCommentary(`🔥 선두 교체!! [${currLeader.label}] 주자가 치고 나오며 1위로 올라섭니다!!`, state.spurtTriggered ? 'LAST SPURT!' : 'LEAD CHANGE', state.spurtTriggered ? 'spurt' : '');
        state.lastCommentTime = state.realRaceElapsed;
      }
      state.lastLeaderId = currLeader.entryId;
    }

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
      if (state.runners.every((r) => r.finished) || state.finishHoldTimer >= 1.25) {
        state.runners.forEach((r) => {
          if (!r.finished) {
            r.finishTime = state.raceClock + Math.max(0.1, state.courseDistance - r.dist) / Math.max(40, r.speed || baseSpeed);
            r.finished = true;
          }
        });
        finalizeRace();
      }
    }
  }

  /* =========================================================
   * Main Animation Loop
   * ========================================================= */
  let lastNow = performance.now();

  function frame(now) {
    const dtReal = Math.min(0.05, (now - lastNow) / 1000);
    lastNow = now;

    updateRacePhysics(dtReal);
    syncRunners3DTransform(dtReal);
    update3DCamera(dtReal);
    engine3D.update3DFX(dtReal, getActiveStadium());
    engine3D.render();
    draw2DCornerRadar();
    confetti.updateAndDraw(dtReal * 60);

    requestAnimationFrame(frame);
  }

  /* =========================================================
   * UI Helpers (Minimap, Leaderboard, Paddock, Presets, History, Modal)
   * ========================================================= */
  function getSortedStandings() {
    return [...state.runners].sort((a, b) => {
      if (a.finished && b.finished) return a.finishTime - b.finishTime;
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.dist - a.dist;
    });
  }

  function rebuildMinimapPins() {
    minimapPins.innerHTML = '';
    state.runners.forEach((r) => {
      const pin = document.createElement('div');
      pin.className = 'minimap-pin';
      pin.style.backgroundColor = r.color;
      pin.style.left = '0%';
      pin.textContent = String(r.gate);
      minimapPins.appendChild(pin);
    });
  }

  function updateMinimapPins() {
    const pins = minimapPins.children;
    for (let i = 0; i < state.runners.length && i < pins.length; i++) {
      pins[i].style.left = `${Math.max(0, Math.min(100, (state.runners[i].dist / state.courseDistance) * 100))}%`;
    }
  }

  function updateLeaderboardUI() {
    const topN = getSortedStandings().slice(0, 6);
    leaderboardList.innerHTML = '';
    topN.forEach((r, idx) => {
      const li = document.createElement('li');
      li.className = 'lb-row';
      const posClass = idx === 0 ? 'p1' : idx === 1 ? 'p2' : idx === 2 ? 'p3' : '';
      const statusHtml = r.debuff ? `<span class="lb-debuff">${r.debuff.icon}</span>` : r.duelTimer > 0 ? `<span class="lb-debuff">🔥</span>` : '';
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
    state.skillCutinTimer = 1.9;
  }

  function showEncounterCutin(tag, title, desc) {
    encounterCutinTag.textContent = tag;
    encounterCutinTitle.textContent = title;
    encounterCutinDesc.textContent = desc;
    encounterCutin.classList.remove('hidden');
    state.encounterCutinTimer = 2.6;
  }

  function showCenterBanner(text) {
    centerBannerText.textContent = text;
    centerBanner.classList.remove('hidden');
  }

  function hideCenterBanner() {
    centerBanner.classList.add('hidden');
  }

  function isBusy() {
    return state.phase === 'COUNTDOWN' || state.phase === 'RACING';
  }

  function syncControlsLock() {
    const busy = isBusy();
    startRaceBtn.disabled = busy || getActiveEntries().length === 0;
    shuffleGateBtn.disabled = busy || getActiveEntries().length < 2;
    distanceGroup.querySelectorAll('.seg-btn').forEach((b) => (b.disabled = busy));
    stadiumGroup.querySelectorAll('.seg-btn').forEach((b) => (b.disabled = busy));
  }

  function syncSoundButton() {
    soundToggleBtn.classList.toggle('active', state.soundEnabled);
    soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
    soundToggleBtn.querySelector('.btn-text').textContent = state.soundEnabled ? 'SFX ON' : 'SFX OFF';
  }

  function syncStadiumButtons() {
    stadiumGroup.querySelectorAll('.seg-btn').forEach((btn) => btn.classList.toggle('active', btn.dataset.stadium === state.selectedStadium));
  }

  function syncDistanceButtons() {
    distanceGroup.querySelectorAll('.seg-btn').forEach((btn) => btn.classList.toggle('active', Number(btn.dataset.dist) === state.courseDistance));
    if (!isBusy()) distanceRemaining.textContent = `${state.courseDistance}m`;
  }

  function syncCameraButton() {
    const labels = { CHASE: '🎥 3D 추적', BROADCAST: '📺 중계 방송', HELI: '🚁 헬기 조감도' };
    cameraToggleBtn.textContent = labels[state.cameraMode] || '🎥 3D 추적';
    cameraToggleBtn.classList.toggle('fast', state.cameraMode !== 'HELI');
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
        if (isBusy()) { nameInput.value = entry.label; return; }
        const trimmed = nameInput.value.trim();
        if (trimmed) { entry.label = trimmed; saveState(); buildGateRunners(false); }
        else nameInput.value = entry.label;
      });

      const styleBtn = document.createElement('button');
      styleBtn.type = 'button';
      styleBtn.className = `style-cycle-btn style-${entry.style}`;
      styleBtn.textContent = STYLE_META[entry.style].label;
      styleBtn.addEventListener('click', () => {
        if (isBusy()) return;
        entry.style = STYLE_ORDER[(STYLE_ORDER.indexOf(entry.style) + 1) % STYLE_ORDER.length];
        saveState();
        renderEntries();
      });

      const weightWrap = document.createElement('div');
      weightWrap.className = 'weight-control';
      const minusBtn = document.createElement('button');
      minusBtn.type = 'button';
      minusBtn.className = 'weight-btn';
      minusBtn.textContent = '−';
      minusBtn.addEventListener('click', () => { if (!isBusy()) { entry.weight = Math.max(1, entry.weight - 1); saveState(); renderEntries(); } });
      const weightVal = document.createElement('span');
      weightVal.className = 'weight-val';
      weightVal.textContent = `×${entry.weight}`;
      const plusBtn = document.createElement('button');
      plusBtn.type = 'button';
      plusBtn.className = 'weight-btn';
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', () => { if (!isBusy()) { entry.weight = Math.min(20, entry.weight + 1); saveState(); renderEntries(); } });
      weightWrap.append(minusBtn, weightVal, plusBtn);

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'entry-action-btn';
      toggleBtn.textContent = entry.excluded ? '↺' : '👁';
      toggleBtn.addEventListener('click', () => { if (!isBusy()) { entry.excluded = !entry.excluded; saveState(); renderEntries(); } });

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'entry-action-btn delete';
      delBtn.textContent = '✕';
      delBtn.addEventListener('click', () => { if (!isBusy()) { state.entries = state.entries.filter((e) => e.id !== entry.id); saveState(); renderEntries(); } });

      li.append(gate, nameInput, styleBtn, weightWrap, toggleBtn, delBtn);
      entryList.appendChild(li);
    });

    if (syncTrack && !isBusy()) buildGateRunners(false);
  }

  function renderPresets() {
    presetGrid.innerHTML = '';
    PRESETS.forEach((preset) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-card';
      const preview = preset.items.map((it) => (typeof it === 'string' ? it : `${it.label}${it.weight > 1 ? `(×${it.weight})` : ''}`)).join(' · ');
      btn.innerHTML = `<span class="preset-card-title">${preset.title}</span><span class="preset-card-items">${preview}</span>`;
      btn.addEventListener('click', () => { if (!isBusy()) { applyPreset(preset, true); switchTab('entries'); } });
      presetGrid.appendChild(btn);
    });
  }

  function applyPreset(preset, shouldSave = true) {
    state.entries = preset.items.map((item, idx) =>
      typeof item === 'string' ? makeEntry(item, 1, idx, 'AUTO') : makeEntry(item.label, item.weight || 1, idx, item.style || 'AUTO')
    );
    if (shouldSave) {
      saveState();
      renderEntries();
      setCommentary('새 프리셋 출전 명단이 3D 게이트에 배치되었습니다!', 'READY');
    }
  }

  function renderHistory() {
    historyCountBadge.textContent = String(state.history.length);
    historyList.innerHTML = '';
    if (state.history.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'empty-state';
      empty.innerHTML = '아직 우승 기록이 없습니다.<br />첫 번째 3D G1 레이스를 시작해 보세요!';
      historyList.appendChild(empty);
      return;
    }
    state.history.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'history-item';
      const styleLabel = item.style && STYLE_META[item.style] ? STYLE_META[item.style].short : '';
      const stadiumShort = item.stadium ? item.stadium.split(' ')[0] : '';
      li.innerHTML = `
        <div class="history-left">
          <span class="history-rank">G1 #${state.history.length - idx}</span>
          <span class="lb-dot" style="background:${item.color || '#00f5ff'}"></span>
          <span class="history-name"></span>
        </div>
        <span class="history-meta">${stadiumShort} ${item.distance || 1200}m · ${styleLabel} · ${item.record || item.time}</span>
      `;
      li.querySelector('.history-name').textContent = item.label;
      historyList.appendChild(li);
    });
  }

  let modalWinnerId = null;

  function openResultModal(standings, recordStr, autoExcludedNow) {
    const winner = standings[0];
    modalWinnerId = winner.entryId;
    modalGlowBar.style.background = winner.color;
    winnerBadge.textContent = `🏆 ${winner.gate}번 게이트 · 1착`;
    winnerStylePill.textContent = STYLE_META[winner.style].label;
    winnerTimePill.textContent = `${getActiveStadium().name} · ${state.courseDistance}m · ${recordStr}`;
    winnerTitle.textContent = winner.label;
    winnerTitle.style.textShadow = `0 0 18px ${winner.color}`;

    const remaining = getActiveEntries().length;
    if (autoExcludedNow) {
      winnerSubtext.textContent = remaining > 0 ? `우승 자동 제외 적용! (남은 주자 ${remaining}명)` : '모든 주자가 우승했습니다! 제외 복구로 다시 시작할 수 있어요.';
      modalExcludeBtn.classList.add('hidden');
    } else {
      winnerSubtext.textContent = '3D 서킷의 격렬한 승부 끝에 영광의 1착으로 결승선을 통과했습니다!';
      modalExcludeBtn.classList.remove('hidden');
    }

    standingsList.innerHTML = '';
    const winTime = winner.finishTime || state.raceClock;
    const baseSpeed = getCourseBaseSpeed();
    standings.forEach((r, idx) => {
      const li = document.createElement('li');
      li.className = `standing-row${idx === 0 ? ' first' : ''}`;
      const timeDiff = Math.max(0, (r.finishTime || winTime) - winTime);
      const marginText = idx === 0 ? recordStr : `${formatMargin(timeDiff * baseSpeed)} (+${(timeDiff * 6.8).toFixed(2)}s)`;
      li.innerHTML = `
        <span class="standing-rank">${idx === 0 ? '🥇 1착' : idx === 1 ? '🥈 2착' : idx === 2 ? '🥉 3착' : `${idx + 1}착`}</span>
        <span class="standing-runner"><span class="lb-dot" style="background:${r.color}"></span><span class="standing-runner-name"></span><span class="lb-style">${STYLE_META[r.style].short}</span></span>
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

  function switchTab(tabName) {
    document.querySelectorAll('.deck-tab').forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tabName));
    document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.toggle('active', panel.id === `tab-${tabName}`));
  }

  /* =========================================================
   * Event Listeners
   * ========================================================= */
  document.querySelectorAll('.deck-tab').forEach((btn) => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
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
  });

  stadiumGroup.querySelectorAll('.seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isBusy()) return;
      state.selectedStadium = btn.dataset.stadium || 'DIRT';
      syncStadiumButtons();
      if (state.selectedStadium !== 'RANDOM') {
        applyStadiumTheme(state.selectedStadium);
        buildGateRunners(false);
        setCommentary(`[${getActiveStadium().name}] 3D 경기장으로 전환되었습니다!`, '3D STADIUM');
      } else {
        setCommentary('🎲 레이스 시작 시 4개 3D 경기장 중 하나가 무작위 선택됩니다!', 'RANDOM');
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

  function cycleCameraMode() {
    const nextIdx = (CAMERA_MODES.indexOf(state.cameraMode) + 1) % CAMERA_MODES.length;
    state.cameraMode = CAMERA_MODES[nextIdx];
    syncCameraButton();
  }

  cameraToggleBtn.addEventListener('click', cycleCameraMode);

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
    if (e.key === 'Escape' && !resultModal.classList.contains('hidden')) { closeModal(); return; }
    if (!isTyping && (e.key === 'c' || e.key === 'C')) { cycleCameraMode(); return; }
    if (e.code === 'Space' && !isTyping && resultModal.classList.contains('hidden')) {
      e.preventDefault();
      if (!e.repeat && !isBusy()) startRace();
    }
  });

  obstaclesToggle.addEventListener('change', () => {
    state.obstaclesEnabled = obstaclesToggle.checked;
    saveState();
    setCommentary(state.obstaclesEnabled ? '🚧 3D 트랙 장애물 ON' : '🚧 3D 트랙 장애물 OFF', state.obstaclesEnabled ? 'OBSTACLE ON' : 'OBSTACLE OFF');
  });

  encountersToggle.addEventListener('change', () => {
    state.encountersEnabled = encountersToggle.checked;
    saveState();
    setCommentary(state.encountersEnabled ? '⚠️ 현실 돌발 인카운터 ON (추입 2스킬 +33% 적용)' : '⚠️ 돌발 인카운터 OFF', state.encountersEnabled ? 'EVENT ON' : 'EVENT OFF');
  });

  eliminationToggle.addEventListener('change', () => { state.autoExclude = eliminationToggle.checked; saveState(); });

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
    state.entries.forEach((e) => (e.excluded = false));
    saveState();
    renderEntries();
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

  const parseBulkLines = () => bulkTextarea.value.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 24);

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
    lines.forEach((label, i) => { if (state.entries.length < 24) state.entries.push(makeEntry(label, 1, baseIdx + i, 'AUTO')); });
    bulkPanel.classList.add('hidden');
    saveState();
    renderEntries();
  });

  generateNumbersBtn.addEventListener('click', () => {
    if (isBusy()) return;
    let s = parseInt(numStart.value, 10);
    let e = parseInt(numEnd.value, 10);
    if (Number.isNaN(s)) s = 1;
    if (Number.isNaN(e)) e = 8;
    if (s > e) [s, e] = [e, s];
    const count = Math.min(24, e - s + 1);
    state.entries = Array.from({ length: count }, (_, i) => makeEntry(`${s + i}번`, 1, i, 'AUTO'));
    saveState();
    renderEntries();
    switchTab('entries');
  });

  clearHistoryBtn.addEventListener('click', () => { state.history = []; saveState(); renderHistory(); });
  modalCloseBtn.addEventListener('click', closeModal);
  resultModal.addEventListener('click', (e) => { if (e.target === resultModal) closeModal(); });
  modalExcludeBtn.addEventListener('click', () => {
    if (modalWinnerId) {
      const target = state.entries.find((e) => e.id === modalWinnerId);
      if (target) target.excluded = true;
      saveState();
      renderEntries();
    }
    closeModal();
  });
  modalRaceAgainBtn.addEventListener('click', () => { closeModal(); if (getActiveEntries().length > 0) startRace(); });

  /* =========================================================
   * Mobile Touch Gestures (3D Camera Drag & Double-Tap) + Audio Unlock
   * ========================================================= */
  let dragLastX = 0;
  let lastTapTime = 0;

  threeMount.addEventListener('pointerdown', (e) => {
    state.isDraggingCam = true;
    dragLastX = e.clientX;
    const now = performance.now();
    if (now - lastTapTime < 300) {
      cycleCameraMode();
      lastTapTime = 0;
    } else {
      lastTapTime = now;
    }
  });

  window.addEventListener('pointermove', (e) => {
    if (!state.isDraggingCam || state.cameraMode !== 'CHASE') return;
    const dx = e.clientX - dragLastX;
    dragLastX = e.clientX;
    state.camOrbitYaw = Math.max(-1.4, Math.min(1.4, state.camOrbitYaw - dx * 0.0065));
  });

  window.addEventListener('pointerup', () => {
    state.isDraggingCam = false;
  });
  window.addEventListener('pointercancel', () => {
    state.isDraggingCam = false;
  });

  // Unlock Web Audio API on first mobile touch gesture (iOS Safari / Android Chrome)
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
  loadState();
  renderPresets();
  renderEntries();
  renderHistory();
  requestAnimationFrame(frame);
})();
