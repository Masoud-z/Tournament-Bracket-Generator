import Tournment from "@/components/game/Tournment";
import { useRouter } from "next/router";

export default function index() {
  const router = useRouter();
  return (
    <>
      <Tournment tournmentId={router.query.tournmentId} />
    </>
  );
}
