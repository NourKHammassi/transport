import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  selectIsAuthChecked,
  selectLoggedInUser,
} from "./features/auth/AuthSlice";
import { Logout } from "./features/auth/components/Logout";
import { Protected } from "./features/auth/components/Protected";
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import {
  AddProductPage,
  AdminOrdersPage,
  CartPage,
  CheckoutPage,
  ForgotPasswordPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  OtpVerificationPage,
  ProductDetailsPage,
  ProductUpdatePage,
  ResetPasswordPage,
  SignupPage,
  UserOrdersPage,
  UserProfilePage,
  WishlistPage,
} from "./pages";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { GeneralConditions } from "./pages/GeneralConditions";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { DemanderDevis } from "./pages/DemanderDevis";
import { MentionsLegales } from "./pages/LegalMentions";

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route
          path="/reset-password/:userId/:passwordResetToken"
          element={<ResetPasswordPage />}
        />
        <Route
          exact
          path="/logout"
          element={
            <Protected>
              <Logout />
            </Protected>
          }
        />

        <Route path="/conditions" element={<GeneralConditions />} />
        <Route path="/mentionsLegales" element={<MentionsLegales />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/demanderDevis" element={<DemanderDevis />} />

        <Route
          path="/admin/dashboard"
          element={
            <Protected>
              <AdminDashboardPage />
            </Protected>
          }
        />
        <Route
          path="/admin/product-update/:id"
          element={
            <Protected>
              <ProductUpdatePage />
            </Protected>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <Protected>
              <AddProductPage />
            </Protected>
          }
        />
        <Route
          exact
          path="/product-details/:id"
          element={
            <Protected>
              <ProductDetailsPage />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to={"/admin/dashboard"} />} />

        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <Protected>
              <UserProfilePage />
            </Protected>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </>
    )
  );

  return isAuthChecked ? <RouterProvider router={routes} /> : "";
}

export default App;
