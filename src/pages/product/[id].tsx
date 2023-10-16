import { useRouter } from "next/router";

export default function Product() {
  const { query } = useRouter();

  return <h1 className="font-roboto">Product: {JSON.stringify(query)}</h1>;
}
