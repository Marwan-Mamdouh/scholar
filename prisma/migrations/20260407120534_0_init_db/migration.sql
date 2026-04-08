-- CreateTable
CREATE TABLE "academic_researchers" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "affiliation" TEXT,
    "main_topic" TEXT,
    "subtopics" TEXT,
    "scholar_id" TEXT,
    "h_index" INTEGER DEFAULT 0,
    "works_count" INTEGER DEFAULT 0,
    "openalex_url" TEXT,
    "titles" TEXT,
    "subtitles" TEXT,
    "co_authors" TEXT,
    "keywords" TEXT,
    "concepts" TEXT,
    "institutions" TEXT,

    CONSTRAINT "academic_researchers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" BIGSERIAL NOT NULL,
    "jobid" INTEGER,
    "applicantname" TEXT,
    "applicantemail" TEXT,
    "applicantphone" TEXT,
    "cvpath" TEXT,
    "timestamp" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companies" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "category" TEXT,
    "industry" TEXT,
    "size" TEXT,
    "website" TEXT,
    "linkedin" TEXT,
    "branches" JSONB,
    "hq_country" TEXT,
    "glassdoor" TEXT,

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "category" TEXT,
    "message" TEXT,
    "submitted_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graduation_projects" (
    "id" BIGSERIAL NOT NULL,
    "student_name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "university" TEXT,
    "faculty" TEXT,
    "major" TEXT,
    "supervisor" TEXT,
    "co_supervisor" TEXT,
    "is_sponsored" BOOLEAN DEFAULT false,
    "sponsor_company" TEXT,
    "company_mentor" TEXT,
    "grad_year" INTEGER,
    "domains" TEXT,
    "project_title" TEXT,
    "peers_count" INTEGER,
    "doc_link" TEXT,
    "submitted_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "graduation_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hot_topics" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "field" TEXT,
    "type" TEXT,
    "status" TEXT,
    "tags" TEXT,
    "link" TEXT,
    "priority" INTEGER DEFAULT 0,

    CONSTRAINT "hot_topics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" BIGSERIAL NOT NULL,
    "owner_id" INTEGER,
    "title" TEXT,
    "company" TEXT,
    "country" TEXT,
    "country_code" TEXT,
    "track" TEXT,
    "type" TEXT,
    "seniority" TEXT,
    "description" TEXT,
    "requirements" TEXT,
    "salary" TEXT,
    "apply_link" TEXT,
    "posted_at" DATE DEFAULT CURRENT_DATE,
    "is_active" BOOLEAN DEFAULT true,
    "is_fully_scraped" BOOLEAN DEFAULT false,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" BIGINT,
    "full_name" TEXT,
    "gender" TEXT,
    "country" TEXT,
    "governorate" TEXT,
    "university" TEXT,
    "faculty" TEXT,
    "department" TEXT,
    "graduation_year" INTEGER,
    "university_email" TEXT,
    "linkedin_url" TEXT,
    "github_url" TEXT,
    "scholar_url" TEXT,
    "skills" JSONB DEFAULT '[]',
    "experience" JSONB DEFAULT '[]',
    "internships" JSONB DEFAULT '[]',
    "courses" JSONB DEFAULT '[]',
    "personal_projects" JSONB DEFAULT '[]',
    "graduation_project" JSONB DEFAULT '{}',
    "postgraduate_research" JSONB DEFAULT '{}',
    "iti_training" JSONB DEFAULT '{}',
    "nti_training" JSONB DEFAULT '{}',
    "created_at" TIMESTAMPTZ(6) DEFAULT timezone('utc'::text, now()),
    "bio" TEXT,
    "avatar_url" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "role" TEXT,
    "is_approved" INTEGER DEFAULT 0,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_profiles_user_id" ON "profiles"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
