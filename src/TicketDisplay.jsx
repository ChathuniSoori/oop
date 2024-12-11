import React, { useState, useEffect } from 'react';
import {
    Button,
    Paper,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
} from '@mui/material';

// Active Ticket Display Component
const ActiveTicketDisplay = ({ activeTickets, onPurchaseTicket, isLoading }) => (
    <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h6" gutterBottom align="center">
            Active Tickets
        </Typography>
        {isLoading ? (
            <Typography variant="body2" color="textSecondary" align="center">
                <CircularProgress />
                Loading tickets...
            </Typography>
        ) : activeTickets.length > 0 ? (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ticket ID</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeTickets.map((ticket) => (
                            <TableRow key={ticket.ticketId}>
                                <TableCell>{ticket.ticketId}</TableCell>
                                <TableCell>{`$${ticket.price}`}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => onPurchaseTicket(ticket.ticketId)}
                                    >
                                        Purchase
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        ) : (
            <Typography variant="body2" color="textSecondary" align="center">
                No active tickets available.
            </Typography>
        )}
    </Paper>
);

const TicketManager = () => {
    const [activeTickets, setActiveTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://localhost:8080/api/sell/active")
            .then((response) => response.json())
            .then((data) => {
                setActiveTickets(data);
                setIsLoading(false);
            })
            .catch((error) => {
                alert('Error fetching tickets. Please try again later.');
                setIsLoading(false);
            });
    }, []);

    const handlePurchaseTicket = (ticketId) => {
        const customerId = prompt('Enter your Customer ID:');
        if (customerId) {
            fetch("http://localhost:8080/api/sell/purchase", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ customerId, ticketId }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert('Ticket purchased successfully!');
                        setActiveTickets((prevTickets) =>
                            prevTickets.filter((ticket) => ticket.ticketId !== ticketId)
                        );
                    } else {
                        alert(data.message || 'Failed to purchase ticket. Please try again.');
                    }
                })
                .catch(() => alert('Error processing your request. Try again.'));
        }
    };

    return (
        <div style={{ margin: '20px' }}>
            <ActiveTicketDisplay
                activeTickets={activeTickets}
                onPurchaseTicket={handlePurchaseTicket}
                isLoading={isLoading}
            />
        </div>
    );
};

export default TicketManager;
