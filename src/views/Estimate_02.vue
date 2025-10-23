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
            <input type="text" v-model="userPhone" placeholder="전화번호를 입력해주세요. (예: 01012345678)" />
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
              <p>• 접수 내용과 현장 상황이 다를 경우 추가 비용이 발생하거나, 서비스가 제한될 수 있습니다.</p>
              <p>• 고객 사정으로 청소 시작 지연 시 서비스가 불가할 수 있습니다.</p>
            </li>
            <li>
              4. 결제 안내
              <p>• 서비스 당일 대표번호(1234-5678)로 결제 링크가 발송되며, 청소 전 결제 부탁드립니다.</p>
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
            <li>3. 개인정보의 보유기간 및 이용기간 : 1년간 서비스 이용이 없으면 개인정보 파기</li>
          </ul>
          <div class="agree">
            <label>
              <input type="checkbox" v-model="selectAgree2" />
              위 내용을 모두 확인하였으며, 안내에 동의합니다.
            </label>
          </div>
        </div>
        <p class="small_txt">
          * 귀하는 위와 같은 일반 개인정보의 수집 및 이용을 거부할 수 있습니다. 다만, 일반 개인정보의 필수적 수집 및 이용에
          동의하지 않을 경우 서비스 이용이 불가능합니다.
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
import { ref } from "vue";
const SHEETDB_API = "https://sheetdb.io/api/v1/63h80yl17hy1y";

import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// 이전 페이지 정보 가져오기
const mdNm = route.query.MdNm;
const mdPrice = route.query.mdPrice;
const size = route.query.size;
const sizePrice = route.query.sizePrice;
const totalPrice = route.query.totalPrice;
console.log("name/price" + mdNm + mdPrice + totalPrice);
console.log("name/price" + size + sizePrice);

// 다음버튼 나오기
const selectAgree1 = ref(false);
const selectAgree2 = ref(false);

// 견적만 받기
const pushMessage = () => {
  savetest();

  alert("입력하신 연락처로 견적서를 보내드립니다.");
  router.push("/"); // 홈('/')으로 이동
};

const savetest = async () => {
  try {
    const getResponse = await fetch(SHEETDB_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!getResponse.ok) {
      throw new Error(`GET 실패! status: ${getResponse.status}`);
    }

    const existingData = await getResponse.json();
    // console.log("기존 데이터:", existingData);

    let newId = 1; // 기본값
    if (existingData && existingData.length > 0) {
      const maxId = Math.max(...existingData.map((item) => Number(item.ID) || 0));
      newId = maxId + 1;
    }
    // console.log(String(userName.value));
    // console.log(Number(userPhone.value));

    const newEstim = {
      ID: Number(newId),
      USER_ID: String(userName.value),
      SEL_NUMBER: Number(userPhone.value),
      // CREATE_DT: TIMESTAMP,
    };
    // console.log("test" + newEstim.value);

    const response = await fetch(SHEETDB_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ data: [newEstim] }),
    });
    console.log(" 응답 상태:", response.status, response.statusText);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("추가 성공:", result);
  } catch (error) {
    console.log("error :" + error);
    return;
  }
};
// 입력한 정보 받기
const userName = ref("");
const userPhone = ref("");

// const saveEstimInfo = async () => {
//   try {
//     const newEstim = {
//       ID: Date.now().toString(),
//       USER_ID: userName.value,
//       SEL_NUMBER: userPhone.value,
//       SERVICE: selBrand.name + selSize.size + modelName.value,
//       // SIZE: ,
//       TOTAL_PRICE: totalPrice.value,
//       // MODEL_NO: ,
//       CRT_DT: new Date().toISOString().split("T")[0], // YYYY-MM-DD,
//     };
//     console.log(newEstim);

//     const response = await fetch(SHEETDB_API, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Accept: "application/json" },
//       body: JSON.stringify({ data: [newReview] }),
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log("✅ 추가 성공:", result);
//     alert("리뷰가 등록되었습니다!");
//   } catch (error) {
//     console.error("❌ 추가 실패:", error);
//     alert(`등록 실패: ${error.message}`);
//   }
// };

// const revInfo = ref([]);

// const putUserInfo = async (userName, userPhone) => {
//   try {
//     const response = await fetch(SHEETDB_API, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ data: [userName, userPhone] }),
//     });

//     if (response.ok) {
//       alert("저장 완료!");
//       // fetchReviews();
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

// 다음 페이지로 넘어가면서 정보 보내기
const goNextPage = () => {
  if (userName.value === "" || userPhone.value === "") {
    return alert("이름과 전화번호를 모두 입력해주세요.");
  } else if (!isNaN(userName.value) || userPhone.value.length <= 8) {
    return alert("이름과 전화번호를 올바르게 입력해주세요.");
  } else {
    // console.log(putUserInfo);
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
}
// 유의사항 안내
.notice_wrap,
.agree_wrap {
  margin-top: 60px;
  .notice,
  .agree_title {
    margin-bottom: 15px;
    font-size: $esti-medium-txt;
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

// 반응형
@media screen and (max-width: 768px) {
  .esti_inner {
    max-width: 600px;
  }
  .personal_data {
    flex-direction: column;
    gap: 30px;
  }
  .notice_wrap,
  .agree_wrap {
    margin-top: 30px;
  }
  .buttons {
    margin-top: 50px;
    flex-direction: column;
    gap: 15px;
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
  // 개인정보 입력
  .personal_data {
    gap: 25px;
    .user_name,
    .user_number {
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
  }
  // 유의사항 안내
  .notice_wrap,
  .agree_wrap {
    margin-top: 25px;
    .notice,
    .agree_title {
      margin-bottom: 10px;
      font-size: 16px;
      span {
        font-size: 12px;
      }
    }
    ul {
      gap: 10px;
      margin-bottom: 20px;

      li {
        font-size: 13px;
        p {
          font-size: 12px;
          &:first-child {
            margin-top: 3px;
          }
        }
      }
    }
    .agree_list {
      gap: 5px;
      margin-bottom: 10px;
    }
  }
  .agree {
    font-size: 14px;
    letter-spacing: -1px;
    input {
      margin-right: 5px;
    }
  }
  .small_txt {
    font-size: 12px;
    margin-top: 25px;
  }
  .buttons {
    margin-top: 20px;
    gap: 10px;
    .btn {
      font-size: $small-txt;
    }
  }
}
</style>
