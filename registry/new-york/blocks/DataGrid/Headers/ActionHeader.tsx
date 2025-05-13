"use client"
import React from 'react';
import { TableHead } from '@/registry/new-york/ui/table';
import {useDataGridContext} from '@strucura/datagrids-headless-react';


const ActionHeader = () => {
    const { hasBulkActions } = useDataGridContext();

    if (!hasBulkActions) {
        return null;
    }

    return (
        <TableHead>Actions</TableHead>
    )
}

export default ActionHeader;
