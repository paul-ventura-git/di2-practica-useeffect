import { useState } from "react";

/**
 * Revisar los conceptos de "Prop drilling" y "Lifting state up" para entender mejor la forma 
 * en que se manejan los datos entre estos 2 componentes.  
 * @param {*} param0 
 * @returns 
 */
function ProductsForm({ products, setProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  // CREATE / UPDATE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || price === "" || Number(price) < 0) {
      alert("Completa correctamente los campos");
      return;
    }
    if (editId !== null) {
      // UPDATE
      setProducts(prev =>
        prev.map(product =>
          product.id === editId
          ? {
            ...product,
            name: name,
            price: Number(price)
          }
          : product
        )
      );
    } else {
      // CREATE
      const newProduct = {
        id: Math.max(0, ...products.map(p => p.id)) + 1,
        name: name,
        price: Number(price)
      };
      setProducts(prev => [...prev, newProduct]);
    }
    clearForm();
  };

  // LOAD PRODUCT INTO FORM
  const handleEdit = (product) => {
    setEditId(product.id);
    setName(product.name);
    setPrice(String(product.price));
  };

  // DELETE
  const handleDelete = (id) => {
    setProducts(prev =>
      prev.filter(product => product.id !== id)
    );
    if (editId === id) {
      clearForm();
    }
  };

  // CLEAR FORM
  const clearForm = () => {
    setName("");
    setPrice("");
    setEditId(null);
  };

  return (
    <div>
      <h2>Product Management</h2>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Enter price"
          />
        </div>
        <button type="submit">
          {editId !== null ? "Update Product" : "Add Product"}
        </button>
          {editId !== null && (
        <button type="button" onClick={clearForm}>
          Cancel
        </button>
        )}
      </form>
      <hr />
      {/* PRODUCT TABLE */}
      <h2>Products List</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>S/ {product.price.toFixed(2)}</td>
                <td>
                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
                </td>
              </tr>
              )
            )
          }
          {products.length === 0 && (
            <tr>
            <td colSpan="4">No products registered</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default ProductsForm;