CREATE TABLE "Property" (
  id serial PRIMARY KEY,
  address text NOT NULL,
  city text,
  state text,
  zip text,
  county text,
  price numeric,
  beds integer,
  baths numeric
);

CREATE TABLE "Photo" (
  id serial PRIMARY KEY,
  url text NOT NULL,
  "propertyId" integer REFERENCES "Property"(id) ON DELETE SET NULL
);

CREATE TABLE "Wholesaler" (
  id serial PRIMARY KEY,
  name text NOT NULL
);

CREATE TABLE "_PropertyWholesalers" (
  "A" integer REFERENCES "Property"(id) ON DELETE CASCADE,
  "B" integer REFERENCES "Wholesaler"(id) ON DELETE CASCADE,
  PRIMARY KEY ("A", "B")
);
