<template>
  <div class="city">
    <div class="top">
      <div class="city top-page">
        <!-- 搜索框 -->
        <van-search
          v-model="searchValue"
          placeholder="城市/区域/位置"
          shape="round"
          show-action
          @cancel="cancelClick"
        />
        <!-- tab栏 -->
        <van-tabs v-model:active="tabActive" color="#ff9854" line-height="4">
          <template>
            <div v-for="(value, key) in allCitys">
              <van-tab :title="value.title" :name="key"></van-tab>
            </div>
          </template>
        </van-tabs>
      </div>
    </div>
    <div class="content">
      <template v-for="(value, key) in allCitys">
        <!-- 频繁切换时v-show可减少切换开销，提高渲染速度,但初始渲染开销会增加. -->
        <city-group v-show="tabActive === key" :groupData="value"></city-group>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import cityGroup from "./cpns/city-group.vue";
import useCityStore from "@/stores/modules/city";
import { storeToRefs } from "pinia";

const tabActive = ref();
const searchValue = ref("");
const router = useRouter();

const cancelClick = () => {
  router.push("/home");
};

//获取所有城市数据
const cityStore = useCityStore();
cityStore.allCitysData();
const { allCitys } = storeToRefs(cityStore);
</script>

<style lang="less" scoped>
//相当于固定了搜索框和tab栏
.city {
  .top {
    position: relative;
    z-index: 2;
  }
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}
</style>
