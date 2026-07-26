
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
    const { user, userData, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-5 bg-ground">
                <div className="w-8 h-8 rounded-full border border-edge-strong border-t-ink animate-spin" />
                <p className="kicker">Checking your access</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (adminOnly && userData?.role !== 'admin') {
        // Here we could also check for specific admin roles like 'ISB Admin' 
        // if we want to be more granular. For now, we use a general 'admin' role.
        // We'll refine this when implementing Admin.tsx.
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
