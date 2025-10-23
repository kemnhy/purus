<template>
  <div v-if="eventModal" class="modal">
    <!-- 모달 오버레이 -->
    <div class="modal_bg"></div>
    <!-- 모달창 -->
    <div class="event_modal">
      <!-- 모달창 배경 -->
      <img src="/images/event_modal.png" alt="이벤트모달" />
      <!-- 이동버튼 -->
      <div @click="goReview" class="glass-btn">
        <p>리뷰 작성 하고 쿠폰 받기</p>
        <img src="/images/download.svg" alt="리뷰쓰고 쿠폰 다운" />
      </div>
      <!-- 창 버튼 -->
      <div class="buttons">
        <!-- 오늘 그만보기 버튼 -->
        <button @click="todayClose">오늘 그만보기</button>
        <!-- 닫기 버튼 -->
        <button @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const eventModal = ref(true);
// 오늘 날짜 문자열 생성 (예: "2025-10-22")
const todayStr = new Date().toISOString().split("T")[0];
const todayClose = () => {
  localStorage.setItem("hideEventModalDate", todayStr);
  eventModal.value = false;
};
// 닫기 버튼
const closeModal = () => {
  eventModal.value = false;
};
// 페이지 로드시 확인
onMounted(() => {
  const savedDate = localStorage.getItem("hideEventModalDate");
  if (savedDate === todayStr) {
    eventModal.value = false; // 오늘 이미 눌렀으면 안보이게
  }
});

// 버튼 누르면 리뷰페이지가기
const goReview = () => {
  router.push("/review");
};
</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
// 버튼 그라데이션용 ===================================================
$bd-alpha: rgba(97, 188, 225, 0.5); // #61BCE1 50%
$g1: #92d3cd;
$g2: #76c6d3;
$g3: #62bde1;
$g4: #4da5e4;
// 테두리 그라데이션
$border-grad: linear-gradient(135deg, $g1 0%, $g2 25%, $g3 60%, $g4 100%);

// 모달창 배경 오버레이
.modal_bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.5);
}

// 모달창
.event_modal {
  // background-color: #fff;
  width: 560px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999999;
  border-radius: 30px;
  overflow: hidden;
  img {
    width: 100%;
    display: block;
  }
  .glass-btn {
    margin: auto;
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 0;
    width: 50%;
    border-radius: 50px;
    border: 1px solid transparent;
    background: transparent;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 6px 24px rgba(97, 188, 225, 0.1);
    cursor: pointer;
    color: $grey-color;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    p {
      font-size: 18px;
    }

    img {
      width: 10%;
    }
    &::after {
      content: "";
      position: absolute;
      inset: 1px 1px auto 1px;
      height: 90%;
      border-radius: 50px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
      pointer-events: none;
    }

    &:hover {
      color: #061c34;
      background: linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) padding-box,
        $border-grad border-box;
      box-shadow: 0 0 0 0.5px $bd-alpha inset, 0 8px 28px rgba(33, 150, 243, 0.28),
        /* 블루 글로우 */ 0 6px 24px rgba(0, 0, 0, 0.25);
    }
  }
  .buttons {
    width: 100%;
    display: flex;
    button {
      background-color: $grey-color;
      cursor: pointer;
      flex: 1;
      border: transparent;
      padding: 20px;
      font-size: $small-txt;
      color: $border-color;
      border-left: 1px solid $border-color;
      &:first-child {
        border: transparent;
      }
      &:hover {
        background-color: darken($grey-color, 8%);
      }
    }
  }
}

// 반응형
@media screen and (max-width: 768px) {
  // 모달창
  .event_modal {
    width: 450px;
    .glass-btn {
      gap: 10px;

      p {
        font-size: 16px;
      }
      img {
        width: 8%;
      }
    }
    .buttons {
      button {
        padding: 15px;
        font-size: 16px;
      }
    }
  }
}
@media screen and (max-width: 390px) {
  .event_modal {
    position: fixed;
    width: 100%;
    top: 79%;
    border-radius: 0;
    .glass-btn {
      p {
        font-size: 14px;
      }
    }
  }
}
</style>
