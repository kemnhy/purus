<template>
  <div class="banner-wrap">
    <div class="inner">
      <div class="txt">
        <div class="banner-title">
          <p>Purus에  제빙기사님이 오셨어요!</p>
          <h2>
            불편사항은
            Purus에게 맡겨주세요!
          </h2>
        </div>
        <div class="animation-txt">
          <div class="box"><p>휴일에도 신속히 처리해드립니다.</p></div>
          <div class="box">
            <p>
              원하는 시간, 일정만 입력하면 <br />Purus가 알아서 청소해드립니다.
            </p>
          </div>
          <div class="box">
            <p>작업 후 청소 전 후 사진을 고객님께 <br />전송해 드립니다.</p>
          </div>
        </div>
      </div>
      <div class="img">
        <img src="/images/cleaner.png" alt="cleaner" />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.banner-wrap {
  width: 100%;
  padding: 100px 0;
  background-color: $sub-color;
  .inner {
    display: flex;
    align-items: center;
    .txt {
      width: 60%;
      .banner-title {
        margin-left: 120px;
        p {
          font-size: $medium-txt-2;
        }
        h2 {
          color: $point-color;
          font-size: 50px;
          padding: 35px 0 65px 0;
          max-width: 480px;
          line-height: 1.1;
        }
      }
      .animation-txt {
        display: flex;
        flex-direction: column;
        gap: 28px;
        .box {
          width: 550px;
          height: 110px;
          background-color: $font-color;
          border-radius: 100px;
          &:first-child{
            margin-left: 150px;
          }
          &:nth-child(2){
            background-color: $point-color;
          }
          &:nth-child(3){
            background-color: #80C5FF;
            margin-left: 80px;
          }
          p {
            height: 100%;
            font-size: 28px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 1.2;
          }
        }
      }
    }
    .img {

      width: 40%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      img {
        width: 90%;
        display: block;
      }
    }
  }
}
</style>
