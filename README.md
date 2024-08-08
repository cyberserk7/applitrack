# AppliTrack

**AppliTrack** is a comprehensive job application management tool designed to streamline your job-hunting process. Track your applications, manage your documents, and stay organized all in one place.

## Features

- **Application Tracking**: Easily monitor the status of your job applications with categories like:
  - **Bookmarked**: Jobs you're interested in but haven't applied to yet.
  - **Applied**: Applications you've submitted.
  - **Interview Scheduled**: Jobs where you've secured an interview.
  - **Got Offer**: Track offers you've received.
  
- **Interview Reminders**: Set interview dates and receive email reminders 1 day before your interview.

- **Document Management**: Upload and manage important job-hunting documents, such as:
  - **CVs**
  - **Cover Letters**
  
- **User-Friendly Interface**: An intuitive UI that makes managing your job search hassle-free.

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js, Mongoose
- **Database**: MongoDB
- **Authentication**: NextAuth with JWT Strategy
- **Deployment**: Vercel

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/cyberserk7/applitrack.git
   
2. Navigate to the project directory:
   ```bash
   cd applitrack
   
3. Install the dependencies:
   ```bash
   npm i

4. Create .end.local file in the root directory and paste the API Keys:
   ```base
   DATABASE_URL= mongodb database url
   NEXTAUTH_SECRET= random hex code
   RESEND_API= resend api key
   EDGE_STORE_ACCESS_KEY= edge store api key
   EDGE_STORE_SECRET_KEY= edge store secret key

5. Run the development server:
   ```bash
   npm run dev

6. Open ```http://localhost:3000``` in your browser to see the application in action.

### Deployment
AppliTrack can be easily deployed to Vercel. Simply connect your repository and follow the deployment steps on the Vercel dashboard.

### Contributing
Contributions are welcome! If you have any ideas or suggestions, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License.

