// 急诊

import { defineComponent, onMounted, ref } from "vue";
import { findTriageQueue, queueResponseProps } from "../../api/queue";
import Loudspeaker from "../../components/Loudspeaker";

export default defineComponent({
  setup(props) {
    const peoples = ref({
      // 正在就诊
      matching: [] as queueResponseProps[],
      // 急诊外科
      surgical: [] as queueResponseProps[],
      // 急诊内科
      general: [] as queueResponseProps[],
      // 过号
      miss: [] as queueResponseProps[],
    });

    const handleRequest = () => {
      findTriageQueue({ statetext: "呼叫" }).then(
        (response: queueResponseProps[]) => {
          peoples.value.matching = response;
        }
      );
      findTriageQueue({ statetext: "等候", department: "急诊外科" }).then(
        (response: queueResponseProps[]) => {
          response.length = 4;
          peoples.value.surgical = response;
        }
      );
      findTriageQueue({ statetext: "等候", department: "急诊内科" }).then(
        (response: queueResponseProps[]) => {
          response.length = 4;
          peoples.value.general = response;
        }
      );
      findTriageQueue({ statetext: "过号" }).then(
        (response: queueResponseProps[]) => {
          peoples.value.miss = response;
        }
      );
    };

    onMounted(() => {
      handleRequest();
      setInterval(() => handleRequest(), 1000 * 5);
    });

    return () => (
      <>
        <Loudspeaker />
        <section class="billboard">
          <div class="matching">
            <div class="title">正在就诊</div>
            <div class="content">
              {peoples.value.matching.map((item: queueResponseProps) => {
                return (
                  <p>
                    请<span class="text-success">{item.name}</span>到
                    <span class="text-white">{item.room_name}</span>
                    就诊
                  </p>
                );
              })}
            </div>
          </div>
        </section>
        <section class="billboard">
          <div class="surgical">
            <div class="title">外科等候</div>
            <div class="wrapper">
              {peoples.value.surgical.map((item: queueResponseProps) => {
                return <p class="content">{item.name}</p>;
              })}
            </div>
          </div>
        </section>
        <section class="billboard">
          <div class="general">
            <div class="title">内科等候</div>
            <div class="wrapper">
              {peoples.value.general.map((item: queueResponseProps) => {
                return <p class="content">{item.name}</p>;
              })}
            </div>
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
      </>
    );
  },
});
