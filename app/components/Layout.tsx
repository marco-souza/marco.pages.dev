import type { PropsWithChildren } from "hono/jsx";
import type { FC } from "hono/jsx";
import type { Theme } from "@/shared/theme";
import { Footer } from "@/components/Footer";
import { NavBar, type NavBarProps } from "#/app/components/NavBar";

type Props = PropsWithChildren<{
  theme: Theme;
  title?: string;
  navbar: NavBarProps;
}>;

export const Layout: FC<Props> = (props) => {
  return (
    <body hx-boost="true">
      <div class="grid gap-16 sm:gap-24 container mx-auto">
        <NavBar
          theme={props.navbar.theme ?? "system"}
          isAuthenticated={props.navbar.isAuthenticated}
        />

        <div class="px-8">{props.children}</div>

        <Footer />
      </div>
    </body>
  );
};
