"use client"

import React, { JSX, useEffect, useRef } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/registry/new-york/ui/table';
import {DataGridSchema, DataGridProvider, useDataGridContext, ColumnSchema} from '@strucura/datagrids-headless-react';
import Toolbar from "@/registry/new-york/blocks/DataGrid/Toolbar/Toolbar";
import ActionHeader from '@/registry/new-york/blocks/DataGrid/Headers/ActionHeader';
import ColumnSchemaHeader from "@/registry/new-york/blocks/DataGrid/Headers/ColumnSchemaHeader";
import RowSelectionHeader from "@/registry/new-york/blocks/DataGrid/Headers/RowSelectionHeader";
import ColumnSchemaCell from "@/registry/new-york/blocks/DataGrid/Cells/ColumnSchemaCell";
import RowSelectionCell from "@/registry/new-york/blocks/DataGrid/Cells/RowSelectionCell";
import PreviousButton from "@/registry/new-york/blocks/DataGrid/Pagination/PreviousButton";
import NextButton from "@/registry/new-york/blocks/DataGrid/Pagination/NextButton";
import PageSizeDropdown from "@/registry/new-york/blocks/DataGrid/Pagination/PageSizeDropdown";
import ActionCell from "@/registry/new-york/blocks/DataGrid/Cells/ActionCell";

interface DataGridProps {
    schema: DataGridSchema;
    toolbarLeft?: JSX.Element;
    toolbarRight?: JSX.Element;
    localStorageKeyPrefix?: string; // Optional key for local storage to save state
}

function DataGridContent<T>({ schema, toolbarLeft, toolbarRight }: DataGridProps) {
    const { data, columns } = useDataGridContext<T>();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [data]);

    return (
        <div className="w-full">
            <Toolbar
                toolbarLeft={
                    <>
                        {toolbarLeft}
                    </>
                }
                toolbarRight={
                    <>
                        {toolbarRight}
                    </>
                }
            />
            <div className="rounded-md border overflow-hidden h-[400px]">
                <div className="h-full relative w-full overflow-auto" ref={scrollAreaRef}>
                    <Table>
                        <TableHeader className="sticky top-0 bg-muted z-10">
                            <TableRow>
                                <RowSelectionHeader />
                                {columns.map((column: ColumnSchema) => (
                                    <ColumnSchemaHeader column={column} key={column.alias} />
                                ))}
                                <ActionHeader />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.length ? (
                                data.map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <RowSelectionCell row={row} />

                                        {columns.map((column) => (
                                            <ColumnSchemaCell row={row} column={column} key={column.alias} />
                                        ))}

                                        <ActionCell row={row} />
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={schema.columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <PreviousButton />
                <PageSizeDropdown />
                <NextButton />
            </div>
        </div>
    );
}

export default function DataGrid<T>(props: DataGridProps) {
    return (
        <DataGridProvider schema={props.schema}>
            <DataGridContent<T> {...props} />
        </DataGridProvider>
    );
}
