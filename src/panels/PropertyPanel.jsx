import React, { useState, memo, useMemo } from 'react';
import {
    SettingOutlined,
    AlignCenterOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    DownOutlined,
    CloseOutlined
} from '@ant-design/icons';
import {
    MarkerType,
} from 'reactflow';

import {
    getRgbaColor,
    arrowStartTypes,
    arrowEndTypes,
    fontTypes,
    markerTypes,
    arrowColor,
    getId
} from '../utils';
import { useNodeDataStore } from '../store'
import Dropdown from '../customElements/dropdown';
import CustomDropdown from '../customElements/customDropdown';
import { readFile } from '../utils';
import ColorPicker from '../customElements/ColorPicker'

import style from '../DndStyles.module.scss'

const propertyCategories = {
    APPEARANCE: 'Appearance',
    LAYERS: 'Layers',
    LINK: 'Link',
    REFERENCE: 'Reference'
}

const LinkTypes = {
    URL: 'Url',
    DOCUMENT: 'Document',
}


const PropertyPanel = ({ nodes, selectedNodes = [], selectedEdges = [], setNodes, setEdges }) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [closedCategories, setClosedCategories] = useState([]);
    const [urlInput, setUrlInput] = useState('');
    const [uploadedFile, setUploadedFile] = useState('');
    const [selectedLinkType, setSelectedLinkType] = useState(LinkTypes.URL);

    const changeTextData = useNodeDataStore((state) => state.onTextChange);
    const selectedNodeId = useNodeDataStore((state) => state.selectedNodeId);
    const textdata = useNodeDataStore((state) => state.textdata).find(item => item.id === selectedNodeId);

    const onTextChange = (value) => changeTextData(selectedNodeId, value)

    const chartData = useNodeDataStore((state) => state.chartData).find(item => item.id === selectedNodeId);
    const changeChartData = useNodeDataStore((state) => state.setChartData);
    const onChangeChartData = (value) => changeChartData(selectedNodeId, value)

    const backgroundColor = textdata?.backgroundColor || '#ffffff'
    const setBackgroundColor = (value) => onTextChange({ backgroundColor: value })

    const borderColor = textdata?.borderColor || 'black'
    const setBorderColor = (value) => onTextChange({ borderColor: value })

    const textType = textdata?.textType || { label: 'Poppins', type: 'Poppins' }
    const setTextType = (value) => onTextChange({ textType: value })

    const fontSize = textdata?.fonstSize || 8
    const setFontSize = (value) => onTextChange({ fonstSize: value })

    const textBold = textdata?.textBold || false
    const setBold = (value) => onTextChange({ textBold: value })

    const textColor = textdata?.textColor || 'black'
    const setTextColor = (value) => onTextChange({ textColor: value })

    const markerType = textdata?.markerType
    const setMarkerType = (value) => onTextChange({ markerType: value })

    const sectionsCount = chartData?.sectionsCount || 1
    const setSectionsCount = (value) => onChangeChartData({ sectionsCount: value })

    const columnsCount = chartData?.columnsCount || 1
    const setColumnsCount = (value) => onChangeChartData({ columnsCount: value })

    const sectionBackgroundColor = chartData?.sectionBackgroundColor || '#EAEAEA'
    const setSectionBackgroundColor = (value) => onChangeChartData({ sectionBackgroundColor: value })

    const hideTools = chartData?.hideTools || false
    const setHideTools = (value) => onChangeChartData({ hideTools: value })

    const getSelectedEdgeStart = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]

        if (typeof selectedEdge?.markerStart == 'object') {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart?.type)
        } else {
            return arrowStartTypes?.find(type => type?.markerId === selectedEdge?.markerStart)
        }
    }, [selectedEdges])

    const getSelectedEdgeEnd = useMemo(() => {
        //using the first item in the selected edges
        let selectedEdge = selectedEdges[0]

        if (typeof selectedEdge?.markerEnd == 'object') {
            return arrowEndTypes?.find(type => type?.markerId === selectedEdge?.markerEnd?.type)
        } else {
            return arrowEndTypes?.find(type => type?.markerId === selectedEdge?.markerEnd)
        }
    }, [selectedEdges])

    const onArrowClicked = () => setSidebarVisible(pre => !pre)
    const onChangeBackgroundColor = (color) => setBackgroundColor(color?.rgb)
    const onChangeBorderColor = (color) => setBorderColor(color?.rgb)
    const onChangeSectionColor = (color) => setSectionBackgroundColor(color?.rgb)
    const onChangeTextBold = () => setBold(!textBold)
    const onChangeTextColor = (color) => setTextColor(color?.rgb)
    const onChangeMarker = (value) => setMarkerType(value)
    const onSectionsCountIncrese = () => setSectionsCount(sectionsCount + 1);
    const onSectionsCountDecrease = () => setSectionsCount(sectionsCount - 1 > 0 ? sectionsCount - 1 : 0);

    const onSectionsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setSectionsCount(Number(number))
        }
    };

    const onColumnsCountIncrease = () => setColumnsCount(columnsCount + 1);
    const onColumnsCountDecrease = () => setColumnsCount(columnsCount - 1 > 0 ? columnsCount - 1 : 0);
    const onColumnsCountChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) > 0) {
            setColumnsCount(Number(number))
        }
    };

    const handleLinkInput = (e) => {
        e.preventDefault();
        setUrlInput(e.target.value)
    }

    const addNewLink = () => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === selectedNodes[0].id) {
                    const newNode = { ...node }
                    const newLinks = JSON.parse(JSON.stringify(node?.data?.links || []))

                    switch (selectedLinkType) {
                        case LinkTypes.URL:
                            newLinks.push({
                                type: selectedLinkType,
                                value: urlInput
                            })
                            break;
                        case LinkTypes.DOCUMENT:
                            newLinks.push({
                                type: selectedLinkType,
                                file: uploadedFile,
                                fileName: urlInput
                            })
                            break;
                        default:
                            break;
                    }

                    newNode.data = {
                        ...node.data,
                        links: newLinks
                    }
                    return newNode
                } else return node
            })
        )
        setUrlInput('')
    }

    const onChangeTab = (tab) => {
        setSelectedLinkType(tab)
    }

    const onRemoveLink = (index) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === selectedNodes[0].id) {
                    const newNode = { ...node }
                    const newLinks = JSON.parse(JSON.stringify(node?.data?.links || []))

                    newLinks?.splice(index, 1)

                    newNode.data = {
                        ...node.data,
                        links: newLinks
                    }
                    return newNode
                } else return node
            })
        )
    }

    const handleCheckboxCLick = (e) => {
        e?.stopPropagation()
        setHideTools(e.target?.checked)
    };

    const onCategoryClick = (category) => {
        const index = closedCategories?.findIndex(cat => cat === category)
        const newClosedCategories = [...closedCategories]

        if (index < 0) {
            newClosedCategories.push(category)
        } else {
            newClosedCategories.splice(index, 1)
        }

        setClosedCategories(newClosedCategories);
    }

    const onChangeTextType = (e) => {
        e.preventDefault();
        setTextType(JSON.parse(e.target.value));
    }

    const onFontSizeChange = (e) => {
        e.preventDefault();
        const number = e.target.value

        if (!isNaN(number) && Number(number) < 33) {
            setFontSize(number)
        }
    }

    const increaseFontSize = () => {
        const newSize = Number(fontSize) + 1

        if (newSize < 33)
            setFontSize(newSize.toString())
    }

    const decreesFontSize = () => {
        const newSize = Number(fontSize) - 1

        if (newSize > 1)
            setFontSize(newSize.toString())
    }

    const onChangeEdgeStart = (value) => {
        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }

                    switch (value?.markerId) {
                        case 'arrow':
                            newEdge.markerStart = {
                                type: MarkerType.Arrow,
                                color: arrowColor,
                            };
                            break;
                        case 'arrowclosed':
                            newEdge.markerStart = {
                                type: MarkerType.ArrowClosed,
                                color: arrowColor,
                            };
                            break;
                        default:
                            newEdge.markerStart = value?.markerId;
                            break;
                    }
                    return newEdge;
                } else return e
            })
        );
    }

    const onChangeEdgeEnd = (value) => {
        setEdges((edges) =>
            edges.map((e) => {
                const isSelected = selectedEdges?.some(selectedEdge => selectedEdge?.id === e?.id);

                if (isSelected) {
                    const newEdge = { ...e }

                    switch (value?.markerId) {
                        case 'arrow':
                            newEdge.markerEnd = {
                                type: MarkerType.Arrow,
                                color: arrowColor,
                            };
                            break;
                        case 'arrowclosed':
                            newEdge.markerEnd = {
                                type: MarkerType.ArrowClosed,
                                color: arrowColor,
                            };
                            break;
                        default:
                            newEdge.markerEnd = value?.markerId;
                            break;
                    }
                    return newEdge;
                } else return e
            })
        );
    }

    const hideShowLayer = (id) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.hidden = !node?.hidden ?? true
                    return newNode
                } else return node
            })
        )
    }

    const lockNode = (id) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === id) {
                    const newNode = { ...node }
                    newNode.draggable = node?.draggable === false ? true : false
                    return newNode
                } else return node
            })
        )
    }

    const onGroupNodes = () => {
        const unGroupedNodes = removeSelectedGroups()
        setNodes((nodes) => {
            const selectedNodesWithoutGroups = unGroupedNodes.filter(node => node.type !== 'group' && node.selected)
            const positionMin = { ...selectedNodesWithoutGroups[0].position }
            const positionMax = { x: positionMin.x + selectedNodesWithoutGroups[0].width, y: positionMin.y + selectedNodesWithoutGroups[0].height }
            const groupId = getId('Group')

            selectedNodesWithoutGroups.forEach(node => {
                if (node.position.x <= positionMin.x) {
                    positionMin.x = node.position.x
                }
                if (node.position.x + node.width >= positionMax.x) {
                    positionMax.x = node.position.x + node.width
                }

                if (node.position.y <= positionMin.y) {
                    positionMin.y = node.position.y
                }
                if (node.position.y + node.height >= positionMax.y) {
                    positionMax.y = node.position.y + node.height
                }
            })

            const newNodes = unGroupedNodes.map((node) => {
                const isSelected = selectedNodesWithoutGroups.some(selectedNode => selectedNode.id === node.id)
                if (isSelected) {
                    const newNode = { ...node }

                    newNode.selected = false
                    newNode.parentNode = groupId
                    newNode.expandParent = true
                    newNode.position = { x: node?.position.x - positionMin?.x, y: node?.position.y - positionMin?.y }

                    return newNode
                } else return node
            })

            const newGroup = {
                id: groupId,
                type: 'group',
                position: positionMin,
                data: {},
                style: {
                    width: positionMax.x - positionMin.x,
                    height: positionMax.y - positionMin.y,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent'
                }
            };

            newNodes.push(newGroup);
            return newNodes;
        })
    }

    const unGroupNodes = () => {
        setNodes(() => removeSelectedGroups())
    }

    const removeSelectedGroups = () => {
        const selectedGroupNodes = selectedNodes.filter(node => node.type === 'group')

        const newNodesWithoutGroups = nodes.filter(node => {
            const isSelected = selectedNodes.some(selectedNode => selectedNode.id === node.id)
            if (isSelected && node.type === 'group') {
                return false
            } else {
                return true
            }
        })

        const newNodes = newNodesWithoutGroups.map((node) => {
            const selectedGroupNode = selectedGroupNodes.find(groupNode => groupNode.id === node.parentNode);
            if (selectedGroupNode) {
                const newNode = { ...node }

                delete newNode.parentNode;
                delete newNode.expandParent;
                newNode.position = { x: node?.position.x + selectedGroupNode?.position?.x, y: node?.position.y + selectedGroupNode?.position?.y }

                return newNode
            } else return node
        })

        return newNodes;
    }

    const sortedLayers = () => {
        const groupNodes = nodes.filter(node => node.type === 'group')
        const singleNodes = nodes.filter(node => node.type !== 'group' && !node?.parentNode)

        nodes.map(node => {
            if (node?.parentNode) {
                const parentIndex = groupNodes?.findIndex(groupNode => groupNode.id === node?.parentNode)
                groupNodes.splice(parentIndex + 1, 0, node)
            }

        })

        return [...singleNodes, ...groupNodes]
    }

    const appearanceContent = () => {
        return (
            <div className={style.propertyPanelContainer}>
                <Dropdown
                    values={fontTypes}
                    onChange={onChangeTextType}
                    dataName='label'
                    selected={JSON.stringify(textType)}
                />
                <div className={style.appearanceRow}>
                    <div className={style.fontSizeContainer}>
                        <div
                            className={style.decreaseFontSize}
                            onClick={decreesFontSize}>-</div>
                        <input
                            className={style.fontSizeInput}
                            value={fontSize}
                            onChange={onFontSizeChange}
                            type="text"
                        />
                        <div className={style.sizeInputEndText}>pt</div>
                        <div
                            className={style.increaseFontSize}
                            onClick={increaseFontSize}
                        >+</div>
                    </div>
                    <div className={style.fontBoldContainer} style={{ backgroundColor: textBold ? '#D3D3D3' : '' }} onClick={onChangeTextBold}>B</div>

                    <ColorPicker
                        value={textColor}
                        onChangeComplete={onChangeTextColor}
                    >
                        <div className={style.colorPickerContainer} >
                            <div style={{ color: getRgbaColor(textColor) }}>A</div>
                            <div className={style.fontColorFooter} style={{ backgroundColor: getRgbaColor(textColor) }} />
                        </div>
                    </ColorPicker>
                </div>


                {(selectedNodes?.length === 1 && selectedNodes?.[0].type === 'MatrixChart') ?
                    <>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Background
                            </div>
                            <div className={style.flex2} >
                                <ColorPicker
                                    color={backgroundColor}
                                    onChange={onChangeBackgroundColor}
                                />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Title Background
                            </div>
                            <div className={style.flex2} >
                                <ColorPicker
                                    value={borderColor}
                                    onChangeComplete={onChangeBorderColor}
                                />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Section Background
                            </div>
                            <div className={style.flex2}>
                                <ColorPicker
                                    value={borderColor}
                                    onChangeComplete={onChangeSectionColor}
                                />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Number of sections
                            </div>

                            <div className={style.flex8}>
                                <div className={style.fontSizeContainer}>
                                    <div
                                        className='hover-hand m-r-10 m-t-10 bold'
                                        onClick={onSectionsCountDecrease}>-</div>
                                    <input value={sectionsCount} onChange={onSectionsCountChange} type="text" />
                                    <div
                                        className='hover-hand m-l-10 m-t-10 bold'
                                        onClick={onSectionsCountIncrese}
                                    >+</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Number of columns
                            </div>

                            <div className={style.flex8}>
                                <div className={style.fontSizeContainer}>
                                    <div
                                        className='hover-hand m-r-10 m-t-10 bold'
                                        onClick={onColumnsCountDecrease}>-</div>
                                    <input value={columnsCount} onChange={onColumnsCountChange} type="text" />
                                    <div
                                        className='hover-hand m-l-10 m-t-10 bold'
                                        onClick={onColumnsCountIncrease}
                                    >+</div>
                                </div>
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.flex5}>
                                Hide Options
                            </div>

                            <div className={style.flex8}>
                                <input type="checkbox" className="check-box m-l-10"
                                    checked={hideTools}
                                    onChange={handleCheckboxCLick}
                                />
                            </div>
                        </div>

                    </> :
                    <>
                        <div className={style.appearanceRow}>
                            <div className={style.appearanceRowItem}>
                                Fill
                            </div>
                            <ColorPicker
                                value={backgroundColor}
                                onChangeComplete={onChangeBackgroundColor}
                            />
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.appearanceRowItem}>
                                Stroke
                            </div>
                            <div className={style.appearanceRowItem}>
                                <ColorPicker
                                    value={borderColor}
                                    onChangeComplete={onChangeBorderColor}

                                />
                            </div>
                            <AlignCenterOutlined className={style.toolBarIcon} />
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.appearanceRowItem}>
                                Endpoint
                            </div>
                            <div className={style.appearanceRowItem}>
                                <CustomDropdown
                                    values={arrowStartTypes}
                                    onChange={onChangeEdgeStart}
                                    dataName='label'
                                    iconName='icon'
                                    selected={getSelectedEdgeStart}
                                    hideHintText
                                />
                            </div>
                            <div className={style.appearanceRowItem}>
                                <CustomDropdown
                                    values={arrowEndTypes}
                                    onChange={onChangeEdgeEnd}
                                    dataName='label'
                                    iconName='icon'
                                    selected={getSelectedEdgeEnd}
                                    hideHintText
                                />
                            </div>
                        </div>
                        <div className={style.appearanceRow}>
                            <div className={style.appearanceRowItem}>
                                Activity
                            </div>
                            <div className={style.flex8}>
                                <div className={style.activityContainer}>
                                    <CustomDropdown
                                        values={markerTypes}
                                        onChange={onChangeMarker}
                                        dataName='label'
                                        iconName='icon'
                                        selected={markerType}
                                        hideHintText
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        )
    }

    const layersContent = () => {
        return (
            <div>
                <div className={style.flexAlignCenter}>
                    {selectedNodes?.length > 1 &&
                        <div className={style.groupLayersBtn} onClick={onGroupNodes}>
                            Group
                        </div>
                    }
                    {selectedNodes?.some(node => node.type === 'group') &&
                        <div className={style.groupLayersBtn} onClick={unGroupNodes}>
                            Ungroup
                        </div>
                    }
                </div>

                <div className={style.layerContainer}>
                    {
                        sortedLayers().map(node => {
                            return (
                                <div key={node?.id} className={`${style.layerItemContainer} ${node?.selected ? style.layerItemSelected : ''}`}>
                                    {node?.parentNode &&
                                        <div className={style.layerIconParent} />
                                    }
                                    <div className={style.layerIcon} onClick={() => hideShowLayer(node?.id)} >
                                        {node?.hidden ?
                                            <EyeInvisibleOutlined /> : <EyeOutlined />
                                        }
                                    </div>
                                    <div className={style.layerIcon} onClick={() => lockNode(node?.id)} >
                                        {node?.draggable === false ?
                                            <LockOutlined /> : <UnlockOutlined />
                                        }
                                    </div>
                                    {node?.type === 'group' &&
                                        <div className={style.layerIcon}>
                                            <DownOutlined />
                                        </div>
                                    }

                                    {node?.id}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    const linkContent = () => {
        return (
            <div className={style.linkContainer}>
                <div className={style.linkTabsContainer}>
                    {Object.values(LinkTypes).map(type => (
                        <div
                            className={selectedLinkType === type ? style.linkTabSelected : style.linkTabNotSelected}
                            key={type}
                            onClick={() => onChangeTab(type)}
                        >
                            {type}
                        </div>
                    ))}
                </div>
                <div className={style.linkContentContainer}>
                    {linkTypeContent()}
                </div>
            </div>
        )
    }

    const onFileChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            let fileDataUrl = await readFile(file)

            setUrlInput(file?.name)
            setUploadedFile(fileDataUrl)
        }
    }

    const linkTypeContent = () => {
        switch (selectedLinkType) {
            case LinkTypes.URL:
                return (
                    <>
                        <div className={style.linkInputContainer}>
                            <input
                                type="text"
                                placeholder='Url (Eg: www.google.com)'
                                value={urlInput}
                                onChange={handleLinkInput}
                            />
                        </div>
                        <button
                            className={style.linkAddBtn}
                            onClick={addNewLink}
                            disabled={selectedNodes?.length !== 1 || !urlInput}
                        >Add
                        </button>
                        {selectedNodes?.[0]?.data?.links?.map((link, index) => {
                            if (link.type !== selectedLinkType)
                                return
                            return (
                                <div key={index} className={style.linkItemContainer}>
                                    <a href={link?.value} target="_blank" rel="noopener noreferrer" className={style.linkItem}>{link?.value}</a>
                                    <CloseOutlined onClick={() => onRemoveLink(index)} />
                                </div>
                            )
                        })}
                    </>
                );
            case LinkTypes.DOCUMENT:
                return (
                    <>
                        <input
                            className={style.linkInputContainer}
                            type="file" id="myFile" name="filename"
                            onChange={onFileChange}
                        />
                        <button
                            className={style.linkAddBtn}
                            onClick={addNewLink}
                            disabled={selectedNodes?.length !== 1 || !uploadedFile}
                        >Add
                        </button>
                        {selectedNodes?.[0]?.data?.links?.map((link, index) => {
                            if (link.type !== selectedLinkType)
                                return

                            return (
                                <div key={index} className={style.linkItemContainer}>
                                    <a href={link?.file} download={link?.fileName} className={style.linkItem}>{link?.fileName}</a>
                                    <CloseOutlined onClick={() => onRemoveLink(index)} />
                                </div>
                            )
                        })}
                    </>
                );
            default:
                return null

        }
    }

    return (
        <aside className={sidebarVisible ? style.aside : ''}>
            <div className={style.preventSelect}>
                <div className={style.sidebarColapsBtnContainer}>
                    {sidebarVisible &&
                        <>
                            <SettingOutlined className={style.settingsIcon} />
                            <h3>Property</h3>
                        </>
                    }
                    <i className={style.sidebarColapsBtn + (sidebarVisible ? ' icon-circle-arrow-right ' : ' icon-circle-arrow-left ') + style.propertyPanelCollapseBtn}
                        onClick={onArrowClicked} />
                </div>
                <div className={style.sidebarMainContainer}>
                    {sidebarVisible &&
                        <>
                            <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.APPEARANCE) }} >
                                    <div>{propertyCategories.APPEARANCE}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.APPEARANCE) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.APPEARANCE) &&
                                    appearanceContent()
                                }
                            </div>

                            <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.LAYERS) }} >
                                    <div>{propertyCategories.LAYERS}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.LAYERS) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.LAYERS) &&
                                    <div className={style.propertyPanelContainer}>
                                        {layersContent()}
                                    </div>
                                }
                            </div>

                            <div className='m-b-10' >
                                <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(propertyCategories.LINK) }} >
                                    <div>{propertyCategories.LINK}</div>
                                    <i className={(!closedCategories.includes(propertyCategories.LINK) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                </div>

                                {!closedCategories.includes(propertyCategories.LINK) &&
                                    <div className={style.propertyPanelContainer}>
                                        {linkContent()}
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>

        </aside>
    );
};

export default memo(PropertyPanel);