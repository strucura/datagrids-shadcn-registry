"use client"
import { useMemo, useEffect, JSX } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york/ui/select';
import { FilterSchema, FilterOperator } from '@strucura/datagrids-headless-react';

/**
 * Props for the FilterOperatorSelector component.
 */
interface FilterOperatorSelectorProps {
    filter: FilterSchema;
    columns: { alias: string; type: string }[];
    onFilterOperatorChange: (filterOperator: FilterOperator) => void;
    onFilterChange: (filter: FilterSchema) => void;
}

/**
 * FilterOperatorSelector component allows users to select a filter operator based on the column type.
 * @param {FilterOperatorSelectorProps} props - The props for the component.
 * @returns {JSX.Element} The rendered FilterOperatorSelector component.
 */
const FilterOperatorSelector = ({ filter, columns, onFilterOperatorChange, onFilterChange }: FilterOperatorSelectorProps): JSX.Element => {
    /**
     * Finds the selected column based on the filter alias.
     * @returns {Object | undefined} The selected column or undefined if not found.
     */
    const selectedColumn = useMemo(() => columns.find(column => column.alias === filter.alias), [columns, filter.alias]);
    const columnType = selectedColumn?.type;

    /**
     * Determines the filter operators based on the column type.
     * @returns {Array<FilterOperator>} The list of filter operators for the column type.
     */
    const filterOperators = useMemo(() => {
        switch (columnType) {
            case 'date':
            case 'datetime':
                return [
                    FilterOperator.DateIs, FilterOperator.DateIsNot, FilterOperator.DateBefore,
                    FilterOperator.DateAfter, FilterOperator.DateOnOrBefore, FilterOperator.DateOnOrAfter,
                ];
            case 'number':
                return [
                    FilterOperator.Equals, FilterOperator.DoesNotEqual, FilterOperator.LessThan,
                    FilterOperator.LessThanOrEqualTo, FilterOperator.GreaterThan, FilterOperator.GreaterThanOrEqualTo,
                ];
            case 'boolean':
                return [
                    FilterOperator.Equals, FilterOperator.DoesNotEqual,
                ];
            case 'string':
                return [
                    FilterOperator.Equals, FilterOperator.DoesNotEqual, FilterOperator.StartsWith,
                    FilterOperator.Contains, FilterOperator.DoesNotContain, FilterOperator.EndsWith,
                ];
            default:
                return [];
        }
    }, [columnType]);

    /**
     * Labels for the filter operators.
     * @type {Record<FilterOperator, string>}
     */
    const operatorLabels: Record<FilterOperator, string> = {
        [FilterOperator.StartsWith]: 'Starts With',
        [FilterOperator.Contains]: 'Contains',
        [FilterOperator.DoesNotContain]: 'Does Not Contain',
        [FilterOperator.EndsWith]: 'Ends With',
        [FilterOperator.Equals]: 'Equals',
        [FilterOperator.DoesNotEqual]: 'Does Not Equal',
        [FilterOperator.In]: 'In',
        [FilterOperator.NotIn]: 'Not In',
        [FilterOperator.LessThan]: 'Less Than',
        [FilterOperator.LessThanOrEqualTo]: 'Less Than Or Equal To',
        [FilterOperator.GreaterThan]: 'Greater Than',
        [FilterOperator.GreaterThanOrEqualTo]: 'Greater Than Or Equal To',
        [FilterOperator.DateIs]: 'Date Is',
        [FilterOperator.DateIsNot]: 'Date Is Not',
        [FilterOperator.DateBefore]: 'Date Before',
        [FilterOperator.DateAfter]: 'Date After',
        [FilterOperator.DateOnOrBefore]: 'Date On Or Before',
        [FilterOperator.DateOnOrAfter]: 'Date On Or After',
    };

    /**
     * Effect to update the filter operator if the current operator is not compatible with the column type.
     */
    useEffect(() => {
        if (!filterOperators.includes(filter.filter_operator as FilterOperator)) {
            onFilterChange({
                ...filter,
                filter_operator: filterOperators[0],
                value: undefined
            });
        }
    }, [filterOperators, filter, onFilterChange]);

    return (
        <Select value={filter.filter_operator} onValueChange={(filter_operator: FilterOperator) => onFilterOperatorChange(filter_operator as FilterOperator)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
                {filterOperators.map(operator => (
                    <SelectItem key={operator} value={operator}>{operatorLabels[operator]}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default FilterOperatorSelector;
