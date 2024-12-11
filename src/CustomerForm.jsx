import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Container, Box, Paper } from '@mui/material';

const CustomerForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [eventName, setEventName] = useState('');
    const [price, setPrice] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerDetails, setCustomerDetails] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const customerData = { fullName, email, eventName, price };
        fetch("http://localhost:8080/api/customers", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(customerData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Customer added successfully!', data);
                alert('Customer added successfully!');
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`Error: ${error.message || 'Something went wrong!'}`);
            });
    };

    // Fetch customer by ID
    const fetchCustomerById = () => {
        fetch(`http://localhost:8080/api/customers/${customerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Customer details fetched successfully!', data);
                setCustomerDetails(data);
            })
            .catch(error => {
                console.error('Error fetching customer:', error);
                alert(`Error: ${error.message || 'Something went wrong!'}`);
            });
    };

    // Delete customer
    const deleteCustomer = () => {
        fetch(`http://localhost:8080/api/customers/${customerId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.text();
            })
            .then(message => {
                console.log(message);
                alert('Customer deleted successfully!');
            })
            .catch(error => {
                console.error('Error deleting customer:', error);
                alert(`Error: ${error.message || 'Something went wrong!'}`);
            });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom align="center" color="primary">
                        Customer Ticket Purchase
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Event Name"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Ticket Price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ padding: '12px', fontSize: '16px' }}
                                >
                                    Purchase Ticket
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default CustomerForm;
