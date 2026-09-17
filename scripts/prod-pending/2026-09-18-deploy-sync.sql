-- Prod SiteContent sync for the 2026-09-18 deploy (a31764b). Apply:
--   turso db shell kayahan-isi < scripts/prod-pending/2026-09-18-deploy-sync.sql
-- 1) Home band images PNG → WebP
UPDATE SiteContent SET data = replace(replace(replace(data, '/assets/home-about-cgi.png', '/assets/home-about-cgi.webp'), '/assets/home-media-cgi.png', '/assets/home-media-cgi.webp'), '/assets/home-projects-cgi.png', '/assets/home-projects-cgi.webp');
-- 2) New shop address (both locales)
UPDATE SiteContent SET data = json_set(data, '$.footer.contact.address', 'Fevzi Çakmak Cd. No: 13/1' || char(10) || '34180 Bahçelievler / İstanbul / Türkiye');
-- 3) Stats: "25 Yıl Ortalama Çalışan Deneyimi" → "8 İlçe Aynı Gün Servis"
UPDATE SiteContent SET data = json_set(data, '$.stats[2]', json('{"value":"8","suffix":" İlçe","label":"Aynı Gün Servis"}')) WHERE locale = 'tr';
UPDATE SiteContent SET data = json_set(data, '$.stats[2]', json('{"value":"8","suffix":" districts","label":"Same-Day Service"}')) WHERE locale = 'en';
UPDATE SiteContent SET updatedAt = CURRENT_TIMESTAMP;
