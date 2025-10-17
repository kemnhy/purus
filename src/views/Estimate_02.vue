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
        <!-- 개인정보 입력 -->
        <div class="personal_data">
          <div class="user_name">
            <p>
              고객님의 성함을 입력해주세요.
              <span>(필수)</span>
            </p>
            <input type="text" v-model="userName" placeholder="이름을 입력해주세요." />
          </div>
          <div class="user_number">
            <p>
              고객님의 연락처를 입력해주세요.
              <span>(필수)</span>
            </p>
            <input
              type="text"
              v-model="userPhone"
              placeholder="전화번호를 입력해주세요. (예: 01012345678)" />
          </div>
        </div>
        <!-- 유의사항 안내 -->
        <div class="notice_wrap">
          <p class="notice">
            유의사항 안내
            <span>(필수)</span>
          </p>
          <ul>
            <li>
              1. 서비스 범위 안내
              <p>• 제빙기 완전 분해 후 청소, 재조립하여 정상 작동을 확인 후 완료됩니다.</p>
              <p>• 제빙기 외 다른 제품들은 제외됩니다.</p>
            </li>
            <li>
              2. 예약 변경 및 취소 규정
              <p>• 서비스 전날 취소 및 일정변경: 총 요금의 30% 위약금 발생됩니다.</p>
              <p>• 서비스 당일 취소 및 일정변경: 총 요금의 50% 위약금 발생됩니다.</p>
            </li>
            <li>
              3. 현장 안내 및 추가 비용
              <p>• 서비스 1~2일 전 담당자가 연락드리며, 출입 방법을 알려주세요.</p>
              <p>
                • 접수 내용과 현장 상황이 다를 경우 추가 비용이 발생하거나, 서비스가 제한될 수
                있습니다.
              </p>
              <p>• 고객 사정으로 청소 시작 지연 시 서비스가 불가할 수 있습니다.</p>
            </li>
            <li>
              4. 결제 안내
              <p>
                • 서비스 당일 대표번호(1234-5678)로 결제 링크가 발송되며, 청소 전 결제 부탁드립니다.
              </p>
            </li>
            <li>
              5. 현장 검수 및 AS 안내
              <p>• 결제 링크와 함께 검수 체크리스트가 발송되며, 담당자와 함께 현장 검수해주세요.</p>
              <p>• 현장 검수 완료 이후에는 추가 AS 불가합니다.</p>
            </li>
          </ul>
          <div class="agree">
            <label>
              <input type="checkbox" v-model="selectAgree1" />
              위 내용을 모두 확인하였으며, 안내에 동의합니다.
            </label>
          </div>
        </div>
        <!-- 개인정보 수집 동의 -->
        <div class="agree_wrap">
          <p class="agree_title">
            개인정보 수집·이용 동의
            <span>(필수)</span>
          </p>
          <ul class="agree_list">
            <li>1. 개인정보 수집목적 및 이용목적 : 전문청소 견적 및 서비스 제공</li>
            <li>2. 수집하는 개인정보 항목 : 성명, 전화번호, 주소</li>
            <li>3. 개인정보의 보유기간 및 이용기간 : 회원탈퇴 시</li>
          </ul>
          <div class="agree">
            <label>
              <input type="checkbox" v-model="selectAgree2" />
              위 내용을 모두 확인하였으며, 안내에 동의합니다.
            </label>
          </div>
        </div>
        <p class="small_txt">
          * 귀하는 위와 같은 일반 개인정보의 수집 및 이용을 거부할 수 있습니다. 다만, 일반
          개인정보의 필수적 수집 및 이용에 동의하지 않을 경우 서비스 이용이 불가능합니다.
        </p>
      </div>
      <!-- 다음 버튼 -->
      <div v-if="selectAgree1 !== false && selectAgree2 !== false" class="buttons">
        <button class="btn" @click="pushMessage">견적만 받기</button>
        <button @click="goNextPage" class="btn">동의하고 가능한 일정 선택하기</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header_w from "@/components/Header_w.vue";
import Side_menu from "@/components/Side_menu.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

// 다음버튼 나오기
const selectAgree1 = ref(false);
const selectAgree2 = ref(false);
// 견적만 받기
const pushMessage = () => {
  alert("입력하신 연락처로 견적서를 보내드립니다.");
  router.push("/"); // 홈('/')으로 이동
};

// 입력한 정보 받기
const userName = ref("");
const userPhone = ref("");
// 다음 페이지로 넘어가면서 정보 보내기
const goNextPage = () => {
  if (userName.value === "" || userPhone.value === "") {
    return alert("이름과 전화번호를 모두 입력해주세요.");
  } else if (!isNaN(userName.value) || userPhone.value.length <= 8) {
    return alert("이름과 전화번호를 올바르게 입력해주세요.");
  } else {
    router.push({
      path: "/estimate03",
      query: {
        name: userName.value,
        phone: userPhone.value,
      },
    });
  }
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
.personal_data {
  display: flex;
  gap: $web-spacing;
  justify-content: space-between;
  .user_name,
  .user_number {
    flex: 1;
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
      input {
        width: 100px;
      }
    }
    input {
      border: 1px solid $border-color;
      border-radius: 8px;
      padding: 10px 8px;
      margin-top: 10px;
      width: 100%;
    }
    .bar {
      width: 10px;
      height: 2px;
      background-color: $border-color;
      margin-top: 10px;
    }
  }
  // 연락처 선택
  .custom-select {
    position: relative;
    font-family: sans-serif;
    user-select: none;
    width: 80px;
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
        color: $border-color;
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

// 유의사항 안내
.notice_wrap,
.agree_wrap {
  margin-top: 60px;
  .notice,
  .agree_title {
    margin-bottom: 15px;
    font-size: $medium-txt-2;
    span {
      font-size: 16px;
      color: $point-color;
    }
  }
  ul {
    padding: 20px;
    background-color: #ebebeb;
    border-radius: 10px;
    color: #333;
    display: flex;
    gap: 15px;
    flex-direction: column;
    margin-bottom: 20px;

    li {
      font-size: 16px;
      p {
        font-size: 14px;
        margin-left: 10px;
        &:first-child {
          margin-top: 8px;
        }
      }
    }
  }
  .agree_list {
    background-color: #fff;
    padding: 0;
    gap: 5px;
    margin-bottom: 20px;
  }
}
.agree {
  font-size: $small-txt;
  input {
    margin-right: 10px;
  }
}
.small_txt {
  font-size: 14px;
  margin-top: 40px;
}

// 다음 버튼
.buttons {
  display: flex;
  gap: 20px;
  margin-top: 60px;
  .btn {
    flex: 1;
    font-weight: 600;
    text-align: center;
  }
}
</style>
