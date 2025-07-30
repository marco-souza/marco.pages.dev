import GithubIcon from "@/components/icons/GitHubIcon";
import { Logo } from "@/components/Logo";
import { configs } from "@/constants";
import { defineMenuLinks } from "@/shared/links";

export type NavBarProps = {
  isAuthenticated: boolean;
};

export const NavBar = ({ isAuthenticated }: NavBarProps) => (
  <div class="navbar skip-printer">
    <div class="navbar-start">
      <Menu isAuthenticated={isAuthenticated} />
    </div>

    <div class="navbar-center">
      <Logo />
    </div>

    <div class="navbar-end">
      <a href={configs.repo} target="_black" class="btn btn-ghost btn-circle">
        <GithubIcon />
      </a>
    </div>
  </div>
);

const Menu = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { navigation } = configs;
  const menuLinks = defineMenuLinks(
    { href: navigation.home, name: "Home" },
    { href: navigation.resume, name: "Resume" },
    { href: navigation.music, name: "Playlist" },
    { href: navigation.contact, name: "Contact" },
    // public
    { href: navigation.login, name: "Sign in", hide: isAuthenticated },
    // private
    {
      href: navigation.private.dashboard,
      name: "Dashboard",
      hide: !isAuthenticated,
    },
    { href: navigation.auth.signOut, name: "Sign out", hide: !isAuthenticated },
  );

  return (
    <div class="dropdown" as="button" type="button">
      <button type="button" class="btn btn-ghost btn-circle">
        <MenuIcon />
      </button>
      <ul class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        {menuLinks.map((link) => (
          <li key={link}>
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <title>Menu</title>
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 6h16M4 12h16M4 18h7"
    />
  </svg>
);
