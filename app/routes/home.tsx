import { Describe } from "~/describe/describe";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Gợi ý hẹn hò" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Describe />;
}
