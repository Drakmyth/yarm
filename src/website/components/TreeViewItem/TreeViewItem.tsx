import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { CSSProperties } from "react";
import { TreeRenderNode } from "../TreeView/TreeRenderNode";

class TreeViewItemOptionalProps {
    selected?: boolean = false;
    style?: CSSProperties = {};
}

interface TreeViewItemProps extends TreeViewItemOptionalProps {
    renderNode: TreeRenderNode;
    onAnchorClicked: (id: string) => void;
}

export const TreeViewItem = (p: TreeViewItemProps) => {
    const props = { ...new TreeViewItemOptionalProps(), ...p };

    const classes = [
        "tree-view-item",
        props.selected ? "tree-view-item--selected" : "",
        props.renderNode.expanded ? "tree-view-item--expanded" : ""
    ]
        .filter(Boolean)
        .join(" ");

    const hasChildren = props.renderNode.expanded !== null;

    return (
        <li
            className={classes}
            key={props.renderNode.id}
            style={{ ...props.style, paddingLeft: props.renderNode.indentation }}
        >
            {hasChildren && (
                <span onClick={() => props.onAnchorClicked(props.renderNode.id)}>
                    <FontAwesomeIcon icon={props.renderNode.expanded ? faAngleDown : faAngleRight} />
                </span>
            )}
            <span>{`${props.renderNode.label} (${props.renderNode.id})`}</span>
        </li>
    );
};
