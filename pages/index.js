import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

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
          client.id === selectedClient.id 
            ? { ...client, schedule: [...client.schedule, selectedDate] }
            : client
        )
      );
      setSelectedClient(null);
      setSelectedDate(null);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="flex items-center mb-4">
        <Image src="/logo.png" alt="AK9 Logo" width={100} height={100} />
        <h1 className="text-xl font-bold ml-4">AK9 CRM - Zarządzanie klientami</h1>
      </div>
      
      <Card className="p-4 my-4">
        <CardContent>
          <h2 className="text-lg font-semibold">Dodaj klienta</h2>
          <Input placeholder="Imię i nazwisko" value={newClient.name} onChange={(e) => setNewClient({ ...newClient, name: e.target.value })} />
          <Input placeholder="Email" value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} />
          <Input placeholder="Rodzaj treningu" value={newClient.training} onChange={(e) => setNewClient({ ...newClient, training: e.target.value })} />
          <Button onClick={addClient} className="mt-2">Dodaj klienta</Button>
        </CardContent>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imię i nazwisko</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Trening</TableHead>
            <TableHead>Płatność</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map(client => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.training}</TableCell>
              <TableCell>
                <Switch checked={client.payment} onCheckedChange={() => togglePayment(client.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Card className="p-4 my-4">
        <CardContent>
          <h2 className="text-lg font-semibold">Dodaj termin treningu</h2>
          <select onChange={(e) => setSelectedClient(clients.find(client => client.id === Number(e.target.value)))}>
            <option value="">Wybierz klienta</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
          <Button onClick={addTrainingDate} className="mt-2">Dodaj termin</Button>
        </CardContent>
      </Card>
    </div>
  );
}
