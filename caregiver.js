// 간단한 더미 데이터 (나중에 실제 시니어 데이터와 연결 가능)
const parentStatus = {
  morningMed: { done: true, time: "07:40" },
  eveningMed: { done: false, time: null },
  mood: { label: "보통", emoji: "😐", change: "어제와 비슷해요" },
  health: { label: "양호", level: "ok" }, // 'ok' | 'warn'
};

// 초기 진입 시 홈 화면 렌더링
document.addEventListener("DOMContentLoaded", () => {
  renderHome();
});

function goHome() {
  renderHome();
}

function goDetail() {
  renderDetail();
}

function goSettings() {
  renderSettings();
}

/* ----------------- 홈 화면 ----------------- */
function renderHome() {
  const screen = document.getElementById("screen");
  const { morningMed, eveningMed, mood, health } = parentStatus;

  screen.innerHTML = `
    <section class="home-top">
      <h2 class="section-title">오늘 부모님 상태 요약</h2>

      <div class="card">
        <h3 class="card-title">
          <span class="card-title-icon">💊</span>
          <span>복약 상태</span>
        </h3>
        <div class="card-row">
          <span class="card-label">아침 복약</span>
          <span class="card-value">
            ${morningMed.done ? "✔ 완료" : "미기록"}
          </span>
        </div>
        <div class="card-row">
          <span class="card-label">저녁 복약</span>
          <span class="card-value">
            ${eveningMed.done ? "✔ 완료" : "미기록"}
          </span>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">
          <span class="card-title-icon">🙂</span>
          <span>오늘 기분</span>
        </h3>
        <div class="card-row">
          <span class="card-label">기분</span>
          <span class="card-value">${mood.label} ${mood.emoji}</span>
        </div>
        <div class="card-row">
          <span class="card-label">어제와 비교</span>
          <span class="card-value">${mood.change}</span>
        </div>
      </div>

      <div class="card">
        <h3 class="card-title">
          <span class="card-title-icon">❤️</span>
          <span>건강 상태</span>
        </h3>
        <div class="card-row">
          <span class="card-label">전반 상태</span>
          <span class="card-value">
            ${
              health.level === "ok"
                ? `<span class="badge-ok">${health.label} ✔</span>`
                : `<span class="badge-warn">${health.label}</span>`
            }
          </span>
        </div>
      </div>
    </section>

    <section class="home-actions">
      <button class="primary-btn" onclick="goDetail()">
        부모님 상세 기록 보기
      </button>
      <button class="secondary-btn" onclick="goSettings()">
        알림 설정
      </button>
    </section>
  `;
}

/* ----------------- 상세 기록 화면 ----------------- */
function renderDetail() {
  const screen = document.getElementById("screen");
  const { morningMed, eveningMed, mood, health } = parentStatus;

  screen.innerHTML = `
    <section class="detail-section">
      <h2 class="section-title">부모님 오늘 기록</h2>

      <div class="card" style="margin-top:8px;">
        <h3 class="card-title">
          <span class="card-title-icon">💊</span>
          <span>복약</span>
        </h3>
        <div class="detail-item">
          <span class="detail-label">아침</span>
          <span>${morningMed.done ? `완료 (${morningMed.time})` : "미기록"}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">저녁</span>
          <span>${eveningMed.done ? `완료 (${eveningMed.time})` : "미기록"}</span>
        </div>
      </div>

      <div class="card" style="margin-top:12px;">
        <h3 class="card-title">
          <span class="card-title-icon">🙂</span>
          <span>기분</span>
        </h3>
        <p class="detail-label">오늘 기분</p>
        <p class="detail-item">
          <span>${mood.label} ${mood.emoji}</span>
          <span style="font-size:13px; color:#6b7280;">${mood.change}</span>
        </p>
      </div>

      <div class="card" style="margin-top:12px;">
        <h3 class="card-title">
          <span class="card-title-icon">❤️</span>
          <span>건강 상태</span>
        </h3>
        <p class="detail-item">
          <span class="detail-label">전반 상태</span>
          <span>
            ${
              health.level === "ok"
                ? `<span class="badge-ok">${health.label} ✔</span>`
                : `<span class="badge-warn">${health.label}</span>`
            }
          </span>
        </p>
      </div>

      <div style="margin-top:16px;">
        <button class="secondary-btn" onclick="goHome()">
          오늘 요약 화면으로 돌아가기
        </button>
      </div>
    </section>
  `;
}

/* ----------------- 알림 설정 화면 ----------------- */

// 간단한 on/off 상태 더미
const settingsState = {
  medAlert: true,
  moodAlert: false,
  healthAlert: true,
  reportAlert: false,
};

function toggleSetting(key) {
  settingsState[key] = !settingsState[key];
  renderSettings();
}

function renderSettings() {
  const screen = document.getElementById("screen");

  screen.innerHTML = `
    <section class="detail-section">
      <h2 class="section-title">알림 설정</h2>

      <div class="card" style="margin-top:8px;">
        <div class="setting-row">
          <span class="setting-label">복약 체크 미기록 알림</span>
          <div class="switch ${settingsState.medAlert ? "on" : ""}" onclick="toggleSetting('medAlert')">
            <div class="switch-thumb"></div>
          </div>
        </div>

        <div class="setting-row">
          <span class="setting-label">기분 기록 미입력 알림</span>
          <div class="switch ${settingsState.moodAlert ? "on" : ""}" onclick="toggleSetting('moodAlert')">
            <div class="switch-thumb"></div>
          </div>
        </div>

        <div class="setting-row">
          <span class="setting-label">건강 상태 '주의 필요' 알림</span>
          <div class="switch ${settingsState.healthAlert ? "on" : ""}" onclick="toggleSetting('healthAlert')">
            <div class="switch-thumb"></div>
          </div>
        </div>

        <div class="setting-row">
          <span class="setting-label">하루 리포트 알림 (향후)</span>
          <div class="switch ${settingsState.reportAlert ? "on" : ""}" onclick="toggleSetting('reportAlert')">
            <div class="switch-thumb"></div>
          </div>
        </div>
      </div>

      <p style="margin-top:10px; font-size:12px; color:#6b7280;">
        * 알림 기능은 추후 업데이트 시 실제 푸시 알림과 연동됩니다.
      </p>
    </section>
  `;
}
