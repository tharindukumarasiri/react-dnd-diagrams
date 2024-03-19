import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    SelectionMode,
    Background,
    Panel,
    MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { message } from 'antd';

import CustomNode from './shapes/CustomNode.js';
import LineChart from './shapes/LineChart.js';
import MatrixChart from './shapes/MatrixChart.js';
import Line from './shapes/Line.js';
import Text from './shapes/Text.js';
import UploadNode from './shapes/UploadNode.js';
import FloatingEdge from './customElements/FloatingEdge.js';
import CustomConnectionLine from './customElements/CustomConnectionLine.js';
import Sidebar from './panels/Sidebar.jsx';
import PropertyPanel from './panels/PropertyPanel.jsx';
import ToolBar from './panels/ToolBar.jsx';
import ContextMenu from './customElements/ContextMenu.js';
import { useNodeDataStore } from './store.js'

import { getId, arrowColor, uploadNodeId } from './utils.js'

import style from './DndStyles.module.scss'
import PagesPanel from './panels/PagesPanel.jsx';

const connectionLineStyle = {
    strokeWidth: 1,
    stroke: arrowColor,
};

const edgeTypes = {
    floating: FloatingEdge,
};
const panOnDrag = [1, 2];

const defaultEdgeOptions = {
    style: { strokeWidth: 1, stroke: arrowColor },
    type: 'floating',
    markerEnd: {
        type: MarkerType.ArrowClosed,
        color: arrowColor,
    },
    zIndex: 1001,
};

const DnDFlow = (props) => {
    const Shapes = props?.shapesData
    const parentNodes = props?.parentNodes
    const categories = props?.categories

    const data = JSON.parse(props?.DrawingContent || null)?.[0]
    const reactFlowWrapper = useRef(null);
    const dragRef = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(data?.nodes || []);
    const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges || []);

    const [target, setTarget] = useState(null);
    const [menu, setMenu] = useState(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [deleteNodeId, setDeleteNodeId] = useState('')
    const [spacebarActive, setSpacebarActive] = useState(false)

    const setShapesData = useNodeDataStore((state) => state.setShapesData);
    const currentPage = useNodeDataStore((state) => state.currentPage);
    const setCurrentPage = useNodeDataStore((state) => state.setCurrentPage);
    const pagesData = useNodeDataStore((state) => state.pagesData);
    const setPagesData = useNodeDataStore((state) => state.setPagesData);
    const setAllData = useNodeDataStore((state) => state.setAllData);
    const textdata = useNodeDataStore((state) => state.textdata);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const size = useNodeDataStore((state) => state.size);
    const setSize = useNodeDataStore((state) => state.setSize);
    const chartData = useNodeDataStore((state) => state.chartData);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const copiedNodes = useNodeDataStore((state) => state.copiedNodes);

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    useEffect(() => {
        setPagesData(JSON.parse(props?.DrawingContent || null) || [{ nodes: [], edges: [], nodesData: [], nodeSizes: [], chartData: [], pageName: 'Page 1' }])
        setAllData(data?.nodeSizes || [], data?.nodesData || [], data?.chartData || [])
        setShapesData(Shapes)
    }, [props])

    //TODO Check this error and remove bellow effect
    useEffect(() => {
        const errorHandler = (e) => {
            if (
                e.message.includes(
                    "ResizeObserver loop completed with undelivered notifications" ||
                    "ResizeObserver loop limit exceeded"
                )
            ) {
                const resizeObserverErr = document.getElementById(
                    "webpack-dev-server-client-overlay"
                );
                if (resizeObserverErr) {
                    resizeObserverErr.style.display = "none";
                }
            }
        };
        window.addEventListener("error", errorHandler);

        return () => {
            window.removeEventListener("error", errorHandler);
        };
    }, []);

    const nodeTypes = useMemo(() => {
        const types = { ...Shapes }
        Object.keys(types).forEach(key => types[key] = CustomNode);
        types['LineChart'] = LineChart
        types['MatrixChart'] = MatrixChart
        types['HorizontalLine'] = Line
        types['VerticalLine'] = Line
        types['Text'] = Text
        types[uploadNodeId] = UploadNode
        return types;
    }, []);

    const selectedNodes = useMemo(() => {
        return nodes.filter(node => node.selected)
    }, [nodes])

    const selectedEdges = useMemo(() => {
        return edges.filter(edge => edge.selected)
    }, [edges])

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData('application/reactflow');

            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(type),
                type: type,
                position,
                data: {
                    setDeleteNodeId,
                },
            };

            if (type === 'Table') {
                newNode.data = { ...newNode.data, addTableLine }
            }

            if (type === uploadNodeId) {
                const image = event.dataTransfer.getData('application/reactflow/uploaded');

                newNode.data = { ...newNode.data, image };
            }

            setNodes((nds) => nds.concat(newNode));
        }, [reactFlowInstance]
    );

    const onChangePage = (index, isNewPage = false) => {
        const newPagesData = JSON.parse(JSON.stringify(pagesData))
        newPagesData[currentPage] = { ...newPagesData[currentPage], nodes: nodes, edges: edges, nodesData: textdata, nodeSizes: size, chartData: chartData }
        if (isNewPage)
            newPagesData.push({ nodes: [], edges: [], nodesData: [], nodeSizes: [], chartData: [], pageName: `Page ${index + 1}` });

        setPagesData(newPagesData)

        const currentPageData = pagesData?.[index]
        setAllData(currentPageData?.nodeSizes || [], currentPageData?.nodesData || [], currentPageData?.chartData || [])
        setNodes(currentPageData?.nodes || [])
        setEdges(currentPageData?.edges || [])

        setCurrentPage(index)
    }

    const spacebarPress = useCallback((event) => {
        if (event.key === " " && !spacebarActive) {
            setSpacebarActive(true)
        }
    }, []);

    const spacebarRelease = useCallback((event) => {
        if (event.key === " ") {
            setSpacebarActive(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", spacebarPress, false);
        document.addEventListener("keyup", spacebarRelease, false);

        return () => {
            document.removeEventListener("keydown", spacebarPress, false);
            document.removeEventListener("keyup", spacebarRelease, false);
        };
    }, [spacebarPress, spacebarRelease]);

    useEffect(() => {
        if (deleteNodeId !== '') {
            const nodeToDelete = nodes.find(node => node.id === deleteNodeId)
            reactFlowInstance.deleteElements({ nodes: [nodeToDelete] })
            setDeleteNodeId('')
        }
    }, [deleteNodeId])

    const getAllData = useCallback(() => {
        const newPagesData = JSON.parse(JSON.stringify(pagesData))
        newPagesData[currentPage] = { ...newPagesData[currentPage], nodes: nodes, edges: edges, nodesData: textdata, nodeSizes: size, chartData: chartData }
        setPagesData(newPagesData)
        return newPagesData
    }, [nodes, edges, textdata, size, chartData]);

    const onNodeDragStart = (evt, node) => {
        dragRef.current = node;
    };

    const onNodeDrag = (evt, node) => {
        // calculate the center point of the node from position and dimensions
        const centerX = node.position.x + node.width / 2;
        const centerY = node.position.y + node.height / 2;

        // find a node where the center point is inside
        const targetNode = nodes.find(
            (n) =>
                centerX > n.position.x &&
                centerX < n.position.x + n.width &&
                centerY > n.position.y &&
                centerY < n.position.y + n.height &&
                n.id !== node.id // this is needed, otherwise we would always find the dragged node
        );

        setTarget(targetNode);
    };

    const onNodeDragStop = (evt, node) => {
        setNodes((nodes) =>
            nodes.map((n) => {
                const isParentNode = parentNodes.some(parent => target?.id?.includes(parent));

                if (target && isParentNode && node?.id === n?.id && !n?.parentNode) {
                    n.parentNode = target?.id;
                    n.extent = 'parent';
                    n.position = { x: target.width * .4, y: target.height * .4 }
                }
                return n;
            })
        );

        setTarget(null);
        dragRef.current = null;
    };

    // const onNameChange = (e) => { //TODO to be add later 
    //     e.preventDefault();
    //     setDiagramName(e.target.value)
    // }

    const onNodeContextMenu = useCallback(
        (event, node) => {
            // Prevent native context menu from showing
            event.preventDefault();

            // Calculate position of the context menu
            const pane = reactFlowWrapper.current.getBoundingClientRect();
            setMenu({
                id: node.id,
                top: event.clientY - 80,
                left: event.clientX - 50,
            });
        },
        [setMenu]
    );

    // Close the context menu if it's open whenever the window is clicked.
    const onPaneClick = useCallback(() => setMenu(null), [setMenu]);

    const addTableLine = (type, parentId, parentSize, position) => {
        const newNode = {
            id: getId(type),
            type: type,
            position,
            parentNode: parentId,
            extent: 'parent',
            data: {
                setDeleteNodeId,
                hideHandle: true,
                size: parentSize,
                resizeToParentId: parentId,
            },
        };

        setNodes((nds) => nds.concat(newNode));
    }

    const onSave = () => {
        const payload = {
            'DrawingContent': JSON.stringify(getAllData()),
        }

        props?.saveDiagram(payload); // TODO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        message.success('Diagram Saved')
    }

    const clearSelectedNodes = () => {
        setNodes((nodes) =>
            nodes.map((n) => {
                const newNode = { ...n }
                newNode.selected = false;
                return newNode;
            })
        );
    }

    const pasteCopiedNodes = () => {
        clearSelectedNodes();

        const newNodes = copiedNodes?.map((node, index) => {
            const newNodeData = { ...node }
            const newNodeId = getId(newNodeData.id.split('_')[0]) + index

            const txtData = textdata?.find(item => item.id === node?.id)
            if (txtData) {
                const newTextData = { ...txtData }
                delete newTextData.id
                onTextChange(newNodeId, newTextData)
            }

            const chrtData = chartData?.find(item => item.id === node?.id)
            if (chrtData) {
                const newChartData = { ...chrtData }
                delete newChartData.id
                changeChartData(newNodeId, newChartData)
            }

            const nodeSize = size?.find(item => item.id === node?.id)
            if (nodeSize) {
                const newSize = { ...nodeSize }
                delete newSize.id
                setSize(newNodeId, newSize)
            }

            newNodeData.id = newNodeId
            return newNodeData
        })

        setNodes((nds) => nds.concat(newNodes));
    }

    return (
        <div className={style.dndflow}>
            <Sidebar Shapes={Shapes} Categories={categories} />

            <ReactFlowProvider>
                <Panel position="top-center">
                    <ToolBar
                        onSave={onSave}
                        pasteNodes={pasteCopiedNodes}
                        clearSelectedNodes={clearSelectedNodes}
                        getAllData={getAllData}
                        edges={edges}
                        setEdges={setEdges}
                        setNodes={setNodes}
                        spacebarActive={spacebarActive}
                        setSpacebarActive={setSpacebarActive}
                    />
                </Panel>
                <Panel position="bottom-center">
                    <PagesPanel onChangePage={onChangePage} />
                </Panel>

                <div className={style.reactflowrapper} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onNodeDragStart={onNodeDragStart}
                        onNodeDrag={onNodeDrag}
                        onNodeDragStop={onNodeDragStop}
                        onNodeContextMenu={onNodeContextMenu}
                        onPaneClick={onPaneClick}
                        onNodeClick={onPaneClick}
                        fitView
                        panOnScroll={true}
                        selectionOnDrag={true}
                        panOnDrag={panOnDrag}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        defaultEdgeOptions={defaultEdgeOptions}
                        connectionLineComponent={CustomConnectionLine}
                        connectionLineStyle={connectionLineStyle}
                        zoomOnDoubleClick={false}
                        nodesDraggable={!spacebarActive}
                        nodesFocusable={!spacebarActive}
                        selectionMode={SelectionMode.Partial}
                    >
                        <Background variant="dots" gap={8} size={0.5} id={props?.CollectionId} />
                        <Panel />
                    </ReactFlow>
                </div>
                {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

                <PropertyPanel
                    nodes={nodes}
                    selectedNodes={selectedNodes}
                    selectedEdges={selectedEdges}
                    setNodes={setNodes}
                    setEdges={setEdges}
                />
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
