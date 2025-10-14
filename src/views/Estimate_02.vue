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
        <!-- 개인정보 입력 -->
        <div class="personal_date">
          <div class="user_name">
            <p>
              고객님의 성함을 입력해주세요.
              <span>(필수)</span>
            </p>
            <input type="text" />
          </div>
          <div class="user_number">
            <p>
              고객님의 연락처를 입력해주세요.
              <span>(필수)</span>
            </p>
            <div class="number_input">
              <div class="custom-select" ref="selectRef">
                <!-- 선택된 값 -->
                <div class="selected" @click="toggleDropdown">
                  {{ selectedOption }}
                  <span class="arrow" :class="{ open: isOpen }">▼</span>
                </div>

                <!-- 옵션 목록 -->
                <ul v-show="isOpen" class="options">
                  <li
                    v-for="(option, i) in options"
                    :key="i"
                    @click="selectOption(option)"
                    :class="{ active: selectedOption === option }">
                    {{ option }}
                  </li>
                </ul>
              </div>
              <span class="bar"></span>
              <input type="number" />
              <span class="bar"></span>
              <input type="number" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, onBeforeUnmount } from "vue";

const router = useRouter();

// 연락처

const options = [
  "010",
  "02",
  "031",
  "032",
  "033",
  "041",
  "042",
  "043",
  "044",
  "051",
  "052",
  "053",
  "054",
  "055",
  "061",
  "062",
  "063",
  "064",
];

const selectedOption = ref("010");
const isOpen = ref(false);
const selectRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  isOpen.value = false;
};

// 바깥 클릭 시 닫기
const handleClickOutside = (e) => {
  if (selectRef.value && !selectRef.value.contains(e.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.esti_inner {
  max-width: 1000px;
  margin: auto;
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
  background-color: #ebebeb;
  overflow: hidden;

  span {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: $point-color;
    border-radius: 10px;
    transition: width 0.4s ease;
  }
}

// 개인정보 입력
.personal_date {
  display: flex;
  gap: $web-spacing;
  .user_name,
  .user_number {
    p {
      font-size: $medium-txt-2;
      span {
        font-size: 16px;
        color: $point-color;
      }
    }
    .number_input {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    input {
      border: 1px solid $border-color;
      border-radius: 8px;
      padding: 10px 8px;
      margin-top: 10px;
      width: 100%;
    }
    .bar {
      width: 20px;
      height: 2px;
      background-color: $border-color;
      margin-top: 10px;
    }
  }
  // 연락처 선택
  .custom-select {
    position: relative;
    width: 90px;
    font-family: sans-serif;
    user-select: none;

    .selected {
      margin-top: 10px;
      border: 1px solid $border-color;
      border-radius: 8px;
      padding: 6px 8px;
      background: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.2s ease;

      .arrow {
        font-size: 10px;
        margin-left: 6px;
        transition: transform 0.2s ease;
        &.open {
          transform: rotate(180deg);
        }
      }
    }

    .options {
      position: absolute;
      top: 105%;
      left: 0;
      width: 100%;
      max-height: 110px; // 👈 스크롤 높이
      overflow-y: auto;
      border: 1px solid #ccc;
      background: #fff;
      border-radius: 6px;
      z-index: 10;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

      li {
        padding: 6px 8px;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background-color: $grey-color;
        }

        &.active {
          background-color: $main-color;
          color: $point-color;
        }
      }

      /* 스크롤바 커스텀 */
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-thumb {
        background: #bbb;
        border-radius: 10px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #888;
      }
    }
  }
}
</style>
