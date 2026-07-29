import { Suspense, lazy } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToHash from "./components/ScrollToHash"
import WhatsAppButton from "./components/WhatsAppButton"
import WebVitalsReporter from "./components/WebVitalsReporter"
import GoogleAnalytics from "./components/GoogleAnalytics"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"

// Code-split (S5, LCP): Home is the only route that needs to be in the main bundle —
// everything else (including every auth-gated page) was previously shipping in the
// single ~474KB chunk regardless of route. The prerender step waits for
// networkidle0, so these chunks still resolve before the static HTML snapshot.
const Products = lazy(() => import("./pages/Products"))
const Login = lazy(() => import("./pages/Login"))
const Signup = lazy(() => import("./pages/Signup"))
const ResetPassword = lazy(() => import("./pages/ResetPassword"))
const Support = lazy(() => import("./pages/Support"))
const Admin = lazy(() => import("./pages/Admin"))

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WebVitalsReporter />
        <GoogleAnalytics />
        <ScrollToHash />
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/support" element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
        <Footer />
        <WhatsAppButton />
      </AuthProvider>
    </BrowserRouter>
  )
}
