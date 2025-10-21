<template>
  <section class="qr-banner">
    <div class="inner">
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
            <strong>앱에서</strong>
            쉽고 편리하게!
            <br />
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

  .inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
  }

  &__image {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    img {
      width: 80%;
      max-width: 480px;
    }
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;

    .sub-title {
      font-size: $medium-txt-2;
      color: $point-color;
      margin-bottom: 8px;
    }

    .main-title {
      margin-bottom: 15px;
      img {
        width: 198px;
      }
    }

    .desc {
      font-size: $medium-txt-2;
      line-height: 1.5;
      margin-bottom: 30px;
    }

    .qr-section {
      display: flex;
      gap: 40px;

      .qr-1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;

        .qr {
          width: 120px;
          border-radius: 8px;
          border: 1px solid $point-color;
          padding: 10px;
        }

        .button {
          width: 120px;
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
// 768px 반응형
@media screen and (max-width: 768px) {
  .qr-banner {
    padding: 50px 0;
    .qr-banner__content {
      .sub-title {
        font-size: 20px;
      }
      .main-title {
        img {
          width: 150px;
        }
      }
      .desc {
        font-size: 20px;
      }
      .qr-section {
        .qr-1 {
          .qr {
            width: 80px;
          }
          .button {
            width: 80px;
          }
        }
      }
    }
  }
}
// 390px 반응형
@media screen and (max-width: 390px) {
  .qr-banner {
    padding: 30px 0;
    .inner {
      flex-direction: column;
      gap: 30px;
    }
    .qr-banner__image {
      justify-content: center;
    }
    .qr-banner__content {
      .sub-title {
        font-size: 14px;
        text-align: center;
      }
      .main-title {
        text-align: center;
        padding-left: 10px;
        img {
          width: 120px;
        }
      }
      .desc {
        font-size: 16px;
        text-align: center;
      }
      .qr-section {
        gap: 10px;
        .qr-1 {
          .qr {
            display: none;
          }
          .button {
            width: 100%;
            border-radius: 6px;
          }
        }
      }
    }
    .notice {
      font-size: 12px;
      margin-top: 20px;
    }
  }
}
</style>
