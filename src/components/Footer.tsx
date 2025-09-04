import { Github } from 'lucide-react';
import { Link } from 'react-router-dom';
export function Footer() {
  const footerLinks = [
    'Terms', 'Privacy', 'Security', 'Status', 'Docs', 'Contact', 'Pricing', 'API', 'Training', 'Blog', 'About'
  ];
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <Link to="/" className="hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
          </Link>
          <span>© {new Date().getFullYear()} CodeHarbor, Inc.</span>
          <span>Built with ❤️ at Cloudflare</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {footerLinks.map((link) => (
            <a key={link} href="#" className="hover:text-primary hover:underline transition-colors">
              {link}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}