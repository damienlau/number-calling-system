import { defineComponent } from "vue";
import classes from "./style.module.less";

export default defineComponent({
  setup(props) {
    return () => (
      <>
        <section class="billboard">
          <div class="matching">
            <div class="title">正在就诊</div>
            <div class="content">
              <p>
                请<span class="text-success">张三（1级）</span>到
                <span class="text-white">急诊内科1室</span>
                就诊
              </p>
              <p>
                请<span class="text-success">李四（2级）</span>到
                <span class="text-white">急诊外科</span>
                就诊
              </p>
              <p>
                请<span class="text-success">欧阳娜娜（3级）</span>到
                <span class="text-white">急诊内科6室</span>就诊
              </p>
            </div>
          </div>
        </section>
        <section class="billboard">
          <div class="surgical">
            <div class="title">外科等候</div>
            <div class="wrapper">
              <p class="content">张三（1级）</p>
              <p class="content">李四（2级）</p>
              <p class="content">欧阳娜娜</p>
            </div>
          </div>
        </section>
        <section class="billboard">
          <div class="general">
            <div class="title">外科等候</div>
            <div class="wrapper">
              <p class="content">张三（1级）</p>
              <p class="content">李四（2级）</p>
              <p class="content">欧阳娜娜</p>
            </div>
          </div>
        </section>
        <p class="miss">过号患者：张三（1级）、李四（2级）、欧阳娜娜</p>
      </>
    );
  },
});
890=/*---=