import moment from "moment";
import { defineComponent, onMounted, ref } from "vue";
import "moment/dist/locale/zh-cn";

moment.locale("zh-cn");

export default defineComponent({
  name: "Clock",
  setup() {
    const date = ref(moment().format("YYYY/MM/DD dddd HH:mm:ss"));

    onMounted(() => {
      setInterval(() => {
        date.value = moment().format("YYYY/MM/DD dddd HH:mm:ss");
      }, 1000);
    });

    return () => <h1>{date.value}</h1>;
  },
});
