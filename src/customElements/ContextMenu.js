import React, { useCallback } from 'react';
import { useReactFlow } from 'reactflow';

import style from '../DndStyles.module.scss'
import { useNodeDataStore } from '../store'
import { getId } from '../utils'

export default function ContextMenu({ id, top, left, ...props }) {
    const { getNode, setNodes, setEdges, getNodes } = useReactFlow();

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const size = useNodeDataStore((state) => state.size)?.find(item => item.id === id);
    const setSize = useNodeDataStore((state) => state.setSize);
    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === id);
    const changeChartData = useNodeDataStore((state) => state.setChartData);

    const duplicateNode = useCallback(() => {
        const node = getNode(id);

        const position = {
            x: node.position.x + 50,
            y: node.position.y + 20,
        };

        const newNodeId = getId(node.id?.split('_')[0]);

        const newNodeTextData = { ...textdata };
        delete newNodeTextData.id

        const newChartData = { ...chartData };
        delete newChartData.id

        const newNodeSize = { ...size };
        delete newNodeSize.id

        const newNode = {
            ...node,
            id: newNodeId,
            position,
            selected: false
        };

        setNodes((nds) => nds.concat(newNode));

        onTextChange(newNodeId, newNodeTextData)
        changeChartData(newNodeId, newChartData)
        setSize(newNodeId, newNodeSize)
    }, [id, getNode, setNodes, textdata, chartData]);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node?.id !== id && node?.parentNode !== id));
        setEdges((edges) => edges.filter((edge) => edge?.source !== id));
    }, [id, setNodes, setEdges]);

    const moveToBack = useCallback(() => {
        const nodes = getNodes();
        const node = getNode(id);

        const newNodes = nodes.filter((node) => node?.id !== id);
        newNodes.unshift(node);

        setNodes(newNodes)
    }, [id, setNodes, getNode, getNodes]);

    const moveToFront = useCallback(() => {
        const nodes = getNodes();
        const node = getNode(id);

        const newNodes = nodes.filter((node) => node?.id !== id);
        newNodes.push(node);

        setNodes(newNodes)
    }, [id, setNodes, getNode, getNodes]);


    return (
        <div style={{ top, left }} className={style.canvasContextMenu} {...props}>
            <button onClick={duplicateNode}>Duplicate</button>
            <button onClick={deleteNode}>Delete</button>
            <button onClick={moveToBack}>Move to back</button>
            <button onClick={moveToFront}>Move to front</button>
        </div>
    );
}
