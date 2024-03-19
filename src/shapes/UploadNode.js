import React, { memo, useEffect, useRef } from 'react';
import { NodeResizer, useStore, useUpdateNodeInternals } from 'reactflow';
import { drag } from 'd3-drag';
import { select } from 'd3-selection';

import { useNodeDataStore } from '../store'

import style from '../DndStyles.module.scss'
import { getImageDimensions } from '../utils';
import ConnectionDot from '../customElements/ConnectionDot';

const connectionNodeIdSelector = (state) => state.connectionNodeId;

const initialHeight = 80;
const initialWidth = 80;

function UploadNode({ id, selected, data }) {
    const rotateControlRef = useRef(null);
    const updateNodeInternals = useUpdateNodeInternals();

    const connectionNodeId = useStore(connectionNodeIdSelector);
    const isConnecting = !!connectionNodeId;
    const isTarget = connectionNodeId && connectionNodeId !== id;

    const handleContainerStyle = selected || isTarget ? '' : style.handleHidden;

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value);

    const textdata = useNodeDataStore((state) => state.textdata)?.find(item => item.id === id);
    const onTextChange = useNodeDataStore((state) => state.onTextChange);

    const rotate = textdata?.rotate || '0'
    const setRotate = (value) => onTextChange(id, { rotate: value })

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
        transform: `rotate(${rotate}deg)`,
    }

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

    useEffect(() => {
        const getImageSize = async () => {
            const imageDimensions = await getImageDimensions(data?.image);
            setSize({ height: imageDimensions.height, width: imageDimensions.width })
        }

        if (sizes.find(item => item.id === id)) return;

        getImageSize();
    }, []);

    const onResize = (_, size) => setSize(size);

    return (
        <div style={mainContainerStyle}>
            <i ref={rotateControlRef}
                style={{
                    display: selected ? 'block' : 'none',
                }}
                className={`nodrag ${style.textBtnRotate} icon-rotate1`}
            />
            <div className={handleContainerStyle}>
                <ConnectionDot isConnecting={isConnecting} isTarget={isTarget} />
            </div>

            <NodeResizer
                isVisible={selected}
                onResize={onResize}
                keepAspectRatio
                handleClassName={style.resizerHandleStyle}
            />

            <img src={data.image} alt="img" />
        </div>
    );
}

export default memo(UploadNode);