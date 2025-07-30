import { Hono } from "hono";
import { z } from "zod";
import { ContactForm, ContactFormSuccess } from "@/components/ContactForm";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get("/", async (c) => {
  const values = {};
  const errors = {};
  return c.render(<ContactForm values={values} errors={errors} />);
});

const ContactDataValidator = z.object({
  name: z.string().nonempty("Name is required").min(3, "Name is too short"),
  email: z
    .email("Invalid email address")
    .transform((email) => email.replace(/\+.*@/g, "@")),
  message: z
    .string()
    .nonempty("Message is required")
    .min(10, "Message is too short (min 10 characters)"),
});

// receive user email, name and message
app.post(
  "/",
  // TODO: validate for data
  // zValidator("form", ContactDataValidator),
  async (c) => {
    const body = await c.req.parseBody();
    const data = ContactDataValidator.safeParse(body);

    if (!data.success) {
      const errors = {
        name: "",
        email: "",
        message: "",
      };

      for (const err of data.error.issues) {
        if (err) {
          if (err.path.includes("name")) {
            errors.name = err.message;
          }

          if (err.path.includes("email")) {
            errors.email = err.message;
          }

          if (err.path.includes("message")) {
            errors.message = err.message;
          }
        }
      }

      return c.render(<ContactForm values={body} errors={errors} />);
    }

    // persist email
    await c.env.EMAIL.put(data.data.email, JSON.stringify(data.data));

    return c.redirect("/contact/success");
  },
);

app.get("/success", async (c) => {
  return c.render(
    <ContactFormSuccess message="I'll take a look and reach you back soon! ☕" />,
  );
});

export default app;
