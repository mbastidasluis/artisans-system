
import { useEffect, useMemo, useReducer, useState } from 'react'
import { collection, getDocs, query, limit, where, orderBy, startAfter, endBefore, Timestamp, FieldValue } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { Artisan } from '@/models/Artisan';
import { ColumnDef } from '@tanstack/react-table';
import ArtisansTable from '@/components/ArtisansTable';
import { DataTableRowActions } from '@/components/tables/Actions';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '@/components/tables/Headers';

export default function Artisans() {

    const [artisans, setArtisans] = useState<Artisan[]>([]);
    const [firstIndex, setFirstIndex] = useState<Timestamp | FieldValue | undefined>();
    const [lastIndex, setLastIndex] = useState<Timestamp | FieldValue | undefined>();

    useEffect(() => {
        const getInitialData = async () => {
            const data = await fetchArtisans();
            setArtisans(data);
        }
        getInitialData();
    }, [])

    const fetchArtisans = async () => {
        const q = query(collection(db, 'artisans'), orderBy("createdAt"), limit(25)).withConverter(Artisan.converter);
        const { size, docs } = await getDocs(q);
        const data: Artisan[] = docs.map((doc) => doc.data());

        setFirstIndex(data[0].createdAt);
        setLastIndex(data[size - 1].createdAt);

        return data
    }

    const columns = useMemo<ColumnDef<Artisan>[]>(
        () => [
            // {
            //     id: "select",
            //     header: ({ table }) => (
            //         <Checkbox
            //             checked={
            //                 table.getIsAllPageRowsSelected() ||
            //                 (table.getIsSomePageRowsSelected() && "indeterminate")
            //             }
            //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            //             aria-label="Select all"
            //             className="translate-y-[2px]"
            //         />
            //     ),
            //     cell: ({ row }) => (
            //         <Checkbox
            //             checked={row.getIsSelected()}
            //             onCheckedChange={(value) => row.toggleSelected(!!value)}
            //             aria-label="Select row"
            //             className="translate-y-[2px]"
            //         />
            //     ),
            //     enableSorting: false,
            //     enableHiding: false,
            // },
            {
                accessorKey: 'firstName',
                cell: info => info.getValue(),
                footer: props => props.column.id,
                header: ({ column }) => <DataTableColumnHeader column={column} title="Fist Name" />,
            },
            {
                accessorFn: row => row.lastName,
                id: 'lastName',
                cell: info => info.getValue(),
                footer: props => props.column.id,
                header: ({ column }) => <DataTableColumnHeader column={column} title="Last Name" />,
            },
            {
                accessorKey: 'email',
                id: 'email',
                cell: info => info.getValue(),
                header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
                footer: props => props.column.id,
            },
            {
                accessorKey: 'livingAddress',
                id: 'livingAddress',
                cell: info => info.getValue(),
                header: ({ column }) => <DataTableColumnHeader column={column} title="Living Address" />,
                footer: props => props.column.id,
            },
            {
                accessorKey: 'workingAddress',
                id: 'workingAddress',
                cell: info => info.getValue(),
                header: ({ column }) => <DataTableColumnHeader column={column} title="Working Address" />,
                footer: props => props.column.id,
            },
            {
                id: 'actions',
                cell: ({ row }) => <DataTableRowActions row={row} />,
            }
            // {
            //     accessorKey: 'createdAt',
            //     id: 'createdAt',
            //     cell: info => info.getValue(),
            //     header: () => <span>Created At</span>,
            //     footer: props => props.column.id,
            // }


        ],
        []
    )


    return (
        <div className="h-full">
            <h1>Artesanos</h1>
            <ArtisansTable{...{ data: artisans, columns }} />
        </div>
    )
}   