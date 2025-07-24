import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useApi } from "@/hooks/useApi";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const { toast } = useToast();
  const { newsletterSignup } = useApi();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.match(/^\S+@\S+\.\S+$/)) {
      toast({ title: "Invalid Email", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }
    setNewsletterLoading(true);
    
    try {
      const response = await newsletterSignup(newsletterEmail, 'Newsletter Signup');
      
      if (response.error) {
        toast({ title: "Error", description: "Failed to sign up for newsletter.", variant: "destructive" });
      } else {
        toast({ title: "Success!", description: "You've been signed up for our newsletter." });
        setNewsletterEmail("");
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to sign up for newsletter.", variant: "destructive" });
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 py-12 md:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 md:mb-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary-400">Café Fausse</h3>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Exceptional dining experiences since 2010. We blend traditional flavors 
              with modern culinary innovation to create unforgettable moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-white transition-all">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Quick Links</h4>
            <div className="space-y-3">
              <Link to="/menu" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Menu
              </Link>
              <Link to="/reservations" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Reservations
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-primary-400 transition-colors">
                About Us
              </Link>
              <Link to="/gallery" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Gallery
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-primary-400 transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Contact
              </Link>
              <Link to="/policies" className="block text-gray-300 hover:text-primary-400 transition-colors">
                Policies
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <p>📍 123 Culinary Street<br />Food District, FD 12345</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@cafefausse.com</p>
              <p>🕒 Tue-Sun: 12PM-10PM<br />Closed Mondays</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 Café Fausse. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              <Link to="/policies" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/policies" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-100 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto md:mx-0">
            <input
              type="email"
              value={newsletterEmail}
              onChange={e => setNewsletterEmail(e.target.value)}
              placeholder="Sign up for our newsletter"
              className="px-4 py-2 rounded-lg border border-primary-200 focus:border-primary-500 focus:ring-primary-500 w-full"
              required
            />
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300"
              disabled={newsletterLoading}
            >
              {newsletterLoading ? 'Signing up...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;