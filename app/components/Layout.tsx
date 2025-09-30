import type { FC, PropsWithChildren } from "hono/jsx";
import { Footer } from "@/components/Footer";
import { NavBar, type NavBarProps } from "@/components/NavBar";

type Props = PropsWithChildren<{
  navbar: NavBarProps;
}>;

export const Layout: FC<Props> = (props) => {
  return (
    <body hx-boost="true">
      <div class="grid gap-16 sm:gap-24 container mx-auto">
        <NavBar isAuthenticated={props.navbar.isAuthenticated} />

        <div class="px-8">{props.children}</div>

        <Footer />
      </div>
    </body>
  );
};
