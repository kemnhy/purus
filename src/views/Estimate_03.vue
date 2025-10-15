<template>
  <div>
    <!-- 헤더영역 -->
    <Header_w lineColor="#092857" />
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
          <button @click="selectPeriod('AM')" :class="{ active: selectedPeriod === 'AM' }">
            오전
          </button>
          <button @click="selectPeriod('PM')" :class="{ active: selectedPeriod === 'PM' }">
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
      <p class="modal_title">예약 정보 확인</p>
      <div class="info_w">
        <p>
          성함
          <span>{{}}</span>
        </p>
        <p>
          전화번호
          <span>{{}}</span>
        </p>
        <p>
          주소
          <span>{{}}</span>
        </p>
        <p>
          서비스 날짜
          <span>{{}}</span>
        </p>
      </div>
      <div class="reserbtns">
        <button class="btn" @click="reserCompleteModal">
          예약 확정하고
          <br />
          서비스 이용하기
        </button>
        <router-link class="btn btn_danger" to="/estimate02">입력사항 수정</router-link>
      </div>
    </div>
  </div>
  <!-- 예약 완료 모달 -->
  <div class="modal"></div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
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

// 오늘 강조
const isToday = (date) => {
  return (
    date === today.getDate() &&
    currentMonth.value === today.getMonth() &&
    currentYear.value === today.getFullYear()
  );
};

// 다음버튼 나오기
const selectDay = ref(false);

// 예약정보 확인 모달
const showCheckModal = ref(false);
const openCheckModal = () => {
  showCheckModal.value = true;
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
    font-size: $medium-txt-2;
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
  margin: 20px 0;
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
.check_modal {
  background-color: #fff;
  width: 560px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  border-radius: 30px;
  padding: 40px 50px 50px;
  i {
    position: absolute;
    right: 30px;
    top: 30px;
    font-size: $medium-txt-2;
    cursor: pointer;
  }
  .modal_title {
    font-size: $medium-txt-1;
    font-weight: 600;
    text-align: center;
    margin-bottom: 30px;
  }
  .info_w {
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 20px;
    margin-bottom: 40px;
  }
  .reserbtns {
    display: flex;
    gap: 20px;
    .btn {
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
</style>
