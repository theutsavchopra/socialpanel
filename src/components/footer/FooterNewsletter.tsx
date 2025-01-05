import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function FooterNewsletter() {
  return (
    <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <div>
        <h3 className="font-outfit text-2xl font-semibold text-white mb-4">
          Get Exclusive Updates
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">
          Join our newsletter and receive expert tips, industry insights, and 
          exclusive promotions to help grow your YouTube channel.
        </p>
      </div>

      {/* Form */}
      <div className="lg:justify-self-end w-full lg:w-[420px]">
        <form 
          className="relative flex gap-2 p-1 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
          onSubmit={(e) => e.preventDefault()}
        >
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="border-0 bg-transparent text-white placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button className="bg-red-500 hover:bg-red-600 text-white font-medium px-6">
            Subscribe
          </Button>
        </form>
        <p className="text-gray-500 text-sm mt-2">
          No spam ever. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
