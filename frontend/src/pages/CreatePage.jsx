import React, { useState } from 'react';
import { Container, TextInput, NumberInput, Textarea, Button, Notification, Stack, Title } from '@mantine/core';

console.log("VITE ENV OBJECT: ", import.meta.env.VITE_API_URL); // Debugging line to check environment variable
const API_BASE_URL = import.meta.env.VITE_API_URL;

const CreatePage = () => {
  const [products, setNewProducts] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', color: 'green' });

  const triggerNotification = (message, color = 'green') => {
    setNotification({ show: true, message, color });
    // Automatically hide after 4 seconds without complex useRef tracking
    setTimeout(() => setNotification((prev) => ({ ...prev, show: false })), 4000);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Cleanest way to get form data without manual mapping
    const formData = new FormData(e.currentTarget);
    const product = Object.fromEntries(formData.entries());
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
        setNewProducts([...products, responseData.data]);
        triggerNotification('Product created successfully!', 'green');
        e.target.reset(); // Clear the form fields
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
          <TextInput name="name" label="Product Name" placeholder="Enter name" required />
          <NumberInput name="price" label="Price" placeholder="0.00" precision={2} min={0} required />
          <Textarea name="description" label="Description" placeholder="Enter details" required />
          <TextInput name="image" label="Image URL" placeholder="https://..." required />
          
          <Button type="submit" color="green" fullWidth mt="md">
            Add Product
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CreatePage;
