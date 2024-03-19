import React, { useState, useRef } from 'react';
import { Modal, Tooltip } from 'antd';
import {
    useReactFlow,
    getRectOfNodes,
    getTransformForBounds,
    useOnSelectionChange,
    useStore
} from 'reactflow';
import {
    DownloadOutlined,
    SaveOutlined,
    UploadOutlined,
    UndoOutlined,
    RedoOutlined,
    FullscreenOutlined,
    LockOutlined,
    UnlockOutlined,
    QuestionCircleOutlined,
    PlusOutlined,
    MinusOutlined
} from '@ant-design/icons';
import { toPng, toJpeg } from 'html-to-image';

import Dropdown from '../customElements/dropdown';
import {
    downloadImage,
    downloadJson,
    downloadTypes,
    readFile
} from '../utils';

import { useNodeDataStore } from '../store'

import style from '../DndStyles.module.scss'

let selectedNodes = [];

const imageWidth = 1024;
const imageHeight = 768;

const zoomSelector = (s) => Math.trunc(s.transform[2] * 50)

export default function ToolBar({ onSave, pasteNodes, clearSelectedNodes, getAllData, setEdges, setNodes, spacebarActive, setSpacebarActive }) {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedDownloadType, setSelectedDownloadType] = useState(downloadTypes[0])

    const { getNodes, fitView, zoomIn, zoomOut } = useReactFlow();
    const zoomValue = useStore(zoomSelector);

    const setCopiedNodes = useNodeDataStore((state) => state.setCopiedNodes);
    const setUploadedData = useNodeDataStore((state) => state.setUploadedData);

    const UPLOAD_BTN_REF = useRef(null);

    const handleTransform = () => fitView({ duration: 800 });
    const zoomInCanvas = () => zoomIn({ duration: 500 });
    const zoomOutCanvas = () => zoomOut({ duration: 500 });

    useOnSelectionChange({
        onChange: ({ nodes, edges }) => {
            selectedNodes = nodes
        },
    });


    const toggleModal = () => setModalVisible(pre => !pre);

    const onChangeDownloadType = (e) => {
        e.preventDefault();
        setSelectedDownloadType(JSON.parse(e.target.value));
    }

    const onCopy = () => {
        setCopiedNodes(selectedNodes)
    }

    const onExport = () => {
        clearSelectedNodes();

        // we calculate a transform for the nodes so that all nodes are visible
        // we then overwrite the transform of the `.react-flow__viewport` element
        // with the style option of the html-to-image library
        const nodesBounds = getRectOfNodes(getNodes());
        const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0, 5);

        switch (selectedDownloadType.type) {
            case 'PNG':
                toPng(document.querySelector('.react-flow__viewport'), {
                    backgroundColor: 'white',
                    width: imageWidth,
                    height: imageHeight,
                    style: {
                        width: imageWidth,
                        height: imageHeight,
                        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
                    },
                }).then((datUrl) => downloadImage(datUrl, 'png'));
                break;
            case 'JPG':
                toJpeg(document.querySelector('.react-flow__viewport'), {
                    backgroundColor: 'white',
                    width: imageWidth,
                    height: imageHeight,
                    style: {
                        width: imageWidth,
                        height: imageHeight,
                        transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
                    },
                }).then((datUrl) => downloadImage(datUrl, 'jpeg'));
                break;
            case 'JSON':
                downloadJson(getAllData());
                break;
            default:
                break;
        }

        toggleModal()
    }

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {

            const file = e.target.files[0]
            let fileDataUrl = await readFile(file, true)

            try {
                const uploadedJson = JSON.parse(fileDataUrl)

                setNodes(uploadedJson?.nodes || []);
                setEdges(uploadedJson?.edges || []);
                setUploadedData(uploadedJson?.nodeSizes, uploadedJson?.nodesData, uploadedJson?.chartData)

            } catch (e) {
                console.log("unsuported format")
            }
        }
    }

    const handleFileUpload = () => UPLOAD_BTN_REF.current.click();

    const toggleInteractivity = () => setSpacebarActive(pre => !pre)

    return (
        <div className={style.preventSelect}>
            <div className={style.toolBarContainer}>
                <Tooltip title='Help' className={style.helpIconContainer}>
                    <QuestionCircleOutlined className={style.toolBarIcon} />
                </Tooltip>

                <Tooltip title='Move canvas'>
                    {spacebarActive ?
                        <LockOutlined className={style.toolBarIcon} onClick={toggleInteractivity} />
                        : <UnlockOutlined className={style.toolBarIcon} onClick={toggleInteractivity} />
                    }
                </Tooltip>
                <Tooltip title='Zoom to fit'>
                    <FullscreenOutlined className={style.toolBarIcon} onClick={handleTransform} />
                </Tooltip>

                <div className={style.toolBarSeparator} />

                <div className={style.flexCenterMiddle}>
                    <PlusOutlined className={style.toolBarIcon} onClick={zoomInCanvas} />
                    <div className={style.zoomValueContainer}>{zoomValue}%</div>
                    <MinusOutlined className={style.toolBarIcon} onClick={zoomOutCanvas} />
                </div>

                <div className={style.toolBarSeparator} />

                <Tooltip title='Undo'>
                    <UndoOutlined className={style.toolBarIcon} />
                </Tooltip>
                <Tooltip title='Redo'>
                    <RedoOutlined className={style.toolBarIcon} />
                </Tooltip>

                <div className={style.copyPasteContainer} onClick={onCopy} >Copy</div>
                <div className={style.copyPasteContainer} onClick={pasteNodes}>Paste</div>

                <div className={style.toolBarSeparator} />

                <Tooltip title='Save changes'>
                    <SaveOutlined className={style.toolBarIcon} onClick={onSave} />
                </Tooltip>
                <Tooltip title='Download'>
                    <DownloadOutlined className={style.toolBarIcon} onClick={toggleModal} />
                </Tooltip>
                <Tooltip title='Upload'>
                    <UploadOutlined className={style.toolBarIcon} onClick={handleFileUpload} />
                </Tooltip>
                <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={UPLOAD_BTN_REF}
                    onChange={onFileChange}
                />

                <Modal
                    title='Export'
                    visible={modalVisible}
                    onOk={onExport}
                    onCancel={toggleModal}
                    okText='Export'
                    width='30vw'
                    centered={true}
                >
                    <div className="g-row">
                        <div>Export to SVG/ PNG/ JPG/ JSON</div>
                        <Dropdown
                            values={downloadTypes}
                            onChange={onChangeDownloadType}
                            dataName='label'
                            selected={JSON.stringify(selectedDownloadType)}
                        />
                    </div>
                    <div className="n-float" />
                </Modal>
            </div>
        </div>
    );
};
