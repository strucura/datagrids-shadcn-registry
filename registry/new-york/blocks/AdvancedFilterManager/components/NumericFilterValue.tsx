import { Input } from "@/registry/new-york/ui/input";
import { JSX } from 'react';

/**
 * Props for the NumericFilterValue component.
 *
 * @interface NumericFilterValueProps
 * @property {number} value - The current value of the numeric input.
 * @property {(value: string) => void} onChange - Callback function to handle changes in the numeric input.
 */
interface NumericFilterValueProps {
    value: number;
    onChange: (value: string) => void;
}

/**
 * NumericFilterValue component renders a controlled input field for filtering numeric values.
 *
 * @param {NumericFilterValueProps} props - The props for the component.
 * @returns {JSX.Element} The rendered input component.
 */
const NumericFilterValue = ({ value, onChange }: NumericFilterValueProps): JSX.Element => (
    <Input
        type="number"
        placeholder="Filter numeric value"
        value={value} onChange={(e) => onChange(e.target.value)}
    />
);

export default NumericFilterValue;
