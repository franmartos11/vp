-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEs" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "descriptionEs" TEXT,
    "projectType" TEXT NOT NULL,
    "projectTypeEs" TEXT,
    "completionYear" INTEGER,
    "location" TEXT,
    "locationEs" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "coverImage" TEXT,
    "videoUrl" TEXT,
    "technicalSheet" TEXT,
    "technicalSheetEs" TEXT,
    "materials" TEXT,
    "materialsEs" TEXT,
    "testimonial" TEXT,
    "testimonialEs" TEXT,
    "gallery" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "titleEs" TEXT,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "shortDescriptionEs" TEXT,
    "fullDescription" TEXT,
    "fullDescriptionEs" TEXT,
    "icon" TEXT,
    "coverImage" TEXT,
    "keyDeliverables" TEXT,
    "keyDeliverablesEs" TEXT,
    "gallery" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
