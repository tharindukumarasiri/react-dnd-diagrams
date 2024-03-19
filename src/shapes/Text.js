import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useUpdateNodeInternals, NodeResizer, useStore } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';
import { CloseOutlined } from '@ant-design/icons';

import { useNodeDataStore } from '../store'
import { getRgbaColor } from '../utils';

import style from '../DndStyles.module.scss'
import ConnectionDot from '../customElements/ConnectionDot';

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const resizerHandleStyle = { width: 6, height: 6 }

function Text({ id, selected, type, data }) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const Shapes = useNodeDataStore((state) => state.shapesData);

    const shapeData = Shapes[type]
    const initialHeight = shapeData.size?.height ?? 50;
    const initialWidth = shapeData.size?.width ?? 50;

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const handleContainerStyle = selected || isTarget ? '' : style.handleHidden;

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);
    const setSelectedNodeId = useNodeDataStore((state) => state.setSelectedNodeId);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const fonstSize = Number(textdata?.fonstSize) || 8
    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const textColor = getRgbaColor(textdata?.textColor) || 'black'
    const textBold = textdata?.textBold || false

    const textAreaStyle = {
        fontFamily: textType.type,
        fontSize: fonstSize,
        color: textColor,
        fontWeight: textBold ? 'bolder' : 'normal',
    }

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
    }

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

    const onChange = useCallback((evt) => {
        onTextChange(id, { value: evt.target.value })
    }, []);

    const onResize = (_, size) => setSize(size);

    const onDeleteNode = () => data.setDeleteNodeId(id);

    const rotateText = () => {
        if (rotate !== '0') {
            setRotate('0')
        } else {
            setRotate('-90')
        }
    }

    return (
        <div style={mainContainerStyle} className={style.customNodeContainer}>
            <NodeResizer
                isVisible={selected}
                minWidth={initialWidth * 0.5}
                minHeight={initialHeight * 0.5}
                onResize={onResize}
                handleStyle={resizerHandleStyle}
            />
            <div
                ref={rotateControlRef}
                style={{
                    display: selected ? 'block' : 'none',
                }}
                className={`nodrag ${style.rotateHandle}`}
            />

            {selected &&
                <CloseOutlined className={style.nodeCloseBtn}
                    onClick={onDeleteNode}
                />
            }

            {selected &&
                <i className={style.textBtnRotate + ' icon-rotate1'} onClick={rotateText} />
            }

            <div className={handleContainerStyle}>
                <ConnectionDot isConnecting={isConnecting} isTarget={isTarget} />
            </div>

            <textarea
                id="textarea"
                type="textarea"
                name="textarea"
                placeholder={type}
                className={style.drawingTextArea}
                value={textdata?.value}
                onChange={onChange}
                multiple
                style={textAreaStyle}
            />
        </div>
    );
}

export default memo(Text);