"use client"

import React, { JSX, useState, useEffect } from 'react';
import { Button } from '@/registry/new-york/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/registry/new-york/ui/popover';
import { Bookmark, Check, Save, Trash } from 'lucide-react';
import { useDataGridContext, BookmarkSchema } from '@strucura/datagrids-headless-react';
import { Input } from '@/registry/new-york/ui/input';

export default function BookmarkManager(): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const [bookmarkName, setBookmarkName] = useState('');
    const { bookmarks, fetchBookmarks, storeBookmark, deleteBookmark, filterSets, setFilterSets, sorts, setSorts, columns, setColumns } = useDataGridContext();

    useEffect(() => {
        fetchBookmarks()
    }, [fetchBookmarks]);

    const handleSaveBookmark = async () => {
        storeBookmark({
            bookmarkName: bookmarkName,
            filterSets: filterSets,
            sorts: sorts,
            columns: columns,
        });
    };

    const handleApplyBookmark = (bookmark: BookmarkSchema) => {
        setFilterSets(bookmark.filter_sets);
        setSorts(bookmark.sorts);
        setColumns(bookmark.columns);
        setIsOpen(false);
    };

    const handleDeleteBookmark = (id: number) => {
        deleteBookmark({
            id,
        })
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="ml-auto">
                    Bookmarks <Bookmark />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="flex max-h-[350px] w-[calc(100vw-(--spacing(12)))] min-w-60 origin-(--radix-popover-content-transform-origin) flex-col gap-3.5 overflow-y-auto p-4 sm:w-[36rem]"
                align="end"
            >
                <div className="flex flex-col gap-2 p-4">
                    <div className="flex items-center gap-2">
                        <Input value={bookmarkName} onChange={(e) => setBookmarkName(e.target.value)} placeholder="Bookmark name" />
                        <Button variant="outline" onClick={handleSaveBookmark}>
                            Save <Save />
                        </Button>
                    </div>
                    <hr className={'mt-2 mb-2'} />

                    {bookmarks.length === 0 ? (
                        <span className="text-sm">No bookmarks saved.</span>
                    ) : (
                        bookmarks.map((bookmark, index) => (
                            <React.Fragment key={bookmark.id}>
                                <div className="flex items-center justify-between">
                                    <span className={'text-sm'}>{bookmark.name}</span>
                                    <div className="flex">
                                        <Button
                                            size={'sm'}
                                            variant="ghost"
                                            onClick={() => handleDeleteBookmark(bookmark.id)}
                                            className="text-red-500"
                                        >
                                            <Trash className="text-red-500" />
                                        </Button>
                                        <Button size={'sm'} variant="outline" onClick={() => handleApplyBookmark(bookmark)}>
                                            Apply <Check />
                                        </Button>
                                    </div>
                                </div>

                                {index < bookmarks.length - 1 && <hr className={'py-0'} />}
                            </React.Fragment>
                        ))
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
