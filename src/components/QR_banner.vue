<template>
  <section class="qr-banner">
    <div class="qr-banner__inner">
      <!-- 왼쪽 이미지 -->
      <div class="qr-banner__image">
        <img src="/images/QR.png" alt="앱 미리보기" />
      </div>

      <!-- 오른쪽 텍스트 + QR -->
      <div class="qr-banner__content">
        <p class="sub-title">제빙기 케어 앱</p>
        <h2 class="main-title">Purus</h2>
        <p class="desc">
          앱에서 쉽고 편리하게!<br />
          더 많은 기능을 이용해보세요.
        </p>

        <div class="qr-section">
          <div class="qr-images">
            <img src="/images/square 1.png" alt="QR 코드 1" />
            <img src="/images/square 1.png" alt="QR 코드 2" />
          </div>
          <div class="download-btns">
            <img src="/images/app.png" alt="App store" />
            <img src="/images/google.png" alt="Google play" />
          </div>
        </div>

        <p class="notice">
          ▲ QR코드 스캔하고 퓨러스 앱 다운로드 받으세요! ▲
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.qr-banner {
  width: 100%;
  background: linear-gradient(90deg, #f0faff 0%, #ffffff 100%);
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
      max-width: 400px;
    }
  }

  &__content {
    flex: 1;
    text-align: center;

    .sub-title {
      font-size: $medium-txt-2;
      color: $font-color;
      margin-bottom: 5px;
    }

    .main-title {
      font-size: $main-title;
      font-weight: bold;
      color: $font-color;
      margin-bottom: 15px;
    }

    .desc {
      font-size: $medium-txt-2;
      color: $sub-font-color;
      line-height: 1.5;
      margin-bottom: 30px;
    }

    .qr-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .qr-images {
        display: flex;
        gap: 20px;

        img {
          width: 120px;
          height: 120px;
        }
      }

      .download-btns {
        display: flex;
        gap: 20px;

        img {
          width: 140px;
          height: auto;
        }
      }
    }

    .notice {
      margin-top: 40px;
      font-size: $small-txt;
      color: $grey-color;
    }
  }
}
</style>