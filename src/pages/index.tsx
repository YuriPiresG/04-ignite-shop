import { GetStaticProps } from "next";
import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import { stripe } from "../lib/stripe";

import Stripe from "stripe";

interface HomeProps {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  });
  return (
    <main
      className="keen-slider ml-auto flex min-h-mainMinHeight w-full max-w-mainMaxWidth"
      ref={sliderRef}
    >
      {/* <a
        href=""
        className="keen-slider__slide group relative flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-b from-custom-start to-custom-end object-cover"
      >
        <Image src={camisa1} alt="Camisa 1" width={520} height={480} />
        <footer className="absolute bottom-1 left-1 right-1 flex translate-y-hoverFooter items-center justify-between rounded-md bg-footerRgba p-8 opacity-0 transition-all ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green300">R$ 79,90</span>
        </footer>
      </a> */}
      {products.map((product) => {
        return (
          <div
            key={product.id}
            className="keen-slider__slide group relative flex cursor-pointer items-center justify-center rounded-lg bg-gradient-to-b from-custom-start to-custom-end object-cover"
          >
            <Image src={product.imageUrl} width={520} height={480} alt="" />

            <footer className="absolute bottom-1 left-1 right-1 flex translate-y-hoverFooter items-center justify-between rounded-md bg-footerRgba p-8 opacity-0 transition-all ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
              <strong className="text-lg">{product.name}</strong>
              <span className="text-xl font-bold text-green300">
                {product.price}
              </span>
            </footer>
          </div>
        );
      })}
    </main>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount! / 100,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 hours
  };
};
