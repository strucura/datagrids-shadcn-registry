# DataGrid ShadCn Registery

This is a proof of concept and not ready for production usage.

### Installation

```bash
npx shadcn add https://raw.githubusercontent.com/strucura/datagrids-shadcn-registry/refs/heads/master/public/r/datagrid.json
npx shadcn add https://raw.githubusercontent.com/strucura/datagrids-shadcn-registry/refs/heads/master/public/r/datagrid-advanced-filter-manager.json
npx shadcn add https://raw.githubusercontent.com/strucura/datagrids-shadcn-registry/refs/heads/master/public/r/datagrid-bookmark-manager.json
npx shadcn add https://raw.githubusercontent.com/strucura/datagrids-shadcn-registry/refs/heads/master/public/r/datagrid-bulk-action-manager.json
npx shadcn add https://raw.githubusercontent.com/strucura/datagrids-shadcn-registry/refs/heads/master/public/r/datagrid-column-manager.json
npx shadcn add https://raw.githubusercontent.com/strucura/datagrids-shadcn-registry/refs/heads/master/public/r/datagrid-sort-manager.json
npx shadcn add https://raw.githubusercontent.com/strucura/datagrids-shadcn-registry/refs/heads/master/public/r/datagrid-sortable-item.json
```

### Usage
```typescript
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DataGridSchema } from '@strucura/datagrids-headless-react';
import AdvancedFilterManager from '@/components/AdvancedFilterManager';
import DataGrid from '@/components/DataGrid';
import SortManager from '@/components/SortManager';
import BulkActionManager from '@/components/BulkActionManager';
import BookmarkManager from '@/components/BookmarkManager';
import ColumnManager from '@/components/ColumnManager';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface UserGrid {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface DashboardProps {
    schema: DataGridSchema;
}

export default function Dashboard({schema}: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 z-40">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <DataGrid<UserGrid> schema={schema} toolbarLeft={
                    <>
                        <AdvancedFilterManager />
                        <SortManager />
                    </>
                } toolbarRight={
                    <>
                        <BulkActionManager />
                        <BookmarkManager />
                        <ColumnManager />
                    </>
                } />
            </div>
        </AppLayout>
    );
}
