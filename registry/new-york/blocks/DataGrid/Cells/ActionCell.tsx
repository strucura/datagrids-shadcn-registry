"use client"
import React from 'react';
import { Button } from '@/registry/new-york/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/registry/new-york/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell } from '@/registry/new-york/ui/table';
import { useDataGridContext } from '@strucura/datagrids-headless-react';

interface ActionCellProps<T> {
    row: T;
}

const ActionCell = <T,>({ row }: ActionCellProps<T>) => {
    const { runInlineAction, inlineActions, hasInlineActions } = useDataGridContext<T>();

    if (!hasInlineActions) {
        return null;
    }

    const handleActionClick = (action: string) => {
        runInlineAction({
            action: action,
            selectedRow: row,
            onSuccess: (response) => {
                console.log('Action successful:', response);
            },
            onError: (error) => {
                console.error('Action failed:', error);
            },
        });
    }

    return (
        <TableCell className={'py-1'}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {inlineActions.map((action) => (
                        <DropdownMenuItem
                            key={action.name}
                            onClick={() => handleActionClick(action.name)}
                        >
                            {action.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    );
};

export default ActionCell;
