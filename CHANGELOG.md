# CHANGELOG

## Unreleased

## 2.6.5

### Added

-   EOL update and data export

## 2.6.4

### Added

-   EOL warning

### Changed

-   Replace some .pngs with .webps

## 2.6.3

### Added

-   Ability to sort tasks by level or time

## 2.6.1

### Added

-   New Rescuers, Up, new TC info

## 2.6.0

### Changed

-   Use SendGrid for emails

### Fixed

-   Update email incorrect verbage for new email

## 2.5.5

### Added

-   Ability to set all buildings as unobtained
-   Enabled automated verification script due to email issues

## 2.5.4

### Added

-   React-query query key constants

### Fixed

-   Bug where checking unobtained characters as ready wasn't correctly updating in the UI

## 2.5.3

### Fixed

-   Night mode styling on Striking Gold item hover

## 2.5.2

### Fixed

-   Bug where Event page was displaying Striking Gold data

### Added

-   Card component using MUI

### Changed

-   Striking Gold styling

## 2.5.1

### Added

-   clsx package for conditional classnames

### Changed

-   Moved checking app version to react-query
-   Display event name in nav if current regular event
-   Event page will display previous event details if no current regular event

## 2.5.0

### Added

-   Begin implementing react-query
-   Code generator

## 2.4.0

### Added

-   DB entries for event dates and required character levels

## 2.3.3

### Changed

-   Fetch character group order on Characters page mount
-   Fetch attraction group order on Attraction page mount

## 2.3.2

### Changed

-   Leveling: Exclude Not Ready section from everyone ready to level up option

## 2.3.0

### Added

-   TC components
-   Store more TC info backend and use in frontend instead of hard coding in UI

## 2.2.5

## 2.2.4

### Fixed

-   Bug where unauthenticated users would get Loading forever on Collection pages

### Changed

-   Put Characters by level on its own route which also improves switching
-   Created new ScrollToTop component to DRY code

## 2.2.3

### Fixed

-   Bug where removed characters & attractions would remain in array as undefined

## 2.2.2

### Fixed

-   Bug where characters weren't properly updating on Favorites page

## 2.2.1

### Changed

-   Display Collection Header when page loading
-   Improved speed updating user Attraction data
-   DRY Collection Pages loading and unauthenticated code
-   Refactored Attractions page
-   New components for sort and page anchors

## 2.2.0

### Changed

-   Fetch data on each Collection page mount to ensure up-to-date user data
-   Improved speed updating user Character data

## 2.1.10

### Fixed

-   Check costume & attraction requirements for Striking Gold tasks
-   Get Striking Gold info from API on mount so no refresh required

## 2.1.9

### Added

-   Update 53 info (50th Anniversary & Haunted Mansion TC)

## 2.1.8

### Fixed

-   No longer require refresh on Token Guide & Leveling pages for updated event info
-   Can set target level for unobtained characters

## 2.1.7

### Fixed

-   Characters leveling up to wrong level with new Leveling page change
-   Lookup character from Leveling page broken

## 2.1.6

### Added

-   Ability to set characters ready from Leveling page

### Fixed

-   UI alignment & spacing on Leveling page
-   Characters not going to correct "not ready" section on level-up on Leveling page

## 2.1.5

### Changed

-   "Required" levels -> "predicted" levels (must remove spoilers)

### Removed

-   Big red Login alert

## 2.1.4

### Added

-   101 Dalmatians event

## 2.1.3

### Added

-   Luca event

## 2.1.2

### Changed

-   TC characters display with images if not in work mode

## 2.1.1

### Changed

-   TC #11
-   Get character order based on group order

## 2.1.0

### Added

-   API route for Token Guide dropdown order

## 2.0.4

### Added

-   Group order variable for easier group reordering
-   Page anchors for costume characters

## 2.0.3

### Added

-   Star Wars: A New Hope event

### Changed

-   First steps to refactor Characters page sorting

## 2.0.2

### Fixed

-   Trying to show user data with user logged out

## 2.0.0

### Added

-   Sass
-   Ability to reset user email from Account page

### Changed

-   Moved auth and modes into redux
-   Improved setting default data after email verification
-   Refactored Characters page for better readability of SW group logic
-   Lots of refactoring

### Removed

-   Favorites from Account page

## 1.7.3

### Added

-   password field visibility toggle on all forms
-   password strength indicator on all forms

## 1.7.2

### Changed

-   Lowered password strength requirement to 2

## 1.7.1

### Added

-   Password validation in password reset

## 1.7.0

### Added

-   Ability to request password reset using username
-   Ability to hide the new big red error

## 1.6.6

### Added

-   Big oopsie message

## 1.6.5

### Added

-   Change password from Account page

## 1.6.4

### Added

-   Password strength validation

### Fixed

-   Signup completing despite errors

## 1.6.3

### Added

-   Fly Free! mini event

## 1.6.2

### Added

-   Ratatouille

## 1.6.1

### Added

-   Ability to favorite characters that are level 9 & ready to level
-   Ability to set target level to 10

## 1.5.5

### Added

-   Ability to set target level upon favoriting a character

## 1.5.4

### Added

-   Type "string" and "stringbold" for quick storyline additions

## 1.5.3

### Added

-   Can display 0 tokens/ears to welcome characters on Event page

## 1.5.2

### Added

-   Brave event

### Changed

-   Reset Star Wars collection order post event

## 1.5.1

### Fixed

-   Remove characters from favorites when level 9 and marked ready

## 1.4.1

### Fixed

-   Attraction order in Attraction Guide and Collection Attractions

## 1.3.26

### Fixed

-   Display of requirements on Task Guide

## 1.3.25

### Changed

-   Display event info and check for new event info on event page mount

## 1.3.24

### Changed

-   Fix some image sizes

## 1.3.23

### Changed

-   Mandalorian event
-   UI for correct Star Wars order on Characters page during Mandalorian event

## 1.3.22

### Changed

-   Display attraction & float images on Token Guide
-   Collection Concessions UI

## 1.3.21

### Changed

-   Make Costumes/Floats obtained bg work in night mode

## 1.3.20

### Changed

-   Collection Costumes UI
-   Collection Floats UI
-   Night mode image backgrounds

## 1.3.19

### Changed

-   Collection Attractions UI
-   Character images with no background

## 1.3.18

### Changed

-   Begin NBC Lock, Shock, and Barrel event

## 1.3.17

### Added

-   Option to toggle display of NOT ready to level characters on Leveling page
-   Get favorite character conflicts first and improve conflict loading on Leveling page

## 1.3.16

### Added

-   Set target level from Task Guide page

### Fixed

-   Remove target_level from unfavorited characters
-   'Not ready' characters disappearing after being leveled up

## 1.3.15

-   Update Halloween costume info

## 1.3.14

-   Update 44 (NBC Part 3)

## 1.3.13

### Fixed

-   Broken level-up checkboxes

## 1.3.12

### Added

-   Token names (e.g. "Bow" for Daisy Duck's token

### Fixed

-   Favorite characters not being removed when leveling up on leveling page

## 1.3.11

### Fixed

-   Category headers on Attractions page

### Changed

-   Show tokens not characters in task token conflicts

## 1.3.10

### Changed

-   Scroll to top goes to top of page instead of collection header
-   White target icon in night mode

## 1.3.9

### Added

-   Show favorites characters section in Leveling page

### Changed

-   Better spacing in Leveling filters

## 1.3.8

### Changed

-   New favicon

## 1.3.7

### Changed

-   Sorted Task Guide tasks by level

## 1.3.5

### Added

-   Show characters NOT ready to level up on Leveling page

## 1.3.4

### Changed

-   Updated TC chapter logic to include months

### Added

-   API route for TC info and updated UI on Tower Events page to use

## 1.3.1

### Changed

-   Refactored and redesigned Collection Attractions page

## 08/22/2020

### Added

-   Smooth scroll on Characters and Attractions page
-   Dates in Dev Notes
-   Relic images for non-enchantable groups

### Changed

-   Dev Notes latest determined by dates
-   Moved all css imports to App.js

### Removed

-   Dev Notes "latest" and "created_at"

## 08/21/2020

### Added

-   Token names added to db
-   Warning for out-of-date client version

### Changed

-   Moved TC chapter dates and calculations for global use
-   Don't show event conflicts during TC for previous chapter characters
-   Dev Notes 2 columns UI update
-   "Unob" -> "---"

### Fixed

-   Leveling page level-up button now says "Welcome!" for ready-to-welcome characters instead of "Level Up!"
-   Added About page link on mobile
-   Don't show building and float warnings in Token Guide if user logged out

## 08/20/2020

### Added

-   "About" page for how-to/FAQ

### Changed

-   Renamed "buildings" to "attractions" for collection page
-   Added "change" type to dev notes
-   Renamed "Info" to "Events"
-   Put Striking Gold info on its own page
-   Made headers make more sense
-   Restyled headers

### Fixed

-   Fixed incorrect logic messing up collection colors on Characters page

## 08/19/2020

### Added

-   Blue collection link when all characters in group are ready to max

### Changed

-   Slightly improved UI for actions on Account page

### Removed

-   Data import/export
-   Popup for new feature alert for click and hold on character level

### Fixed

-   Fixed order of Favorites on Account page
-   Fixed favorite characters not unchecking ready when leveled up from Leveling page

## 08/07/2020

### Fixed

-   Fixed Event page not loading on refresh

### Changed

-   Updated gold trophy drops for new Striking Gold event

## 08/06/2020

### Changed

-   Ended Owl TC and updated Owl info

## 07/21/2020

### Added

-   Set up db to store old TC info

## 07/17/2020

### Changed

-   Updated TC dates due to delay
-   Improved access to update TC dates

### Fixed

-   Fixed accidental removal of special tokens from Leveling page conflicts

## 07/15/2020

### Added

-   Re-implemented TC planner feature for db

### Changed

-   Began overhauling Tower Event page

### Fixed

-   Fixed order of Leveling page conflicts
-   Fixed maxed characters appearing in Leveling page conflicts

## 07/14/2020

### Added

-   Made a changelog

### Changed

-   Updated character order for TC
-   Updated Belle magic cost
