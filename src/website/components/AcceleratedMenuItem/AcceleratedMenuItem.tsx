import { MenuItem } from "@szhsin/react-menu";
import React from "react";
import "./AcceleratedMenuItem.css";

class OptionalProps {
    ctrl?: boolean = false;
    shift?: boolean = false;
    alt?: boolean = false;
}

interface AcceleratedMenuItemProps extends OptionalProps {
    hotkey: string;
    label: string;
}

export const AcceleratedMenuItem = (p: AcceleratedMenuItemProps) => {
    const props = { ...new OptionalProps(), ...p };

    return (
        <MenuItem>
            <span>{props.label}</span>
            <span className="accelerator">{`${props.ctrl ? "Ctrl+" : ""}${props.shift ? "Shift+" : ""}${props.alt ? "Alt+" : ""}${props.hotkey}`}</span>
        </MenuItem>
    );
};
