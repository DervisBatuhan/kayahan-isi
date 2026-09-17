-- Home band images: PNG → WebP (run after the matching code deploy). Apply: turso db shell kayahan-isi < this-file
UPDATE SiteContent SET data = replace(replace(replace(data, '/assets/home-about-cgi.png', '/assets/home-about-cgi.webp'), '/assets/home-media-cgi.png', '/assets/home-media-cgi.webp'), '/assets/home-projects-cgi.png', '/assets/home-projects-cgi.webp'), updatedAt = CURRENT_TIMESTAMP;
