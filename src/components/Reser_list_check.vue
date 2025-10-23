<template>
  <div class="inner">
    <div class="reser_title">
      <h1>예약 내역 조회</h1>
      <p>예약 신청 시 입력하신 정보로 확인하실 수 있습니다.</p>
    </div>
    <div class="reser_check_w">
      <div class="reser_input">
        <div class="input_w">
          <label for="username">이름</label>
          <input v-model="username" type="text" placeholder="이름을 입력해주세요." id="username" />
        </div>
        <div class="input_w">
          <label for="userphone">전화번호</label>
          <input v-model="userphone" type="phone" id="userphone" placeholder="전화번호를 입력해주세요. (예: 01012345678)" />
        </div>
      </div>
      <button class="check_btn btn" @click="gotoList">예약 내역 조회하기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("");
const userphone = ref("");
const emit = defineEmits(["next"]);
// const emitList = ref([]);

// const existingData = await getResponse.json();
// // console.log("기존 데이터:", existingData);

// const getEmitData = async () => {
//   try {
//     const response = await fetch(SHEETDB_API);
//     const result = await response.json();

//     const
//     // emitList.value = result.map((item) => ({
//     //   id: item.ID,
//     //   name: username.value,
//     //   phoneNum: userphone.value,
//     // }));

// // const srcUserInfo = async
// const getEmitData = await fetch(SHEETDB_API, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     body: JSON.stringify({ data: [newEstim] }),
//   },
// });

// if (!getEmitData.ok) {
//   throw new Error(`GET 실패! status: ${getEmitData.status}`);
// }

//   } catch (error) {
//     //
//   }
// };

// 예약조회버튼 클릭시 목록으로
const gotoList = () => {
  if (username.value.trim() === "") {
    alert("이름을 입력하세요.");
    return;
  }
  if (!/^\d+$/.test(userphone.value.trim()) || userphone.value.trim().length < 9) {
    alert("전화번호를 올바르게 입력하세요");
    return;
  } else {
    emit("next");
  }
};
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
  }
}
.reser_check_w {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  min-width: 600px;
  margin: auto;
  height: calc(100vh - 502px);

  .reser_input {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    margin-bottom: 35px;

    .input_w {
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        font-size: $esti-medium-txt;
      }
      input {
        padding: 10px;
        width: 82%;
        border: 1px solid $border-color;
        border-radius: 8px;
      }
    }
  }
  .check_btn {
    width: 100%;
    font-weight: bold;
  }
}

@media screen and (max-width: 768px) {
  .reser_check_w {
    width: 100%;
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
  .reser_check_w {
    min-width: 280px;
    gap: 5px;
    height: auto;
    margin-bottom: 40px;
    .reser_input {
      margin-bottom: 25px;
      .input_w {
        label {
          font-size: 14px;
        }
        input {
          font-size: 12px;
          width: 76%;
          padding: 8px;
        }
      }
    }
    .check_btn {
      font-size: 16px;
    }
  }
}
</style>
