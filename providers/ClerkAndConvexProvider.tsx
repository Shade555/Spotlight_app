import { Platform } from "react-native";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

let Provider: React.FC<{ children: React.ReactNode }>;

if (Platform.OS === "web") {
    // Web: Use clerk-react and useAuth, must wrap in ClerkProvider
  // @ts-ignore
  const { ClerkProvider, useAuth } = require("@clerk/clerk-react");
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  Provider = ({ children }) => (
    <ClerkProvider publishableKey={publishableKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
} else {
  // Native: Use clerk-expo and useAuth
  const { ClerkProvider, useAuth } = require("@clerk/clerk-expo");
  const { tokenCache } = require("@clerk/clerk-expo/token-cache");
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  Provider = ({ children }) => (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default Provider;