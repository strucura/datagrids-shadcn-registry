"use client"

import React, { JSX, useState } from 'react';
import { Button } from '@/registry/new-york/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/registry/new-york/ui/dropdown-menu';
import {ActionSchema, useDataGridContext} from '@strucura/datagrids-headless-react';
import { Rocket } from 'lucide-react';

/**
 * BulkActionManager component to manage and execute external actions on selected rows in a data grid.
 *
 * @template T - The type of the data grid row.
 * @returns {JSX.Element | null} The BulkActionManager component.
 */
export default function BulkActionManager<T>(): JSX.Element | null {
    // State to manage the visibility of the dropdown menu
    const [isOpen, setIsOpen] = useState(false);
    // Context values from the data grid
    const { selectedRows, runBulkAction, hasBulkActions, bulkActions } = useDataGridContext<T>();

    /**
     * Handles the click event for an action.
     *
     * @param {ActionSchema} action - The action schema.
     */
    const handleActionClick = (action: ActionSchema) => {
        runBulkAction({
            action: action.name
        })

        setIsOpen(false);
    };

    if (!hasBulkActions) {
        return null;
    }

    // Return null if no rows are selected
    if (selectedRows.length === 0) {
        return null;
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    Actions <Rocket />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {bulkActions.map((action) => (
                    <DropdownMenuItem key={action.name} onClick={() => handleActionClick(action)}>
                        {action.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
