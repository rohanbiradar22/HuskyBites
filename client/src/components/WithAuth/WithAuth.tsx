import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const WithAuth = (WrappedComponent: React.FC) => {
  // Move the hook call inside the body of the functional component
  const AuthWrapper = () => {
    const router = useRouter();
    const loading = useAppSelector((state) => state.auth.loading);
    const user = useAppSelector((state) => state.auth.user);
    // const { user, loading } = useAuth(); // Replace with your authentication hook or context

    useEffect(() => {
      if (!user && !loading) {
        // Redirect to login page if user is not authenticated
        router.push("/login");
      }
    }, [user, loading, router]);

    if (loading) {
      // You may want to show a loading spinner while checking authentication
      return <div>Loading...</div>;
    }

    // Render the component if the user is authenticated
    return <WrappedComponent />;
  };

  return <AuthWrapper />;
};

export default WithAuth;
