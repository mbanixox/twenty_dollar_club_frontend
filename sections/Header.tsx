import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="px-5 py-3 font-outfit sticky top-0 z-10 transition-all duration-300 ease-in-out bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 shadow-2xl">
      <div className="flex justify-between items-center">
        <div>TwentyDollarClub</div>
        <div className="flex items-center gap-5 text-black">
          <Button size="sm">Become a member</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
