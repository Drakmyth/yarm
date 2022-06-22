import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useState } from "react";
import "./TreeView.css";

class TreeViewOptionalProps {}

interface TreeViewProps extends TreeViewOptionalProps {
    treeData: TreeNode[];
}

interface TreeNodeState {
    id: string;
    label: string;
    expanded: boolean;
    selected: boolean;
    indentation: number;
    children: string[];
}

export interface TreeNode {
    label: string;
    children?: TreeNode[];
}

const buildId = (root: string, index: number) => {
    return [root, `${index}`].filter(Boolean).join("-");
};

const initTreeState = (nodes: TreeNode[], indentLevel: number = 0, key: string = ""): Map<string, TreeNodeState> => {
    if (nodes.length <= 0) return new Map();

    const nodeStates = new Map<string, TreeNodeState>();

    nodes.forEach((n, i) => {
        const id = buildId(key, i);
        const nodeState = {
            id: id,
            label: n.label,
            children: n.children ? n.children.map((_, ci) => buildId(id, ci)) : [],
            indentation: indentLevel,
            selected: false,
            expanded: n.children ? n.children.length > 0 : false
        };
        nodeStates.set(id, nodeState);

        const children = initTreeState(n.children || [], indentLevel + 50, id);
        children.forEach((c) => nodeStates.set(c.id, c));
    });

    return nodeStates;
};

export const TreeView = (p: TreeViewProps) => {
    const props = { ...new TreeViewOptionalProps(), ...p };

    const [treeState, setTreeState] = useState<Map<string, TreeNodeState>>(initTreeState(props.treeData));
    useEffect(() => setTreeState(initTreeState(props.treeData)), [props.treeData]);

    const onAnchorClick = (id: string) => {
        if (!treeState.has(id)) return;

        console.log(id);
        const prevState = {...(treeState.get(id) as TreeNodeState)};
        prevState.expanded = !prevState.expanded;

        setTreeState(prev => {
            return new Map([...prev]).set(id, prevState)
        })
    };
    
    const renderNodes = (rootIds: string[], state: Map<string, TreeNodeState>): JSX.Element[] => {
        const retVal = rootIds
            .filter((id) => state.has(id))
            .flatMap((id) => {
                const s = state.get(id) as TreeNodeState;
    
                const classes = [
                    "tree-view-item",
                    s.selected ? "tree-view-item--selected" : "",
                    s.expanded ? "tree-view-item--expanded" : ""
                ]
                    .filter(Boolean)
                    .join(" ");
    
                const hasChildren = s.children.length > 0;
    
                return [
                    <li className={classes} key={s.id} style={{ paddingLeft: s.indentation }}>
                        {hasChildren && (
                            <span onClick={() => onAnchorClick(s.id)}>
                                <FontAwesomeIcon icon={s.expanded ? faAngleDown : faAngleRight} />
                            </span>
                        )}
                        <span>{`${s.label} (${s.id})`}</span>
                    </li>
                ].concat(hasChildren && s.expanded ? renderNodes(s.children, state) : []);
            });
        
            return retVal;
    };

    return (
        <ul className="tree-view">
            {renderNodes(
                props.treeData.map((_, i) => `${i}`),
                treeState
            )}
        </ul>
    );
};
