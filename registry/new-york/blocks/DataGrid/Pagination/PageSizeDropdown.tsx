"use client"

import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/registry/new-york/ui/dropdown-menu';
import { Button } from '@/registry/new-york/ui/button';
import { ChevronDown } from 'lucide-react';
import {useDataGridContext} from '@strucura/datagrids-headless-react';

const PageSizeDropdown = () => {
    const { pagination, setPagination } = useDataGridContext();

    const handlePageSizeChange = (pageSize: number) => {
        setPagination((prev) => ({ ...prev, perPage: pageSize, currentPage: 1 }));
    };

    return (
        <div className="flex items-center space-x-2">
            <span className={'text-sm'}>Page Size: </span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        { pagination.perPage} <ChevronDown className="ml-0 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {[10, 25, 50, 100].map((size) => (
                        <DropdownMenuItem key={size} onClick={() => handlePageSizeChange(size)}>
                            {size}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default PageSizeDropdown;
