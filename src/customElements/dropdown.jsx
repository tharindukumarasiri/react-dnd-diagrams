import React from "react";

const Dropdown = ({ values, selected = '', onChange, placeholder, disabled = false, dataName = '', iconName = '', valueName, error = '' }) => {

    const hintTextStyle = selected ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    const containerStyle = disabled ? 'input-container m-b-10 disable-div' : 'input-container m-b-10'
    return (
        <div className={containerStyle}>
            <div className={hintTextStyle}>{placeholder}</div>
            <select className="dropdown-list" onChange={onChange} value={selected || '0'} disabled={disabled} style={error ? { borderColor: 'red' } : {}}>
                {placeholder &&
                    <option value="0" disabled defaultValue="selected" hidden={true} className="disable-option" >{placeholder}</option>
                }
                {
                    values?.map((item, index) => {
                        if (valueName) {
                            return <option value={item[valueName]} key={index}>{dataName ? item[dataName] : item}</option>
                        }
                        else
                            return (
                                <option value={dataName ? JSON.stringify(item) : item} key={index} className={"fa fa-email"}>
                                    {iconName ? <i className={iconName} /> : null}
                                    {dataName ? item[dataName] : item}
                                </option>
                            )
                    })
                }
            </select>
            {error &&
                <div className="error-text">
                    {error}
                </div>
            }
        </div>
    )
}

export default Dropdown;