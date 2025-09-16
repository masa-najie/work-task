import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import React from "react";
import { Payment } from "./payments";
const formSchema = z.object({
  status: z.string().min(1, "status required"),
  email: z.string().email(),
  amount: z.number().min(1, "amount required"),
  id: z.string(),
});
export default function EditDataSheet({
  item,
  onSave,
}: {
  item: Payment;
  onSave: (updated: Payment) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: item.id,
      status: item.status,
      email: item.email,
      amount: item.amount,
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onSave({ ...values });
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-5">
        <SheetHeader>
          <SheetTitle>Edit Payment</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form className="space-y-7" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="example@email.com"
                      {...field}
                      className="bg-white/70 shadow-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-white/70 shadow-lg"
                      placeholder="status"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="bg-white/70 shadow-lg"
                      placeholder="amount"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit" className="bg-blue-950 shadow-lg">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
