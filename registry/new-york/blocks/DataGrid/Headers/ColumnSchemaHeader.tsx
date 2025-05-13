"use client"

import React from 'react';
import { TableHead } from '@/registry/new-york/ui/table';
import { Button } from '@/registry/new-york/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import {useDataGridContext, SortOperator, ColumnSchema } from '@strucura/datagrids-headless-react';

interface BasicHeaderProps {
    column: ColumnSchema;
}

const ColumnSchemaHeader = ({ column } : BasicHeaderProps) => {
    const { sorts, setSorts, } = useDataGridContext();

    if (column.is_hidden) {
        return;
    }

    const handleSort = (columnAlias: string) => {
        const sort = sorts.find((sort) => sort.alias === columnAlias);

        if (sort?.sort_operator === SortOperator.ASC) {
            setSorts([
                { alias: columnAlias, sort_operator: SortOperator.DESC },
            ])
        } else if (sort?.sort_operator === SortOperator.DESC) {
            setSorts([])
        } else {
            setSorts([
                { alias: columnAlias, sort_operator: SortOperator.ASC },
            ])
        }
    };

    const getSortIcon = (columnAlias: string) => {
        const sort = sorts.find((sort) => sort.alias === columnAlias);
        if (sort?.sort_operator === SortOperator.ASC) {
            return <ArrowUp />;
        } else if (sort?.sort_operator === SortOperator.DESC) {
            return <ArrowDown />;
        } else {
            return <ArrowUpDown />;
        }
    };

    return (
        <TableHead key={column.alias} className="text-left">
            {column.is_sortable ? (
                <Button variant="ghost" className="p-0" onClick={() => handleSort(column.alias)}>
                    {column.alias} {getSortIcon(column.alias)}
                </Button>
            ) : (
                column.alias
            )}

        </TableHead>
    )
}

export default ColumnSchemaHeader;
