import { configs } from "@/constants";

const { description, images, pageURL, title } = configs.site;

export function Meta() {
  return (
    <>
      <meta charset="UTF-8" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="icon" type="image/svg+xml" href={images.icon} />
      <meta name="robots" content="index, follow" />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={images.og} />

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:logo" content={images.logo} />
      <meta property="og:image" itemProp="image" content={images.og} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:hegiht" content="300" />
      <meta
        property="og:image:secure_url"
        itemProp="image"
        content={images.og}
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={pageURL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={images.og} />
    </>
  );
}
