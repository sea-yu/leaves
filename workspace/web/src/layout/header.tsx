import { ThemeController } from "@/components/theme-controller";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Logo from "@/components/logo";
import { Link } from "react-router-dom";
import { MetaSearch } from "@/components/meta-search";

const Header = () => {
  return (
    <Navbar isBordered maxWidth="full" className="px-8">
      <NavbarBrand>
        <Link to="/">
          <Logo />
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <MetaSearch />
      </NavbarContent>
      <NavbarContent justify="end">
        <ThemeController />
      </NavbarContent>
    </Navbar>
  );
};

export default Header;