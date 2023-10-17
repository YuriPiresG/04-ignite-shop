import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Image from "next/image";

import logoImg from "../assets/logo.svg";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className=" flex min-h-screen flex-col  items-start justify-center">
      <header className="mx-auto w-full max-w-6xl py-8">
        <Image src={logoImg} alt="Logo Ignite Shop" />
      </header>

      <Component {...pageProps} />
    </div>
  );
}
