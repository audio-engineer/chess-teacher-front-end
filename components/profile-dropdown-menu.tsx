"use client";

import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  checkAuth,
  signInWithGoogle,
  signOutUser,
} from "@/firebase/authentication";
import Link from "next/link";

export default function ProfileDropdownMenu(): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleAsyncClick = (asyncFunction: () => Promise<void>) => (): void => {
    asyncFunction()
      .then(() => {
        handleClose();
      })
      .catch((error: unknown) => {
        console.error("Error:", error);
      });
  };

  const handleProfileClick = (): void => {
    handleClose();
  };

  const handleSignInClick = async (): Promise<void> => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error);
    }
    handleClose();
  };

  const handleSignOutClick = async (): Promise<void> => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
    handleClose();
  };

  return (
    <div>
      <IconButton
        id="profile-button"
        size="large"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        aria-controls={open ? "login-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {/* TODO: Remove AccountCircle and maybe add Google image provided when authenticated. */}
        <AccountCircle />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "login-button",
        }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Link href="/profile">Profile</Link>
        </MenuItem>
        {!checkAuth() && (
          <MenuItem onClick={handleAsyncClick(handleSignInClick)}>
            Login
          </MenuItem>
        )}
        {checkAuth() && (
          <MenuItem onClick={handleAsyncClick(handleSignOutClick)}>
            Logout
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}
