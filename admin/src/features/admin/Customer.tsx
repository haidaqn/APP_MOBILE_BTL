import { Delete, Settings } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_ColumnFiltersState, type MRT_PaginationState, type MRT_SortingState } from 'material-react-table';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import History from '../../Router/History';
import adminApi from '../../apis/adminApi';
import { RootUser, User } from '../../models';
import SettingMenu from './Components/SettingMenu';

export const Customer = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const navigate = useNavigate();
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isRefetching, setIsRefetching] = useState(false);
    const [rowCount, setRowCount] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    const [pagination, setPagination] = useState<MRT_PaginationState>({
        pageIndex: 0,
        pageSize: 10
    });
    const [isDel, setIsDel] = useState(false);
    const [open, setOpen] = useState(false);
    const settingRef = useRef<HTMLButtonElement>(null);
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleSelectRows = (row: any) => {
        console.log(row);
        const idData = row.map((item: any) => item.original.id);
        (async () => {
            try {
                // await adminApi.deleteFood(idData);
                enqueueSnackbar('Xóa thành công', { variant: 'success' });
                setIsDel((item) => !item);
            } catch (error) {
                enqueueSnackbar('Có lỗi xảy ra thử lại sau', { variant: 'error' });
                console.log(error);
            }
        })();
    };
    useEffect(() => {
        const fetchData = async () => {
            if (!data.length) {
                setIsLoading(true);
            } else {
                setIsRefetching(true);
            }
            const updatedSearchParams = new URLSearchParams(location.search);
            updatedSearchParams.set('page', `${pagination.pageIndex + 1}`);
            updatedSearchParams.set('size', `${pagination.pageSize}`);
            updatedSearchParams.set('filters', JSON.stringify(columnFilters ?? []));
            updatedSearchParams.set('globalFilter', globalFilter ?? '');
            updatedSearchParams.set('sorting', JSON.stringify(sorting ?? []));

            // Update the location object with the new search parameters
            History.push({ search: updatedSearchParams.toString() });
            try {
                const res: unknown = await adminApi.getAllUser(pagination);
                const myUsers = res as RootUser;
                setData(myUsers.users);
                setRowCount(myUsers.totalCount);
            } catch (error) {
                setIsError(true);
                console.error(error);
                return;
            }

            setIsError(false);
            setIsLoading(false);
            setIsRefetching(false);
        };
        fetchData();
    }, [columnFilters, globalFilter, isDel, pagination.pageIndex, pagination.pageSize, sorting]);
    const columns = useMemo<MRT_ColumnDef<User>[]>(
        () => [
            { accessorKey: 'name', header: 'Tên người dùng' },
            { accessorKey: 'email', header: 'Gmail' },
            {
                accessorKey: 'isBlocked',
                header: 'Trạng thái',
                Cell: ({ cell }) => (cell.row.original.isBlocked === false ? 'bình thường' : 'đã khóa')
            },
            {
                accessorKey: 'role',
                header: 'Loại tài khoản',
                Cell: ({ cell }) => (+cell.row.original.role === 1111 ? 'User' : 'Admin')
            }
        ],
        []
    );

    return (
        <Box sx={{ height: '100%' }}>
            <SettingMenu anchorRef={settingRef} open={open} setOpen={setOpen} />
            <MaterialReactTable
                muiTablePaperProps={{ sx: { height: '100%' } }}
                muiTableContainerProps={{ sx: { height: 'calc(100% - 112px)' } }}
                columns={columns}
                data={data}
                enableRowSelection
                manualFiltering
                manualPagination
                muiTableBodyRowProps={({ row }) => ({
                    onClick: () => {},
                    sx: { cursor: 'pointer' }
                })}
                manualSorting
                muiToolbarAlertBannerProps={
                    isError
                        ? {
                              color: 'error',
                              children: 'Error loading data'
                          }
                        : undefined
                }
                positionToolbarAlertBanner="bottom"
                muiLinearProgressProps={({ isTopToolbar }) => ({
                    sx: {
                        display: isTopToolbar ? 'block' : 'none' //hide bottom progress bar
                    }
                })}
                renderTopToolbarCustomActions={({ table }) => (
                    <Stack direction="row" alignItems="center">
                        <Typography sx={{ fontSize: '18px', fontWeight: 500, mr: '10px' }}>Người Dùng</Typography>
                        <IconButton ref={settingRef} onClick={handleToggle} size="small" sx={{ mr: '5px' }}>
                            <Settings htmlColor="black" fontSize="small" />
                        </IconButton>
                        {table.getSelectedRowModel().rows.length > 0 && (
                            <IconButton size="small" sx={{ mr: '5px' }} onClick={() => handleSelectRows(table.getSelectedRowModel().rows)}>
                                <Delete fontSize="small" htmlColor="black" />
                            </IconButton>
                        )}
                    </Stack>
                )}
                onColumnFiltersChange={setColumnFilters}
                onGlobalFilterChange={setGlobalFilter}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={rowCount}
                enableStickyHeader
                state={{
                    columnFilters,
                    globalFilter,
                    isLoading,
                    pagination,
                    showAlertBanner: isError,
                    showProgressBars: isRefetching,
                    sorting
                }}
            />
        </Box>
    );
};
