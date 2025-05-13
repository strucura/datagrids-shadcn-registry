"use client"
import { JSX, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york/ui/select';
import { Trash } from 'lucide-react';
import { useDataGridContext, FilterSchema } from '@strucura/datagrids-headless-react';
import { Button } from "@/registry/new-york/ui/button";
import FilterOperatorSelector from '@/registry/new-york/blocks/AdvancedFilterManager/FilterOperatorSelector';
import DateFilterValue from '@/registry/new-york/blocks/AdvancedFilterManager/DateFilterValue';
import TextFilterValue from '@/registry/new-york/blocks/AdvancedFilterManager/TextFilterValue';
import NumericFilterValue from '@/registry/new-york/blocks/AdvancedFilterManager/NumericFilterValue';

/**
 * Props for the FilterBuilder component.
 *
 * @interface FilterProps
 * @property {FilterSchema} filter - The filter schema object.
 * @property {(filter: FilterSchema) => void} onFilterChange - Callback function to handle filter changes.
 * @property {() => void} onRemove - Callback function to handle filter removal.
 */
interface FilterProps {
    filter: FilterSchema;
    onFilterChange: (filter: FilterSchema) => void;
    onRemove: () => void;
}

/**
 * FilterBuilder component renders a UI for building and managing filters.
 *
 * @param {FilterProps} props - The props for the component.
 * @returns {JSX.Element} The rendered filter builder component.
 */
const FilterBuilder = ({ filter, onFilterChange, onRemove }: FilterProps): JSX.Element => {
    const { columns } = useDataGridContext();

    const selectedColumn = useMemo(() => columns.find((column) => column.alias === filter.alias), [columns, filter.alias]);

    /**
     * Handles the change of the filter alias.
     *
     * @param {string} alias - The new alias for the filter.
     */
    const handleAliasChange = (alias: string) => {
        onFilterChange({
            ...filter,
            alias,
            value: undefined, // Empty the current value of the filter
        });
    };

    return (
        <div className="flex items-center space-x-2">
            <Select defaultValue={filter.alias} onValueChange={handleAliasChange}>
                <SelectTrigger>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {columns.map((column) => (
                        <SelectItem key={column.alias} value={column.alias} disabled={!column.is_filterable}>
                            {column.alias}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <FilterOperatorSelector
                filter={filter}
                columns={columns}
                onFilterOperatorChange={(filter_operator) => onFilterChange({ ...filter, filter_operator })}
                onFilterChange={onFilterChange}
            />

            {(selectedColumn?.type === 'datetime' || selectedColumn?.type === 'date') && (
                <DateFilterValue value={filter.value as string} onChange={(date) => onFilterChange({ ...filter, value: date })} />
            )}

            {selectedColumn?.type === 'string' && (
                <TextFilterValue value={filter.value as string} onChange={(value) => onFilterChange({ ...filter, value })} />
            )}

            {selectedColumn?.type === 'number' && (
                <NumericFilterValue value={filter.value as number} onChange={(value) => onFilterChange({ ...filter, value })} />
            )}

            <Button variant="outline" onClick={onRemove} aria-label="Remove Filter">
                <Trash />
            </Button>
        </div>
    );
};

export default FilterBuilder;
