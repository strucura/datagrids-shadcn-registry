"use client"
import React from 'react';
import { Button } from '@/registry/new-york/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useDataGridContext } from '@strucura/datagrids-headless-react';

const PreviousButton = () => {
    const { hasPreviousPage, goToPreviousPage } = useDataGridContext();

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => goToPreviousPage}
            disabled={hasPreviousPage}
        >
            <ArrowLeft /> Previous
        </Button>
    )
}

export default PreviousButton;
