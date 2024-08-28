
import { useEffect, useMemo, useState } from 'react'
import { Artisan } from '@/models/Artisan';
import { ColumnDef } from '@tanstack/react-table';
import ArtisansTable from '@/components/ArtisansTable';
import { DataTableRowActions } from '@/components/tables/Actions';
import { DataTableColumnHeader } from '@/components/tables/Headers';
import { useNavigate } from 'react-router-dom';
import { deleteArtisan, getArtisans } from '@/firebase/artisans-db';
import { toast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function Artisans() {

    const [artisans, setArtisans] = useState<Artisan[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getInitialData = async () => {
            const data = await getArtisans();
            setArtisans(data);
        }
        getInitialData();
    }, [])

    const options = [
        // TODO impelment drawer with details
        // {
        //     label: 'Detalles',
        //     callback: (data: Artisan) => console.log('Detalles', data.createdAt)
        // },
        {
            label: 'Edit',
            callback: (data: Artisan) => {
                navigate(`/artisans/${data.uid}`)
            }
        },
        {
            label: 'Delete',
            callback: async (data: Artisan) => {
                setArtisans((artisans) => artisans.filter(artisan => artisan.uid !== data.uid));
                await deleteArtisan(data.uid);
                toast({
                    title: "Artisan deleted",
                    description: (
                        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">
                            <p>Artisan deleted</p>
                            <p>UID: {data.uid}</p>
                        </div>
                    ),
                })
                navigate(`/artisans`)
            }
        }
    ]

    // TODO move columns to proper folder
    const columns = useMemo<ColumnDef<Artisan>[]>(
        () => [
            // TODO implement mass actions
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
                cell: ({ row }) => <DataTableRowActions row={row} options={options} />,
            }
            // TODO implement createdAt column
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
        <div className="h-full overflow-auto">
            <div className="flex items-center justify-between border-b-4 border-gray-300 pb-2 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold ml-4">Artisans</h1>
                </div>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <PlusCircle className="h-8 w-8 mr-4" />
                                    <span className="sr-only">Agregar</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Agregar</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            <ArtisansTable{...{ data: artisans, columns }} />
        </div>
    )
}   