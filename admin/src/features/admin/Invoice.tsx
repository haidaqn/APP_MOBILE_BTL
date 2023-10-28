import { Delete, Settings } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import { MaterialReactTable, type MRT_ColumnDef, type MRT_ColumnFiltersState, type MRT_PaginationState, type MRT_SortingState } from 'material-react-table';
import { useSnackbar } from 'notistack';
import queryString from 'query-string';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import History from '../../Router/History';
import adminApi from '../../apis/adminApi';
import { Invoice, RootInvoice } from '../../models';
import { formatCurrencyVND } from '../../utils';
import SettingMenu from './Components/SettingMenu';

export const InvoicePaging = () => {
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    const navigate = useNavigate();
    const [data, setData] = useState<Invoice[]>([]);
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
                const res: unknown = await adminApi.getPagingOrder(pagination);
                const myOrder = res as RootInvoice;
                console.log(myOrder)
                setData(myOrder.users);
                setRowCount(myOrder.totalCount);
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
    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
        () => [
            { accessorKey: '_id', header: 'ID' },
            { accessorKey: 'status', header: 'Trạng thái đơn hàng' },
            { accessorKey: 'total', header: 'Giá trị đơn hàng',
                Cell: ({ cell }) => formatCurrencyVND(cell.getValue<string>()), 
        },
            { accessorKey: 'createdAt', header: 'Ngày tạo đơn',
        Cell: ({ cell }) => dayjs(cell.getValue<Date>()).format('DD-MM-YYYY')  },
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
