import { defineComponent, h, watch, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Loudspeaker",
  setup() {
    const route = useRoute();
    const sound = ref("");
    const roomName = ref("");
    const timeStamp = ref(0);
    const socket = new WebSocket(
      `${import.meta.env.BASE_URL}/ws/register/quene/`
    );

    socket.onmessage = (e) => {
      let data_ = JSON.parse(e.data);
      sound.value = data_.voice_url;
      roomName.value = data_.call_room;
      timeStamp.value = 0;
    };

    const handleCanplay = (e) => {
      // 浏览器已经关闭了多媒体控件自动播放，
      // 如果运行报错 DOMException: play() failed because the user didn't interact with the document first.
      // 手动点击页面后才能执行 play() 方法。
      if (route.query?.room_name) {
        if (route.query?.room_name === roomName.value) {
          e.target.play();
        }
      } else {
        e.target.play();
      }
    };

    const handleEnded = (e) => {
      let timeout;
      if (!timeStamp.value) {
        timeStamp.value = 1;
        timeout = setTimeout(() => {
          e.target.load();
        }, 2000);
      } else {
        sound.value = "";
        clearTimeout(timeout);
      }
    };

    return () => (
      <>
        <audio
          src={sound.value}
          onCanplay={handleCanplay}
          onEnded={handleEnded}
        ></audio>
      </>
    );
  },
});
