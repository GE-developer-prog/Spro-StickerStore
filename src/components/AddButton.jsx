import { config } from "../config";
import { usePacks } from "../context/PacksContext";
import { useToast } from "../context/ToastContext";
import Icon from "./Icon";

// "Add to SpyroChat" - never says "Download" because stickers go straight into the app.
export default function AddButton({ pack, big = false }) {
  const { countAdd } = usePacks();
  const toast = useToast();

  const add = () => {
    if (config.ADD_TO_SPYROCHAT_URL) window.location.href = config.ADD_TO_SPYROCHAT_URL.replace("{id}", pack.id);
    countAdd(pack.id);
    toast(`"${pack.name}" added to SpyroChat`);
  };

  return (
    <button className={"btn btn-primary" + (big ? " btn-lg" : " btn-block btn-sm")} onClick={add}>
      Add to SpyroChat {big && <Icon name="right" size={18} />}
    </button>
  );
}
