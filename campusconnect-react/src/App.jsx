import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CampusConnectDashboard from './components/dashboard/CampusConnectDashboard.jsx';
import AddProduct from './components/Product_Listing/AddProduct.jsx';
import ViewProducts from './components/Product_Listing/ViewProducts.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<CampusConnectDashboard />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/viewproducts" element={<ViewProducts />} />
        </Routes>
    );
}

export default App;
