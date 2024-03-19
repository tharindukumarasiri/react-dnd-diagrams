import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useUpdateNodeInternals, NodeResizer, NodeToolbar, Position } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { CloseOutlined } from '@ant-design/icons';

import { useNodeDataStore } from '../store'
import { getRgbaColor } from '../utils';
import TextInput from '../customElements/input.jsx'

import style from '../DndStyles.module.scss'

const resizerHandleStyle = { width: 6, height: 6 }
const lineTypes = {
    HORIZONTAL: 'HorizontalLine',
    VERTICAL: 'VerticalLine'
}

function Line({ id, selected, type, data }) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const Shapes = useNodeDataStore((state) => state.shapesData);

    const shapeData = Shapes[type]
    const initialHeight = shapeData.size?.height ?? 50;
    const initialWidth = shapeData.size?.width ?? 50;

    const isHorizontalLine = type === lineTypes.HORIZONTAL

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const setSelectedNodeId = useNodeDataStore((state) => state.setSelectedNodeId);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const backgroundColor = getRgbaColor(textdata?.backgroundColor) || '#000000'
    const borderColor = getRgbaColor(textdata?.borderColor) || 'black'


    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
        backgroundColor: shapeData?.hideShape ? backgroundColor : '',
        borderColor: shapeData?.hideShape ? borderColor : '',
    }

    const resizerBounds = useCallback((isMinSize) => {
        if (data?.resizeToParentId) {
            const parentSize = sizes.find(item => item.id === data?.resizeToParentId);
            if (isHorizontalLine) {
                return { width: parentSize?.width, height: undefined }
            } else {
                return { width: undefined, height: parentSize?.height }
            }
        } else {
            if (isMinSize) {
                return { width: initialWidth, height: initialHeight }
            } else {
                return { width: undefined, height: undefined }
            }
        }
    }, [sizes])

    useEffect(() => {
        if (sizes.find(item => item.id === id)) return;

        if (data?.size) {
            setSize(data?.size)
        } else {
            setSize({ height: initialHeight, width: initialWidth })
        }
    }, []);

    useEffect(() => {
        if (selected)
            setSelectedNodeId(id);
    }, [selected]);

    useEffect(() => {
        if (data?.resizeToParentId) {
            const parentSize = sizes.find(item => item.id === data?.resizeToParentId);

            if (isHorizontalLine && parentSize?.width !== size?.width) {
                setSize({ height: size?.height, width: parentSize?.width })
            }
            if (type === lineTypes.VERTICAL && parentSize?.height !== size?.height) {
                setSize({ width: size?.width, height: parentSize?.height })
            }
        }
    });

    useEffect(() => {
        if (!rotateControlRef.current) {
            return;
        }

        const selection = select(rotateControlRef.current);
        const dragHandler = drag().on('drag', (evt) => {
            const dx = evt.x - 100;
            const dy = evt.y - 100;
            const rad = Math.atan2(dx, dy);
            const deg = rad * (180 / Math.PI);
            setRotate(180 - deg);
            updateNodeInternals(id);
        });

        selection.call(dragHandler);
    }, [id, updateNodeInternals]);

    const onResize = (_, reSize) => {
        if (data?.resizeToParentId) {
            setSize(reSize)
        } else {
            if (isHorizontalLine) {
                setSize({ height: size?.height, width: reSize?.width })
            } else {
                setSize({ height: reSize?.height, width: size?.width })
            }
        }
    };

    const onDeleteNode = () => data.setDeleteNodeId(id);

    const onChangeLineWidth = (e) => {
        e.preventDefault();
        if (isHorizontalLine) {
            setSize({ height: Number(e.target.value), width: size?.width })
        } else {
            setSize({ height: size?.height, width: Number(e.target.value) })
        }
    }

    return (
        <div style={mainContainerStyle} className={style.customNodeContainer}>
            <NodeResizer
                isVisible={selected}
                minWidth={resizerBounds(true)?.width}
                minHeight={resizerBounds(true)?.height}
                maxWidth={resizerBounds(false)?.width}
                maxHeight={resizerBounds(false)?.height}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleStyle={resizerHandleStyle}
            />
            {!data?.resizeToParentId &&
                <div
                    ref={rotateControlRef}
                    style={{
                        display: selected ? 'block' : 'none',
                    }}
                    className={`nodrag ${style.rotateHandle}`}
                />
            }

            {selected &&
                <CloseOutlined className={style.nodeCloseBtn} onClick={onDeleteNode} />
            }

            <NodeToolbar position={isHorizontalLine ? Position.Bottom : Position.Right}>
                <div style={{ width: 30 }}>
                    <TextInput value={isHorizontalLine ? size?.height : size?.width} onChange={onChangeLineWidth} />
                </div>
            </NodeToolbar>
        </div>
    );
}

export default memo(Line);