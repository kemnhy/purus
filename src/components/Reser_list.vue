<template>
  <div class="inner">
    <div class="reser_title">
      <h1>예약 내역 조회</h1>
      <p class="desc">{{ descP }}</p>
    </div>
    <div class="reser_list_w">
      <div class="manager_w">
        <p>
          담당자
          <strong>홍길동</strong>
        </p>
        <p>010-1234-5678</p>
      </div>
      <table class="list_w">
        <thead>
          <tr>
            <th>서비스 날짜</th>
            <th>상태</th>
            <th>리뷰</th>
          </tr>
        </thead>
        <tbody>
          <template class="list" v-for="(reser, index) in reserList" :key="index">
            <tr>
              <td>{{ reser.date }}</td>
              <td :class="{ plan: reser.status === false }">
                {{ reser.status ? "완료" : "진행 예정" }}
              </td>
              <td>
                <button
                  @click="gotoReview(index)"
                  class="review_btn"
                  :class="{ active: reser.review === '리뷰쓰고 혜택받기' }">
                  {{ reser.review }}
                </button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const reserList = [
  { date: "2025.04.13", status: true, review: "작성 완료" },
  { date: "2025.07.18", status: true, review: "리뷰쓰고 혜택받기" },
  { date: "2025.10.20", status: false, review: "-" },
];
const gotoReview = (index) => {
  if (index) {
    router.push("/review");
  }
};
const descP = ref("");
const updateP = () => {
  descP.value =
    window.innerWidth <= 390
      ? `예약 정보에 변경 사항이 있으신 경우,\n담당자에게 문의 부탁드립니다.`
      : "예약 정보에 변경 사항이 있으신 경우, 담당자에게 문의 부탁드립니다.";
};
onMounted(() => {
  updateP();
  window.addEventListener("resize", updateP);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateP);
});
</script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;

.reser_title {
  text-align: center;
  margin-bottom: clamp(10px, 5vw, 60px);
  padding-top: clamp(20px, 5vw, 100px);
  h1 {
    font-size: $medium-txt-1;
    margin-bottom: 35px;
  }
  p {
    font-size: $esti-medium-txt;
    &.desc {
      white-space: pre-line; /* \n 줄바꿈 적용 */
    }
  }
}
.reser_list_w {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  margin: auto;
  height: calc(100vh - 502px);

  .manager_w {
    display: flex;
    padding: 20px 25px;
    background-color: $main-color;
    border-radius: 8px;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;
    font-size: 20px;
  }
  .list_w {
    width: 100%;
    background-color: $main-color;
    border-radius: 8px;
    font-size: 20px;
    padding: 20px 0px;
    table-layout: fixed; /* 열 고정 비율 */

    th,
    td {
      text-align: center;
      padding: 3px 0;
    }
    /* 열 비율 설정 */
    th:nth-child(1),
    td:nth-child(1) {
      width: 30%;
    }

    th:nth-child(2),
    td:nth-child(2) {
      width: 20%;
    }

    th:nth-child(3),
    td:nth-child(3) {
      width: 50%;
    }
    .review_btn {
      background: none;
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 20px;
      border: none;
      &.active {
        cursor: pointer;
        background-color: $point-color;
        color: #fff;
      }
    }
    td.plan {
      color: $point-color;
      font-weight: bold;
    }
  }
}

// 반응형
@media screen and (max-width: 768px) {
  .reser_title {
    p {
      letter-spacing: -1px;
    }
  }
  .reser_list_w {
    width: 100%;
    height: auto;
    margin-bottom: 40px;
  }
}
@media screen and (max-width: 390px) {
  .reser_title {
    h1 {
      font-size: $esti-medium-txt;
      margin-bottom: 15px;
    }
    p {
      font-size: 12px;
    }
  }
  .reser_list_w {
    .manager_w {
      font-size: 14px;
      padding: 10px 15px;
    }
    .list_w {
      font-size: 14px;
      padding: 10px 0;
      .review_btn {
        font-size: 14px;
      }
      th:nth-child(3),
      td:nth-child(3) {
        width: 30%;
        padding: 0 10px;
      }
      .review_btn {
        padding: 5px 8px;
      }
    }
  }
}
</style>
