<template>
  <div class="reser_check_w">
    <div class="reser_title">
      <h1>예약 내역 조회</h1>
      <p>예약 신청 시 입력하신 정보로 확인하실 수 있습니다.</p>
    </div>
    <div class="reser_input">
      <div class="input_w">
        <label for="username">이름</label>
        <input type="text" placeholder="이름을 입력해주세요." id="username" />
      </div>
      <div class="input_w">
        <label for="userphone">전화번호</label>
        <input
          type="text"
          id="userphone"
          placeholder="전화번호를 입력해주세요. (예: 01012345678)" />
      </div>
    </div>
    <button class="check_btn btn">예약 내역 조회하기</button>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
@use "../assets/styles/variables" as *;
.reser_check_w {
    padding-top: clamp(40px, 50vw, 100px);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 32%;
  margin: auto;
  height: calc(100vh - 230px);

  .reser_title {
    text-align: center;
    margin-bottom: clamp(10px, 50vw, 60px);
    h1 {
      font-size: $medium-txt-1;
      margin-bottom: 35px;
    }
    p {
      font-size: $esti-medium-txt;
    }
  }
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
  }
}
</style>
