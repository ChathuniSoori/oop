import React, {useEffect, useState} from 'react';
import ConfigurationForm from './ConfigurationForm';
import TicketDisplay from './TicketDisplay';
import ControlPanel from './ControlPanel';
import LogDisplay from './LogDisplay';
import VendorForm from './VendorForm';
import CustomerForm from './CustomerForm';
import axios from 'axios';
import './App.css';


const MAX_TICKETS = 100;

const App = () => {
    const [config, setConfig] = useState({ tickets: 0, delay: 1000 });
    const [tickets, setTickets] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [logs, setLogs] = useState([]);
    const [intervalId, setIntervalId] = useState(null);
    const [role, setRole] = useState('vendor');
    const [customerTickets, setCustomerTickets] = useState(0);
    const backendUrl = "http://localhost:8080/";

    // Fetch initial ticket data from backend
    useEffect(() => {
        axios.get(`${backendUrl}/config`)
            .then((response) => {
                setConfig(response.data);
                setLogs((prevLogs) => [...prevLogs, "Configuration fetched successfully"]);
            })
            .catch((error) => {
                console.error("Error fetching configuration:", error);
                setLogs((prevLogs) => [...prevLogs, "Failed to fetch configuration"]);
            });
    }, []);

    // Handle Role Change
    const handleRoleChange = (newRole) => {
        setRole(newRole);
        setLogs((prevLogs) => [...prevLogs, `Role changed to: ${newRole}`]);
    };

    // Handle Vendor Ticket Submit
    const handleVendorSubmit = (vendorData) => {
        if (tickets + vendorData.tickets > MAX_TICKETS) {
            setLogs((prevLogs) => [...prevLogs, `Cannot add more than ${MAX_TICKETS} tickets!`]);
            return;
        }
        axios.post(`${backendUrl}/vendors`, vendorData)
            .then((response) => {
                setTickets((prevTickets) => prevTickets + vendorData.tickets);
                setLogs((prevLogs) => [...prevLogs, `Vendor added tickets: ${vendorData.tickets}`]);
            })
            .catch((error) => {
                console.error("Error adding tickets by vendor:", error);
                setLogs((prevLogs) => [...prevLogs, "Failed to add tickets by vendor"]);
            });
    };


    // Handle Customer Ticket Submit
    const handleCustomerSubmit = (customerData) => {
        if (tickets === 0) {
            setLogs((prevLogs) => [...prevLogs, `No tickets available for customer: ${customerData.name}`]);
            return;
        }
        axios.post(`${backendUrl}/customers`, customerData)
            .then((response) => {
                setCustomerTickets((prevTickets) => prevTickets + 1);
                setTickets((prevTickets) => prevTickets - 1);
                setLogs((prevLogs) => [...prevLogs, `Customer ${customerData.name} grabbed a ticket!`]);
            })
            .catch((error) => {
                console.error("Error processing customer request:", error);
                setLogs((prevLogs) => [...prevLogs, "Failed to process customer request"]);
            });
    };


    // Start Processing Tickets
    const startProcessing = () => {
        if (isRunning) return; // Prevent multiple intervals
        setIsRunning(true);
        const id = setInterval(() => {
            setTickets((prev) => {
                if (prev > 0) {
                    const updatedTickets = prev - 1;
                    setLogs((prevLogs) => [
                        ...prevLogs,
                        `Ticket sold! Remaining: ${updatedTickets}`,
                    ]);
                    return updatedTickets;
                } else {
                    clearInterval(id);
                    setIsRunning(false);
                    setLogs((prevLogs) => [...prevLogs, `All tickets sold!`]);
                    return 0;
                }
            });
        }, config.delay);
        setIntervalId(id);
    };

    // Stop Processing Tickets
    const stopProcessing = () => {
        clearInterval(intervalId);
        setIsRunning(false);
        setLogs((prevLogs) => [...prevLogs, `Processing stopped.`]);
    };

    return (
        <div className="app-container">
            <nav className="navbar">
                <ul>
                    <li id="brand-section" className="logo">
                        <img src="/images/logo.png" alt="Logo" className="navbar-logo"/>
                        <a class="app-name" href=".event-section">Ticketly</a>
                    </li>

                    <li>
                    <img src="/images/setting.png" alt="Settings" className="navbar-img"/>
                        <a href="#configuration">Configuration</a>
                    </li>
                    <li>
                        <img src="/images/ticket.png" alt="Tickets" className="navbar-img" />
                        <a href="#tickets">Tickets</a>
                    </li>
                    <li>
                        <img src="/images/control.png" alt="Control" className="navbar-img" />
                        <a href="#control-panel">Control Panel</a>
                    </li>
                    <li>
                        <img src="/images/log-out.png" alt="Logs" className="navbar-img" />
                        <a href="#logs">Activity Log</a>
                    </li>
                </ul>
            </nav>

            <section className="event-section">
                <h1>Real-Time Event System Powered by Producer-Consumer</h1>
                <p>Seamless bookings made easy</p>
                <p>Vendor adds the ticket, customer grabs it instantly!</p>
            </section>

            <div className="dashboard-container">
                <section id="configuration" className="dashboard-card">
                    <h2>Tickets Details Form</h2>
                    <div>
                        <label>Select Role:</label>
                        <select value={role} onChange={(e) => handleRoleChange(e.target.value)}>
                            <option value="vendor">Vendor</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                    {role === 'vendor' && <VendorForm onSubmit={handleVendorSubmit} />}
                    {role === 'customer' && <CustomerForm onSubmit={handleCustomerSubmit} />}
                </section>

                <section id="tickets" className="dashboard-card">
                    <h2>Tickets Availability</h2>
                    <TicketDisplay tickets={tickets} />
                </section>

                <section id="control-panel" className="dashboard-card">
                    <h2>Control Panel</h2>
                    <ControlPanel
                        onStart={startProcessing}
                        onStop={stopProcessing}
                        isRunning={isRunning}
                    />
                </section>

                <section id="logs" className="activity-log-section">
                    <h2>Activity Log</h2>
                    <LogDisplay logs={logs} />
                </section>
            </div>

            <footer className="footer">
                <div className="footer-content">
                    <p>&copy; 2024 Ticketing System | Designed by Chathuni Sooriyaarachchi</p>
                    <div className="footer-links">
                        <a href="/privacy-policy">Privacy Policy</a> |
                        <a href="/terms-of-service">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
