"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  email: z.string().min(1, "Email est requis").email("Email invalide"),
  password: z
    .string()
    .min(1, "Mot de passe requis")
    .min(8, "Le mot de passe doit avoir 8 caractères minimum"),
});

const SignInForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      toast.error("Erreur : Identifiants incorrects"); // Affiche une alerte d'erreur
    } else {
      toast.success("Connexion réussie !"); // Affiche un message de succès
      router.refresh();
      router.push("/profil/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="8 caractères minimum"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full mt-6" type="submit">
          Se connecter
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-2">
        Vous n'avez pas de compte ? &nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-up">
          Inscrivez-vous !
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;