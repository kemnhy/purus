<template>
  <section class="qr-banner">
    <div class="qr-banner__inner">
      <!-- 왼쪽 이미지 -->
      <div class="qr-banner__image">
        <img src="/images/QR.png" alt="앱 미리보기" />
      </div>

      <!-- 오른쪽 텍스트 + QR -->
      <div class="qr-banner__content">
        <div class="taxt-wrap">
          <p class="sub-title">제빙기 케어 앱</p>
          <div class="main-title"><img src="/images/footer_logo.png" alt="logo" /></div>
          <p class="desc">
            <strong>앱에서</strong> 쉽고 편리하게!<br />
            더 많은 기능을 이용해보세요.
          </p>
        </div>

        <div class="qr-section">
          <div class="qr-1">
            <img class="qr" src="/images/square1.png" alt="QR 코드 1" />
            <img class="button" src="/images/google.png" alt="Google play" />
          </div>
          <div class="qr-1">
            <img class="qr" src="/images/square1.png" alt="QR 코드 2" />
            <img class="button" src="/images/app.png" alt="App store" />
          </div>
        </div>
      </div>
    </div>
    <p class="notice">▲ QR코드 스캔하고 퓨러스 앱 다운로드 받으세요! ▲</p>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.qr-banner {
  width: 100%;
  background: linear-gradient(to top, #f0faff 0%, #ffffff 100%);
  padding: $web-spacing 0;

  &__inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
  }

  &__image {
    flex: 1;
    display: flex;
    justify-content: center;

    img {
      width: 90%;
      max-width: 600px;
    }
  }

  &__content {
    flex: 1;

    .sub-title {
      font-size: $medium-txt-2;
      color: $point-color;
      margin-bottom: 5px;
    }

    .main-title {
      font-size: $main-title;
      font-weight: bold;
      color: $font-color;
      margin-bottom: 15px;
      img {
        width: 35%;
      }
    }

    .desc {
      font-size: $medium-txt-2;
      // color: $sub-font-color;
      line-height: 1.5;
      margin-bottom: 30px;
    }

    .qr-section {
      display: flex;

      gap: 70px;

      .qr-1 {
        display: flex;
        flex-direction: column;
        gap: 20px;

        .qr {
          display: block;
          width: 120px;
          border-radius: 8px;
          border: 1px solid $point-color;
          padding: 12px;
        }
        .button {
          display: block;
          width: 120px;
          border-radius: 8px;

        }
      }
    }
  }
  .notice {
    margin-top: 40px;
    font-size: $small-txt;
    color: $font-color;
    text-align: center;
    font-weight: bold;
  }
}
</style>
