import { JSX } from 'react';
import { GripVertical } from 'lucide-react';
import { CSS } from '@dnd-kit/utilities';
import {useSortable} from '@dnd-kit/sortable';

const SortableItem = ({ id, children }: { id: string; children: JSX.Element }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} className="flex items-center justify-between cursor-grab">
            <div className="flex-grow">
                {children}
            </div>
            <div {...listeners} className="cursor-grab inline-block">
                <GripVertical className="w-4 h-4 mr-2" />
            </div>
        </div>
    );
};

export { SortableItem };
