# Offline Sync Cross Platform Native Mobile App

A modern, seamless, and user-friendly shipment platform built with Expo, TypeScript.

## Features

- 📦 Real-time Crud Shipment Tracking
- 🎨 Modern UI with Custom Design System
- 🔄 Real-time Connection Sync
- ✨ Custom Form Components
- 🧪 Jest Testing Setup

## Tech Stack

- **Framework:** Expo
- **Language:** TypeScript
- **Styling:** StyleSheet
- **Form Handling:** React Hook Form + Yup
- **Testing:** Jest

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:

git clone [https://github.com/roscoericch/offline-sync-native-mobile-app]

cd offline-sync-native-mobile-app

2. Install dependencies:

npm install

3. Run the development server:

npx expo start

4. Open [http://localhost:8081](http://localhost:8081) with your browser.

5. create build

   ios -

   ```bash
    eas build --platform ios
   ```

   android -

   ```bash
    eas build --platform android
   ```

## Development

### Available Scripts

- `npm run start` - Start app
- `npm run ios` - Start ios instance
- `npm run android` - Start android instance
- `npm run web` - Start web instance
- `npm run test` - Run Jest Test
- `npm run lint` - Run ESLint

### Project Structure

```
├── app/                    # Expo app directory
│   ├── (tabs)/            # Main App Tabs routes
│   └── _layout.tsx         # Root layout
├── components/            # React components
│   ├── forms/            # Form components
│   ├── layouts/          # Layout components
│   └── icons/               # UI components
├── context/            # React context providers
└── types/              # App leve type declarations
```

### Code Quality

This project uses:

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety

### Testing

Jest is configured for unit testing. Run tests with:

```bash
npm run test
```
