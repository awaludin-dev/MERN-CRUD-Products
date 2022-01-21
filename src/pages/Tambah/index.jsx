import Input from '../../components/Input';
import './index.scss';
import { useHistory } from 'react-router-dom';

const Tambah = () => {
  let history = useHistory();

  const submitForm = (data) => {
    fetch('http://127.0.0.1:3001/api/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then((res) => res.json)

    history.push('/');
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form onSubmit={submitForm}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama"/>
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga"/>
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock"/>
          <Input name="status" type="checkbox" label="Active" checked/>
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;