import React, { useState, useRef } from 'react'
import { Container } from '@mantine/core'

const CreatePage = () => {
  const [products, setNewProducts] = useState([
    {
      name: "",
      price: "",
      image: "",
    }
  ]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [showMessage, setShowMessage] = useState(false);
  const messageTimerRef = useRef(null);

  const showStatusMessage = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setShowMessage(true);

    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current);
    }

    messageTimerRef.current = setTimeout(() => {
      setShowMessage(false);
      messageTimerRef.current = null;
    }, 7000);
  };
  
  const handleAddProduct = async (product) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const responseData = await response.json();
      if (response.ok) {
        setNewProducts([...products, responseData.data]);
      } else {
        console.error('Failed to add product:', responseData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Container size={1200} px={4} style={{ fontWeight: 'bold', fontSize: '18px' }}>
      CreatePage      
      <div style={{ marginTop: '20px', maxWidth: '400px' }}>
        {showMessage && (
          <div
            style={{
              marginBottom: '20px',
              padding: '10px',
              borderRadius: '4px',
              color: '#fff',
              backgroundColor: messageType === 'success' ? '#28a745' : '#dc3545',
            }}
          >
            {message}
          </div>
        )}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const product = {
              name: formData.get('name'),
              price: formData.get('price'),
              description: formData.get('description'),
              image: formData.get('image'),
            };

            try {
              console.log('Creating product:', product);
              const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
              });

              const responseData = await response.json();
              console.log('Create product response:', response.status, responseData);

              if (response.ok) {
                console.log('New product details:', responseData.data);
                showStatusMessage('Product created successfully!', 'success');
                e.target.reset();
              } else {
                console.error('Failed to create product:', responseData);
                showStatusMessage('Failed to create product', 'error');
              }
            } catch (error) {
              console.error('Error:', error);
              showStatusMessage('An error occurred', 'error');
            }
          }}
        >
          <div style={{ marginBottom: '10px' }}>
            <input
              name="name"
              type="text"
              placeholder="Product Name"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              name="price"
              type="number"
              placeholder="Price"
              step="0.01"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea
              name="description"
              placeholder="Description"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '60px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input
              name="image"
              type="text"
              placeholder="Image URL"
              required
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', borderRadius: '4px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
            Add Product
          </button>
        </form>
      </div>
    </Container>
  )
}

export default CreatePage