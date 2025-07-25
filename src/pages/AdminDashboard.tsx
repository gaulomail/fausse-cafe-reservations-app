import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useApi } from "@/hooks/useApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription 
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Calendar, 
  Clock, 
  Users, 
  Star, 
  Trophy, 
  Utensils, 
  Image, 
  Plus, 
  Edit, 
  Trash2, 
  Download, 
  Upload, 
  Eye, 
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  BarChart3,
  FileText,
  MessageSquare,
  Palette,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import HeroBookingForm, { handleDownloadPDF } from "@/components/HeroBookingForm";

const ADMIN_EMAILS = ["admin@cafefausse.com"];

export default function AdminDashboard() {
  const { user, loading, role, signOut } = useAuth();
  const { toast } = useToast();
  
  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Reservations
  const [reservations, setReservations] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ date: '', status: '' });
  const [editReservation, setEditReservation] = useState<any | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<any | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [cancelLoadingId, setCancelLoadingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReservations, setTotalReservations] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelTarget, setCancelTarget] = useState<any | null>(null);
  const [cancelError, setCancelError] = useState("");
  
  // Testimonials
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(false);
  const [testimonialError, setTestimonialError] = useState("");
  const [showTestimonialModal, setShowTestimonialModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<any>({ 
    title: '', 
    comment: '', 
    rating: 5, 
    customer_name: '', 
    is_approved: false 
  });
  
  // Awards
  const [awards, setAwards] = useState<any[]>([]);
  const [awardsLoading, setAwardsLoading] = useState(false);
  const [awardsError, setAwardsError] = useState("");
  const [showAwardModal, setShowAwardModal] = useState(false);
  const [editingAward, setEditingAward] = useState<any | null>(null);
  const [awardForm, setAwardForm] = useState<any>({ 
    name: '', 
    description: '', 
    year: '', 
    category: '', 
    is_featured: false, 
    display_order: 1 
  });
  
  // Menu Categories
  const [menuCategories, setMenuCategories] = useState<any[]>([]);
  const [menuCategoriesLoading, setMenuCategoriesLoading] = useState(false);
  const [menuCategoriesError, setMenuCategoriesError] = useState("");
  const [showMenuCategoryModal, setShowMenuCategoryModal] = useState(false);
  const [editingMenuCategory, setEditingMenuCategory] = useState<any | null>(null);
  const [menuCategoryForm, setMenuCategoryForm] = useState<any>({ 
    name: '', 
    description: '', 
    display_order: 1, 
    is_active: true, 
    icon: '' 
  });
  
  // Menu Items
  const [menuWithItems, setMenuWithItems] = useState<any[]>([]);
  const [menuItemsLoading, setMenuItemsLoading] = useState(false);
  const [menuItemsError, setMenuItemsError] = useState("");
  const [showMenuItemModal, setShowMenuItemModal] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<any | null>(null);
  const [menuItemForm, setMenuItemForm] = useState<any>({ 
    name: '', 
    description: '', 
    price: '', 
    category_id: '', 
    is_vegetarian: false, 
    is_gluten_free: false, 
    is_spicy: false, 
    is_active: true 
  });
  
  // Gallery Images
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState("");
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [editingGalleryImage, setEditingGalleryImage] = useState<any | null>(null);
  const [galleryForm, setGalleryForm] = useState<any>({ 
    url: '', 
    alt: '', 
    category: '', 
    display_order: 0, 
    is_active: true 
  });
  const [uploadMethod, setUploadMethod] = useState<'url' | 'file'>('url');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // API hooks
  const { 
    getAllReservationsWithCustomers, 
    updateReservation, 
    cancelReservation,
    getAllTestimonialsAdmin, 
    approveTestimonial,
    getAllAwards, 
    createAward, 
    updateAward,
    getMenuCategories, 
    createMenuCategory, 
    updateMenuCategory, 
    getMenuWithItems, 
    createMenuItem, 
    updateMenuItem,
    getGalleryImages, 
    createGalleryImage, 
    updateGalleryImage, 
    deleteGalleryImage 
  } = useApi();

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        // Convert to data URL for preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setGalleryForm(prev => ({ ...prev, url: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
      } else {
        toast({ 
          title: "Invalid file type", 
          description: "Please select an image file.", 
          variant: "destructive" 
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setGalleryForm(prev => ({ ...prev, url: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
      } else {
        toast({ 
          title: "Invalid file type", 
          description: "Please select an image file.", 
          variant: "destructive" 
        });
      }
    }
  };

  // Load data effects
  useEffect(() => {
    if (!user || role !== 'admin') return;
    loadDashboardData();
  }, [user, role, currentPage]);

  const loadDashboardData = async () => {
    setFetching(true);
    try {
      const response = await getAllReservationsWithCustomers(currentPage);
      if (response.error) {
        setError("Failed to fetch reservations.");
      } else {
        if (Array.isArray(response.reservations)) {
          setReservations(response.reservations);
          setCurrentPage(response.current_page || 1);
          setTotalPages(response.pages || 1);
          setTotalReservations(response.total || response.reservations.length);
        } else {
          setReservations([]);
          setCurrentPage(1);
          setTotalPages(1);
          setTotalReservations(0);
        }
        setError("");
      }
    } catch (err) {
      setError("Failed to fetch reservations.");
    } finally {
      setFetching(false);
    }
  };

  // Gallery handlers
  const handleAddGalleryImage = () => {
    setEditingGalleryImage(null);
    setGalleryForm({ url: '', alt: '', category: '', display_order: 0, is_active: true });
    setSelectedFile(null);
    setUploadMethod('url');
    setShowGalleryModal(true);
  };

  const handleEditGalleryImage = (img: any) => {
    setEditingGalleryImage(img);
    setGalleryForm({ ...img });
    setSelectedFile(null);
    setUploadMethod('url');
    setShowGalleryModal(true);
  };

  const handleGalleryFormChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setGalleryForm((f: any) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleGalleryFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (editingGalleryImage) {
        await updateGalleryImage(editingGalleryImage.id, galleryForm);
      } else {
        await createGalleryImage(galleryForm);
      }
      setShowGalleryModal(false);
      setEditingGalleryImage(null);
      setGalleryForm({ url: '', alt: '', category: '', display_order: 0, is_active: true });
      setSelectedFile(null);
      toast({ title: 'Gallery image saved', description: 'Gallery image has been saved successfully.' });
      // Reload gallery images
      const data = await getGalleryImages();
      setGalleryImages(data);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to save gallery image', variant: 'destructive' });
    }
  };

  const handleDeleteGalleryImage = async (img: any) => {
    try {
      await deleteGalleryImage(img.id);
      setGalleryImages(galleryImages.filter((g: any) => g.id !== img.id));
      toast({ title: 'Gallery image deleted' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to delete gallery image', variant: 'destructive' });
    }
  };

  // Load gallery images
  useEffect(() => {
    if (activeTab === 'gallery') {
      setGalleryLoading(true);
      getGalleryImages()
        .then(data => setGalleryImages(data))
        .catch(e => setGalleryError(e.message || 'Failed to load gallery images'))
        .finally(() => setGalleryLoading(false));
    }
  }, [activeTab]);

  // Other handlers (simplified for brevity)
  const handleCancel = (reservation: any) => {
    setCancelTarget(reservation);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!cancelTarget) return;
    setCancelLoadingId(cancelTarget.id);
    try {
      await cancelReservation(cancelTarget.id);
      setReservations(reservations.filter(r => r.id !== cancelTarget.id));
      setShowCancelModal(false);
      setCancelTarget(null);
      toast({ title: 'Reservation cancelled' });
    } catch (err: any) {
      setCancelError(err.message || 'Failed to cancel reservation');
    } finally {
      setCancelLoadingId(null);
    }
  };

  const handleEdit = (reservation: any) => {
    setEditReservation(reservation);
    setEditForm({ ...reservation });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    if (!editReservation || !editForm) return;
    setEditLoading(true);
    try {
      await updateReservation(editReservation.id, editForm);
      setReservations(reservations.map(r => r.id === editReservation.id ? { ...r, ...editForm } : r));
      setShowEditModal(false);
      setEditReservation(null);
      setEditForm(null);
      toast({ title: 'Reservation updated' });
    } catch (err: any) {
      toast({ title: 'Error', description: err.message || 'Failed to update reservation', variant: 'destructive' });
    } finally {
      setEditLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const stats = {
    totalReservations,
    pendingReservations: reservations.filter(r => r.status === 'pending').length,
    todayReservations: reservations.filter(r => {
      const today = new Date().toISOString().split('T')[0];
      return r.date === today;
    }).length,
    totalTestimonials: testimonials.length,
    totalAwards: awards.length,
    totalMenuItems: menuWithItems.reduce((acc, cat) => acc + cat.items.length, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h1 className="text-xl font-bold text-slate-800">Admin Dashboard</h1>
              <p className="text-sm text-slate-500">Café Fausse</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "overview" 
                  ? "bg-primary-50 text-primary-700 border border-primary-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("reservations")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "reservations" 
                  ? "bg-primary-50 text-primary-700 border border-primary-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Reservations</span>
            </button>

            <button
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "testimonials" 
                  ? "bg-primary-50 text-primary-700 border border-primary-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Testimonials</span>
            </button>

            <button
              onClick={() => setActiveTab("awards")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "awards" 
                  ? "bg-primary-50 text-primary-700 border border-primary-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Trophy className="h-5 w-5" />
              <span>Awards</span>
            </button>

            <button
              onClick={() => setActiveTab("menu")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "menu" 
                  ? "bg-primary-50 text-primary-700 border border-primary-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Utensils className="h-5 w-5" />
              <span>Menu</span>
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "gallery" 
                  ? "bg-primary-50 text-primary-700 border border-primary-200" 
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Image className="h-5 w-5" />
              <span>Gallery</span>
            </button>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-600">
              <Users className="h-4 w-4" />
              <span>{user.email}</span>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-bold text-slate-800 capitalize">
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "reservations" && "Reservations"}
              {activeTab === "testimonials" && "Testimonials"}
              {activeTab === "awards" && "Awards"}
              {activeTab === "menu" && "Menu Management"}
              {activeTab === "gallery" && "Gallery Management"}
            </h2>
            <div className="w-8 lg:hidden"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600">Total Reservations</p>
                        <p className="text-2xl font-bold text-blue-800">{stats.totalReservations}</p>
                      </div>
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-600">Pending</p>
                        <p className="text-2xl font-bold text-yellow-800">{stats.pendingReservations}</p>
                      </div>
                      <Clock className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600">Today</p>
                        <p className="text-2xl font-bold text-green-800">{stats.todayReservations}</p>
                      </div>
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600">Testimonials</p>
                        <p className="text-2xl font-bold text-purple-800">{stats.totalTestimonials}</p>
                      </div>
                      <MessageSquare className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600">Awards</p>
                        <p className="text-2xl font-bold text-orange-800">{stats.totalAwards}</p>
                      </div>
                      <Trophy className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-red-600">Menu Items</p>
                        <p className="text-2xl font-bold text-red-800">{stats.totalMenuItems}</p>
                      </div>
                      <Utensils className="h-8 w-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button 
                      onClick={() => setActiveTab("reservations")}
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                    >
                      <Calendar className="h-6 w-6" />
                      <span>Manage Reservations</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("testimonials")}
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    >
                      <MessageSquare className="h-6 w-6" />
                      <span>Review Testimonials</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("menu")}
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                    >
                      <Utensils className="h-6 w-6" />
                      <span>Update Menu</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveTab("gallery")}
                      className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <Image className="h-6 w-6" />
                      <span>Manage Gallery</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === "gallery" && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Gallery Images</CardTitle>
                  <Button onClick={handleAddGalleryImage} className="bg-primary-600 hover:bg-primary-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </CardHeader>
                <CardContent>
                  {galleryLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                      <span className="ml-3 text-slate-600">Loading gallery images...</span>
                    </div>
                  ) : galleryError ? (
                    <div className="text-center py-12">
                      <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                      <p className="text-red-600">{galleryError}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {galleryImages.map((img) => (
                        <Card key={img.id} className="overflow-hidden group">
                          <div className="relative aspect-square">
                            <img 
                              src={img.url} 
                              alt={img.alt} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  onClick={() => handleEditGalleryImage(img)}
                                  className="bg-white/90 hover:bg-white"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleDeleteGalleryImage(img)}
                                  className="bg-red-500/90 hover:bg-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {!img.is_active && (
                              <Badge variant="secondary" className="absolute top-2 left-2">
                                <EyeOff className="h-3 w-3 mr-1" />
                                Inactive
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-slate-800 mb-1">{img.alt}</h3>
                            <p className="text-sm text-slate-500 mb-2">{img.category}</p>
                            <div className="flex items-center justify-between text-xs text-slate-400">
                              <span>Order: {img.display_order}</span>
                              <span>{img.is_active ? 'Active' : 'Inactive'}</span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Gallery Modal */}
          <Dialog open={showGalleryModal} onOpenChange={setShowGalleryModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingGalleryImage ? 'Edit Gallery Image' : 'Add Gallery Image'}
                </DialogTitle>
                <DialogDescription>
                  Upload an image or provide a URL to add it to the gallery.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleGalleryFormSubmit} className="space-y-6">
                {/* Upload Method Toggle */}
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant={uploadMethod === 'url' ? 'default' : 'outline'}
                    onClick={() => setUploadMethod('url')}
                    className="flex-1"
                  >
                    Image URL
                  </Button>
                  <Button
                    type="button"
                    variant={uploadMethod === 'file' ? 'default' : 'outline'}
                    onClick={() => setUploadMethod('file')}
                    className="flex-1"
                  >
                    File Upload
                  </Button>
                </div>

                {/* URL Input */}
                {uploadMethod === 'url' && (
                  <div className="space-y-2">
                    <Label htmlFor="url">Image URL</Label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      value={galleryForm.url}
                      onChange={handleGalleryFormChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    {galleryForm.url && (
                      <div className="mt-2">
                        <Label>Preview</Label>
                        <img 
                          src={galleryForm.url} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* File Upload */}
                {uploadMethod === 'file' && (
                  <div className="space-y-2">
                    <Label>Upload Image</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive 
                          ? 'border-primary-500 bg-primary-50' 
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">
                        Drag and drop an image here, or click to select
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                    {selectedFile && (
                      <div className="mt-2">
                        <Label>Selected File</Label>
                        <p className="text-sm text-slate-600">{selectedFile.name}</p>
                        <img 
                          src={galleryForm.url} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border mt-2"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="alt">Alt Text</Label>
                    <Input
                      id="alt"
                      name="alt"
                      value={galleryForm.alt}
                      onChange={handleGalleryFormChange}
                      placeholder="Description of the image"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      name="category"
                      value={galleryForm.category}
                      onChange={handleGalleryFormChange}
                      placeholder="e.g., Food, Interior, Events"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="display_order">Display Order</Label>
                    <Input
                      id="display_order"
                      name="display_order"
                      type="number"
                      value={galleryForm.display_order}
                      onChange={handleGalleryFormChange}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <Checkbox
                        name="is_active"
                        checked={galleryForm.is_active}
                        onCheckedChange={(checked) => 
                          setGalleryForm(prev => ({ ...prev, is_active: checked as boolean }))
                        }
                      />
                      <span>Active</span>
                    </Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setShowGalleryModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                    {editingGalleryImage ? 'Update' : 'Add'} Image
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Cancel Reservation Modal */}
          <AlertDialog open={showCancelModal} onOpenChange={setShowCancelModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Reservation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this reservation? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmCancel} className="bg-red-600 hover:bg-red-700">
                  {cancelLoadingId === cancelTarget?.id ? 'Cancelling...' : 'Yes, Cancel'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Edit Reservation Modal */}
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Reservation</DialogTitle>
              </DialogHeader>
              {editForm && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={editForm.date || ''}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={editForm.time || ''}
                        onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Party Size</Label>
                      <Input
                        type="number"
                        value={editForm.party_size || editForm.number_of_guests || ''}
                        onChange={(e) => setEditForm({ 
                          ...editForm, 
                          party_size: e.target.value,
                          number_of_guests: e.target.value 
                        })}
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select
                        value={editForm.status || ''}
                        onValueChange={(value) => setEditForm({ ...editForm, status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEditSave} disabled={editLoading}>
                  {editLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}