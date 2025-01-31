"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavItem = ({ active, setActive, name, route }) => {
  return active !== name ? (
    <Link href={route}>
      <span
        className="mx-2 cursor-pointer hover:border-b-4 hover:text-green-500 text-white"
        onClick={() => setActive(name)}
      >
        {name}
      </span>
    </Link>
  ) : null;
};

const Navbar = () => {
  const [active, setActive] = useState("");
  const [mounted, setMounted] = useState(false);
  //   const router = useRouter();

  // Wait until the component is mounted to access the router
  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid accessing router until the component is mounted on the client side
  //   useEffect(() => {
  //     if (mounted) {
  //       if (router.pathname === "/") setActive("About");
  //       else if (router.pathname === "/projects") setActive("Projects");
  //       else if (router.pathname === "/resume") setActive("Resume");
  //     }
  //   }, [mounted, router.pathname]);

  if (!mounted) return null; // Prevent rendering until mounted

  return (
    <div className="flex items-center justify-between px-5 py-3 my-3 bg-gray-900">
      <span className="text-xl font-bold border-b-4 md:text-2xl border-green-500 text-white">
        {active}
      </span>

      <div className="text-base font-normal md:text-xl">
        <NavItem active={active} setActive={setActive} name="About" route="/" />
        <NavItem
          active={active}
          setActive={setActive}
          name="Resume"
          route="/resume"
        />
        <NavItem
          active={active}
          setActive={setActive}
          name="Projects"
          route="/projects"
        />
      </div>
    </div>
  );
};

export default Navbar;
