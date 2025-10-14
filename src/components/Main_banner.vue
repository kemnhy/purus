<template>
  <div class="banner-wrap">
    <div class="inner">
      <div class="txt">
        <div class="banner-title">
          <p>Purus에 OO 기사님이 오셨어요!</p>
          <h2>
            이러한 불편사항 <br />
            Purus가 해결해드립니다!
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
    align-items: flex-end;
    .txt {
      width: 60%;
      .banner-title {
        margin-left: 120px;
        p {
          font-size: $medium-txt-1;
        }
        h2 {
          color: $point-color;
          font-size: 60px;
          padding: 35px 0 75px 0;
        }
      }
      .animation-txt {
        display: flex;
        flex-direction: column;
        gap: 28px;
        .box {
          width: 580px;
          height: 130px;
          background-color: $font-color;
          border-radius: 100px;
          &:first-child{
            margin-left: 120px;
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
        width: 95%;
        display: block;
      }
    }
  }
}
</style>
