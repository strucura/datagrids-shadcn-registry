"use client"
import React from 'react';
import { TableHead } from '@/registry/new-york/ui/table';
import { Checkbox } from '@/registry/new-york/ui/checkbox';
import { useDataGridContext } from '@strucura/datagrids-headless-react';


const RowSelectionHeader = () => {
    const { data, selectedRows, setSelectedRows, hasBulkActions } = useDataGridContext();

    const allRowsSelected = data.length > 0 && selectedRows.length === data.length;

    const handleSelectAllChange = () => {
        setSelectedRows(allRowsSelected ? [] : data);
    };

    if (!hasBulkActions) {
        return null;
    }

    return (
        <TableHead>
            <Checkbox checked={allRowsSelected} onClick={handleSelectAllChange} />
        </TableHead>
    )
}

export default RowSelectionHeader;
