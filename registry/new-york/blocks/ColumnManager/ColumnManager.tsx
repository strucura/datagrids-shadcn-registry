"use client"

import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/registry/new-york/ui/dropdown-menu';
import { Button } from '@/registry/new-york/ui/button';
import {SortableItem} from '@/registry/new-york/ui/sortable-item';
import {useDataGridContext} from '@strucura/datagrids-headless-react';
import { JSX, MouseEvent } from 'react';
import { Columns3Icon } from 'lucide-react';

export { SortableItem };

const ColumnManager = <T,>(): JSX.Element => {
    const { columns, setColumns, toggleColumn } = useDataGridContext<T>();

    const handleToggleVisibility = (event: MouseEvent<HTMLDivElement>, alias: string) => {
        event.preventDefault();

        toggleColumn(alias)
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setColumns((items) => {
                const oldIndex = items.findIndex((col) => col.alias === active.id);
                const newIndex = items.findIndex((col) => col.alias === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    Columns <Columns3Icon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px]" align={'end'}>
                <DndContext onDragEnd={handleDragEnd}>
                    <SortableContext items={columns.map((col) => col.alias)}>
                        {columns.map((column) => (
                            <SortableItem key={column.alias} id={column.alias}>
                                <DropdownMenuCheckboxItem
                                    className="capitalize"
                                    checked={!column.is_hidden}
                                    onClick={(event: MouseEvent<HTMLDivElement>) => handleToggleVisibility(event, column.alias)}
                                >
                                    {column.alias}
                                </DropdownMenuCheckboxItem>
                            </SortableItem>
                        ))}
                    </SortableContext>
                </DndContext>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ColumnManager;
