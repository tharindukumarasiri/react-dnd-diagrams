import React from 'react';

const EdgeMarkers = () => {
    return (
        <defs>
            <marker
                id="linestart"
                refX="-10"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                orient="auto">
                <rect width="1" height="100" fill='#8f8f8f' />
            </marker>
            <marker
                id="circlestart"
                refX="-10"
                refY="6"
                markerUnits="strokeWidth"
                markerWidth="11"
                markerHeight="11"
                orient="auto">
                <circle cx="6" cy="6" r="5" stroke="context-stroke" fill='#8f8f8f' />
            </marker>
            <marker
                id="lineend"
                refX="10"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                orient="auto">
                <rect width="1" height="100" fill='#8f8f8f' />
            </marker>
            <marker
                id="circleend"
                refX="20"
                refY="6"
                markerUnits="strokeWidth"
                markerWidth="11"
                markerHeight="11"
                orient="auto">
                <circle cx="6" cy="6" r="5" stroke="context-stroke" fill='#8f8f8f' />
            </marker>
        </defs>
    )
}

export default EdgeMarkers;