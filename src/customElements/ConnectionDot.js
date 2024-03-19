import React from "react"
import { Handle, Position } from 'reactflow';

import style from '../DndStyles.module.scss'

const sourceStyle = { zIndex: 2 };
const targetStyle = { zIndex: 1 };

const ConnectionDot = ({ isConnecting, isTarget }) => {
    return (
        <>
            {!isConnecting && (
                <>
                    <Handle
                        className={style.customHandle2Right}
                        position={Position.Right}
                        type="source"
                        style={sourceStyle}
                    />
                    <Handle
                        className={style.customHandle2Top}
                        position={Position.Top}
                        type="source"
                        style={sourceStyle}
                    />
                    <Handle
                        className={style.customHandle2Bottom}
                        position={Position.Bottom}
                        type="source"
                        style={sourceStyle}
                    />
                    <Handle
                        className={style.customHandle2Left}
                        position={Position.Left}
                        type="source"
                        style={sourceStyle}
                    />
                </>
            )}
            <Handle className={isTarget ? style.customHandle : style.customHandle2}
                position={Position.Left}
                type="target"
                style={targetStyle}
            />
        </>)
}

export default ConnectionDot