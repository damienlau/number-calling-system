import { defineComponent } from "vue";
import { RouterView, useRoute } from "vue-router";
import Header from "../components/Header";

export default defineComponent({
  setup() {
    const route = useRoute();

    return () => (
      <section class="container">
        <Header title={route.query?.room_name} />
        <main>
          <RouterView />
        </main>
      </section>
    );
  },
});
