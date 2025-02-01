import Image from "next/image";

export default function Home() {
  return (
    <section
      className="w-full h-screen flex flex-col justify-center items-center relative bg-cover bg-center"
      style={{ backgroundImage: `url("/assets/images/hero.png")` }}
    ></section>
  );
}
