-- CreateTable
CREATE TABLE "PortedContent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "family" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "data" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "updatedBy" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "PortedContent_family_kind_locale_key" ON "PortedContent"("family", "kind", "locale");
