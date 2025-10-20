<template>
  <div>
    <!-- 헤더영역 -->
    <Header_w lineColor="#092857" />
    <Side_menu />
    <!-- 헤더 구분선 -->
    <hr class="header_line" />
    <!-- 견적확인 -->
    <div class="esti_check esti_inner">
      <div class="esti_wrap">
        <!-- 영역 이름 -->
        <div class="esti_title">
          <router-link to="/estimate"><i class="fa-solid fa-arrow-left"></i></router-link>
          <p>예약하기</p>
          <p></p>
        </div>
        <!-- 게이지 -->
        <div class="esti_gauge">
          <span></span>
        </div>
        <!-- 주소 입력 -->
        <div class="addr">
          <p>
            서비스 받으실 주소를 입력해주세요.
            <span>(필수)</span>
          </p>
          <div class="form-group">
            <div class="input-with-button">
              <input
                type="text"
                id="address"
                v-model="address"
                placeholder="지번, 도로명, 건물명으로 검색"
                required
                @click="handleAddressSearch" />
            </div>
          </div>
          <div class="form-group">
            <input
              type="text"
              id="detailAddress"
              v-model="detailAddress"
              placeholder="상세주소를 입력하세요"
              required />
          </div>
        </div>
        <div class="service_date">
          <p>
            희망 서비스 날짜를 선택해주세요.
            <span>(필수)</span>
          </p>
        </div>
        <!-- 달력 -->
        <div class="calendar-header">
          <i class="fa-solid fa-square-caret-left" @click="prevMonth"></i>
          <span>{{ currentYear }}년 {{ currentMonth + 1 }}월</span>
          <i class="fa-solid fa-square-caret-right" @click="nextMonth"></i>
        </div>
        <div class="calendar">
          <!-- 달력 헤더 -->
          <div class="calendar_wrap">
            <!-- 요일 -->
            <div class="calendar-weekdays">
              <span
                v-for="day in weekDays"
                :key="day"
                :class="{ sun: day === '일', sat: day === '토' }">
                {{ day }}
              </span>
            </div>

            <!-- 날짜 -->
            <div class="calendar-days">
              <span v-for="blank in blanks" :key="'b' + blank"></span>

              <div
                v-for="date in daysInMonth"
                :key="date"
                class="calendar-day"
                :class="{
                  today: isToday(date),
                  sun: isSunday(date),
                  sat: isSaturday(date),
                  selected: selectedDate === date,
                  closed: isPastDate(date),
                }"
                @click="selectDate(date)">
                <p class="date">{{ date }}</p>
                <div class="day-status">
                  <span class="status">
                    {{ isPastDate(date) ? "마감" : "" }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 오전/오후 버튼 -->
        <div class="calendar-period" v-if="selectedDate">
          <button @click="selectPeriod('오전')" :class="{ active: selectedPeriod === '오전' }">
            오전
          </button>
          <button @click="selectPeriod('오후')" :class="{ active: selectedPeriod === '오후' }">
            오후
          </button>
        </div>
        <!-- 다음 버튼 -->
        <div v-if="selectDay !== false" class="infoCheck">
          <button class="btn" @click="openCheckModal">예약 정보 확인하기</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 예약정보 확인 모달 -->
  <div class="modal" v-if="showCheckModal">
    <div class="modal_bg"></div>
    <div class="check_modal">
      <p class="modal_title">예약 정보를 확인해 주세요.</p>
      <div class="info_w">
        <div>
          <p>성함</p>
          <p>{{ name }}</p>
        </div>
        <div>
          <p>전화번호</p>
          <p>{{ phone }}</p>
        </div>
        <div>
          <p>주소</p>
          <p>{{ address }} {{ detailAddress || "" }}</p>
        </div>
        <div>
          <p>날짜</p>
          <p>{{ formattedSelectedDate }}</p>
        </div>
      </div>
      <div class="reserbtns">
        <button class="btn" @click="reserCompleteModal">
          예약 확정하고
          <br />
          서비스 이용하기
        </button>
        <router-link class="btn btn_danger" to="/estimate02">
          입력사항
          <br />
          수정
        </router-link>
      </div>
    </div>
  </div>
  <!-- 로딩 모달 -->
  <div class="modal" v-if="showLoadingModal">
    <div class="modal_bg"></div>
    <div class="loading_modal">
      <div class="spinner"></div>
      <p class="loading_text">예약을 확인 중입니다...</p>
    </div>
  </div>

  <!-- 체크 완료 애니메이션 모달 -->
  <div class="modal" v-if="showCheckAnimation">
    <div class="modal_bg"></div>
    <div class="check_animation_modal">
      <div class="check_icon_container">
        <i class="fa-solid fa-check check_icon"></i>
      </div>
      <p class="check_text">예약이 확인되었습니다!</p>
    </div>
  </div>
  <!-- 예약 완료 모달 -->
  <div class="modal" v-if="showComplete">
    <div class="modal_bg"></div>
    <div class="check_modal">
      <i @click="goToHome" class="fa-solid fa-xmark x-mark"></i>
      <p class="modal_title">{{ reserComplete }}</p>
      <div class="modal_w">
        <img src="/images/reser_process.png" alt="진행과정아이콘" />
        <div class="reser_process">
          <p>예약 신청</p>
          <p>확인 중</p>
          <p>예약 확정</p>
        </div>
        <hr />
        <div class="reser_notice">
          <p>
            담당자가 배정되면
            <strong>입력하신 연락처로</strong>
          </p>
          <p>
            <strong>확인 전화</strong>
            를 드릴 예정입니다.
          </p>
        </div>
      </div>
      <div class="reser_check_notice">
        <p>
          신청 내역은
          <strong>홈페이지 오른쪽 상단 메뉴</strong>
          <i class="fa-solid fa-chevron-right"></i>
        </p>
        <p>
          <strong>예약 내역 조회</strong>
          에서 확인 가능합니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import Side_menu from "@/components/Side_menu.vue";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
//카카오 주소 검색기능
const address = ref("");
const detailAddress = ref("");
const handleAddressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      let addr = "";
      let extraAddr = "";

      // 도로명 주소와 지번 주소 구분
      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      // 도로명 주소인 경우 추가 정보 처리
      if (data.userSelectedType === "R") {
        // 동/로 정보가 있는 경우 추가
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있는 경우 추가
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr += extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 추가 정보가 있는 경우 괄호로 묶기
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
        addr += extraAddr;
      }

      // ✅ 선택한 주소를 입력창에 넣기
      address.value = addr;
    },
  }).open();
};

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const selectedDate = ref(null);
const selectedPeriod = ref(null);

// 날짜를 선택하면 오전오후 활성화

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

// 이번 달 날짜
const daysInMonth = computed(() => {
  return Array.from(
    { length: new Date(currentYear.value, currentMonth.value + 1, 0).getDate() },
    (_, i) => i + 1
  );
});

// 1일 시작 공백
const blanks = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
  return Array.from({ length: firstDay });
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDate.value = null;
  selectedPeriod.value = null;
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDate.value = null;
  selectedPeriod.value = null;
};

// 오늘 기준으로 과거인지 체크
const isPastDate = (date) => {
  const thisDate = new Date(currentYear.value, currentMonth.value, date);
  // 오늘보다 이전 날짜면 true
  return thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
};

// 날짜 선택
const selectDate = (date) => {
  if (isPastDate(date)) return; // 마감된 날짜 클릭 방지
  selectedDate.value = date;
  selectedPeriod.value = null;
};

// 오전/오후 선택
const selectPeriod = (period) => {
  selectedPeriod.value = period;
  selectDay.value = true;
};

// 요일 계산
const isSunday = (date) => new Date(currentYear.value, currentMonth.value, date).getDay() === 0;
const isSaturday = (date) => new Date(currentYear.value, currentMonth.value, date).getDay() === 6;

// 요일 계산용
const selectedDayName = computed(() => {
  if (!selectedDate.value) return "";
  const d = new Date(currentYear.value, currentMonth.value, selectedDate.value);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  return days[d.getDay()];
});

// 오늘 강조
const isToday = (date) => {
  return (
    date === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

// ✅ 완성된 문장 계산 (년월일 + 요일 + 오전/오후)
const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return "";
  const d = new Date(currentYear.value, currentMonth.value, selectedDate.value);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const weekday = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  const period = selectedPeriod.value ? ` ${selectedPeriod.value}` : "";
  return `${year}년 ${month}월 ${day}일 (${weekday}요일)${period}`;
});

// 다음버튼 나오기
const selectDay = ref(false);

// 예약정보 확인 모달
const showCheckModal = ref(false);
const showLoadingModal = ref(false);
const showCheckAnimation = ref(false);
const openCheckModal = () => {
  showCheckModal.value = true;
};
const reserCompleteModal = async () => {
  // 1단계: 확인 모달 숨기고 로딩 모달 표시
  showCheckModal.value = false;
  showLoadingModal.value = true;

  // 2단계: 2초 로딩 (API 호출 시간 시뮬레이션)
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // 3단계: 로딩 모달 숨기고 체크 애니메이션 표시
  showLoadingModal.value = false;
  showCheckAnimation.value = true;

  // 4단계: 1.5초 후 완료 모달 표시
  await new Promise((resolve) => setTimeout(resolve, 1500));
  showCheckAnimation.value = false;
  showComplete.value = true;
};

// 이전 페이지 정보 가져오기
const name = route.query.name;
const phone = route.query.phone;

// 예약 완료 모달
const showComplete = ref(false);
const reserComplete = ref("예약 신청이 완료되었습니다.");

const updateComplete = () => {
  reserComplete.value = window.innerWidth <= 390 ? "예약 신청 완료!" : reserComplete.value;
};

onMounted(() => {
  updateComplete();
  window.addEventListener("resize", updateComplete);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateComplete);
});

// 완료 창 닫기 누르면 홈으로 이동
const goToHome = () => {
  router.push("/");
};
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.esti_inner {
  max-width: 1000px;
  margin: auto;
  margin-bottom: 50px;
}
// 견적 확인
// 영역 이름
.esti_title {
  display: flex;
  height: 60px;
  // background-color: aliceblue;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid $grey-color;
  margin-bottom: 15px;
  p,
  i {
    font-size: $esti-large-txt;
    font-weight: bold;
    color: $font-color;
  }
}
// 게이지
.esti_gauge {
  position: relative;
  margin-bottom: 30px;
  width: 100%;
  height: 15px;
  border-radius: 10px;
  background-color: $point-color;
  overflow: hidden;
}
.addr,
.service_date {
  p {
    font-size: $esti-medium-txt;
    span {
      font-size: 16px;
      color: $point-color;
    }
  }
  input {
    border: 1px solid $border-color;
    border-radius: 8px;
    padding: 10px 8px;
    margin-top: 10px;
    width: 100%;
  }
}
.service_date {
  margin-top: 60px;
}

// 달력
.calendar-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  gap: 20px;
  font-size: $small-txt;
  i {
    color: $point-color;
  }
}

.calendar {
  width: 100%;
  border: 1px solid $border-color;
  padding: 25px 0;
  border-radius: 8px;

  .calendar-weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    font-weight: 500;
    margin-bottom: 30px;
    font-size: $small-txt;
  }

  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    justify-items: center;
    min-height: 240px;
    .calendar-day {
      padding: 10px 15px 30px;
      border-radius: 8px;
      cursor: pointer;
      transition: 0.2s;
      p {
        font-size: $small-txt;
      }
      &:hover {
        background-color: $grey-color;
      }
      &.today {
        border: 1px solid $point-color;
        background-color: $main-color;
      }
      &.selected {
        background-color: $point-color;
        color: white;
      }
      &.closed {
        color: $border-color;
        cursor: not-allowed;
        span {
          color: tomato;
        }
      }
      .date {
        font-weight: 500;
      }

      .status {
        font-size: 12px;
      }
      .day-status {
        min-height: 20px;
      }
    }
  }
  .sun {
    color: tomato;
  }
  .sat {
    color: $point-color;
  }
}
.calendar-period {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
  gap: 20px;

  button {
    flex: 1;
    padding: 10px 24px;
    font-size: $small-txt;
    border: transparent;
    border-radius: 10px;
    background-color: $grey-color;
    cursor: pointer;

    &.active {
      background: $point-color;
      color: white;
      font-weight: 600;
    }
  }
}
.infoCheck {
  margin-top: 60px;
  .btn {
    width: 100%;
    font-weight: 600;
  }
}
.modal_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
}
.check_modal,
.loading_modal,
.check_animation_modal {
  background-color: #fff;
  width: 560px;
  // height: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  border-radius: 30px;
  padding: 40px 50px 50px;
  .x-mark {
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: $medium-txt-2;
    cursor: pointer;
  }
  .modal_title {
    font-size: $esti-large-txt;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .modal_w {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 10px;
    img {
      width: 60%;
    }
    .reser_process {
      margin-top: 5px;
      display: flex;
      gap: 72px;
      p {
        font-size: 16px;
        font-weight: 600;
        color: $point-color;
        &:last-child {
          font-weight: 400;
          color: #c2c2c2;
        }
      }
    }
    hr {
      width: 100%;
      border: 1px solid #c2c2c2;
      margin: 30px 0;
    }
    .reser_notice {
      text-align: center;
      margin-bottom: 55px;
      p {
        font-size: $small-txt;
        strong {
          color: $point-color;
        }
      }
    }
  }
  .reser_check_notice {
    position: relative;
    padding-left: 25px;
    &::before {
      content: "";
      display: block;
      width: 5px;
      height: 40px;
      border-radius: 3px;
      background-color: $border-color;
      position: absolute;
      top: 5px;
      left: 0;
    }
    p {
      color: $border-color;
      font-size: 16px;
    }
  }
  .info_w {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: $small-txt;
    margin-bottom: 40px;
    div {
      display: flex;
      justify-content: space-between;
    }
  }
  .reserbtns {
    display: flex;
    gap: 20px;
    .btn {
      font-size: $esti-medium-txt;
      width: 70%;
      font-weight: 600;
      padding: 10px;
      &.btn_danger {
        width: 30%;
        text-align: center;
        background-color: tomato;
      }
    }
  }
}
/* 로딩 애니메이션 스타일 */
.loading_modal {
  text-align: center;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid $point-color;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading_text {
  font-size: 16px;
  color: $sub-font-color;
  margin: 0;
}

/* 체크 완료 애니메이션 스타일 */
.check_animation_modal {
  text-align: center;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.check_icon_container {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #d5ebff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  animation: scaleUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.check_icon {
  font-size: 40px;
  color: $point-color;
  animation: checkmark 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes scaleUp {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes checkmark {
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  100% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}

.check_text {
  font-size: 18px;
  font-weight: 600;
  color: $point-color;
  margin: 0;
}

// 반응형
@media screen and (max-width: 768px) {
  .esti_inner {
    max-width: 600px;
  }
  .service_date {
    margin-top: 30px;
  }
  .calendar .calendar-days .calendar-day {
    padding: 10px 15px 15px;
  }
  .infoCheck {
    margin-top: 50px;
  }
}
@media screen and (max-width: 390px) {
  .esti_inner {
    max-width: 280px;
  }
  // 영역 이름
  .esti_title {
    height: 50px;
    margin-bottom: 10px;
    p,
    i {
      font-size: $esti-medium-txt;
    }
  }
  .esti_gauge {
    height: 7px;
  }
  .addr,
  .service_date {
    p {
      font-size: 16px;
      span {
        font-size: 12px;
      }
    }
    input {
      font-size: 12px;
    }
  }
  // 달력
  .calendar-header {
    font-size: 16px;
  }
  .calendar {
    padding: 10px 0;
  }
  .calendar-weekdays {
    margin-bottom: 15px !important;
    span {
      font-size: 16px;
    }
  }
  .calendar-days {
    .calendar-day {
      padding: 0 5px !important;
      p {
        font-size: 16px !important;
      }
    }
  }
  .calendar-period {
    gap: 10px;
    button {
      font-size: 16px;
      padding: 5px 0;
    }
  }
  .infoCheck {
    margin-top: 30px;
    .btn {
      font-size: $small-txt;
    }
  }
  .check_modal,
  .loading_modal,
  .check_animation_modal {
    width: 280px;
    padding: 30px 20px;
    border-radius: 20px;
    .modal_title {
      font-size: $esti-medium-txt;
      margin-bottom: 15px;
    }
    .info_w {
      gap: 10px;
      font-size: 14px;
      margin-bottom: 15px;
      div {
        p:nth-child(2) {
          width: 70%;
          text-align: right;
        }
      }
    }
    .x-mark {
      top: 25px;
      right: 25px;
      font-size: 18px;
    }
    .modal_w {
      img {
        width: 80%;
      }
      .reser_process {
        gap: 32px;
      }
      hr {
        margin: 20px 0;
      }
      .reser_notice {
        margin-bottom: 20px;
        p {
          font-size: 15px;
        }
      }
    }
    .reser_check_notice {
      padding-left: 10px;
      &::before {
        width: 2px;
        height: 28px;
        top: 3px;
      }
      p {
        font-size: 12px;
      }
    }
    .reserbtns {
      gap: 10px;
      .btn {
        font-size: 16px;
        width: 60%;
        &.btn_danger {
          width: 40%;
        }
      }
    }
    .loading_text {
      font-size: 14px;
    }
  }
}
</style>
