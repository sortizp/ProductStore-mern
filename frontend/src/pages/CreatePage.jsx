import React, { useState } from 'react';
import { Container, TextInput, NumberInput, Textarea, Button, Notification, Stack, Title } from '@mantine/core';

console.log("VITE ENV OBJECT: ", import.meta.env.VITE_API_URL); // Debugging line to check environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL;

const CreatePage = () => {
  const [products, setNewProducts] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', color: 'green' });
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  const triggerNotification = (message, color = 'green') => {
    setNotification({ show: true, message, color });
    // Automatically hide after 4 seconds without complex useRef tracking
    setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 4000);
  };

  const handleFieldChange = (field) => (value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      ...formData,
      price: Number(formData.price) || 0,
    };
    console.log('Submitting product:', product); // Debugging line to check form data

    try {
      // Fixed: Using relative path to trigger Vite Proxy and avoid CORS
      const response = await fetch(`${API_BASE_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const responseData = await response.json();

      if (response.ok) {
        setNewProducts((prev) => [...prev, responseData.data]);
        triggerNotification('Product created successfully!', 'green');
        setFormData({ name: '', price: '', description: '', image: '' });
      } else {
        triggerNotification('Failed to create product', 'red');
      }
    } catch (error) {
      console.error('Error:', error);
      triggerNotification('An error occurred', 'red');
    }
  };

  return (
    <Container size={400} py="xl">
      <Title order={2} mb="lg">Create Product</Title>

      {/* Clean Mantine Notification */}
      {notification.show && (
        <Notification 
          color={notification.color} 
          onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
          mb="md"
        >
          {notification.message}
        </Notification>
      )}

      {/* Form with clean Mantine spacing and inputs */}
      <form onSubmit={handleSubmit}>
        <Stack spacing="sm">
          <TextInput
            name="name"
            label="Product Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(event) => handleFieldChange('name')(event.currentTarget.value)}
            required
          />
          <NumberInput
            name="price"
            label="Price"
            placeholder="0.00"
            precision={2}
            min={0}
            value={formData.price}
            onChange={(value) => handleFieldChange('price')(value)}
            required
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Enter details"
            value={formData.description}
            onChange={(event) => handleFieldChange('description')(event.currentTarget.value)}
            required
          />
          <TextInput
            name="image"
            label="Image URL"
            placeholder="https://..."
            value={formData.image}
            onChange={(event) => handleFieldChange('image')(event.currentTarget.value)}
            required
          />

          <Button type="submit" color="green" fullWidth mt="md">
            Add Product
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CreatePage;
