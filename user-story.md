# User Story Template & Project User Stories

## User Story Template
**As a** [role],  
**I need** [function],  
**So that** [benefit].

### Acceptance Criteria Template (Gherkin Syntax)
- **Given** [initial context or precondition],
- **When** [action or trigger occurs],
- **Then** [expected observable outcome],
- **And** [additional validation criteria].

---

## Complete Project User Stories

### Story 1: Browse Available Gifts
- **As a** registered or guest user,
- **I need** to browse a list of all available household items and gifts,
- **So that** I can find items I need without purchasing new ones.
- **Priority:** High | **Label:** `new`

#### Acceptance Criteria
- **Given** that I navigate to the GiftLink home page or catalog,
- **When** the page loads,
- **Then** I should see a grid of all available gift items displaying their image, title, condition, category, and zip code,
- **And** the items count should accurately match the database catalog.

---

### Story 2: View Detailed Item Information
- **As a** user,
- **I need** to view detailed specifications, photos, and descriptions of a specific gift,
- **So that** I can decide whether the item suits my needs before requesting pickup.
- **Priority:** High | **Label:** `new`

#### Acceptance Criteria
- **Given** that I am viewing the gift catalog,
- **When** I click on any individual gift card,
- **Then** a detailed view or modal should open displaying the full item description, category, condition, location zip code, and donor comments,
- **And** I should have an option to claim the item or close the details view.

---

### Story 3: Search and Filter by Category & Condition
- **As a** visitor,
- **I need** to filter gifts by category, condition, age in years, and search keywords,
- **So that** I can quickly locate specific items without scrolling through the entire inventory.
- **Priority:** High | **Label:** `new`

#### Acceptance Criteria
- **Given** that I am on the search page or using the category filter bar,
- **When** I select a category (such as "Living", "Kitchen", or "Office") or enter a search keyword,
- **Then** the list should immediately update to display only gifts matching the selected criteria,
- **And** if no items match the criteria, a helpful "No gifts found" message should be displayed.

---

### Story 4: User Account Registration
- **As a** new visitor,
- **I need** to register an account using my first name, last name, email address, and a secure password,
- **So that** I can join the community, claim items, and post comments.
- **Priority:** High | **Label:** `backlog`

#### Acceptance Criteria
- **Given** that I am an unregistered visitor on the registration page,
- **When** I enter valid registration details and click "Register",
- **Then** my account should be created in the database with a securely hashed password,
- **And** an authentication token (JWT) should be returned and saved to my session, redirecting me to the homepage.

---

### Story 5: Secure User Login & JWT Authentication
- **As a** registered user,
- **I need** to log into my account using my email address and password,
- **So that** I can access authenticated features and have my identity verified.
- **Priority:** High | **Label:** `backlog`

#### Acceptance Criteria
- **Given** that I have an existing account and navigate to the login modal,
- **When** I enter my registered email and correct password and submit the form,
- **Then** the server should authenticate my credentials and issue a JSON Web Token (JWT),
- **And** my navigation bar should display my name and a "Logout" button.

---

### Story 6: Edit and Update User Profile
- **As a** logged-in user,
- **I need** to update my profile information (first name and last name),
- **So that** my community profile and contact details remain current.
- **Priority:** Medium | **Label:** `backlog`

#### Acceptance Criteria
- **Given** that I am logged into my account and navigate to the profile page,
- **When** I edit my first name or last name and click "Save Profile",
- **Then** the system should update my record in the database via the API,
- **And** a success confirmation message should be displayed with my updated details reflected.

---

### Story 7: Item Feedback & Sentiment Analysis
- **As a** user browsing gifts,
- **I need** community comments on gifts to be analyzed for sentiment using NLP,
- **So that** I can gauge feedback and tone on item condition and pickup experience.
- **Priority:** Medium | **Label:** `icebox`

#### Acceptance Criteria
- **Given** that I am viewing an item's details and comment section,
- **When** a user submits a comment or review,
- **Then** the system should evaluate the text sentiment using the natural NLP library,
- **And** a visual sentiment badge ("Positive", "Neutral", or "Needs Attention") with the sentiment score should be displayed alongside the comment.

---

### Story 8: Automated CI/CD Pipeline
- **As a** DevOps engineer,
- **I need** an automated GitHub Actions pipeline to run tests, lint code, and build container images on each push,
- **So that** regressions are caught early and the application is prepared for reliable deployment.
- **Priority:** Low | **Label:** `technical debt`

#### Acceptance Criteria
- **Given** that a developer pushes code changes or opens a pull request to the repository,
- **When** the GitHub Actions workflow triggers,
- **Then** it should automatically check out the code, install dependencies, run test suites, and build the Docker images,
- **And** the build status should report a green success status if all steps complete with return code 0.
