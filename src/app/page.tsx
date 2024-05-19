import Image from "next/image";
import dynamic from "next/dynamic";
const Scene = dynamic(() => import('@/components/Track'), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="h-dvh w-dvw">
        <Scene />
      </div>
    </>
  );
}
