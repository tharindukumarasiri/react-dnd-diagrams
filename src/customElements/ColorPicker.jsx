import React from 'react';
import { ColorPicker } from 'antd';

const Picker = ({ children = null, value, onChangeComplete }) => {

    const onChange = (color) => {
        onChangeComplete({
            rgb: {
                'r': color?.metaColor?.r,
                'g': color?.metaColor?.g,
                'b': color?.metaColor?.b,
                'a': color?.metaColor?.a
            }
        });
    }


    return (
        <ColorPicker
            value={value}
            onChangeComplete={onChange}
        >
            {children}
        </ColorPicker>
    )
}

export default Picker;