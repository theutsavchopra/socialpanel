import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const socials = [
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Mail, href: "#", label: "Email" },
];

export default function FooterSocials() {
  return (
    <div className="flex gap-4">
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-red-500/20 
                     flex items-center justify-center group transition-all duration-200
                     border border-white/5 hover:border-red-500/20"
          aria-label={label}
        >
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
        </a>
      ))}
    </div>
  );
}
