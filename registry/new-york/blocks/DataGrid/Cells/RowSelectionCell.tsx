"use client"
import React from 'react';
import { Checkbox } from '@/registry/new-york/ui/checkbox';
import { useDataGridContext } from '@strucura/datagrids-headless-react';
import { TableCell } from '@/registry/new-york/ui/table';

interface RowSelectionCellProps<T> {
    row: T;
}

const RowSelectionCell = <T,>({ row }: RowSelectionCellProps<T>) => {
    const {toggleRowSelection, hasBulkActions, selectedRows  } = useDataGridContext<T>();

    const handleRowSelectChange = (row: T) => {
        toggleRowSelection(row)
    };

    console.log('hasBulkActions', hasBulkActions);

    if (!hasBulkActions) {
        return null;
    }

    console.log('hit');

    return (
        <TableCell className={'py-1'}>
            <Checkbox checked={selectedRows.includes(row)} onClick={() => handleRowSelectChange(row)} />
        </TableCell>
    );
};

export default RowSelectionCell;
