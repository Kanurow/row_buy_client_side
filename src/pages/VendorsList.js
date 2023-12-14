import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './VendorsList.css';
import anonymous from "./JUMIA_VENDOR.png";

function VendorsList() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jumia-clone-rowland.onrender.com/api/users/getVendors', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            windows: 'true',
          },
        });
        setVendors(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <div className="vendors-grid">
        {vendors.map((vendor) => (
          <Link key={vendor.id} className="vendor-grid-display" to={`/viewVendor/${vendor.id}`}>
            <div className="vendor-preview">
              <div className="thumbnail-row">
                <img className="thumbnail" src={vendor.profilePictureUrl || anonymous} alt="Profile Thumbnail" />
              </div>

              <div className="vendor-info-grid">
                <div className="vendor-picture">
                  <img className="company-logo" src={vendor.companyLogoUrl || anonymous} alt="Company Logo" />
                </div>

                <div className="vendor-info">
                  <p className="vendor-name">Name: {vendor.lastName} {vendor.firstName} | {vendor.mobile}</p>
                  <p className="vendor-company">Company Name: {vendor.vendorCompany}</p>
                  <p className="vendor-territory">Territory: {vendor.territory}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VendorsList;
