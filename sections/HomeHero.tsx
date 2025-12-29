import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/auth/session";
import Image from "next/image";
import Link from "next/link";

const HomeHero = async () => {
  const session = await getSession();

  return (
    <section className="w-full min-h-132.5 flex justify-center items-center flex-col py-10 px-6 drop-shadow bg-cover bg-center">
      <Image
        src="/images/hero2.jpg"
        alt="Community background"
        fill={true}
        preload={true}
        className="object-cover -z-10 opacity-90"
      />
      <h1 className="text-5xl font-bold bg-clip-text py-2">
        Together We Thrive
      </h1>
      <p className="text-xl tracking-tight mt-6 mb-10">
        Join a trusted community where collective empowerment leads to wealth.
      </p>
      {!session && (
        <Link href="/register">
          <Button size="sm">Become a member</Button>
        </Link>
      )}
    </section>
  );
};

export default HomeHero;
