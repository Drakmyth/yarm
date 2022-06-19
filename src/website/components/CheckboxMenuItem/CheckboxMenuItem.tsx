import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItem } from "@szhsin/react-menu";
import React, { ReactNode } from "react";
import "./CheckboxMenuItem.css";

class CheckboxMenuItemOptionalProps {
    checked?: boolean = true;
}

interface CheckboxMenuItemProps extends CheckboxMenuItemOptionalProps {
    children?: ReactNode;
}

export const CheckboxMenuItem = ({ checked, children }: CheckboxMenuItemProps) => {
    return (
        <MenuItem type="checkbox" checked={checked}>
            <FontAwesomeIcon icon={faCheck} />
            <span>{children}</span>
        </MenuItem>
    );
};
