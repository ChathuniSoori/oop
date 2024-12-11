import React, { useState } from 'react';
import { Grid, Typography, TextField, Button, Container, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ConfigurationForm = ({ onSubmit }) => {
    const [config, setConfig] = useState({
        tickets: 10000,
        delay: 1000,
        role: 'vendor',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig({ ...config, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(config);
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom align="center">System Configuration</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Role</InputLabel>
                            <Select
                                name="role"
                                value={config.role}
                                onChange={handleChange}
                                label="Role"
                                required
                            >
                                <MenuItem value="vendor">Vendor</MenuItem>
                                <MenuItem value="customer">Customer</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {config.role === 'vendor' && (
                        <Grid item xs={12}>
                            <TextField
                                label="Initial Tickets"
                                fullWidth
                                type="number"
                                name="tickets"
                                value={config.tickets}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <TextField
                            label="Delay (ms)"
                            fullWidth
                            type="number"
                            name="delay"
                            value={config.delay}
                            onChange={handleChange}
                            required
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            Save Configuration
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ConfigurationForm;
