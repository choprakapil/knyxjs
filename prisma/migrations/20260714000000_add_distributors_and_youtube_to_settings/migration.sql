-- Migration: Add distributors column to settings table
-- Applies to: servers that ran the original init migration (which had "stockists" instead)
-- Safe to run: SQLite ignores this if column already exists in some SQLite versions,
--              but Prisma migrate deploy tracks this via _prisma_migrations table.

-- Add distributors column (renamed from 'stockists' in schema)
ALTER TABLE "settings" ADD COLUMN "distributors" TEXT DEFAULT '[]';

-- Add content column if not present (added after original init)
ALTER TABLE "settings" ADD COLUMN "content" TEXT DEFAULT '{}';

-- Add youtubeUrl column if not present (added after original init)
ALTER TABLE "settings" ADD COLUMN "youtubeUrl" TEXT DEFAULT '';
