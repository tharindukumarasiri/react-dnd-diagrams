import React from 'react';

export const Categories = {
    'SHAPES': 'Shapes',
    'BPMN': 'BPMN 2.0',
    'STRUCTURES': 'Other'
}

export const parentNodes = ['Table', 'LineChart']

const ShapesData = {
    Square: {
        image: <rect x="0.5" y="0.5" width="25" height="25" vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 26 26",
        category: [Categories.SHAPES],
        keepAspectRatio: false,
    },
    Circle: {
        image: <rect x="0.5" y="0.5" width="25" height="25" rx="12.5" vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 26 26",
        category: [Categories.SHAPES]
    },
    Triangle: {
        image: <path d="M1.14359 25L15 0.999999L28.8564 25H1.14359Z" vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 30 26",
        category: [Categories.SHAPES]
    },
    Diamond: {
        image: <>
            <rect x="19.1" y="18.7" transform="matrix(0.7071 0.7071 -0.7071 0.7071 50.3087 -21.0924)" class="st0" width="63.1" height="63.1" vectorEffect="non-scaling-stroke" />
        </>,
        viewBox: "0 0 100 100",
        category: [Categories.SHAPES],
    },
    Star: {
        image: <path d="M14 1.61804L16.6677 9.82827L16.7799 10.1738H17.1432H25.776L18.7919 15.248L18.498 15.4615L18.6103 15.807L21.2779 24.0172L14.2939 18.943L14 18.7295L13.7061 18.943L6.72206 24.0172L9.38973 15.807L9.50199 15.4615L9.20809 15.248L2.22405 10.1738H10.8568H11.2201L11.3323 9.82827L14 1.61804Z" vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 28 26",
        category: [Categories.SHAPES]
    },
    Tick: {
        image: <>
            <g>
                <path class="st0" d="M39.8,24.9c0,9-7.3,16.2-16.2,16.2S7.4,33.8,7.4,24.9S14.6,8.7,23.6,8.7c6,0,11.3,3.3,14.1,8.2" />
                <polyline class="st0" points="15,25.1 22.1,31.5 42.7,12.3 	" />
            </g>
        </>,
        viewBox: "0 0 50 50",
        category: [Categories.SHAPES],
    },
    Thumbs: {
        image: <>
            <path class="st0" d="M8,23.1h5.4c1.5,0,2.7,1.2,2.7,2.6v13.9c0,1.4-1.2,2.6-2.7,2.6H5.3" />
            <path class="st0" d="M42.9,30.5c-0.3,0-0.6,0.3-0.8,0.6c-0.1,0.3,0,0.7,0.2,0.9c0.5,0.4,0.7,1,0.7,1.6c0,1.1-0.9,2.1-2,2.2
       c-0.3,0-0.6,0.3-0.8,0.6c-0.1,0.3,0,0.7,0.2,0.9c0.6,0.6,0.8,1.3,0.7,2.1c-0.2,1-1.2,1.7-2.3,1.7H22.4c-1.3,0-3.5-0.6-4.5-1.3V24.8
       l1.3-0.7c0.2-0.1,0.3-0.2,0.4-0.4L25,12c0.1-0.1,0.4-1.9,0.4-2.1l-0.3-4.1c0.4-0.2,1-0.5,1.8-0.5c1,0,3.6,2.5,3.6,5.4
       c0,3.2-1.7,7.7-1.7,7.8c-0.1,0.3-0.1,0.6,0.1,0.8c0.2,0.2,0.4,0.4,0.7,0.4h12.4c1.5,0,2.8,1.1,2.9,2.4c0.1,1-0.4,2-1.3,2.5
       c-0.3,0.2-0.4,0.5-0.4,0.8c0,0.3,0.2,0.6,0.5,0.8c0.8,0.4,1.2,1.1,1.2,2C44.9,29.4,44,30.4,42.9,30.5z"/>
        </>,
        viewBox: "0 0 50 50",
        category: [Categories.SHAPES]
    },
    HorizontalLine: {
        image: <rect x="0.5" width="134" height="2" rx="2" strokeWidth="0" fill='black' vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 135 2",
        keepAspectRatio: false,
        size: { width: 50, height: 2 },
        hideTextInput: true,
        hideShape: true,
        category: [Categories.STRUCTURES],
    },
    VerticalLine: {
        image: <rect y="0.5" width="2" height="134" rx="2" strokeWidth="0" fill='black' vectorEffect="non-scaling-stroke" />,
        viewBox: "0 0 2 135",
        keepAspectRatio: false,
        size: { width: 2, height: 50 },
        hideTextInput: true,
        hideShape: true,
        category: [Categories.STRUCTURES]
    },
    Text: {
        image: <text transform="matrix(1 0 0 1 11.6778 62.5603)" class="st0 st1">Text</text>,
        viewBox: "0 0 100 100",
        size: { width: 50, height: 20 },
        keepAspectRatio: false,
        hideShape: true,
        category: [Categories.STRUCTURES]
    },
    Table: {
        image: <>
            <g>
                <path d="M245.9,5.2v89.7H4.7V5.2H245.9 M246.9,4.2H3.7v91.7h243.1V4.2L246.9,4.2z" />
            </g>
            <g>
                <line class="st0" x1="59.5" y1="4.8" x2="59.5" y2="95" />
            </g>
            <g>
                <line class="st0" x1="158" y1="4.8" x2="158" y2="95" />
            </g>
            <line class="st0" x1="4.6" y1="21.2" x2="246.4" y2="21.2" />
        </>,
        viewBox: "0 0 251 101",
        size: { width: 100, height: 100 },
        keepAspectRatio: false,
        hideTextInput: true,
        hideShape: true,
        category: [Categories.STRUCTURES]
    },
    LineChart: {
        image: <>
            <polyline class="st0" points="10.2,14.7 88.4,14.7 88.4,87.1 " />
            <path class="st1" d="M87.9,52.8C67,52.8,50,35.9,50,15" />
            <g>
                <g>
                    <path class="st2" d="M87.7,80.7c-0.2,0-0.3,0-0.5,0" />
                    <path class="st3" d="M85.2,80.7c-34.6-1.3-62.3-29.4-63.1-64" />
                    <path class="st2" d="M22.1,15.6c0-0.2,0-0.3,0-0.5" />
                </g>
            </g>
            <line class="st4" x1="88.4" y1="14.7" x2="17.8" y2="57.5" />
            <line class="st4" x1="88" y1="15.2" x2="42.1" y2="83.8" />
        </>
        ,
        viewBox: "0 0 100 100",
        size: { width: 100, height: 100 },
        category: [Categories.STRUCTURES]
    },
    MatrixChart: {
        image: <>
            <path class="st0" d="M806,632.7H13.8c-3,0-5.5-2.5-5.5-5.5V13.7c0-3,2.5-5.5,5.5-5.5H806c3,0,5.5,2.5,5.5,5.5v613.4
            C811.5,630.2,809,632.7,806,632.7z"/>
            <g>
                <rect x="36.5" y="37.5" class="st1" width="747.8" height="57" />
                <g>
                    <text transform="matrix(1 0 0 1 375.0496 74.7012)" class="st2 st3 st4">HEADER</text>
                </g>
            </g>
            <rect x="36.5" y="98.4" class="st1" width="747.8" height="132.1" />
            <rect x="36.5" y="234.2" class="st1" width="747.8" height="181.6" />
            <g>
                <path class="st5" d="M172.7,217.3H66c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C184.7,211.9,179.3,217.3,172.7,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,217.3H211.9c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C330.6,211.9,325.2,217.3,318.6,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st8" d="M464.5,217.3H357.8c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C476.5,211.9,471.1,217.3,464.5,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 387.5914 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,217.3H503.7c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C622.5,211.9,617.1,217.3,610.5,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,217.3H649.7c-6.6,0-12-5.4-12-12v-77.3c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v77.3
                C768.4,211.9,763,217.3,756.4,217.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4315 171.6804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,291.2H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,285.8,179.3,291.2,172.7,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,291.2H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,285.8,325.2,291.2,318.6,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,343.9H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,338.5,325.2,343.9,318.6,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st8" d="M464.5,291.2H357.8c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C476.5,285.8,471.1,291.2,464.5,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 387.5914 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,291.2H503.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C622.5,285.8,617.1,291.2,610.5,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,343.9H503.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C622.5,338.5,617.1,343.9,610.5,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,291.2H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,285.8,763,291.2,756.4,291.2z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 277.0671)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,343.9H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,338.5,763,343.9,756.4,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,343.9H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,338.5,179.3,343.9,172.7,343.9z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 329.7604)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,396.5H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,391.1,179.3,396.5,172.7,396.5z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 382.4538)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <rect x="36.5" y="419.6" class="st1" width="747.8" height="181.6" />
            <g>
                <path class="st5" d="M172.7,476.6H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,471.2,179.3,476.6,172.7,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,476.6H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,471.2,325.2,476.6,318.6,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st7" d="M318.6,529.3H211.9c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C330.6,523.9,325.2,529.3,318.6,529.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 241.6713 515.1871)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st8" d="M464.5,476.6H357.8c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C476.5,471.2,471.1,476.6,464.5,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 387.5914 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st9" d="M610.5,476.6H503.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C622.5,471.2,617.1,476.6,610.5,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 533.5114 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,476.6H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,471.2,763,476.6,756.4,476.6z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 462.4938)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,529.3H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C768.4,523.9,763,529.3,756.4,529.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 515.1871)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st10" d="M756.4,582H649.7c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12V570
                C768.4,576.6,763,582,756.4,582z"/>
                <g>
                    <text transform="matrix(1 0 0 1 679.4314 567.8805)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,529.3H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12v16.5
                C184.7,523.9,179.3,529.3,172.7,529.3z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 515.1871)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
            <g>
                <path class="st5" d="M172.7,582H66c-6.6,0-12-5.4-12-12v-16.5c0-6.6,5.4-12,12-12h106.7c6.6,0,12,5.4,12,12V570
                C184.7,576.6,179.3,582,172.7,582z"/>
                <g>
                    <text transform="matrix(1 0 0 1 95.7513 567.8804)" class="st2 st3 st6">NAME</text>
                </g>
            </g>
        </>
        ,
        viewBox: "0 0 819.7 640.1",
        size: { width: 300, height: 300 },
        keepAspectRatio: false,
        category: [Categories.STRUCTURES]
    },
    Annotation: {
        image: <>
            <path class="st0" d="M20.4,93.6c-6.6,0-12-5.4-12-12V19.7c0-6.6,5.4-12,12-12" />
            <text transform="matrix(1 0 0 1 19.8188 54.7724)" class="st1 st2 st3">Annotation</text>
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.BPMN]
    },
    Task: {
        image: <>
            <path class="st3" d="M76,88H24c-6.6,0-12-5.4-12-12V24c0-6.6,5.4-12,12-12h52c6.6,0,12,5.4,12,12v52C88,82.6,82.6,88,76,88z" />
        </>,
        viewBox: "0 0 100 100",
        size: { width: 75, height: 75 },
        keepAspectRatio: false,
        category: [Categories.BPMN]
    },
    Activity: {
        image: <>
            <path class="st1" d="M5.8,20.5c0-3.3,3.3-3.3,3.3-3.3h81.6c3.3,0,3.3,3.3,3.3,3.3V80c0,3.3-3.3,3.3-3.3,3.3H9.1
       c-3.3,0-3.3-3.3-3.3-3.3V20.5z"/>
            <path class="st0" d="M5.8,20.5c0-3.3,3.3-3.3,3.3-3.3h81.6c3.3,0,3.3,3.3,3.3,3.3V80c0,3.3-3.3,3.3-3.3,3.3H9.1
       c-3.3,0-3.3-3.3-3.3-3.3V20.5z"/>

        </>,
        viewBox: "0 0 100 100",
        keepAspectRatio: false,
        category: [Categories.BPMN]
    },
    Transaction: {
        image: <>
            <path class="st1" d="M3.2,18.3c0-3.6,3.5-3.6,3.5-3.6h86.5c3.5,0,3.5,3.6,3.5,3.6v64.3c0,3.6-3.5,3.6-3.5,3.6H6.7
       c-3.5,0-3.5-3.6-3.5-3.6V18.3z"/>
            <path class="st1" d="M5.8,20.5c0-3.3,3.3-3.3,3.3-3.3h81.6c3.3,0,3.3,3.3,3.3,3.3V80c0,3.3-3.3,3.3-3.3,3.3H9.1
       c-3.3,0-3.3-3.3-3.3-3.3V20.5z"/>
            <path class="st0" d="M5.8,20.5c0-3.3,3.3-3.3,3.3-3.3h81.6c3.3,0,3.3,3.3,3.3,3.3V80c0,3.3-3.3,3.3-3.3,3.3H9.1
       c-3.3,0-3.3-3.3-3.3-3.3V20.5z"/>


        </>,
        viewBox: "0 0 100 100",
        size: { width: 60, height: 60 },
        category: [Categories.BPMN]
    },
    DataStore: {
        image: <>
            <path class="st0" d="M93.9,26.9c0-3-2.4-5.5-5.4-5.5H9.8c-3,0-5.4,2.5-5.4,5.5v43.7h0c0,0,0,0,0,0c0,6.5,20.1,11.7,44.8,11.7
       S93.9,77,93.9,70.6c0,0,0,0,0,0h0V26.9z"/>
            <ellipse class="st0" cx="49.1" cy="34.5" rx="44.8" ry="11.7" />
            <ellipse class="st0" cx="49.1" cy="30" rx="44.8" ry="11.7" />
            <ellipse class="st0" cx="49.1" cy="25.7" rx="44.8" ry="11.7" />
            <text transform="matrix(1 0 0 1 18.2956 63.5212)" class="st1 st2 st3">Data Store</text>
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.BPMN]
    },
    Event: {
        image: <circle class="st0" cx="49.2" cy="49.9" r="41.1" />,
        viewBox: "0 0 100 100",
        category: [Categories.BPMN]
    },
    Event2: {
        image: <>
            <circle class="st1" cx="49.3" cy="49.4" r="45.7" />
            <circle class="st0" cx="49.3" cy="49.4" r="41.1" />
        </>,
        viewBox: "0 0 100 100",
        category: [Categories.BPMN]
    },
    Event3: {
        image: <>
            <circle class="st2" cx="48.9" cy="48.3" r="45.7" />
            <circle class="st0" cx="48.9" cy="48.3" r="41.1" />
            <ellipse class="st1" cx="48.9" cy="48.3" rx="34.8" ry="34.4" />
        </>,
        viewBox: "0 0 100 100",
        category: [Categories.BPMN]
    },
    Hex: {
        image: <polygon class="st0" points="73.6,9.1 26.1,9.1 2.4,50.2 26.1,91.3 73.6,91.3 97.3,50.2 " />,
        viewBox: "0 0 100 100",
        category: [Categories.BPMN]
    },
    Hex2: {
        image: <>
            <polygon class="st0" points="73.3,9.2 25.9,9.2 2.2,50.2 25.9,91.3 73.3,91.3 97,50.2 " />
            <polygon class="st1" points="70.9,12.9 28.3,12.9 7,50.2 28.3,87.6 70.9,87.6 92.2,50.2 " />
        </>,
        viewBox: "0 0 100 100",
        category: [Categories.BPMN]
    },
    Participant: {
        image: <>
            <path class="st0" d="M94.4,92.2H5.5c-2.3,0-4.1-1.8-4.1-4.1v-73c0-2.3,1.8-4.1,4.1-4.1h88.8c2.3,0,4.1,1.8,4.1,4.1v73
       C98.5,90.4,96.6,92.2,94.4,92.2z"/>
            <path class="st1" d="M1.9,75.6v12c0,2.3,1.8,4.1,4.1,4.1h88c2.2,0,4.1-1.8,4.1-4.1v-12H1.9z" />
            <line class="st2" x1="1.5" y1="30.6" x2="98.4" y2="30.6" />
            <line class="st2" x1="1.5" y1="75.3" x2="98.4" y2="75.3" />
            <text transform="matrix(1 0 0 1 17.8559 24.7385)" class="st3 st4 st5">Participant A</text>
            <text transform="matrix(1 0 0 1 22.8007 86.7928)" class="st3 st4 st5">Participant</text>
            <text transform="matrix(1 0 0 1 38.8314 55.2797)" class="st3 st4 st5">Task</text>
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.BPMN]
    },
    Pool: {
        image: <>
            <path class="st0" d="M83.2,93.2H17.8c-6.6,0-12-5.4-12-12V19.2c0-6.6,5.4-12,12-12h65.4c6.6,0,12,5.4,12,12v61.9
       C95.2,87.8,89.8,93.2,83.2,93.2z"/>
            <text transform="matrix(1 0 0 1 37.4137 42.833)"><tspan x="0" y="0" class="st1 st2 st3">Pool</tspan><tspan x="-18.5" y="16.8" class="st1 st2 st3">(Black Box)</tspan></text>
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.BPMN]
    },
    Document: {
        image: <>
            <g>
                <g>
                    <path class="st0" d="M85.8,25.1L70.6,9.9c-0.3-0.3-0.8-0.5-1.3-0.5H22.8c-4.8,0-8.7,3.9-8.7,8.7v66.3c0,4.8,3.9,8.7,8.7,8.7h54.9
               c4.8,0,8.7-3.9,8.7-8.7v-58C86.3,25.9,86.1,25.4,85.8,25.1z M67.5,9.4v10.1c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10.1"
                    />
                </g>
            </g>
        </>,
        viewBox: "0 0 100 100",
        size: { width: 80, height: 80 },
        category: [Categories.SHAPES, Categories.BPMN]
    },
    DocPause: {
        image: <>
            <g>
                <g>
                    <path class="st0" d="M85.8,25.1L70.6,9.9c-0.3-0.3-0.8-0.5-1.3-0.5H22.8c-4.8,0-8.7,3.9-8.7,8.7v66.3c0,4.8,3.9,8.7,8.7,8.7h54.9
               c4.8,0,8.7-3.9,8.7-8.7v-58C86.3,25.9,86.1,25.4,85.8,25.1z M67.5,9.4v10.1c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10.1"
                    />
                </g>
            </g>
            <line class="st1" x1="40.5" y1="59.9" x2="40.5" y2="86" />
            <line class="st1" x1="50.5" y1="59.9" x2="50.5" y2="86" />
            <line class="st1" x1="60.6" y1="59.9" x2="60.6" y2="86" />
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.BPMN]
    },
    DocOutput: {
        image: <>
            <g>
                <g>
                    <path class="st0" d="M85.8,25.1L70.6,9.9c-0.3-0.3-0.8-0.5-1.3-0.5H22.8c-4.8,0-8.7,3.9-8.7,8.7v66.3c0,4.8,3.9,8.7,8.7,8.7h54.9
               c4.8,0,8.7-3.9,8.7-8.7v-58C86.3,25.9,86.1,25.4,85.8,25.1z M67.5,9.4v10.1c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10.1"
                    />
                </g>
            </g>
            <g>
                <g>
                    <line class="st0" x1="52.2" y1="76.4" x2="78.2" y2="76.4" />
                    <g>
                        <polygon points="75.2,86.4 92.5,76.4 75.2,66.5 			" />
                    </g>
                </g>
            </g>
            <text transform="matrix(1 0 0 1 16.2047 61.123)" class="st1 st2">Output</text>
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.BPMN]
    },
    DocInput: {
        image: <>
            <g>
                <g>
                    <path class="st0" d="M85.8,25.1L70.6,9.9c-0.3-0.3-0.8-0.5-1.3-0.5H22.8c-4.8,0-8.7,3.9-8.7,8.7v66.3c0,4.8,3.9,8.7,8.7,8.7h54.9
               c4.8,0,8.7-3.9,8.7-8.7v-58C86.3,25.9,86.1,25.4,85.8,25.1z M67.5,9.4v10.1c0,2.3,0.9,4.5,2.5,6.1c1.6,1.6,3.5,2.5,6.1,2.5h10.1"
                    />
                </g>
            </g>
            <g>
                <g>
                    <line class="st0" x1="3.6" y1="25.3" x2="29.6" y2="25.3" />
                    <g>
                        <polygon points="26.7,35.3 44,25.3 26.7,15.3 			" />
                    </g>
                </g>
            </g>
            <text transform="matrix(1 0 0 1 24.9707 61.123)" class="st1 st2">Input</text>
        </>,
        viewBox: "0 0 100 100",
        hideTextInput: true,
        category: [Categories.BPMN]
    },
}

export default ShapesData;