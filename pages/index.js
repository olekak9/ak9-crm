import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import "../styles/globals.css";

export default function FitnessCRM() {
  const [clients, setClients] = useState([
    { id: 1, name: "Jan Kowalski", email: "jan@example.com", training: "Siłowy", payment: false, schedule: [] },
    { id: 2, name: "Anna Nowak", email: "anna@example.com", training: "Kardio", payment: true, schedule: [] },
  ]);

  const [newClient, setNewClient] = useState({ name: "", email: "", training: "", payment: false, schedule: [] });
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const addClient = () => {
    setClients([...clients, { ...newClient, id: clients.length + 1 }]);
    setNewClient({ name: "", email: "", training: "", payment: false, schedule: [] });
  };

  const togglePayment = (id) => {
    setClients(
      clients.map(client => client.id === id ? { ...client, payment: !client.payment } : client)
    );
  };

  const addTrainingDate = () => {
    if (selectedClient && selectedDate) {
      setClients(
        clients.map(client =>
          client.id === selectedClient
            ? { ...client, schedule: [...client.schedule, selectedDate] }
            : client
        )
      );
      setSelectedDate(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <Card className="w-full max-w-4xl">
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Image src="/logo.png" alt="AK9 Logo" width={100} height={50} />
            <h1 className="text-2xl font-bold">AK9 CRM - Zarządzanie klientami</h1>
          </div>

          {/* Dodawanie nowego klienta */}
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-xl font-semibold">Dodaj nowego klienta</h2>
            <
