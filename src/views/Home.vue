<template>
  <div>
    <div class="top_wrap">
      <Header_w />
      <Side_menu />
      <Visual />
    </div>
    <Care_reason />
    <Main_banner />
    <Service />
    <Process />
    <Self_care />
    <Point_banner />
    <Real_review />
    <Best_pro />
    <FAQ />
    <QR_banner />
    <Footer_w/>
    <Quick_btn />
    
  </div>
</template>
<script setup>
import Best_pro from "@/components/Best_pro.vue";
import Care_reason from "@/components/Care_reason.vue";
import FAQ from "@/components/FAQ.vue";
import Header_w from "@/components/Header_w.vue";
import Main_banner from "@/components/Main_banner.vue";
import Point_banner from "@/components/Point_banner.vue";
import Process from "@/components/Process.vue";
import QR_banner from "@/components/QR_banner.vue";
import Quick_btn from "@/components/Quick_btn.vue";
import Real_review from "@/components/Real_review.vue";
import Self_care from "@/components/Self_care.vue";
import Service from "@/components/Service.vue";
import Side_menu from "@/components/Side_menu.vue";
import Visual from "@/components/Visual.vue";
import Footer_w from "@/components/Footer_w.vue";
</script>
<style lang="scss" scoped>
.top_wrap {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  position: relative;
}
</style>
