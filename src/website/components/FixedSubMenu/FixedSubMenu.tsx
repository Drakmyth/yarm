import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubMenu } from "@szhsin/react-menu";
import React, { ReactNode } from "react";
import "./FixedSubMenu.css";

class FixedSubMenuOptionalProps {}

interface FixedSubMenuProps extends FixedSubMenuOptionalProps {
    label: string;
    children?: ReactNode;
}

export const FixedSubMenu = ({ label, children }: FixedSubMenuProps) => (
    <SubMenu
        label={
            <>
                <span>{label}</span>
                <FontAwesomeIcon icon={faAngleRight} />
            </>
        }
    >
        {children}
    </SubMenu>
);
