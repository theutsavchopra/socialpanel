import { Link } from "react-router-dom";

const links = {
  Services: [
    { label: "Buy Views", href: "/packages" },
    { label: "Premium Views", href: "/packages?type=premium" },
    { label: "Targeted Views", href: "/packages?type=geo" },
    { label: "Custom Packages", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact Us", href: "/contact" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/#faq" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Testimonials", href: "/#testimonials" },
  ],
};

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
      {Object.entries(links).map(([title, items]) => (
        <div key={title}>
          <h3 className="font-outfit text-lg font-semibold text-white mb-4">
            {title}
          </h3>
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
