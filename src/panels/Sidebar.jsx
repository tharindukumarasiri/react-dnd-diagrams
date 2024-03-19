import React, { useState, memo } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

import style from '../DndStyles.module.scss'
import Input from '../customElements/input.jsx'
import { readFile, uploadNodeId } from '../utils';

const { Dragger } = Upload;

const savedShapesKey = 'SAVED_SHAPES';

const SideBar = ({ uploadedImages = [], uploadImage, loading, Shapes, Categories }) => { //TODO uploadedImages, loading >>>>>>>>>>>>>>>>>>>>>>
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [closedCategories, setClosedCategories] = useState([]);
    const [searchText, setSearchText] = useState('');

    const props = {
        name: 'file',
        multiple: false,
        accept: "image/png, mage/jpg, image/jpeg",
        // disabled: loading, TODO >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        showUploadList: false,
        async customRequest(info) {
            const file = info.file;
            const imageDataUrl = await readFile(file);

            const payload = {
                'ImageString': imageDataUrl,
            }
            uploadImage(payload); //TODO>>>>>>>>>>>>>>>>>>>>>
        },
    };

    const onDragStart = (event, nodeType, image = null) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        if (image)
            event.dataTransfer.setData('application/reactflow/uploaded', image);

        event.dataTransfer.effectAllowed = 'move';
    };

    const onArrowClicked = () => setSidebarVisible(pre => !pre);

    const CustomShape = ({ shape }) => {
        return (
            <svg viewBox={shape?.viewBox} fill="#ffffff" stroke="#434343" >
                {shape?.image}
            </svg>
        )
    }

    const UploadedShape = ({ image }) => (
        <img src={image} className="" alt="img" />
    )

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

    const onChangeSearchText = (e) => {
        e.preventDefault();
        setSearchText(e.target.value)
    }

    return (
        <aside className={sidebarVisible ? style.aside : ''}>
            <div className={style.sidebarColapsBtnContainer}>
                {sidebarVisible &&
                    <h3>Library</h3>
                }
                <i className={style.sidebarColapsBtn + (sidebarVisible ? ' icon-circle-arrow-left' : ' icon-circle-arrow-right')}
                    onClick={onArrowClicked} />
            </div>
            {sidebarVisible &&
                <div className='m-t-10 m-r-15'>
                    <Input placeholder="Search" value={searchText} onChange={onChangeSearchText} endImage='icon-search-1' />
                </div>
            }
            <div className={style.sidebarMainContainer}>
                {sidebarVisible &&
                    <>
                        {searchText.length > 0 ?
                            <div className={style.sidebarCategoryContainer}>
                                {
                                    Object.entries(Shapes)?.map(shape => {
                                        if (shape[0]?.toLowerCase().includes(searchText.toLocaleLowerCase()))
                                            return (
                                                <div className={style.sidebarItemContainer} onDragStart={(event) => onDragStart(event, shape[0])} draggable key={shape[0]}>
                                                    <CustomShape shape={shape[1]} />
                                                </div>
                                            )
                                    })
                                }
                            </div> :
                            <>
                                {Object.entries(Categories)?.map(category => {
                                    return (
                                        <div key={category[0]} className='m-b-10'>
                                            <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(category[0]) }} >
                                                <div className=''>{category[1]}</div>
                                                <i className={(!closedCategories.includes(category[0]) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                            </div>

                                            {!closedCategories.includes(category[0]) &&
                                                <div className={style.sidebarCategoryContainer}>
                                                    {
                                                        Object.entries(Shapes)?.map(shape => {
                                                            if (shape[1]?.category?.includes(category[1]))
                                                                return (
                                                                    <div className={style.sidebarItemContainer} onDragStart={(event) => onDragStart(event, shape[0])} draggable key={shape[0]}>
                                                                        <CustomShape shape={shape[1]} />
                                                                    </div>
                                                                )
                                                        })
                                                    }
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                                <div className='m-b-10'>
                                    <div className={style.sidebarCategoryheader} onClick={() => { onCategoryClick(savedShapesKey) }} >
                                        <div>My saved shapes</div>
                                        <i className={(!closedCategories.includes(savedShapesKey) ? ' icon-arrow-down' : ' icon-arrow-up')} />
                                    </div>

                                    {!closedCategories.includes(savedShapesKey) &&
                                        <div className={style.sidebarCategoryImageUploadContainer}>
                                            <Dragger {...props}>
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                {loading ?
                                                    <p className="ant-upload-text">Uploading...</p>
                                                    : <p className="ant-upload-text">Click or drag shapes to this area to upload</p>
                                                }
                                            </Dragger>
                                            <div className={style.sidebarCategoryImageUploadedContainer}>
                                                {uploadedImages?.map((imageData, index) => (
                                                    <div className={style.sidebarItemContainer}
                                                        onDragStart={(event) => onDragStart(event, uploadNodeId, imageData.ImageString)}
                                                        draggable key={index}>
                                                        <UploadedShape image={imageData.ImageString} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>

                        }

                    </>
                }
            </div>
        </aside>
    );
};

export default memo(SideBar);