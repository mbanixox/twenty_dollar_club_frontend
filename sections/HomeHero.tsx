import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomeHero = () => {
  return (
    <section className="w-full min-h-132.5 flex justify-center items-center flex-col py-10 px-6 drop-shadow bg-cover bg-center">
      <Image
        src="/images/hero_bg.jpg"
        alt="Community background"
        fill={true}
        className="object-cover -z-10 opacity-90"
      />
      <h1 className="text-5xl font-bold bg-clip-text py-2">
        Together We Thrive
      </h1>
      <p className="text-xl tracking-tight mt-6 mb-10">
        Join a trusted community where collective empowerment leads to wealth.
      </p>
      <Button size="sm">Become a member</Button>
    </section>
  );
};

export default HomeHero;
