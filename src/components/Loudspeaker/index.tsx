import { defineComponent, h, watch, onMounted, ref } from "vue";

export default defineComponent({
  name: "Loudspeaker",
  setup() {
    const sound = ref("");
    const timeStamp = ref(0);
    const socket = new WebSocket(
      `${import.meta.env.VITE_WEBSOCKET_URL}/ws/register/quene/`
    );

    socket.onmessage = (e) => {
      let data_ = JSON.parse(e.data);
      sound.value = data_.voice_url;
      timeStamp.value = 0;
    };

    const handleCanplay = (e) => {
      e.target.play();
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
