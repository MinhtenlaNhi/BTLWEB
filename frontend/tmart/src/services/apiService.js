import axios from 'axios';

export const apiService = {
    getSetting: () => axios.get('http://localhost:3050'),
    getAllProductCategories: () => axios.get('http://localhost:3050/category-product'),
    getProducts: (sortBy,sortValue,page=1) => sortBy && sortValue ? axios.get(`http://localhost:3050/products?sortBy=${sortBy}&sortValue=${sortValue}&page=${page}`) : axios.get(`http://localhost:3050/products?page=${page}`),
    getProductsOfCategory: (sortBy,sortValue,page,slugCategory) => sortBy && sortValue ? axios.get(`http://localhost:3050/products/${slugCategory}?sortBy=${sortBy}&sortValue=${sortValue}&page=${page}`) : axios.get(`http://localhost:3050/products/${slugCategory}?page=${page}`),
    searchProduct: (keyword,page) => page ? axios.get(`http://localhost:3050/products/search?keyword=${keyword}&page=${page}`) : axios.get(`http://localhost:3050/products/search?keyword=${keyword}`),
    getDetailProduct: (slug) => axios.get(`http://localhost:3050/products/detail/${slug}`),
    getDetailCategory: (slug) => axios.get(`http://localhost:3050/category-product/detail/${slug}`),
    postLogin: (email,password,cartId) => axios.post("http://localhost:3050/user/login",
        {
            email,
            password,
            cartId
        }
    ),
    postRegister: (fullName,email,password) => axios.post("http://localhost:3050/user/register",
        {
            fullName,
            email,
            password
        }
    ),
    postForgotPassWord: (email) => axios.post("http://localhost:3050/user/password/forgot",
    {
        email,

    }),
    postOTP: (email,OTP) => axios.post("http://localhost:3050/user/password/otp",
    {   
        email,
        OTP,

    }),
    postResetPassword: (tokenUser,password) => axios.post("http://localhost:3050/user/password/reset",
    {
        password
    },
    {
        headers: {
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json",
        }
    }),
    createCart: () => axios.get(`http://localhost:3050/cart/create`),
    getCart: (cartId) => axios.get(`http://localhost:3050/cart/${cartId}`),

    postAddCart: (cartId,productId,quantity = 1) => axios.post(`http://localhost:3050/cart/add/${productId}`,{
        cartId,
        quantity
    }),
    postDeleteCart: (cartId,productId,quantity = 1) => axios.post(`http://localhost:3050/cart/delete/${productId}`,{
        cartId,
        quantity
    }),
    postRemoveCart: (cartId,productId) => axios.post(`http://localhost:3050/cart/remove/${productId}`,{
        cartId,
    }),
    getOrder: (tokenUser) => axios.post(`http://localhost:3050/checkout/order`,{},{
        headers: {
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json"
        }
    }),
    postAddOrder: (cartId,inforUser,tokenUser) => axios.post(`http://localhost:3050/checkout`,{
        cartId,
        inforUser
    },
    {
        headers: {
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json"
        }
    }),
    getReview: (productId) => axios.get(`http://localhost:3050/review/${productId}`),
    postAddReview: (productId,tokenUser,comment,value) => axios.post(`http://localhost:3050/review/add/${productId}`,
        {
            comment,
            rating: value
        },
        {
            headers: {
                Authorization: `Bearer ${tokenUser}`,
                "Content-Type": "application/json" 
            }
        }
    ),
    getInfoUser: (tokenUser) => axios.get("http://localhost:3050/user/info",{
        headers: {
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json"
        }
    }),
    updateInfoUser: (tokenUser,infoUser) => axios.patch("http://localhost:3050/user/update",{
        infoUser
    },{
        headers: {
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json"
        }
    }),
    postChangePassword: (tokenUser,currentPassword,newPassword) => axios.patch("http://localhost:3050/user/change-password",{
        currentPassword,
        newPassword
    },{
        headers: {      
            Authorization: `Bearer ${tokenUser}`,
            "Content-Type": "application/json"
        }
    }),
}