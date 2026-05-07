-- Google Ads Admin Automation Database Schema
-- Generated for PostgreSQL

CREATE DATABASE google_ads_admin;

-- Users table
CREATE TABLE IF NOT EXISTS "user" (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Advertisers table
CREATE TABLE IF NOT EXISTS advertiser (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "contactEmail" VARCHAR(255) NOT NULL,
    "websiteUrl" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaign (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "advertiserId" UUID NOT NULL,
    "previewUrl" VARCHAR(500) NOT NULL,
    "trackingUrl" VARCHAR(500) NOT NULL,
    "runFrequency" VARCHAR(100) NOT NULL,
    parameters JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_user_email ON "user"(email);
CREATE INDEX idx_advertiser_name ON advertiser(name);
CREATE INDEX idx_campaign_advertiser_id ON campaign("advertiserId");
CREATE INDEX idx_campaign_created_at ON campaign("createdAt");

-- Insert sample admin user (password: admin123 - in production, use hashed passwords)
INSERT INTO "user" (id, email, name, role, password, "createdAt")
VALUES ('00000000-0000-0000-0000-000000000001', 'admin@adautomate.com', 'Admin', 'admin', 'admin123', NOW());

-- Insert sample advertiser
INSERT INTO advertiser (id, name, "contactEmail", "websiteUrl", "createdAt")
VALUES ('00000000-0000-0000-0000-000000000002', 'Sample Advertiser', 'contact@sample.com', 'https://sample.com', NOW());

-- Insert sample campaign
INSERT INTO campaign (id, name, "advertiserId", "previewUrl", "trackingUrl", "runFrequency", parameters, "createdAt")
VALUES (
    '00000000-0000-0000-0000-000000000003',
    'Sample Campaign',
    '00000000-0000-0000-0000-000000000002',
    'https://preview.sample.com',
    'https://tracking.sample.com',
    'daily',
    '{"budget": "1000", "target_audience": "18-35"}',
    NOW()
);