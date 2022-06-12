import { MenuItem } from "@szhsin/react-menu";
import React from "react";
import "./AcceleratedMenuItem.css";

interface AcceleratedMenuItemProps {
    ctrl?: boolean;
    shift?: boolean;
    alt?: boolean;
    hotkey: string;
    children?: string;
}

export const AcceleratedMenuItem = ({
    ctrl = false,
    shift = false,
    alt = false,
    hotkey = "F",
    children = ""
}: AcceleratedMenuItemProps) => (
    <MenuItem>
        <span>{children}</span>
        <span className="accelerator">{`${ctrl ? "Ctrl+" : ""}${shift ? "Shift+" : ""}${alt ? "Alt+" : ""}${hotkey}`}</span>
    </MenuItem>
);
