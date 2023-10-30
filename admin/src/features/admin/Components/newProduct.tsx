import { ArrowBackIosNew, CloudUpload, Replay } from '@mui/icons-material';
import { Backdrop, Box, Button, CircularProgress, Grid, IconButton, Paper, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import adminApi from '../../../apis/adminApi';

const NewProduct = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);
    const [openBackDrop, setOpenBackDrop] = React.useState(false);
    const [file, setFile] = React.useState<File | null>();
    const imgRef = React.useRef<HTMLInputElement | null>(null);
    const [productData, setProductData] = useState({
        title: '',
        price: '',
        description: '',
        brand: '',
        category: '',
        quantity: 0
    });
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleDeleteImage = (value: string) => {
        setImages((prev) => prev.filter((item) => item !== value));
    };
    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputElement = e.target;
        // setIsLoading(false);
        if (inputElement.files) {
            const images = new FormData();
            const selectedFiles = inputElement.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                images.append('file', file);
                images.append('upload_preset', 'oksl1k1o');
                try {
                    const response = await adminApi.getUploadImages(images);
                    if (response.status === 200) {
                        setImages((prev) => [...prev, response.data.secure_url]);
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            setIsLoading(true);
        }
    };

    const handleProductCreate = async () => {
        try {
            const { title, price, description, brand, category, quantity } = productData;
            if (!(title && price && description && brand && category && quantity)) {
                throw new Error('Missing input...');
            }
            const data = { ...productData, images: [...images] };
            setProductData({title: '',
            price: '',
            description: '',
            brand: '',
            category: '',
            quantity: 0})
            setImages([])
            await adminApi.createProduct(data);
            navigate('/admin/products')
            enqueueSnackbar('Tạo sản phẩm thành công !', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Tạo sản phẩm không thành công !', { variant: 'error' });
        }
    };

    return (
        <Box sx={{ height: '100%' }}>
            {/* <Backdrop sx={{ quantity: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
                <CircularProgress quantity="inherit" />
            </Backdrop> */}
            <Box>
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        p: '10px',
                        boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        zIndex: 10
                    }}
                >
                    <Button
                        size="small"
                        startIcon={<ArrowBackIosNew fontSize="small" />}
                        onClick={() => {
                            navigate('/admin/products');
                        }}
                        variant="contained"
                        sx={{ mr: '10px', textTransform: 'revert' }}
                    >
                        Sản phẩm
                    </Button>
                    <IconButton onClick={() => handleProductCreate()} size="small" sx={{ mr: '5px' }}>
                        <CloudUpload fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ mr: '5px' }}>
                        <Replay fontSize="small" />
                    </IconButton>
                </Stack>
                <Box className="mx-5 mt-5 h-full">
                    <Grid container spacing={2} className="h-full">
                        <Grid item xs={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        fullWidth
                                        value={productData.title}
                                        onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Price"
                                        variant="outlined"
                                        fullWidth
                                        value={productData.price}
                                        onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        variant="outlined"
                                        fullWidth
                                        value={productData.description}
                                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Brand"
                                        variant="outlined"
                                        fullWidth
                                        value={productData.brand}
                                        onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Category"
                                        variant="outlined"
                                        fullWidth
                                        value={productData.category}
                                        onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Số lượng"
                                        variant="outlined"
                                        fullWidth
                                        value={productData.quantity}
                                        onChange={(e) => setProductData({ ...productData, quantity: +e.target.value })}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper elevation={3} sx={{ padding: '20px' }}>
                                <IconButton onClick={() => imgRef.current?.click()} size="small" sx={{ mb: '10px' }}>
                                    <CloudUpload fontSize="small" />
                                </IconButton>
                                <input onChange={(e) => handleFiles(e)} ref={imgRef} hidden type="file" id="file" multiple />
                                <div className="flex gap-4 items-center ">
                                    {images.map((item) => (
                                        <div className="relative w-1/4 h-1/4" key={item}>
                                            <img src={item} alt="preview" className=" h-full w-full object-cover rounded-md cursor-pointer" />
                                            <span
                                                title="xóa ảnh"
                                                onClick={() => handleDeleteImage(item)}
                                                className="absolute hover:bg-gray-400 top-[-20px] right-[-15px] w-10 h-10 flex items-center justify-center cursor-pointer p-2 text-white text-xl bg-gray-300 rounded-full"
                                            >
                                                xóa
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default NewProduct;
