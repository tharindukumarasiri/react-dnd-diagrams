import React from "react";

const Input = ({ value, placeholder = '', onChange, lines = 1, endImage = '', disabled = false, error = '', maxLength = 100 }) => {

    const hintTextStyle = value ? 'input-hint-text-visible' : 'input-hint-text-hidden';
    return (
        <div className="input-container" >
            {/* <div className={hintTextStyle}>{placeholder}</div> */}
            {lines > 1 ?
                <textarea rows={lines} placeholder={placeholder} value={value} onChange={onChange} maxLength={maxLength} />
                : <input type="text" placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} maxLength={maxLength}
                    className={disabled ? 'disable-div' : ''} style={error ? { borderColor: 'red' } : {}} />
            }
            {error &&
                <div className="error-text">
                    {error}
                </div>
            }
            {endImage &&
                <i className={endImage + ' datapicker-icon-x'} />
            }
        </div>
    )
}

export default Input;