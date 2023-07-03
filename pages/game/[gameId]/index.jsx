import Game from "@/components/game/Game";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  return (
    <>
      <Game gameId={router.query.gameId} />
    </>
  );
}
