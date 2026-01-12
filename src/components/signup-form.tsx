"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Only @gmail.com addresses are allowed.",
    }),
});

const WEBHOOK_URL = "https://rantwilson.app.n8n.cloud/webhook/8846998e-65c6-408d-a873-f4199ffc04b2";

export function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // In a real application, you would make the fetch request here.
      // Example:
      // const response = await fetch(WEBHOOK_URL, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(values),
      // });
      // if (!response.ok) throw new Error('Network response was not ok.');
      
      console.log("Form submitted successfully with values:", values);
      console.log(`In a real app, this data would be sent to: ${WEBHOOK_URL}`);
      
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (isSuccess) {
    return (
      <Card className="w-full max-w-md animate-in fade-in-50">
        <CardContent className="p-10 text-center flex flex-col items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground">
            You've been successfully signed up.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-lg animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Join Us</CardTitle>
        <CardDescription className="text-center text-muted-foreground pt-1">
          Sign up with your Gmail account to get notified.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gmail Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.name@gmail.com"
                      {...field}
                      className="transition-colors duration-300"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full transition-all duration-300" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
