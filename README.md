# VELTHON Write — website frontend

Public static website files for GitHub Pages. Release 1.0.4.

The application sign-in is verified by the existing VELTHON authentication service. Only the existing invited Emma, George and Hany accounts are accepted. There is no public registration. This repository contains no account passwords, authentication verifiers, backend configuration, user notes, saved photos or security logs.

GitHub Pages serves the public welcome screen and browser code. The separate VELTHON server verifies sign-in; GitHub Pages does not run the authentication server. Notes and saved scan photos are encrypted in the current browser's local storage database. Optional cloud/device export remains under the user's control.

## Moving from the earlier address

Browser storage belongs to its website address. Existing notes at https://velthon-student-hub-trial.velthonhome.chatgpt.site/write/ stay there. Export an encrypted backup from that address, then restore it after signing in at the new GitHub Pages address. Do not clear the old browser storage before checking the restored copy. The password and invited accounts are unchanged.

## Publication

GitHub Pages publishes the main branch, root folder. The .nojekyll file serves the application as static assets. Service-worker and manifest links are relative to the repository path. Never upload backend files, credentials, notes, backups or runtime logs into this public repository.

Third-party font and icon licences are included alongside their assets.
