import React, { ReactNode } from "react";
import { TreeViewItem } from "../TreeViewItem/TreeViewItem";

export interface TreeItem {
    label: string;
    children?: TreeItem[];
}

class TreeViewOptionalProps {
    treeData?: TreeItem[];
}

interface TreeViewProps extends TreeViewOptionalProps {
    children?: ReactNode;
}

const renderData = (data: TreeItem[]) => {
    return data.map((ti) => <TreeViewItem label={ti.label}>{ti.children && renderData(ti.children)}</TreeViewItem>);
};

export const TreeView = (p: TreeViewProps) => {
    const props = { ...new TreeViewOptionalProps(), ...p };

    return <div className="tree-view">{props.treeData ? renderData(props.treeData) : props.children}</div>;
};
