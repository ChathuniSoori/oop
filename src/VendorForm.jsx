import React, { useState } from 'react';
import { Grid, TextField, Button, Typography, Container, Box, Paper } from '@mui/material';

const VendorForm = () => {
    const [eventName, setEventName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [rate, setRate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const vendorData = { eventName, quantity, price, rate };

        // API to add vendor tickets
        fetch("http://localhost:8080/api/vendors", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vendorData)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Vendor added successfully!', data);
                alert('Vendor tickets added successfully!');
            })
            .catch((error) => {
                console.error('Error submitting the form:', error);
                alert(`Error: ${error.message || 'Something went wrong!'}`);
            });
    };

    const handleAddTickets = () => {
        const ticketData = {
            eventName,
            quantity: parseInt(quantity, 10),
            price: parseFloat(price),
            rate: parseFloat(rate),
        };

        // API to add tickets
        fetch("http://localhost:8080/api/sell/add", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ticketData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Tickets added successfully!', data);
                alert('Tickets added successfully!');
            })
            .catch((error) => {
                console.error('Error adding tickets:', error);
                alert(`Error: ${error.message || 'Something went wrong!'}`);
            });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom align="center" color="primary">
                        Vendor Ticket Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
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
                                <TextField
                                    fullWidth
                                    label="Quantity of Tickets"
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    required
                                    variant="outlined"
                                    sx={{ backgroundColor: '#f5f5f5' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Ticket Release Rate"
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
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
                                    Add Vendor
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    onClick={handleAddTickets}
                                    sx={{ padding: '12px', fontSize: '16px' }}
                                >
                                    Add Tickets
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
};

export default VendorForm;
