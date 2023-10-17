import { Inter } from "next/font/google";
import Image from "next/image";

import camisa1 from "../assets/camisa1.png";
import camisa2 from "../assets/camisa2.png";
import camisa3 from "../assets/camisa3.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="max-w-mainMaxWidth min-h-mainMinHeight ml-auto flex w-full gap-12">
      <a
        href=""
        className="from-custom-start to-custom-end group relative flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-b object-cover p-1"
      >
        <Image src={camisa1} alt="Camisa 1" width={520} height={480} />
        <footer className="bg-footerRgba translate-y-hoverFooter absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md p-8 opacity-0 transition-all ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
      <a
        href=""
        className="from-custom-start to-custom-end group relative flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-b object-cover p-1"
      >
        <Image src={camisa2} alt="Camisa 2" width={520} height={480} />
        <footer className="bg-footerRgba translate-y-hoverFooter absolute bottom-1 left-1 right-1 flex items-center justify-between rounded-md p-8 opacity-0 transition-all ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a>
    </main>
  );
}
