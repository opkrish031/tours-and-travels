type JsonLdProps = {
  data: unknown;
};

/** Renders JSON-LD safely: `<` is escaped so the payload can never break out of the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
