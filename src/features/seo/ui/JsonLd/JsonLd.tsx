import { serializeJsonLd, type Schema } from "../../model/seo";

const JsonLd = ({ data }: { data: Schema }) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
);

export default JsonLd;
