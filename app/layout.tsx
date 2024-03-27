import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import type { FC, ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import ProfileDropdownMenu from "@/components/profile-dropdown-menu";
import Link from "next/link";

const inter = Roboto({ subsets: ["latin"], weight: "500" });

export const metadata: Metadata = {
  title: "ChessTeacher",
  description: "Next-gen Online Chess Instructor",
};

interface Children {
  readonly children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const RootLayout: FC<Children> = ({ children }: Readonly<Children>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        <AppBar>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">ChessTeacher</Link>
            </Typography>
            <ProfileDropdownMenu />
          </Toolbar>
        </AppBar>
      </body>
    </html>
  );
};

export default RootLayout;
