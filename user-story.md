# User Story Template

## Title: Browse Available Gifts
**As a** registered or guest user,  
**I want to** browse a list of all available household items and gifts,  
**So that** I can find items I need without purchasing new ones.

### Acceptance Criteria
- Given that I navigate to the home page or gift catalog,
- When the page loads,
- Then I should see a list of available gifts with image, title, condition, category, and date posted.

---

## User Stories

### Story 1: View Detailed Item Information
- **As a** user,
- **I want to** click on any gift card to view detailed specifications, donor description, location, and comments,
- **So that** I can decide if the item suits my needs.
- **Priority:** High | **Label:** `new`

### Story 2: Search and Filter by Category
- **As a** visitor,
- **I want to** filter gifts by category (e.g., Living, Bedroom, Kitchen, Office, Toys), condition, and age,
- **So that** I can quickly locate specific items without scrolling through the entire inventory.
- **Priority:** High | **Label:** `new`

### Story 3: User Account Registration
- **As a** new user,
- **I want to** register an account using my name, email address, and a secure password,
- **So that** I can participate in the GiftLink community and list or claim items.
- **Priority:** High | **Label:** `backlog`

### Story 4: Secure User Login & JWT Authentication
- **As a** registered user,
- **I want to** log into my account using my credentials and receive a secure JWT token,
- **So that** my identity is verified and protected across sessions.
- **Priority:** High | **Label:** `backlog`

### Story 5: Edit and Update User Profile
- **As a** logged-in user,
- **I want to** update my personal profile details (such as first name and last name),
- **So that** other community members can see my up-to-date contact information.
- **Priority:** Medium | **Label:** `backlog`

### Story 6: Item Feedback & Sentiment Analysis
- **As a** user browsing gifts,
- **I want** comments and reviews on items to be analyzed for positive or constructive sentiment using NLP,
- **So that** I can quickly gauge community feedback on an item or donor.
- **Priority:** Medium | **Label:** `icebox`

### Story 7: List a New Gift Item
- **As a** donor,
- **I want to** create a new gift listing with photos, category, condition, and pickup details,
- **So that** users in need can discover and claim my surplus items.
- **Priority:** Medium | **Label:** `icebox`

### Story 8: Automated CI/CD Pipeline
- **As a** DevOps engineer,
- **I want** an automated GitHub Actions pipeline to run tests, lint code, and build container images on each push,
- **So that** code quality is maintained and regressions are prevented automatically.
- **Priority:** Low | **Label:** `technical debt`
