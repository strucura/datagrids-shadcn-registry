import { Input } from "@/registry/new-york/ui/input";
import { JSX } from 'react';

/**
 * Props for the TextFilterValue component.
 *
 * @interface TextFilterValueProps
 * @property {string} value - The current value of the text input.
 * @property {(value: string) => void} onChange - Callback function to handle changes in the text input.
 */
interface TextFilterValueProps {
    value: string;
    onChange: (value: string) => void;
}

/**
 * TextFilterValue component renders a controlled input field for filtering text values.
 *
 * @param {TextFilterValueProps} props - The props for the component.
 * @returns {JSX.Element} The rendered input component.
 */
const TextFilterValue = ({ value = '', onChange }: TextFilterValueProps): JSX.Element => (
    <Input type={'text'}
           placeholder="Filter text value"
           value={value}
           onChange={(e) => onChange(e.target.value)}
    />
);

export default TextFilterValue;
