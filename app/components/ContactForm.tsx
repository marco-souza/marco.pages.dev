import type { FC } from "hono/jsx";

interface ContactFormProps {
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
  values: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export const ContactForm: FC<ContactFormProps> = ({ errors, values }) => {
  return (
    <div class="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-md">
      <h1 class="text-3xl font-bold text-center mb-4">
        Let's grab a Coffee ☕️
      </h1>

      <p class="text-center text-gray-500">
        Have a question or want to work together? Send me a message!
      </p>

      <form method="post">
        <div class="my-8">
          <label htmlFor="name" class="block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={values.name}
            class={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            placeholder="Your Name"
          />
          {errors.name && (
            <p class="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div class="mb-4">
          <label htmlFor="email" class="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            class={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
            placeholder="Your Email"
          />
          {errors.email && (
            <p class="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div class="mb-4">
          <label htmlFor="message" class="block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            class={`textarea textarea-bordered w-full ${errors.message ? "textarea-error" : ""}`}
            placeholder="Your Message"
          >
            {values.message}
          </textarea>
          {errors.message && (
            <p class="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        <button type="submit" class="btn btn-primary w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

interface SuccessFormProps {
  message: string;
}

export const ContactFormSuccess: FC<SuccessFormProps> = ({ message }) => {
  return (
    <div class="max-w-md mx-auto mt-10 p-6 bg-green-100 rounded-lg ">
      <h2 class="text-2xl font-bold text-center mb-4 text-green-800">
        Message sent! 🎉
      </h2>
      <p class="text-center text-green-700">{message}</p>
      <div class="flex justify-center mt-4">
        <a href="/" class="btn btn-outline btn-success">
          Go Home
        </a>
      </div>
    </div>
  );
};
