import React, { useCallback, useRef, useState } from "react";
import { useVirtual } from "@tanstack/react-virtual";
import "./TreeView.css";
import { TreeViewItem } from "../TreeViewItem/TreeViewItem";
import { TreeRenderNode } from "./TreeRenderNode";

class TreeViewOptionalProps {}

interface TreeViewProps extends TreeViewOptionalProps {
    treeData: TreeNode[];
}

export interface TreeNode {
    label: string;
    children?: TreeNode[];
}

interface EnhancedTreeNode {
    id: string;
    label: string;
    indentation: number;
    children: EnhancedTreeNode[];
}

const buildId = (root: string, index: number) => {
    return [root, `${index}`].filter(Boolean).join("-");
};

const enhanceDataTree = (
    dataTree: TreeNode[] | undefined,
    indentLevel: number = 0,
    key: string = ""
): EnhancedTreeNode[] => {
    if (!dataTree || dataTree.length <= 0) return [];

    const enhancedNodes: EnhancedTreeNode[] = [];

    dataTree.forEach((node, i) => {
        const id = buildId(key, i);
        const eNode: EnhancedTreeNode = {
            id: id,
            label: node.label,
            children: enhanceDataTree(node.children, indentLevel + 50, id),
            indentation: indentLevel
        };

        enhancedNodes.push(eNode);
    });

    return enhancedNodes;
};

const getNodesToRender = (dataTree: EnhancedTreeNode[], expandedIds: Set<string>): TreeRenderNode[] => {
    const renderNodes: TreeRenderNode[] = [];

    for (let node of dataTree) {
        const isExpanded = node.children.length > 0 ? expandedIds.has(node.id) : null;

        renderNodes.push({
            id: node.id,
            label: node.label,
            indentation: node.indentation,
            expanded: isExpanded
        });

        if (isExpanded) {
            renderNodes.push(...getNodesToRender(node.children, expandedIds));
        }
    }

    return renderNodes;
};

export const TreeView = (p: TreeViewProps) => {
    const { treeData } = { ...new TreeViewOptionalProps(), ...p };

    const nodes = enhanceDataTree(treeData);

    const [selectedId, setSelectedId] = useState<string>("");
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const renderNodes = getNodesToRender(nodes, expandedIds);

    const treeViewRef = useRef(null);
    const rowVirtualizer = useVirtual({
        size: renderNodes.length,
        parentRef: treeViewRef,
        estimateSize: useCallback(() => 35, []),
        overscan: 5
    });

    const onAnchorClick = (id: string) => {
        const updatedIds = new Set(expandedIds);
        if (updatedIds.has(id)) {
            updatedIds.delete(id);
        } else {
            updatedIds.add(id);
        }

        setExpandedIds(updatedIds);
    };

    return (
        <div
            ref={treeViewRef}
            style={{
                height: "100%",
                width: "100%",
                overflow: "auto"
            }}
        >
            <ul
                className="tree-view"
                style={{
                    height: `${rowVirtualizer.totalSize}px`,
                    width: "100%",
                    position: "relative"
                }}
            >
                {rowVirtualizer.virtualItems.map((vi) => (
                    <TreeViewItem
                        renderNode={renderNodes[vi.index]}
                        onAnchorClicked={onAnchorClick}
                        key={renderNodes[vi.index].id}
                        style={{
                            transform: `translateY(${vi.start}px)`
                        }}
                    />
                ))}
            </ul>
        </div>
    );

    // return (
    //     <div
    //         ref={treeViewRef}
    //         className="tree-view"
    //         style={{
    //             height: 300,
    //             width: 300,
    //             overflowY: "auto"
    //         }}
    //     >
    //         <ul
    //             style={{
    //                 height: rowVirtualizer.totalSize,
    //                 width: "100%",
    //                 position: "relative"
    //             }}
    //         >
    //             {rowVirtualizer.virtualItems.map((v, i) => (
    //                 <TreeViewItem nodeState={nodeMap.} />
    //                 <li style={{
    //                     position: "absolute",
    //                     top: 0,
    //                     left: 0,
    //                     width: "100%",
    //                     height: v.size,
    //                     transform: `translateY(${v.start}px)`
    //                 }}></li>
    //             ))}
    //         </ul>
    //     </div>
    // );
};
