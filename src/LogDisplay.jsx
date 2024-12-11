import React, { useEffect, useState } from 'react';
import {
    Typography,
    Paper,
    List,
    ListItem,
    Divider,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@mui/material';
import PropTypes from 'prop-types';

const LogDisplay = () => {
    const [logs, setLogs] = useState([]);
    const [ticketsData, setTicketsData] = useState([]);
    const [customerTickets, setCustomerTickets] = useState([]);

    useEffect(() => {
        // Fetch logs (Example API)
        fetch('/api/logs')
            .then(response => response.json())
            .then(data => setLogs(data))
            .catch(error => console.error('Error fetching logs:', error));

        // Fetch vendor tickets
        fetch('/api/vendors')
            .then(response => response.json())
            .then(data => setTicketsData(data))
            .catch(error => console.error('Error fetching tickets:', error));

        // Fetch customer purchases
        fetch('/api/customers')
            .then(response => response.json())
            .then(data => {
                const customerPurchaseData = data.map(customer => ({
                    fullName: customer.name,
                    eventName: customer.eventName,
                    price: customer.ticketPrice,
                }));
                setCustomerTickets(customerPurchaseData);
            })
            .catch(error => console.error('Error fetching customer purchases:', error));
    }, []);

    return (
        <Paper style={{ padding: '10px', marginTop: '20px' }}>
            {/* Activity Log */}
            <Typography variant="h6" gutterBottom>
                Activity Log
            </Typography>
            {logs.length > 0 ? (
                <List>
                    {logs.map((log, index) => (
                        <div key={index}>
                            <ListItem>
                                <Typography variant="body2">{log}</Typography>
                            </ListItem>
                            {index !== logs.length - 1 && <Divider />}
                        </div>
                    ))}
                </List>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No activity logs available.
                </Typography>
            )}

            {/* Vendor Ticket Updates */}
            <Typography variant="h6" style={{ marginTop: '20px' }} gutterBottom>
                Vendor Ticket Updates
            </Typography>
            {ticketsData.length > 0 ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Event Name</TableCell>
                                <TableCell>Max Capacity</TableCell>
                                <TableCell>Ticket Price</TableCell>
                                <TableCell>Release Rate</TableCell>
                                <TableCell>Available Tickets</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ticketsData.map((ticket, index) => (
                                <TableRow key={index}>
                                    <TableCell>{ticket.eventName}</TableCell>
                                    <TableCell>{ticket.quantity}</TableCell>
                                    <TableCell>{ticket.price}</TableCell>
                                    <TableCell>{ticket.rate}</TableCell>
                                    <TableCell>{ticket.available}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No vendor ticket updates available.
                </Typography>
            )}

            {/* Customer Ticket Purchases */}
            <Typography variant="h6" style={{ marginTop: '20px' }} gutterBottom>
                Customer Purchases
            </Typography>
            {customerTickets.length > 0 ? (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Event Name</TableCell>
                                <TableCell>Ticket Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customerTickets.map((ticket, index) => (
                                <TableRow key={index}>
                                    <TableCell>{ticket.fullName}</TableCell>
                                    <TableCell>{ticket.eventName}</TableCell>
                                    <TableCell>{ticket.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No customer purchases available.
                </Typography>
            )}
        </Paper>
    );
};

export default LogDisplay;
