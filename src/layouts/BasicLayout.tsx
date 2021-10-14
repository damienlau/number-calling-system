import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import Header from "../components/Header";

export default defineComponent({
  setup() {
    return () => (
      <section class="container">
        <Header title="急 诊" />
        <main>
          <RouterView />
        </main>
        <footer></footer>
      </section>
    );
  },
});
