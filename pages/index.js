import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import Head from "next/head"; // Poprawny import dla SEO
import Link from "next/link"; // Dla nawigacji
import "../styles/globals.css"; // Upewnij się, że to nie powoduje błędów!

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
      clients.map((client) => (client.id === id ? { ...client, payment: !client.payment } : client))
    );
  };

  const addTrainingDate = () => {
    if (selectedClient && selectedDate) {
      setClients(
        clients.map((client) =>
          client.id === selectedClient.id ? { ...client, schedule: [...client.schedule, selectedDate] } : client
        )
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Meta Dane */}
      <Head>
        <title>AK9 CRM - Zarządzanie Klientami</title>
        <meta name="description" content="Zarządzaj swoimi klientami i treningami." />
      </Head>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image src="/logo.png" alt="AK9 Logo" width={120} height={120} />
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">Witaj w systemie AK9 CRM!</h1>

      {/* Formularz dodawania klienta */}
      <Card>
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Dodaj nowego klienta</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Imię i nazwisko"
              value={newClient.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Rodzaj treningu"
              value={newClient.training}
              onChange={(e) => setNewClient({ ...newClient, training: e.target.value })}
            />
            <div className="flex items-center">
              <Switch
                checked={newClient.payment}
                onCheckedChange={(value) => setNewClient({ ...newClient, payment: value })}
              />
              <span className="ml-2">Płatność</span>
            </div>
          </div>
          <Button className="mt-4 w-full" onClick={addClient}>
            Dodaj Klienta
          </Button>
        </CardContent>
      </Card>

      {/* Tabela Klientów */}
      <Card className="mt-6">
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Lista Klientów</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Imię i nazwisko</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Trening</TableCell>
                <TableCell>Płatność</TableCell>
                <TableCell>Akcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.training}</TableCell>
                  <TableCell>
                    <Switch checked={client.payment} onCheckedChange={() => togglePayment(client.id)} />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => setSelectedClient(client)}>Dodaj Termin</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Kalendarz do dodawania terminów */}
      {selectedClient && (
        <Card className="mt-6">
          <CardContent>
            <h2 className="text-lg font-bold mb-4">Dodaj Termin Treningu</h2>
            <Calendar onSelect={setSelectedDate} />
            <Button className="mt-4 w-full" onClick={addTrainingDate}>
              Zapisz Termin
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Przycisk do strony głównej */}
      <div className="flex justify-center mt-6">
        <Link href="/">
          <Button className="text-center">Strona Główna</Button>
        </Link>
      </div>
    </div>
  );
}
