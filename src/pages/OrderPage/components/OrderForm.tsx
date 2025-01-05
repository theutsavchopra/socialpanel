import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Link2, Mail } from 'lucide-react';
import { orderSchema, type OrderFormValues } from '@/lib/validations/order';

interface OrderFormProps {
  onSubmit: (data: OrderFormValues) => void;
  price: number;
}

export default function OrderForm({ onSubmit, price }: OrderFormProps) {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      videoUrl: '',
      email: '',
    },
  });

  const handleSubmit = (data: OrderFormValues) => {
    // Clean up the URL before submitting
    const cleanUrl = data.videoUrl.trim();
    onSubmit({
      ...data,
      videoUrl: cleanUrl,
      email: data.email.trim().toLowerCase(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">YouTube Video URL</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="https://youtube.com/watch?v=..." 
                    className="pl-10"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.trim();
                      field.onChange(value);
                    }}
                  />
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type="email"
                    placeholder="your@email.com" 
                    className="pl-10"
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.trim().toLowerCase();
                      field.onChange(value);
                    }}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-lg py-6">
          Continue to Payment - ${price.toFixed(2)}
        </Button>
      </form>
    </Form>
  );
}
