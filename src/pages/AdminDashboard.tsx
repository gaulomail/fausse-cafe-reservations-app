import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil, XCircle, Download, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState as useReactState } from "react";

const ADMIN_EMAILS = [
  "admin@cafefausse.com"
];

export default function AdminDashboard() {
  const { user, loading, role, signOut } = useAuth();
  const [reservations, setReservations] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ date: '', status: '' });
  const [editReservation, setEditReservation] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [cancelLoadingId, setCancelLoadingId] = useState<string | null>(null);
  const { toast } = useToast();
  const [menuOpen, setMenuOpen] = useReactState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { getAllReservationsWithCustomers, updateReservation, cancelReservation } = useApi();

  // Close menu on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [menuOpen]);

  useEffect(() => {
    if (!user || role !== 'admin') return;
    
    async function fetchAllReservations() {
      setFetching(true);
      setError("");
      
      try {
        const response = await getAllReservationsWithCustomers();
        
        if (response.error) {
          setError("Failed to fetch reservations.");
        } else {
          setReservations(response.reservations || []);
        }
      } catch (error) {
        setError("Failed to fetch reservations.");
        console.error("Error fetching reservations:", error);
      } finally {
        setFetching(false);
      }
    }
    
    fetchAllReservations();
  }, [user, role, getAllReservationsWithCustomers]);

  // Filtered reservations
  const filteredReservations = reservations.filter(r => {
    const matchDate = filter.date ? r.reservation_date === filter.date : true;
    const matchStatus = filter.status ? r.status === filter.status : true;
    return matchDate && matchStatus;
  });

  // Export to CSV
  const exportCSV = () => {
    const headers = [
      'Date', 'Time', 'Guests', 'Table', 'Status', 'Name', 'Email'
    ];
    const rows = filteredReservations.map(r => [
      r.reservation_date,
      r.reservation_time,
      r.number_of_guests,
      r.table_number,
      r.status,
      r.customers?.name || '-',
      r.customers?.email || '-'
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reservations.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Cancel reservation
  const handleCancel = async (id: string) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;
    
    setCancelLoadingId(id);
    
    try {
      const response = await updateReservation(id, { status: 'cancelled' });
      
      if (response.error) {
        toast({ title: 'Error', description: 'Failed to cancel reservation.', variant: 'destructive' });
      } else {
        setReservations(reservations => reservations.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
        toast({ title: 'Reservation Cancelled', description: 'The reservation has been cancelled.' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to cancel reservation.', variant: 'destructive' });
    } finally {
      setCancelLoadingId(null);
    }
  };

  // Edit reservation (open modal with form)
  const handleEdit = (reservation: any) => {
    setEditReservation(reservation);
    setEditForm({
      number_of_guests: reservation.number_of_guests,
      reservation_date: reservation.reservation_date,
      reservation_time: reservation.reservation_time,
      table_number: reservation.table_number,
      status: reservation.status || 'confirmed',
    });
    setShowEditModal(true);
  };

  // Save edit
  const handleEditSave = async () => {
    if (!editReservation) return;
    
    setEditLoading(true);
    
    try {
      const response = await updateReservation(editReservation.id, {
        number_of_guests: editForm.number_of_guests,
        reservation_date: editForm.reservation_date,
        reservation_time: editForm.reservation_time,
        table_number: editForm.table_number,
        status: editForm.status,
      });
      
      if (response.error) {
        toast({ title: 'Error', description: 'Failed to update reservation.', variant: 'destructive' });
      } else {
        setReservations(reservations => reservations.map(r => r.id === editReservation.id ? { ...r, ...editForm } : r));
        setShowEditModal(false);
        toast({ title: 'Reservation Updated', description: 'The reservation has been updated.' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update reservation.', variant: 'destructive' });
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) return null;
  if (!user || role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-50 px-4">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle className="text-primary-700 text-2xl font-bold">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-700 mb-6">You must be an admin to view this page.</div>
            <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg">
              <Link to="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4 relative">
          <div ref={menuRef} className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-primary-200 shadow-sm hover:bg-primary-50 transition-all"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary-600 text-white font-bold text-lg">
                {user?.email ? user.email[0].toUpperCase() : <User className="w-5 h-5" />}
              </span>
              <span className="hidden sm:block text-primary-700 font-medium text-sm">{user?.email}</span>
              <svg className="w-4 h-4 ml-1 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-primary-100 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-primary-50">
                  <div className="font-semibold text-primary-700">{user?.email}</div>
                  <div className="text-xs text-primary-400">Admin</div>
                </div>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-primary-50 text-primary-700 font-medium rounded-b-lg"
                  onClick={() => { setMenuOpen(false); signOut(); }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-primary-700 text-2xl font-bold flex items-center justify-between">
              <span>All Reservations</span>
              <Button onClick={exportCSV} variant="outline" className="ml-4 flex items-center gap-2">
                <Download className="w-4 h-4" /> Export CSV
              </Button>
            </CardTitle>
            <div className="flex flex-wrap gap-4 mt-4">
              <input
                type="date"
                value={filter.date}
                onChange={e => setFilter(f => ({ ...f, date: e.target.value }))}
                className="border rounded px-3 py-2"
                placeholder="Filter by date"
              />
              <select
                value={filter.status}
                onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}
                className="border rounded px-3 py-2"
              >
                <option value="">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            {fetching ? (
              <div className="text-center py-8 text-gray-600">Loading reservations...</div>
            ) : error ? (
              <div className="text-center py-8 text-red-600 font-medium">{error}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm md:text-base">
                  <thead>
                    <tr className="bg-primary-100 text-primary-700">
                      <th className="px-4 py-2 border">Date</th>
                      <th className="px-4 py-2 border">Time</th>
                      <th className="px-4 py-2 border">Guests</th>
                      <th className="px-4 py-2 border">Table</th>
                      <th className="px-4 py-2 border">Status</th>
                      <th className="px-4 py-2 border">Name</th>
                      <th className="px-4 py-2 border">Email</th>
                      <th className="px-4 py-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((r) => (
                      <tr key={r.id} className="border-b hover:bg-primary-50 transition-colors">
                        <td className="px-4 py-2 border">{r.reservation_date}</td>
                        <td className="px-4 py-2 border">{r.reservation_time}</td>
                        <td className="px-4 py-2 border">{r.number_of_guests}</td>
                        <td className="px-4 py-2 border">{r.table_number}</td>
                        <td className="px-4 py-2 border capitalize">{r.status}</td>
                        <td className="px-4 py-2 border">{r.customers?.name || "-"}</td>
                        <td className="px-4 py-2 border">{r.customers?.email || "-"}</td>
                        <td className="px-4 py-2 border flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(r)} className="px-2 py-1"><Pencil className="w-4 h-4" /></Button>
                          <Button size="sm" variant="destructive" onClick={() => handleCancel(r.id)} className="px-2 py-1" disabled={cancelLoadingId === r.id}>
                            {cancelLoadingId === r.id ? <span className="animate-spin w-4 h-4 border-b-2 border-white rounded-full"></span> : <XCircle className="w-4 h-4" />}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredReservations.length === 0 && (
                  <div className="text-center py-8 text-gray-600">No reservations found.</div>
                )}
              </div>
            )}
            {/* Edit Modal */}
            {showEditModal && editReservation && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                  <h2 className="text-xl font-bold mb-4">Edit Reservation</h2>
                  <form onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
                    <div className="mb-4 space-y-2">
                      <label className="block font-medium">Number of Guests</label>
                      <input type="number" min={1} value={editForm.number_of_guests} onChange={e => setEditForm(f => ({ ...f, number_of_guests: Number(e.target.value) }))} className="border rounded px-3 py-2 w-full" required />
                      <label className="block font-medium">Date</label>
                      <input type="date" value={editForm.reservation_date} onChange={e => setEditForm(f => ({ ...f, reservation_date: e.target.value }))} className="border rounded px-3 py-2 w-full" required />
                      <label className="block font-medium">Time</label>
                      <input type="time" value={editForm.reservation_time} onChange={e => setEditForm(f => ({ ...f, reservation_time: e.target.value }))} className="border rounded px-3 py-2 w-full" required />
                      <label className="block font-medium">Table Number</label>
                      <input type="number" min={1} value={editForm.table_number} onChange={e => setEditForm(f => ({ ...f, table_number: Number(e.target.value) }))} className="border rounded px-3 py-2 w-full" required />
                      <label className="block font-medium">Status</label>
                      <select value={editForm.status} onChange={e => setEditForm(f => ({ ...f, status: e.target.value }))} className="border rounded px-3 py-2 w-full">
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
                      <Button type="submit" disabled={editLoading}>{editLoading ? 'Saving...' : 'Save'}</Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}