"use client"

import React from 'react';
import { Button } from '@/registry/new-york/ui/button';
import {useDataGridContext, } from '@strucura/datagrids-headless-react';
import { ArrowRight } from 'lucide-react';

const NextButton = () => {
    const { hasNextPage, goToNextPage } = useDataGridContext();

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => goToNextPage}
            disabled={hasNextPage}
        >
            Next <ArrowRight />
        </Button>
    )
}

export default NextButton;
