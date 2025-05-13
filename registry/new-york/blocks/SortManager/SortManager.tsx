"use client"

import React, { JSX, useState, useMemo, useEffect } from 'react';
import { Button } from '@/registry/new-york/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york/ui/select';
import { Plus, SortDesc, Trash, Check } from 'lucide-react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from '@/registry/new-york/ui/sortable-item';
import {SortSchema, SortOperator, useDataGridContext} from '@strucura/datagrids-headless-react';

export default function SortManager(): JSX.Element {
    const [localSorts, setLocalSorts] = useState<SortSchema[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const { columns, sorts, setSorts } = useDataGridContext<unknown>();

    useEffect(() => {
        if (isOpen) {
            setLocalSorts(sorts);
        }
    }, [isOpen, sorts]);

    const eligibleColumns = useMemo(() => {
        const sortedAliases = localSorts.map(sort => sort.alias);
        return columns
            .map(column => column.alias)
            .filter(alias => !sortedAliases.includes(alias));
    }, [columns, localSorts]);

    const handleAddSort = () => {
        const newSort = { alias: eligibleColumns[0], sort_operator: SortOperator.ASC };
        setLocalSorts([...localSorts, newSort]);
    };

    const handleClearSorts = () => {
        setLocalSorts([]);
        setSorts([]);
    };

    const handleApplySorts = () => {
        setSorts(localSorts.filter(sort => sort.alias !== ''));
        setIsOpen(false);
    };

    const handleSortChange = (index: number, alias: string, sort_operator: SortOperator) => {
        const newSorts = [...localSorts];
        newSorts[index] = { alias, sort_operator };
        setLocalSorts(newSorts);
    };

    const handleRemoveSort = (index: number) => {
        setLocalSorts(localSorts.filter((_, i) => i !== index));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            setLocalSorts((items) => {
                const oldIndex = items.findIndex((sort) => sort.alias === active.id);
                const newIndex = items.findIndex((sort) => sort.alias === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto relative">
                    Sort{sorts.length > 0 && (
                    <span className="text-[11px] bg-gray-200 text-gray-600 rounded px-1">
                            {sorts.length}
                        </span>
                )}
                    <SortDesc />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="flex max-h-[350px] w-[500px] min-w-[500px] origin-[--radix-popover-content-transform-origin] flex-col gap-3.5 overflow-y-auto p-4"
                align="start"
            >
                <div className="flex justify-end items-center border-b pb-4 mb-2 space-x-2">
                    <Button onClick={handleClearSorts} variant="ghost">
                        Clear
                    </Button>
                    <Button onClick={handleAddSort} variant="outline" disabled={eligibleColumns.length === 0}>
                        Add <Plus />
                    </Button>
                    <Button onClick={handleApplySorts} variant="default">
                        Apply <Check />
                    </Button>
                </div>

                {localSorts.length === 0 ? (
                    <div className="text-sm text-muted-foreground">
                        No sorts available. Please add and apply sorts to start sorting.
                    </div>
                ) : (
                    <DndContext onDragEnd={handleDragEnd}>
                        <SortableContext items={localSorts.map((sort) => sort.alias)}>
                            {localSorts.map((sort, index) => (
                                <SortableItem key={sort.alias} id={sort.alias}>
                                    <div className="flex items-center gap-2">
                                        <Select value={sort.alias} onValueChange={(value: string) => handleSortChange(index, value, sort.sort_operator)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select column" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {columns.map((column) => (
                                                    <SelectItem key={column.alias} value={column.alias} disabled={!column.is_sortable}>
                                                        {column.alias}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <Select value={sort.sort_operator} onValueChange={(value: SortOperator) => handleSortChange(index, sort.alias, value as SortOperator)}>
                                            <SelectTrigger className="w-24">
                                                <SelectValue placeholder="Select direction" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={SortOperator.ASC}>Asc</SelectItem>
                                                <SelectItem value={SortOperator.DESC}>Desc</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Button variant="ghost" size="sm" onClick={() => handleRemoveSort(index)}>
                                            <Trash className="text-red-500" />
                                        </Button>
                                    </div>
                                </SortableItem>
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </PopoverContent>
        </Popover>
    );
}
