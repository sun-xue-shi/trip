import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "underscore";

export default function useScroll() {
  const isreachBottom = ref(false);
  const scrollTop = ref(0);
  const clientHeight = ref(0);
  const scrollHeight = ref(0);
  //节流处理
  const scrollListener = throttle(() => {
    //滑过的高度
    scrollTop.value = document.documentElement.scrollTop;
    //当前屏幕高度
    clientHeight.value = document.documentElement.clientHeight;
    //总高度
    scrollHeight.value = document.documentElement.scrollHeight;
    // console.log(scrollTop, clientHeight, scrollHeight);
    //????????
    if (scrollTop.value + clientHeight.value >= scrollHeight.value - 1) {
      isreachBottom.value = true;
    }
  }, 100);

  onMounted(() => {
    window.addEventListener("scroll", scrollListener);
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListener);
  });

  return { isreachBottom, scrollTop, scrollHeight, clientHeight };
}