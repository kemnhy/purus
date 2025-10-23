<template>
  <footer class="footer">
    <div class="inner">
      <div class="footer__logo">
        <img src="/images/logo.png" alt="Purus 로고" />
      </div>

      <div class="footer__info">
        <p>
          주식회사 퓨어리스 &nbsp; | &nbsp; 대표 : 김삼조 &nbsp; | &nbsp; 사업자등록번호 :
          123-45-67890
        </p>
        <p>
          Tel : 1234-5678 &nbsp; | &nbsp; E-mail :
          <a href="mailto:abc1234@gmail.com">abc1234@gmail.com</a>
          &nbsp; | &nbsp; 주소 : 대구 중구 중앙대로 394 제일빌딩 5F
        </p>
        <p class="footer__copy">copyright © 2025, Purus. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "../assets/styles/variables" as *;

.footer {
  width: 100%;
  // background-color: $grey-color;

  padding: 30px 0;

  .inner {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 40px; // 로고와 정보 사이 간격
  }

  &__logo {
    flex-shrink: 0;

    img {
      width: 120px;
      height: auto;
    }
  }

  &__info {
    flex: 1;
    font-size: $small-txt;

    line-height: 1.8;
    p {
      color: $border-color;
    }

    a {
      color: $border-color;
      text-decoration: none;
    }

    .footer__copy {
      margin-top: 15px;
      color: $border-color;
      font-size: $small-txt;
    }
  }
}

// 768px 반응형 테블릿
@media screen and (max-width: 768px) {
  .footer {
    .inner {
      gap: 30px;
      .footer__logo {
        img {
          width: 60px;
        }
      }
      .footer__info {
        font-size: 12px;
        .footer__copy {
          font-size: 12px;
          margin-top: 5px;
        }
      }
    }
  }
}

// 390px 반응형 모바일
@media screen and (max-width: 390px) {
  .footer {
    padding: 15px 0;
    .inner {
      flex-direction: column;
      gap: 15px;
      .footer__info {
        font-size: 10px;
        letter-spacing: -0.5px;
        .footer__copy {
          font-size: 10px;
        }
      }
    }
  }
}
</style>
