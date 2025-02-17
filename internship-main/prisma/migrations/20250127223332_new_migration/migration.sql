-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "typeOfBusinessValueId" TEXT NOT NULL,
    "typeOfShoppittoValueId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "termsAccepted" BOOLEAN NOT NULL,
    "termsAcceptedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" SERIAL NOT NULL,
    "session_token" TEXT NOT NULL,
    "account_id" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "refreshValid" BOOLEAN NOT NULL DEFAULT false,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeOfBusiness" (
    "id" SERIAL NOT NULL,
    "valueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typeOfBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeOfShoppitto" (
    "id" SERIAL NOT NULL,
    "valueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "typeOfShoppitto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeOfCategory" (
    "id" SERIAL NOT NULL,
    "valueId" TEXT NOT NULL,
    "mainCategory" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,

    CONSTRAINT "typeOfCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "valueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "isoCode" TEXT NOT NULL,
    "flagUrl" TEXT NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businessInfo" (
    "id" SERIAL NOT NULL,
    "categoryId" TEXT NOT NULL,
    "busLegalName" TEXT NOT NULL,
    "busStartYear" TIMESTAMP(3),
    "countryCode" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "termsAndConditionSellersAccount" TIMESTAMP(3),
    "termsAndConditionFinishRegistration" TIMESTAMP(3),
    "country" TEXT NOT NULL,
    "address1" TEXT NOT NULL,
    "address2" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "tutorNumber" TEXT,
    "taxIdNumber" TEXT NOT NULL,
    "idPhotoUrl" TEXT,
    "electronicSignatureUrl" TEXT,
    "joinInDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "layoutId" TEXT,

    CONSTRAINT "businessInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "businessLayout" (
    "id" SERIAL NOT NULL,
    "layoutId" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "addUrl" TEXT NOT NULL,
    "bgColor" TEXT NOT NULL,
    "frameColor" TEXT NOT NULL,

    CONSTRAINT "businessLayout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "valueId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT NOT NULL,
    "item" TEXT,
    "subItem" TEXT,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "valueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "valueId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "categoryId" TEXT NOT NULL,
    "subCategoryId" TEXT,
    "businessId" INTEGER NOT NULL,
    "videoLink1" TEXT,
    "videoLink2" TEXT,
    "keywords" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "calendarLink" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_userId_key" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_refresh_token_key" ON "sessions"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "typeOfBusiness_valueId_key" ON "typeOfBusiness"("valueId");

-- CreateIndex
CREATE UNIQUE INDEX "typeOfBusiness_name_key" ON "typeOfBusiness"("name");

-- CreateIndex
CREATE UNIQUE INDEX "typeOfShoppitto_valueId_key" ON "typeOfShoppitto"("valueId");

-- CreateIndex
CREATE UNIQUE INDEX "typeOfShoppitto_name_key" ON "typeOfShoppitto"("name");

-- CreateIndex
CREATE UNIQUE INDEX "typeOfCategory_valueId_key" ON "typeOfCategory"("valueId");

-- CreateIndex
CREATE UNIQUE INDEX "countries_valueId_key" ON "countries"("valueId");

-- CreateIndex
CREATE UNIQUE INDEX "countries_name_key" ON "countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "businessInfo_userId_key" ON "businessInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "businessInfo_layoutId_key" ON "businessInfo"("layoutId");

-- CreateIndex
CREATE UNIQUE INDEX "businessLayout_layoutId_key" ON "businessLayout"("layoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Categories_valueId_key" ON "Categories"("valueId");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_valueId_key" ON "Plan"("valueId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_valueId_key" ON "Product"("valueId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_typeOfBusinessValueId_fkey" FOREIGN KEY ("typeOfBusinessValueId") REFERENCES "typeOfBusiness"("valueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_typeOfShoppittoValueId_fkey" FOREIGN KEY ("typeOfShoppittoValueId") REFERENCES "typeOfShoppitto"("valueId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessInfo" ADD CONSTRAINT "businessInfo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "typeOfCategory"("valueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessInfo" ADD CONSTRAINT "businessInfo_country_fkey" FOREIGN KEY ("country") REFERENCES "countries"("valueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessInfo" ADD CONSTRAINT "businessInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "accounts"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "businessInfo" ADD CONSTRAINT "businessInfo_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "businessLayout"("layoutId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("valueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "typeOfCategory"("valueId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "Categories"("valueId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "businessInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
