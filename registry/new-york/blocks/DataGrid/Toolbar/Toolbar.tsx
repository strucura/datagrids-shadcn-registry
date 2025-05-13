"use client"
import React, { JSX } from 'react';

interface ToolbarProps {
    toolbarLeft?: JSX.Element;
    toolbarRight?: JSX.Element;
}

const Toolbar = ({toolbarLeft, toolbarRight}: ToolbarProps): JSX.Element => {
    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
                {toolbarLeft}
            </div>

            <div className="flex items-center space-x-2">
                {toolbarRight}
            </div>
        </div>
    )
}

export default Toolbar;
