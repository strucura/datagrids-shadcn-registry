"use client"
import React, { JSX, useEffect, useState } from 'react';
import FilterSetBuilder from './FilterSetBuilder';
import { Button } from '@/registry/new-york/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover';
import { Check, Filter, Plus } from 'lucide-react';
import { useDataGridContext, FilterSetOperator, FilterSetSchema, FilterOperator } from '@strucura/datagrids-headless-react';

/**
 * AdvancedFilterManager component to manage and apply filter sets.
 *
 * @returns {JSX.Element} The AdvancedFilterManager component.
 */
const FilterManager = <T,>(): JSX.Element => {

    const { columns, filterSets, setFilterSets } = useDataGridContext<T>();

    // Default filter set configuration
    const defaultFilterSet = {
        filter_set_operator: FilterSetOperator.And,
        filters: [{ filter_operator: FilterOperator.Equals, alias: columns[0].alias, value: '' }],
    };

    // State to manage filter sets
    const [workingFilterSets, setWorkingFilterSets] = useState<FilterSetSchema[]>(filterSets.length ? filterSets : [defaultFilterSet]);
    // State to manage the visibility of the filter manager
    const [isFilterManagerOpen, setIsFilterManagerOpen] = useState(false);

    /**
     * When the filter sets change in context, update the working filter sets
     */
    useEffect(() => {
        setWorkingFilterSets(filterSets);
    }, [filterSets])

    /**
     * Adds a new filter set to the list.
     */
    const addFilterSet = () => setWorkingFilterSets([...workingFilterSets, defaultFilterSet]);

    /**
     * Updates a specific filter set in the list.
     *
     * @param {number} index - Index of the filter set to update.
     * @param {FilterSetSchema} updatedFilterSet - The updated filter set.
     */
    const updateFilterSet = (index: number, updatedFilterSet: FilterSetSchema) => {
        const newFilterSets = [...workingFilterSets];
        newFilterSets[index] = updatedFilterSet;
        setWorkingFilterSets(newFilterSets);
    };

    /**
     * Removes a specific filter set from the list.
     *
     * @param {number} index - Index of the filter set to remove.
     */
    const removeFilterSet = (index: number) => setWorkingFilterSets(workingFilterSets.filter((_, i) => i !== index));

    /**
     * Applies the current filter sets and closes the filter manager.
     */
    const applyFilterSets = () => {
        setFilterSets(workingFilterSets.filter((set) => set.filters.length));
        setIsFilterManagerOpen(false);
    };

    return (
        <Popover open={isFilterManagerOpen} onOpenChange={setIsFilterManagerOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline">
                    Filters <Filter />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="flex max-h-[350px] w-[calc(100vw-(--spacing(12)))] min-w-60 origin-(--radix-popover-content-transform-origin) flex-col gap-3.5 overflow-y-auto p-4 sm:w-[48rem]"
                align="start"
            >
                <>
                    <div className="flex justify-end items-center border-b pb-4 mb-2 space-x-2">
                        <Button variant="outline" onClick={addFilterSet}>
                            Add<Plus />
                        </Button>
                        <Button variant="outline" onClick={applyFilterSets}>
                            Apply <Check />
                        </Button>
                    </div>
                    <div className="flex flex-col gap-3.5 overflow-y-auto">
                        {workingFilterSets.map((filterSet, index) => (
                            <FilterSetBuilder
                                key={index}
                                columns={columns}
                                filterSet={filterSet}
                                onFilterSetChange={(updatedFilterSet) => updateFilterSet(index, updatedFilterSet)}
                                onRemove={() => removeFilterSet(index)}
                            />
                        ))}

                        {workingFilterSets.length === 0 && (
                            <div className="text-sm text-muted-foreground">
                                No filter sets available. Please add a filter set to start filtering.
                            </div>
                        )}
                    </div>
                </>
            </PopoverContent>
        </Popover>
    );
};

export default FilterManager;
