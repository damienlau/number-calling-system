import { defineComponent } from "vue";
import Clock from "../Clock";
import LogoImg from "../../assets/img/logo@2x.png";

export default defineComponent({
  name: "Header",
  props: {
    title: {
      type: String,
    },
  },
  setup(props) {
    return () => (
      <header>
        {/* LOGO Start */}
        <img class="logo" src={LogoImg} />
        {/* LOGO End */}
        {/* TITLE Start */}
        <h1 class="title">{props.title}</h1>
        {/* TITLE End */}
        {/* TIME Start */}
        <Clock class="clock" />
        {/* TIME End */}
      </header>
    );
  },
});
