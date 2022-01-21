/* eslint-disable array-callback-return */
import { Link } from 'react-router-dom';
import './index.scss';
import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { getData } from '../../api';

const Home = () => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    return fetch('http://localhost:3001/api/product')
      .then((res) => res.json())
      .then((data) => setItem(data))
  }, [])

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            item.map((data, key) => {
              return(
                <tr key={key}>
                  <td>{key+1}</td>
                  <td>{data.name}</td>
                  <td>{new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR"
                  }).format(data.price)}</td>
                  <td className="text-center">
                    <Link to='/detail/' className="btn btn-sm btn-info">Detail</Link>
                    <Link to="/edit" className="btn btn-sm btn-warning">Edit</Link>
                    <Link to="#" className="btn btn-sm btn-danger">Delete</Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home;