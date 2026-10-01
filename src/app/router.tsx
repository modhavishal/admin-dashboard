import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../shared/components/layout/AppLayout'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import { ProductsPage } from '../features/products'
import { OrdersPage } from '../features/orders'
import { LoginPage, ProtectedRoute } from '../features/auth'
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage'
import ProfilePage from '../features/auth/pages/ProfilePage'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'orders', element: <OrdersPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
])