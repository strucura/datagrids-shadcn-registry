import React, { JSX } from 'react';
import FilterBuilder from './FilterBuilder';
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york/ui/select';
import { Button } from '@/registry/new-york/ui/button';
import { Plus, X } from 'lucide-react';

import {FilterSetOperator, FilterSetSchema, FilterSchema, ColumnSchema, FilterOperator} from '@strucura/datagrids-headless-react';

/**
 * Props for the FilterSetBuilder component.
 */
interface FilterSetProps {
    columns: ColumnSchema[];
    filterSet: FilterSetSchema;
    onFilterSetChange: (filterSet: FilterSetSchema) => void;
    onRemove: () => void;
}

/**
 * FilterSetBuilder component to build and manage individual filter sets.
 *
 * @param {FilterSetProps} props - Props for the component.
 * @returns {JSX.Element} The FilterSetBuilder component.
 */
const FilterSetBuilder = ({ columns, filterSet, onFilterSetChange, onRemove }: FilterSetProps): JSX.Element => {
    /**
     * Adds a new filter to the filter set.
     */
    const addFilter = () => {
        const newFilters = [...filterSet.filters, { alias: columns[0].alias, filter_operator: FilterOperator.Equals, value: '' }];
        onFilterSetChange({ ...filterSet, filters: newFilters });
    };

    /**
     * Updates a specific filter in the filter set.
     *
     * @param {number} index - Index of the filter to update.
     * @param {FilterSchema} updatedFilter - The updated filter schema.
     */
    const updateFilter = (index: number, updatedFilter: FilterSchema) => {
        const newFilters = [...filterSet.filters];
        newFilters[index] = updatedFilter;
        onFilterSetChange({ ...filterSet, filters: newFilters });
    };

    /**
     * Removes a specific filter from the filter set.
     *
     * @param {number} index - Index of the filter to remove.
     */
    const removeFilter = (index: number) => {
        const newFilters = filterSet.filters.filter((_, i) => i !== index);
        onFilterSetChange({ ...filterSet, filters: newFilters });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>
                        <Select
                            aria-label="FilterBuilder Set Operator"
                            defaultValue={filterSet.filter_set_operator ?? FilterSetOperator.And}
                            onValueChange={(value: FilterSetOperator) => onFilterSetChange({ ...filterSet, filter_set_operator: value as FilterSetOperator })}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={FilterSetOperator.And}>And</SelectItem>
                                <SelectItem value={FilterSetOperator.Or}>Or</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardTitle>
                    <div className={'flex items-center space-x-2'}>
                        <Button variant="outline" onClick={addFilter} aria-label={`Add Filter`}>
                            <Plus />
                        </Button>
                        <Button variant="outline" onClick={onRemove} aria-label={`Remove Filter Set`}>
                            <X />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                {filterSet.filters.map((filter, index) => (
                    <div key={index} className="mb-2">
                        <FilterBuilder
                            filter={filter}
                            onFilterChange={(updatedFilter) => updateFilter(index, updatedFilter)}
                            onRemove={() => removeFilter(index)}
                        />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default FilterSetBuilder;
