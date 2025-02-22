import { div } from "framer-motion/client";
import Image from "next/image";
import { Hotel_new_AI } from "./components/aiNew";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#f0f0f0", padding: "20px" }}>
      <Hotel_new_AI></Hotel_new_AI>
    </div>
  );
}
