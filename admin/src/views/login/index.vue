<template>
  <div>{{ $t('trans0001', { msg: 'hello' }) }}</div>
  <my-dropdown
    placement="bottom"
    :trigger="['click']"
    :dropMenuList="langList"
    :selectedKeys="selectedKeys"
    @menu-event="handleMenuEvent"
    overlayClassName="app-locale-picker-overlay"
  >
    <span class="cursor-pointer flex items-center">
      <span v-if="showText" class="ml-1">{{ getLangText }}</span>
    </span>
  </my-dropdown>
  <div class="my-swiper">
    <swiper
      :effect="'coverflow'"
      :loop="true"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="2"
      :coverflowEffect="{
        rotate: 0,
        stretch: 10,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }"
      :navigation="true"
      :pagination="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide>1</swiper-slide>
      <swiper-slide>2</swiper-slide>
      <swiper-slide>3</swiper-slide>
      <swiper-slide>4</swiper-slide>
      <swiper-slide>5</swiper-slide>
    </swiper>
  </div>
</template>

<script setup lang="ts">
import { LangType } from '@/constants/config';
import { type IDropMenu } from '@/components/dropdown';
import { useLocale } from '@/locale/useLocale';
import { computed, ref, unref, watchEffect } from 'vue';
import { langList } from '@/settings/locale';

import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
// import required modules
import { Navigation, EffectCoverflow, Pagination } from 'swiper/modules';

const modules = [ Navigation, EffectCoverflow, Pagination];

const { changeLang, getLang } = useLocale();
const selectedKeys = ref<string[]>([]);

const props = defineProps({
  showText: { type: Boolean, default: true },
  reload: { type: Boolean },
});
const getLangText = computed(() => {
  const key = selectedKeys.value[0];
  if (!key) {
    return '';
  }
  return langList.find((item) => item.key === key)?.text;
});

watchEffect(() => {
  selectedKeys.value = [unref(getLang)];
});

async function toggleLocale(lang: LangType | string) {
  await changeLang(lang as LangType);
  selectedKeys.value = [lang as string];
  props.reload && location.reload();
}
function handleMenuEvent(menu: IDropMenu) {
  if (unref(getLang) === menu.key) {
    return;
  }
  toggleLocale(menu.key as string);
}
</script>

<style>
.my-swiper {
  width: 400px;
  height: 100px;
}
.swiper {
  width: 100%;
}
.swiper-slide {
  width: 400px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
}
.swiper-slide:nth-child(1n) {
  background-color: rgb(206, 17, 17);
}
.swiper-slide:nth-child(2n) {
  background-color: rgb(0, 140, 255);
}
.swiper-slide:nth-child(3n) {
  background-color: rgb(10, 184, 111);
}
.swiper-slide:nth-child(4n) {
  background-color: rgb(211, 122, 7);
}
.swiper-slide:nth-child(5n) {
  background-color: rgb(118, 163, 12);
}
</style>
