import { useSearchParams } from "react-router-dom";
import PackBrowser from "../components/PackBrowser";

export default function Stickers() {
  const [params] = useSearchParams();
  return (
    <div className="page-top">
      <div className="container page-head">
        <h1>Stickers</h1>
        <p className="muted">Browse every sticker pack made by the Spyrochat community.</p>
      </div>
      <PackBrowser q={params.get("q") || ""} />
    </div>
  );
}
