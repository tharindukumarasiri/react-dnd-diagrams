import React, { memo, useEffect, useMemo } from 'react';
import { NodeResizer, NodeToolbar, Position } from 'reactflow';

import TextInput from '../customElements/input.jsx'
import { useNodeDataStore } from '../store'

import style from '../DndStyles.module.scss'

function LineChart({ id, selected, type }) {
    const Shapes = useNodeDataStore((state) => state.shapesData);

    const shapeData = Shapes[type]
    const initialHeight = shapeData.size?.height;
    const initialWidth = shapeData.size?.width;

    const sizes = useNodeDataStore((state) => state.size);
    const onSizeCahnge = useNodeDataStore((state) => state.setSize);

    const size = sizes.find(item => item.id === id) || { height: initialHeight, width: initialWidth };
    const setSize = (value) => onSizeCahnge(id, value)

    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === id);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const onChangeChartData = (value) => changeChartData(id, value)

    const lineNumber = chartData?.lineNumber || 1
    const setLineNumber = (value) => onChangeChartData({ lineNumber: value })

    const curveNumber = chartData?.curveNumber || 1
    const setCurveNumber = (value) => onChangeChartData({ curveNumber: value })

    const mainContainerStyle = {
        height: size?.height,
        width: size?.width,
    }

    useEffect(() => {
        if (sizes.find(item => item.id === id)) return;

        setSize({ height: initialHeight, width: initialWidth })
    }, []);

    const onResize = (_, size) => setSize(size);

    const onLineNumberIncrese = () => setLineNumber(lineNumber + 1);
    const onLineNumberDecrease = () => setLineNumber(lineNumber - 1 > 0 ? lineNumber - 1 : 0);
    const onLineNumberChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setLineNumber(Number(number))
        }
    };

    const onCurveNumberIncrese = () => setCurveNumber(curveNumber + 1);
    const onCurveNumberDecrease = () => setCurveNumber(curveNumber - 1 > 0 ? curveNumber - 1 : 0);
    const onCurveNumberChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setCurveNumber(Number(number))
        }
    };

    const getLines = useMemo(() => {
        const linesArray = [];

        for (let i = 1; i < lineNumber + 1; i++) {
            let rotate = 90 / (lineNumber + 1) * i

            linesArray.push(
                <div
                    key={i}
                    className={style.lineChartLine}
                    style={{ width: size?.width * 2, transform: `rotate(${rotate + 90}deg)` }}
                />
            )
        }

        return linesArray
    }, [lineNumber, size])

    const getCurves = useMemo(() => {
        const curvesArray = [];

        for (let i = 1; i < curveNumber + 1; i++) {
            let boxSize = size?.width / (curveNumber + 1) * i * 2

            curvesArray.push(
                <div
                    key={i}
                    className={style.lineChartCurveBox}
                    style={{
                        width: boxSize,
                        height: boxSize,
                        right: -boxSize / 2,
                        top: -boxSize / 2
                    }}
                />
            )
        }

        return curvesArray
    }, [curveNumber, size])


    return (
        <div className={style.lineChartContainer} style={mainContainerStyle}>
            <NodeResizer
                isVisible={selected}
                minWidth={initialHeight}
                minHeight={initialWidth}
                onResize={onResize}
                keepAspectRatio={shapeData?.keepAspectRatio ?? true}
                handleClassName={style.resizerHandleStyle}
            />
            <NodeToolbar position={Position.Right}>
                <div>Number of Lines</div>
                <div className={style.lineChartLineToolbarItem + ' m-t-10'}>
                    <div
                        className='hover-hand m-r-10 m-t-10 bold'
                        onClick={onLineNumberDecrease}> - </div>
                    <TextInput value={lineNumber} onChange={onLineNumberChange} />
                    <div
                        className='hover-hand m-l-10 m-t-10 bold'
                        onClick={onLineNumberIncrese}
                    > + </div>
                </div>

                <div className='m-t-20'>Number of Curves</div>
                <div className={style.lineChartLineToolbarItem + ' m-t-10'}>
                    <div
                        className='hover-hand m-r-10 m-t-10 bold'
                        onClick={onCurveNumberDecrease}> - </div>
                    <TextInput value={curveNumber} onChange={onCurveNumberChange} />
                    <div
                        className='hover-hand m-l-10 m-t-10 bold'
                        onClick={onCurveNumberIncrese}
                    > + </div>
                </div>
            </NodeToolbar>

            {getLines}
            {getCurves}

        </div>
    );
}

export default memo(LineChart);