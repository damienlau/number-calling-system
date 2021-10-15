// 急诊内科

import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import quietImg from "../../assets/img/icon_quiet@2x.png";
import { findTriageQueue, queueResponseProps } from "../../api/queue";

enum sort {
  "一",
  "二",
  "三",
  "四",
  "五",
}

export default defineComponent({
  setup(props) {
    const route = useRoute();
    const peoples = ref({
      // 正在就诊
      matching: {} as queueResponseProps,
      // 候诊
      surgical: [] as queueResponseProps[],
      // 过号
      miss: [] as queueResponseProps[],
    });

    const handleRequest = () => {
      findTriageQueue({
        statetext: "呼叫",
        room_name: route.query?.room_name,
      }).then((response) => {
        peoples.value.matching = response.values().next().value;
      });
      findTriageQueue({
        statetext: "等候",
        department: route.query?.department,
      }).then((response: queueResponseProps[]) => {
        response.length = 3;
        peoples.value.surgical = response;
      });
      findTriageQueue({
        statetext: "过号",
        room_name: route.query?.room_name,
      }).then((response: queueResponseProps[]) => {
        peoples.value.miss = response;
      });
    };

    onMounted(() => {
      handleRequest();
      setInterval(() => handleRequest(), 1000 * 5);
    });

    return () => (
      <div class="signboard-wrapper">
        <section class="signboard">
          <div class="doctor">
            医生<span>{peoples.value.matching.doctor}</span>
          </div>
          <div class="match">
            正在就诊<span>{peoples.value.matching.name}</span>
          </div>
          <div class="quiet">
            <div class="quiet-tips">
              <img src={quietImg} />
              请保持安静， <br />
              谢谢您的合作！
            </div>
            <p class="quiet-alert">请在门口耐心等待叫号</p>
          </div>
          <div class="queue">
            {/* <p>
              候诊一<span>{peoples.value.surgical[0].name}</span>
            </p> */}
            {peoples.value.surgical.map((item, index) => {
              return (
                <p>
                  候诊{sort[index]}
                  <span>{item.name}</span>
                </p>
              );
            })}
          </div>
        </section>
        <p class="miss">
          过号患者：
          {peoples.value.miss.map((item: queueResponseProps) => {
            if (peoples.value.miss.length > 1) {
              return item.name + "、";
            } else {
              return item.name;
            }
          })}
        </p>
      </div>
    );
  },
});
