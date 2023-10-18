import { stripe } from "@/lib/stripe";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const [isCreatingCheckoutSessions, setIsCreatingCheckoutSessions] =
    useState(false);
  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSessions(true);

      const response = await axios.post("/api/checkout", {
        priceId: product.defaultPriceId,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSessions(false);

      alert("Falha ao redirecionar ao checkout");
    }
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <main className="mx-auto grid max-w-6xl grid-cols-productGrid items-stretch gap-16 ">
        <div className="flex h-productHeight w-full max-w-lg items-center justify-center rounded-lg bg-gradient-to-t from-custom-start to-custom-end p-1">
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl text-gray300">{product.name}</h1>
          <span className="mt-4 block text-2xl text-green300">
            {product.price}
          </span>

          <p className="mt-10 text-md leading-6 text-gray300">
            {product.description}
          </p>

          <button
            disabled={isCreatingCheckoutSessions}
            onClick={handleBuyProduct}
            className="mt-auto cursor-pointer  rounded-lg border-0 bg-green500 p-5 text-md font-bold text-white hover:bg-green300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Comprar agora
          </button>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params.id);

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });
  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price.unit_amount! / 100),
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
