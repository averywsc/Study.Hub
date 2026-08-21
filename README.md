# Student Hub

A study platform built for Year 12 and 13 students preparing for NCEA externals. Combines a subject-organised resource library with a study group finder, built with HTML, CSS, JavaScript, and a PHP/MySQL backend.

Live site: https://averywsc.github.io/Study.Hub/index.html
Live site: https://projectspace.nz/xbbhjgpp/index.html

### Features
* Resource Library — key notes, past exam papers, and grade exemplars per NCEA standard, sourced from NZQA
* Group Finder — live database-backed listings with subject/level/mode filters, posted and stored via a PHP/MySQL backend
* Post and delete your own group listing (via a private token), or manage all listings with an admin login
* Study Timer — customisable Pomodoro-style focus and break timer, with input validation for boundary and invalid cases
* Discussion Prompts — subject-specific prompts to guide group study sessions
* Settings menu — light/dark theme, adjustable text size, and a dyslexic-friendly font option
* No login required to browse, and the Group Finder collects no unnecessary personal data

### File Structure
* `index.html`: The main landing page with navigation and quick-links.
* `about.html`: About page explaining the site's purpose and features.
* `resources.html`: The layout for viewing subjects and study standards.
* `group-finder.html`: Study group listings, posting form, admin panel, timer, and discussion prompts.
* `math.html`, `biology.html`, `chemistry.html`, `physics.html`, `english.html`, `history.html`, `geography.html`, `economics.html`: Individual subject pages with standard-specific notes and NZQA links.
* `css/`: Contains `style.css` for all visual design and layout settings.
* `js/`: Contains `main.js` for all interactive features (timer, prompts, settings, listings, standards data, admin login).

### Backend
* Hosted separately on ProjectSpace (`projectspace.nz`), using PHP and a MySQL database.
* `submit-group.php` — inserts a new group listing and returns a private delete token.
* `get-listings.php` — returns all current listings as JSON.
* `delete-group.php` — deletes a listing, requiring either the poster's token or the admin password.

### Sprint Progress
* **Sprint 1 (Foundation):** Base pages, layout, and split homepage complete.
* **Sprint 2 (Content):** Subject pages with resource downloads complete.
* **Sprint 3 (Tools):** Study timer and discussion prompt bank complete.
* **Sprint 4 (Community):** Group listings, filters, posting form, accessibility/settings features, and a live database backend with admin/owner delete controls complete.

### Made by
Avery Beuth