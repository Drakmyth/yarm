import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useState } from "react";
import "./TreeViewItem.css";

class TreeViewItemOptionalProps {}

interface TreeViewItemProps extends TreeViewItemOptionalProps {
    label: string;
    children?: ReactNode;
}

export const TreeViewItem = (p: TreeViewItemProps) => {
    const props = { ...new TreeViewItemOptionalProps(), ...p };

    const [extended, setExtended] = useState(true);

    return (
        <div className="tree-view-item">
            <span onClick={() => setExtended(!extended)}>
                {props.children && <FontAwesomeIcon icon={extended ? faAngleDown : faAngleRight} />}
            </span>
            <span>{props.label}</span>
            {extended && props.children}
        </div>
    );
};
