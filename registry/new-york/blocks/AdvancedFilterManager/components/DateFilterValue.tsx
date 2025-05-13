import { Button } from "@/registry/new-york/ui/button";
import { Calendar } from "@/registry/new-york/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils";
import { JSX } from 'react';

/**
 * Props for the DateFilterValue component.
 *
 * @interface DateFilterValueProps
 * @property {string | undefined} value - The current value of the date input.
 * @property {(date: string | null) => void} onChange - Callback function to handle changes in the date input.
 */
interface DateFilterValueProps {
    value: string | undefined;
    onChange: (date: string | null) => void;
}

/**
 * DateFilterValue component allows users to select a date using a calendar popover.
 *
 * @param {DateFilterValueProps} props - The props for the component.
 * @returns {JSX.Element} The rendered DateFilterValue component.
 */
const DateFilterValue = ({ value, onChange }: DateFilterValueProps): JSX.Element => {

    /**
     * Converts a date string in 'YYYY-MM-DD' format to a Date object with the current time.
     *
     * @param {string} dateString - The date string to convert.
     * @returns {Date} The Date object with the current time.
     */
    function convertToDateWithCurrentTime(dateString: string): Date {
        const [year, month, day] = dateString.split('-').map(Number);
        const now = new Date();
        return new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    }

    /**
     * Formats a date string for presentation in 'Month Day, Year' format.
     *
     * @param {string | undefined} date - The date string to format.
     * @returns {string | null} The formatted date string or null if the input is undefined.
     */
    const formatDateForPresentation = (date: string | undefined): string | null => {
        if (!date) return null;
        return new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(date));
    }

    /**
     * Formats a Date object to 'YYYY-MM-DD' format for filtering.
     *
     * @param {Date | undefined} date - The Date object to format.
     * @returns {string | null} The formatted date string or null if the input is undefined.
     */
    const formatDateForFilter = (date: Date | undefined): string | null => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const dayOfMonth = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${dayOfMonth}`;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280x] justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? formatDateForPresentation(value) : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value ? convertToDateWithCurrentTime(value) : undefined}
                    onSelect={(date) => onChange(date ? formatDateForFilter(date) : null)}
                />
            </PopoverContent>
        </Popover>
    )
};

export default DateFilterValue;
