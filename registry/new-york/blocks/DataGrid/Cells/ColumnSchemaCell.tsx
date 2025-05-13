"use client"
import React from 'react';
import { TableCell } from '@/registry/new-york/ui/table';
import {ColumnSchema} from '@strucura/datagrids-headless-react';

interface BasicCellProps<T> {
    row: T;
    column: ColumnSchema
}

const ColumnSchemaCell = <T,>({ row, column }: BasicCellProps<T>) => {
    if (column.is_hidden) {
        return;
    }

    return (
        <TableCell key={column.alias} className={'py-1 px-4'}>
            {String(row[column.alias as keyof T] ?? '')}
        </TableCell>
    );
};

export default ColumnSchemaCell;
