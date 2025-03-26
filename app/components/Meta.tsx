import { configs } from "@/constants";

const { description, images, pageURL, title } = configs.site;

export function Meta() {
  const ogImagePath = `${pageURL}${images.og}`;
  const logoImagePath = `${pageURL}${images.logo}`;
  const iconImagePath = `${pageURL}${images.icon}`;
  return (
    <>
      <meta charset="UTF-8" />

      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="icon" type="image/svg+xml" href={iconImagePath} />
      <meta name="robots" content="index, follow" />

      {/* Google / Search Engine Tags */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={ogImagePath} />

      {/* Facebook Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:logo" content={logoImagePath} />
      <meta property="og:image" itemProp="image" content={ogImagePath} />
      <meta property="og:image:type" content="image/png" />
      <meta
        property="og:image:secure_url"
        itemProp="image"
        content={ogImagePath}
      />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={pageURL} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImagePath} />
    </>
  );
}
