import { stripe } from "@/lib/stripe";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}

export default function Succes({ product, customerName }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="mx-auto flex h-productHeight flex-col items-center justify-center">
        <h1 className="text-2xl text-gray100">Compra efetuada!</h1>
        <div className="max-w-successProduct h-successProduct mt-16 flex w-full items-center justify-center bg-gradient-to-t from-custom-start to-custom-end object-cover p-1">
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </div>
        <p className="mt-8 max-w-xl text-center text-xl leading-6 text-gray300">
          Uhuul <strong>{customerName}</strong>, sua
          <strong> {product.name}</strong> já está a caminho
        </p>

        <Link
          className="mt-20 block text-lg font-bold text-green500 no-underline hover:text-green300"
          href=""
        >
          Voltar ao catálogo.
        </Link>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details.name;
  const product = session.line_items.data[0].price.product as Stripe.Product;

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
