<template>
  <div class="service-wrap">
    <div class="inner">
      <h2 class="title">고객 경험이 달라지는 순간</h2>
      <ul class="card-list">
        <li class="card">
          <div class="txt">
            <h2>간단한 절차</h2>
            <p>
              <strong>원하는 시간, 일정</strong>만 입력하면<br />Purus가 알아서
              청소해 드립니다.
            </p>
          </div>
          <div class="contents">
            <ul class="box">
              <li>청소주기 : <strong>매달</strong></li>
              <li>서비스 시간 : <strong>2시간</strong></li>
              <li>청소 날짜 : <strong>8월 7일</strong></li>
            </ul>
          </div>
        </li>
        <li class="card">
          <div class="txt">
            <h2>확실한 보고</h2>
            <p>
              작업 후 <strong>청소 전·후 사진</strong>을<br />고객님께 전송해
              드립니다.
            </p>
          </div>
          <div class="contents">
            <ul class="before-after">
              <li>
                <img src="/images/before.png" alt="before" />
                <p>Before</p>
              </li>
              <li><i class="fa-solid fa-caret-right"></i></li>
              <li>
                <img src="/images/after.png" alt="after" />
                <p>After</p>
              </li>
            </ul>
          </div>
        </li>
        <li class="card">
          <div class="txt">
            <h2>1:1 맞춤 서비스</h2>
            <p>
              <strong>1:1담당자 맞춤 서비스</strong>로<br />
              끝까지 확실하게 책임집니다.
            </p>
          </div>
          <div class="contents">
            <ul class="box box2">
              <li><i class="fa-solid fa-user"></i></li>
              <li>
                <p>OOO기사</p>
                <p class="star"><i class="fa-solid fa-star"></i> 5.0</p>
              </li>
            </ul>
          </div>
        </li>
        <li class="card">
          <div class="txt">
            <h2>365일 고객센터 운영</h2>
            <p>
              <strong>오전 8시 ~ 오후 10시까지,</strong><br />휴일에도 신속하게
              해결해드립니다.
            </p>
          </div>
          <div class="contents">
            <img src="/images/center.png" alt="center" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;
.service-wrap {
  padding: 120px 0;
  .title {
    text-align: center;
    font-size: $main-title;
  }
  .card-list {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    gap: 16px;
    .card {
      background-color: $main-color;
      flex: 1;
      width: 310px;
      height: 350px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &:first-child,
      &:nth-child(3) {
        padding-bottom: 0;
      }
      .txt {
        width: 100%;
        h2 {
          font-size: $medium-txt-2;
        }
        p {
          font-size: $small-txt;
          padding-top: 20px;
        }
      }
      .contents {
        width: 100%;
        .before-after {
          display: flex;
          align-items: center;
          gap: 16px;
          li {
            position: relative;
            i {
              font-size: 24px;
              color: $point-color;
              text-align: center;
            }
            img {
              width: 100%;
              display: block;
              border-radius: 12px;
              filter: brightness(70%);
            }
            p {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              font-weight: bold;
              color: #fff;
            }
          }
        }
        .box {
          width: 70%;
          padding: 20px 20px 40px 20px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 1) 80%,
            rgba(255, 255, 255, 0) 100%
          );
          margin-left: auto;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          li {
            font-size: 15px;
            strong {
              color: $point-color;
            }
          }
        }
        .box2 {
          flex-direction: row;
          align-items: center;
          padding: 20px 20px 75px 20px;
          li {
            .fa-user {
              font-size: $main-title;
              color: $point-color;
            }
            p{
              font-size: 15px;
            }
            .star {
              color: $point-color;
              font-weight: bold;
            }
            &:nth-child(2){
              display: flex;
              flex-direction: column;
              gap: 5px;
            }
          }
        }
        &:last-child{
          height: 50%;
          img{
            height: 100%;
            display: block;
            margin-left: auto;
          }
        }
      }
    }
  }
}
</style>
